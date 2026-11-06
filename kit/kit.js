/* BrandSim UI-кит — движок страницы.
 *
 * Рисует из схем (kit-specs.js) два режима: матрицу вариантов и стенд с
 * панелью свойств. Раздел «Основа» читает значения токенов прямо из :root
 * через getComputedStyle — таблица физически не может разойтись с кодом.
 */

/* Версия в спецификаторе — такой же сбрасыватель кэша, как ?v= у styles.css,
   kit.css и kit.js: файл схем меняется в каждой задаче, а модуль без версии
   браузер отдаёт из кэша, и кит показывает вчерашние карточки. */
import { SPECS, LAYERS } from "./kit-specs.js?v=14";
import { icon, iconPath, ICON_SIZES } from "./icons.js";

const h = (tag, attrs = {}, ...kids) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  for (const kid of kids.flat(3)) {
    if (kid === null || kid === undefined || kid === false || kid === "") continue;
    node.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return node;
};

const clear = (node) => { while (node.firstChild) node.removeChild(node.firstChild); return node; };

/* ------------------------------------------------ состояния ---------- */

/* Состояние применяется тремя разными способами, потому что тремя разными
   способами оно и живёт в CSS: :disabled — свойство элемента, .busy —
   класс, :hover/:focus — псевдокласс, который принудительно не включить.
   Для последних каждое правило в styles.css имеет двойник [data-force~=…];
   гейт приёмки проверяет, что двойник есть у каждого (UI-KIT.md). */
function applyState(node, state) {
  if (!state || state === "default") return node;
  if (state === "disabled") {
    if ("disabled" in node) node.disabled = true;
    node.querySelectorAll("input, button, select, textarea").forEach((n) => { n.disabled = true; });
    return node;
  }
  if (state === "busy") { node.classList.add("busy"); return node; }
  node.setAttribute("data-force", state);
  const inner = node.querySelector("input, select, textarea, button");
  if (inner) inner.setAttribute("data-force", state);
  return node;
}

function instance(spec, props) {
  const node = spec.render(props);
  if (spec.tag) spec.tag(node, props);
  applyState(node, props.state);
  /* Контекст-обёртка получает и props: часть правил состояния среды записана
     через предка (фон прилипшей панели табов), и без значений опций такую
     обёртку не собрать. Схемы, которым props не нужен, второй аргумент
     просто не объявляют. */
  return spec.frame ? spec.frame(node, props) : node;
}

/* ------------------------------------------------ оси ---------------- */

/* Движок нового формата (KIT-RULES.md). Осями компонента бывают только
   options, modifiers и state (B1) — content осью не бывает никогда, поэтому
   в этих функциях его нет вовсе. */

const STATE_KIND = {
  default: "instant", hover: "instant", focus: "instant", active: "instant",
  selected: "carried", expanded: "carried",
  disabled: "suppressing", busy: "suppressing",
};

/* E3: колонки — мгновенные и подавляющие, они исключают друг друга;
   складывающиеся идут группой строк. */
const columnStates = (spec) => (spec.states || []).filter((s) => STATE_KIND[s] !== "carried");
const groupStates = (spec) => (spec.states || []).filter((s) => STATE_KIND[s] === "carried");

/* Источник значений оси по ключу. Три вида:
     state            — мгновенные и подавляющие состояния, колонки (E3);
     складывающееся   — selected/expanded: своя ось из двух значений, потому
                        что оно ложится ПОВЕРХ мгновенного, а не заменяет его
                        (B5). Применяет его не движок, а render: носимое
                        состояние видно в разметке (input.checked, класс
                        .active), псевдоклассом его не включить;
     остальное        — запись из options или modifiers. */
function axisSource(spec, key) {
  if (key === "state") return { values: columnStates(spec) };
  if (groupStates(spec).includes(key)) return { type: "carried", name: key };
  return (spec.options && spec.options[key]) || (spec.modifiers && spec.modifiers[key]);
}

/* Ключ — ось компонента, когда это state (и состояния у компонента есть),
   складывающееся состояние, либо запись в options/modifiers (C2: то же
   слово, что в коде, — значит подписывать значение отдельным `label` не
   нужно, оно и есть подпись). */
const isAxis = (spec, key) =>
  (key === "state" && columnStates(spec).length > 0)
  || groupStates(spec).includes(key)
  || (!!spec.options && key in spec.options)
  || (!!spec.modifiers && key in spec.modifiers);

/* C2: подпись значения — само имя значения, то же слово, что в коде. Второго
   словаря у движка нет: двузначная опция пишется в схеме как off | on, и
   булева типа в схемах не осталось — иначе половина матриц подписывалась бы
   «ДА»/«НЕТ», по которым не видно даже, какая ось где. Исключение одно —
   складывающееся состояние: у него нет записи в схеме, только имя, и два
   значения называются им же. */
