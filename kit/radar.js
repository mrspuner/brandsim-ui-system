/* BrandSim — радар вкладки «Показатели» (SVG). Линейный и столбчатый графики
   («Динамика») жили здесь же — панель убрана целиком, drawLineChart/drawBarChart удалены вместе с ней. */

import { clear, el, svgEl } from "./ui.js";
import { SEGMENTS, MINOR_PER_MRUB } from "./state.js";
import { brandName, dec, rub } from "./format.js";

// Цена на делениях подписывается тысячами рублей — иначе «164 447 ₽» не
// влезает на луч. Выводим из той же константы, что и миллионы в P&L.
const MINOR_PER_KRUB = MINOR_PER_MRUB / 1000;

// Семь осей в порядке payload.axes ответа /reports/{period}/radar: шесть характеристик и цена. Подписи — те же слова, что у
// характеристик в карточке и R&D (state.js → ATTRS), плюс «Доступная цена».
// No Frost на радаре не показываем: булево свойство на
// непрерывной шкале только шумит; в модели его вес остаётся. Ось
// «Вместительность» ушла вместе с size_index из модели.
//
// Дальше от центра — всегда «лучше». Ось шума названа как характеристика
// («Уровень шума, дБ», одно название с карточкой и R&D), но шкала у неё
// перевёрнута — тише дальше от центра: иначе одна ось из семи читалась бы
// наоборот, и полигон с тихим холодильником выглядел бы хуже полигона
// с громким. Модель переворачивает те же две оси (payload.inverted_axes).
//
// label — название оси в режиме факта, с единицами; scoreLabel — в режиме
// восприятия: там у всех осей общая шкала баллов 0–10, и единиц в
// названии нет.
export const RADAR_AXES = [
  { id: "volume_l",         label: "Объём, л", unit: "л", digits: 0, scoreLabel: "Объём" },
  { id: "energy_class",     label: "Энергокласс", scoreLabel: "Энергокласс" },
  { id: "durability_index", label: "Надёжность", scoreLabel: "Надёжность" },
  { id: "noise_db",         label: "Уровень шума, дБ", invert: true, unit: "дБ", digits: 0, scoreLabel: "Уровень шума" },
  { id: "design_index",     label: "Дизайн", scoreLabel: "Дизайн" },
  { id: "ergonomics_index", label: "Эргономичность", scoreLabel: "Эргономичность" },
  { id: "price_minor",      label: "Доступная цена, тыс. ₽", invert: true, money: true, scoreLabel: "Доступная цена" },
];

// Режимы радара: факт — профиль в единицах каждой оси, восприятие —
// профиль, каким его видят потребители, на общей шкале. Порядок вкладок
// прежний; по умолчанию открыто восприятие.
export const RADAR_MODES = [
  { id: "physical",  label: "Фактические характеристики" },
  { id: "perceived", label: "Восприятие потребителей" },
];

// Шкала восприятия — баллы модели 0–10 (radar.py, score_profile): 10 всегда
// лучше, у шума и цены — тише и дешевле. Фронт баллы не пересчитывает, а
// рисует как пришли.
export const SCORE_MIN = 0, SCORE_MAX = 10;

const clamp01 = (t) => Math.max(0, Math.min(1, t));

// Доля луча, на которую встаёт значение. Восприятие — балл из десяти. Факт —
// доля диапазона оси из payload.bounds (у всех семи осей, цены тоже):
// «Доступная цена», а не «цена» — дешевле дальше от центра, тише — тоже.
export function axisFrac(axis, value, mode, bounds) {
  if (value == null) return 0;
  if (mode === "perceived") return clamp01((value - SCORE_MIN) / (SCORE_MAX - SCORE_MIN));
  const { min, max } = axisBounds(axis, bounds);
  if (min == null || max == null) return 0;
  const t = clamp01((value - min) / (max - min));
  return axis.invert ? 1 - t : t;
}

function axisBounds(axis, bounds) {
  const range = (bounds && bounds[axis.id]) || {};
  return { min: range.min, max: range.max };
}

// Значение деления g (1..4) в единицах оси. У инвертированной оси шкала идёт
// от максимума в центре к минимуму на краю — тем же правилом, что и полигоны
// в axisFrac().
function tickValue(axis, { min, max }, g) {
  if (min == null || max == null) return null;
  const t = g / 4;
  return axis.invert ? max - (max - min) * t : min + (max - min) * t;
}

