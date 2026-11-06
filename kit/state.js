/* BrandSim — общее состояние приложения и обвязка для разрыва циклов между модулями. */

export const SEGMENTS = [
  { id: "premium", label: "Премиум" },
  { id: "family", label: "Семейный" },
  { id: "economy", label: "Эконом" },
];
export const CHANNELS = [
  { id: "marketplace", label: "Маркетплейсы", tip: "Универсальные онлайн-площадки (маркетплейсы) с широким охватом." },
  { id: "omnichannel", label: "Омниканал", tip: "Специализированные сети офлайн + онлайн, где потребители смотрят технику вживую." },
  { id: "dtc", label: "DTC", tip: "Собственные магазины бренда (direct-to-consumer) — прямой контакт с потребителем." },
];
// Семь характеристик модели (шесть физических + цена). Порядок — как
// в R&D по макету K1 (сетка 3×2): объём · энергокласс · надёжность /
// шум · дизайн · эргономичность. scale — балльные, шкала 1–10; tip — «?» поля.
const SCALE_NOTE = "Шкала 1–10, 10 — лучше.";
export const ATTRS = [
  { id: "volume_l", label: "Объём, л", min: 250, max: 600, step: 5 },
  { id: "energy_class", label: "Энергокласс", min: 1, max: 5, step: 0.05 },
  { id: "durability_index", label: "Надёжность", min: 1, max: 10, step: 0.1, scale: true,
    tip: `Насколько холодильник долговечен и безотказен. ${SCALE_NOTE}` },
  { id: "noise_db", label: "Уровень шума, дБ", min: 30, max: 50, step: 0.5 },
  { id: "design_index", label: "Дизайн", min: 1, max: 10, step: 0.1, scale: true,
    tip: `Внешний вид и материалы. ${SCALE_NOTE}` },
  { id: "ergonomics_index", label: "Эргономичность", min: 1, max: 10, step: 0.1, scale: true,
    tip: `Удобство пользования: зоны хранения, свежесть продуктов, разморозка. ${SCALE_NOTE}` },
];
export const MINOR_PER_MRUB = 1e8;
export const LAST_PERIOD = 5;

export const S = {
  user: null,
  game: null,
  decisions: null,
  evaluation: null,
  // decisionDigest() черновика, для которого посчитана evaluation: онбординг
  // засчитывает цену и «План = Расходы» только по свежей оценке
  evaluationDigest: null,
  forecast: null,
  market: null,
  history: null,
  shownPeriod: null,
  // Год, выбранный на вкладке «Рынок». Отдельный от shownPeriod: вкладки
  // листаются независимо. null — год ещё не выбирали, market.js возьмёт
  // последний сыгранный, а до первого хода — текущий период игры.
  marketPeriod: null,
  // Сегмент, открытый табами в разделе «Сегменты». Свой на каждой вкладке и
  // переживает смену года: игрок сравнивает один сегмент по годам.
  resultsSegment: "premium",
  marketSegment: "premium",
  teams: [],
  leaderboard: [],
  adminCohort: null,
  tab: "decisions",
  peekTab: "results",
  chart: null,
  // Онбординг пробного года (onboarding.js). Прогресс — копия
  // SimulationResponse.onboarding; touched, hint, ready, modalAck и ui живут только
  // в сессии и на сервер не уходят.
  onb: {
    active: false, gameId: null, stage: 0, done: new Set(), briefing: 0,
    dossierHintSeen: false, finalDismissed: false,
    touched: new Set(), hint: null, ready: false, modalAck: false,
    ui: { peekOpen: false, prefsVisible: false, checksOpen: false, issuesCount: null, started: false, periodsSeen: new Set() },
  },
  // Н1: правка ушла на проверку, ответа ещё нет — числа полосы P&L серые
  unitPending: false,
  rdPending: {},
  promoDiscountPct: {},
  cardExpanded: {},
  channelMixExceeded: {},
  channelPct: {},
  channelBudgetMinor: {},
  loading: false,
  saveState: "saved",
  savedAt: null,
  epoch: 0,
  stale: false,
  forecastDigest: null,
  forecastLoading: false,
  // Гипотеза долей: черновик ввода,
  // segment → brandId → целый процент или null у незаполненной ячейки.
  // Отдельный от S.decisions.share_hypotheses намеренно: модель
  // принимает только полную матрицу 3×3 и отвечает 422 на неполную или на
  // сумму сегмента выше 100% — а черновик по определению бывает и таким.
  // В S.decisions.share_hypotheses матрица попадает целиком и только когда
  // прошла обе проверки, поэтому ни автосохранение, ни запуск года не могут
  // упасть из-за наполовину набранной гипотезы.
  shares: null,
  openRows: {},
  // Радар «Показателей»: key включённых объектов — id бренда или
  // `ideal:${segmentId}`. Бренд включается целиком, на оба режима.
  radarOn: new Set(),
  // Режим радара: "physical" — факт в единицах осей, "perceived" —
  // восприятие баллами модели 0–10, он и по умолчанию.
  // Переживает смену года, как и выбор.
  radarMode: "perceived",
  // Дефолт сеется один раз за сессию, а не когда radarOn пуст: игрок вправе
  // осознанно снять все галочки, и это не должно откатываться на следующей
  // пересборке панели (смена года, уход с вкладки и возврат).
  radarSeeded: false,
  // Ответы GET /reports/{period}/radar по ключу "<simId>:<period>"
  // (results.js → loadRadar). Отчёт периода не меняется, пока не сменилась
  // эпоха: запуск года и откат идут через loadPlayer → bumpEpoch, и кеш
  // чистится там же.
  radarCache: {},
  // Плашки карточки «Бренды рынка» (charts.js). Режим бюджетов — «Общий» или
  // «Рекламный», показатель динамики — id из DYN_METRICS. Включённые бренды —
  // Set id; null — ещё не засеяно, при первой отрисовке включаются все.
  // Как и у радара, выбор живёт всю сессию и переживает смену года: игрок
  // вправе снять все бренды, и пересборка этого не откатит.
  chartBudgetMode: "total",
  chartBudgetOn: null,
  chartDynMetric: "share_units",
  chartDynOn: null,
  // id брендов, уже виденных выбором: новый бренд в данных включается сам.
  chartSeen: null,
};