function axisValues(source) {
  if (source.type === "carried") {
    return [{ value: false, label: "off" }, { value: true, label: "on" }];
  }
  return source.values.map((v) => ({ value: v, label: String(v) }));
}

const axisEntries = (spec) => [...Object.entries(spec.options || {}), ...Object.entries(spec.modifiers || {})];

const baseValue = (prop) => prop.default ?? prop.values[0];

/* B2: комбинация, которой в продукте нет, записывается ЯВНЫМ ограничением.
   Ограничений три, и читаются они одинаково — "ключ:значение|значение" либо
   массив таких условий (выполниться должны все):

     only       — опция существует только при этом условии;
     of         — модификатор принадлежит значению опции (B3): то же самое
                  ограничение, записанное со стороны принадлежности;
     statesOnly — состояния применимы только при этом условии.

   Пока условие не выполнено, ограниченная ось может стоять только в своём
   значении по умолчанию: любое другое — комбинация, которой не существует.
   По B3 такая клетка матрицы остаётся ПУСТОЙ. Пустая клетка — предъявленная
   неполнота; нарисовать вместо неё соседнюю форму значит показать то, чего
   в продукте нет, либо дважды показать одно и то же.

   Исполняются все три: декоративное ограничение хуже отсутствующего — оно
   обещает, что невозможная комбинация показана не будет, и не делает этого.

   Условие называет значение ровно так, как оно написано в схеме: одно из
   values, у двузначной опции — off либо on. Опечатку в ключе или в
   значении ловит kit-contract-check.py: неисполнимое условие молча
   опустошает клетки, то есть врёт вместо того, чтобы упасть. */
const VALUE_LIMITS = ["only", "of"];

const meets = (cond, props) => (Array.isArray(cond) ? cond : [cond]).every((one) => {
  const [on, values] = one.split(":");
  return values.split("|").includes(String(props[on]));
});

function applicable(spec, props) {
  /* Мгновенное состояние по умолчанию — то же, что берёт defaults():
     первое из колонок. Нет колонок — нет и состояния, тогда statesOnly
     ограничивать нечего. */
  const instant = columnStates(spec)[0];
  for (const [key, prop] of axisEntries(spec)) {
    for (const limit of VALUE_LIMITS) {
      if (prop[limit] && !meets(prop[limit], props) && props[key] !== baseValue(prop)) return false;
    }
    /* statesOnly ограничивает не свою ось, а колонку: значение опции
       законно, а состояние поверх него — нет (у метки нет ни наведения, ни
       фокуса). Поэтому сравнение идёт с props.state, а не с props[key]. */
    if (prop.statesOnly && !meets(prop.statesOnly, props) && props.state !== instant) return false;
  }
  return true;
}

/* B3: клетка бывает трёх видов, и две из них — не образец.

     пустая      — комбинации не бывает, её закрывает ограничение выше
                   (applicable вернул false). Смысл: так устроен продукт;
     помеченная  — форма есть, а правила ей не написали: unstyled называет
                   условие и причину. Смысл: это дефект, и он предъявлен;
     обычная     — форма есть и работает.

   Разница между первыми двумя — вся суть: пока дефект рисовался обычной
   клеткой, он был неотличим от покоя, а пока пустой — от «такого не
   бывает». Условие читается тем же meets(), что и ограничения, и знает
   лишний ключ state: правила нет обычно именно у состояния.

   Совпасть могут несколько записей — берётся первая: порядок в схеме и
   есть порядок причин, от более общей неполноты к частной. */
function unstyledWhy(spec, props) {
  for (const rec of spec.unstyled || []) {
    if (meets(rec.when, props)) return rec.why;
  }
  return null;
}

const markCell = (why) => h("div", { class: "k-m-mark" }, why);

function defaults(spec) {
  const out = {};
  for (const [key, prop] of axisEntries(spec)) {
    out[key] = baseValue(prop);
  }
  // складывающееся состояние — свойство отрисовки, а не колонка: по
  // умолчанию снято, поэтому render получает его определённым всегда
  for (const key of groupStates(spec)) out[key] = false;
  /* Мгновенное состояние по умолчанию — первое из колонок, а не первое в
     списке: у строки свойства в states стоит только `expanded`, и
     spec.states[0] отдавал бы складывающееся состояние в props.state, то
     есть applyState помечал бы узел data-force="expanded". Нет колонок —
     нет и состояния по умолчанию: props.state остаётся неопределённым, и
     applyState ничего не делает. */
  const instant = columnStates(spec);
  if (instant.length) out.state = instant[0];
  return out;
}

