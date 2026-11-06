/* BrandSim — справочный слой вкладок «Показатели» и «Рынок»: общие детали.
   Полоса экрана с переключателем года, панель, плитка с графиком по годам,
   полосы долей и изменений, дельты. Экраны собирают из них свои разделы;
   ни одна деталь не знает, чьи данные рисует. */

import { el, svgEl, helpTip } from "./ui.js";
import { dec, pct } from "./format.js";
import { shownYear } from "./state.js";

// В пробном году период 1 подписан «Год 0» (state.js → shownYear).
export const yearLabel = (period) => (period === 0 ? "Старт" : `Год ${shownYear(period)}`);

// ---------- дельты ----------

const arrow = (d) => (d > 0 ? "▲" : d < 0 ? "▼" : "±");

// Изменение доли в процентных пунктах. `signed` — короткая запись для узкой
// ячейки таблицы («−1,6»), `text` — полная для капсулы («▼ 1,6 пп»).
export function ppDelta(cur, prev) {
  if (!Number.isFinite(cur) || !Number.isFinite(prev)) return null;
  const d = (cur - prev) * 100;
  const tone = Math.abs(d) < 0.05 ? "flat" : d > 0 ? "up" : "down";
  return { value: d, tone, text: `${arrow(tone === "flat" ? 0 : d)} ${dec(Math.abs(d), 1)} пп`, signed: `${d >= 0 ? "+" : "−"}${dec(Math.abs(d), 1)}` };
}

// относительное изменение денег, в процентах к прошлому году
export function relDelta(cur, prev) {
  if (!Number.isFinite(cur) || !Number.isFinite(prev) || !prev) return null;
  const d = (cur / prev - 1) * 100;
  const tone = Math.abs(d) < 0.05 ? "flat" : d > 0 ? "up" : "down";
  return { value: d, tone, text: `${arrow(tone === "flat" ? 0 : d)} ${dec(Math.abs(d), 1)}%` };
}

// абсолютное изменение безразмерного числа (индекс, BEI)
export function absDelta(cur, prev, digits = 2) {
  if (!Number.isFinite(cur) || !Number.isFinite(prev)) return null;
  const d = cur - prev;
  const tone = Math.abs(d) < 0.5 * 10 ** -digits ? "flat" : d > 0 ? "up" : "down";
  return { value: d, tone, text: `${arrow(tone === "flat" ? 0 : d)} ${dec(Math.abs(d), digits)}` };
}

// Изменение в углу плитки — чип borderless: рост — success, падение — danger,
// без изменения — без тона. Тёмный вид чип берёт из токенов поверхности.
const PILL_TONE = { up: " tone-success", down: " tone-danger", flat: "" };
export const deltaPill = (delta) => (delta ? el("span", { class: `chip borderless${PILL_TONE[delta.tone]}`, text: delta.text }) : null);

// Изменение мелким числом справа от значения в таблице. Слот фиксированной
// ширины есть всегда, даже пустой: иначе значения строк без изменения
// съезжают вправо и колонка перестаёт читаться столбиком.
export const deltaSlot = (delta) => el("span", {
  class: delta && delta.tone !== "flat" ? `ref-slot tone-${delta.tone}` : "ref-slot",
  text: delta && delta.tone !== "flat" ? (delta.signed ?? delta.text) : "",
});

// ---------- полоса экрана ----------

// Чёрная полоса над экраном: «Название • Год N» слева, переключатель годов
// в конце. Липнет к верху панели обзора, как только её начинают прокручивать,
// — год можно сменить из любого места страницы.
// onb — годы помечаются целью онбординга data-onb="period-<p>" (только «Показатели»).
export function screenStrip({ title, period, periods, onPick, joined = false, onb = false }) {
  const tabs = periods.length
    ? el("div", { class: "tabs ref-years" }, ...periods.map((p) => el("button", {
      class: p === period ? "tab active" : "tab", type: "button",
      dataset: onb ? { refocus: `year:${p}`, onb: `period-${p}` } : { refocus: `year:${p}` }, onclick: () => onPick(p),
    }, yearLabel(p))))
    : null;
  return el("section", { class: joined ? "ref-strip theme-dark joined" : "ref-strip theme-dark", dataset: { place: "strip" } },
    el("h2", { class: "ref-strip-title" }, title, el("span", { class: "ref-strip-dot", "aria-hidden": "true" }), yearLabel(period)),
    tabs);
}