// Число на делении. Не fmtAttr: тот всегда даёт два знака («337,50»), а на
// луче лишний ноль только шумит — здесь хватает значащих. Внутри интерфейса
// свойства по-прежнему форматирует fmtAttr, это исключение ровно для делений.
const tickNumber = (v) => String(Math.round(v * 100) / 100).replace(".", ",");

function tickText(axis, bounds, g) {
  const value = tickValue(axis, bounds, g);
  if (value == null) return "";
  return axis.money ? String(Math.round(value / MINOR_PER_KRUB)) : tickNumber(value);
}

// Минимум оси уезжает в её заголовок: в центре радара все семь осей сходятся
// в одну точку, и семь разных минимумов туда физически не написать. Для
// инвертированной оси «минимум» — это тот её конец, что лежит в центре, то
// есть максимум значения (50 дБ, самая дорогая цена).
function axisTitle(axis, bounds) {
  const centre = axis.invert ? bounds.max : bounds.min;
  if (centre == null) return axis.label;
  return `${axis.label} (от ${axis.money ? Math.round(centre / MINOR_PER_KRUB) : tickNumber(centre)})`;
}

// Тип объекта кодируется формой: бренд — заливка, идеал — пунктирная линия
// без заливки. Цвет кодирует идентичность объекта отдельным каналом: тип и
// идентичность — разные измерения и оба не могут сидеть на одном kind, иначе
// несколько объектов одного типа (три своих бренда, три идеала) становятся
// неразличимы.
//
// Факт и восприятие одного бренда на одной диаграмме больше не встречаются —
// их разводит режим, — поэтому и рисуются одинаково. До режимов
// восприятие было той же краской вдвое бледнее.
//
// Факт и восприятие одного бренда — один объект с двумя наборами значений:
// режим выбирает, какой из них рисовать.
const IDEAL_DASH = "7 4";
// Прозрачность заливки. Заливки ложатся с наложением multiply: пересечение
// двух брендов темнее каждого из них, и ни одна фигура не прячет другую.
const BRAND_FILL = 0.26;
// Внутренняя тень фигуры бренда: два слоя цвета
// бренда вдоль края, обрезанные по самой фигуре — снаружи ничего, внутри
// цвет плотнее у края и плавно сходит к центру. Нужна там, где фигуры почти
// совпадают: заливки смешиваются в одно пятно, а край каждой остаётся виден.
// Кромка — тонкая и мягкая, дымка — широкая и слабая. У идеалов тени нет.
const BRAND_GLOW = [
  { width: 6, blur: 3, opacity: 0.32 },
  { width: 26, blur: 11, opacity: 0.18 },
];
// id фильтров и clipPath уникальны на отрисовку: радар перерисовывается на
// каждый клик по легенде, а id в документе общие для всех SVG.
let radarDraws = 0;

// Категориальная палитра диаграмм (DESIGN.md → Категориальная палитра
// диаграмм). Действует ТОЛЬКО здесь, на радаре: интерфейс по-прежнему
// ахроматичный с одним акцентом Ember, категориальный цвет в интерфейс не
// просачивается. Один цвет на бренд — у факта и восприятия одного бренда цвет
// общий. Порядок раздачи задан в radarObjectsFromPayload и устойчив между годами.
//
// Свои бренды — тёплая группа от красного к оранжевому: Nordika читается
// одним семейством.
//
// Конкуренты — по компании: у каждой компании своё семейство
// оттенков, бренды внутри идут по слоту. Так бренды одного производителя
// читаются группой, а соседние по сегменту бренды разных компаний — разными
// тонами. Раньше цвета раздавались одной очередью по слоту, и первым шёл
// зелёный — Vektor Elite терялся под нефритовым и оливковым пунктирами.
// Синий здесь допустим (DESIGN.md → Категориальная палитра диаграмм).
const OWN_PALETTE = ["var(--color-base-chart-own-1)", "var(--color-base-chart-own-2)", "var(--color-base-chart-own-3)"];
const rivalColor = (key) => `var(--color-base-chart-rival-${key})`;
const RIVAL_FAMILY = {
  vektor: ["a-1", "a-2", "a-3"],
  orion: ["b-1", "b-2"],
  polar: ["c-1", "c-2"],
};
// Компании вне карты — новичок Vertex и любая новая в конфиге — делят одно
// семейство «прочие» с общим счётчиком.
const OTHER_FAMILY = ["other-1", "other-2"];

