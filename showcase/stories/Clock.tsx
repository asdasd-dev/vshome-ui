import { useEffect, useState } from "react";
import { Clock, Cluster, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Live() {
  const fmt = () => new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  const [now, setNow] = useState(fmt);
  useEffect(() => {
    const t = setInterval(() => setNow(fmt()), 10_000);
    return () => clearInterval(t);
  }, []);
  return (
    <Stack gap="1" align="center">
      <Clock size="hero" align="center">{now}</Clock>
      <Text tone="muted">чт, 15 октября</Text>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "Clock", group: "Текст и медиа", components: ["Clock"], doc: "Clock" };

export const stories: StoryFile["stories"] = [
  { name: "Размеры", render: () => <Cluster gap="6" align="baseline"><Clock>10:46</Clock><Clock size="xl">10:46</Clock><Clock size="hero">10:46</Clock></Cluster> },
  { name: "Насыщенность и тон", render: () => <Cluster gap="6" align="baseline"><Clock weight="semibold">10:46</Clock><Clock tone="soft">10:46</Clock></Cluster> },
  { name: "Таймер встречи", render: () => <Stack gap="1"><Text variant="label" tone="muted">До Deimos PBR</Text><Clock size="xl" weight="semibold">04:59</Clock></Stack> },
  { name: "Ночная стена", kiosk: true, render: () => <Live /> },
];
