#!/usr/bin/env python3
"""Проверка схем кита (kit-specs.js) по контракту KIT-RULES.md.

Разбор статический, регулярками по тексту файла — так же, как устроены
проверки 8 и 9 в design-gate.sh: kit-specs.js импортировать нельзя, он
тянет DOM через ui.js и reference.js.

Проверка писалась как тест переезда схем на контракт: по ней было видно,
сколько схем ещё держат старый плоский формат (props/axes/group). Все
схемы переехали, проверка зелёная и стоит в гейте.

Проверяется: обязательные поля по слою (states+content у атома и
молекулы, parts+decides+modes у организма), закрытый словарь состояний,
имена мимо C1/C2, ссылки состава организма, уникальность id, поля
описания оси, ключи ограничений only/of/statesOnly, пометки unstyled
(B3) и слоты axes (E3).

Формат блока, на который опирается разбор (см. kit-specs.js): одна
запись SPECS — это
    \n  {\n
      <поля>
    \n  },
с полями ВЕРХНЕГО уровня ровно на четырёх пробелах отступа, а вложенными
(например, props.content у slider-field) — на шести и глубже. На этом и
держится различение: у slider-field есть props.content (ось "content" со
значениями price/channel/attr), но нет требуемого контрактом ТОП-ЛЕВЕЛ
content — has_field смотрит только на "\\n    content:" (4 пробела) и не
путает его с "\\n      content:" (6 пробелов) внутри props.

Отдельная деталь формата: re.findall с (.*?) между "\\n  {\\n" и "\\n  },"
не включает в захваченную группу открывающий "\\n  {\\n" — значит блок
начинается сразу с "    id: ...\" БЕЗ ведущего "\\n". Если это не
поправить, регулярка поля \"\\n    id:\" не найдёт самое первое поле в
блоке ни у одной записи, и все 21 схема пойдут в отчёт как "<без id>" —
формально красная проверка, но бесполезная для чтения. Поэтому к
каждому блоку спереди приклеивается "\\n" (см. blocks() ниже).
"""
import re
import sys
import pathlib

SRC = pathlib.Path(__file__).with_name("kit-specs.js")

# B5: словарь состояний закрыт и общий для всей системы.
INSTANT = {"default", "hover", "focus", "active"}
CARRIED = {"selected", "expanded"}
SUPPRESSING = {"disabled", "busy"}
VOCAB = INSTANT | CARRIED | SUPPRESSING

LAYERS = {"atom", "molecule", "organism"}

# A1/E1/E2: обязательные поля различаются по слою, а не одним списком.
#   - общие — у карточки любого слоя (id и name — адрес в ките и заголовок;
#     layer — A1; purpose — E1/E2 «назначение»; usedIn — E1/E2 «где
#     применяется/стоит»);
#   - атом и молекула воспроизводятся из опций+состояний+контента (A1) —
#     карточке обязаны быть states и content (E1);
#   - у организма опций нет, вместо states/content карточка описывает
#     состав (E2): parts (состав), decides (что решает сам), modes
#     (режимы), а options/modifiers/axes ему принадлежать не могут — это
#     язык карточки атома/молекулы, не организма.
COMMON_REQUIRED = ("id", "name", "layer", "purpose", "usedIn")
LEAF_REQUIRED = ("states", "content")
ORGANISM_REQUIRED = ("parts", "decides", "modes")
# unstyled тоже: помеченная клетка живёт в матрице, а матрицы у организма
# нет — E2.
ORGANISM_FORBIDDEN = ("options", "modifiers", "axes", "unstyled")

# C1: имя не берётся из адреса на экране, из класса/селектора и из
# предметной области продукта.
#   - "[.#][a-z][a-z0-9-]*" — CSS-селектор вида ".switcher"/"#foo" — форма,
#     в которой имена реально сидят в текущих схемах (labels: [".switcher",
#     ".radar-toggle", …] у switch, screen-strip, tabs и т.д.);
#   - остальное — слова предметной области BrandSim, которыми были
#     заражены старые оси (см. «Разборы» №1-2 в KIT-RULES.md: variant с
#     .radar-toggle · восприятие/идеал, content с «цена»/«канал»).
BANNED = re.compile(r"[.#][a-z][a-z0-9-]*|цена|канал|бренд|сегмент|R&D|год", re.I)

STR_RE = re.compile(r'"([^"]*)"')
# Поле верхнего уровня — ровно четыре пробела отступа. Так отличаем
# top-level content (обязателен контрактом) от props.content (ось на
# шести пробелах, см. докстринг) и top-level options от произвольного
# "options" внутри чужого значения.
FIELD_START = r"\n    {key}:"


