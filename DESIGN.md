---
name: BrandSim
description: Спокойный аналитический стол на белой бумаге с одним раскалённым оранжевым акцентом и сжатыми дисплейными заголовками.
colors:
  # Ярус 2 — семантические роли. Значения разобраны по цепочке
  # роль → примитив → hex; примитивы (ярус 1) и их лестница — в § Colors.
  # Здесь только роли, которые реально вызываются во фронте, и те,
  # на которые ссылаются блоки components ниже.
  action: "#fc5000"
  bg-accent: "#fc5000"
  bg-accent-hover: "#b83b00"
  bg-card: "#efefef"
  bg-chip-claim: "#fff3ed"
  bg-danger-soft: "#fccdca"
  bg-data: "#fafafa"
  bg-secondary: "#4d4d4d"
  bg-strong: "#070607"
  bg-surface: "#ffffff"
  bg-tertiary: "#828282"
  bg-track: "#e0e0e0"
  bg-warning: "#f5f28e"
  bg-warning-soft: "#fcfccf"
  border-control: "#d6d6d6"
  border-default: "#e0e0e0"
  border-soft: "#e6e6e6"
  border-strong: "#202020"
  status-danger: "#ff003a"
  text-chip-claim: "#eb4c02"
  text-danger: "#ff003a"
  text-inverse: "#ffffff"
  text-on-accent: "#ffffff"
  text-primary: "#202020"
  text-secondary: "#4d4d4d"
  text-strong: "#070607"
  text-success: "#2a7d4f"
  text-tertiary: "#828282"
  text-warning: "#816729"
  # На тёмной заливке справочного слоя (полоса экрана, блок итогов).
  bg-inverse-soft: "rgba(255, 255, 255, 0.08)"
  border-inverse: "rgba(255, 255, 255, 0.16)"
  text-inverse-secondary: "rgba(255, 255, 255, 0.64)"
  text-inverse-tertiary: "rgba(255, 255, 255, 0.46)"
  text-success-inverse: "#aacbb9"
  bg-success-inverse: "rgba(42, 125, 79, 0.30)"
  text-danger-inverse: "#ff7393"
  bg-danger-inverse: "rgba(255, 0, 58, 0.26)"
typography:
  display-brand:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "50px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
    textTransform: "uppercase"
  wordmark:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.03em"
  display-title:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "35px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
    textTransform: "uppercase"
  display-table:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
    textTransform: "uppercase"
  kpi-value:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "35px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  head-panel:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "26px"
  label-row:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: "23px"
  summary-value:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: "19px"
    fontFeature: "tnum"
  value-field:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: "17px"
    fontFeature: "tnum"
  body:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "19px"
  body-strong:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.45
  numeric:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.45
    fontFeature: "tnum"
  label:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "14px"
    letterSpacing: "0.08em"
  caption:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  micro:
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1
rounded:
  xs: "8px"
  sm: "16px"
  md: "20px"
  lg: "32px"
  xl: "40px"
  pill: "999px"
shadows:
  surface: "0 7px 30px rgba(0, 0, 0, 0.06), 0 7px 16.6px rgba(0, 0, 0, 0.02), 0 3px 6px rgba(0, 0, 0, 0.08)"
  overlay: "0 8px 24px rgba(0, 0, 0, 0.08)"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "32px"
  card: "28px"
components:
  button-primary:
    backgroundColor: "{colors.bg-accent}"
    textColor: "{colors.text-on-accent}"
    typography: "{typography.numeric}"
    rounded: "{rounded.pill}"
    height: "38px"
    padding: "0 22px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-strong}"
    typography: "{typography.caption}"
    fontWeight: 500
    rounded: "{rounded.pill}"
    height: "30px"
    padding: "0 12px"
    gap: "4px"
  field-slider:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-control}"
    typography: "{typography.value-field}"
    rounded: "{rounded.xs}"
    height: "40px"
    width: "200px"
    padding: "0 12px"
  select:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    borderColor: "{colors.border-control}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    height: "40px"
    width: "200px"
    padding: "0 24px 0 10px"
  card-brand:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "8px"
  widget-product:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    padding: "20px"
    gap: "12px"
  panel-decisions:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    shadow: "{shadows.surface}"
    width: "886px"
    padding: "0 24px"
  row-property:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.label-row}"
    padding: "20px 0"
    gap: "14px"
    labelWidth: "200px"
    labelHeight: "52px"
  chip-claim:
    backgroundColor: "{colors.bg-chip-claim}"
    textColor: "{colors.text-chip-claim}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    height: "32px"
    width: "200px"
    padding: "0 10px"
  checkbox:
    backgroundColor: "{colors.bg-surface}"
    borderColor: "{colors.border-control}"
    rounded: "0"
    height: "13px"
    width: "13px"
  checkbox-checked:
    backgroundColor: "{colors.bg-accent}"
    textColor: "{colors.text-inverse}"
    rounded: "0"
    height: "13px"
    width: "13px"
  row-expanded:
    backgroundColor: "transparent"
    padding: "0 0 20px 214px"
    gap: "10px"
  hint-line:
    backgroundColor: "transparent"
    textColor: "{colors.text-tertiary}"
    typography: "{typography.caption}"
  issue-text:
    backgroundColor: "transparent"
    textColor: "{colors.text-danger}"
    typography: "{typography.caption}"
    maxWidth: "200px"
  issue-text-warning:
    backgroundColor: "transparent"
    textColor: "{colors.text-warning}"
    typography: "{typography.caption}"
    maxWidth: "200px"
  word-button:
    backgroundColor: "transparent"
    textColor: "{colors.text-tertiary}"
    typography: "{typography.caption}"
    textDecoration: "underline"
  modified-dot:
    backgroundColor: "{colors.bg-accent}"
    rounded: "{rounded.pill}"
    height: "4px"
    width: "4px"
  segment-mark:
    backgroundColor: "{colors.bg-tertiary}"
    rounded: "{rounded.pill}"
    height: "10px"
    width: "10px"
  summary-value:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.summary-value}"
  help-badge:
    backgroundColor: "{colors.bg-tertiary}"
    textColor: "{colors.text-inverse}"
    rounded: "{rounded.pill}"
    fontFamily: "Rubik, SF Pro Text, system-ui, sans-serif"
    fontWeight: 400
    fontSize: "10px"
    height: "14px"
    width: "14px"
    fontSizeLarge: "12px"
    sizeLarge: "18px"
  message-warning:
    backgroundColor: "{colors.bg-warning}"
    textColor: "{colors.text-on-accent}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: "4px 10px"
  badge-count:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.numeric}"
    rounded: "{rounded.pill}"
    height: "22px"
    padding: "0 8px"
  nav-tab:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  nav-tab-active:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  bar-command:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    height: "64px"
    padding: "0 24px"
  bar-top:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    height: "52px"
    padding: "0 24px"
  panel-overview-head:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.head-panel}"
    height: "68px"
    padding: "0 24px"
    gap: "16px"
  strip-screen:
    backgroundColor: "{colors.bg-strong}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.display-title}"
    rounded: "{rounded.lg}"
    padding: "12px 12px 12px 24px"
  panel-reference:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.display-title}"
    rounded: "{rounded.lg}"
    padding: "24px"
  tile-kpi:
    backgroundColor: "{colors.bg-inverse-soft}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.kpi-value}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  table-reference-head:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.xs}"
    padding: "8px 12px"
---

<!-- Гейт приёмки закреплён скриптом, а не только текстом здесь:
     kit/design-gate.sh — запускать перед коммитом любой правки фронта,
     ненулевой код возврата = есть нарушение. -->

# Design System: BrandSim

> Экраны игры в этот репозиторий не входят: где ниже описан экран, панель
> или файл экрана, это исходный продукт. Видно здесь только то, что рисует
> страница кита (`kit/kit.html`).

## Overview

**Creative North Star: "Стол аналитика с одним раскалённым маркером"**

Основа взята у Ventriloc: белая бумага, карточки на тёплом сером, тонкие серые линии, спокойный Rubik в тексте. Интерфейс должен выглядеть как отчёт аналитика, а не как дашборд: почти вся страница ахроматична, структуру держат линии и поверхности, а не тени и цветные заливки. Плотность рабочая: строка свойства 100 px при поле 20 px сверху и снизу, контрол 40 px, подпись строки 16 px, текст 13 px.

Поверх этой тишины один голос от Caldera: раскалённый оранжевый на действии и на всём, что двигается руками. Кнопка запуска года, дорожка и метка слайдера, шкала бюджета, точка счётчика проверки. Предупреждения на серном жёлтом. Сжатый дисплейный шрифт капителью — в именах брендов, логотипе и заголовках справочного слоя («Показатели», «Рынок»), всё остальное набрано Rubik.

Подтверждённые отказы: никаких синих акцентов; показатели не собираются в текст, только строками «подпись, значение, единица»; в блоке текущего состояния только свойства продукта.

**Key Characteristics:**
- Белая канва, карточки на тёплом сером, белый виджет данных внутри карточки.
- Один хроматический акцент, оранжевый, и один статусный цвет предупреждения, жёлтый.
- Сжатый дисплейный шрифт капителью для имён брендов и заголовков справочного слоя, Rubik для всего остального.
- «Показатели» и «Рынок» открываются одинаковой чёрной полосой «Название • Год N» с переключателем годов; полоса липнет к верху панели обзора.
- Одна мягкая тень под панелью решений, всё остальное плоское: глубина через контраст бумага → серое → белое.
- Слайдер живёт на нижней границе инпута, а не отдельным элементом.
- Все числа табличными цифрами, выровнены по правому краю.

## Colors

Ахроматическая основа с тёплым серым и один раскалённый оранжевый; жёлтый и латунь только для статусов и данных.

Токены разложены на три яруса (CTI): примитив знает только значение, семантическая роль знает назначение, компонентный токен принадлежит одному компоненту. **В разметке вызывается ярус 2, изредка ярус 3. Примитив напрямую не вызывается никогда.**

### Основные роли

Имя — как цвет зовут в правилах ниже и в разговоре; токен — что писать в CSS. Девятнадцать ролей из тридцати четырёх, по числу вызовов во фронте; остальные пятнадцать вызываются один–три раза, их значения смотреть в `styles.css`, ярус 2.

| Имя | Значение | Токен | Роль |
|---|---|---|---|
| Ink | `#202020` | `--color-text-primary` | Основной текст: тело страницы, значения, надписи кнопок и активных вкладок |
| Steel | `#4d4d4d` | `--color-text-secondary` | Вторичный текст: заголовки секций, подписи полей, неактивные вкладки, служебные строки карточки |
| Line | `#e0e0e0` | `--color-border-default` | Границы карточек, плашек и полей, делители шапок |
| Paper | `#ffffff` | `--color-bg-surface` | Белая поверхность: канва страницы, верхняя плашка, панели, карточка бренда, активная вкладка |
| Slate | `#828282` | `--color-text-tertiary` | Третичный текст: единицы, подписи колонок, отключённые чипы, словесные кнопки |
| Ember | `#fc5000` | `--color-bg-accent` | Заливка акцентом: кнопка запуска года, заполнение шкалы бюджета, метка слайдера канала |
| Line-soft | `#e6e6e6` | `--color-border-soft` | Делители внутри карточки: между строками свойств, группами свойств, плитками прогноза |
| Ash | `#efefef` | `--color-bg-card` | Тёплый серый: активная вкладка, шапка и тело раскрытой панели, карточка бренда варианта Б, подложка вторичной кнопки и поля под курсором |
| Ember | `#fc5000` | `--color-action` | Тот же оранжевый контуром и текстом: кольцо фокуса у кнопок, табов, переключателя и слайдера, рамка поля в фокусе, граница основной кнопки. В наведении не бывает |
| Panel-2 | `#fafafa` | `--color-bg-data` | Поверхность данных и контролов на белом: поле ввода, селект, обычная кнопка, шапка карточки, подкарточка |
| Error | `#ff003a` | `--color-text-danger` | Красный текст: сообщение об ошибке, отрицательное значение, дельта вниз, выключенный бейдж |
| Ink | `#202020` | `--color-border-strong` | Тёмная рамка контрола: кнопка, чип, иконочная кнопка. Фокус ею больше не рисуется — он Ember |
| Error | `#ff003a` | `--color-status-danger` | Красный на элементе, а не в тексте: рамка невалидного поля и карточки, баннер устаревшего состояния, тост ошибки |
| Line | `#e0e0e0` | `--color-bg-track` | Спокойная подложка без границы: незаполненная дорожка шкалы бюджета, чётные строки таблиц, скелетон загрузки |
| Slate | `#828282` | `--color-bg-tertiary` | Третья ступень ахроматической лестницы заливок: третье место лидерборда, справочная отметка сегмента, селект сегмента, выключенный переключатель под курсором, дорожка и ручка отключённого слайдера |
| Ink-deep | `#070607` | `--color-text-strong` | Самый тёмный текст: имя бренда в карточке |
| Paper | `#ffffff` | `--color-text-inverse` | Текст и глифы на тёмной заливке: тултип, плашки мест лидерборда |
| Ok | `#2a7d4f` | `--color-text-success` | Зелёный текст: метка «чисто» в проверке, положительное значение, дельта вверх, включённый бейдж |
| Control-border | `#d6d6d6` | `--color-border-control` | Рамка поля со слайдером (и в карточке бренда, и в карточке гипотезы долей), селекта сегмента |

Одно имя обслуживает несколько ролей — это норма: Ember красит и заливку, и контур, Ink работает и текстом, и рамкой. Различает их токен, а не имя.

Ещё несколько имён встречаются в правилах ниже, но вызываются во фронте
один–три раза и потому в основную таблицу не попали:

| Имя | Значение | Токен | Роль |
|---|---|---|---|
| Sulfur | `#f5f28e` | `--color-bg-warning` | Подложка предупреждения, которое не блокирует запуск |
| Sulfur-deep | `#e8c320` | `--color-status-warning` | Точка предупреждения в счётчиках и списке проверки: светлый Sulfur на белом читается как серый |
| Brass | `#816729` | `--color-text-warning` | Текст предупреждения и второстепенные метки в данных |
| Error-bg | `#fe9593` | `--color-bg-danger` | Подложка локального сообщения об ошибке |
| Ok-bg | `#eef5f0` | `--color-bg-success` | Подложка бейджа включённого состояния в админке |
| Sulfur-soft | `#fcfccf` | `--color-bg-warning-soft` | Мягкая подложка группы, внутри которой уже стоит Sulfur: капсула проверки и запуска при предупреждениях |
| Error-soft | `#fccdca` | `--color-bg-danger-soft` | Мягкая подложка группы, внутри которой уже стоит Error-bg: капсула проверки и запуска при ошибках |
| Ember-burnt | `#b83b00` | `--color-bg-accent-hover` | Заливка акцента под курсором: основная кнопка и включённый переключатель при наведении, заметно темнее Ember |
| Ink-deep | `#070607` | `--color-bg-strong` | Первая ступень ахроматической лестницы заливок: первый бренд в полосе распределения гипотезы долей |
| Steel | `#4d4d4d` | `--color-bg-secondary` | Вторая ступень ахроматической лестницы заливок: второй бренд в полосе распределения гипотезы долей, знак подсказки под курсором |

На тёмной заливке справочного слоя (полоса экрана, блок итогов) — белый с прозрачностью и высветленные статусы. В CSS все восемь собраны `color-mix` из примитивов, значения ниже — результат смешения. Таб, чип и знак подсказки к ним напрямую не обращаются: берут свои компонентные токены, а тёмные значения этим токенам даёт `.theme-dark` (§ Компонентные токены).

| Имя | Значение | Токен | Роль |
|---|---|---|---|
| Veil-dark | `rgba(255,255,255,.08)` | `--color-bg-inverse-soft` | Подложка на тёмном: плитка итогов, заливка под графиком; через `.theme-dark` — панель табов и чип borderless без тона |
| Line-dark | `rgba(255,255,255,.16)` | `--color-border-inverse` | Линии и неактивные куски на тёмном: чужие компании в полосе плитки; через `.theme-dark` — рамка панели табов |
| Paper-64 | `rgba(255,255,255,.64)` | `--color-text-inverse-secondary` | Вторичный текст на тёмном: подпись плитки итогов; через `.theme-dark` — неактивный таб, текст чипа без тона |
| Paper-46 | `rgba(255,255,255,.46)` | `--color-text-inverse-tertiary` | Третичный текст на тёмном: подписи графика, знак тултипа |
| Ok-light | `#aacbb9` | `--color-text-success-inverse` | Через `.theme-dark`: текст чипа `tone-success` |
| Ok-veil | `rgba(42,125,79,.30)` | `--color-bg-success-inverse` | Через `.theme-dark`: подложка чипа `tone-success` |
| Error-light | `#ff7393` | `--color-text-danger-inverse` | Через `.theme-dark`: текст чипа `tone-danger` |
| Error-veil | `rgba(255,0,58,.26)` | `--color-bg-danger-inverse` | Через `.theme-dark`: подложка чипа `tone-danger` |

### Лестница примитивов

Ярус 1. Имя = тон плюс ступень, где ступень — светлота, посчитанная как (100 − L) и округлённая до 50: 0 — белое, 950 — почти чёрное. Прозрачные несут суффикс `-aNN`, где NN — альфа в процентах, поэтому по имени видно и тон, и степень прозрачности.