/* ------------------------------------------------ матрица ------------ */

function renderMatrix(spec, axes) {
  const base = defaults(spec);
  /* Оси строк может не быть вовсе: у разделителя, метки и скелета нет ни
     опций, ни состояний — вся карточка это один образец. Колонку подписей
     строк в этом случае не заводим: пустая клетка в сетке читается как
     дырка, а не как «подписывать нечем». */
  const rows = axes.rows ? axisValues(axisSource(spec, axes.rows)) : [null];
  const cols = axes.cols ? axisValues(axisSource(spec, axes.cols)) : [null];
  const groups = axes.groups ? axisValues(axisSource(spec, axes.groups)) : [null];

  const grid = h("div", { class: axes.rows ? "k-matrix" : "k-matrix k-no-rows",
    style: `--k-cols:${cols.length}` });

  /* Шапка подписывает оси, а не только значения: над колонками — имя оси
     колонок, в углу — имя оси строк, у группы — «ось: значение». Без этого
     «on» в строке и «on» в группе читались одинаково. */
  if (axes.cols) {
    if (axes.rows) grid.append(h("div", { class: "k-m-corner" }));
    grid.append(h("div", { class: "k-m-axis", style: "grid-column: span var(--k-cols)" }, axes.cols));
    if (axes.rows) grid.append(h("div", { class: "k-m-axis k-m-axis-row" }, axes.rows));
    for (const col of cols) grid.append(h("div", { class: "k-m-col" }, col.label));
  } else if (axes.rows) {
    grid.append(h("div", { class: "k-m-axis k-m-axis-row" }, axes.rows), h("div", { class: "k-m-col" }));
  }

  for (const group of groups) {
    if (group) {
      // колонка подписей строк есть всегда, даже без оси колонок: без неё заголовок
      // группы занимал одну клетку, и ряды съезжали на полшага
      grid.append(h("div", { class: "k-m-group", style: "grid-column: 1 / -1" }, `${axes.groups}: ${group.label}`));
    }
    for (const row of rows) {
      if (axes.rows) grid.append(h("div", { class: "k-m-row" }, row.label));
      for (const col of cols) {
        const props = { ...base };
        if (axes.rows) props[axes.rows] = row.value;
        if (axes.cols) props[axes.cols] = col.value;
        if (axes.groups) props[axes.groups] = group.value;
        let cell = null;
        // комбинации нет в продукте — клетка остаётся пустой (см. applicable);
        // форма есть, а правила нет — помеченная (см. unstyledWhy)
        if (applicable(spec, props)) {
          const why = unstyledWhy(spec, props);
          if (why) cell = markCell(why);
          else {
            try {
              cell = instance(spec, props);
            } catch (e) {
              cell = h("div", { class: "k-m-err" }, `ошибка: ${e.message}`);
            }
          }
        }
        grid.append(h("div", { class: "k-m-cell" }, cell));
      }
    }
  }
  return grid;
}

/* ------------------------------------------------ стенд -------------- */

function renderStand(spec) {
  const state = defaults(spec);
  const stage = h("div", { class: "k-stage" });
  const code = h("code", { class: "k-code" });
  const panel = h("div", { class: "k-panel" });

  /* На стенде набор значений выбирает читатель, и собрать несуществующую
     комбинацию он может в два клика. Рисовать её нельзя по той же причине,
     по которой в матрице стоит пустая клетка: это была бы форма, которой в
     продукте нет. Вместо образца — строка о том, что комбинации нет. */
  const redraw = () => {
    const ok = applicable(spec, state);
    const why = ok ? unstyledWhy(spec, state) : null;
    /* Три вида клетки читаются и здесь: комбинации нет — строка о том, что
       её нет; форма есть, а правила нет — та же пометка, что в матрице.
       Строки для копирования у обеих не бывает: копировать нечего. */
    clear(stage).append(!ok ? h("div", { class: "k-na" }, "Такой комбинации в продукте нет")
      : why ? markCell(why) : instance(spec, state));
    code.textContent = ok && !why && spec.snippet ? spec.snippet(state) : "";
  };

  // Тот же набор осей, что собирает defaults(): options и modifiers. Контент
  // (например, надпись кнопки) на стенде пока не редактируется — его вывод
  // в панель свойств не входит в эту задачу.
  /* Контрол один на все опции — список значений. Отдельного флажка для
     двузначной опции больше нет: словарь у неё такой же, off | on, и
     флажок подписывал бы значения не теми словами, какими они названы в
     схеме (C2).

     Отметка выбранного обязательна: без неё браузер показывает первое
     значение списка, а state держит своё — у опции, чей default не первый
     (button.text, button.icon, summary-tile.delta), панель писала «off»
     над кнопкой с надписью и иконкой. Ровно то враньё подписью, против
     которого сделан кит, только переехавшее в панель свойств. */
  for (const [key, prop] of axisEntries(spec)) {
    const control = h("select", { class: "seg-select",
      onchange: (e) => { state[key] = e.target.value; redraw(); } },
      ...axisValues(prop).map((v) => h("option", { value: String(v.value),
        selected: String(state[key]) === String(v.value) }, v.label)));
    panel.append(h("div", { class: "k-field" }, h("span", { class: "k-field-cap" }, key), control));
  }

  // складывающиеся состояния — такой же переключатель: они не заменяют
  // мгновенное, а ложатся поверх (B5), поэтому стоят рядом с опциями
  for (const key of groupStates(spec)) {
    const input = h("input", { type: "checkbox", checked: state[key],
      onchange: (e) => { state[key] = e.target.checked; redraw(); } });
    panel.append(h("div", { class: "k-field" }, h("span", { class: "k-field-cap" }, key),
      h("label", { class: "switcher" }, input, h("span", { class: "track" }, h("i", {})))));
  }

  redraw();
  return h("div", { class: "k-stand" }, h("div", { class: "k-stage-wrap" }, stage, code), panel);
}