def blocks(src):
    """Верхнеуровневые записи SPECS — блок "\\n  {\\n …\\n  },". Ведущий
    "\\n" перед первым полем возвращается на место (см. докстринг) —
    иначе id первого поля в блоке не находится."""
    body = src[src.index("export const SPECS"):]
    return ["\n" + b for b in re.findall(r"\n  \{\n(.*?)\n  \},", body, re.S)]


def field(blk, key):
    """Значение строкового поля верхнего уровня: key: "значение"."""
    m = re.search(FIELD_START.format(key=re.escape(key)) + r'\s*"([^"]*)"', blk)
    return m.group(1) if m else None


def has_field(blk, key):
    """Поле верхнего уровня присутствует, любого типа значения."""
    return re.search(FIELD_START.format(key=re.escape(key)), blk) is not None


def field_body(blk, key):
    """Сырой текст значения поля верхнего уровня — от «key:» до начала
    следующего поля верхнего уровня (снова четыре пробела + слово + ":")
    или до конца блока. В отличие от field() не требует, чтобы значение
    было строкой — нужен для options/modifiers, которые в новом формате
    объекты, а не строки."""
    m = re.search(FIELD_START.format(key=re.escape(key)), blk)
    if not m:
        return None
    start = m.end()
    nxt = re.search(r"\n    [A-Za-z_]\w*:", blk[start:])
    end = start + nxt.start() if nxt else len(blk)
    return blk[start:end]


def banned_hits(text):
    """Все кавыченные строки в text, похожие на селектор или слово
    предметной области (значения values и кавыченные ключи вида
    "цена": {...})."""
    return [s for s in STR_RE.findall(text) if BANNED.search(s)]


# Ключ объекта необязательно кавычить — `{ цена: {...} }` синтаксически
# корректный JS ровно так же, как `{ variant: {...} }`: JS-идентификатор
# может содержать юникод-буквы, кириллица не исключение (`let цена = 5`
# компилируется). Значит некавыченный ключ вроде "variant"/"size" НЕ
# «заведомо чист» сам по себе — чист он только потому, что не совпадает с
# BANNED, а не потому что он не кавычен. Ключ ищем как токен сразу после
# "{" или "," (открытие объекта или начало следующего свойства) и перед
# ":" — этого достаточно для плоских и одноуровневых объектов options и
# modifiers, которые здесь и разбираются.
BARE_KEY_RE = re.compile(r'[{,]\s*((?:[^\W\d]|\$)[\w$]*)\s*:')


def strip_quoted(text):
    """Кавыченные строки — пробелами той же длины на их месте. Разметка
    объекта (скобки, запятые, отступы) остаётся нетронутой, а текст
    ВНУТРИ строк (например, "цена: значение и единица" в чужом labels)
    перестаёт выглядеть как "ключ перед двоеточием" для BARE_KEY_RE —
    иначе один и тот же хит задваивался бы с banned_hits() либо ловился
    там, где его самого по себе (не в виде ключа) нет."""
    return re.sub(r'"[^"]*"', lambda m: " " * len(m.group(0)), text)


def bare_key_hits(text):
    """Некавыченные ключи объекта в text, похожие на селектор или слово
    предметной области — тот же критерий BANNED, что и у кавыченных строк
    в banned_hits(), только источник другой (позиция перед ":", а не
    содержимое кавычек)."""
    return [m.group(1) for m in BARE_KEY_RE.finditer(strip_quoted(text)) if BANNED.search(m.group(1))]