// Таймеры валидации/автосохранения/прогноза используются в decisions.js, но должны
// переживать переприсвоение из нескольких мест и обнуляться из bumpEpoch (здесь).
// Импортированный биндинг модуля переприсвоить нельзя — поэтому не три let-переменные,
// а один объект: другие модули меняют его свойства, а не сам биндинг.
export const timers = { validate: null, autosave: null, forecast: null };

export function bumpEpoch() {
  S.epoch++;
  S.radarCache = {};
  clearTimeout(timers.validate);
  clearTimeout(timers.autosave);
  clearTimeout(timers.forecast);
  timers.validate = null;
  // погашенная проверка своего finally не дождётся — серость полосы P&L
  // снимаем здесь, иначе она пережила бы смену эпохи
  S.unitPending = false;
  timers.autosave = null;
  timers.forecast = null;
}

// Пробный год. Отметку держит сервер (SimulationResponse.practice):
// pending — пробный год ещё не сыгран, played — сыгран и ждёт «Начать игру»,
// done и off — настоящая игра. Пробный — первый год, который игрок играет
// сам (период движка 1, период 0 — фиксированный «Старт»), а на экране он
// «Год 0»: пока идёт проба, номер года на экране на единицу меньше периода.
export const practiceActive = () =>
  Boolean(S.game) && (S.game.practice === "pending" || S.game.practice === "played");
export const practicePlayed = () => Boolean(S.game) && S.game.practice === "played";
export const shownYear = (period) => (practiceActive() && period > 0 ? period - 1 : period);

export function decisionDigest() {
  if (!S.decisions) return "";
  try { return JSON.stringify(S.decisions); } catch { return ""; }
}

// Версия прогноза. Обе живут одновременно, пока не выбрана одна:
// - old — вилка в верхнем ярусе полосы (forecast.js) и карточка «Гипотеза долей»;
// - new — карточка «Прогноз» с прогнозным P&L за единицу (hypotheses.js),
//   у полосы один нижний ярус.
// ?forecast=old|new запоминается в localStorage, по умолчанию new,
// переключателя игроку не видно. localStorage — в try/catch: в приватном
// окне бросает и на чтении, и на записи.
const FORECAST_VERSIONS = ["old", "new"];
export function forecastVersion() {
  const asked = new URLSearchParams(location.search).get("forecast");
  if (FORECAST_VERSIONS.includes(asked)) {
    try { localStorage.setItem("brandsim.forecastVersion", asked); } catch { /* приватный режим */ }
    return asked;
  }
  try {
    const stored = localStorage.getItem("brandsim.forecastVersion");
    return FORECAST_VERSIONS.includes(stored) ? stored : "new";
  } catch {
    return "new";
  }
}

