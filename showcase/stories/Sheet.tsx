import { useState } from "react";
import { Button, IconButton, KeyValue, Sheet, Stack, Text, TextArea } from "../../src";
import type { StoryFile } from "../catalog";

function Basic() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть T-121</Button>
      <Sheet open={open} onRequestClose={() => setOpen(false)} head="T-121 · Review"
        footer={<><Button variant="danger" onClick={() => setOpen(false)}>На доработку</Button><Button variant="primary" onClick={() => setOpen(false)}>Апрув</Button></>}>
        <Stack gap="3">
          <Text variant="title">Каталог дизайн-системы</Text>
          <Text>Страницы компонентов с гайдлайнами и живыми примерами. Сборка витрины зелёная.</Text>
        </Stack>
      </Sheet>
    </>
  );
}

function Guarded() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  return (
    <>
      <Button onClick={() => { setNote(""); setOpen(true); }}>Комментарий к задаче</Button>
      <Sheet open={open} head="T-133 · комментарий"
        onRequestClose={() => {
          if (note && !confirm("Комментарий не отправлен. Закрыть?")) return false;
          setOpen(false);
        }}
        footer={<Button variant="primary" disabled={!note} onClick={() => setOpen(false)}>Отправить</Button>}>
        <TextArea label="Комментарий" value={note} onChange={setNote} />
      </Sheet>
    </>
  );
}

function Long() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Журнал деплоя</Button>
      <Sheet open={open} onRequestClose={() => setOpen(false)} head="monitoring · deploy.sh"
        actions={<IconButton icon="external" label="Открыть в Grafana" />}>
        <Stack gap="2">
          {Array.from({ length: 40 }, (_, i) => <Text key={i} tone="muted">{`10:${String(i).padStart(2, "0")} шаг ${i + 1}: ок`}</Text>)}
        </Stack>
      </Sheet>
    </>
  );
}

function Kiosk() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Встреча · 11:15</Button>
      <Sheet className="vs-kiosk" open={open} onRequestClose={() => setOpen(false)} head="Deimos PBR"
        footer={<Button variant="primary" onClick={() => setOpen(false)}>Войти</Button>}>
        <KeyValue items={[{ label: "Начало", value: "11:15" }, { label: "Где", value: "KTalk" }]} />
      </Sheet>
    </>
  );
}

export const meta: StoryFile["meta"] = { title: "Sheet", group: "Поверхности", components: ["Sheet"], doc: "Sheet" };

export const stories: StoryFile["stories"] = [
  { name: "Шапка и подвал", render: () => <Basic /> },
  { name: "Защита от потери правок", render: () => <Guarded /> },
  { name: "Длинное тело и действие в шапке", render: () => <Long /> },
  { name: "В киоске", kiosk: true, render: () => <Kiosk /> },
];