| Токен | Значение | Роли, которые на него ссылаются |
|---|---|---|
| `--color-base-neutral-0` | `#ffffff` | `bg-page`, `bg-surface`, `text-inverse`, `text-on-accent` |
| `--color-base-neutral-25` | `#fafafa` | `bg-data` |
| `--color-base-neutral-50` | `#efefef` | `bg-card` |
| `--color-base-neutral-100` | `#e6e6e6` | `border-soft` |
| `--color-base-neutral-150` | `#e0e0e0` | `bg-track`, `text-faint`, `border-default` |
| `--color-base-neutral-200` | `#d9d9d9` | `bg-slider-track` |
| `--color-base-neutral-250` | `#d6d6d6` | `border-control`, `bg-switch-track` |
| `--color-base-neutral-500` | `#828282` | `bg-tertiary`, `text-tertiary`, `bg-rank-3` |
| `--color-base-neutral-700` | `#4d4d4d` | `text-secondary`, `bg-secondary`, `bg-rank-2` |
| `--color-base-neutral-900` | `#202020` | `text-primary`, `border-strong`, `bg-tooltip` |
| `--color-base-neutral-950` | `#070607` | `text-strong`, `action-text`, `bg-strong`, `bg-rank-1` |
| `--color-base-orange-50` | `#fff3ed` | `bg-chip-claim` |
| `--color-base-orange-500` | `#fc5000` | `bg-accent`, `action` |
| `--color-base-orange-600` | `#eb4c02` | `text-chip-claim` |
| `--color-base-orange-650` | `#b83b00` | `bg-accent-hover` |
| `--color-base-yellow-100` | `#fcfccf` | `bg-warning-soft` |
| `--color-base-yellow-200` | `#f5f28e` | `bg-warning` |
| `--color-base-yellow-500` | `#e8c320` | `status-warning` |
| `--color-base-yellow-700` | `#816729` | `text-warning`, `status-warning-line` |
| `--color-base-red-100` | `#fccdca` | `bg-danger-soft` |
| `--color-base-red-200` | `#fe9593` | `bg-danger` |
| `--color-base-red-500` | `#ff003a` | `bg-danger-strong`, `text-danger`, `status-danger` |
| `--color-base-green-50` | `#eef5f0` | `bg-success` |
| `--color-base-green-700` | `#2a7d4f` | `text-success`, `status-success` |
| `--color-base-neutral-0-a72` | `rgba(255, 255, 255, .72)` | `bg-veil` |
| `--color-base-neutral-900-a10` | `rgba(32, 32, 32, .1)` | `border-veil` |
| `--color-base-neutral-950-a32` | `rgba(7, 6, 7, .32)` | `bg-scrim` |
| `--color-base-chart-2` | `#2f8f6b` | — |
| `--color-base-chart-3` | `#7a3f91` | — |
| `--color-base-chart-7` | `#83891f` | — |
| `--color-base-chart-own-1` | `#d8341c` | — |
| `--color-base-chart-own-2` | `#f2641a` | — |
| `--color-base-chart-own-3` | `#f39a2e` | — |
| `--color-base-chart-rival-a-1` | `#1f5fb8` | — |
| `--color-base-chart-rival-a-2` | `#6a9ee0` | — |
| `--color-base-chart-rival-a-3` | `#123a73` | — |
| `--color-base-chart-rival-b-1` | `#12707e` | — |
| `--color-base-chart-rival-b-2` | `#5fb4c0` | — |
| `--color-base-chart-rival-c-1` | `#7a4a22` | — |
| `--color-base-chart-rival-c-2` | `#b88a55` | — |
| `--color-base-chart-rival-other-1` | `#4b5563` | — |
| `--color-base-chart-rival-other-2` | `#8a939e` | — |
### Компонентные токены

Ярус 3. Токен компонентный, если нужно поменять один компонент, не задев остальных, которые живут на той же семантике. Их двадцать три: восемь ниже и пятнадцать тематических (§ Тёмная тема).

| Имя | Значение | Токен | Роль |
|---|---|---|---|
| chip-bg | `#fff3ed` | `--color-bg-chip-claim` | Подложка чипа заявления |
| chip-ink | `#eb4c02` | `--color-text-chip-claim` | Текст чипа заявления |
| Ink | `#202020` | `--color-bg-tooltip` | Заливка всплывающей подсказки |
| Control-border | `#d6d6d6` | `--color-bg-switch-track` | Дорожка переключателя |
| Track | `#d9d9d9` | `--color-bg-slider-track` | Дорожка слайдера канала |
| Ink-deep | `#070607` | `--color-bg-rank-1` | Плашка первого места лидерборда |
| Steel | `#4d4d4d` | `--color-bg-rank-2` | Плашка второго места |
| Slate | `#828282` | `--color-bg-rank-3` | Плашка третьего места |

### Тёмная тема

Таб, панель табов, чип borderless и знак подсказки стоят и на белом, и на тёмной заливке справочного слоя. Раньше тёмный вид им давали контекстные правила (`.ref-strip .ref-years .tab`, `.ref-kpi .help-tip`) — компонент знал, где стоит. Теперь компонент берёт только свой токен ярусом 3: светлое значение объявлено в `:root`, тёмное — в `.theme-dark`. Класс ставится на тёмную поверхность — полосу экрана (`.ref-strip`) и блок итогов (`.ref-summary`), — и всё внутри неё темнеет само. Кроме пятнадцати токенов ниже `.theme-dark` переопределяет `--color-bg-veil` и `--color-border-veil` панели табов: на тёмном это Veil-dark и Line-dark. В ките их показывает таблица «Компонентные» в карточке «Тема».

| Токен | Светлая | Тёмная |
|---|---|---|
| `--color-text-tab` | Steel `--color-text-secondary` | Paper-64 `--color-text-inverse-secondary` |
| `--color-text-tab-hover` | Ink-deep `--color-text-strong` | Paper `--color-text-inverse` |
| `--color-bg-tab-active` | Ash `--color-bg-card` | Paper `--color-bg-surface` |
| `--color-text-tab-active` | Ink `--color-text-primary` | Ink `--color-text-primary` |
| `--color-bg-chip` | прозрачный | Veil-dark `--color-bg-inverse-soft` |
| `--color-text-chip` | Steel `--color-text-secondary` | Paper-64 `--color-text-inverse-secondary` |
| `--color-bg-chip-success` | Ok-bg `--color-bg-success` | Ok-veil `--color-bg-success-inverse` |
| `--color-text-chip-success` | Ok `--color-text-success` | Ok-light `--color-text-success-inverse` |
| `--color-bg-chip-danger` | Error-bg `--color-bg-danger` | Error-veil `--color-bg-danger-inverse` |
| `--color-text-chip-danger` | Ink `--color-text-primary` | Error-light `--color-text-danger-inverse` |
| `--color-bg-chip-warning` | Sulfur `--color-bg-warning` | — |
| `--color-text-chip-warning` | Ink `--color-text-primary` | — |
| `--color-bg-help-tip` | Slate `--color-bg-tertiary` | `--color-bg-inverse-tertiary` |
| `--color-bg-help-tip-hover` | Steel `--color-bg-secondary` | Paper `--color-bg-surface` |
| `--color-text-help-tip` | Paper `--color-text-inverse` | Ink-deep `--color-text-strong` |

У `warning` тёмного значения нет: предупреждений на тёмном в продукте нет. Появится — сначала значение в `.theme-dark`, потом чип.

### Named Rules
**The One Ember Rule.** Оранжевый (`--color-action`, `--color-bg-accent`) появляется только там, где можно нажать или потянуть: кнопка, слайдер, шкала, точка изменённого поля. Красится кнопка целиком: у акцентной текстовой (`.word-btn.accent`) — всё её слово, а не часть подписи. Ни заголовков, ни иконок, ни декоративных заливок оранжевым. Одно объявленное исключение — данные справочного слоя: там Ember метит «ваше» — свою компанию и свои бренды (точка перед именем, кусок полосы долей, столбец BEI, полоса доли), текущую точку графика ваших итогов и факт в гантели вашей гипотезы. Это не декор и не действие, а один и тот же смысл в каждом месте; чужое в тех же графиках всегда ахроматично.

**The Hover Darkens Rule.** Наведение не оранжевое ни у одного компонента: под курсором компонент темнеет. Ember — это фокус (кольцо 2 px с отступом 2 px у кнопки, таба, переключателя и ручки слайдера, рамка у поля) и заливка primary. Вторичная кнопка и поле темнеют подложкой до Ash (`--color-bg-card`), primary и включённый переключатель — до Ember-burnt, выключенный переключатель — до Slate, таб — текстом до `--color-text-tab-hover`, знак подсказки — кругом до `--color-bg-help-tip-hover`, нажимаемый чип бледнеет целиком (`opacity: .7`), тон не перекрашивается. У отключённого наведения нет: `.claim`, `.radar-toggle`, переключатель и поле его подавляют. Исключение одно — кромка панели обзора (`.peek-grip`): при наведении и перетаскивании она подсвечивается Ember, и так и остаётся. Это не контрол, а зона захвата у края окна: полоса должна быть заметна сразу, а тёмная кромка на тёмной рисочке не читалась бы (§ Панель обзора).

**The No Blue Rule.** Синего в системе нет ни в каком оттенке, включая ссылки и фокус.

**The Sulfur Warns, Ember Acts Rule.** Жёлтый (`--color-bg-warning`, `--color-status-warning`) говорит, оранжевый (`--color-action`) действует. Предупреждение никогда не оранжевое, кнопка никогда не жёлтая.

### Категориальная палитра диаграмм

Цвета данных на радаре: три своих бренда, конкуренты — семейство оттенков на компанию, и три идеала сегментов. **Действует только внутри диаграмм.** Всё остальное в системе — по-прежнему ахроматика с одним акцентом Ember; категориальный цвет в интерфейс, кнопки, вкладки, чипы не просачивается ни при каких условиях. Синий допустим только в токенах конкурентов (`--color-base-chart-rival-*`) и только в диаграммах (радар и плашки «Рынка»); в интерфейсе The No Blue Rule действует как прежде, гейт пропускает синий лишь в объявлениях этих токенов. Ярусом выше палитра не поднимается: у неё нет семантических ролей, её вызывают `radar.js` и `charts.js` (плашки «Рынка», § Плашка диаграммы) — одной функцией `brandPalette`, цвет бренда на радаре и в плашках один и тот же.

Свои бренды — тёплая группа от красного к оранжевому (`own-1…3`), по решению владельца продукта: Nordika на радаре должна читаться одним семейством. Эти три тона сознательно лежат рядом с Ember, а `own-1` — рядом с Error; спора с интерфейсом нет, потому что за пределы радара они не выходят, а на радаре нет ни кнопок, ни ошибок. В плашке «Бюджеты брендов» те же три тона красят не бренды, а части полосы — статьи расходов (по порядку слева направо `own-1`, `own-2`, `own-3`); бренды там цвета не имеют, поэтому выбор брендов в этой плашке чёрный (`--color-text-primary`), иначе одна краска значила бы и бренд, и статью. Цена решения — три заливки Nordika при наложении сливаются в одно тёплое пятно и различаются контуром фигуры, а не цветом.

| Токен | Значение | Роль |
|---|---|---|
| `--color-base-chart-own-1` | `#d8341c` | первый свой бренд по слоту |
| `--color-base-chart-own-2` | `#f2641a` | второй свой бренд |
| `--color-base-chart-own-3` | `#f39a2e` | третий свой бренд |
| `--color-base-chart-rival-a-1` | `#1f5fb8` | Vektor, 1-й бренд по слоту (Elite) |
| `--color-base-chart-rival-a-2` | `#6a9ee0` | Vektor, 2-й (Prima) |
| `--color-base-chart-rival-a-3` | `#123a73` | Vektor, 3-й (Smart) |
| `--color-base-chart-rival-b-1` | `#12707e` | Orion, 1-й (Signature) |
| `--color-base-chart-rival-b-2` | `#5fb4c0` | Orion, 2-й (Saving) |
| `--color-base-chart-rival-c-1` | `#7a4a22` | Polar, 1-й (Balance) |
| `--color-base-chart-rival-c-2` | `#b88a55` | Polar, 2-й (Compact) |
| `--color-base-chart-rival-other-1` | `#4b5563` | прочие компании, 1-й (новичок Vertex) |
| `--color-base-chart-rival-other-2` | `#8a939e` | прочие компании, 2-й |
| `--color-base-chart-3` | `#7a3f91` | идеал «Премиум» |
| `--color-base-chart-2` | `#2f8f6b` | идеал «Семейный» |
| `--color-base-chart-7` | `#83891f` | идеал «Эконом» |

Конкуренты окрашиваются по компании: Vektor — синие (a), Orion — бирюзовые (b), Polar — коричневые (c), любая другая компания — графит (other, общий счётчик на всех прочих). Внутри семейства бренды идут по `slot` в конфиге, бренды без слота — в конце; порядок переключателей на экране цвет не задаёт, и цвета устойчивы между годами. Так бренды одного производителя читаются группой, а соседи по сегменту из разных компаний — разными тонами. Номера токенов идеалов (`-2`, `-3`, `-7`) остались от прежней раздачи и порядка не означают. У одного бренда факт и восприятие делят один цвет: тип профиля кодируется формой (заливка, бледная заливка, пунктир), не цветом — см. § Радар.

Идеалы сегментов — не бренды, но три пунктира одного чёрного тона (прежняя лестница Ink-deep → Steel → Slate) на радаре не различались. Теперь у каждого свой цвет, и ни один не тёплый: идеалы включены по умолчанию вместе с заливками Nordika.
## Typography

**Display Font:** Oswald (бесплатный, OFL, Google Fonts), начертания Regular 400 и Bold 700, с кириллицей. В исходном продукте стоял коммерческий Bebas Neue Pro (Regular 400 и Bold 700); в публичный образец он не кладётся, Oswald — ближайшая бесплатная замена по духу, поэтому кит здесь выглядит чуть иначе оригинала.
**Body Font:** Rubik (с fallback SF Pro Text, system-ui)
**Label/Mono Font:** нет; табличные цифры через `font-variant-numeric: tabular-nums` в Rubik.

**Character:** сжатая капитель на именах брендов и заголовках справочного слоя даёт плакатный акцент, Rubik в остальном держит спокойный рабочий тон. Контраст двух шрифтов и есть характер системы.

### Hierarchy

Шкала построена по **Minor Third (1,200)**: база наборного текста 14 px
умножается на коэффициент и один раз делится на него же. Ступени —
**12 / 14 / 17 / 20 / 24 / 29 / 35 / 42 / 50**; числа получены округлением
(11,7 → 12, 16,8 → 17, 20,2 → 20, 24,2 → 24, 29,0 → 29, 34,8 → 35,
41,8 → 42, 50,2 → 50). Девять ступеней. В продукте работают восемь — 12,
14, 17, 20, 24, 29, 35 и 50 (29 — Heading 3, заголовок карточки «Гипотеза
долей»; 35 — заголовки справочного слоя и значение плитки итогов; 24 — имена
брендов в шапке P&L); 42 встречается только на странице кита (образец
начертания). Ниже 12 есть одна служебная ступень — **10** (12 / 1,2): знак
«?» в круге подсказки размера `sm`; для текста она не применяется.

- **Display** (700, 50px, 1.0, капитель, +0.02em): имена брендов в
  карточках. Начертание Bold, как у заголовков справочного слоя: Regular у Bebas Neue Pro (исходный продукт) узкий и рядом с жирными заголовками
  «Показателей» и «Рынка» читался другим шрифтом. Раньше здесь стоял Regular
  с доводом «Bold на 50 px превращает имя в плакат»; довод снят вместе с ним.
  Единственное место крупного шрифта на экране решений.
- **Wordmark** (700, 20px, 1.0, капитель, +0.03em): логотип в верхней
  плашке и шапка панели решений.
- **Display Title** (700, 35px, 1.0, капитель, +0.02em): полоса экрана и
  заголовки панелей справочного слоя. Шире Bold начертаний не
  подключено.
- **Display Table** (700, 24px, 1.0, капитель, +0.02em, Ink-deep): верхний
  ярус шапки таблиц справочного слоя — подписи групп колонок (`.ref-grp`) и
  имена брендов P&L (`.ref-brand`), одним правилом.
- **KPI Value** (600, 35px, 1.15, tnum, −0.01em): значение плитки итогов.
- **Value** (600, 17px, tnum): значения — плитка показателя. Значения
  вилки прогноза в полосе управления — ступенью ниже, 600 14/19 tnum:
  полоса стоит поверх экрана и не должна перебивать карточки. Сумма свёрнутого рычага набрана 600 14 tnum: она стоит в
  строке рядом с подписью строки и не должна её перебивать. Значение в поле со слайдером набрано Body
  (400, 14px, tnum): внутри контрола крупный жирный набор спорит с подписью
  строки. Ступенью выше базы: при
  равном размере значение перестаёт отличаться от текста, а вес один этой
  работы не делает.
- **Row-label** (500, 17px): подписи строк свойств.
- **Body** (400, 14px, 1.45): наборный текст, база.
- **Body-strong** (500, 14px, 1.45): вкладки, названия каналов, значения
  селектов.
- **Label** (600, 12px, капитель, +0.08em): заголовки блоков, подписи
  колонок таблиц.
- **Caption** (400, 12px, 1.4): строка «было …», единицы, суммы каналов,
  текст предупреждений, чипы в шапке.