// ---------------------------------------------------------------- реестры разрыва циклов

// Реестр рендереров экрана. Правило входа: только рендер (функция,
// перерисовывающая часть экрана) — и только когда без реестра либо граф
// замкнулся бы, либо это прямо предписано задачей 3 (decisions/commandBar/
// results/market — обязательный паттерн из брифа: app.js не импортирует
// рендер экрана по имени, а зовёт его через R, даже там, где сегодня, после
// того как APP забрал обратные вызовы, прямой импорт технически не дал бы
// цикла). Потолок: 6 ключей ниже плюс onboarding (7-й, превышение
// сознательное, см. его пункт). Новый ключ — только когда без него граф
// замыкается, с пометкой почему.
//
// - decisions, commandBar, results, market — регистрирует владелец
//   (decisions.js/results.js/market.js); decisions/commandBar вызывает
//   app.js, results/market — peek.js.
// - spendReadouts — регистрирует decisions.js, вызывают levers.js и
//   validation.js: оба уже нужны decisions.js (decisions.js → levers.js за
//   buildXGroup, decisions.js → validation.js за runValidate), поэтому
//   импорт renderSpendReadouts из decisions.js в любую из сторон замкнул бы
//   цикл.
// - gameMeta — регистрирует app.js, вызывает validation.js: validation.js
//   нужен decisions.js/levers.js/forecast.js, которые нужны app.js, —
//   прямой импорт renderGameMeta в validation.js создал бы цикл через эту
//   цепочку.
// - onboarding — регистрирует onboarding-ui.js (плашка заданий и модалка
//   этапа), вызывает движок onboarding.js после каждой проверки, а до
//   движка доходит validation.js (APP.onboardingEvaluate). onboarding-ui.js
//   сам импортирует движок (onboardingActive, ackStageModal, noteUi), так
//   что прямой импорт рендера в onboarding.js замкнул бы цикл — та же
//   причина, что у gameMeta. Сверх потолка сознательно: это рендер, домен R,
//   а не обратный вызов для APP.
export const R = {};

// Обратный реестр. Правило входа: функция кладётся сюда, только если её
// прямой импорт создал бы цикл — модуль-потребитель уже нужен модулю-
// владельцу (прямо или через цепочку импортов), поэтому импорт в обратную
// сторону замкнул бы граф. Если функция не проходит этот тест — она обычный
// export/import, а не APP; если цикл, из-за которого функция сюда попала,
// со временем исчез — функцию нужно вернуть в обычный экспорт. Потолка на
// число ключей нет (в отличие от R, здесь нет и общего домена вроде «только
// рендеры»), но каждая запись обязана проходить этот тест — это не место
// для «так было проще».
//
// - app.js: showLogin, loadPlayer, renderPlayer — вызывают api.js/decisions.js/
//   results.js/peek.js, которые сами (прямо или транзитивно, через
//   validation.js) нужны app.js.
// - decisions.js: scheduleAutosave — вызывает validation.js
//   (queueValidate/runValidate оттуда нужны decisions.js).
// - onboarding.js: onboardingEvaluate — вызывает validation.js после ответа
//   draft/validate (onboarding.js сам берёт queueValidate из validation.js).
// - onboarding-lock.js: onboardingLock — вызывает onboarding.js после каждой
//   проверки (задание сменилось — цель блокировки тоже); onboarding-lock.js
//   сам берёт currentTask/markTouched из onboarding.js.
// - forecast.js: scheduleForecastIdle — вызывает validation.js (runValidate
//   оттуда нужен forecast.js).
//
// hypotheses.js (§5, карточка гипотезы долей) сюда не попадает: правка ячейки
// зовёт queueValidate из validation.js напрямую (ребро одностороннее, назад
// validation.js в hypotheses.js не ходит), а перерисовку полосы — через
// R.commandBar выше.
export const APP = {};