// Идеалы сегментов — не бренды, но три пунктира одного чёрного тона не
// различались между собой. У каждого сегмента свой цвет из той же палитры:
// фиолетовый, нефрит, олива — ни один не тёплый, чтобы не спорить с
// заливками Nordika, которые включены вместе с идеалами по умолчанию.
const IDEAL_PALETTE = ["var(--color-base-chart-3)", "var(--color-base-chart-2)", "var(--color-base-chart-7)"];

// Палитра брендов: порядок и цвет. Общая для радара и графиков рынка, чтобы
// бренд был одного цвета везде. companies — { [brandId]: companyId },
// market — ответ рынка со слотами (market.brands[].slot).
//
// Порядок задаёт цвет, поэтому он должен быть устойчив между годами: свои
// бренды в порядке слотов конфига, затем чужие по слотам, и только потом
// те, у кого слота нет. Энтрант слота не имеет и встаёт в конец — иначе его
// появление на 4-м году сдвинуло бы палитру всем остальным, и два соседних
// года было бы не сравнить.
export function brandPalette(companies, market) {
  const slots = new Map(((market && market.brands) || []).map((b) => [b.id, b.slot ?? 0]));
  const rank = (id) => [
    companies[id] === "player" ? 0 : 1,
    slots.has(id) ? 0 : 1,
    slots.get(id) ?? 0,
    id,
  ];
  const ids = Object.keys(companies).sort((a, b) => {
    const ra = rank(a), rb = rank(b);
    for (let i = 0; i < ra.length; i++) {
      if (ra[i] < rb[i]) return -1;
      if (ra[i] > rb[i]) return 1;
    }
    return 0;
  });
  // Счётчик на семейство, а не на компанию: у всех «прочих» он общий.
  let ownIndex = 0;
  const familyIndex = new Map();
  const colorFor = (companyId) => {
    if (companyId === "player") return OWN_PALETTE[ownIndex++ % OWN_PALETTE.length];
    const family = RIVAL_FAMILY[companyId] || OTHER_FAMILY;
    const n = familyIndex.get(family) || 0;
    familyIndex.set(family, n + 1);
    return rivalColor(family[n % family.length]);
  };
  return ids.map((id) => ({
    id, company: companies[id], own: companies[id] === "player", color: colorFor(companies[id]),
  }));
}

// Каждый объект включается и выключается отдельно, ограничения на
// количество нет — так в спеке.
//
// Источник — ответ модели GET /reports/{period}/radar. Бренды — все активные бренды года с P&L
// (payload.brands, ключи те же, что у report.analytics.brand_profiles):
// свои, конкуренты и энтрант, когда он вышел. Идеалы — payload.ideals по
// сегменту, реализованные значения этого года.
//
// RadarObject: id, key (что включает переключатель легенды), kind ("brand"
// или "ideal"), name, label, color, own и два набора значений по осям:
//   values — баллы модели 0–10 (режим «Восприятие»): perceived_scores
//            бренда, scores идеала — как пришли;
//   raw    — значения в единицах осей (режим «Факт»): у бренда physical из
//            report.analytics.brand_profiles и цена года из ответа, у идеала
//            ideals[].raw. Своего факта в ответе модели нет (fact_pct —
//            алиас восприятия), поэтому без отчёта raw бренда — null.
export function radarObjectsFromPayload(payload, market, report = null) {
  const out = [];
  const brands = (payload && payload.brands) || {};
  const ideals = (payload && payload.ideals) || {};
  const profiles = (report && report.analytics && report.analytics.brand_profiles) || {};
  const companies = Object.fromEntries(Object.entries(brands).map(([id, b]) => [id, b.company_id]));
  brandPalette(companies, market).forEach(({ id, own, color }) => {
    const brand = brands[id];
    const physical = profiles[id] && profiles[id].physical;
    out.push({
      id, key: id, kind: "brand", name: brandName(id), label: brandName(id),
      // `own` нужен дефолту включённых объектов и группам легенды (results.js)
      own,
      color,
      values: { ...brand.perceived_scores },
      raw: physical ? { ...physical, price_minor: brand.price_minor } : null,
    });
  });
  SEGMENTS.forEach((segment, i) => {
    const ideal = ideals[segment.id];
    if (!ideal) return;
    out.push({
      id: `ideal:${segment.id}`, key: `ideal:${segment.id}`, label: `Предпочтения — ${segment.label}`, name: segment.label, kind: "ideal",
      color: IDEAL_PALETTE[i % IDEAL_PALETTE.length],
      values: { ...ideal.scores },
      raw: ideal.raw ? { ...ideal.raw } : null,
    });
  });
  return out;
}