Интерлиньяж, заданный в пикселях, при переходе на шкалу пересчитан
пропорционально, а не оставлен прежним: `14px/17px` при росте размера до
16 дало бы отношение 1,06, и текст слипся бы.

### Named Rules
**The Rows Rule.** Показатели никогда не собираются в предложение. Каждый показатель это строка: подпись слева, значение и единица справа, выровненные по колонке.

**The One Heading Rule.** Заголовков четыре уровня и ни одного больше: `h1` — логотип плашки (20), `h2` — заголовок панели и модалки (17), `h3` — заголовок секции (Label: 600 12/15, капитель, +0.08em, Steel), `.sub` — подзаголовок (12, Steel). Третий уровень до пересборки атомов существовал в пяти реализациях с тремя трекингами (.04 у подкарточки, .05 у шапки таблицы, .08 у остальных); сейчас все пять несут один набор свойств, а собственной у каждой остаётся только раскладка. Справочный слой меняет размер уровней, а не их число: `h2` там — Display Title (заголовок панели и полосы экрана), `h3` внутри панели — `.ref-h3` (600 17/22, без капители), подзаголовков-описаний под заголовком нет — описание в тултипе.

**The Two Faces Rule.** Дисплейный шрифт — только для имён брендов, логотипа и заголовков справочного слоя (полоса экрана, заголовки панелей «Показателей» и «Рынка», верхний ярус шапки таблиц — подписи групп и имена брендов в P&L), всегда Bold. Заголовки блоков внутри панелей, кнопки, подписи и цифры остаются Rubik — значения плиток итогов тоже: крупный дисплейный набор цифр отвергнут на макете.

## Layout

Страницу держат две плашки одной формы: верхняя прибита к верху и скруглена снизу, нижняя прибита к низу и скруглена сверху. Обе шириной с рабочую область, радиус 32. Между ними вкладки — единственное, что липнет при прокрутке: акцентная капсула с прямыми верхними углами, белым текстом и белой активной вкладкой, тень появляется только когда капсула действительно прилипла.

«Показатели» и «Рынок» не уводят со страницы решений — они живут в панели обзора справа, подробности в § Components → Панель обзора.

Рабочая область 1500 px; контент во всю ширину с полем 24 px по бокам. Макет рассчитан на Full HD при масштабировании Windows 125 %, то есть на эффективную ширину около 1500 px. Экран решений это колонка карточек брендов с промежутком 14 px, все карточки раскрыты, порядок брендов фиксирован. Сверху плашка 52 px с логотипом, номером хода, вкладкой «Решения», кнопкой панели обзора, командой и выходом. Снизу залипшая полоса из двух ярусов — вилка прогноза сверху, плашка бюджета с счётчиками проверки и кнопкой запуска снизу; она остаётся видимой при любом скролле.

Карточка бренда это серое поле с полем 8 px, внутри которого слева прозрачная колонка текущего состояния, справа белая панель решений шириной 886 px. Панель прижата к верху, левая колонка по высоте своего содержимого, поэтому серое поле продолжается под ней.

Левая колонка: поле 20 px, промежуток 12 px между блоками. Сверху имя бренда дисплейным шрифтом 50 px капителью, дальше линии Line-soft (`--color-border-soft`) 1 px и три раздела: «Бюджета на прошлый год», «Осведомлённость», «Текущие характеристики». Раздел это заголовок Label с полем 8 px сверху, знак «?» и сетка из трёх равных колонок; ячейка это подпись Steel (`--color-text-secondary`) 12/17 над значением Ink (`--color-text-primary`) 12/14 в бюджете и 13/16 в остальных разделах, поле 6 px сверху и снизу.

Правая панель: поле 0 24 px, радиус 32 px (`--radius-lg`), тень `--shadow-surface`. Первая строка свойств — «Бюджет бренда»: поле «План» и две сводки «Расходы бренда», «Осталось» / «Перерасход» (перерасход — `--color-text-warning`, запуск не блокирует), каждая в колонке шириной поля по центру контрола. Дальше строки свойств: поле 20 px (`--space-5`) сверху и снизу, промежуток 12 px (`--space-3`), подпись 200 px (`--size-field`) по центру контрола, контрол занимает остальное. Поле со слайдером 200 × 40 px, три поля каналов в ряд с промежутком 12 px, между бюджетом каналов и рядом каналов 20 px. Свёрнутые рычаги идут по центру строки: сводка, затем вторичная кнопка «Редактировать», прижатая к правому краю панели. Делители строк Line-soft (`--color-border-soft`) внутрь габарита, у последней строки делителя нет.

Раскрытый рычаг не заменяет строку, а вырастает под ней: строка остаётся на месте, кнопка меняет надпись на «Свернуть» и разворачивает значок, а тело раскрытия идёт следующим блоком с полем слева, равным ширине подписи и промежутку (`--size-field` + `--space-3`), чтобы встать под колонку контролов, и 20 px (`--space-5`) снизу. Внутри тела шаг 12 px (`--space-3`). Делитель принадлежит паре «строка + тело», а не строке.

Тело раскрытия набирается из рядов полей со слайдерами по 200 px с зазором 12 px. В режиме двух окон тело встаёт на всю ширину под строкой, а поля — сеткой в три равные колонки (см. «Строки карточки в узкой колонке»), столбца из полей по одному не бывает. Переключателя «включить раздел» не бывает: раскрыл R&D или «Промо» — поля уже доступны, а признаком «ничего не задано» служат сами значения. Позиционирование раскрывается списком в две колонки по 304 px с зазором 4 px по вертикали и 16 px по горизонтали.

Свёрнутая строка не повторяет содержимое, а выносит одно число, ради которого раздел вообще открывают: R&D показывает себестоимость единицы и стоимость модификации (две сводки шириной поля), «Промо» — оценку вычета из выручки, а без акции так и пишет «Нет акции». Число набирается 600 14 px табличными цифрами в Ink (`--color-text-primary`), поясняющая подпись перед ним — Body в Slate (`--color-text-tertiary`). Всё остальное остаётся внутри раскрытия.

Целевой экран — ноутбук 13–14″, окно 1280–1440 (1280×832, 1366×768; Н27); каждая сдача проверяется на 1280 и 1366 и в режиме двух окон 50/50. Ниже 1440 px карточка переходит в одну колонку: текущее состояние над панелью решений. Мобильной вёрстки нет.

**Свёрнутая карточка** — узкая полоса: имя бренда слева, строка «Бюджет бренда» с кнопкой «Все свойства» справа; «Бюджета на прошлый год» — только в развёрнутой.

**Продвижение** — три поля «Премиум», «Семейный», «Эконом»; ошибка «<Сегмент> уже занят брендом <имя>» под полем у обоих брендов. Поля строк с полями закреплены по верху. **Каналы** — под каждым полем доли строка микса сегментов бренда, Caption Slate: «у сегмента: 56%» или «прем. 26% · сем. 12%».

**Лоток и «P&L на одну штуку» (Н1).** Правая часть развёрнутой карточки — лоток: скругление `--radius-lg`, подложка `--color-base-neutral-100`, обводка 1 px `--color-border-veil`; на нём белая панель, под ней полоса «P&L на одну штуку» — девять сводок 3×3 от розничной цены до валовой маржи, поле `--space-6` 24 px, без линии сверху. Полоса прилипает к низу экрана над полосой управления, пока карточка на экране; прилипла — низ панели растворяется в белый на `--space-5` и уходит под полосу со скруглёнными углами, без тени у края; вырезы нижних углов самой полосы закрашены подложкой карточки `--color-bg-card`, чтобы за ними не было видно края лотка. Пересчёт — значения Slate, убыток — `--color-text-danger`, нет цены — «—».

**Режим двух окон.** Когда панель обзора сжимает страницу сеткой (см. § Панель обзора), карточка реагирует не на ширину окна, а на ширину самой этой левой колонки: контейнерный запрос на `.cards` (`container-type: inline-size`), а не медиазапрос — при открытой панели окно остаётся широким, а места у карточки уже нет. Порог 1250 px не подобран на глаз, а собран из чисел самой карточки: поле карточки 8 px с двух сторон (16) + виджет продукта 350 px + поле панели решений 0 24 px с двух сторон (48) + подпись строки свойства 200 px + её зазор 12 px + самая широкая строка карточки, «Каналы» (три поля по 200 px с зазором 12 px = 624) = 1250 px — именно столько нужно двухколоночной раскладке, чтобы строка «Каналы» ещё помещалась без переноса. Ниже порога: виджет продукта исчезает целиком (строка «Бюджет бренда» остаётся; полоса P&L ставит подпись над сеткой), имя бренда переезжает в новую строку наверх карточки (та же строка «имя + стрелка сворачивания», что и в виджете, просто снаружи). **Строки карточки в узкой колонке.** Каждая строка свойства — сетка в три равные колонки: подпись строки и её кнопка («Все свойства», «Свернуть», «Редактировать») первой строкой, поля и сводки в ряд под ними («План · Расходы бренда · Осталось», «Премиум · Семейный · Эконом», две сводки R&D, чипы позиционирования). Раскрытое тело встаёт на всю ширину под строкой, поля каналов, R&D и промо — тем же шагом в три колонки. Это отменяет для узкой колонки сетку «200 px подпись | контрол»: там подпись сверху появлялась переносом по месту и разъезжалась между рядами, здесь она одинакова у всех строк. Принудительного сворачивания карточки при этом нет — сворачивается она только вручную, как и всегда. Свёрнутая карточка получает ту же верхнюю строку с именем по той же причине: виджет продукта есть и у неё, и без верхней копии имени она осталась бы совсем без него. Сама левая колонка при открытой панели не уже `--size-wrap-min` (650 px) — дальше кромка не тянется (§ Панель обзора). На этой ширине ряды, которым не хватает места, не вылезают за карточку: строки карточки раскладываются сеткой в три колонки (выше в этом абзаце), а суммы полосы бюджета переносятся парами (§ Полоса управления).

## Elevation & Depth

Глубина строится контрастом поверхностей: бумага страницы, тёплый серый карточки, белая панель решений и белые контролы поверх серого. Границы 1 px в Line (`--color-border-default`) и Line-soft (`--color-border-soft`) держат структуру там, где контраста поверхностей мало. Третьего оттенка границы — прежнего Divider, #e5e5e5 — в системе больше нет: он стоял между Line и Line-soft и на экране от них не отличался.

Теней ровно две. Панель решений внутри карточки получает мягкую тень `--shadow-surface` в три слоя: она отделяет редактируемое от справочного, а не рисует объём. Всплывающие слои (список проверки над полосой, поповеры) получают `--shadow-overlay`. Карточки, контролы, полоса, чипы и кнопки теней не получают.

### Ошибки и предупреждения

Девять правил. Первые пять решают, где сообщение появится, остальные — как оно выглядит и что говорит.

**1. Место определяет уровень, а уровень читается из пути ошибки, а не из её кода.**

| Путь | Уровень | Куда встаёт |
|---|---|---|
| `/brands/<бренд>/<блок>/<поле>` | поле | под этим полем |
| `/brands/<бренд>/<блок>` | блок | под заголовком блока |
| `/brands` с перечисленными брендами | карточка | под шапкой этих карточек |
| всё остальное: `/brands` без брендов, `/budget`, `/`, пустой | год или сессия | только счётчик и список в полосе проверки |

**2. Ошибка года не спускается в карточки.** Превышенный бюджет, завершённая симуляция, лимит на число меняемых продуктов без списка брендов — всё это про ход целиком. Такое сообщение живёт в полосе проверки в одном экземпляре и не повторяется над каждой карточкой.

**3. Одна ошибка — одно место.** Дублирования нет ни между уровнями, ни между карточками. Если ошибка называет бренды, она появляется только у них.

**4. Свёрнутый блок поднимает ошибку к себе.** Пока R&D или «Промо» закрыты, ошибка их поля встаёт под заголовком блока; при раскрытии переезжает под своё поле.

**5. Ширина по носителю.** Под заголовком блока — не шире заголовка, 200 px. Под полем — по ширине поля. Под шапкой карточки — по ширине панели.

**6. Только текст.** Ни рамки, ни подложки, ни обводки, ни перекраски подписи или соседнего контрола. Единственный носитель — сама строка.

**7. Цвет отвечает за тяжесть и больше ни за что.** Красный Error (`--color-text-danger`) блокирует запуск, латунный Brass (`--color-text-warning`) не блокирует.

**8. Текст называет проблему, а не решение.** Что именно не так — да. Что нажать, куда пойти, какую кнопку искать — нет. «Бюджет каналов распределён больше чем на 100 %», а не «нажмите „уравнять“». Последствия и советы живут в подсказке «?» рядом с заголовком блока, где на них есть место.

**9. Одно предложение, до двух строк в колонке 200 px.** Цифры допустимы, когда без них проблема не читается: «Годовой бюджет превышен на 610,17M ₽: 1760,17M ₽ из 1150,00M ₽».

Правка в поле снимает относящееся к нему сообщение сразу, не дожидаясь ответа валидатора.

### Named Rules
**Тон — свойство текста, а не компонент.** Компонента «сообщение» в системе нет: есть текст, который может нести тон. Четыре тона — `.tone-danger`, `.tone-warning`, `.tone-success`, `.tone-muted` — и ни один из них не несёт ни кегля, ни отступа: кегль берётся из шкалы набора, отступ принадлежит тому, куда текст вставлен. До пересборки атомов один и тот же тон записывался семью способами — `.issue.error`, `.field-msg`, `.confirm-err`, `.issue-msg`, `.neg`, `.delta.down`, `.tour-status[data-ok="0"]`, — и добавить восьмой было проще, чем найти нужный из семи.

**The Bare Message Rule.** Ошибка живёт текстом рядом со своим уровнем: блок — под заголовком, поле — под полем. Рамка, подложка и перекраска соседних элементов запрещены. Баннер устаревшего состояния был единственным местом, где сообщение рисовалось коробкой; пересборка атомов коробку сняла.

**The Two Shadows Rule.** Тень принадлежит панели решений и всплывающему слою, больше ничему. Если элемент не читается, меняем поверхность или добавляем линию, а не тень.

## Shapes

Шесть радиусов, шкала `--radius-xs` → `--radius-pill`. Контролы (поля со слайдером, селекты, чипы позиционирования) и панель справочного слоя скруглены на 8 px (`--radius-xs`). Плитка показателя — на 16 px (`--radius-sm`): промежуточная ступень между контролом и панелью решений, своя у справочного слоя. Виджет продукта и блок сегмента в карточке гипотезы долей на 20 px (`--radius-md`). Панель решений внутри карточки на 32 px (`--radius-lg`). Карточка бренда на 40 px (`--radius-xl`) — крупное скругление и есть подпись системы. Кнопки, счётчики и вкладки — полные пилюли (`--radius-pill`). Слайдер это линия 2 px на нижней границе поля с круглой меткой 6 px; отдельной дорожки вне поля не существует.

### Иконки

Глифы — Phosphor Icons (MIT), взяты поштучно в `kit/icons.js`. Библиотека целиком в проект не тянется: в модуле ровно те пять, что где-то вызываются. Инлайнового SVG в разметке и скриптах нет — это проверяет гейт (проверка 9). Два исключения, и оба не иконки: графика радара в `radar.js` и фавикон.

**Шкала — 12 / 16 / 20 / 24 px.** До неё размеров было пять (8, 12, 14, 16, 32) и ни одного правила, почему где какой. Размер вне шкалы модуль не отдаёт — бросает ошибку.

**Вес: 12 px — Fill, остальное — Bold.** У Phosphor любой вес — это залитый контур на сетке 256, а не `stroke-width`; у Bold толщина 9,38 % от размера, то есть на 12 px — 1,13 px, и штрих начинает размываться. Fill штриха не имеет вовсе — это силуэт, и на 12 px он читается. Исключений из правила нет: на 12 px живёт только шеврон, Fill; крестик стоит на 16 рядом с разворотом в такой же круглой кнопке 32×32, и меньший глиф там был виден.

| Глиф | Размер | Вес | Где |
|---|---|---|---|
| `caret-down` | 12 | Fill | раскрытие рычага, сворачивание карточки (разворот на 180° даёт CSS, второй глиф не нужен) |
| `x` | 16 | Bold | закрыть панель обзора |
| `square-split-horizontal` | 16 | Bold | сложить панель пополам |
| `arrows-out-line-horizontal` | 16 | Bold | развернуть панель во весь экран |
| `calendar-blank` | 24 | Bold | пустое состояние списка |

Знак подсказки иконкой больше не является: иконка `question` 12 px Fill на экране не читалась, и знак стал залитым кругом с текстовым «?» внутри (§ Do's and Don'ts). До иконки форм было четыре — контурный кружок 14 px с «?» текстом и три залитых (14, 12 и 10 px), причём заливка включалась то классом `.solid`, то предком; сейчас форма одна, а размер задаёт параметр, а не предок.

Слайдер обязан читаться как живой. При наведении курсор становится указателем, линия подрастает до 3 px, метка увеличивается в полтора раза, до 9 px. То же состояние даёт клавиатурный фокус, и у фокуса вокруг ручки ещё кольцо 2 px Ember с отступом 2 px. Отключённый: заливка и ручка в Slate (`--color-bg-tertiary`), курсор запрещён. Габарит поля при этом не меняется: прирост линии компенсируется отрицательным отступом.

