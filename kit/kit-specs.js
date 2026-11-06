/* BrandSim UI-кит — схемы компонентов.
 *
 * Каждая схема показывает формы, в которых компонент живёт в продукте
 * сейчас, во всех состояниях. Старые формы, которых в разметке больше нет,
 * из кита снимаются.
 *
 * Схема описывает варианты данными, а не прозой: из одной записи движок
 * рисует и матрицу, и стенд.
 *
 * Формат по контракту KIT-RULES.md — на нём написаны все схемы файла,
 * старого формата (group/props) в нём больше не осталось:
 *   id, name       — адрес компонента в ките (A1/C1)
 *   layer          — atom | molecule (A1; организмы в кит не собираются)
 *   purpose        — назначение, одна строка (E1)
 *   options        — оси-опции компонента, { values: […] } (E1/B2). Словарь
 *                    двузначной опции один на весь кит — off | on (C2):
 *                    булева типа в схемах нет. С ним одно и то же понятие
 *                    записывалось двумя способами, а матрица подписывалась
 *                    «ДА»/«НЕТ» вместо имён значений
 *   modifiers      — оси-модификаторы, могут принадлежать значению опции
 *                    через `of: "опция:значение"` (B3)
 *   only/of/statesOnly — ограничения: комбинации, которой в продукте НЕ
 *                    БЫВАЕТ (B2) — клетка матрицы остаётся ПУСТОЙ. Условие
 *                    "ключ:значение|значение" либо массив условий, значение
 *                    пишется как в схеме. Все три исполняет applicable() в
 *                    kit.js, ключи и значения проверяет kit-contract-check.py
 *   unstyled       — ПОМЕЧЕННЫЕ клетки (B3): форма в продукте есть, а
 *                    правила ей не написали. Запись —
 *                    { when: ["ключ:значение", "state:hover|disabled"],
 *                      why: "нет правила" | "не реализовано" }: условие той
 *                    же грамматики, что у ограничений, плюс ключ state.
 *                    Заполняется по замеру CSS, а не по ощущению; в клетке
 *                    вместо образца стоит причина
 *   states         — состояния из закрытого словаря (B5)
 *   content        — что показывает компонент помимо опций (B1/B4)
 *   usedIn         — где стоит; единственное легальное место для адреса экрана (E1)
 *   axes           — что по колонкам, что по строкам, что в группах
 *   render(p)      — элемент, к которому применяется состояние
 *   frame(node)    — обёртка-контекст, если правила CSS требуют предка
 *   snippet(p)     — строка для копирования в экран
 *
 * Организмов в ките нет (KIT-RULES.md, A1): интерфейс маленький, их состав
 * виден на живом экране. Формат ниже остаётся для проверки схем.
 * У организма (A1) ни опций, ни матрицы, ни отрисовки нет — вместо
 * options/modifiers/states/content/axes/render карточка описывает состав (E2):
 *   parts          — части по порядку: `of` — ссылка на карточку компонента,
 *                    `name` — имя части, у которой карточки в ките нет;
 *                    `props` — значения опций, `when` — условие появления
 *   decides        — что организм решает за себя. Пустой список означает,
 *                    что перед нами молекула, и карточка должна быть обычной
 *   modes          — переключаемые виды целого
 */

import { helpTip, HELP_TIP_SIZES } from "./ui.js";
import { icon } from "./icons.js";
import { legendSwatch } from "./radar.js";
import {
  screenStrip, refPanel, segmentTabs, kpiTile, multiStat, nameCell, leaderBarCell,
  divergeCell, ratioBar, deltaSlot, ppDelta, relDelta, edgeFades,
} from "./reference.js";

const h = (tag, attrs = {}, ...kids) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  for (const kid of kids.flat(3)) {
    if (kid === null || kid === undefined || kid === false || kid === "") continue;
    node.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return node;
};

// контекст-обёртки: часть правил живёт только внутри предка
const inBc2 = (node) => h("div", { class: "bc2" }, h("div", { class: "bc-edit" }, node));

/* Контент образцов обезличен: в ките подписано назначение слота, а не
   продуктовый текст. Знак подсказки берёт ключ, которого в словаре
   подсказок нет, — тогда он показывает переданный текст. */
const TIP_TEXT = "Текст подсказки";
const kitTip = (opts) => helpTip("kit", TIP_TEXT, opts);

/* ---- строка свойства и поле со слайдером ----
   propRow, sliderField и field в levers.js не экспортируются и сидят на
   состоянии игры, поэтому разметка повторена здесь ровно той структурой и
   теми классами, которые строит levers.js. Стили при этом настоящие. */

// Ширину поля значения продукт задаёт по замеру невидимого двойника; здесь то же
// самое, иначе поле растягивается на двадцать символов и единица отъезжает.
const sizeToGhost = (input, ghost) => requestAnimationFrame(() => {
  ghost.textContent = input.value || "0";
  input.style.width = `${Math.ceil(ghost.getBoundingClientRect().width) + 1}px`;
});

/* Дорожка и полоса захвата — атом «слайдер». Его правила записаны через
   .sfield, поэтому без предка он не живёт: в поле он стоит внутри .sfield,
   а своей карточке кит даёт ему тот же предок с погашенным видом. */
const kitTrack = ({ fill = 40, mark = null } = {}) => [
  h("span", { class: "sf-track" },
    h("i", { style: `width:${fill}%` }),
    mark === null ? null : h("u", { class: "sf-mark", style: `left:${mark}%` }),
    h("b", { style: `left:${fill}%` })),
  h("input", { class: "sf-range", type: "range", "aria-label": "Значение" }),
];

/* Поле с дорожкой. Состояние поля ставит движок кита на сам .sfield —
   наведение и фокус поля к слайдеру внутри отношения не имеют. */
function kitSlider({ value, unit, amount, fill = 40, mark = null, mod = false, track = true }) {
  const input = h("input", { class: "sf-value", type: "text", value, "aria-label": "Значение" });
  const ghost = h("span", { class: "sf-ghost", "aria-hidden": "true" });
  const node = h("div", { class: mod ? "sfield mod" : "sfield" },
    h("div", { class: "sf-row" },
      h("div", { class: "sf-main" }, input, ghost, unit ? h("span", { class: "sf-unit" }, unit) : null),
      amount ? h("span", { class: "sf-amount" }, amount) : null),
    ...(track ? kitTrack({ fill, mark }) : []));
  sizeToGhost(input, ghost);
  return node;
}

/* Обёртка поля — молекула `field`. Тон сообщения приходит параметром: в
   продукте текст ставит валидатор (validation.js:164) и он же выбирает
   класс тона, а сама обёртка (levers.js:183) слота сообщения не знает —
   текст ей дописывают снаружи. */
const kitField = (caption, control, { tip, action, issue, tone = "danger" } = {}) =>
  h("div", { class: "field" },
    h("span", { class: "field-cap" }, caption,
      tip ? kitTip() : null,
      h("i", { class: "mod-dot", "aria-hidden": "true" }),
      action || null),
    control,
    issue ? h("div", { class: `issue-msg tone-${tone}` }, issue) : null);

