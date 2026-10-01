import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";
import { Button, Chip, Segment, Select, Sheet, Switch, ToastProvider, useToast, linkify } from "../src";

function Demo() {
  const toast = useToast();
  const [view, setView] = useState<"board" | "backlog">("board");
  const [agent, setAgent] = useState(true);
  const [domain, setDomain] = useState("personal-os");
  const [open, setOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [priority, setPriority] = useState<"high" | "normal" | "low">("normal");
  return (
    <main style={{ padding: "1rem", display: "grid", gap: "1rem", maxWidth: "40rem", background: "var(--vs-bg)", color: "var(--vs-ink)", fontFamily: "var(--vs-font)" }}>
      <h1 style={{ fontFamily: "var(--vs-font-display)", margin: 0 }}>vshome-ui</h1>
      <section style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <Button onClick={() => toast("Обычная кнопка")}>Обычная</Button>
        <Button variant="primary" onClick={() => toast("Апрув")}>Апрув</Button>
        <Button variant="danger">На доработку</Button>
        <Button disabled>Занята</Button>
      </section>
      <Segment ariaLabel="Вид" value={view} onChange={setView} options={[{ value: "board", label: "Доска" }, { value: "backlog", label: "Бэклог" }]} />
      <section style={{ display: "flex", gap: ".3rem" }}>
        {["personal-os", "personal"].map((d) => <Chip key={d} pressed={d === domain} onClick={() => setDomain(d)}>{d}</Chip>)}
        <Chip>PR 1 · open</Chip>
      </section>
      <section style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Switch checked={agent} onChange={setAgent} label="Делает агент" icon="🤖" />
        <Switch checked={agent} onChange={setAgent} label="Делает агент (плитка)" icon="🤖" size="sm" />
      </section>
      <Select label="Приоритет" value={priority} onChange={setPriority} options={[{ value: "high", label: "🔴 высокий" }, { value: "normal", label: "🟡 обычный" }, { value: "low", label: "🟢 низкий" }]} />
      <p>{linkify("Ссылка: https://vshome.space и [доска](https://tasks.vshome.space).").map((p, i) => (p.url ? <a key={i} href={p.url}>{p.text}</a> : <span key={i}>{p.text}</span>))}</p>
      <Button onClick={() => { setDirty(false); setOpen(true); }}>Открыть Sheet</Button>
      <Sheet
        open={open}
        head="T-121 · Review"
        actions={<button type="button" onClick={() => setDirty(true)}>Изменить</button>}
        onRequestClose={() => {
          if (dirty && !confirm("Есть несохранённые правки. Выйти без сохранения?")) return false;
          setOpen(false);
          return true;
        }}
        footer={<><Button variant="danger">На доработку</Button><Button variant="primary" onClick={() => { setOpen(false); toast("T-121: Всё смёржено"); }}>Апрув</Button></>}
      >
        <h2 style={{ marginTop: 0 }}>Карточка задачи</h2>
        {Array.from({ length: 30 }, (_, i) => <p key={i}>Строка {i + 1} — проверка прокрутки тела при закреплённых шапке и подвале.</p>)}
        <Select label="Приоритет" value={priority} onChange={setPriority} options={[{ value: "high", label: "🔴 высокий" }, { value: "normal", label: "🟡 обычный" }, { value: "low", label: "🟢 низкий" }]} />
        <textarea rows={3} onInput={() => setDirty(true)} />
        <Button onClick={() => toast("Тост поверх листа")}>Тост внутри листа</Button>
      </Sheet>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider><Demo /></ToastProvider>
  </StrictMode>,
);
