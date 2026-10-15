import { useState } from "react";
import { Field, Stack, TextArea, TextField } from "../../src";
import type { StoryFile } from "../catalog";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <Stack gap="3">
      <TextField label="Название задачи" placeholder="Починить автополив" value={title} onChange={setTitle}
                 error={title.trim() ? undefined : "Укажите название задачи"} />
      <TextArea label="Описание" hint="Где найдено, чем грозит, что предлагаю" value={body} onChange={setBody} />
    </Stack>
  );
}

function Search({ size }: { size?: "sm" | "md" }) {
  const [q, setQ] = useState("");
  return <TextField type="search" label="Поиск товаров" hideLabel placeholder="Гречка, молоко…" size={size} value={q} onChange={setQ} />;
}

function AddItem() {
  const [v, setV] = useState("");
  return <TextField label="Новый пункт" hideLabel variant="dashed" placeholder="Добавить в список" value={v} onChange={setV} />;
}

function Custom() {
  const [due, setDue] = useState("2026-10-20");
  return (
    <Field label="Срок задачи" hint="Карточка покраснеет на доске в этот день" error={due ? undefined : "Укажите срок"}>
      {(p) => <input {...p} type="date" value={due} onChange={(e) => setDue(e.target.value)} />}
    </Field>
  );
}

export const meta: StoryFile["meta"] = { title: "Field", group: "Выбор и ввод", components: ["Field", "TextField", "TextArea"], doc: "Field" };

export const stories: StoryFile["stories"] = [
  { name: "Форма с ошибкой и подсказкой", render: () => <TaskForm /> },
  { name: "Поиск и размеры", render: () => <Stack gap="3"><Search /><Search size="sm" /></Stack> },
  { name: "Пунктирный", render: () => <AddItem /> },
  { name: "Выключенный", render: () => <TextField label="Цена, ₽" inputMode="decimal" value="89" onChange={() => undefined} disabled hint="Цена из чека, менять нельзя" /> },
  { name: "Свой элемент в Field", render: () => <Custom /> },
];