# Запись одной оси внутри options/modifiers — ровно шесть пробелов отступа
# (верхнеуровневое поле стоит на четырёх, см. докстринг): "      key: { … }".
# Ищется только НАЧАЛО записи, тело берётся сопоставлением скобок
# (entries ниже). Регулярка «до закрывающей скобки» видела запись лишь
# тогда, когда та укладывалась в одну строку: запись, разнесённую на три
# строки, разбор пропускал молча, и белый список полей оси на неё не
# действовал — то есть ровно та защита, ради которой список заведён,
# отключалась переносом строки.
ENTRY_HEAD_RE = re.compile(r"^ {6}((?:[^\W\d]|\$)[\w$]*):\s*\{", re.M)
# Ограничение (B2): значение — строка "ключ:значение|значение" либо массив
# таких строк.
LIMIT_RE = re.compile(r'\b(only|of|statesOnly):\s*(\[[^\]]*\]|"[^"]*")')
# Поля описания оси — закрытый список. Опечатка в ИМЕНИ ограничения
# (only → onlyy) не ловится разбором условий: неизвестное поле движок
# просто не читает, ограничение исчезает целиком, и матрица рисует
# комбинацию, которой в продукте нет. Враньё обратное тому, что чинит
# проверка условий, — и такое же тихое, поэтому список белый: всё, что не
# в нём, валит проверку.
#
# C2: поля type в списке нет. Словарь двузначной опции один на весь кит —
# off | on; булев тип давал второй способ записать то же самое (одно
# понятие — modified — стояло у field булевым, а у prop-row парой off|on),
# и матрица подписывалась «ДА»/«НЕТ» вместо имён значений.
AXIS_FIELDS = ("values", "default", "only", "of", "statesOnly")
KEY_RE = re.compile(r"([^\W\d]\w*)\s*:")
VALUES_RE = re.compile(r"\bvalues:\s*\[([^\]]*)\]")
# B3: помеченная клетка. Причина — из закрытого словаря двух: «нет правила»
# (форма есть, CSS ей не написан) и «не реализовано» (слот не поддержан).
# Третьей причины не бывает: всё остальное — либо ограничение (пустая
# клетка), либо работающая форма (обычная).
UNSTYLED_WHY = ("нет правила", "не реализовано")
UNSTYLED_FIELDS = ("when", "why")
# E3: слоты матрицы. Слота с другим именем движок не читает — ось молча
# исчезает из карточки.
AXES_SLOTS = ("cols", "rows", "groups")
# Часть состава организма — один объект в parts. Ссылка `of` ведёт на
# карточку компонента; `name` стоит там, где карточки в ките нет.
PART_RE = re.compile(r"\{([^{}]*)\}")


def strip_comments(text):
    """Комментарии — прочь. В options и modifiers их много, и разбор строк
    «ключ: { … }» обязан видеть только код: в комментарии у чипа слова
    only и statesOnly стоят прозой."""
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return re.sub(r"//[^\n]*", "", text)


def entries(body):
    """Записи осей внутри options/modifiers: [(имя, тело записи)]. Тело
    берётся сопоставлением скобок от ENTRY_HEAD_RE до парной закрывающей,
    поэтому запись длиной хоть в десять строк разбирается так же, как
    однострочная. Кавыченная строка пропускается целиком: скобка внутри
    неё — текст, а не структура."""
    text = strip_comments(body)
    out = []
    for m in ENTRY_HEAD_RE.finditer(text):
        depth, i = 1, m.end()
        while i < len(text) and depth:
            c = text[i]
            if c == '"':
                i += 1
                while i < len(text) and text[i] != '"':
                    i += 2 if text[i] == "\\" else 1
                i += 1
                continue
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
            i += 1
        out.append((m.group(1), text[m.end():i - 1]))
    return out


def axis_values(blk):
    """Оси компонента и множества их значений: {ключ: set|None}. None —
    значения заданы не литералом, а импортированной константой
    (values: HELP_TIP_SIZES): ключ существует, а проверить значение
    статическим разбором нечем."""
    out = {}
    for key in ("options", "modifiers"):
        body = field_body(blk, key)
        if body is None:
            continue
        for name, entry in entries(body):
            vm = VALUES_RE.search(entry)
            out[name] = set(STR_RE.findall(vm.group(1))) if vm else None
    return out


def states_of(blk):
    """Состояния карточки — то, чем может быть props.state и складывающиеся
    оси. Пусто, если поля states нет вовсе (организм)."""
    m = re.search(r"\n    states:\s*\[([^\]]*)\]", blk, re.S)
    return set(re.findall(r'"([^"]+)"', m.group(1))) if m else set()


def cond_problem(cond, label, axes, states=None):
    """Одно условие «ключ:значение|значение». Читает его тот же код, что и
    kit.js (meets): ключ — ось схемы, значения сравниваются со String()
    значения оси. Опечатка тихая: несуществующий ключ или значение молча
    опустошают клетки. states — множество значений для ключа state; None
    значит, что в этом условии ключ state недопустим (у ограничений
    only/of он ничего не ограничивает)."""
    if ":" not in cond:
        return f"условие «{cond}» у {label} — не «ключ:значение»"
    on, values = cond.split(":", 1)
    if on == "state":
        if not states:
            return f"условие «{cond}» у {label} — состояний у схемы нет"
        known = states
    elif on in axes:
        known = axes[on]
    else:
        return f"условие «{cond}» у {label} — опции «{on}» в схеме нет"
    if known is None:
        return None
    for value in values.split("|"):
        if value not in known:
            return (f"условие «{cond}» у {label} — у «{on}» нет значения «{value}» "
                    f"(есть {', '.join(sorted(known))})")
    return None