// Квадрат легенды — он же переключатель объекта: бренд — сплошной, идеал —
// пунктирная рамка. Цвет и состояния
// (выключен, наведение) живут в CSS (.radar-swatch): здесь только форма и
// краска объекта в --swatch. Скругление 3 — то же, что у кольца наведения.
//
// Идеал крупнее (16) и устроен как радиокнопка: у
// включённого внутри пунктирной рамки — цветной квадрат. Раньше включённый
// идеал отличался от выключенного только цветом тонкой рамки и не читался.
export function legendSwatch(obj) {
  const ideal = obj.kind === "ideal";
  const size = ideal ? 16 : 12;
  const svg = svgEl("svg", { viewBox: `0 0 ${size} ${size}`, width: size, height: size, style: "display:block" });
  if (ideal) {
    svg.appendChild(svgEl("rect", { class: "radar-swatch-frame", x: 1, y: 1, width: 14, height: 14, rx: 3.5 }));
    svg.appendChild(svgEl("rect", { class: "radar-swatch-dot", x: 4.5, y: 4.5, width: 7, height: 7, rx: 1.5 }));
  } else {
    svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 12, height: 12, rx: 3 }));
  }
  const swatch = document.createElement("span");
  swatch.className = "radar-swatch";
  swatch.dataset.kind = obj.kind;
  swatch.style.setProperty("--swatch", obj.color);
  swatch.appendChild(svg);
  return swatch;
}

// Деления в режиме восприятия: шкала у всех осей общая, 0–10, поэтому
// колец пять — 2, 4, 6, 8 и 10 баллов, ровные шаги от нуля в центре, — и
// подписаны они один раз, на верхнем луче. В режиме факта у каждой оси своя
// шкала, колец четыре и числа стоят на каждом луче.
const RINGS = { physical: 4, perceived: 5 };

// Значения объекта в режиме: восприятие — баллы модели, факт — единицы осей.
const modeValues = (obj, mode) => (mode === "perceived" ? obj.values : obj.raw);

