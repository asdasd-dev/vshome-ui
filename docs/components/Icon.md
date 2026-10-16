# Icon

Значок из набора дизайн-системы: один путь SVG 24×24, цвет берётся из текста (`currentColor`). Имена — `IconName`, полный список — `ICON_NAMES`.

## Когда применять

- Значок внутри компонента: `icon` у [Button](#/c/Button), [Tag](#/c/Tag), [Tabs](#/c/Tabs).
- Погода на стене: `weather-*` по коду состояния.
- Пометка в строке: `alert`, `check`, `clock`.
- Действия в кнопках и меню: `edit`, `trash`, `copy`, `refresh`, `filter`, `settings`, `link`.
- Ленты и покупки: `cart`, `tag`, `percent`, `heart` / `heart-filled` (отслеживать), `star` / `star-outline` (рейтинг).
- Разделы и навигация: `home`, `list`, `chart`, `calendar`, `bell`, `user`, стрелки `arrow-*` и `chevron-*`.
- Дом и сервисы: `server`, `wifi`, `lock`, `door`, `gate`, `lightbulb`, `robot`, `message`, `music`, `video`, `album`.
- События и досуг на «Столе»: `presentation`, `ticket`, `beach`, `soccer`, `volleyball`, `hockey`, `basketball`; оценка — `thumb-up`, `thumb-down`; дело из списка задач — `task`, событие на весь день — `calendar`.

Полный список с подписями — в примере «Все иконки» ниже.

## Когда не применять

- Кнопка из одной иконки — [IconButton](#/c/IconButton): у неё подпись и размер касания.
- Обложка, аватар, картинка — [Artwork](#/c/Artwork).
- Точка статуса — [StatusDot](#/c/Legend) или [Badge](#/c/Badge) `dot`.
- Нужной иконки нет — добавить путь в `icons.ts` дизайн-системы, а не вставлять SVG на сайте.

## Анатомия

1. `svg` с `viewBox="0 0 24 24"`, один `path`, заливка `currentColor`.
2. `data-icon` — имя иконки, для тестов.

## Размеры

| `size` | Сторона | Когда |
|---|---|---|
| `sm` | `--vs-space-4`, 16px | рядом с мелким текстом, стрелка [Disclosure](#/c/Disclosure) |
| `md` (по умолчанию) | `--vs-space-5`, 20px | кнопки, вкладки |
| `lg` | `--vs-space-6`, 24px | отдельный значок, погода |
| `em` | 1em | внутри текста, по кеглю строки |

## Варианты

- `tone` — цвет из общего набора: `accent`, `ok`, `warn`, `danger`, `muted`, `violet`, `pink`, `gold`. Без `tone` иконка берёт цвет текста.
- `tone="lamp"` — жёлтый `--vs-lamp` со свечением: горящая лампа, включённый свет.

## В киоске

`sm`, `md`, `lg` растут на `--vs-scale` вместе с отступами; `em` следует за кеглем текста.

## Доступность

- Без `label` иконка скрыта от скринридера (`aria-hidden`): она дублирует текст рядом.
- С `label` — `role="img"` и `aria-label`: когда иконка одна несёт смысл («облачно» у температуры).

## Делай / не делай

| Делай | Не делай |
|---|---|
| Цвет через `tone`, `color` родителя или тон компонента | Перекрашивать `path` своим `fill` |
| `label` у иконки, которая заменяет слово | `label` у иконки рядом с тем же словом |
| `size="em"` внутри строки текста | Подбирать `width: 17px` вручную |
| Новую иконку — в `icons.ts` | Вставлять чужой SVG прямо в сайт |

## Связанные

[IconButton](#/c/IconButton) · [Button](#/c/Button) · [Artwork](#/c/Artwork) · [Badge](#/c/Badge)