def axis_problems(blk):
    """B2: описание оси, которое движок прочитает не так, как написано.

    Два рода опечаток, и оба тихие:
      - в условии ограничения (kit.js, applicable читает его как
        "ключ:значение|значение" и сравнивает String(props[ключ]) со
        списком): несуществующий ключ или значение молча опустошают клетки
        матрицы — карточка показывает отсутствие формы там, где форма есть;
      - в ИМЕНИ поля оси: неизвестное поле не читает никто, ограничение
        исчезает целиком, и клетка заполняется там, где формы нет."""
    axes = axis_values(blk)
    out = []
    for key in ("options", "modifiers"):
        body = field_body(blk, key)
        if body is None:
            continue
        for name, entry in entries(body):
            for field_name in KEY_RE.findall(strip_quoted(entry)):
                if field_name not in AXIS_FIELDS:
                    out.append(f"«{field_name}» в описании оси «{name}» — не поле оси "
                               f"(можно {', '.join(AXIS_FIELDS)})")
        for m in LIMIT_RE.finditer(strip_comments(body)):
            for cond in STR_RE.findall(m.group(2)):
                problem = cond_problem(cond, m.group(1), axes)
                if problem:
                    out.append(problem)
    return out


def unstyled_problems(blk):
    """B3: помеченная клетка. Дефект предъявлен ровно тогда, когда пометка
    доезжает до матрицы, а доезжает она тем же meets(), что и ограничения.
    Значит и врёт она так же тихо: опечатка в ключе или в значении просто
    не совпадёт ни с одной клеткой, и дефект снова станет неотличим от
    покоя — только теперь в схеме будет стоять запись, обещающая обратное."""
    body = field_body(blk, "unstyled")
    if body is None:
        return []
    axes = axis_values(blk)
    states = states_of(blk)
    out = []
    for rec in PART_RE.findall(strip_comments(body)):
        for name in KEY_RE.findall(strip_quoted(rec)):
            if name not in UNSTYLED_FIELDS:
                out.append(f"«{name}» в записи unstyled — не поле пометки "
                           f"(можно {', '.join(UNSTYLED_FIELDS)})")
        why = re.search(r'\bwhy:\s*"([^"]*)"', rec)
        if why is None:
            out.append(f"запись unstyled без why — {' '.join(rec.split())}")
        elif why.group(1) not in UNSTYLED_WHY:
            out.append(f"причина «{why.group(1)}» у unstyled — не из словаря "
                       f"({', '.join(UNSTYLED_WHY)})")
        when = re.search(r"\bwhen:\s*\[([^\]]*)\]", rec)
        if when is None:
            out.append(f"запись unstyled без when — {' '.join(rec.split())}")
            continue
        for cond in STR_RE.findall(when.group(1)):
            problem = cond_problem(cond, "unstyled", axes, states)
            if problem:
                out.append(problem)
    return out


def axes_problems(blk):
    """E3: оси матрицы. Слот читает renderMatrix напрямую, без проверок:
    несуществующий ключ роняет страницу на axisValues(undefined), а один
    ключ в двух слотах даёт матрицу, которая врёт подписью — группы
    применяются последними и перетирают строку."""
    body = field_body(blk, "axes")
    if body is None:
        return []
    axes = axis_values(blk)
    states = states_of(blk)
    # осью может быть опция, модификатор, складывающееся состояние и
    # колонка состояний (если мгновенные состояния у схемы есть) — тот же
    # набор, что собирает isAxis() в kit.js
    known = set(axes) | (states & CARRIED)
    if states - CARRIED:
        known.add("state")
    out = []
    used = {}
    for slot, value in re.findall(r"\b(\w+):\s*(null|\"[^\"]*\")", strip_comments(body)):
        if slot not in AXES_SLOTS:
            out.append(f"«{slot}» в axes — не слот матрицы (можно {', '.join(AXES_SLOTS)})")
            continue
        if value == "null":
            continue
        key = value.strip('"')
        if key not in known:
            out.append(f"ось «{key}» в axes.{slot} — у схемы такой оси нет "
                       f"(есть {', '.join(sorted(known)) or '—'})")
        elif key in used:
            out.append(f"ось «{key}» стоит и в axes.{used[key]}, и в axes.{slot} — "
                       "слот группы перетирает слот строки, и матрица врёт подписью")
        else:
            used[key] = slot
    return out