У шкалы канала есть вторая точка — справочная отметка доли этого канала у целевого сегмента. Она крупнее ручки, 10 px против 6, и другого тона: Slate (`--color-bg-tertiary`) вместо Ember (`--color-bg-accent`). Разница размера и цвета говорит, что это ориентир, а не контрол: отметку не перетаскивают. Когда ручка попадает в отметку, серый круг обрамляет оранжевый — это и есть сигнал попадания в структуру сегмента.

## Ant Design: что мы переопределяем

Сборка идёт на Ant Design v5. Ниже — вся кастомизация: сначала тема (seed и alias), потом компонентные токены, потом то, что мы у Ant не берём. Наши имена цветов слева, имена Ant справа: это одна и та же величина, а не два разных значения.

### Seed

| Токен Ant | Значение | Наш токен |
|---|---|---|
| `colorPrimary` | `#fc5000` | Ember — `--color-bg-accent` |
| `colorError` | `#ff003a` | Error — `--color-status-danger` |
| `colorWarning` | `#816729` | Brass — `--color-text-warning` |
| `colorSuccess` | `#2a7d4f` | Ok — `--color-text-success` |
| `colorInfo` | `#fc5000` | Ember — `--color-bg-accent`; синего в системе нет ни в каком виде |
| `colorTextBase` | `#202020` | Ink — `--color-text-primary` |
| `colorBgBase` | `#ffffff` | Paper — `--color-bg-surface` |
| `fontFamily` | `Rubik, "SF Pro Text", system-ui, sans-serif` | — |
| `fontSize` | `14` | Body — база шкалы |
| `borderRadius` | `8` | `--radius-xs` |
| `controlHeight` | `40` | высота поля и селекта |
| `lineWidth` | `1` | все границы |
| `wireframe` | `false` | — |

### Alias

| Токен Ant | Значение | Наш токен |
|---|---|---|
| `colorText` | `#202020` | Ink — `--color-text-primary` |
| `colorTextSecondary` | `#4d4d4d` | Steel — `--color-text-secondary` |
| `colorTextTertiary` | `#828282` | Slate — `--color-text-tertiary` |
| `colorTextQuaternary` | `#828282` | Slate — `--color-text-tertiary` |
| `colorBgLayout` | `#ffffff` | Paper — `--color-bg-page` |
| `colorBgContainer` | `#ffffff` | Paper — `--color-bg-surface` |
| `colorBgElevated` | `#ffffff` | Paper — `--color-bg-surface` |
| `colorBgSpotlight` | `#202020` | Ink — `--color-bg-tooltip` |
| `colorFillSecondary` | `#efefef` | Ash — `--color-bg-card` |
| `colorBorder` | `#d6d6d6` | Control-border — `--color-border-control` |
| `colorBorderSecondary` | `#e6e6e6` | Line-soft — `--color-border-soft` |
| `colorSplit` | `#e6e6e6` | Line-soft — `--color-border-soft`; прежнего Divider #e5e5e5 в системе нет |
| `colorPrimaryBg` | `#fff3ed` | chip-bg — `--color-bg-chip-claim` |
| `colorPrimaryText` | `#eb4c02` | chip-ink — `--color-text-chip-claim` |
| `colorErrorBg` | `#fe9593` | Error-bg — `--color-bg-danger` |
| `colorWarningBg` | `#f5f28e` | Sulfur — `--color-bg-warning` |
| `borderRadiusXS` / `borderRadiusSM` | `8` | `--radius-xs` — мельче 8 у нас ничего нет |
| `borderRadiusLG` | `20` | `--radius-md` |
| `controlHeightSM` | `30` | вторичная кнопка |
| `controlHeightLG` | `40` | равен базовому: контролов выше 40 нет |
| `fontSizeSM` | `12` | Caption |
| `fontSizeLG` | `17` | Row-label и Value |
| `fontSizeXL` | `20` | Head-panel |
| `lineHeight` | `1.45` | Body |
| `lineHeightSM` | `1.3` | Caption |
| `paddingXXS` / `paddingXS` / `paddingSM` / `padding` / `paddingLG` | `4` / `8` / `12` / `16` / `24` | `--space-1…4` и `--space-6` один в один |
| `boxShadow` | три слоя `--shadow-surface` | панель решений и боковая панель |
| `boxShadowSecondary` | `--shadow-overlay` | всплывающие слои |
| `motionDurationMid` | `0.18s` | боковая панель, состояния слайдера |

Радиусы 16 (`--radius-sm`), 32 (`--radius-lg`), 40 (`--radius-xl`) и 999 (`--radius-pill`) в шкалу Ant не ложатся — они живут компонентными токенами.

### Компонентные токены

| Компонент | Переопределяем |
|---|---|
| `Button` | `borderRadius` 999 у всех размеров; `defaultBorderColor` и `defaultColor` Ink (`--color-border-strong` / `--color-text-primary`), а не `colorBorder`; `primaryColor` Ink-deep (`--color-text-on-accent`) — текст на оранжевом тёмный, не белый; `contentFontSize` 14 и 12 — 13 px в шкале нет |
| `InputNumber` | `controlHeight` 40, `borderRadius` 8, `paddingInline` 12, `activeBorderColor` Ember (`--color-action`), `activeShadow` none — фокус рамкой, без кольца; `hoverBg` Ash (`--color-bg-card`); значение 14/600 |
| `Select` | `controlHeight` 40, `borderRadius` 8, `paddingInline` 10, значение 14/400 — 13 px в шкале нет |
| `Slider` | `railSize` 2, `handleSize` 6, `railSizeHover` 3, `handleSizeHover` 9; `trackBg` и `handleColor` Ember (`--color-bg-accent`), `railBg` Track (`--color-bg-slider-track`), `handleLineWidth` 0. Живёт на нижней границе поля, отдельного контрола нет. Отметки `marks` Ant не используем: справочная точка сегмента рисуется своим элементом 10 px в Slate (`--color-bg-tertiary`) |
| `Checkbox` | `borderRadiusSM` 0 — квадрат; размер 13; `colorPrimary` Ember (`--color-bg-accent`) |
| `Tag` | роль чипа позиционирования: `defaultBg` `--color-bg-chip-claim`, `defaultColor` `--color-text-chip-claim`, `borderRadius` 8, высота 32, без рамки |
| `Tooltip` | `colorBgSpotlight` Ink (`--color-bg-tooltip`), `borderRadius` 8 (`--radius-xs`) — 6 в шкале нет |
| `Badge` | счётчики проверки: пилюля, рамка Control-border (`--color-border-control`), точка 6 px |

### Чего у Ant не берём

- **`Alert`** — ошибки и предупреждения рисуются текстом без коробки, подложки и иконки (см. правила ошибок).
- **Кольцо фокуса по умолчанию** — вместо голубого свечения граница поля уходит в Ember (`--color-action`), у кнопок и табов — кольцо 2 px Ember.
- **Синюю палитру целиком**, включая ссылки, `colorInfo` и состояния наведения.
- **`Form.Item` с сообщением под полем в своей вёрстке** — разметку сообщения задаём сами, чтобы соблюсти ширину по носителю.
- **Тени по умолчанию** у карточек и контролов: тень есть только у панели решений и всплывающего слоя.

Соответствие разметки: строка свойства — `Form.Item` с `labelCol` 200 px; поле со слайдером — свой компонент поверх `InputNumber` и `Slider`; свёрнутые рычаги — `Collapse` без рамок; полоса внизу — `Affix`. «Показатели» и «Рынок» — **не** `Drawer`: панель обзора не оверлей, а колонка CSS Grid (`grid-template-columns: 1fr var(--peek-w)`, § Layout → Панель обзора), страница сжимается, а не перекрывается; готового компонента Ant под это нет, вся разметка — свой код.

## Components

### Buttons

Кнопок три — обычная, вторичная, текстовая — и два размера. До пересборки атомов форм было семь, и четыре из них спорили за роль второй.

**`size` — отдельная ось, общая у `primary` и `secondary`:** `default` 40 px и `small` 32 px (класс `.small`, текст 12). Числа взяты из системы, а не назначены: 40 — высота поля и селекта, 32 — высота иконочной кнопки, таба и чипа. Прежние 38 у главной и 30 у «Редактировать» не лежали ни на чём. У `text` размера нет — это текст, его высота от строки.

`small` стоит там, где кнопка живёт внутри плотной строки: действия в админских таблицах, «Выйти» в верхней плашке, раскрытие рычага.

- **Shape:** пилюля (`--radius-pill`) у обычной и вторичной; текстовая формы не имеет вовсе.
- **`primary`** (`button.primary`): Ember (`--color-bg-accent`), текст Paper (`--color-text-on-accent`), 14/600, **без рамки** — вокруг оранжевой заливки она не несёт информации. Одна на экран: «Запустить год N». Под курсором заливка заметно темнеет — Ember-burnt (`--color-bg-accent-hover`); общее наведение подложкой Ash её не задевает: своя заливка у класса. Заблокированная не гасится прозрачностью: `.45` на оранжевом даёт грязный розовый, поэтому заливка уходит в Ash (`--color-bg-card`), текст в Slate (`--color-text-tertiary`).
- **`secondary`** (голый `button`): поверхность Panel-2 (`--color-bg-data`), рамка 1 px Ink (`--color-border-strong`), текст Ink 14/500. Всё, что не главное действие: «Отмена», «Выйти», «Редактировать», действия в админских таблицах, «Обновить страницу» в баннере устаревшего состояния.
- **`text`** (`.word-btn`): подчёркнутое слово с отступом 2 px, Caption в Slate (`--color-text-tertiary`), ни рамки, ни фона, ни высоты. **`text` · `accent`** (`.word-btn.accent`) — то же слово в Ember (`--color-action`); при наведении и фокусе, как и обычная, Ink-deep. Разовые действия поля: «уравнять» у каналов, «сбросить» у R&D и «Промо».
- **Иконка в начале.** У любой из трёх может быть иконка, слот один и тот же — глиф из `icons.js` перед надписью, зазор `--space-2`.
- **`busy`** (`.busy`): спиннер 12 px встаёт **на место** иконки, а не добавляется к ней; собственная иконка кнопки на это время прячется. У кнопки без иконки слот появляется на время загрузки, и её ширина растёт — это честнее, чем подменять надпись.
- **`hover` / `focus` / `disabled`:** при наведении вторичная темнеет подложкой до Ash (`--color-bg-card`), как поле ввода; рамка, текст и шеврон «Редактировать» не меняются. Оранжевого в наведении нет ни у одной кнопки. Правило записано с нулевой специфичностью (`button:where(:hover…):where(:not(:disabled))`): любое правило с классом (`.primary`, `.tab`, `.word-btn`, `.chip`, иконочная кнопка) держит свою подложку; фокус — кольцо 2 px Ember с отступом 2 px, общее правило для всех кнопок; disabled — непрозрачность 45 % и курсор запрещён, кроме обычной, у которой своё правило выше.
- **btn-edit:** не форма, а роль: та же `secondary` в размере `small`, прижатая вправо и с шевроном. «Редактировать» / «Свернуть» у раскрытого рычага, «Все свойства» у свёрнутой карточки. Своей геометрии не держит.
- **icon-btn:** круглая иконочная кнопка 32 × 32, рамка 1 px Ink (`--color-border-strong`), без фона и подписи, глиф 16 × 16; обязателен `aria-label`. Применения: шеврон сворачивания карточки, «половина экрана» и крестик в шапке панели обзора, крестик тоста (у него рамки нет — тост сам по себе всплывающий слой).
- **Кнопка-строка** (`button.issue`, `.cb-pop .pop-item`): отдельный атом, канон по нему не принят. Текст в ней переносится, поэтому фиксированной высоты и `nowrap` базовой кнопки у неё нет.

### Chips

Один компонент, два типа, и у обоих есть тон. До пересборки атомов форм было шесть (`.user-chip`, `.badge`, `.year-pill`, `.cb-badge`, `.claim-chip` и круг места), высот три и два веса набора; `.user-chip` при этом был объявлен дважды, и нижнее объявление снимало у него рамку с фоном — то есть он уже был `borderless`, но узнать это можно было только сложив два правила из разных концов файла.

- **Геометрия:** пилюля высотой `--size-control-xs` (22 px), поля 0 8 px, текст 600 12/1 табличными цифрами, не переносится.
- **`type: default`** — рамка Line (`--color-border-default`), без заливки. Номер хода в шапке, годы в переключателе.
- **`type: borderless`** — то же без рамки. Чип команды в шапке, число в счётчике проверки, изменение в углу плитки итогов. Цвета — компонентные токены `--color-bg-chip*` / `--color-text-chip*` (§ Тёмная тема): без тона заливки нет, тон красит заливку — `tone-danger` → Error-bg (`--color-bg-danger`), `tone-warning` → Sulfur, `tone-success` → Ok-bg с текстом Ok. Текст на Error-bg и Sulfur — Ink (`--color-text-primary`): Error на Error-bg даёт контраст 1,87. На тёмном (`.theme-dark`) — вуаль и высветленные статусы.
- **Нажимаемый** (`button.chip`) — курсор-указатель, под курсором бледнеет целиком (`opacity: .7`): тон несёт смысл, наведение его только приглушает. Метка (`span.chip`) наведения не имеет. Опцией это не является: в ките у чипа `pressable` нет.
- **Чипа позиционирования больше нет.** `.claim-chip` ушёл вместе с утверждениями: позиционирование теперь лестница (§ Лестница позиционирования), и сводка строки — формулировка текстом, а не чип. Токены `--color-bg-chip-claim` / `--color-text-chip-claim` объявлены, но компонентом не используются.
- **Круг места** (`.rank-badge`, 22 × 22) — **не чип**: квадратный габарит и своя ахроматическая лестница `--color-bg-rank-1…3`.

### Таб

Переключатель между равноправными разделами. Это **две разные вещи**, и в коде они теперь разделены:

- **Таб (`.tab`) — атом.** Пилюля `--size-control-sm` (32 px), поля 0 12 px, текст 500 12/1, без рамки и фона. Цвета — компонентные токены (§ Тёмная тема): неактивный — `--color-text-tab` (Steel); под курсором — `--color-text-tab-hover` (Ink-deep); активный (`.active` или `[aria-selected="true"]`) — заливка `--color-bg-tab-active` (Ash), текст `--color-text-tab-active` (Ink), вес 600. Фокус — кольцо 2 px Ember с отступом 2 px. Таб никогда не оранжевый: это навигация, а не действие (The One Ember Rule).
- **Панель табов (`.tabs`) — молекула.** Капсула: раскладка, поле 8 10 px, подложка `--color-bg-veil`, рамка `--color-border-veil`, радиус `--radius-md`. Про устройство таба внутри не знает ничего. Прилипшая панель темнеет, а активный таб становится белым, чтобы с ней не слиться.
- **Переключатель годов** — на вкладках «Показатели» и «Рынок» живёт в полосе экрана (`.ref-years`): та же капсула, тёмный вид ей даёт `.theme-dark` на полосе — вуаль Veil-dark, рамка Line-dark, неактивный таб Paper-64, активный Paper (§ Тёмная тема). Контекстных правил таба у полосы нет. Прежний вид без капсулы, `.tabs.year-tabs`, в продукте больше не вызывается; из кита он тоже снят.
- **Табы сегментов** (`.ref-seg-tabs`) — обычная капсула рядом с заголовком панели «Сегменты»: в один момент открыт один сегмент, выбор переживает смену года.

До пересборки атомов атом и молекула были перемешаны: таб адресовался только как `.tabs button`, то есть не мог существовать вне панели, а реализаций было три, причём `.tabs` объявлялся дважды.

Реализация одна на все применения. До пересборки атомов их было три, и `.tabs` объявлялся дважды: верхний блок перебивался нижним по фону и рамке, но из него продолжали жить `display`, `flex-wrap` и вес активного — то есть мёртвым он не был. Переключатель годов теперь несёт `.tabs` в разметке и отличается только тем, что не капсула (`.tabs.year-tabs` — селектор составной специально: при одиночном классе капсула возвращалась по порядку в файле).

Применение: три вкладки «Решения / Показатели / Рынок» в верхней плашке, переключатель «Показатели / Рынок» в шапке панели обзора (тот же раздел, второй равноценный вход в него), вкладки администратора, переключатель «Ваши годы / Все игры» внутри вкладки «Показатели» (второй экземпляр компонента внутри тела панели, а не в её шапке). Соответствие Ant Design — `Segmented`, не `Tabs`: нужна капсула, а не подчёркивание.

### Cards / Containers
- **Corner Style:** карточка бренда 6 px только слева сверху; виджет продукта 20 px.
- **Background:** карточка Ash (`--color-bg-card`), виджет продукта и правая колонка на Ash без своей подложки, шапка правой колонки отделена линией Line (`--color-border-default`).
- **Shadow Strategy:** нет, см. Elevation & Depth.
- **Border:** карточка без рамки; строки разделены Line-soft (`--color-border-soft`).
- **Internal Padding:** виджет 16 px 18 px с отступом 12 px от края карточки; строки 9 px 18 px.