// Радар на семь осей. Одна крупная диаграмма на вкладке «Показатели» —
// заменяет три радара «наш против каждого конкурента». objects — включённые
// объекты; бренд без факта (raw: null) в режиме факта не рисуется.
// bounds — payload.bounds: диапазоны всех семи осей для режима факта.
export function drawRadar(container, { objects: all = [], bounds = {}, mode = "perceived" } = {}) {
  clear(container);
  const scored = mode === "perceived";
  const objects = all.filter((o) => modeValues(o, mode));
  const rings = RINGS[mode];
  // Ширина больше высоты: подписи боковых осей выровнены наружу и длиннее
  // прочих («Доступная цена, тыс. ₽ (от 164)»), на квадратном холсте они
  // упирались в край. isolation — наложение заливок не проваливается сквозь
  // подложку в карточку.
  const W = 820, H = 560, CX = W / 2, CY = H / 2, R = 210;
  const angle = (i) => (Math.PI / 2) + (2 * Math.PI * i) / RADAR_AXES.length;
  // По высоте холст обрезан впритык к подписям осей: поля вокруг диаграммы
  // задаёт подложка (.radar-chart), а не пустота внутри холста. Подписи —
  // кегль 11 на радиусе 1.2 R; строка Rubik поднимается над базовой линией
  // на 0.94 кегля и опускается под неё на 0.21. Пропорцию блоку даёт холст.
  const labelYs = RADAR_AXES.map((_, i) => CY - R * 1.20 * Math.sin(angle(i)));
  const top = Math.min(...labelYs) - 11 * 0.94;
  const VH = Math.max(...labelYs) + 11 * 0.21 - top;
  const svg = svgEl("svg", { viewBox: `0 ${top} ${W} ${VH}`, width: "100%", height: "100%", style: "display:block; isolation: isolate" });
  container.style.aspectRatio = `${W} / ${VH}`;
  container.appendChild(svg);

  // Подложка — концентрические круги, полосы через одну чуть темнее. В факте
  // кольца процентов не несут: шкала у каждой оси своя, физическая, и живёт
  // на лучах.
  for (let g = rings; g >= 1; g--) {
    // через кольцо белое, начиная с внешнего: диаграмма лежит на подложке
    // Ash, и кольца цвета подложки в ней пропадали
    const fill = (rings - g) % 2 === 0 ? "fill: var(--color-bg-surface)" : "fill: var(--color-bg-data)";
    svg.appendChild(svgEl("circle", { cx: CX, cy: CY, r: R * (g / rings),
      style: `${fill}; stroke: var(--color-border-soft); stroke-width: 1` }));
  }

  // Лучи с точкой на конце, деления в физических единицах и подписи осей.
  // Луч и подпись запоминаются: при наведении на ось они выделяются.
  const rays = [], labels = [];
  for (let i = 0; i < RADAR_AXES.length; i++) {
    const axis = RADAR_AXES[i];
    const ang = angle(i);
    const x1 = CX + R * Math.cos(ang), y1 = CY - R * Math.sin(ang);
    rays.push(svg.appendChild(svgEl("line", { x1: CX, y1: CY, x2: x1, y2: y1, class: "radar-ray" })));
    svg.appendChild(svgEl("circle", { cx: x1, cy: y1, r: 4, style: "fill: var(--color-border-control)" }));

    const range = axisBounds(axis, bounds);
    for (let g = 1; g <= rings; g++) {
      if (scored && i > 0) break;
      const text = scored ? String(SCORE_MIN + (SCORE_MAX - SCORE_MIN) * (g / rings)) : tickText(axis, range, g);
      if (!text) continue;
      // у внешнего кольца число отступает дальше — там стоит точка луча
      const d = R * (g / rings) + (g === rings ? 13 : 7);
      const tick = svgEl("text", { x: CX + d * Math.cos(ang), y: CY - d * Math.sin(ang) + 3,
        style: "fill: var(--color-text-tertiary); font-size: 9px; text-anchor: middle" });
      tick.textContent = text;
      svg.appendChild(tick);
    }

    // На боковых лучах подпись выравнивается наружу, а не по центру: иначе
    // её левая половина наезжает на крайнее деление того же луча.
    const cos = Math.cos(ang);
    const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
    const lx = CX + R * 1.20 * cos, ly = CY - R * 1.20 * Math.sin(ang);
    const label = svgEl("text", { x: lx, y: ly, style: `fill: var(--color-text-primary); font-size: 11px; text-anchor: ${anchor}` });
    label.textContent = scored ? axis.scoreLabel : axisTitle(axis, range);
    labels.push(svg.appendChild(label));
  }

  // Бренды — заливкой с наложением, идеалы — пунктиром поверх всех заливок.
  const valueAt = (obj, axis) => modeValues(obj, mode)[axis.id];
  const vertex = (obj, i) => {
    const frac = axisFrac(RADAR_AXES[i], valueAt(obj, RADAR_AXES[i]), mode, bounds);
    return [CX + R * frac * Math.cos(angle(i)), CY - R * frac * Math.sin(angle(i))];
  };
  const points = (obj) => RADAR_AXES.map((_, i) => vertex(obj, i).join(",")).join(" ");
  const ordered = [...objects.filter((o) => o.kind !== "ideal"), ...objects.filter((o) => o.kind === "ideal")];
  const uid = `radar${++radarDraws}`;
  const defs = svgEl("defs");
  BRAND_GLOW.forEach((layer, i) => {
    const filter = svgEl("filter", { id: `${uid}-glow${i}`, x: "-20%", y: "-20%", width: "140%", height: "140%" });
    filter.appendChild(svgEl("feGaussianBlur", { stdDeviation: layer.blur }));
    defs.appendChild(filter);
  });
  svg.appendChild(defs);
  let shapes = 0;
  for (const obj of ordered) {
    const pts = points(obj);
    const style = obj.kind === "ideal"
      ? `fill: none; stroke: ${obj.color}; stroke-width: 1.8; stroke-dasharray: ${IDEAL_DASH}`
      : `fill: ${obj.color}; fill-opacity: ${BRAND_FILL}; stroke: none; mix-blend-mode: multiply`;
    svg.appendChild(svgEl("polygon", { points: pts, style }));
    if (obj.kind === "ideal") continue;
    // тень — сразу за заливкой своей фигуры, до пунктиров идеалов
    const clipId = `${uid}-clip${shapes++}`;
    const clip = svgEl("clipPath", { id: clipId });
    clip.appendChild(svgEl("polygon", { points: pts }));
    defs.appendChild(clip);
    const glow = svgEl("g", { "clip-path": `url(#${clipId})` });
    BRAND_GLOW.forEach((layer, i) => glow.appendChild(svgEl("polygon", {
      points: pts, filter: `url(#${uid}-glow${i})`,
      style: `fill: none; stroke: ${obj.color}; stroke-width: ${layer.width}; `
        + `stroke-opacity: ${layer.opacity}; stroke-linejoin: round`,
    })));
    svg.appendChild(glow);
  }
  axisHover(container, svg, { objects, rays, labels, vertex, valueAt, bounds, mode, CX, CY, R, angle });
}