/* ------------------------------------------------ карточка ----------- */

function axisPicker(spec, axes, onChange) {
  const candidates = ["state", ...groupStates(spec),
    ...Object.keys(spec.options || {}), ...Object.keys(spec.modifiers || {})];
  const keys = candidates.filter((key) => isAxis(spec, key));
  if (keys.length < 2) return null;

  /* Один ключ — один слот. Раньше его можно было выбрать и в строки, и в
     группы: renderMatrix пишет props в порядке строки → колонки → группы,
     группа перетирала строку, и под заголовком группы «off» строка с
     подписью «on» рисовала off. Матрица врала подписью, а не формой —
     заметить это тяжелее всего. Поэтому ключ, занятый другим слотом, в
     список не попадает вовсе. */
  const SLOTS = ["cols", "rows", "groups"];
  const free = (slot, key) => !SLOTS.some((other) => other !== slot && axes[other] === key);

  // C2: подпись значения — само английское имя ключа, второго слова для
  // него заводить не нужно.
  const make = (slot, allowNone) => h("select", { class: "k-axis",
    onchange: (e) => { axes[slot] = e.target.value || null; onChange(); } },
    allowNone ? h("option", { value: "" }, "—") : null,
    ...keys.filter((key) => free(slot, key))
      .map((key) => h("option", { value: key, selected: axes[slot] === key }, key)));

  /* «—» есть и у строк: у таба и селекта ось строк пустая (опций нет, а
     состояния стоят колонками). Без этого пункта список показывал бы
     первый ключ там, где на деле не выбрано ничего.

     Список групп стоит при любых двух осях, а не только при трёх: колонок
     у карточки может не быть вовсе (панель шире половины раздела, и две её
     копии рядом не встают), и тогда вторая ось уходит в группы. Без этого
     списка заголовок группы читался бы как «ДА» ни о чём. */
  return h("div", { class: "k-axes" },
    h("span", { class: "k-axes-cap" }, "колонки"), make("cols", true),
    h("span", { class: "k-axes-cap" }, "строки"), make("rows", true),
    h("span", { class: "k-axes-cap" }, "группы"), make("groups", true));
}

/* Блок одного компонента внутри карточки группы. Собственной карточки у
   него больше нет: карточка — это законченная мысль («Действие»,
   «Ввод»), а компоненты внутри неё отбиваются разделителем. */
function componentBlock(spec) {
  const axes = { ...spec.axes };
  let mode = "matrix";
  const body = h("div", { class: "k-card-body" });
  const head = h("div", { class: "k-card-head" });

  const draw = () => {
    clear(body).append(mode === "matrix" ? renderMatrix(spec, axes) : renderStand(spec));
    const parts = [
      h("h3", { class: "k-sub-h" }, spec.name, h("span", { class: "k-card-id" }, spec.id)),
      h("div", { class: "k-modes" },
        h("button", { class: `k-mode${mode === "matrix" ? " on" : ""}`, type: "button",
          onclick: () => { mode = "matrix"; draw(); } }, "Матрица"),
        h("button", { class: `k-mode${mode === "stand" ? " on" : ""}`, type: "button",
          onclick: () => { mode = "stand"; draw(); } }, "Стенд")),
      mode === "matrix" ? axisPicker(spec, axes, draw) : null,
    ].filter(Boolean);
    clear(head).append(...parts);
  };

  draw();
  return h("div", { class: "k-block", id: `c-${spec.id}` }, head, body);
}

/* ------------------------------------------------ стайл-гайд --------- */