### Inputs / Fields
- **Style:** одна форма на все три прежние (простое поле формы, поле со слайдером, селект сегмента): белая подложка, рамка 1 px Control-border (`--color-border-control`), радиус 8 px (`--radius-xs`), высота `--size-control` (40 px), значение Body 400 14 табличными цифрами слева, единица Body в Slate (`--color-text-tertiary`) вплотную к нему, сумма Caption справа. Нижняя граница несёт слайдер: дорожка `--size-slider-rail` (2 px) с заливкой Ember (`--color-bg-accent`), ручка `--size-slider-handle` (6 px) Ember, справочная отметка сегмента `--size-slider-mark` (10 px) в Slate (`--color-bg-tertiary`); отступ дорожки от краёв 12 px (`--space-3`). Дорожка — отдельный атом «Слайдер» (§ Shapes): при наведении и фокусе на полосе захвата она толстеет до `--size-slider-rail-hover` (3 px) вниз, на рамку, ручка растёт до `--size-slider-handle-hover` (9 px), у фокуса вокруг ручки кольцо Ember. Слот дорожки необязателен: единица, пересчёт и состояния поля с ней и без неё одни и те же.
- **Hover:** подложка темнеет до Ash (`--color-bg-card`) — только `background-color`: у селекта стрелка нарисована фоновой картинкой. Пока курсор на полосе захвата, наведение поля не срабатывает: это наведение слайдера.
- **Focus:** рамка Ember (`--color-action`), дорожка остаётся оранжевой. Одно правило на все четыре селектора (`label.field input`, `label.field select`, `.sfield`, `.seg-select`).
- **Нажатие:** курсор в поле ставит вся рамка, а не только набранные цифры: само поле ввода шириной ровно в символы, и нажатие в любом другом месте рамки переводит фокус в него, каретка — к ближнему краю числа. Над рамкой текстовый курсор; полоса захвата слайдера по нижней границе нажатие обрабатывает сама.
- **Modified:** точка Ember 4 × 4 px справа от подписи поля; рамка не меняется. Показывается у каждого поля, изменённого в этом ходу.
- **Error:** только текст Caption в Error (`--color-text-danger`) под полем, шириной не больше поля; рамка и дорожка не меняются (Bare Message Rule). Ошибка — состояние поля, а не строки свойства.
- **Disabled:** одно правило на все формы поля, с дорожкой и без: рамка Line (`--color-border-default`), текст Slate (`--color-text-tertiary`), курсор запрещён; дорожка слайдера — в Slate.
- **Select:** та же геометрия без слайдера, значение Body-strong, шеврон Slate (`--color-text-tertiary`).

### Navigation
- **Style:** верхняя плашка 52 px на Paper (`--color-bg-surface`) с линией Line (`--color-border-default`) снизу: логотип Wordmark, чип хода, вкладки-пилюли, справа чип команды и призрачная кнопка выхода. Кнопки «Изменить» у чипа команды нет: название задаётся только на первой карточке брифинга. Мобильного варианта нет.
- **Три вкладки**: «Решения», «Показатели», «Рынок», компонент «Таб». «Решения» рендерит экран решений на месте; «Показатели» и «Рынок» ничего не рендерят в `main` сами — клик по ним открывает панель обзора на нужном разделе (§ Панель обзора). Кнопки «Обзор» больше нет. Подсветка вкладок синхронизирована с переключателем внутри самой панели в обе стороны: какой бы из двух путей ни выбрал раздел, активной становится одна и та же пара — вкладка в плашке и таб в шапке панели.

### Название команды
Отдельного диалога нет: поле «Название команды» стоит на первой карточке брифинга онбординга под текстом — `label.field.onb-team` шириной `--size-onb-team` (360 px), поле высотой `--size-control`, подпись `.onb-team-note` 12 px Slate «Видно в шапке и в таблице результатов игр.», ошибка сервера — `.issue` под полем. Сохраняется по «Далее» карточки через `PATCH /api/v1/me` (пустое не уходит — можно начать без названия), чип в шапке перерисовывается сразу. Переименования в интерфейсе игрока нет; админ переименовывает команду своей формой.

### Онбординг пробного года
Пробный год (год 0) проходится по восьми этапам с заданиями. Утверждено в компаньоне. Модули: плашка, модалки, брифинг, финал и пропуск — `onboarding-ui.js`, блокировка — `onboarding-lock.js`, «Досье» — `dossier.js`; стили — раздел «Онбординг» в конце `styles.css`. Онбординг заменил приветствие пробного года: окна «Добро пожаловать в BrandSim» и старого тура больше нет.

**Слои.** Плашка — z 60: выше панели обзора (50) и полосы управления, ниже окон. Выноска у «Досье» — z 65. Тост — z 66: над плашкой и выноской, под окнами. Окна онбординга (`#onbModal`) — z 69, под обычными диалогами (`#modal`, z 70): подтверждение пропуска и запуска встаёт поверх брифинга и модалки этапа, а модалка этапа ждёт, пока обычный диалог закроется.

**Размеры.** Свои токены ширины, в `:root` рядом с остальными `--size-*`:

| Токен | Значение | Что |
|---|---|---|
| `--size-onb-tray` | 380 px | Плашка заданий |
| `--size-onb-dialog` | 800 px | Модалка этапа: снимок широкой раскладки |
| `--size-onb-team` | 360 px | Поле «Название команды» в брифинге |
| `--size-onb-brief-rail` | 420 px | Левая колонка брифинга (оглавление) |
| `--size-onb-brief-card` | 820 px | Мера строки карточки брифинга |

Остальное — общие токены: кружок `--size-control-xs`, отступы `--space-*`, радиусы `--radius-*`. `--onb-tray-h` — не токен, а высота раскрытой плашки, её ставит `onboarding-ui.js`: на неё `.wrap` держит запас снизу, иначе низ страницы (гипотезы этапа 6) остаётся под плашкой.

- **Плашка заданий** (`#onbTray`): тёмная панель `--color-bg-tooltip`, текст inverse, ширина `--size-onb-tray` (380 px), радиус `--radius-md`, тень `--shadow-overlay`; справа `--space-6`, снизу над полосой управления (`--cb-h` + `--space-4`), выше панели обзора. Сверху полоска этапов (8 отрезков высотой `--space-1`), под ней «Задания · k из n» 600 17; подписи этапа нет; справа от счёта — кнопка свернуть 32 px с рамкой `--color-border-inverse`. Задания — кружок `--size-control-xs`: текущий белый на тёмном, выполненный — галочка на `--color-text-success`, ждущий — контур `--color-border-inverse`; формулировка 500 14, «Ориентиры» 12 inverse-secondary. Подсказка при ошибке — блок `--color-bg-warning-soft`, заголовок «Пока не засчитано» тоном warning, только у текущего задания. Под текущим заданием — Primary `small` «Далее»: пока задание не выполнено — `aria-disabled`, заливка `--color-bg-inverse-soft`, текст inverse-tertiary; нажатие тогда показывает над кнопкой светлую подсказку «Сначала выполните задание» (`--color-bg-surface`, 500 12, `--radius-xs`, тень overlay). Свёрнутая — тёмный чип-кнопка «Задания · k из n» с кружком текущего задания.
- **Модалка этапа** (`#onbModal`, механизм и скрим `.modal`): `.panel` шириной `--size-onb-dialog` (800 px, не шире окна), поля `--space-6`, промежутки `--space-4`. Сверху вниз: капитель «Этап N из 8», `h2` 600 24, снимок этапа во всю ширину (§ ниже; у этапов без снимка блока нет), абзац, список мест с метками (§ ниже), блок «Условия» над линией `--color-border-soft` — текст не шире 72ch; Primary «Далее» только закрывает окно (экран этапа игрок открывает сам; у этапа 1 «Рынок» открыт до окна).
- **Метки: кружок и точка.** Номер задания и места — кружок `.onb-n`: `--size-control-xs`, рамка 1 px, `--radius-pill`, 500 12. Номер места в модалке — заливка `--color-bg-accent`, белая цифра 600, такой же, как метка на снимке; на снимке отмечено каждое место (`shotMarks` этапа — все места, это проверяет тест). Точка `.onb-bullet` осталась для мест без снимка. В «Досье» → «Правила» места рисуются тем же построителем.
- **Снимок этапа** (`.onb-shot`): рамка `--color-border-default`, `--radius-xs`, подложка `--color-bg-card`, картинка по ширине колонки модалки. PNG снимается скриптом с живой страницы в широкой раскладке (окно 960 — панель обзора, 1300 — «Решения»), кадр 752 CSS px (файл 1504 px), у всех снимков одно соотношение сторон 4:3 — узкая группа добирает окружение под вуалью, высокая обрезается. На снимке — вуаль `--color-bg-veil` вне группы этапа и метки мест; рамки действия нет. Чтобы вошли все места, панели вне мест убираются, длинные обрезаются по высоте. Разметка или стили поменялись, а снимки не пересняты — `design-gate.sh` предупреждает.
- **Блокировка** — всё, кроме цели текущего задания, отключено нативным `disabled` (метка `data-onb-locked`). Своего вида у неё нет: отключённое выглядит по общим правилам Disabled (Buttons, Inputs / Fields) — кнопки 45 %, основная в Ash, поля в Slate. Вуали, затемнения и подсветки цели нет. Не-form узлы (рисочка панели обзора) получают `aria-disabled` и `tabindex="-1"`. Всегда живы: плашка, модалка этапа, «Досье», «?»-подсказки, табы сегментов в панели аналитики, прокрутка. Отключённое самим приложением остаётся отключённым и после снятия блокировки.
- **Брифинг** — лист на весь экран (Paper), интерфейса под ним не видно. Слева колонка `--size-onb-brief-rail` (420 px) с линией `--color-border-default`, поля 64 × 48 (два `--space-7` × два `--space-6`): капитель «Год 0 · пробный», заголовок «Брифинг» — Display 700 50 капителью, оглавление четырёх карточек с кружками (пройденная — галочка на `--color-text-success`, текущая — белый на `--color-bg-strong`, следующая — контур). Справа карточка не шире `--size-onb-brief-card` (820 px), по центру по высоте: `h2` 600 29, текст 17, у карточки портфеля — плитки брендов игрока (Ash, `--radius-md`, поле `--space-5`: имя Display 29, цена 600 17 tnum, описание 14 Steel). Кнопки «Назад» и Primary «Далее».
- **Выноска у «Досье»** — разово после брифинга: тёмный тултип (`--color-bg-tooltip`, `--radius-xs`, поле `--space-3` × `--space-4`, 14) под кнопкой, стрелка над её серединой; закрывается любым кликом.
- **Окно** — вид подтверждения (`.panel` диалога, поле `--space-6`, промежутки `--space-4`): `h2`, абзац, места «Сотрётся / Останется / Год 1» кружками, Primary «Начать игру» и «Позже» строкой.
- **Окно пропуска** — `confirmModal`: «Пропустить обучение?», абзац, пометка «Вернуться к обучению будет нельзя.», Primary «Пропустить и начать год 1» и «Отмена». Открывается скрытым сочетанием ⌥⇧S.
- **«Досье»** — шторка справа во всю высоту, ширина `.modal.drawer .panel` (480 px), поля `--space-7` × `--space-6`, без скругления. Заголовок «Досье» — Display Title 35, справа иконочная кнопка закрытия. Вкладки — компонент «Таб» в капсуле (Paper, рамка `--color-border-default`, `--radius-pill`, поле `--space-1`) в одну строку. Разделы — карточки с рамкой `--color-border-default`, `--radius-xs`, поле `--space-4`: заголовок 600 17, текст 14 Steel, показатели сеткой в три колонки (подпись 12 Steel над значением 600 14 tnum); имя бренда — Display 24. Под списком — сноска 12 tertiary.
- **Кегли компаньона вне шкалы** сведены к ступеням: плашка и модалка — 11 → 12, 13 → 14, 15 → 17, 22 → 24; брифинг — 72 → 50, 28 → 29, 15 → 17, 30 → 29, 18 → 17, 13 → 14; «Досье» — 36 → 35, 16 → 17, 13 → 14.

### Подтверждение действия
`confirmModal` (ui.js) на общем `#modal`: `h2` с вопросом («Запустить год N?», «Начать игру?»), строки контекста (`.confirm-row` — «Потрачено · Остаток», при превышении «Потрачено · Перерасход»; `.confirm-msg` с тоном — конкретные предупреждения, например «Цена ниже себестоимости» с суммой потери), пометка о последствиях `.confirm-note` и две кнопки строкой — Primary с действием и «Отмена». Пометка — 600 14/1.35 тоном предупреждения (`.tone-warning`, Brass) с отступом `--space-4` над кнопками: «Действие необратимо.», в пробном году — «Пробный год сотрётся, когда начнёте игру.», у «Начать игру?» — что именно сотрётся. Только текст, без подложки (Bare Message Rule). Общего счётчика ошибок в подтверждении нет: он считал только ошибки модели и расходился с полосой проверки, где есть и предупреждения фронта; состояние проверки живёт в полосе.

### Строка свойства
Сетка «подпись `--size-field` (200 px) | контрол», промежуток `--space-3`, поле `--space-5` сверху и снизу. Подпись — Row-label (500 17). Каждая строка завёрнута в `.prop-group` вместе с телом раскрытия, если оно есть; разделитель Line-soft (`--color-border-soft`) рисует группа, у последней его нет.

- **Строка с полями** (Бюджет бренда, Цена, Продвижение, Каналы): подпись стоит по центру контрола, а не всего поля — опущена на строку подписи поля и шаг до контрола, высотой равна контролу. Высоту несёт сама надпись, поэтому ошибка строки под заголовком встаёт ниже и надпись не сдвигает. Строка 100,8 px. Кнопка рядом с полями («Настроить каналы», как и «Все свойства» у свёрнутой карточки) встаёт по центру контрола тем же расчётом: строка подписи поля, шаг `--space-1` до контрола и половина разницы высот `--size-control` и `--size-control-sm`. Когда строке не хватает места, соседи уступают его или переносятся, а не вылезают за карточку: у «Каналов» место кнопке уступает поле бюджета; сводки и кнопка «Все свойства» строки «Бюджет бренда» переносятся уже в широком режиме: свёрнутая строка шире 624 px и не влезает на ноутбуке. В режиме двух окон переносов нет — все строки карточки раскладываются сеткой в три колонки (см. «Строки карточки в узкой колонке»).
- **Строка со сводкой** (`.middle`: Позиционирование, R&D, Промо): подпись и сводка центрируются по высоте строки; ошибка строки под заголовком центрируется вместе с подписью, и надпись при ней поднимается. Сводка — Caption в Slate над суммой 600 14; у изменённого рычага рядом точка Ember и текстовая кнопка «сбросить». Справа вторичная `small` «Редактировать» с шевроном.
- **Тело раскрытия** (`.prop-body`): под колонкой контрола, шаг `--space-3`. У каналов тело отбито сверху линией Line-soft и полем `--space-4`.
- **Состояния.** Своего состояния у строки одно — ошибка, подписанная под заголовком строки. Ошибка под полем — состояние поля (§ Inputs / Fields).

### Лестница позиционирования
Утверждено в компаньоне. Строка свойства «Позиционирование ?» (`.middle`, `data-path="/brands/{id}/ladder"` — туда же встают ошибки лестницы), построитель — `buildLadderGroup` в `ladder.js`.

- **Свёрнуто:** сводка — формулировка бренда (шаг 3) в «ёлочках», 400 14/1.45 Ink, переносится, не обрезается (`.ladder-summary`); справа вторичная `small` «Изменить» с шевроном. Тройки нет — сводка «Не выбрано» в Slate и кнопка «Выбрать»; ошибка `positioning_required` встаёт под подписью строки.
- **Раскрыто:** кнопка «Свернуть». В теле заметка Caption: в год 1 — «Стартовое позиционирование бренда. В этом году его можно сменить бесплатно; со второго года — один раз за игру.», в годы 2–5 заметки нет (о цене смены предупреждает подтверждение). Под ней три шага сверху вниз, каждый отбит линией Line-soft (`--color-border-soft`), поле `--space-3` (`.ladder-step`). Заголовок шага `.bc-section-head` — «название — описание»: «Функциональная выгода — что продукт даёт», «Эмоциональная выгода — что потребитель чувствует», «Формулировка — как бренд говорит о себе»; номера шага и отдельной строки-подписи нет.
- **Какой шаг открыт:** открыт всегда один. По «Изменить»/«Выбрать» — шаг 1, и при полной тройке тоже. Явный выбор фразы (клик, Enter, Space) сворачивает шаг и открывает следующий, фокус — на его отмеченный пункт; после выбора в шаге 3 свёрнуты все три и видна вся тройка. Стрелки в радиогруппе меняют пункт, но шаг не переключают и фокус не теряют.
- **Шаг свёрнут:** слева заголовок и текст выбранного пункта 400 14/1.45 Ink (`.ladder-pick`; не выбран — «Не выбрано» в Slate), справа словесная кнопка «изменить» («выбрать», если пусто) — открывает этот шаг.
- **Шаг открыт:** заголовок, затем список фраз во всю ширину тела в две колонки (`.claims-grid` → `repeat(2, minmax(0, 1fr))`), пункт — `.claim` с радио Ember, 400 14/1.45. Фразы в порядке брифа бэка, без подсветки и фильтра по предыдущему шагу: связку игрок ищет сам. Подписи пунктов — только из `S.market.positioning.ladder`; `description_ru` пустой и не рисуется.
- **Годы 2–5, смена использована:** только заголовок строки с «?» и формулировка — без кнопки, тела и заметки.
- **Первая смена в годах 2–5:** до записи — `confirmModal` «Сменить позиционирование?», пометка «Менять его можно один раз за игру. Возврат к прежней тройке — тоже смена.», Primary «Сменить» и «Отмена» (отмена возвращает прежний выбор).
- **Узкая карточка** (`@container deck`, ≤ 1250 px): сводка встаёт во всю ширину под подписью (`grid-column: 1 / -1`), тело — на всю ширину, список фраз — в одну колонку.

