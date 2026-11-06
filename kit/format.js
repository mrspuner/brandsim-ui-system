/* BrandSim — форматирование чисел, денег и величин. */

import { MINOR_PER_MRUB, S, ATTRS } from "./state.js";

export const num = new Intl.NumberFormat("ru-RU");

// Не-число (null/undefined/NaN — например, деление на нулевую базу где-то
// выше по цепочке, или ответ бэкенда без поля) даёт прочерк, а не «NaN» на
// экране (был баг: «Остаток NaNM ₽») и не тихий ноль, который выдавал бы
// отсутствующее значение за настоящий нулевой результат. Number.isFinite
// ложно ровно на null/undefined/NaN/строках — настоящий 0 проходит и
// форматируется как обычно.
export const rub = (minor) => (Number.isFinite(minor) ? `${num.format(Math.round(minor / 100))} ₽` : "—");
export const dec = (value, digits = 2) => (Number.isFinite(value) ? value.toFixed(digits).replace(".", ",") : "—");
// Миллионы — целыми, с разделителем разрядов. Двух знаков после запятой на
// этом масштабе не читает никто: «36546,45M ₽» — пять значащих разрядов подряд
// плюс копейки миллионов, и в карточку вилки прогноза (172 px) строка уже не
// помещалась. Округление до миллиона здесь не теряет ничего: все места, где
// mrub встречается, — подписи и итоги, а не поля ввода (те держат своё число
// и рисуют «M ₽» отдельной единицей, см. levers.js).
//
// `|| 0` убирает минус-ноль: Math.round(-0.4) даёт -0, и небольшой убыток
// печатался бы как «-0M ₽».
const mrubNumber = (minor) => num.format(Math.round(minor / MINOR_PER_MRUB) || 0);
// Подпись и сумма рядом с годовым бюджетом: «Остаток», пока денег
// хватает, и «Перерасход» положительным числом, когда потрачено больше.
// Ровно в ноль — ещё остаток.
export const budgetBalance = (budgetMinor, spentMinor) => (spentMinor > budgetMinor
  ? { label: "Перерасход", valueMinor: spentMinor - budgetMinor, over: true }
  : { label: "Остаток", valueMinor: budgetMinor - spentMinor, over: false });

// Бюджет бренда — план, а не лимит. Подпись: «Осталось» или
// «Перерасход» положительным числом. Пустой план — не ошибка: остатка нет.
export const brandBudgetReadout = (planMinor, spentMinor) => {
  if (planMinor == null) return { label: "Осталось", valueMinor: null, over: false };
  return spentMinor > planMinor
    ? { label: "Перерасход", valueMinor: spentMinor - planMinor, over: true }
    : { label: "Осталось", valueMinor: planMinor - spentMinor, over: false };
};

// Новый объект планов бюджета брендов. null, а не {}: так черновик не несёт
// пустой план и после перезагрузки не возвращается «призрачный» объект.
export const nextBrandBudgets = (plans, brandId, minor) => {
  const next = { ...(plans || {}) };
  if (minor == null) delete next[brandId];
  else next[brandId] = minor;
  return Object.keys(next).length ? next : null;
};

export const mrub = (minor) => (Number.isFinite(minor) ? `${mrubNumber(minor)}M ₽` : "—");
// Суммы, которые сравнивают бюджет с тратами, — с точностью поля ввода:
// 0,01M. Целые миллионы давали «Годовой бюджет превышен на 0M ₽: 970M ₽ из
// 970M ₽» — превышение меньше полумиллиона пропадало при округлении.
const mrubExactFormat = new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const mrubExact = (minor) => (Number.isFinite(minor)
  ? `${mrubExactFormat.format(Math.round(minor / (MINOR_PER_MRUB / 100)) / 100 || 0)}M ₽`
  : "—");
// Расходы, которые игрок переписывает в «План», — вверх до шага поля (0,01M):
// округлённые к ближайшему 162,113M показывались как 162,11M, и вписанное
// число оказывалось ниже расходов — «перерасход … на 0,00M ₽».
export const ceilToInputStep = (minor) => Math.ceil(minor / (MINOR_PER_MRUB / 100)) * (MINOR_PER_MRUB / 100);
// то же число без единицы — левый конец вилки прогноза, единица стоит у правого
export const mrubValue = (minor) => (Number.isFinite(minor) ? mrubNumber(minor) : "—");
// Разделитель дробной части — запятая, как у dec/mrub и у deltaBadge (ui.js).
// Голый toFixed() давал точку, и в одной строке стояло «18.1%» рядом с
// «▲ 1,09 пп»; заметнее всего это стало в таблице «Гипотеза и факт», где
// процент и процентные пункты — соседние колонки.
export const pct = (share, digits = 1) => (Number.isFinite(share) ? `${dec(share * 100, digits)}%` : "—");
export const fmtAttr = (value) => (Number.isInteger(value) ? String(value) : dec(value));
// Характеристики продукта парами «подпись — значение» в порядке ATTRS:
// справка карточки бренда и досье.
export const attrPairs = (physical) => ATTRS.map((a) => [a.label, fmtAttr((physical || {})[a.id])]);
export const sumValues = (record) => Object.values(record || {}).reduce((a, b) => a + (b || 0), 0);
export const companyLabel = (id) => ({ player: "Nordika", orion: "Orion", polar: "Polar", vektor: "Vektor", vertex: "Vertex" }[id] || id);

// Имя бренда для показа. Свои берём из состояния игры, чужие — из
// рыночной сводки. Идентификатор (id бренда в API) в интерфейс не попадает
// никогда — только это имя или нейтральная подпись ниже.
//
// Подпись нужна ровно одному бренду — энтранту Vertex. Он входит на рынок
// с 3–4-го года (модель переписывает плейсхолдер на один из трёх
// идентификаторов энтранта из конфига) и попадает в отчёт: «Что сделали
// конкуренты», таблицы по сегментам, Brand equity index. Взять настоящее
// имя неоткуда: state.brands — только свои бренды, а из рыночной сводки
// шаблоны энтранта вырезаны на бэкенде. Бэкенд ради этого не правим — это
// чужая зона (правило 1 в CLAUDE.md) и открытый вопрос; до его закрытия честнее
// нейтральная подпись, чем техническая строка через дефис.
const UNNAMED_BRAND = "Новый конкурент";

export const brandName = (id) => {
  const own = ((S.game && S.game.state && S.game.state.brands) || []).find((b) => b.id === id);
  if (own) return own.name;
  const mk = ((S.market && S.market.brands) || []).find((b) => b.id === id);
  return (mk && mk.name) || UNNAMED_BRAND;
};

// Свойство продукта с точностью его шага в конфиге: объём целым, энергокласс
// до сотых, остальное до десятых. Факт из отчёта приходит с ленточным хвостом
// (474,7032…) — без этого факт и план в одной строке читались бы разной
// точностью.
export function attrText(attr, value) {
  if (!Number.isFinite(value)) return "—";
  const digits = (String(attr.step).split(".")[1] || "").length;
  return dec(value, digits);
}