/* Одна таблица на всё, как у Ant: Токен | Группа | Значение | Описание.
   Группа — это ярус (примитив / семантический / компонентный), то есть
   колонка, а не заголовок. Заголовки делят по семействам цвета. */

const FAMILIES = [
  ["neutral", "Нейтральные"],
  ["orange", "Оранжевые"],
  ["yellow", "Жёлтые"],
  ["red", "Красные"],
  ["green", "Зелёные"],
  ["chart", "Диаграммы"],
];

/* Компонентные токены: те, что меняют ровно один компонент. Список
   получен проверкой по коду, а не по названию — счётом селекторов, в
   которых токен встречается. Девять нижних объявлены семантическими, но
   используются в одном месте каждый, поэтому семантическими не являются.
   В справочнике цвета не показываются. */
const COMPONENT_TOKENS = new Set([
  "--color-bg-chip-claim", "--color-text-chip-claim", "--color-bg-tooltip",
  "--color-bg-switch-track", "--color-bg-slider-track",
  "--color-bg-rank-1", "--color-bg-rank-2", "--color-bg-rank-3",
  "--color-bg-page",        // .player-sticky
  "--color-bg-veil",        // .tabs
  "--color-border-veil",    // .tabs
  "--color-bg-scrim",       // .modal
  "--color-bg-warning",     // .cb-badge.warn
  "--color-status-warning", // точка предупреждения в списке проверки
  "--color-bg-success",     // .badge.on
  "--color-status-success", // .toast.ok
  "--color-text-faint",     // .empty-icon
  "--color-text-tab", "--color-text-tab-hover", "--color-bg-tab-active", "--color-text-tab-active",
  "--color-bg-chip", "--color-text-chip",
  "--color-bg-chip-success", "--color-text-chip-success", "--color-bg-chip-danger", "--color-text-chip-danger",
  "--color-bg-chip-warning", "--color-text-chip-warning",
  "--color-bg-help-tip", "--color-bg-help-tip-hover", "--color-text-help-tip",
]);

/* Тёмная альтернатива компонентного токена — объявление в .theme-dark. */
let darkCache = null;
function darkTokens() {
  if (darkCache) return darkCache;
  const map = new Map();
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules) {
      if (rule.selectorText !== ".theme-dark") continue;
      for (const prop of rule.style) map.set(prop, rule.style.getPropertyValue(prop).trim());
    }
  }
  darkCache = map;
  return map;
}


const TYPE_STEPS = [12, 14, 17, 20, 24, 29, 35, 42, 50];

const FONT_FACES = [
  { family: "Rubik", weight: 400, label: "Regular", css: "var(--font-family-text)" },
  { family: "Rubik", weight: 500, label: "Medium", css: "var(--font-family-text)" },
  { family: "Rubik", weight: 600, label: "SemiBold", css: "var(--font-family-text)" },
  { family: "Oswald", weight: 400, label: "Regular", css: "var(--font-family-display)" },
  { family: "Oswald", weight: 700, label: "Bold", css: "var(--font-family-display)" },
];

const SAMPLE = "Текст";
const TEXT = "var(--font-family-text)";
const DISP = "var(--font-family-display)";

/* Имена стилей — типографические, а не роли в интерфейсе: Row Label,
   Value и Wordmark описывают, где стиль применён, и в справочнике набора
   им не место. Размерные группы названы как у Ant: SM, Base, LG, XL,
   Heading. Показана вся шкала, включая пока не занятые ступени. */
const TYPE_GROUPS = [
  [ { name: "SM Normal", step: 12, css: `font: 400 12px/1.4 ${TEXT}; color: var(--color-text-primary)` },
    { name: "SM Strong", step: 12, css: `font: 600 12px/1.4 ${TEXT}; color: var(--color-text-primary)` },
    { name: "SM Caps", step: 12, css: `font: 600 12px/1.3 ${TEXT}; letter-spacing: .08em; text-transform: uppercase; color: var(--color-text-primary)` } ],
  [ { name: "Base Normal", step: 14, css: `font: 400 14px/1.45 ${TEXT}; color: var(--color-text-primary)` },
    { name: "Base Strong", step: 14, css: `font: 500 14px/1.45 ${TEXT}; color: var(--color-text-primary)` } ],
  [ { name: "LG Normal", step: 17, css: `font: 400 17px/1.35 ${TEXT}; color: var(--color-text-primary)` },
    { name: "LG Strong", step: 17, css: `font: 600 17px/1.35 ${TEXT}; color: var(--color-text-primary)` } ],
  [ { name: "XL Normal", step: 20, css: `font: 400 20px/1.3 ${TEXT}; color: var(--color-text-primary)` },
    { name: "XL Strong", step: 20, css: `font: 500 20px/1.3 ${TEXT}; color: var(--color-text-primary)` } ],
  /* Все заголовки одной таблицей: это одна лестница, и разносить её по
     таблицам значит прятать то, ради чего она заведена. */
  [ { name: "Heading 1", step: 42, css: `font: 500 42px/1.1 ${TEXT}; color: var(--color-text-primary)` },
    { name: "Heading 2", step: 35, css: `font: 500 35px/1.15 ${TEXT}; color: var(--color-text-primary)` },
    { name: "Heading 3", step: 29, css: `font: 500 29px/1.2 ${TEXT}; color: var(--color-text-primary)` },
    { name: "Heading 4", step: 24, css: `font: 500 24px/1.25 ${TEXT}; color: var(--color-text-primary)` } ],
];

