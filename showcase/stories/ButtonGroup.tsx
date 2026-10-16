import { useState } from "react";
import { ButtonGroup, Button, Cluster, Icon, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Gates() {
  const [last, setLast] = useState("—");
  const items = [1, 2, 5].map((n) => ({ label: String(n), ariaLabel: `Калитка ${n}`, onClick: () => setLast(`калитка ${n}`) }));
  return (
    <Stack gap="2">
      <Cluster wrap>
        <Button icon="door" onClick={() => setLast("парадная")}>Парадная</Button>
        <ButtonGroup label="Калитка" items={items} />
        <Button icon="gate" onClick={() => setLast("ворота")}>Ворота</Button>
      </Cluster>
      <Text variant="caption" tone="muted">Открыто: {last}</Text>
    </Stack>
  );
}

function Disabled() {
  return <ButtonGroup label="Этаж" items={[{ label: <Icon name="minus" size="sm" />, ariaLabel: "Ниже", onClick: () => {}, disabled: true }, { label: <Icon name="plus" size="sm" />, ariaLabel: "Выше", onClick: () => {} }]} />;
}

export const meta: StoryFile["meta"] = { title: "ButtonGroup", group: "Действия", components: ["ButtonGroup"], doc: "ButtonGroup" };

export const stories: StoryFile["stories"] = [
  { name: "Калитки", render: () => <Gates /> },
  { name: "Иконки и выключенная", render: () => <Disabled /> },
  { name: "В киоске", kiosk: true, render: () => <Gates /> },
];