### Виджет продукта
Белый блок с радиусом 20 px внутри карточки: имя бренда Display, сегмент Caption, заголовок Label, строки атрибутов «подпись | факт | восприятие» с Numeric для факта и Caption в Slate (`--color-text-tertiary`) для восприятия. Только свойства продукта, ничего больше.

В режиме двух окон (узкий контейнер `.cards`, порог и числа — § Layout) виджет исчезает целиком; имя бренда, которое иначе показывает виджет, переезжает в отдельную строку наверху карточки — та же строка «имя + стрелка сворачивания», что и внутри виджета, просто снаружи и видна только в этом режиме.

### Панель обзора

Колонка справа, в которой живут «Показатели» и «Рынок». Не оверлей: страница сжимается, левая колонка остаётся рабочей — это и есть режим двух окон.

**Вход.** Три вкладки в верхней плашке — «Решения», «Показатели», «Рынок» (отдельной кнопки «Обзор» больше нет). Клик по «Показателям» или «Рынку» открывает панель на этом разделе; клик по «Решениям» показывает экран решений, панель при этом не закрывается принудительно. Переключатель «Показатели / Рынок» внутри шапки самой панели (компонент «Таб») остаётся вторым, равноценным путём к тому же разделу — оба пути синхронизированы: какой бы из них ни переключил раздел, подсвечивается и вкладка в верхней плашке, и таб внутри панели.

- **Поверхность:** Paper (`--color-bg-surface`), слева граница 1 px Line (`--color-border-default`), скругления нет.
- **Шапка:** высота 68 px на Ash (`--color-bg-card`), слева группа табов «Показатели / Рынок» (компонент «Таб»), справа две иконочные кнопки 32×32 (компонент `icon-btn`, см. § Buttons): «половина экрана» (пиктограмма разделённого окна) и закрытие (крестик, `aria-label`, без подписи «Закрыть»). Отдельного заголовка нет — раздел называет активный таб.
- **Тело:** фон Ash (`--color-bg-card`), внутреннее поле 24 px (`--space-6`), собственная вертикальная прокрутка. Первая строка обеих вкладок — полоса экрана, она липнет к верху тела (§ Справочный слой).
- **Ширина:** тянется за левую кромку. Минимум 600 px; на минимуме внутри тела включается горизонтальная прокрутка. Максимум — вся ширина окна. **Открытие — всегда на весь экран** (ширина не запоминается между открытиями: открыв сразу на половину, игрок не узнаёт, что панель вообще можно растянуть). Ширина при перетаскивании кромки по-прежнему запоминается в `localStorage`, просто следующее открытие её больше не читает. Кнопка «половина экрана» в шапке — самый быстрый путь в режим двух окон, ставит ровно 50 % ширины окна. Левой колонке остаётся не меньше `--size-wrap-min` (650 px): тяга за кромку упирается в этот минимум, `peek.js` читает тот же токен; в окне уже 600 + 650 px побеждает минимум панели.
- **Кромка:** полоса захвата 8 px по левому краю, курсор `col-resize`, при наведении и перетаскивании плавно (`--motion-duration-mid`, 0.18 s) подсвечивается в Ember (`--color-bg-accent`). Посередине высоты, слева от кромки — рисочка `--size-grip-thickness` × `--size-grip-length` (4 × 32 px, скругление `--radius-pill`) в Slate (`--color-bg-tertiary`): видно, что за кромку тянут. Рисочка — часть зоны захвата, при наведении и перетаскивании за то же время гаснет, её роль берёт полоса.
- **Закрытие:** кнопкой-крестиком в шапке панели. Отдельной механики сворачивания нет.

### Таблица результатов всех игр
Второй раздел вкладки «Показатели» (первый — прежний вид по годам), переключение — компонентом «Таб» (см. выше). Ничего нового по токенам: таблица — тот же `.tablewrap` + `table.zebra`, что и у остальных таблиц вкладки; своя строка — тот же класс `.player`, которым отмечена своя компания в «Долях рынка по компаниям» и в Brand Equity Index, не отдельный стиль. Колонки: команда (текст, левый край), дата завершения и комплексный индекс (`.num`, табличные цифры, правый край, индекс — два знака после запятой). Своя строка определяется по `simulation_id` (равенство `S.game.id`), не по имени команды — имя в таблице записано на момент завершения игры и после переименования не обновляется.

При переключении на раздел своя строка не просто подсвечивается — панель обзора прокручивается так, чтобы строка была видна без ручной прокрутки (`scrollIntoView`, поведение внутри `.peek-body`). Своей строки может не быть (собственная игра ещё не завершена) — тогда прокрутка не происходит, это штатный случай, не ошибка.

Три состояния данных, все — переиспользование существующих примитивов: пусто (ни одна игра ещё не завершена) — `emptyState` из `ui.js`, как у пустой истории по годам; отказ сервера — голый текст в цвете `.neg` (Bare Message Rule, без рамки и подложки) и кнопка Ghost «Повторить», не всплывающий тост в одиночку — тост исчезает, а место таблицы не должно оставаться пустым; данные есть — таблица, отсортированная сервером по убыванию индекса.

### Справочный слой: вкладки «Показатели» и «Рынок»

Обе вкладки панели обзора собраны из одних деталей: разметку экранов строят `results.js` и `market.js`, детали лежат в `reference.js`, стили — в разделе «справочный слой» `styles.css`. Ни одна деталь не знает, чьи данные рисует. Состав утверждён макетом AB (сентябрь 2026) и заменил прежний набор `.panel` + `.stat` + `table.zebra` + `.delta`, где все разделы были одинаковыми белыми квадратами с таблицами и ритма чтения не было.

Ритм держат три вещи: чёрная полоса экрана и тёмный блок итогов в начале, дисплейные заголовки панелей и графика в данных — полосы, столбцы и гантели рядом с точными числами. Каждая полоса объясняет свой масштаб тултипом у заголовка колонки; число над ней остаётся главным.

**Экран** (`.ref`) — колонка панелей с шагом 16 px (`--space-4`) на Ash тела панели обзора и контейнер запросов ширины `ref`: уже 900 px плитки итогов и плитки фактов встают в две колонки.

**Полоса экрана** (`.ref-strip`, `screenStrip`) — первая строка обеих вкладок.
- Заливка Ink-deep (`--color-bg-strong`), радиус `--radius-lg`, поле 12 px и 24 px слева.
- Слева заголовок одной строкой — «Показатели • Год 3», «Рынок • Старт» — Display Title белым. Разделитель — круглая точка `--size-ref-dot` (8 px) на средней линии букв, отдельным элементом, а не символом: точка у основания строки читалась бы концом фразы.
- В конце — переключатель годов (компонент «Таб»). Полоса несёт `.theme-dark`, и панель табов берёт тёмные значения своих токенов сама: белая вуаль, рамка Line-dark, неактивные табы Paper-64, активный — Paper с текстом Ink (§ Тёмная тема).
- Липнет к верху панели обзора, как только её начинают прокручивать: год меняется из любого места страницы, позиция прокрутки и выбранный сегмент при этом сохраняются. `top` — минус поле `.peek-body` (`--space-6`): липкий элемент встаёт по краю содержимого, и без сдвига над полосой оставался зазор, в котором просвечивали строки. Прилипшая полоса (`.stuck`) теряет верхние скругления и получает `--shadow-overlay`.
- В «Показателях» полоса `joined`: пока стоит на месте, она без нижних скруглений продолжается блоком итогов. На «Рынке» блока итогов нет — полоса одна.

**Блок итогов** (`.ref-summary.theme-dark`, только «Показатели») — та же тёмная заливка, девять плиток сеткой в три колонки с зазором 12 px (`summaryKpis`; в узком контейнере `@container ref` ≤ 899 px — две колонки, последняя плитка без пары занимает обе): доля в штуках, доля в деньгах, чистая выручка, валовая прибыль, операционная прибыль, комплексный индекс, бюджет на следующий год, валовая маржа, операционная маржа. Маржа — прибыль к чистой выручке; в год без выручки значение «—», а на графике плитки год пропускается и соседние точки соединяются.
- **Плитка итогов** (`.ref-kpi`, `kpiTile`) — вуаль `--color-bg-inverse-soft`, радиус `--radius-md`, поле 16 × 20 px. Сверху подпись 500 12 (`--color-text-inverse-secondary`) со знаком тултипа и чип изменения справа; ниже значение KPI Value; внизу график.
- **Изменение** (`deltaPill`) — чип `borderless` высотой 22 px: рост — `tone-success`, падение — `tone-danger`, без изменения — без тона. Тёмный вид чип берёт из `.theme-dark` (§ Тёмная тема); своего класса `.ref-pill` больше нет. Деньги — в процентах к прошлому году, доли — в процентных пунктах, индекс — числом. В году старта сравнивать не с чем, чипа нет.
- **График по годам** (`.ref-spark`, высота `--size-ref-spark`) — белая линия 1.5 от старта до показанного года, под ней вуаль; последняя точка — Ember `--size-ref-dot` с тёмным кольцом. Точка — отдельный элемент поверх SVG: график тянется по ширине плитки без сохранения пропорций, и круг внутри SVG сплющивался бы. В году старта — одна базовая линия.
- **Полоса компаний** (`.ref-split`) у долей вместо графика: все компании рынка кусками по убыванию доли на `--color-border-inverse`, своя — Ember, под полосой «N-е место из M». Доля без соседей не говорит, много это или мало.

**Панель** (`.ref-panel`, `refPanel`) — Paper, радиус `--radius-lg`, поле 24 px, без рамки.
- Заголовок — Display Title в Ink-deep. Рядом по необходимости — табы сегментов (`segmentTabs`, компонент «Таб») или знак тултипа.
- Подписи-описания под заголовком нет: что за раздел и как его читать, говорит тултип у заголовка (Brand equity index).
- Блоки внутри панели отбиты линией Line (`.ref-rule`, 32 px сверху, 24 снизу), заголовок блока — `.ref-h3` (600 17/22, без капители).

**Плитки фактов** (`.ref-facts`) — плитка показателя кита (`.stat`). Значение стоит сразу под названием плитки с зазором 12 px, а не прижато к низу: в ряду плиток разной высоты значения лежат на одной линии.
- Несколько значений в одной плитке (`multiStat`, `.ref-multi`) подписаны каждое Caption в Slate **под** значением, вплотную. Название плитки не повторяется формой подписи («Штуки» над числом сразу после «Ёмкость сегмента»), и зазор до подписи меньше, чем до названия, — так видно, что к чему относится.
- Рост ёмкости — зелёным и красным текстом значения.

**Таблица** (`.ref-table`) — без зебры и без вертикальных рамок.
- Шапка на Ash (`--color-bg-card`), края скруглены `--radius-xs`, подписи колонок Label; ячейки 8 × 12 px; строки разделены Line-soft; наведение — Panel-2.
- Свои бренды и своя компания — точкой Ember `--size-ref-dot` перед именем и жирным на всю строку (`.ref-own`, `nameCell`). Место под точку есть у каждой строки, имена стоят одной колонкой. Пометки своей строки фоном в справочном слое больше нет.
- Шапка в два яруса. Верхний ярус — подписи групп (`.ref-grp`) по центру своих колонок, Display Table в Ink-deep — тем же правилом, что имена брендов P&L. Группы разделены белым столбцом `--size-ref-gap` (2 px) в шапке (`.ref-gs`) и тонкой линией Line-soft в теле; у колонки, с которой начинается группа, поле 24 px. В P&L верхний ярус — имена брендов Display Table, пара колонок «На 1 шт.» и «На весь объём» под каждым.
- Колонки одной группы — одной ширины (таблица конкурентов: коммуникация в сегмент `--size-ref-col-seg`, канал продаж `--size-ref-col-channel`), подпись группы стоит ровно над ними.
- Нули и отсутствующие значения — прочерком в Slate.
- **«Что сделали конкуренты»:** столбец «Позиционирование» сразу после «Описания бренда», тем же стилем ячейки (`.ref-profile`), ширина — `--size-ref-statement` 340 px (`.ref-statement`): самая длинная из 17 формулировок брифа — не выше 3 строк; формулировка в кавычках «…»; подпись — из `positioning.ladder.statements` по id из отчёта, неизвестный id или пусто — прочерк. Таблица шире панели и прокручивается по горизонтали, первый столбец закреплён.
- Не влезая по ширине, таблица гаснет к краю, за которым есть ещё колонки (`edgeFades`, классы `.fade-left` и `.fade-right`): справа — пока не докрутили до конца, слева — как только сдвинули. Затухание на 32 px (`--space-7`) маской, а не градиентом поверх: гаснут и серая шапка, и подсветка строк. У таблицы с липкой первой колонкой левое затухание начинается за ней, названия строк не гаснут.

**Ячейки с полосой.** Полоса всегда рядом с точным числом, а как её читать, пишет тултип заголовка колонки.
- **Доля от лидера** (`leaderBarCell`) — дорожка `--size-ref-bar` × `--size-ref-bar-h` (120 × 8 px) на Ash: у лидера залита целиком, у остальных — в пропорции к лидеру; своя — Ember, чужие — Slate. Тултип на полосе называет долю и процент от лидера. Масштаб от лидера, а не от 100%: доли брендов в сегменте редко выше трети, от 100% все полосы были бы короткими и одинаковыми.
- **Слот изменения** (`deltaSlot`) — 500 12 цветом знака справа от значения, в слоте `--size-ref-slot` (36 px), который есть и у строки без изменения: иначе значения съезжают и колонка перестаёт читаться столбиком. Нулевое изменение не пишется.
- **Gain/Loss** (`divergeCell`) — дорожка `--size-ref-diverge` (140 px) с вертикальной отметкой нуля: падение — влево заливкой Error (`--color-bg-danger-strong`), рост — вправо Ok (`--color-status-success`); самое большое изменение в таблице занимает половину дорожки. Число в пп справа.
- **Отношение** (`ratioBar`) — маленькая полоса к 100% перед числом: маржа в P&L (`--size-ref-bar-sm` × `--size-ref-bar-h-sm`, Steel), вес свойства на «Рынке» (120 × 8, Slate, от самого важного свойства).

**Полоса долей компаний** (`.ref-stack`) — над таблицей «Доли рынка по компаниям», высота `--size-ref-stack` (64 px), куски через 2 px со скруглением `--radius-xs`, внутри имя (500 12) и доля (600 17), если кусок шире 8% рынка. Своя компания — Ember, чужие — ахроматической лестницей по убыванию доли: Steel → Slate → Control-border → Line → Ash. Тултип на куске — компания и доля.

**Brand equity index** (`.ref-bei`) — столбцы по шкале 0–100 с подписями делений через 25 и сеткой Line-soft; столбец `--size-ref-split` (12 px), свой бренд — Ember и жирное имя, чужие — Control-border; значение 600 12 сразу за концом столбца, изменение к прошлому году справа.

**Гипотезы и факты о долях** (`.ref-dumb`) — отдельная панель сразу под блоком итогов; пояснение — подсказкой «?» у заголовка, как у Brand equity index, текста под заголовком нет. Гипотезы за год нет в браузере — панели нет. Шапка — как у таблицы, строки — сегмент (только в первой строке группы; группы отбиты линией Line), бренд, гантель, гипотеза, факт (жирным), промах.
- Гантель: кружок `--size-ref-dot-lg` (14 px) Paper с рамкой Ink — гипотеза, точка Ember того же размера — факт, между ними связка Control-border, под всеми строками — шкала с делениями через 10%. Что есть что, пишет тултип на точке: «Ваша гипотеза · 24,0%», «Факт рынка · 17,9%»; подписи-легенды под заголовком нет.
- Шкала — до ближайшего десятка над самым большим значением, а не до 100%: доли брендов редко выше трети, и от 100% точки слиплись бы у левого края.
- Промах набран обычным текстом, а не цветом знака: здесь знак значит «промахнулся вверх или вниз», а не «выросло или упало», и зелёный на завышенной гипотезе выглядел бы достижением.
- Блока нет, если гипотеза за этот год не найдена: она хранится в `localStorage` этой машины (бэкенд решения из истории не отдаёт), и на другом компьютере, в приватном окне и после очистки кэша блок просто не появляется.

**Состав «Показателей».** Полоса экрана → блок итогов → «Гипотезы и факты о долях» (отдельная панель, пояснение — подсказкой «?» у заголовка, как у Brand equity index: гантели гипотеза — факт по сегментам и брендам; нет гипотезы в браузере — нет панели) → «Доли рынка по компаниям» (полоса долей, таблица: доля в штуках, доля в деньгах, Gain/Loss) → «P&L ваших брендов» (двухъярусная шапка по брендам; промежуточные итоги — валовая и чистая выручка, валовая прибыль — на Panel-2 жирным, операционная прибыль на Ash; маржа с полосой отношения; «На 1 шт.» — Slate, в итоговых строках Steel, заполнена до операционной маржи — ниже валовой значения на единицу из модели, в старых отчётах без них — сумма строки на объём; справа колонка «Компания» «На весь объём» — сумма брендов жирным, маржи от сумм) → «Сегменты» (табы; плитки ёмкости сегмента — штуки, купили, не купили, — ёмкости в деньгах и эталонной цены, все — факт года из отчёта; таблица брендов сегмента: доля от лидера со слотом, доля в деньгах, штук, осведомлённость, намерение и доступность со слотами; без гипотез — они вынесены наверх) → «Что сделали конкуренты» (группы «Продвижение по сегментам», «Каналы продаж» и «Общий бюджет» — «Продвижение», «Каналы продаж», «Бюджет бренда» жирным с подсказкой, что R&D конкурентов не раскрывается; колонка описания — «Описание бренда», за ней «Позиционирование») → «Brand equity index» → «Радарная диаграмма». Рост ёмкости сегмента здесь не показывается: он плановый и живёт на «Рынке».