const DISPLAY_GROUPS = [
  [ { name: "Display LG", step: 50, css: `font: 700 50px/1 ${DISP}; letter-spacing: .02em; text-transform: uppercase; color: var(--color-text-strong)` },
    { name: "Display SM", step: 20, css: `font: 400 20px/1 ${DISP}; letter-spacing: .03em; text-transform: uppercase; color: var(--color-text-primary)` } ],
  [ { name: "Display Title", step: 35, css: `font: 700 35px/1 ${DISP}; letter-spacing: .02em; text-transform: uppercase; color: var(--color-text-strong)` },
    { name: "Display Table", step: 24, css: `font: 700 24px/1 ${DISP}; letter-spacing: .02em; text-transform: uppercase; color: var(--color-text-strong)` } ],
];

/* ---- чтение токенов ---- */

let declaredCache = null;
function declaredTokens() {
  if (declaredCache) return declaredCache;
  const map = new Map();
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules) {
      if (!rule.selectorText || !rule.selectorText.includes(":root")) continue;
      for (const prop of rule.style) {
        if (prop.startsWith("--")) map.set(prop, rule.style.getPropertyValue(prop).trim());
      }
    }
  }
  declaredCache = map;
  return map;
}

function tokenRef(name) {
  const m = (declaredTokens().get(name) || "").match(/^var\((--[a-z0-9-]+)\)$/);
  return m ? m[1] : null;
}

