import { useState } from "react";
import { Card, ContextMenu, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Actions() {
  const [last, setLast] = useState("—");
  return (
    <Stack gap="2">
      <ContextMenu items={[
        { label: "Открыть карточку", onSelect: () => setLast("Открыть карточку") },
        { label: "Скопировать T-133", onSelect: () => setLast("Скопировать T-133") },
        "separator",
        { label: "Удалить", onSelect: () => setLast("Удалить"), disabled: true },
      ]}>
        <div><Card><Text>T-133 · правый клик или долгое нажатие</Text></Card></div>
      </ContextMenu>
      <Text variant="caption" tone="muted">Последнее действие: {last}</Text>
    </Stack>
  );
}

function Choices() {
  const [status, setStatus] = useState("doing");
  const [agent, setAgent] = useState(true);
  return (
    <ContextMenu items={[
      { label: "Статус", value: status, options: [{ value: "planned", label: "To do" }, { value: "doing", label: "Doing" }, { value: "review", label: "Review" }], onValueChange: setStatus },
      "separator",
      { label: "Делает агент", checked: agent, onCheckedChange: setAgent },
    ]}>
      <div><Card stripe="accent"><Text>T-411 · {status} · {agent ? "агент" : "вручную"}</Text></Card></div>
    </ContextMenu>
  );
}

function NoLongPress() {
  const [count, setCount] = useState(0);
  return (
    <ContextMenu longPress={false} items={[{ label: "Отметить прочитанным", onSelect: () => setCount(count + 1) }]}>
      <div><Card><Text>Пост в Ленте · меню только по правому клику, касание остаётся странице ({count})</Text></Card></div>
    </ContextMenu>
  );
}

export const meta: StoryFile["meta"] = { title: "ContextMenu", group: "Поверхности", components: ["ContextMenu"], doc: "ContextMenu" };

export const stories: StoryFile["stories"] = [
  { name: "Действия и разделитель", render: () => <Actions /> },
  { name: "Флажок и выбор одного", render: () => <Choices /> },
  { name: "Без долгого нажатия", render: () => <NoLongPress /> },
  {
    name: "Выключено",
    render: () => (
      <ContextMenu disabled items={[{ label: "Открыть", onSelect: () => {} }]}>
        <div><Card tone="muted"><Text tone="muted">Закрытая задача · меню не открывается</Text></Card></div>
      </ContextMenu>
    ),
  },
];
