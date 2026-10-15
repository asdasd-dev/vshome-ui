import { Cluster, Stat } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Stat", group: "Данные", components: ["Stat"], doc: "Stat" };

export const stories: StoryFile["stories"] = [
  {
    name: "Размеры",
    render: () => (
      <Cluster wrap gap="6" align="baseline">
        <Stat size="md" value="14:00" unit="через 40 мин" caption="Синк Deimos" />
        <Stat value="48 230" unit="₽" caption="Расходы за октябрь" />
        <Stat size="xl" value={12} unit="мин" caption="Груминг" />
      </Cluster>
    ),
  },
  {
    name: "Тоны",
    render: () => (
      <Cluster wrap gap="6">
        <Stat size="md" tone="muted" value="16:30" unit="через 3 ч" caption="Ретро" />
        <Stat size="md" tone="ok" value="31 400" unit="₽" caption="Еда · в пределах бюджета" />
        <Stat size="md" tone="warn" value={3} unit="мин" caption="Синк Deimos" />
        <Stat size="md" tone="danger" value={7} unit="мин идёт" caption="Груминг · без тебя" />
      </Cluster>
    ),
  },
  {
    name: "С иконкой",
    render: () => (
      <Cluster wrap gap="6">
        <Stat value="+8" unit="°C" icon={{ name: "weather-rainy", label: "Дождь" }} caption="Москва, до вечера" />
        <Stat size="md" value="89,99" unit="₽" icon={{ name: "check", label: "Цена ниже обычной" }} caption="Молоко 3,2%, 930 мл" />
      </Cluster>
    ),
  },
  {
    name: "Длинная подпись и без единицы",
    render: () => (
      <Cluster wrap gap="6">
        <Stat size="md" value={2} caption="Ждут ответа: Claude в personalai, Codex в monitoring" />
        <Stat size="md" value="—" tone="muted" caption="VPN: нет данных" />
      </Cluster>
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => (
      <Cluster wrap gap="6" align="baseline">
        <Stat size="xl" tone="warn" value={3} unit="мин" caption="Синк Deimos" />
        <Stat size="md" tone="muted" value="16:30" unit="через 3 ч" caption="Ретро" />
      </Cluster>
    ),
  },
];