// Прилипшая полоса скругляется снизу: пока она стоит на месте, в «Показателях»
// она продолжается тёмным блоком итогов. Слушатель один на панель обзора, он
// сам находит видимую полосу — экраны перерисовываются и полосы сменяются.
export function watchStrip(strip) {
  requestAnimationFrame(() => {
    const body = strip.closest(".peek-body");
    if (!body) return;
    const sync = () => {
      const bodyTop = body.getBoundingClientRect().top;
      for (const s of body.querySelectorAll(".ref-strip")) {
        if (s.offsetParent === null) continue;
        // прилипшая полоса стоит вплотную к верху панели (см. .ref-strip top в styles.css)
        s.classList.toggle("stuck", s.getBoundingClientRect().top <= bodyTop + 0.5);
      }
    };
    if (!body.dataset.stripWatch) {
      body.dataset.stripWatch = "1";
      body.addEventListener("scroll", sync, { passive: true });
    }
    sync();
  });
}

// ---------- панель ----------

export function refPanel(title, sub, ...body) {
  return el("section", { class: "ref-panel" },
    el("header", { class: "ref-panel-head" },
      el("h2", { class: "ref-title", text: title }),
      sub ? el("div", { class: "ref-sub", text: sub }) : null),
    ...body);
}

// ---------- плитки фактов сегмента ----------

// Плитка показателя из кита (.stat): название, под ним значение.
export const stat = (title, value) => el("div", { class: "stat" }, el("div", { class: "k", text: title }), el("div", { class: "v", text: value }));

// Плитка с несколькими значениями: название один раз сверху, у каждого
// значения своя подпись мелко под ним. Подпись не повторяет форму названия
// (не «Штуки» над числом), а стоит ниже и ближе к числу, чем название
// плитки, — так видно, что к чему относится.
// items: [value, caption, tone?]; tone — up / down для роста.
export function multiStat(title, items) {
  return el("div", { class: "stat ref-multi" },
    el("div", { class: "k", text: title }),
    el("div", { class: "ref-pairs" }, ...items.filter(Boolean).map(([value, caption, tone]) => el("div", { class: "ref-pair" },
      el("div", { class: tone ? `v tone-${tone}` : "v", text: value }),
      el("div", { class: "ref-pair-k", text: caption })))));
}

// Табы сегментов рядом с заголовком панели.
export function segmentTabs(segments, activeId, onPick) {
  return el("div", { class: "tabs ref-seg-tabs", role: "tablist" }, ...segments.map((s) => el("button", {
    class: s.id === activeId ? "tab active" : "tab", type: "button", role: "tab",
    "aria-selected": s.id === activeId ? "true" : "false", dataset: { refocus: `seg:${s.id}`, onb: `seg-${s.id}` }, onclick: () => onPick(s.id),
  }, s.label)));
}

// ---------- плитка итогов с графиком по годам ----------

