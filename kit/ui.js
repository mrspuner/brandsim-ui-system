/* BrandSim — общие DOM-хелперы: элементы, тултипы, модалки, тосты. Ничего
   специфичного для экрана решений (инлайн-валидация полей — в validation.js). */

import { dec } from "./format.js";
import { icon } from "./icons.js";

export const byId = (id) => document.getElementById(id);

export function el(tag, props = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "dataset") Object.assign(node.dataset, value);
    else if (key.startsWith("on")) node.addEventListener(key.slice(2).toLowerCase(), value);
    else node.setAttribute(key, value === true ? "" : String(value));
  }
  for (const kid of kids.flat(3)) {
    if (kid === null || kid === undefined || kid === false || kid === "") continue;
    node.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return node;
}

export const clear = (node) => { while (node.firstChild) node.removeChild(node.firstChild); return node; };

export function svgEl(tag, attrs = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

export function emptyState(title, hint, { ctaText, onCta } = {}) {
  return el("div", { class: "empty-state" },
    icon("calendar-blank", 24, { class: "empty-icon" }),
    el("div", { class: "empty-title", text: title }),
    hint && el("div", { class: "sub", text: hint }),
    ctaText && onCta && el("button", { class: "primary", style: "margin-top:12px", onclick: onCta }, ctaText));
}

export function toast(message, kind = "") {
  const node = byId("toast");
  node.className = `toast ${kind}`;
  clear(node);
  node.append(el("span", { class: "toast-text" }, message));
  node.append(el("button", {
    class: "small",
    type: "button",
    "aria-label": "Закрыть",
    onclick: (e) => { e.stopPropagation(); node.hidden = true; clearTimeout(toast.timer); },
  }, icon("x", 16)));
  node.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { node.hidden = true; }, kind === "err" ? 12000 : 5000);
}

const HELP_TIP = {
  product: "Текущий продукт бренда: объём, энергокласс и уровень шума — в натуральных единицах; дизайн, надёжность и эргономичность — баллами 1–10. «Восприятие потребителей» — как потребители видят продукт: после R&D оно догоняет факт с задержкой. BEI — накопительная сила бренда.",
  price: "Розничная цена бренда в рублях. Действует сразу. Выше цена — выше маржа с единицы, но ниже спрос; в Премиуме слишком низкая цена воспринимается как сигнал низкого качества.",
  targeting: "Бюджет на продвижение бренда среди потребителей сегмента, в млн ₽. Растит ментальную доступность — насколько бренд вспоминают и хотят купить. Работает дважды: это расход текущего года и одновременно рост осведомлённости о бренде в сегменте. В одном сегменте — только один бренд компании.",
  channels: "Трейд-маркетинг в каналах продаж, в млн ₽. Растит физическую доступность — насколько бренд легко купить там, где потребитель привык покупать. Доли каналов задаются ползунками, в сумме 100%. Чем ближе распределение к структуре каналов целевого сегмента (отметка на шкале), тем выше доступность; сильное отклонение её снижает.",
  promo: "Ценовое промо: число недель и скидка. Действует в промо-недели и вычитается из выручки, а не из бюджета. Промо — разовая акция и не переносится на следующий год. Допустимо 5–50% скидки, не более 30 недель.",
  rd: "R&D: задайте целевые атрибуты продукта. Стоимость списывается из бюджета текущего года, результат — со следующего года. Не более двух брендов в год. Улучшение продукта увеличивает себестоимость единицы, а откат улучшения стоит сопоставимо с самим улучшением. Объём, энергокласс и шум задаются в натуральных единицах, дизайн, надёжность и эргономичность — баллами 1–10.",
  ladder: "Позиционирование собирается в три шага: функциональная выгода → эмоциональная выгода → формулировка. Верная связка даёт буст до ~15 % к привлекательности бренда, ошибка в связях — меньше, выгода против потребностей сегмента — снижает. Выгода работает, если характеристика продукта близка к предпочтениям сегмента. Повтор формулировки за конкурентом разрешён, но бонус вдвое меньше. Верность связки видна только по продажам. Сменить позиционирование можно один раз за игру.",
};

/* Знак подсказки — залитый круг с «?» Rubik Regular внутри (круг рисует CSS).
   Размер — параметр, а не контекст: size "sm" (по умолчанию) — у подписей
   полей и шапок таблиц, "lg" — у заголовков. Иконка question 12 px Fill,
   которой знак был раньше, на экране не читалась. */
export const HELP_TIP_SIZES = ["sm", "lg"];

export function helpTip(key, fallback, { size = "sm" } = {}) {
  const text = HELP_TIP[key] || fallback || "";
  if (!text) return null;
  const node = el("span", {
    class: size === "sm" ? "help-tip" : `help-tip ${size}`, tabindex: "0", role: "tooltip",
    dataset: { tip: text }, "aria-label": text,
    onclick: (event) => { event.preventDefault(); event.stopPropagation(); },
  });
  node.textContent = "?";
  return node;
}