// Значение объекта на оси для тултипа. Факт: цена — рублями целиком, объём
// и шум — целыми в своих единицах, баллы модели (класс, дизайн, надёжность,
// эргономичность) — одним знаком. Восприятие: балл модели 0–10 одним знаком
// на любой оси.
function axisValue(axis, value, scored) {
  if (value == null) return "—";
  if (scored) return dec(value, 1);
  if (axis.money) return rub(value);
  const text = Number.isInteger(value) ? String(value) : dec(value, axis.digits ?? 1);
  return axis.unit ? `${text} ${axis.unit}` : text;
}

// Тип в строке тултипа — только у идеала: факт или восприятие у брендов
// говорит режим над диаграммой.
const KIND_WORD = { ideal: "предпочтение" };

// Наведение на ось: клин вокруг луча до его подписи —
// зона наведения. Луч и подпись выделяются, на каждой включённой фигуре
// встаёт точка, у курсора — тултип: все включённые объекты на этой оси от
// края к центру (дальше от центра — лучше, у шума и цены значит меньше).
function axisHover(container, svg, { objects, rays, labels, vertex, valueAt, bounds, mode, CX, CY, R, angle }) {
  const scored = mode === "perceived";
  const marks = svg.appendChild(svgEl("g", { class: "radar-marks" }));
  const tip = el("div", { class: "radar-tip", hidden: true });
  container.appendChild(tip);
  const zones = svg.appendChild(svgEl("g"));
  const half = Math.PI / RADAR_AXES.length;
  const reach = R * 1.45;
  RADAR_AXES.forEach((axis, i) => {
    const a = angle(i);
    const corner = (t) => `${CX + reach * Math.cos(t)},${CY - reach * Math.sin(t)}`;
    const zone = svgEl("polygon", { class: "radar-zone", points: `${CX},${CY} ${corner(a - half)} ${corner(a + half)}` });
    zone.addEventListener("mouseenter", () => {
      rays[i].classList.add("is-hot");
      labels[i].classList.add("is-hot");
      const rows = objects
        .map((obj) => ({ obj, value: valueAt(obj, axis), frac: axisFrac(axis, valueAt(obj, axis), mode, bounds) }))
        .sort((x, y) => y.frac - x.frac);
      clear(marks);
      for (const { obj } of rows) {
        const [x, y] = vertex(obj, i);
        const dot = svgEl("circle", { class: "radar-mark", cx: x, cy: y, r: 4.5 });
        dot.dataset.kind = obj.kind;
        dot.style.setProperty("--swatch", obj.color);
        marks.appendChild(dot);
      }
      clear(tip).append(
        el("div", { class: "radar-tip-head", text: scored ? `${axis.scoreLabel}, баллы` : axis.label }),
        ...rows.map(({ obj, value }) => el("div", { class: "radar-tip-row" },
          el("span", { class: "radar-tip-swatch", "data-kind": obj.kind, style: `--swatch: ${obj.color}` }),
          el("span", {}, `${obj.name} `, KIND_WORD[obj.kind] ? el("span", { class: "radar-tip-kind", text: KIND_WORD[obj.kind] }) : null),
          el("span", { class: "radar-tip-value", text: axisValue(axis, value, scored) }))),
        ...(rows.length ? [] : [el("div", { class: "radar-tip-note", text: "Ничего не выбрано" })]));
      tip.hidden = false;
    });
    // Тултип справа снизу от курсора; у правого края — слева, у нижнего —
    // прижат к низу диаграммы.
    zone.addEventListener("mousemove", (event) => {
      const box = container.getBoundingClientRect();
      const gap = 18;
      let x = event.clientX - box.left + gap;
      let y = event.clientY - box.top + gap;
      if (x + tip.offsetWidth > box.width) x = event.clientX - box.left - tip.offsetWidth - gap;
      if (y + tip.offsetHeight > box.height) y = Math.max(0, box.height - tip.offsetHeight);
      tip.style.left = `${x}px`;
      tip.style.top = `${y}px`;
    });
    zone.addEventListener("mouseleave", () => {
      rays[i].classList.remove("is-hot");
      labels[i].classList.remove("is-hot");
      clear(marks);
      tip.hidden = true;
    });
    zones.appendChild(zone);
  });
}