**Состав «Рынка».** Полоса экрана → «Бренды рынка» → «Сегменты».
- **Бренды рынка** — сводка Market Facts: группы «Продукт» (пять свойств и No Frost), «Цена» (цена, `Cost % Retail`), «Продажи» (штук, доля в штуках от лидера рынка, доля в деньгах, Gain/Loss). Свойства — с точностью шага конфига (объём целым, энергокласс до сотых, остальное до десятых). Сортировка — по доле в штуках, сверху лидер. Тринадцать колонок: поля ячеек 8 px, полосы ужаты (`--size-ref-bar-sm`, `--size-ref-diverge-sm`) — на Full HD при масштабе 125% таблица входит целиком, уже — прокручивается с липкой колонкой бренда и затуханием.
- **Сегменты** — табы; плитки «Ёмкость сегмента · план» (штуки, деньги), «Референсная цена», «Рост ёмкости · по плану рынка» (год N, следующий год, за пять лет). Ёмкость, цена и рост здесь — плановые: три значения в одном ряду стоят на одном основании. Разделитель, «Предпочтения потребителей по годам».
- **Идеальный профиль: факт и план.** Таблица «свойство × годы» и вес свойства в выборе. Шапка в два яруса: «Факт» над сыгранными годами — идеал из отчёта года, с дрейфом случайной ленты; «План» над будущими — базовое расписание конфига, которое бэкенд отдаёт игроку намеренно (`public_market_brief`: базовое расписание, а не скрытая реализация будущей ленты). Показанный год — колонка с шапкой Control-border и ячейками Panel-2 жирным; плановые годы — Steel. «Вес в выборе» — за показанный год: фактический, если год сыгран. Раньше все годы брались из расписания, и сыгранные показывали план, с которым модель в тот год не считала.

Соответствие Ant Design — `Card`, `Statistic`, `Table` с `size="small"`, `Segmented` для табов сегментов; радиусы, Ash-шапка таблицы и вуали на тёмном переопределяют их дефолты.

### Плашка диаграммы

Общая подложка двух диаграмм под таблицей «Бренды рынка» — «Бюджеты брендов» и «Динамика по годам» (`charts.js`, `.chart-plate`, класс `.radar-chart` берёт подложку и сетку радара). Данные — только `S.history`, новых полей нет.

- **Подложка и сетка.** Как у радара: Ash (`--color-bg-card`), `--radius-lg`; три колонки — выбор брендов, линия `.radar-rule`, диаграмма. Сверху `--space-5`. От таблицы до первой плашки `--space-7`, между плашками `--space-5`. У самой диаграммы своей белой подложки нет: она лежит прямо на сером.
- **Заголовок внутри.** `h3.ref-h3` (`.chart-plate-title`) в первой строке сетки над выбором брендов, со знаком подсказки; до «Свои бренды» `--space-6`.
- **Табы на высоте заголовка.** Капсула `.tabs.radar-modes` (`.chart-modes`) стоит в той же строке, что заголовок: центры по вертикали совпадают, по горизонтали — центр капсулы по центру колонки диаграммы. Строка не шире колонки, таб не сжимается и не переносится.
- **Таб «⋯» и выпадающий слой.** Табы, не поместившиеся в строку, уходят в таб `.chart-more` с иконкой «dots-three» 16 (Bold, `icons.js`) в конце капсулы. Клик открывает слой `.chart-more-menu` под табом: подложка `--color-bg-surface`, `--radius-md`, тень `--shadow-overlay`, внутри `--space-2`, пункты — те же табы столбцом с шагом `--space-1`, текст по левому краю. Выбран показатель из списка — «⋯» активен, пункт в списке отмечен. Раскладку пересчитывает `splitTabs` по ширине строки, в том числе при смене размера; слой позиционирует `menuLeft`, чтобы он не выходил за плашку.
- **Холст в реальную ширину**. SVG через `svgEl`; ширина viewBox — ширина колонки диаграммы в пикселях, поэтому подписи всегда 12 px, масштабирования холста нет. Колонку меряет один `ResizeObserver` на плашку; при смене ширины диаграмма перерисовывается, плашку убрали из документа — наблюдатель отключается. До вставки в документ ширины нет — первый показ рисуется на запасной ширине 960 и перерисовывается после замера. Высота линий 320, полос — по числу строк.
- **Оси.** Четыре линии сетки (`.chart-grid`, `--color-border-default`), подписи `.chart-axis` 400 12 (`--color-text-secondary`; сумма за полосой, имя своего бренда и показанный год — 600, `--color-text-primary`). Шкала ровная, `niceScale`: три одинаковых шага из ряда 1, 2, 2,5, 3, 4, 5 × 10ⁿ, края кратны шагу; у денег шаг не меньше 1 млн ₽ (`minStep`), иначе подписи `mrub` повторялись бы. Единственное значение — поле ±10 % вокруг него.
- **Полосы** («Бюджеты брендов», в любой ширине). Строка на бренд (`.chart-row`, 32) в порядке выбора брендов: слева имя, полоса 18 по центру строки — части с накоплением слева направо, `own-1…3` (§ Colors), зазор между частями — обводка цвета подложки `.chart-part-rect`; сумма полужирным на 8 правее конца полосы. Колонка имён 132, справа запас 72 под сумму самой длинной полосы. Ось денег снизу — подписи по центру линий, сетка вертикальная. Наведение на строку приглушает полосы остальных (`.chart-bar`) до `opacity: .45`.
- **Линии** («Динамика по годам»). Слева подписи шкалы, сетка горизонтальная. Один цвет на бренд из палитры диаграмм, линия 2, точка радиуса 3,5 с кольцом цвета подложки; вертикаль-ориентир `.chart-guide` и невидимые зоны наведения по годам. Нет значения за год — год пропускается, соседние точки соединяются.
- **Легенда.** Под диаграммой по центру, `.chart-legend`: квадрат 12 (`--space-3`), радиус 3, подпись 400 14. Только у полос — у линий цвет объясняют переключатели слева.
- **Подсказка.** `.radar-tip` — тот же компонент, что у радара (Ink `--color-bg-tooltip`, `--radius-xs`, `--shadow-overlay`, 500 12); у линий и полос (обёртка обоих — `.chart-line`) ширина `max-content`, чтобы у правого края плашки сумма не слипалась с подписью.
- **Выбор брендов.** Слева группы «Свои бренды» и «Конкуренты», переключатели `.radar-toggle`; по умолчанию включены все. В «Бюджетах» переключатель чёрный, в «Динамике» — цвета бренда. Порядок брендов один: по компаниям, внутри — как цвет на радаре, энтрант последним.
- **Узкий контейнер.** `.chart-host` — контейнер «radar»; ниже 1100 px (пороги радара) сверху вниз: заголовок, выбор брендов, линия, табы, диаграмма — таб вплотную к своей диаграмме, по центру её ширины. Разметка одна, порядок задаёт `order`. Выбор брендов — на всю строку: «Свои бренды» первой колонкой, через вертикальную линию (48, совсем узко — 24 px от текста) «Конкуренты» колонками сверху вниз по столько строк, сколько своих брендов (`.chart-rivals`, `--chart-rows`), колонки тянутся на остаток ширины с промежутком `--space-5`. Карточку радара это не задевает.
- **Пустое состояние.** Ни один бренд не включён — на месте диаграммы `.chart-empty` «Включите хотя бы один бренд.», `--color-text-secondary`, поле `--space-6` сверху и снизу. Бренды включены, но ни у одного нет значения показателя за эти годы — тот же `.chart-empty` с текстом «Нет данных за эти годы.».

### Радар

Единственная диаграмма вкладки «Показатели», отрисовывается крупно, семь осей в порядке `payload.axes` модели: «Объём», «Энергокласс», «Надёжность», «Уровень шума», «Дизайн», «Эргономичность», «Доступная цена». No Frost на радаре не показывается (он остаётся чекбоксом в R&D и строкой в таблицах); «Вместительность» ушла вместе с `size_index` из модели. Объекты включаются и выключаются по отдельности переключателями рядом с ней, ограничения на число включённых нет.

- **Два режима**. «Восприятие потребителей» — профили, какими их видят потребители, баллами модели 0–10. «Фактические характеристики» — профили брендов в единицах каждой оси: литры, класс, дБ, рубли; дизайн, надёжность и эргономичность — баллы 1–10. Восприятие в модели — не отдельная настройка, а отставание: каждый год оно сдвигается к факту на долю `perception_inertia`; поэтому после R&D факт уходит вперёд, а восприятие догоняет. Факт и восприятие одного бренда на одной диаграмме не встречаются — их разводит режим. Предпочтения сегментов есть в обоих режимах. Переключатель — компонент «Таб» в капсуле (`.tabs.radar-modes`) по центру подложки над диаграммой, отступ до холста `--space-5`: он меняет картинку, а не выбор, и стоит при ней. Порядок вкладок прежний — «Фактические характеристики», «Восприятие потребителей». Режим живёт в `S.radarMode`, по умолчанию «восприятие», переживает смену года.
- **Шкала восприятия.** Баллы считает модель, фронт их не пересчитывает: `GET /reports/{period}/radar` → `brands[].perceived_scores`, `ideals[].scores`. Шкала 0–10, 10 всегда лучше: у шума и цены 10 — тише и дешевле; у дизайна, надёжности и эргономичности балл — их значение 1–10 как есть. Колец пять — 2, 4, 6, 8, 10 баллов, ровные шаги от нуля в центре, — подписаны один раз, на верхнем луче. Оси названы теми же словами, что в факте, без единиц.
- **Шкала и деления** (режим факта). Значения — `report.analytics.brand_profiles[].physical` и цена года из ответа радара, у идеалов — `ideals[].raw`; доля луча — доля диапазона оси из `payload.bounds` (у всех семи осей, цены тоже). Кольца процентов не несут: у каждой оси своя физическая шкала, колец четыре, и деления подписаны прямо на лучах — `min + k·(max−min)/4` для k = 1…4. Минимум оси уезжает в её заголовок («Объём, л (от 250)»): в центре все семь осей сходятся в одну точку, семь разных минимумов туда не написать. Цена подписывается тысячами рублей, иначе не влезает на луч.
- **Направление осей.** Дальше от центра — всегда «лучше». Поэтому шкала шума инвертирована (50 у центра, 30 на краю), как и у «Доступной цены»; ось при этом названа как характеристика — «Уровень шума, дБ», одно название с карточкой бренда и R&D. Ось, читающаяся наоборот, ломала бы всю диаграмму: полигон тихого холодильника выглядел бы хуже полигона громкого.

- **Объекты.** Один объект на бренд рынка — свой и чужой (`kind: "brand"`, `key` — id бренда) — с двумя наборами значений: `values` — баллы восприятия, `raw` — факт в единицах (без отчёта года — `null`, и в факте бренд не рисуется). Переключатель включает `key`, то есть бренд целиком, а какой набор рисовать, решает режим; поэтому выбор переживает смену режима сам собой. Идеальные профили сегментов — второй тип объекта (`kind: "ideal"`, `key` — `ideal:<сегмент>`), по переключателю на сегмент.
- **Что включено по умолчанию.** СВОИ бренды и все три идеала. Признак «свой» живёт в поле `own` объекта, а не в `kind`.
- **Источник профилей.** Ответ модели `GET /api/v1/simulations/{id}/reports/{period}/radar` (`results.js` → `loadRadar`): бренды — все активные бренды года с P&L, идеалы — реализованные значения года. Ответ кешируется на эпоху (`S.radarCache`, чистится в `bumpEpoch`). Нет отчёта за период (404) — панель вместо диаграммы показывает пустое состояние (`emptyState`), а не ошибку. Факт берётся из `report.analytics.brand_profiles` того же года: в ответе радара его нет (`fact_pct` — алиас восприятия).
- **Карточка.** Панель справочного слоя (`.ref-panel.radar-card`), заголовок «Радарная диаграмма» — Display Title. Диаграмма не шире 1120 px, по центру карточки; подписи осей растут вместе с холстом. Она лежит на подложке, как у карточки бренда: Ash (`--color-bg-card`), скругление `--radius-lg`, поле 40 px сверху и снизу до подписей осей (два `--space-5`), слева 40 до выбора, справа 20; на той же подложке слева от неё — выбор (§ Раскладка карточки). Холст обрезан по высоте впритык к подписям осей (кегль 11 на радиусе 1.2 R), пропорцию блоку задаёт `radar.js` — пустоты внутри холста нет, поля даёт подложка.
- **Подложка диаграммы.** Концентрические круги вместо многоугольника — четыре в факте, пять в восприятии: полосы через одну, начиная с внешней, — Paper (`--color-bg-surface`; кольца цвета подложки на Ash пропадали) и Panel-2 (`--color-bg-data`), кольца Line-soft (`--color-border-soft`), лучи Line (`--color-border-default`), на конце каждого луча точка r 4 Control-border (`--color-border-control`). Число на внешнем кольце отступает от точки дальше остальных делений.
- **Форма объекта.** Бренд — заливка без обводки с наложением `multiply`, 26 % краски в обоих режимах (до режимов восприятие было бледнее, 12 %, потому что лежало рядом с фактом). Пересечение двух брендов темнее каждого, ни одна фигура не прячет другую. Поверх заливки — внутренняя тень цвета бренда: два слоя вдоль края, обрезанные по самой фигуре, — кромка (штрих 6, размытие 3, 32 %) и дымка (штрих 26, размытие 11, 18 %). Снаружи фигуры тени нет; нужна она там, где фигуры почти совпадают и заливки сливаются в одно пятно, — край каждой остаётся виден. Идеал — пунктир `7 4` толщиной 1.8 без заливки, рисуется поверх всех заливок.
- **Цвет.** Один цвет на бренд из категориальной палитры диаграмм (§ Colors) — в обоих режимах один и тот же. Свои бренды — тёплая группа, конкуренты — семейство оттенков на компанию, идеалы — три разных нетёплых цвета; у идеалов тени нет.
- **Легенда.** Три группы по принадлежности: «Свои бренды», «Конкуренты», «Предпочтения сегментов», заголовки — h3. До режимов группы были по типу профиля — «Фактические характеристики», «Восприятие потребителей», «Предпочтения потребителей». Все пункты — одним столбцом, по пункту в строке, в порядке раздачи цвета; группы друг под другом через горизонтальную линию Line, отступ `--space-5`. Чекбоксов нет: переключатель — квадрат 12 px со скруглением 3, за ним имя. Включён — цвет бренда; выключен — Control-border (`--color-border-control`). Идеал — радиокнопка 16 px: пунктирная рамка `3 2` со скруглением 3.5; выключен — рамка Control-border толщиной 1.5; включён — рамка цвета сегмента толщиной 2, внутри квадрат 7 px того же цвета, подпись полужирная (500). Раньше включённый идеал отличался от выключенного только цветом тонкой рамки и не читался. Наведение: кольцо 3 px Line-soft вокруг квадрата, у выключенного проступает его цвет; у отключённого наведения нет, сам он — непрозрачность 45 %, курсор запрещён. Фокус — кольцо 2 px Ember на квадрате; сам чекбокс в разметке есть (клавиатура, чтение с экрана) и несёт имя бренда или «Предпочтения — сегмент» в `aria-label`.
- **Раскладка карточки**. Сверху Display Title; кнопки «Очистить выбор» нет, выбор рядом с диаграммой снимается теми же переключателями. Ниже, через `--space-5`, подложка: слева столбец выбора по ширине текста, затем вертикальная линия Line на всю высоту подложки, справа капсула режима и диаграмма; от текста до линии и от линии до диаграммы по 48 px (два `--space-6`). Выбор стоит при диаграмме, как легенда при графике: раньше он был полосой над подложкой и жался к левому краю, справа от него пустовала половина карточки. Порог 1100 px по ширине карточки: уже диаграмма справа от столбца мельчает до нечитаемых подписей, и выбор встаёт над ней полосой — три группы колонками через вертикальные линии по 48 px от текста, линия между выбором и диаграммой ложится горизонтально. Уже 720 px от текста до линий полосы по 24 px, иначе предпочтения выходят за край подложки.
- **Наведение на ось**. Зона наведения — невидимый клин вокруг луча до его подписи. Под курсором луч темнеет до Ink толщиной 1.5, подпись оси — полужирная (600), на каждой включённой фигуре точка r 4.5 её цвета: бренд — заливка с белой обводкой, идеал — белое кольцо цвета сегмента. У курсора — тултип, та же тёмная плашка, что у подсказки (`--color-bg-tooltip`, `--radius-xs`, `--shadow-overlay`): заголовок — название оси (в восприятии — «Объём, баллы» и т. п.), дальше все включённые объекты строкой «квадрат · имя · значение» (квадрат идеала — как его включённый переключатель: пунктирная рамка 1.5 и внутри квадрат того же цвета), у идеала после имени — «предпочтение» (факт или восприятие у брендов говорит режим), от края к центру, между строками 8 px (поля `--space-1` сверху и снизу), без пояснительной строки; если ничего не включено — «Ничего не выбрано». Значения в факте: цена — рублями целиком, объём и шум — целыми в своих единицах, баллы модели — одним знаком; в восприятии — балл 0–10 одним знаком на любой оси. У правого края тултип уходит влево от курсора.
- **Энтрант.** Компания-«энтрант» (Vertex, входит с 3–4-го года) теперь появляется на радаре сама собой: в `brand_profiles` она есть с того периода, как выходит на рынок. В `market.brands` её по-прежнему нет — оттуда берутся только слоты для порядка раздачи цвета, и бренд без слота встаёт в конец, чтобы его появление не сдвинуло палитру остальным.

