import { useState } from "react";
import { Checkbox, RadioGroup, Stack } from "../../src";
import type { StoryFile } from "../catalog";

function Shopping({ size }: { size?: "md" | "lg" }) {
  const [done, setDone] = useState<Record<string, boolean>>({ milk: true });
  const items = [
    { id: "milk", label: "Молоко 3,2%", hint: "2 шт · 89 ₽" },
    { id: "bread", label: "Хлеб бородинский", hint: "1 шт · 54 ₽" },
    { id: "eggs", label: "Яйца С1", hint: "10 шт · 119 ₽" },
  ];
  return (
    <Stack gap="2">
      {items.map((i) => (
        <Checkbox key={i.id} size={size} label={i.label} hint={i.hint} checked={!!done[i.id]} onChange={(v) => setDone({ ...done, [i.id]: v })} />
      ))}
    </Stack>
  );
}

function Settings() {
  const [digest, setDigest] = useState(true);
  return (
    <Stack gap="2">
      <Checkbox label="Присылать сводку в Mattermost" checked={digest} onChange={setDigest} />
      <Checkbox label="Звонок в Telegram" hint="Бот не подключён" checked={false} onChange={() => undefined} disabled />
    </Stack>
  );
}

function Remind({ direction, size, disabled }: { direction?: "column" | "row"; size?: "md" | "lg"; disabled?: boolean }) {
  const [when, setWhen] = useState<"15m" | "1h" | "morning">("15m");
  return (
    <RadioGroup legend="Когда напомнить о встрече" direction={direction} size={size} disabled={disabled} value={when} onChange={setWhen} options={[
      { value: "15m", label: "За 15 минут" },
      { value: "1h", label: "За час" },
      { value: "morning", label: "Утром в день встречи", hint: "В 9:00, если встреча после обеда" },
    ]} />
  );
}

function Priority() {
  const [p, setP] = useState<"low" | "normal" | "high">("normal");
  return (
    <RadioGroup legend="Приоритет задачи" hideLegend direction="row" value={p} onChange={setP} options={[
      { value: "low", label: "Низкий" },
      { value: "normal", label: "Обычный" },
      { value: "high", label: "Срочный", disabled: true },
    ]} />
  );
}

export const meta: StoryFile["meta"] = { title: "Checkbox", group: "Выбор и ввод", components: ["Checkbox", "RadioGroup"], doc: "Checkbox" };

export const stories: StoryFile["stories"] = [
  { name: "Список покупок, размер lg", render: () => <Shopping size="lg" /> },
  { name: "Параметры формы и выключенный", render: () => <Settings /> },
  { name: "RadioGroup", render: () => <Remind /> },
  { name: "RadioGroup в строку, без заголовка", render: () => <Priority /> },
  { name: "RadioGroup размера lg", render: () => <Remind size="lg" /> },
  { name: "RadioGroup выключена целиком", render: () => <Remind disabled /> },
  { name: "В киоске", kiosk: true, render: () => <Stack gap="4"><Shopping size="lg" /><Remind direction="row" /></Stack> },
];
