import { useState } from "react";
import { Artwork, Button, Grid, IconButton, Price, Snippet, Tag, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Product({ name, price, old, gone }: { name: string; price: number; old?: number; gone?: boolean }) {
  const [fav, setFav] = useState(false);
  const [inList, setInList] = useState(false);
  return (
    <Snippet href="#/c/Snippet" title={name} tone={gone ? "muted" : "default"}
      media={<Artwork size="lg" fit="contain" fallback="🥫" />}
      corner={<IconButton icon="star" size="sm" variant="ghost" pressed={fav} label={fav ? "Убрать из избранного" : "В избранное"} onClick={() => setFav(!fav)} />}
      meta={<><Text variant="footnote" tone="muted">★ 4,8 · 975 отзывов</Text><Text variant="footnote" tone="muted">70 ккал · Б 0 · Ж 0 · У 16</Text></>}
      price={<><Price value={price} old={old} note="по карте" tone="deal" size="sm" gone={gone} />{old && !gone ? <Tag size="sm" tone="ok">−30% к обычной</Tag> : null}</>}
      tags={<><Text variant="footnote" tone="muted">осталось 76 шт · 188,21 ₽/л</Text>{gone && <Tag size="sm" tone="muted">нет в наличии</Tag>}</>}
      actions={<><Button size="sm" variant="ghost" icon="cart" pressed={inList} onClick={() => setInList(!inList)}>{inList ? "В списке" : "В список"}</Button><Button size="sm" variant="ghost">Не показывать</Button></>} />
  );
}

export const meta: StoryFile["meta"] = { title: "Snippet", group: "Поверхности", components: ["Snippet"], doc: "Snippet" };

export const stories: StoryFile["stories"] = [
  {
    name: "Товар в выдаче",
    render: () => (
      <Grid min="md" gap="3">
        <Product name="Ананасы 365 ДНЕЙ кольца в сиропе, 425 мл" price={7999} old={11420} />
        <Product name="Маслины с косточкой ЛЕНТА черные крупные, 300 г" price={13999} />
        <Product name="Хлеб Бородинский нарезка" price={6490} gone />
      </Grid>
    ),
  },
  {
    name: "Без картинки и действий",
    render: () => <Snippet href="#/c/Snippet" title="T-411 · Каталог дизайн-системы" meta={<Text variant="footnote" tone="muted">Review · claude-code</Text>} />,
  },
];