def main():
    src = SRC.read_text(encoding="utf-8")
    bad = []
    all_ids = [field(blk, "id") for blk in blocks(src)]
    ids = set(all_ids) - {None}
    # E4: id — адрес карточки в ките: по нему на неё ссылается состав
    # организма и якорь на странице. Второй такой же не падает и не
    # подсвечивается: ссылка ведёт на первую карточку, а вторая выглядит
    # описанной, хотя на неё никто не ссылается.
    for ident in sorted({i for i in all_ids if i and all_ids.count(i) > 1}):
        bad.append(f"{ident}: id повторяется ({all_ids.count(ident)} карточки) — адрес должен быть один")
    for blk in blocks(src):
        ident = field(blk, "id") or "<без id>"

        missing = [k for k in COMMON_REQUIRED if not has_field(blk, k)]
        if missing:
            bad.append(f"{ident}: нет полей — {', '.join(missing)}")

        layer = field(blk, "layer")
        if layer is not None and layer not in LAYERS:
            bad.append(f"{ident}: слой «{layer}» вне {sorted(LAYERS)}")
        elif layer == "organism":
            miss_o = [k for k in ORGANISM_REQUIRED if not has_field(blk, k)]
            if miss_o:
                bad.append(f"{ident}: организму (E2) не хватает — {', '.join(miss_o)}")
            extra_o = [k for k in ORGANISM_FORBIDDEN if has_field(blk, k)]
            if extra_o:
                bad.append(f"{ident}: у организма (E2) не может быть — {', '.join(extra_o)}")
            # E2: компонент состава стоит ССЫЛКОЙ на карточку, а ссылка,
            # ведущая в никуда, обещает описание, которого нет. Часть без
            # карточки называется по имени (name) — это предъявленная
            # неполнота (E4), а не ссылка.
            parts_body = field_body(blk, "parts") or ""
            for ref in re.findall(r'\bof:\s*"([^"]*)"', parts_body):
                if ref not in ids:
                    bad.append(f"{ident}: состав ссылается на «{ref}» — карточки с таким id нет")
            for part in PART_RE.findall(parts_body):
                if "of:" not in part and "name:" not in part:
                    bad.append(f"{ident}: часть состава без of и без name — {part.strip()}")
        elif layer in ("atom", "molecule"):
            miss_l = [k for k in LEAF_REQUIRED if not has_field(blk, k)]
            if miss_l:
                bad.append(f"{ident}: {layer}у (E1) не хватает — {', '.join(miss_l)}")
        # layer отсутствует вовсе — уже отмечено выше через COMMON_REQUIRED;
        # какой набор довесить (E1 или E2), пока неизвестно, поэтому дальше
        # по слою не проверяем.

        # B5: словарь состояний закрыт.
        st = re.search(r"\n    states:\s*\[([^\]]*)\]", blk, re.S)
        if st:
            names = re.findall(r'"([^"]+)"', st.group(1))
            out = [n for n in names if n not in VOCAB]
            if out:
                bad.append(f"{ident}: состояния вне словаря — {', '.join(out)}")

        # C1/C2: имена — только name и ключи/значения options и modifiers.
        # usedIn (E1: единственное легальное место для адреса экрана),
        # purpose, content и snippet сюда не входят — там адрес и прозу не ловим.
        name_val = field(blk, "name")
        if name_val is not None and BANNED.search(name_val):
            bad.append(f"{ident}: имя «{name_val}» — похоже на класс/предметную область")
        for opt_key in ("options", "modifiers"):
            body = field_body(blk, opt_key)
            if body is None:
                continue
            for hit in banned_hits(body):
                bad.append(f"{ident}: {opt_key} содержит «{hit}» — похоже на класс/предметную область")
            for hit in bare_key_hits(body):
                bad.append(f"{ident}: {opt_key} содержит ключ «{hit}» — похоже на класс/предметную область")

        # B2: поля оси — из закрытого списка, ограничения — исполнимы.
        for problem in axis_problems(blk):
            bad.append(f"{ident}: {problem}")

        # B3/D2: пометки дефекта — исполнимы и из закрытого словаря причин.
        for problem in unstyled_problems(blk):
            bad.append(f"{ident}: {problem}")

        # E3: оси матрицы — существующие и по одной на слот.
        for problem in axes_problems(blk):
            bad.append(f"{ident}: {problem}")

        # A2: каталог теперь по слоям — поле group (адрес в старом
        # плоском каталоге) снимается. Старый формат (без layer, с group)
        # не должен ронять проверку — просто попадает в список нарушений.
        if has_field(blk, "group"):
            bad.append(f"{ident}: поле group осталось, каталог теперь по слоям")

    for line in bad:
        print(line)
    print(f"\nнарушений: {len(bad)}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