const kitCaret = (open) => h("span", { class: open ? "chev up" : "chev", "aria-hidden": "true" }, icon("caret-down", 12));
const kitEdit = (text, open = false) => h("button", { class: "btn-edit small", type: "button" }, text, kitCaret(open));
const kitWord = (text) => h("button", { class: "word-btn", type: "button" }, text);

// Каждая строка в .prop-group, раскрытая или нет — как в levers.js.
function kitPropRow({ label, tip, middle, controls, body }) {
  const row = h("div", { class: middle ? "prop-row middle" : "prop-row" },
    h("div", { class: "prop-label" }, h("span", {}, label, kitTip())),
    ...controls);
  return h("div", { class: "prop-group" }, row, body);
}

const kitChannel = (value, fill, mark) =>
  kitField("Лейбл поля", kitSlider({ value, unit: "ед.", amount: "Пересчёт", fill, mark }), { tip: true, action: kitWord("Действие") });

// Строка с живыми контролами: поле с подписью и кнопка, под ними —
// раскрывающееся тело с полями (levers.js:458).
const kitRowControls = (open) => kitPropRow({
  label: "Лейбл строки",
  controls: [h("div", { class: "prop-ctl" },
    kitField("Лейбл поля", kitSlider({ value: "Значение", unit: "ед.", fill: 50 })),
    kitEdit("Текст кнопки", open))],
  body: open ? h("div", { class: "prop-body channels-body" }, h("div", { class: "channels" },
    kitChannel("Значение", 45, 38),
    kitChannel("Значение", 40, 47),
    kitChannel("Значение", 15, 15))) : null,
});

/* Строка со сводкой: вместо контролов — итог одной строкой и кнопка правки,
   сама правка живёт в раскрывающемся теле (levers.js:596).

   Точка изменения и словесная кнопка стоят в сводке ВСЕГДА (levers.js:600-610),
   а показывает их класс mod (styles.css:1460-1462) — поэтому оба узла здесь
   тоже всегда, а различает формы один класс, как в продукте. */
const kitRowSummary = (open, modified) => kitPropRow({
  label: "Лейбл строки", middle: true,
  controls: [h("div", { class: "prop-ctl" },
    h("span", { class: modified ? "prop-summary mod" : "prop-summary" },
      h("span", { class: "ps-label" }, "Подпись"),
      h("span", { class: "ps-line" },
        h("b", { class: "ps-value" }, "Значение"),
        h("i", { class: "mod-dot", "aria-hidden": "true" }),
        kitWord("Действие"))),
    kitEdit("Текст кнопки", open))],
  body: open ? h("div", { class: "prop-body" }, h("div", { class: "attrs-edit" },
    kitField("Лейбл поля", kitSlider({ value: "Значение", unit: "ед.", fill: 55 }), { action: kitWord("Действие") }),
    kitField("Лейбл поля", kitSlider({ value: "Значение", unit: "ед.", fill: 40 }), { action: kitWord("Действие") }))) : null,
});

// Контекст справочного слоя: без .ref не срабатывают тоны, таблицы и запросы
// ширины; панели лежат на сером поле панели обзора.
const inRef = (node) => h("div", { class: "ref" }, node);
const onRefCanvas = (node) => h("div", { class: "ref k-ref-canvas" }, node);

/* Полосы и слоты стоят внутри ячейки таблицы: ширину, выравнивание по
   правому краю и подсветку строки им даёт она. Без этого предка образец
   меряет себя не тем и разъезжается. */
const inTableRow = (cell) => inRef(h("table", { class: "ref-table" }, h("tbody", {}, h("tr", {}, cell))));
const inNumCell = (node) => inTableRow(h("td", { class: "num" }, node));
const KIT_SEGMENTS = [{ id: "t1", label: "Текст таба" }, { id: "t2", label: "Текст таба" }, { id: "t3", label: "Текст таба" }];
const KIT_COMPANIES = [["Объект", 0.327, true], ["Объект", 0.212], ["Объект", 0.175], ["Объект", 0.159], ["Объект", 0.127]];

// primary/secondary различаются классом; text и text·accent — одна форма
// (D1: цвет покоя — токен, не значение), тон accent — модификатор variant:text.
const BTN_CLASS = { primary: "primary", secondary: "" };
const textBtnClass = (tone) => (tone === "accent" ? "word-btn accent" : "word-btn");
const isTextBtn = (variant) => variant === "text";
// content: «надпись» — контент, не ось; конкретное значение не выбирается
// в матрице, поэтому зашито здесь ровно тем же текстом, что было дефолтом оси.
const BUTTON_LABEL = "Текст кнопки";

// Классы чипа: тип — свой класс, тон — общий словарь .tone-* (styles.css:615),
// тот же, что у текста. Одна запись на render и на строку для копирования.
const chipClass = (p) => ["chip", p.type === "borderless" ? "borderless" : "",
  p.tone && p.tone !== "none" ? `tone-${p.tone}` : ""].filter(Boolean).join(" ");

/* Лексика осей — английская и совпадает с тем, что пишется в классе: что
   видно в ките, то и набирается в коде. Проза и пояснения остаются
   русскими (C2). */