// Линия значений по годам, последняя точка — Ember. SVG тянется по ширине
// плитки без сохранения пропорций, поэтому точка — отдельный элемент поверх,
// иначе её сплющивает.
export function sparkline(values) {
  const W = 400, H = 48, PAD = 5;
  const box = el("div", { class: "ref-spark" });
  const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "none", "aria-hidden": "true" });
  box.append(svg);
  const vals = values.filter(Number.isFinite);
  if (vals.length < 2) {
    svg.append(svgEl("line", { x1: 0, x2: W, y1: H - PAD, y2: H - PAD, class: "ref-spark-base" }));
    return box;
  }
  const min = Math.min(...vals), span = Math.max(...vals) - min || 1;
  const pts = vals.map((v, i) => [PAD + (i * (W - 2 * PAD)) / (vals.length - 1), H - PAD - ((v - min) / span) * (H - 2 * PAD)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const [lx, ly] = pts[pts.length - 1];
  svg.append(
    svgEl("path", { d: `${d} L${lx},${H} L${pts[0][0]},${H} Z`, class: "ref-spark-area" }),
    svgEl("path", { d, class: "ref-spark-line" }));
  box.append(el("i", { class: "ref-spark-dot", style: `left:${(lx / W) * 100}%;top:${(ly / H) * 100}%` }));
  return box;
}

// kpi: { label, text, delta, tip, series?, split? } — split (доли компаний
// рынка) рисуется полосой с местом компании, series — линией по годам.
export function kpiTile(kpi, seriesLabels) {
  let visual;
  if (kpi.split) {
    const rank = kpi.split.findIndex((s) => s.own) + 1;
    visual = el("div", { class: "ref-kpi-vis" },
      el("div", { class: "ref-split" }, ...kpi.split.map((s) => el("i", {
        class: s.own ? "own" : "", style: `flex-grow:${s.value}`, "data-tip": `${s.name} · ${pct(s.value)}` }))),
      el("div", { class: "ref-kpi-cap" }, el("span", { text: `${rank}-е место из ${kpi.split.length}` }), el("span", { text: "компании рынка" })));
  } else {
    visual = el("div", { class: "ref-kpi-vis" }, sparkline(kpi.series),
      el("div", { class: "ref-kpi-cap" }, el("span", { text: seriesLabels[0] }), el("span", { text: seriesLabels[seriesLabels.length - 1] })));
  }
  return el("div", { class: "ref-kpi" },
    el("div", { class: "ref-kpi-top" },
      el("span", { class: "ref-kpi-k" }, kpi.label, kpi.tip ? helpTip(`kpi-${kpi.label}`, kpi.tip) : null),
      deltaPill(kpi.delta)),
    el("div", { class: "ref-kpi-v", text: kpi.text }),
    visual);
}

// ---------- ячейки таблиц ----------

// Имя в первой колонке: свои бренды — точкой Ember и жирным (жирный на всю
// строку ставит класс ref-own у строки).
export const nameCell = (name, own, extra) => el("td", {}, el("span", { class: own ? "ref-name own" : "ref-name", text: name }), extra || null);

// Доля полосой от лидера: у лидера полоса целиком, у остальных — в пропорции.
// Как это читать, пишет тултип заголовка колонки; над полосой — точное число.
export function leaderBarCell({ value, leader, name, leaderName, own, delta, scope }) {
  const ratio = leader > 0 ? Math.max(0, value / leader) : 0;
  const tip = value >= leader
    ? `${name} · ${pct(value)} — лидер ${scope}, полная полоса`
    : `${name} · ${pct(value)} — ${Math.round(ratio * 100)}% от лидера (${leaderName}, ${pct(leader)})`;
  return el("td", { class: "num ref-barcell" }, el("div", { class: "ref-bar" },
    el("span", { class: "ref-bar-track", "data-tip": tip }, el("i", { class: own ? "own" : "", style: `width:${(ratio * 100).toFixed(1)}%` })),
    el("span", { class: "ref-bar-v", text: pct(value) }),
    delta === undefined ? null : deltaSlot(delta)));
}

// Изменение доли полосой от нуля: влево падение, вправо рост. Самое большое
// изменение в таблице (max, в пп) занимает половину полосы целиком.
export function divergeCell(delta, max) {
  if (!delta) return el("td", { class: "num ref-muted", text: "—" });
  const half = Math.min(50, (Math.abs(delta.value) / max) * 50);
  return el("td", { class: "num" }, el("div", { class: "ref-diverge" },
    el("span", { class: "ref-diverge-track" }, el("i", { class: delta.value < 0 ? "down" : "up", style: `width:${half.toFixed(1)}%` })),
    el("span", { class: `ref-diverge-v tone-${delta.tone}`, text: `${delta.signed} пп` })));
}

// Отношение к 100% маленькой полосой рядом с числом (маржа в P&L, вес свойства).
export function ratioBar(ratio, text) {
  return el("div", { class: "ref-ratio" },
    el("span", { class: "ref-ratio-track" }, el("i", { style: `width:${(Math.max(0, Math.min(1, ratio)) * 100).toFixed(1)}%` })),
    el("span", { text }));
}

// ---------- затухание краёв широких таблиц ----------

// Таблица, которая не влезает по ширине, гаснет к тому краю, за которым есть
// ещё колонки: справа — пока не докрутили до конца, слева — как только
// сдвинули. У липкой первой колонки левое затухание начинается за ней, иначе
// гасли бы названия строк. Ширина обёртки меняется с панелью обзора, ширина
// таблицы — с догрузкой шрифта, поэтому следим за обеими; отцепленные при
// перерисовке узлы снимаются с наблюдения при следующем вызове.
function syncFade(wrap) {
  const max = wrap.scrollWidth - wrap.clientWidth;
  wrap.classList.toggle("fade-left", max > 1 && wrap.scrollLeft > 1);
  wrap.classList.toggle("fade-right", max > 1 && wrap.scrollLeft < max - 1);
  if (wrap.classList.contains("sticky-first")) {
    const first = wrap.querySelector("tr > :first-child");
    wrap.style.setProperty("--fade-start", `${first ? first.getBoundingClientRect().width : 0}px`);
  }
}

const fadeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const wrap = entry.target.closest(".tablewrap");
    if (wrap) syncFade(wrap);
  }
});
const fadeWatched = new Set();

export function edgeFades(scope) {
  requestAnimationFrame(() => {
    for (const node of fadeWatched) {
      if (!node.isConnected) { fadeObserver.unobserve(node); fadeWatched.delete(node); }
    }
    for (const wrap of scope.querySelectorAll(".tablewrap")) {
      if (!wrap.dataset.fades) {
        wrap.dataset.fades = "1";
        wrap.addEventListener("scroll", () => syncFade(wrap), { passive: true });
        for (const node of [wrap, wrap.firstElementChild]) {
          if (node) { fadeObserver.observe(node); fadeWatched.add(node); }
        }
      }
      syncFade(wrap);
    }
  });
}

// Максимальный модуль изменения в пп для масштаба полос; пол — полпункта,
// чтобы крошечные колебания не растягивались на всю половину.
export const maxDelta = (deltas) => Math.max(0.5, ...deltas.map((d) => (d ? Math.abs(d.value) : 0)));