### Полоса управления
Полоса всегда внизу экрана, ярусов в ней два или один — по версии прогноза (ниже). Нижний ярус — плашка бюджета на Ash (`--color-bg-card`), высота 72 px, поле 12 × 20 px, без нижних скруглений: полоса стоит на нижнем крае окна. Слева колонка бюджета — «Бюджет», «Потрачено», «Остаток» строкой (при превышении вместо «Остатка» — «Перерасход», число без минуса) (подпись Label в Slate, значение Caption-strong Numeric, промежуток 24 px; не влезая, на следующую строку с шагом 4 px уходит пара целиком — сумма неразрывна, «₽» от числа не отрывается, ярус при этом выше 72 px), под ними шкала на всю ширину колонки, 8 px, заливка Ember (`--color-bg-accent`) на дорожке Track (`--color-bg-slider-track`); при перерасходе заливка и остаток — Error. Дальше вертикальная линия Line-soft (`--color-border-soft`) и капсула (`--radius-pill`, поле 4 px, слева 24 px), в которой проверка и запуск живут вместе: «Ошибок нет» или «Ошибки» с чипом-счётчиком и основная кнопка. К проверкам модели полоса добавляет одно своё предупреждение — «Не заполнен прогноз», пока гипотеза долей не заполнена целиком или перебирает 100%; оно не блокирует запуск, а строка в списке ведёт к первому пустому полю карточки. В году 0 карточки нет, и предупреждения нет. Подложка капсулы несёт тяжесть проверки: Paper, когда чисто, Sulfur-soft (`--color-bg-warning-soft`) при предупреждениях, Error-soft (`--color-bg-danger-soft`) при ошибках; насыщенный тон остаётся у чипа внутри. Верхний ярус — вилка прогноза: заголовок, карточки показателей и четыре метрики разброса. Плашка бюджета отбита от верхнего яруса собственной поверхностью, а не только линией; без верхнего яруса она сама стоит под скруглённым верхом полосы и повторяет его изнутри рамки.

**Версии прогноза.** Их две, и обе живут одновременно, пока не выбрана одна: `?forecast=old|new`, выбор запоминается в браузере, по умолчанию new, переключателя игроку не видно. **old** — верхний ярус с вилкой и карточка «Гипотеза долей». **new** — верхнего яруса нет, прогноз целиком в карточке «Прогноз» (ниже). Прошлый выбор (§6, вариант Б — блок-калькулятор на месте гипотез) закрыт, калькулятор снят.

Верхний ярус живёт из карточки «Гипотеза долей» (ниже) и без неё пуст. Пустой ярус объясняет, чего не хватает, одной строкой, отбитой слева той же линией Line-soft, что и карточки вилки: «Доступен после заполнения долей» и акцентная текстовая кнопка «Заполнить доли» — она ведёт к карточке и ставит фокус в первое пустое поле; в году 0, где карточки нет, — «Доступен с первого года» без кнопки; «считаем…» на время запроса или названные сегменты, где сумма перебрала 100%. Формулировки «появится само» здесь быть не может: без гипотезы прогноза не будет никогда. Системную оценку долей, которую движок строит сам при пустой гипотезе, игроку не показываем вовсе.

**Пробный год.** Первый год, который команда играет сама (период движка 1), — пробный; на экране он «Год 0»: чип хода в шапке «Год 0 · пробный», кнопка «Запустить год 0», в полосах «Показателей» и «Рынка» период 1 подписан «Год 0». Пока пробный год не сыгран, полоса обычная, в подтверждении запуска вместо «Действие необратимо» — «Пробный год сотрётся, когда начнёте игру». Когда сыгран (`practice: played`), верхнего яруса нет, а нижний вместо денег несёт `.cb-note` — «Пробный год сыгран» набором значения вилки (600 14/19) и пояснение `.sub` под ним с зазором `--space-1`; дальше та же линия и капсула `.cb-run.solo` с одной Primary «Начать игру», поле капсулы `--space-1` со всех сторон. Поля решений не блокируются. «Начать игру» открывает подтверждение «Начать игру?» и зовёт `POST …/practice/reset`: сервер возвращает игру к исходному состоянию, фронт стирает черновики гипотезы этой игры и сам прогоняет «Старт».

### Карточка «Гипотеза долей» (§5)
Панель под карточками брендов, на месте снятого блока-калькулятора, отбита от них на 32 px (`--space-7`). В версии прогноза new она называется «Прогноз» и несёт ещё прогнозный P&L (ниже). Подложка — панель (`.panel`) с радиусом 32 px (`--radius-lg`, как у полосы управления) и полем 28 px со всех сторон (`--space-card`). Заголовок — Heading 3 шкалы набора (500 29/1.2), под ним вплотную (4 px, `--space-1`) Caption-пояснение, справа от заголовка вторичная кнопка small «Заполнить за прошлый год» (гасится, когда сыгранных лет ещё нет). Внутри — колонки по сегментам. Три в ряд держатся до последнего: колонка сужается до половины поля (`--size-field` / 2), и только уже этого сетка переносит ряд — две + одна или столбец. В широкой колонке имя бренда и поле стоят рядом; в колонке уже 320 px (самое длинное имя, зазор и поле) подписи встают над значением — так в режиме двух окон. Сегмент — это рынок, который делят, и остаток достаётся конкурентам, поэтому колонка на сегмент, а не строка общей таблицы.

Колонки без своей поверхности и обводки, разнесены зазором сетки 40 px (два `--space-5`), и посередине зазора — линия Line-soft (`--color-border-soft`): вертикальная между колонками ряда, горизонтальная над перенесённым рядом; у первой колонки и первого ряда линий нет. Поля колонок — зазор, а не padding блока: padding оставался у второго и третьего сегмента и при переносе, и сегменты съезжали и наезжали друг на друга. Сетка колонок отстоит от пояснения на 20 px (`--space-5`) и от нижнего края карточки на 8 px сверх поля панели, линия ровно по высоте содержимого; внутри колонки между частями 12 px (`--space-3`). Сверху имя сегмента Body-strong. Дальше строки брендов столбцом: имя в Steel (`--color-text-secondary`) слева, справа то же поле со слайдером, что в карточке бренда (§ Inputs / Fields), 200 × 40 px — значение Numeric и «%» вплотную, шкала 0–100 по нижней границе; поля всех строк стоят одной колонкой, строки разделены Line-soft, поле строки 8 px. Ниже — строка остатка «Конкуренты и не купившие» целиком в Slate, значение Numeric (Error при перерасходе), и полоса распределения — атом «Шкала» (`.cb-meter`) с заливкой на каждый бренд: три ахроматические ступени Ink-deep → Steel → Slate (`--color-bg-strong` → `--color-bg-secondary` → `--color-bg-tertiary`) по числу брендов, незанятый хвост дорожки и есть остаток рынка. Цвет здесь порядок, а не категория, — категориальная палитра диаграмм сюда не заходит.

Ввод — целые проценты, девять полей. Пустое поле и ноль различаются: ноль — осознанное «бренд в этом сегменте не продаётся», пустое — «ещё не решил», и прогноз считается только по всем девяти заполненным. Сумма долей внутри сегмента не больше 100% — это ограничение модели, а не оформление; нарушение пишется текстом под шапкой блока (см. Don't про ошибки — только текст, без рамок и подсветок) и снимает вилку, но запуск года не блокирует: гипотеза в расчёт года не входит.

Узкая колонка (уже 320 px): имя бренда и «Конкуренты и не купившие» — подписью Label-caption в Slate (400 12/1.4, `--color-text-tertiary`) над значением, между подписью и полем 4 px (`--space-1`); поле тянется на колонку, но не шире `--size-field`; строки без линий, с шагом 12 px (`--space-3`).

В году 0 карточки нет: прогноз на нулевом ходу не считается, и заполненная матрица осталась бы без единственного своего следствия.

**Версия new — «Прогноз».** Та же панель, заголовок «Прогноз», под пояснением две части столбцом, у каждой заголовок секции `h3`: «Гипотезы» — колонки сегментов, как выше, и «Прогнозный P&L» — во всю ширину. Между частями зазор 40 px и посередине линия Line-soft, как между рядами сегментов. Кнопок сворачивания нет: обе части видны всегда. Прогнозный P&L — таблица «P&L ваших брендов» с «Результатов» (строки, роли, подсказки общие, `pl.js`), но на бренд одна колонка «На 1 шт.» и строки до «Валовой маржи» включительно; значения в основном наборе, у маржи — полоса отношения. Числа — `unit_pl_preview` из ответа проверки черновика: цена, доход ритейлера, средняя скидка промо, себестоимость. Пока доли не распределены целиком или сумма сегмента перебирает 100%, вместо таблицы — строка Body в Steel «P&L заполнится после распределения долей». Не влезая по ширине, таблица прокручивается только вбок и гаснет к краю, за которым есть колонки, — как таблицы справочного слоя; вертикальной прокрутки у таблиц нет.

## Do's and Don'ts

### Do:
- **Do** держать оранжевый только на интерактивном и только целиком: кнопка, слайдер, шкала, точка изменённого поля.
- **Do** показывать прошлое значение под подписью у каждого редактируемого поля, независимо от того, менялось ли оно.
- **Do** раскладывать любые показатели строками «подпись, значение, единица» с табличными цифрами по правому краю.
- **Do** встраивать слайдер в нижнюю границу инпута; ввод с клавиатуры и перетаскивание метки меняют одно значение.
- **Do** держать все три карточки брендов раскрытыми; сворачиваются только редкие рычаги внутри карточки.
- **Do** ставить сжатый дисплейный шрифт капителью, Bold, на имена брендов, логотип и заголовки справочного слоя.
- **Do** объяснять масштаб любой полосы в данных тултипом у заголовка колонки и держать рядом с полосой точное число.
- **Do** подписывать значения в плитке с несколькими значениями под значением и ближе к нему, чем название плитки.
- **Do** держать знак подсказки рядом с подписью и один на всю систему: залитый круг с «?» Rubik Regular (400) внутри цветом подложки: в покое круг `--color-bg-help-tip` (Slate) и знак `--color-text-help-tip` (белый), при наведении круг темнеет до `--color-bg-help-tip-hover` (Steel), при фокусе — Ember (`--color-bg-accent`). Размер — параметр `helpTip(key, text, { size })`, а не контекст: `sm` (по умолчанию) — круг `--size-help-sm` (14 px) и знак 10 px у подписей полей и шапок таблиц, `lg` — круг `--size-help-lg` (18 px) и знак 12 px у заголовков. Глиф центрируется по себе, а не по строке: сдвиг на полпикселя вниз, иначе под «?» оставалось больше места, чем над ним. Знак мельче и легче круга: круг и так читается, а жирный крупный «?» спорил с подписью. На тёмной заливке (`.theme-dark`) круг светлый (`--color-bg-inverse-tertiary`), знак — Ink-deep, под курсором круг Paper; фокус тот же, Ember.
- **Do** различать ориентир и контрол размером и тоном: справочная отметка сегмента крупнее ручки слайдера и в Slate (`--color-bg-tertiary`), ручка мельче и в Ember (`--color-bg-accent`).
- **Do** помечать изменённое поле точкой Ember (`--color-bg-accent`) 4 × 4 px справа от подписи поля. Рамку поля для этого не трогаем — она остаётся на Control-border (`--color-border-control`).
- **Do** писать в подписи поля только название. Текущее значение, диапазон и прочий контекст живут в блоке текущего состояния и в подсказке, но не в заголовке.
- **Do** давать разовое действие поля словесной подчёркнутой кнопкой справа в его подписи: «уравнять» у каналов, «сбросить» у R&D. Обе — текстовые кнопки в Slate (`--color-text-tertiary`), при наведении и фокусе обе — Ink-deep (`--color-text-strong`).

### Don't:
- **Don't** использовать синий ни в каком оттенке.
- **Don't** собирать показатели в текстовую фразу через точки или запятые.
- **Don't** показывать в блоке «Продукт сейчас» что-либо, кроме свойств продукта.
- **Don't** добавлять тени карточкам, контролам, чипам и кнопкам: тень есть только у панели решений, у всплывающего слоя и у прилипшей полосы экрана (`--shadow-overlay`).
- **Don't** заливать ячейки таблиц тоном по значению без легенды: оттенок без ключа читается случайным (тепловая заливка снята на макете).
- **Don't** писать под заголовком панели справочного слоя описание раздела — оно живёт в тултипе у заголовка.
- **Don't** выносить слайдер отдельным элементом рядом с полем.
- **Don't** обводить, подсвечивать или перекрашивать что-либо из-за ошибки: сообщение — это только текст.
- **Don't** прятать поля раздела за переключателем «включить»: раскрытый раздел сразу готов к правке.
- **Don't** красить предупреждения оранжевым, а кнопки жёлтым.

## Долг по шкале

Долг по КОМПОНЕНТАМ закрыт: три волны находок — кнопки, `h3`
калькулятора прогноза, `.issue.error` — все
сведены к токенам: кнопки на пилюле и рамке
Ink (`--color-border-strong`) — пересборка атомов позже свела их к трём формам, `h3`
на токене Label, `.issue`/`.issue.error` — голый текст без рамки и подложки
(Bare Message Rule). Финальное ревью добавило к ним ещё три: переключатель
годов (оранжевая заливка таба — снята), плашка завершённой игры (Steel на
тёмно-зелёном — переведена на пилюлю в Ink), скрим модального окна
(холодный сине-серый хардкод — переведён на `--color-bg-scrim`). Тени
приведены к двум разрешённым: третья, у всплывающей подсказки, заменена на
`--shadow-overlay`, мёртвая четвёртая у верхней плашки удалена.

Справочный слой двух вкладок панели обзора переделан по утверждённому макету
AB: вместо `.panel`, `.stat`, `table.zebra` и `.delta` на
вкладках теперь детали `.ref-*` из `reference.js` на новых токенах —
цвета на тёмной заливке (§ Colors) и геометрия полос `--size-ref-*`,
`--radius-ref-bar` (§ Components → Справочный слой). Прежнее «закрыто
описанием» к вкладкам больше не относится: `.panel` и `.stat` остались у
экрана решений и админки, `.badge` и `.ideal-*` — у своих мест.

**Закрыто пересборкой основы** — было открытым, снято счётом по коду, а не
на глаз:

- Спейсинг-токены заведены: `--space-1…6`, 50 вызовов во фронте. Прежняя
  шкала `xs/sm/md/lg/xl` была объявлена во фронтматтере и не существовала
  в CSS вовсе.
- Размеров вне шкалы не осталось: `12.5px` снят, все `font-size` фронта
  лежат на ступенях 12 / 14 / 17 / 20 / 24 / 42 / 50.
- Радиусов вне шкалы не осталось: `3px`, `6px`, `7px`, `9px` и `50%`
  сведены к `--radius-xs…pill`. Четыре `border-radius: 0` — это квадрат
  чекбокса и прямые верхние углы прилипшей капсулы, а не обход шкалы.

**Что остаётся открытым** (список честный, а не пустой):

- После переделки справочного слоя продукт больше не вызывает `deltaBadge`
  (`ui.js`), `table.zebra` и `.delta`: `.delta` осталась только в ките у
  плитки показателя. Либо у них находится место, либо они уходят вместе с
  правилами в `styles.css`.
- В справочном слое два литерала мимо шкалы: толщина связки гантели 3 px и
  рамка кружка гипотезы 2 px.

- Инлайновые размеры в `radar.js`: `font-size: 11px` и `font-size: 9px`
  записаны числом — мимо шкалы и мимо токенов.
- `@keyframes flash-issue` обводит поле рамкой из-за ошибки — прямое
  расхождение с Bare Message Rule; либо анимация уходит, либо правило
  получает явное исключение.
- Два мёртвых токена: `--color-action-text` и `--color-bg-rank-3` не
  вызываются нигде. Либо у них находится применение, либо они уходят
  из `:root`.
- Геометрия блоков `components:` во фронтматтере — данные seed'а, снятые
  ДО написания кода и с кодом ни разу не сверявшиеся. Ключи там
  описательные (`bar-top`, `row-property`), селекторам не соответствуют, и
  сверка — это ручное сопоставление 28 имён с правилами CSS. Цвета, радиусы и тени в этих блоках
  приведены к токенам; высоты, отступы и размеры — нет.

Гейт приёмки (`design-gate.sh`) этих пунктов не видит: он проверяет цвет,
id брендов и контрольные ширины, а не шкалу отступов и размеров.
Пока их не закрыли, «гейт зелёный» и «долг закрыт» — разные утверждения, и
второе здесь не заявляется.
