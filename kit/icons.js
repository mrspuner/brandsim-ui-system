/* BrandSim — иконки интерфейса.

   Глифы взяты поштучно из Phosphor Icons (MIT),
   github.com/phosphor-icons/core → assets/<вес>/<имя>.svg. Поле src у каждой
   записи называет исходный файл, чтобы глиф можно было переснять
   или сверить. Библиотека целиком в проект не тянется: здесь ровно
   те иконки, которые где-то вызываются, и ни одной про запас.

   Вес запечён в глиф, а не задаётся вызовом: у Phosphor любой вес — это
   залитый контур на сетке 256, а не stroke-width. Правило проекта:
   12 px — Fill, 16 и выше — Bold, исключений нет. Крестик сначала был
   исключением — Bold на 12, потому что залитый крест читается кляксой.
   Он ушёл на 16: в шапке панели обзора крестик стоит вплотную к развороту
   в такой же круглой кнопке 32×32, и разница в 4 px была видна. Заодно
   правило стало без оговорок. */

export const ICON_SIZES = [12, 16, 20, 24];

const GLYPHS = {
  // шеврон раскрытия рычага
  "caret-down": { weight: "fill", src: "fill/caret-down-fill.svg", d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z" },
  // маркер подсказки
  // закрыть панель обзора
  "x": { weight: "bold", src: "bold/x-bold.svg", d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" },
  // сложить панель пополам
  "square-split-horizontal": { weight: "bold", src: "bold/square-split-horizontal-bold.svg", d: "M200,36H56A20,20,0,0,0,36,56V200a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36ZM60,60h56V196H60ZM196,196H140V60h56Z" },
  // развернуть панель во весь экран
  "arrows-out-line-horizontal": { weight: "bold", src: "bold/arrows-out-line-horizontal-bold.svg", d: "M140,40V216a12,12,0,0,1-24,0V40a12,12,0,0,1,24,0ZM88,116H45l11.52-11.51a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17l32,32a12,12,0,0,0,17-17L45,140H88a12,12,0,0,0,0-24Zm160.49,3.51-32-32a12,12,0,0,0-17,17L211,116H168a12,12,0,0,0,0,24h43l-11.52,11.51a12,12,0,0,0,17,17l32-32A12,12,0,0,0,248.49,119.51Z" },
  // таб «⋯» плашки диаграммы: показатели, которые не поместились в строку
  "dots-three": { weight: "bold", src: "bold/dots-three-bold.svg", d: "M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z" },
  // пустое состояние списка
  "calendar-blank": { weight: "bold", src: "bold/calendar-blank-bold.svg", d: "M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Z" },
};

/* Размер берётся только из шкалы. Не для красоты: до общего модуля
   иконок размеров было пять — 8, 12, 14, 16, 32 — и ни одного правила, почему
   где какой. */
function checkedSize(size) {
  if (!ICON_SIZES.includes(size)) {
    throw new Error(`icon: размер ${size} вне шкалы ${ICON_SIZES.join(" / ")}`);
  }
  return size;
}

export function iconPath(name) {
  const glyph = GLYPHS[name];
  if (!glyph) throw new Error(`icon: нет глифа «${name}»`);
  return glyph;
}

/* Строкой — для innerHTML и шаблонов. */
export function iconSvg(name, size = 16) {
  const { d } = iconPath(name);
  const px = checkedSize(size);
  return `<svg viewBox="0 0 256 256" width="${px}" height="${px}" fill="currentColor" `
    + `focusable="false" aria-hidden="true"><path d="${d}"/></svg>`;
}

/* Узлом — для сборки через append. Свой createElementNS, а не svgEl из ui.js:
   модуль не должен зависеть от ui.js, потому что ui.js зависит от него. */
export function icon(name, size = 16, { class: cls } = {}) {
  const { d } = iconPath(name);
  const px = checkedSize(size);
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 256 256");
  svg.setAttribute("width", px);
  svg.setAttribute("height", px);
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("aria-hidden", "true");
  if (cls) svg.setAttribute("class", cls);
  const path = document.createElementNS(NS, "path");
  path.setAttribute("d", d);
  svg.append(path);
  return svg;
}