let tooltipNode = null;
function tooltipPop() {
  if (!tooltipNode) {
    tooltipNode = el("div", { class: "help-tip-pop", hidden: true });
    document.body.appendChild(tooltipNode);
  }
  return tooltipNode;
}
function showTooltip(anchor) {
  const text = (anchor && anchor.dataset && anchor.dataset.tip) || (anchor && anchor.getAttribute("aria-label")) || "";
  if (!text) return;
  const node = tooltipPop();
  node.textContent = text;
  node.hidden = false;
  const rect = anchor.getBoundingClientRect();
  const nodeW = node.offsetWidth;
  const nodeH = node.offsetHeight;
  let left = rect.left + rect.width / 2 - nodeW / 2;
  left = Math.max(8, Math.min(window.innerWidth - nodeW - 8, left));
  let top = rect.top - nodeH - 8;
  if (top < 8) top = rect.bottom + 8;
  node.style.left = `${Math.round(left)}px`;
  node.style.top = `${Math.round(top)}px`;
}
function hideTooltip() {
  if (tooltipNode) tooltipNode.hidden = true;
}
document.addEventListener("mouseover", (event) => {
  const tip = event.target.closest && event.target.closest("[data-tip]");
  if (tip) showTooltip(tip);
});
document.addEventListener("mouseout", (event) => {
  if (event.target.closest && event.target.closest("[data-tip]")) hideTooltip();
});
document.addEventListener("focusin", (event) => {
  const tip = event.target.closest && event.target.closest("[data-tip]");
  if (tip) showTooltip(tip);
});
document.addEventListener("focusout", (event) => {
  if (event.target.closest && event.target.closest("[data-tip]")) hideTooltip();
});
window.addEventListener("scroll", hideTooltip, true);

// dec() (format.js) даёт запятую как разделитель дробной части — тот же
// разделитель, что и у всех остальных чисел на экране (dec/mrub/pct). Голый
// toFixed() здесь раньше давал точку, и в одной строке было видно и то, и
// другое: «103,46 ▲ 3.46».
export function deltaBadge(cur, prev, { digits = 1, suffix = " пп", pp = false } = {}) {
  if (cur === undefined || prev === undefined || prev === null) return null;
  const d = (cur - prev) * (pp ? 100 : 1);
  if (Math.abs(d) < 0.05) return el("span", { class: "delta tone-flat" }, `±${dec(0, digits)}${suffix}`);
  return el("span", { class: `delta ${d >= 0 ? "tone-success" : "tone-danger"}` }, `${d >= 0 ? "▲" : "▼"} ${dec(Math.abs(d), digits)}${suffix}`);
}

export function statTile(key, value, delta, tip) {
  return el("div", { class: "stat" },
    el("div", { class: "k" }, key, tip ? helpTip(key, tip) : null),
    el("div", { class: "v" }, value, delta || null));
}

export function setButtonBusy(button, text) {
  if (!button) return;
  button.disabled = true;
  button.classList.add("busy");
  button.textContent = text;
}

export function setButtonIdle(button, text) {
  if (!button || !button.isConnected) return;
  button.disabled = false;
  button.classList.remove("busy");
  button.textContent = text;
}

// ---------------------------------------------------------------- модальные хелперы

let modalTrigger = null;
// Что сделать после закрытия — любым путём: кнопкой, Escape, кликом по фону.
// Нужен цепочке «название команды → приветствие»: следующая модалка
// открывается, только когда предыдущая ушла.
let modalOnClose = null;

function focusableOf(modal) {
  return [...modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => !el.disabled && el.offsetParent !== null);
}

export function openModal(panel, { drawer = false, onClose = null } = {}) {
  const modal = byId("modal");
  modalOnClose = onClose;
  modal.classList.toggle("drawer", drawer);
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  clear(modal).append(panel);
  modal.hidden = false;
  modalTrigger = document.activeElement;
  const first = focusableOf(modal)[0];
  if (first) first.focus();
}

export function closeModal() {
  const modal = byId("modal");
  modal.hidden = true;
  modal.removeAttribute("role");
  modal.removeAttribute("aria-modal");
  clear(modal);
  if (modalTrigger && modalTrigger.isConnected && modalTrigger.focus) modalTrigger.focus();
  modalTrigger = null;
  const after = modalOnClose;
  modalOnClose = null;
  if (after) after();
}

byId("modal").addEventListener("mousedown", (event) => {
  if (event.target === byId("modal")) closeModal();
});

document.addEventListener("keydown", (event) => {
  const modal = byId("modal");
  if (modal.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key === "Tab") {
    const items = focusableOf(modal);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

export function confirmModal(title, onConfirm, { confirmText = "Да", note = null, body = [] } = {}) {
  const confirm = el("button", { class: "primary", onclick: async () => {
    setButtonBusy(confirm, confirmText === "Да" ? "Выполняю…" : confirmText);
    try {
      await onConfirm();
    } catch (e) {
      toast(e.message, "err");
    } finally {
      closeModal();
    }
  } }, confirmText);
  const cancel = el("button", { onclick: () => closeModal() }, "Отмена");
  const panel = el("div", { class: "panel" },
    el("h2", { text: title }),
    ...body,
    // Пометка о последствиях («Действие необратимо») — предупреждение, а не
    // пояснение: латунью и жирным над кнопками, чтобы её не пропускали.
    note && el("p", { class: "confirm-note tone-warning" }, note),
    el("div", { class: "row two", style: "margin-top:12px" },
      confirm,
      cancel));
  openModal(panel);
  cancel.focus();
}