function tokenValue(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function tokenGroup(name) {
  if (name.startsWith("--color-base-")) return "примитив";
  if (COMPONENT_TOKENS.has(name)) return "компонентный";
  return "семантический";
}

function familyOf(name) {
  let cur = name, guard = 0;
  while (cur && !cur.startsWith("--color-base-") && guard++ < 6) cur = tokenRef(cur);
  if (!cur) return null;
  const rest = cur.slice("--color-base-".length);
  return FAMILIES.find(([f]) => rest.startsWith(f + "-"))?.[0] || null;
}

/* ---- таблица Ant: Токен | Группа | Значение | Описание ---- */

/* Строка — отдельный флекс-блок, граница рисуется на ней, а не на
   ячейках. В сетке границу рисовала каждая ячейка по своей высоте, и
   линии под одной строкой расходились; здесь их рисует один элемент,
   разойтись нечему. */
const row = (cells, head = false) =>
  h("div", { class: `k-row${head ? " k-row-head" : ""}` }, ...cells.filter(Boolean));

function antTable(names, { swatch = false } = {}) {
  const table = h("div", { class: "k-tbl" },
    row([h("span", { class: "k-c1" }, "Токен"), h("span", { class: "k-c2" }, "Значение")], true));
  for (const name of names) {
    const value = declaredTokens().get(name) || tokenValue(name);
    table.append(row([
      h("code", { class: "k-c1 k-tbl-name" }, name),
      h("span", { class: "k-c2 k-tbl-value" },
        swatch ? h("span", { class: "k-swatch" }, h("i", { style: `background:${tokenValue(name)}` })) : null,
        h("code", {}, value)),
    ]));
  }
  return table;
}



const block = (title, ...kids) => h("div", { class: "k-block" },
  h("h3", { class: "k-sub-h" }, title), ...kids.filter(Boolean));

/* ---- карточки стайл-гайда ---- */

function typographyBlocks() {
  const faces = block("Шрифты",
    h("div", { class: "k-faces" }, ...FONT_FACES.map((f) =>
      h("div", { class: "k-face" },
        h("div", { class: "k-face-aa", style: `font-family:${f.css}; font-weight:${f.weight}` }, "Аа"),
        h("div", { class: "k-face-meta" },
          h("div", { class: "k-face-name" }, f.family),
          h("div", { class: "k-face-weight" }, `${f.label} ${f.weight}`))))));

  const tokens = block("Токены", antTable(["--font-family-text", "--font-family-display"]));

  const styleTable = (groups) => groups.map((rows) => {
    const table = h("div", { class: "k-styles" },
      row([h("span", { class: "k-s1" }, "Стиль"),
           h("span", { class: "k-s2" }, "Размер, px"),
           h("span", { class: "k-s3" }, "Образец")], true));
    for (const st of rows) {
      table.append(row([
        h("span", { class: "k-s1 k-tbl-name" }, st.name),
        h("span", { class: "k-s2 k-tbl-value" }, String(st.step)),
        h("span", { class: "k-s3", style: st.css }, SAMPLE),
      ]));
    }
    return table;
  });
  const styles = block("Стили набора", ...styleTable(TYPE_GROUPS));
  const display = block("Дисплейные стили", ...styleTable(DISPLAY_GROUPS));
  return [faces, tokens, styles, display];
}

/* Примитивы и тема — две разные карточки, как Core colors и Theme colors
   у Ant. Примитивы делятся на семейства по тону; тема — на роли. */
function colorTokens() {
  const all = [...declaredTokens().keys()].filter((n) => n.startsWith("--color-"));
  return all.filter((n) => !COMPONENT_TOKENS.has(n));
}

function primitiveBlocks() {
  const byFamily = new Map(FAMILIES.map(([f]) => [f, []]));
  for (const name of colorTokens()) {
    if (!name.startsWith("--color-base-")) continue;
    const fam = familyOf(name);
    if (fam) byFamily.get(fam).push(name);
  }
  /* по ступени, а не по алфавиту: иначе neutral-25 встаёт между 200 и 250
     и лестница светлоты перестаёт читаться. Прозрачные — за своей ступенью. */
  const key = (n) => {
    const m = n.match(/-(\d+)(?:-a(\d+))?$/);
    return [m ? +m[1] : 0, m && m[2] ? +m[2] : 0];
  };
  const cmp = (x, y) => key(x)[0] - key(y)[0] || key(x)[1] - key(y)[1] || x.localeCompare(y);
  return FAMILIES
    .filter(([f]) => byFamily.get(f).length)
    .map(([f, title]) => block(title, antTable(byFamily.get(f).sort(cmp), { swatch: true })));
}

const THEME_GROUPS = [
  ["Фон", "--color-bg-"],
  ["Текст", "--color-text-"],
  ["Линии", "--color-border-"],
  ["Действие и статусы", "--color-action|--color-status-"],
];

/* Тон текста — свойство текста, а не компонент (B1; styles.css:615 говорит
   то же прямо: «Компонента „сообщение“ в системе нет»). Поэтому карточки в
   разделе компонентов у него нет, а место — здесь, строкой образцов сразу
   за токенами текста: тон не несёт ни кегля, ни отступа, он весь целиком
   один токен цвета. */
const TEXT_TONES = [
  ["danger", "tone-danger", "--color-text-danger"],
  ["warning", "tone-warning", "--color-text-warning"],
  ["success", "tone-success", "--color-text-success"],
  ["muted", "tone-muted", "--color-text-tertiary"],
];

const toneBlock = () => block("Тон текста",
  h("div", { class: "k-tones" }, ...TEXT_TONES.map(([name, cls, token]) =>
    h("div", { class: "k-tone" },
      h("span", { class: `k-tone-sample ${cls}` }, "Текст"),
      h("span", { class: "k-tone-name" }, name),
      h("code", { class: "k-tone-token" }, token)))));

/* Компонентные токены с тёмной альтернативой: светлое значение из :root,
   тёмное — из .theme-dark. Образец тёмного стоит на тёмной подложке. */
function componentThemeBlock() {
  const names = [...darkTokens().keys()];
  const probe = h("div", { class: "theme-dark", hidden: true });
  document.body.append(probe);
  const table = h("div", { class: "k-tbl" },
    row([h("span", { class: "k-c1" }, "Токен"), h("span", { class: "k-c3" }, "Светлая"),
         h("span", { class: "k-c3" }, "Тёмная")], true));
  for (const name of names) {
    const light = declaredTokens().get(name) || tokenValue(name);
    const dark = darkTokens().get(name);
    const darkValue = getComputedStyle(probe).getPropertyValue(name).trim();
    table.append(row([
      h("code", { class: "k-c1 k-tbl-name" }, name),
      h("span", { class: "k-c3 k-tbl-value" },
        h("span", { class: "k-swatch" }, h("i", { style: `background:${tokenValue(name)}` })), h("code", {}, light)),
      h("span", { class: "k-c3 k-tbl-value" },
        h("span", { class: "k-swatch k-swatch-dark" }, h("i", { style: `background:${darkValue}` })), h("code", {}, dark)),
    ]));
  }
  probe.remove();
  return block("Компонентные", table);
}

function themeBlocks() {
  const names = colorTokens().filter((n) => !n.startsWith("--color-base-"));
  const out = [];
  for (const [title, prefix] of THEME_GROUPS) {
    const rows = names.filter((n) => prefix.split("|").some((p) => n.startsWith(p))).sort();
    if (!rows.length) continue;
    out.push(block(title, antTable(rows, { swatch: true })));
    if (title === "Текст") out.push(toneBlock());
  }
  out.push(componentThemeBlock());
  return out;
}

function spaceBlocks() {
  return [block("Отступ", antTable(["--space-1", "--space-2", "--space-3", "--space-4", "--space-5", "--space-6", "--space-7", "--space-card"])),
          block("Размер", antTable(["--size-shell", "--size-shell-bordered", "--size-wrap-min", "--size-kit-rail"])),
          block("Справочный слой", antTable([...declaredTokens().keys()].filter((n) => n.startsWith("--size-ref-"))))];
}

/* Иконки. Глифы показаны на всей шкале сразу: правило «12 — Fill,
   остальное — Bold» проверяется глазами, а не на слово. Список — ровно те
   глифы, которые вызываются во фронте. */
const ICON_NAMES = ["caret-down", "x",
  "square-split-horizontal", "arrows-out-line-horizontal", "calendar-blank"];

function iconBlocks() {
  const table = h("div", { class: "k-tbl" },
    row([h("span", { class: "k-i1" }, "Глиф"), h("span", { class: "k-i2" }, "Вес"),
         ...ICON_SIZES.map((px) => h("span", { class: "k-i3" }, `${px} px`))], true));
  for (const name of ICON_NAMES) {
    table.append(row([
      h("code", { class: "k-i1 k-tbl-name" }, name),
      h("span", { class: "k-i2 k-tbl-value" }, iconPath(name).weight),
      ...ICON_SIZES.map((px) => h("span", { class: "k-i3" }, icon(name, px))),
    ]));
  }

  return [block("Шкала и вес", table)];
}

function effectBlocks() {
  return [block("Скругление", antTable(["--radius-ref-bar", "--radius-xs", "--radius-sm", "--radius-md", "--radius-lg", "--radius-xl", "--radius-pill"])),
          block("Тень", antTable(["--shadow-surface", "--shadow-overlay"])),
          block("Длительность", antTable(["--motion-duration-mid"]))];
}

/* ------------------------------------------------ сборка ------------- */

const partHead = (id, title) => h("h1", { class: "k-part", id }, title);
const rule = () => h("div", { class: "k-rule" });

/* Разделитель ставится только между компонентами: там блок — это
   отдельная вещь со своей матрицей, и без линии они слипаются. В
   стайл-гайде блоки одной природы, разделитель там лишний шум. */
function blocksCard(id, title, blocks, { rules = false } = {}) {
  const body = h("div", { class: "k-card-body-blocks" });
  blocks.filter(Boolean).forEach((b, i) => { if (rules && i) body.append(rule()); body.append(b); });
  return h("section", { class: "k-card", id }, h("h2", { class: "k-card-h" }, title), body);
}

function build() {
  const rail = document.getElementById("rail");
  const main = document.getElementById("kitMain");
  const link = (id, text, sub) => h("a", { class: `k-link${sub ? " k-sub" : ""}`, href: `#${id}` }, text);

  rail.append(link("part-style", "Стайл-гайд"));
  main.append(partHead("part-style", "Стайл-гайд"));
  for (const [id, title, blocks] of [
    ["sg-type", "Типографика", typographyBlocks()],
    ["sg-primitives", "Примитивы", primitiveBlocks()],
    ["sg-theme", "Тема", themeBlocks()],
    ["sg-space", "Размеры и отступы", spaceBlocks()],
    ["sg-effect", "Эффекты", effectBlocks()],
    ["sg-icons", "Иконки", iconBlocks()],
  ]) {
    rail.append(link(id, title, true));
    main.append(blocksCard(id, title, blocks));
  }

  rail.append(link("part-components", "Компоненты"));
  main.append(partHead("part-components", "Компоненты"));
  // A2: каталог по слоям, плоским списком внутри по алфавиту (C1). Схем
  // без layer в SPECS больше нет, поэтому фильтр здесь — раскладка по
  // слоям, а не отсев несовместимого формата.
  for (const [layer, title] of LAYERS) {
    const specs = SPECS.filter((s) => s.layer === layer)
      .sort((a, b) => a.name.localeCompare(b.name, "ru"));
    if (!specs.length) continue;
    const id = `l-${layer}`;
    rail.append(link(id, title, true));
    main.append(blocksCard(id, title, specs.map(componentBlock), { rules: true }));
  }
}

build();