export const SPECS = [
  /* ============================================== АТОМЫ ================
     A2: внутри слоя плоский список по алфавиту — в том же порядке, в каком
     их выставляет каталог.

     Слой по A1 — по тому, есть ли внутри компоненты системы, а не по
     размеру и не по сложности разметки. Поэтому гантель, столбцы индекса
     и стопка долей стоят здесь: рисуют они много, но ни одна карточка кита
     внутрь них не вкладывается. */

  {
    id: "dumbbell",
    name: "Гантель",
    layer: "atom",
    purpose: "Ставит пару значений одного объекта на общую шкалу и меряет разрыв",
    /* Только сама гантель: две метки на общей шкале и связка между ними.
       Строка таблицы вокруг — подписи, числа, шкала с делениями — ей не
       принадлежит. Опций нет: какая метка левее, решают данные, форма от
       этого не меняется. Подсказка над меткой — слушатель мыши, не CSS. */
    states: [],
    content: ["позиция полой метки", "позиция залитой метки"],
    usedIn: ["Показатели"],
    axes: { cols: null, rows: null },
    render: () => h("span", { class: "ref-dumb-track" },
      h("i", { class: "ref-dumb-link", style: "--x0:0.3;--x1:0.7" }),
      h("b", { class: "ref-dumb-guess", style: "--x:0.3", "data-tip": TIP_TEXT }),
      h("b", { class: "ref-dumb-fact", style: "--x:0.7", "data-tip": TIP_TEXT })),
    frame: inRef,
    snippet: () => '<span class="ref-dumb-track"><i class="ref-dumb-link"></i><b class="ref-dumb-guess"></b><b class="ref-dumb-fact"></b></span>',
  },

  {
    id: "help-tip",
    name: "Знак подсказки",
    layer: "atom",
    purpose: "Открывает пояснение к тому, что стоит рядом",
    options: {
      size: { values: HELP_TIP_SIZES },
    },
    states: ["default", "hover", "focus"],
    content: ["текст подсказки"],
    usedIn: ["карточка бренда", "справочный слой", "панель гипотез"],
    axes: { cols: "state", rows: "size" },
    render: (p) => kitTip({ size: p.size }),
    snippet: (p) => (p.size === "sm" ? "helpTip(key)" : `helpTip(key, null, { size: "${p.size}" })`),
  },

  {
    id: "button",
    name: "Кнопка",
    layer: "atom",
    purpose: "Запускает действие",
    options: {
      /* Свойств четыре, осей в матрице три, поэтому наличие иконки входит в строку,
         а не живёт отдельным переключателем: иначе половина канона прячется за
         выпадающим списком и её не видно. */
      variant: { values: ["primary", "secondary", "text"] },
      // size есть только у primary и secondary: text — это текст, его высота от строки.
      size: { values: ["default", "small"], only: "variant:primary|secondary" },
      /* Содержимое — два независимых переключателя. Кнопка без текста и с
         иконкой — это и есть иконочная кнопка; отдельного компонента для неё нет. */
      text: { values: ["off", "on"], default: "on" },
      icon: { values: ["off", "on"], default: "on" },
    },
    modifiers: {
      // D1: text-accent отличался от text только цветом покоя — не значение, а тон.
      tone: { of: "variant:text", values: ["none", "accent"] },
    },
    states: ["default", "hover", "focus", "disabled", "busy"],
    content: ["надпись", "глиф иконки"],
    usedIn: ["полоса управления", "карточка бренда", "справочный слой"],
    axes: { cols: "state", rows: "variant", groups: "icon" },
    render: (p) => {
      const base = isTextBtn(p.variant) ? textBtnClass(p.tone) : BTN_CLASS[p.variant];
      const cls = [base, p.size === "small" && !isTextBtn(p.variant) ? "small" : ""]
        .filter(Boolean).join(" ");
      const glyph = p.icon === "on" ? icon("caret-down", isTextBtn(p.variant) ? 12 : 16) : null;
      return h("button", { class: cls || null, type: "button", "aria-label": p.text === "on" ? null : "Свернуть" },
        glyph, p.text === "on" ? BUTTON_LABEL : null);
    },
    snippet: (p) => {
      const base = isTextBtn(p.variant) ? textBtnClass(p.tone) : BTN_CLASS[p.variant];
      const names = [base, p.size === "small" && !isTextBtn(p.variant) ? "small" : ""]
        .filter(Boolean).join(" ");
      const attr = names ? ` class="${names}"` : "";
      const glyph = p.icon === "on" ? ' + icon("caret-down", 16)' : "";
      return `<button${attr}>${p.text === "on" ? BUTTON_LABEL : ""}</button>${glyph}`;
    },
  },

  {
    id: "switch",
    name: "Переключатель",
    layer: "atom",
    purpose: "Включает и выключает одно свойство, применяется сразу",
    /* Пять прежних значений были именами классов и категориями данных (C1).
       Форм на деле три — по тому, чем показан выбор. Четвёртая отрисовка,
       бледная заливка, формы своей не имеет: по D1 это прозрачность, то есть
       токен, и в оси её нет. */
    options: {
      marker: { values: ["toggle", "radio", "swatch"] },
    },
    modifiers: {
      fill: { of: "marker:swatch", values: ["solid", "outline"] },
    },
    states: ["default", "hover", "focus", "selected", "disabled"],
    content: ["подпись", "цвет объекта"],
    // стенд кита — не экран продукта, и адресом быть не может (E1):
    // .switcher стоит в карточке бренда (levers.js), .claim — пункт
    // лестницы позиционирования там же (ladder.js), .radar-toggle — в
    // легенде радара
    usedIn: ["карточка бренда", "легенда радара"],
    axes: { cols: "state", rows: "marker", groups: "selected" },
    render: (p) => {
      if (p.marker === "toggle") {
        return h("label", { class: "switcher" },
          h("input", { type: "checkbox", checked: p.selected }),
          h("span", { class: "track" }, h("i", {})));
      }
      if (p.marker === "swatch") {
        const kind = p.fill === "outline" ? "ideal" : "physical";
        const swatch = legendSwatch({ kind,
          color: kind === "ideal" ? "var(--color-base-chart-3)" : "var(--color-base-chart-own-1)" });
        swatch.toggleAttribute("data-on", !!p.selected);
        return h("label", { class: "radar-toggle" },
          h("input", { type: "checkbox", checked: p.selected }),
          swatch,
          h("span", {}, "Подпись"));
      }
      return h("label", { class: "claim" },
        h("input", { type: "radio", checked: p.selected }),
        h("span", {}, "Подпись"));
    },
    snippet: (p) => {
      const cls = { toggle: "switcher", radio: "claim", swatch: "radar-toggle" }[p.marker];
      const type = p.marker === "radio" ? "radio" : "checkbox";
      return p.marker === "swatch"
        ? `<label class="${cls}"><input type="checkbox"> + legendSwatch({ kind, color }) + <span>…</span></label>`
        : `<label class="${cls}"><input type="${type}">…</label>`;
    },
  },

  {
    id: "input",
    name: "Поле ввода",
    layer: "atom",
    purpose: "Принимает значение с клавиатуры",
    /* Три прежних пресета («цена», «канал», «свойство») — наборы значений
       этих трёх переключателей, а не формы поля (B6). «Изменено» и «ошибка»
       стояли в оси состояний, но в словарь не входят и полем не владеют:
       точка изменённого и текст ошибки принадлежат обёртке с подписью —
       она молекула и переезжает задачей 4. */
    options: {
      slider: { values: ["off", "on"] },
      unit: { values: ["off", "on"] },
      amount: { values: ["off", "on"] },
    },
    /* Слайдер внутри поля — свой атом со своими состояниями (карточка
       «Слайдер»); здесь он всегда в покое, а состояния — у поля. */
    states: ["default", "hover", "focus", "disabled"],
    content: ["значение", "текст единицы", "текст пересчёта", "позиция отметки"],
    // голое `label.field input` стоит на входе (index.html:41), в админке
    // (admin.js:74-76) и в диалоге названия команды (app.js:200); в
    // карточке бренда его нет — там живёт только поле с дорожкой
    usedIn: ["вход", "админка", "модальные окна", "карточка бренда"],
    axes: { cols: "state", rows: "slider", groups: "unit" },
    render: (p) => {
      // голое поле не принимает ни единицы, ни пересчёта: такие комбинации
      // помечены unstyled и до render не доходят — иначе он молча рисовал
      // бы один и тот же <input> на все четыре
      // дорожка — вложенный слайдер; единица, пересчёт и состояния от неё не зависят
      return kitSlider({
        value: "Значение",
        unit: p.unit === "on" ? "ед." : null,
        amount: p.amount === "on" ? "Пересчёт" : null,
        fill: 45,
        track: p.slider === "on",
      });
    },
    snippet: (p) => (p.slider === "on"
      ? `sliderField({ value${p.unit === "on" ? ", unit" : ""}${p.amount === "on" ? ", amount" : ""} })`
      : '<div class="sfield"><div class="sf-row">…</div></div>'),
  },

  {
    id: "ratio-bar",
    name: "Полоса доли",
    layer: "atom",
    purpose: "Ставит рядом с числом короткую полосу его доли от целого",
    /* Одна из четырёх форм, которые прежде стояли значениями одной оси
       «ячейки с полосой». Функции у них разные — эта отвечает на вопрос
       «сколько от ста процентов», — и по E4 у каждой своя карточка. */
    states: [],
    content: ["доля", "подпись"],
    usedIn: ["Показатели", "Рынок", "панель гипотез"],
    axes: { cols: null, rows: null },
    render: () => ratioBar(0.202, "20,2%"),
    frame: inNumCell,
    snippet: () => "ratioBar(ratio, text)",
  },

  {
    id: "diverge-bar",
    name: "Полоса отклонения",
    layer: "atom",
    purpose: "Растит полосу от середины в ту сторону, в какую ушло отклонение",
    /* Полоса растёт от середины влево или вправо — это геометрия, а не
       цвет: `right: 50%` против `left: 50%` (styles.css:1813-1814). Сведи
       обе к одному цвету, и различие останется, значит по D1 форма.
       Набор из двух сторон закрыт, а закрытое перечислимое по B1 остаётся
       опцией, кто бы ни выбирал значение: число из данных лишь выбирает
       из набора, который нарисовали мы. Имена по форме — куда идёт полоса,
       а не что это значит про показатель (C1).

       Длина полосы опцией не стала: она непрерывна, то есть контент. */
    options: {
      direction: { values: ["left", "right"] },
    },
    states: [],
    content: ["величина отклонения", "масштаб таблицы"],
    usedIn: ["Показатели", "Рынок"],
    axes: { cols: null, rows: "direction" },
    // величина у обоих образцов одна: тогда видно, что различает их именно
    // сторона, а не длина — длина здесь контент
    render: (p) => (p.direction === "right"
      ? divergeCell(ppDelta(0.229, 0.175), 5.4)
      : divergeCell(ppDelta(0.175, 0.229), 5.4)),
    frame: inTableRow,
    // сторону задаёт знак числа, отдельного параметра у вызова нет
    snippet: (p) => `divergeCell(ppDelta(cur, prev), max) // ${p.direction === "right" ? "cur > prev" : "cur < prev"}`,
  },

  {
    id: "divider",
    name: "Разделитель",
    layer: "atom",
    purpose: "Отбивает соседние блоки линией",
    /* Три прежних значения сведены в одно. Линия
       толщиной 1px: отдельным узлом (styles.css:1241) или внутренней тенью
       соседа (styles.css:713, 861, 1272, 1285, 1502) — нарисовано одно и то
       же, а «сверху» и «снизу» — адрес относительно соседа, не форма (C1).
       Цвет за формой не закреплён: тенью рисуют и soft (713, 1285, 1502), и
       default (861, 1272), — значит он выбирается местом, то есть токен. */
    states: [],
    content: [],
    usedIn: ["карточка бренда", "полоса управления", "справочный слой"],
    axes: { cols: null, rows: null },
    render: () => h("div", { class: "bc-rule" }),
    snippet: () => '<div class="bc-rule"></div>',
  },

  {
    id: "select",
    name: "Селект",
    layer: "atom",
    purpose: "Выбирает одно значение из готового списка",
    /* expanded в браузере у селекта есть, но показать его кит не может:
       нативный список раскрывается только по действию пользователя, и
       ячейка под заголовком «expanded» показала бы обычный вид. Это ровно
       то враньё, против которого кит и делается, поэтому expanded в states
       не стоит. */
    states: ["default", "hover", "focus", "disabled"],
    content: ["список значений"],
    /* из карточки бренда селект ушёл — продвижение теперь три поля по
       сегментам, — и в продукте селекта сейчас нет. Атом остаётся в ките:
       правила `.bc2 .seg-select` живы, следующий селект возьмёт их. */
    usedIn: [],
    axes: { cols: "state", rows: null },
    render: () => h("select", { class: "seg-select", "aria-label": "Значение" },
      h("option", {}, "Значение 1"), h("option", {}, "Значение 2"), h("option", {}, "Значение 3")),
    // контекст: правило записано как `.bc2 .seg-select` (styles.css)
    frame: inBc2,
    snippet: () => '<select class="seg-select">…</select>',
  },

  {
    id: "slider",
    name: "Слайдер",
    layer: "atom",
    purpose: "Задаёт значение перетаскиванием по дорожке",
    /* Отметка ориентира — лишний узел на дорожке, а не цвет: форма, опция. */
    options: {
      mark: { values: ["off", "on"] },
    },
    states: ["default", "hover", "focus", "disabled"],
    content: ["доля заполнения", "позиция отметки"],
    usedIn: ["карточка бренда"],
    axes: { cols: "state", rows: "mark" },
    /* Корень — полоса захвата: состояние движок ставит ей, а не полю вокруг,
       иначе наведение на слайдер покрасило бы поле. */
    render: () => kitTrack()[1],
    // контекст: дорожка и её правила живут внутри .sfield (styles.css:1423)
    frame: (node, p) => h("div", { class: "sfield k-track-only" },
      kitTrack({ fill: 45, mark: p.mark === "on" ? 38 : null })[0], node),
    snippet: (p) => `sliderField({ value, fill${p.mark === "on" ? ", mark" : ""} })`,
  },

  {
    id: "skeleton",
    name: "Скелет",
    layer: "atom",
    purpose: "Держит место, пока значение не пришло",
    states: [],
    content: ["ширина"],
    usedIn: ["карточка бренда", "админка"],
    axes: { cols: null, rows: null },
    render: () => h("span", { class: "skeleton", style: "width:180px" }),
    snippet: () => '<span class="skeleton" style="width:…"></span>',
  },

  {
    id: "delta-slot",
    name: "Слот дельты",
    layer: "atom",
    purpose: "Держит у числа место под его изменение, даже когда изменения нет",
    /* Место занято всегда, иначе строки без изменения съезжают и колонка
       перестаёт читаться столбиком (reference.js:46). Но форм у слота две,
       и вторая — ровно та, ради которой он заведён: пустой слот шириной в
       своё место и слот с написанным изменением (reference.js:48-51).
       Набор закрытый, значит опция (B1); величина в заполненном слоте
       по-прежнему контент. */
    options: {
      change: { values: ["off", "on"] },
    },
    states: [],
    content: ["величина изменения"],
    usedIn: ["Показатели", "Рынок"],
    axes: { cols: null, rows: "change" },
    render: (p) => deltaSlot(p.change === "on" ? ppDelta(0.56, 0.538) : null),
    // контекст: слот стоит справа от числа и ширину меряет от него
    frame: (node) => inTableRow(h("td", { class: "num" }, h("span", { text: "56%" }), node)),
    snippet: (p) => (p.change === "on" ? "deltaSlot(ppDelta(cur, prev))" : "deltaSlot(null)"),
  },

  {
    id: "index-bars",
    name: "Столбцы индекса",
    layer: "atom",
    purpose: "Выстраивает объекты по общей шкале и подписывает изменение каждого",
    /* Вторая половина прежней карточки «полоса долей и столбцы»: там две
       формы стояли значениями одной оси, хотя отвечают на разные вопросы —
       эта раскладывает объекты по шкале, соседняя делит целое на части. По
       E4 у каждой своя карточка.

       Выделение строки здесь НЕ сводится к цвету: имя набирается жирным
       (styles.css:1894), и только полоса меняет заливку (:1896). Сведи оба
       вида к одному цвету — жирность останется, значит по D1 это форма, а
       по B1 закрытый набор из двух видов — опция. У полосы к лидеру и у
       стопки долей такой опции нет намеренно: там различие действительно
       только цветовое, и «своё» правильно стоит в контенте. Разнобой
       продуктовый, и кит его показывает, а не сглаживает. */
    options: {
      own: { values: ["off", "on"] },
    },
    states: [],
    content: ["значения", "имена", "изменения", "шкала"],
    usedIn: ["Показатели"],
    axes: { cols: null, rows: "own" },
    render: (p) => {
      const own = p.own === "on";
      const row = (name, value, delta) => h("div", { class: own ? "ref-bei-row own" : "ref-bei-row" },
        h("span", { class: "ref-bei-name", text: name }),
        h("span", { class: "ref-bei-track" }, h("i", { style: `width:${value}%` }),
          h("span", { class: "ref-bei-v", style: `left:${value}%`, text: String(value).replace(".", ",") })),
        h("span", { class: "ref-bei-d" }, h("span", { class: `tone-${delta[0]}`, text: delta[1] })));
      return h("div", { class: "ref-bei" },
        h("div", { class: "ref-bei-scale" }, ...[0, 25, 50, 75, 100].map((t) => h("span", { style: `left:${t}%`, text: String(t) }))),
        row("Объект", 61.94, ["down", "▼ 1,92"]),
        row("Объект", 61.58, ["down", "▼ 0,78"]),
        row("Объект", 59.04, ["up", "▲ 1,14"]));
    },
    frame: inRef,
    snippet: (p) => `<div class="ref-bei"><div class="ref-bei-row${p.own === "on" ? " own" : ""}">…</div></div>`,
  },

  {
    id: "share-stack",
    name: "Стопка долей",
    layer: "atom",
    purpose: "Делит целое на части и подписывает каждую изнутри",
    /* Первая половина прежней карточки «полоса долей и столбцы». Своя
       часть отличается от чужих только заливкой и цветом текста
       (styles.css:1744-1749) — по D1 это токен, а выбирают его данные,
       значит признак «своё» тоже контент.

       Состояний нет по той же причине, что у полосы к лидеру: подсказка
       над куском живёт слушателем мыши, а не правилом CSS. */
    states: [],
    content: ["доли", "имена", "признак «своё»"],
    usedIn: ["Показатели"],
    axes: { cols: null, rows: null },
    render: () => {
      let rung = 0;
      return h("div", { class: "ref-stack" }, ...KIT_COMPANIES.map(([name, value, own]) =>
        h("div", { class: `ref-stack-seg ${own ? "own" : `rung-${Math.min(++rung, 5)}`}`, style: `flex-grow:${value}` },
          h("span", { class: "ref-stack-name", text: name }),
          h("span", { class: "ref-stack-v", text: `${String((value * 100).toFixed(1)).replace(".", ",")}%` }))));
    },
    frame: inRef,
    snippet: () => '<div class="ref-stack"><div class="ref-stack-seg own|rung-N">…</div></div>',
  },

  {
    id: "tab",
    name: "Таб",
    layer: "atom",
    purpose: "Переключает вид, не меняя данных",
    /* Три прежних значения были адресами (C1), и ни одно из них табу не
       принадлежит: отсутствие капсулы у переключателя годов — свойство
       панели вокруг (styles.css:878), она молекула и переезжает задачей 4;
       прилипание — состояние среды, в словаре состояний его нет, а разница
       на самом табе одна — фон выбранного (styles.css:1145 против 1127),
       то есть по D1 токен. */
    states: ["default", "hover", "focus", "selected"],
    content: ["надпись"],
    usedIn: ["шапка игрока", "справочный слой", "админка"],
    axes: { cols: "state", rows: null, groups: "selected" },
    render: (p) => h("button", { class: p.selected ? "tab active" : "tab", type: "button" }, "Текст таба"),
    snippet: (p) => `<button class="tab${p.selected ? " active" : ""}">…</button>`,
  },

  {
    id: "chip",
    name: "Чип",
    layer: "atom",
    purpose: "Показывает короткую метку о состоянии дел",
    /* Наведение и фокус есть у нажимаемого чипа (<button>, decisions.js:527);
       метка (<span>) выглядит так же, как он в покое. Под курсором чип
       бледнеет целиком — тон не перекрашивается. */
    options: {
      type: { values: ["default", "borderless"] },
    },
    /* Тон выбирает сборщик, чтобы что-то сказать, и сделан токенами — по
       границе правила D1 это модификатор, а не опция формы. Принадлежит
       компоненту, а не значению type: без рамки тон красит заливку
       (styles.css:388-390), с рамкой — рамку (383-385), но смысл один. */
    modifiers: {
      tone: { values: ["none", "danger", "warning", "success"] },
    },
    states: ["default", "hover", "focus"],
    content: ["текст"],
    usedIn: ["полоса управления", "карточка бренда", "шапка игрока"],
    axes: { cols: "state", rows: "tone", groups: "type" },
    render: (p) => h("button", { class: chipClass(p), type: "button" }, "Текст чипа"),
    snippet: (p) => `<button class="${chipClass(p)}" type="button">…</button>`,
  },

  {
    id: "meter",
    name: "Шкала",
    layer: "atom",
    purpose: "Показывает долю от целого одной полосой",
    /* Прежнее значение over отличалось от обычного ровно одним объявлением —
       цветом заливки (styles.css:2014 против 2013): приведи их к одному
       цвету, и различие исчезнет. По D1 это не значение опции. Тон выбирает
       сборщик, чтобы сказать «превышено», — значит модификатор, сделанный
       токенами. Доля заполнения у обоих одна: она контент, а не тон. */
    modifiers: {
      tone: { values: ["none", "danger"] },
    },
    states: [],
    content: ["доля заполнения"],
    usedIn: ["полоса управления", "панель гипотез"],
    axes: { cols: null, rows: "tone" },
    render: (p) => h("div", { class: p.tone === "danger" ? "cb-meter over" : "cb-meter" },
      h("i", { style: "width:62%" })),
    snippet: (p) => `<div class="cb-meter${p.tone === "danger" ? " over" : ""}"><i style="width:…"></i></div>`,
  },

  /* ============================================== МОЛЕКУЛЫ =============
     A2: внутри слоя плоский список по алфавиту — в том же порядке, в каком
     их выставляет каталог.

     Здесь стоят те, внутрь которых встают карточки кита: у панели — знак
     подсказки, панель табов, разделитель и метка секции; у таблицы — знак
     подсказки в шапке и полосы в ячейках; у плитки итогов — знак
     подсказки; у полосы к лидеру — слот дельты. */

  {
    id: "panel",
    name: "Панель",
    layer: "molecule",
    purpose: "Собирает раздел под общим заголовком",
    /* Прежняя ось head держала три значения в одной колонке — заголовок,
       заголовок со знаком подсказки, заголовок с табами. Первое значение —
       это просто «обе опции выключены», а два других независимы (B2):
       знак подсказки живёт у заголовка, табы — в шапке справа, и включение
       одного другому не мешает. Что в слоте — контент (B4). */
    options: {
      tip: { values: ["off", "on"] },
      tabs: { values: ["off", "on"] },
    },
    states: [],
    content: ["заголовок", "текст подсказки", "набор табов", "тело"],
    usedIn: ["Показатели", "Рынок"],
    /* Обе оси в строки и группы, колонок нет: панель занимает всю ширину
       раздела, и в половине карточки её шапка переносит табы на вторую
       строку — форма, которой в продукте не бывает. */
    axes: { cols: null, rows: "tabs", groups: "tip" },
    render: (p) => {
      const panel = refPanel("Заголовок панели", null,
        h("div", { class: "ref-rule" }), h("h3", { class: "ref-h3" }, "Заголовок"));
      if (p.tip === "on") {
        panel.querySelector(".ref-title")
          .append(kitTip({ size: "lg" }));
      }
      if (p.tabs === "on") panel.querySelector(".ref-panel-head").append(segmentTabs(KIT_SEGMENTS, "t1", () => {}));
      return panel;
    },
    // контекст: панель лежит на сером поле обзора, без него её край не виден
    frame: onRefCanvas,
    snippet: (p) => ["refPanel(title, null, …body)",
      p.tip === "on" ? 'helpTip(key, text, { size: "lg" })' : null,
      p.tabs === "on" ? "segmentTabs(items, id, onPick)" : null].filter(Boolean).join(" + "),
  },

  {
    id: "tabs",
    name: "Панель табов",
    layer: "molecule",
    purpose: "Собирает табы в один переключатель и отбивает их от содержимого",
    /* Опции нет ни одной, и «прилипание» — не исключение. Класс stuck
       ставится не на панель, а на её предка (app.js:359, `.player-sticky`),
       и правило записано как `.player-sticky.stuck .tabs` (styles.css:1213).
       По C1 имя из состояния родителя брать нельзя — «прилипшая» стоит там
       первым примером, — а опцией панели это сделало бы именно его: свою
       форму панель не меняет, меняется форма контейнера вокруг. Прилипает
       контейнер уровня организма, карточки у него нет; долг записан в
       аудит KIT-BINDING.md. У полосы экрана stuck остаётся: там класс на
       ней самой, и форма своя.

       Второго значения «без капсулы» у панели тоже нет: единственная такая
       форма адресуется классом year-tabs (styles.css:878), а разметки,
       которая его ставит, в продукте не осталось — по E4 форма снимается. */
    states: [],
    content: ["набор табов"],
    usedIn: ["шапка игрока", "панель обзора", "справочный слой", "админка"],
    axes: { cols: null, rows: null },
    render: () => h("div", { class: "tabs", role: "tablist" },
      h("button", { class: "tab active", type: "button", role: "tab", "aria-selected": "true" }, "Текст таба"),
      h("button", { class: "tab", type: "button", role: "tab", "aria-selected": "false" }, "Текст таба"),
      h("button", { class: "tab", type: "button", role: "tab", "aria-selected": "false" }, "Текст таба")),
    snippet: () => '<div class="tabs" role="tablist">…</div>',
  },

  {
    id: "summary-tile",
    name: "Плитка итогов",
    layer: "molecule",
    purpose: "Показывает итоговое число вместе с тем, как оно менялось",
    /* Прежняя ось tone (down / up / flat) значением быть не может: стрелку
       и тон выбирает само число, а набор чисел открыт — значит контент
       (B1), и различие у трёх отрисовок всё равно цветовое (D1). Наличие
       слота изменения осталось опцией, текст в нём — контент (B4); тем же
       правилом заведён слот подсказки у подписи (results.js:98). */
    options: {
      body: { values: ["series", "split"] },
      delta: { values: ["off", "on"], default: "on" },
      tip: { values: ["off", "on"] },
    },
    states: [],
    content: ["подпись", "значение", "ряд значений или доли", "текст изменения", "текст подсказки"],
    usedIn: ["Показатели"],
    axes: { cols: "delta", rows: "body", groups: "tip" },
    render: (p) => {
      const kpi = p.body === "split"
        ? { label: "Подпись", text: "32,7%",
            delta: p.delta === "on" ? ppDelta(0.327, 0.311) : null,
            split: KIT_COMPANIES.map(([name, value, own]) => ({ name, value, own: !!own })) }
        : { label: "Подпись", text: "40 111",
            delta: p.delta === "on" ? relDelta(40111, 40642) : null,
            series: [38371, 40245, 40642, 40111] };
      if (p.tip === "on") kpi.tip = TIP_TEXT;
      const tile = kpiTile(kpi, ["Подпись", "Подпись"]);
      tile.querySelectorAll(".ref-kpi-cap span").forEach((cap) => { cap.textContent = "Подпись"; });
      return tile;
    },
    // контекст: плитка меряет себя сеткой блока итогов
    frame: (node) => inRef(h("section", { class: "ref-summary theme-dark k-ref-kpi" }, node)),
    snippet: (p) => `kpiTile({ label, text, ${p.body}${p.delta === "on" ? ", delta" : ""}${p.tip === "on" ? ", tip" : ""} }, seriesLabels)`,
  },

  {
    id: "stat",
    name: "Плитка показателя",
    layer: "molecule",
    purpose: "Показывает подпись и значение одной плиткой",
    /* Прежние три значения были именами классов (C1). Различий на деле
       три, и каждое названо своей опцией — одна опция на одно различие:

         surface — своя подложка, рамка, радиус и поле (styles.css:760)
                   против плотной плитки без подложки, отбитой слева линией
                   (styles.css:1952);
         values  — одно значение против набора пар (reference.js:112);
         delta   — слот изменения у значения.

       Минимальная ширина плотной плитки опцией не является: её задаёт ряд,
       в котором плитка стоит (.fc-tiles), — это раскладка, а не форма.

       Что где сделано в продукте, записано полем only и по B3 показано
       пустыми клетками:

         values: many есть только у плитки с поверхностью;
         delta   есть только у плитки с поверхностью и одним значением
                 (ui.js:141); ни у плотной (forecast.js:146-154), ни у
                 набора пар её в продукте нет ни в одном вызове. */
    options: {
      surface: { values: ["on", "off"] },
      values: { values: ["one", "many"], only: "surface:on" },
      delta: { values: ["off", "on"], only: ["surface:on", "values:one"] },
    },
    states: [],
    content: ["подпись", "значения", "текст изменения"],
    usedIn: ["справочный слой", "полоса управления", "экран решений"],
    // все живые формы разом: группы по поверхности, колонки по набору
    // значений, строки по слоту изменения
    axes: { cols: "values", rows: "delta", groups: "surface" },
    render: (p) => {
      if (p.surface === "off") {
        return h("div", { class: "fc-card" },
          h("span", { class: "fc-k" }, "Подпись"),
          h("span", { class: "fc-v" }, "Значение"));
      }
      if (p.values === "many") {
        return multiStat("Заголовок", [["Значение", "подпись"], ["Значение", "подпись"], ["Значение", "подпись"]]);
      }
      return h("div", { class: "stat" },
        h("div", { class: "k" }, "Подпись"),
        h("div", { class: "v" }, "Значение", p.delta === "on" ? h("span", { class: "delta tone-success" }, "▲ Дельта") : null));
    },
    // контекст: набор пар меряет себя сеткой панели (styles.css:1840)
    frame: (node) => (node.classList.contains("ref-multi") ? inRef(h("div", { class: "ref-facts" }, node)) : node),
    snippet: (p) => (p.surface === "off" ? '<div class="fc-card"><span class="fc-k">…</span><span class="fc-v">…</span></div>'
      : p.values === "many" ? "multiStat(title, [[value, caption, tone?], …])"
      : `statTile(key, value${p.delta === "on" ? ", delta" : ""})`),
  },

  {
    id: "field",
    name: "Поле с подписью",
    layer: "molecule",
    purpose: "Даёт контролу подпись, знаки и сообщение",
    /* «Изменено» и «ошибка» стояли в оси состояний у поля со слайдером. В
       закрытый словарь (B5) они не входят и полю не принадлежат: это факты
       про данные, а не про то, что делает с элементом пользователь, — и
       показывает их обёртка, а не контрол. Значит опции обёртки.

       Точку изменённого обёртка рисует сама, но включается она классом на
       контроле внутри (styles.css:1334) — поэтому render ставит его полю.
       Адресация через ребёнка — дефект того же рода, что `label.field
       input` у атома, и здесь он виден. */
    options: {
      tip: { values: ["off", "on"] },
      action: { values: ["off", "on"] },
      modified: { values: ["off", "on"] },
      message: { values: ["off", "on"] },
    },
    /* Тон выбирает валидатор, чтобы сказать «ошибка» или «предупреждение», и
       сделан токенами: по границе D1 это модификатор, а не опция формы. Без
       текста красить нечего, поэтому принадлежит message (B3).

       Значение в условии пишется ровно так, как оно стоит в схеме. Пока
       двузначные опции жили булевым типом, здесь стояло «message:true», и
       каждое такое условие приходилось помнить отдельно: перепутанный
       словарь не падал, а молча опустошал клетки. Теперь словарь один —
       off | on, — и помнить нечего. */
    modifiers: {
      tone: { of: "message:on", values: ["danger", "warning"] },
    },
    states: [],
    content: ["подпись", "текст сообщения", "вложенный контрол"],
    usedIn: ["карточка бренда"],
    axes: { cols: null, rows: "message", groups: "tip" },
    render: (p) => kitField("Лейбл поля",
      kitSlider({ value: "Значение", unit: "ед.", fill: 45, mod: p.modified === "on" }), {
        tip: p.tip === "on",
        action: p.action === "on" ? kitWord("Действие") : null,
        issue: p.message === "on" ? "Текст сообщения" : null,
        tone: p.tone,
      }),
    // контекст: раскладка обёртки записана как `.bc2 .field` (styles.css:1317)
    frame: inBc2,
    /* Сообщения в строке для копирования нет: текст обёртке дописывает
       валидатор (validation.js:164), параметром она его не принимает. */
    snippet: (p) => {
      const opts = [p.tip === "on" ? "tipKey" : null, p.action === "on" ? "action" : null].filter(Boolean).join(", ");
      const control = `sliderField({ value, unit${p.modified === "on" ? ", modified: true" : ""} })`;
      return `field(caption, ${control}${opts ? `, { ${opts} }` : ""})`;
    },
  },

  {
    id: "leader-bar",
    name: "Полоса к лидеру",
    layer: "molecule",
    purpose: "Меряет значение строки долей от лучшего значения таблицы",
    /* Прежних значений было два — со своим брендом и с чужим, — и
       различала их одна заливка (reference.js:190, styles.css:1802):
       приведи обе к одному цвету, и различие исчезнет. По D1 это токен, а
       не форма, значит признак «своё» — контент, который его выбирает.

       Состояний нет: подсказка над полосой всплывает по слушателю мыши
       (ui.js:114), в CSS её нет, и принудительно кит её не включит — как
       у нативного списка селекта. Подсветка строки под указателем
       принадлежит таблице и показана её карточкой. */
    states: [],
    content: ["доля", "доля лидера", "имена", "признак «своё»", "текст изменения"],
    usedIn: ["Показатели", "Рынок"],
    axes: { cols: null, rows: null },
    render: () => leaderBarCell({ value: 0.179, leader: 0.201, name: "Объект", leaderName: "Объект",
      own: true, scope: "группы", delta: ppDelta(0.179, 0.157) }),
    frame: inTableRow,
    snippet: () => "leaderBarCell({ value, leader, name, leaderName, own, scope, delta })",
  },

  {
    id: "strip",
    name: "Полоса экрана",
    layer: "molecule",
    purpose: "Называет экран и держит переключатель периода",
    /* Прежние три значения стояли одной осью, хотя свойства независимы:
       joined снимает нижние скругления, stuck — верхние и добавляет тень
       (styles.css:1702-1703). По B2 это две опции, и все четыре комбинации
       законны: прилипшая полоса продолжается блоком итогов ровно тогда,
       когда joined тоже включено. */
    options: {
      joined: { values: ["off", "on"] },
      stuck: { values: ["off", "on"] },
    },
    states: [],
    content: ["заголовок", "метка периода", "набор табов"],
    usedIn: ["справочный слой"],
    axes: { cols: "stuck", rows: "joined" },
    render: (p) => {
      const node = screenStrip({ title: "Заголовок экрана", period: 3, periods: [0, 1, 2, 3],
        joined: p.joined === "on", onPick: () => {} });
      node.querySelectorAll(".tab").forEach((tab) => { tab.textContent = "Текст таба"; });
      node.querySelector(".ref-strip-title").lastChild.textContent = "Метка";
      if (p.stuck === "on") node.classList.add("stuck");
      return node;
    },
    // контекст: полоса лежит на сером поле панели обзора и в ките не липнет
    frame: onRefCanvas,
    snippet: (p) => `screenStrip({ title, period, periods, onPick${p.joined === "on" ? ", joined: true" : ""} })`,
  },

  {
    id: "empty",
    name: "Пустое состояние",
    layer: "molecule",
    purpose: "Объясняет, почему на месте данных ничего нет",
    /* Кнопка под подписью — живая форма (ui.js:34, вызов в admin.js:53).
       Наличие слота — опция, надпись в нём — контент (B4). Скелет из этой
       записи вынесен в атом задачей 3. */
    options: {
      action: { values: ["off", "on"] },
    },
    states: [],
    content: ["глиф", "заголовок", "подпись", "надпись кнопки"],
    usedIn: ["экран решений", "справочный слой", "админка"],
    axes: { cols: null, rows: "action" },
    render: (p) => h("div", { class: "empty-state" },
      icon("calendar-blank", 24, { class: "empty-icon" }),
      h("div", { class: "empty-title" }, "Заголовок"),
      h("div", { class: "sub" }, "Подпись"),
      p.action === "on" ? h("button", { class: "primary", type: "button", style: "margin-top: var(--space-3)" }, "Текст кнопки") : null),
    snippet: (p) => `emptyState(title, hint${p.action === "on" ? ", { ctaText, onCta }" : ""})`,
  },

  {
    id: "prop-row",
    name: "Строка свойства",
    layer: "molecule",
    purpose: "Ставит подпись свойства рядом с его контролами",
    /* Прежние значения были прозой и именем класса (C1, C2). Различий два,
       и каждое названо своей опцией:

         shows    — что стоит в строке: живые контролы или итог одной
                    строкой с кнопкой правки. Словом body это называть
                    нельзя: body в этой же карточке уже означает
                    раскрывающееся тело, которым управляет expanded;
         modified — знак изменённого значения: точка и словесная кнопка
                    «сбросить» (styles.css:1460-1462). Та же логика, по
                    которой «изменено» стало опцией у поля с подписью: в
                    закрытый словарь состояний (B5) оно не входит.

       Знак изменения написан только у сводки — у строки с контролами его
       несёт вложенное поле, своей карточкой. Записано полем only и по B3
       показано пустой клеткой. Раскрытое тело есть у обоих значений shows. */
    options: {
      shows: { values: ["controls", "summary"] },
      modified: { values: ["off", "on"], only: "shows:summary" },
    },
    /* Раскрытость — носимое складывающееся состояние из словаря (B5):
       применяет его render, потому что в разметке это отдельный узел тела,
       а не псевдокласс. */
    states: ["expanded"],
    content: ["подпись", "текст подсказки", "вложенные контролы"],
    usedIn: ["карточка бренда"],
    axes: { cols: "modified", rows: "shows", groups: "expanded" },
    render: (p) => (p.shows === "summary"
      ? kitRowSummary(p.expanded, p.modified === "on")
      : kitRowControls(p.expanded)),
    // контекст: правила поля и подписи внутри строки записаны через `.bc2`
    frame: inBc2,
    snippet: () => "propRow({ label, tipKey, controls, body })",
  },

  {
    id: "table",
    name: "Таблица",
    layer: "molecule",
    purpose: "Ставит строки под общими колонками и подсвечивает ту, на которую смотрят",
    /* Прежняя ось head держала «один ярус» и «два яруса», причём второе
       значение подписывалось именами классов (C1). Ярусов у шапки два
       тогда, когда колонки собраны в группы, — это и есть переключатель
       формы; имена групп в нём — контент (B4).

       Знак подсказки в шапке опцией таблицы быть не может: в одной и той
       же таблице часть колонок со знаком, часть без (results.js:141-143),
       то есть он принадлежит колонке, а колонка — контент. В образце он
       стоит на одной колонке: по A1 таблица молекула именно потому, что
       внутрь её слотов встают другие компоненты. */
    options: {
      groups: { values: ["off", "on"] },
    },
    states: ["default", "hover"],
    content: ["колонки", "строки", "имена групп", "знаки подсказки", "признак «своё»"],
    usedIn: ["Показатели", "Рынок", "панель гипотез"],
    // строками — ярусы шапки: таблица занимает всю ширину карточки, и рядом
    // в колонку две такие не встают. Состояние читатель выносит в оси сам.
    axes: { cols: null, rows: "groups" },
    render: (p) => {
      const two = p.groups === "on";
      const gs = (i) => (two && (i === 0 || i === 3) ? "num ref-gs" : "num");
      const labels = ["Заголовок", "Заголовок", "Заголовок", "Заголовок", "Заголовок", "Заголовок"];
      /* Наведение подсвечивает строку (styles.css:1763), а не таблицу
         целиком, — двойник data-force ставится на неё. Взята вторая
         строка: на своей к подсветке примешался бы её собственный тон. */
      const row = (name, own, hover, values) => h("tr", { class: own ? "ref-own" : "",
        "data-force": hover && p.state === "hover" ? "hover" : null },
        nameCell(name, own), ...values.map((v, i) => h("td", { class: gs(i), text: v })));
      return h("div", { class: "tablewrap sticky-first" },
        h("table", { class: "ref-table" },
          h("thead", {},
            two ? h("tr", {}, h("th", {}),
              h("th", { colspan: 3, class: "ref-grp ref-gs", text: "Заголовок группы" }),
              h("th", { colspan: 3, class: "ref-grp ref-gs", text: "Заголовок группы" })) : null,
            h("tr", {}, h("th", { text: "Заголовок" }), ...labels.map((l, i) => h("th", { class: gs(i) }, l,
              i === 0 ? kitTip() : null)))),
          h("tbody", {},
            row("Объект", true, false, ["128", "—", "—", "53", "166", "77"]),
            row("Объект", false, true, ["268", "—", "—", "53", "166", "77"]),
            row("Объект", false, false, ["—", "—", "249", "91", "135", "14"]))));
    },
    /* Контекст: тон, липкая первая колонка и подсветка строки записаны
       через предка. Не влезая по ширине, таблица гаснет к краю — как на
       экране. */
    frame: (node) => {
      const box = inRef(node);
      edgeFades(box);
      return box;
    },
    snippet: () => '<div class="tablewrap sticky-first"><table class="ref-table">…</table></div> + edgeFades(page)',
  },

];

// A2: каталог по слоям (A1), а не по функциональным группам — GROUPS снят.
// Внутри слоя список плоский и по алфавиту; порядок в SPECS тот же, чтобы
// файл читался в том же порядке, в каком каталог выставляет карточки.
export const LAYERS = [
  ["atom", "Атомы"],
  ["molecule", "Молекулы"],
];
