import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";
import "../src/styles/fonts.css";
import { Banner, Button, Chip, ContextMenu, IconButton, List, ListRow, Segment, Select, Sheet, Slider, SplitButton, Stat, Switch, Tile, ToastProvider, useToast, linkify } from "../src";
import { ChartCard, LineChart, StackedBars, chartPalette, outageBands } from "../src/charts";

const T0 = Math.floor(new Date(2026, 9, 1).getTime() / 1000);
const wave = (k: number) => Array.from({ length: 96 }, (_, i) => (i > 40 && i < 46 ? null : Math.round(60 + 30 * Math.sin(i / 8 + k) + k * 15)));
const alive = Array.from({ length: 96 }, (_, i) => (i > 60 && i < 66 ? 0 : 1));

function Panels({ kiosk }: { kiosk?: boolean }) {
  return (
    <section className={kiosk ? "vs-kiosk" : undefined} style={{ display: "grid", gap: "var(--vs-space-4)", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", padding: "var(--vs-space-4)", background: "var(--vs-surface-0)", borderRadius: "var(--vs-radius-lg)" }}>
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Banner tone="warn">Мак не на связи с 14:02</Banner>
        <Stat value="10:46" size="md" />
      </div>
      <Tile label="Встреча · 11:15" tone="warn" footer={<Button variant="primary">Войти</Button>}>
        <Stat value={1} unit="мин" caption="Deimos PBR" size="xl" tone="warn" />
      </Tile>
      <Tile label="Ждут тебя · 2" aside="1 работает" tone="warn">
        <List max={4}>
          <ListRow lead="14 мин" title="GD · BX-55704" sub="Делать новости до четырёх или сначала скажешь?" tone="warn" onClick={() => {}} />
          <ListRow lead="2 мин" title="Опрос Avito" sub="Нужно разрешение: git push" subTone="warn" onClick={() => {}} />
        </List>
      </Tile>
      <Tile label="Музыка" footer={<div style={{ display: "flex", gap: "var(--vs-space-2)" }}><IconButton icon="prev" label="Предыдущий" /><IconButton icon="pause" label="Пауза" variant="primary" /><IconButton icon="next" label="Следующий" /></div>}>
        <Stat value="If You Need Someone" caption="The Field Mice" size="md" />
      </Tile>
      <Tile label="Сегодня">
        <List empty="встреч нет">
          <ListRow lead="11:00" title="AI Demo №4" />
          <ListRow lead="11:15" title="Deimos PBR" />
        </List>
      </Tile>
      <Tile label="Свет">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--vs-space-2)" }}><SplitButton pressed more={{ label: "Кухня: лампы", onClick: () => {} }} onClick={() => {}}>Кухня · 2</SplitButton><SplitButton more={{ label: "Спальня: лампы", onClick: () => {} }} onClick={() => {}}>Спальня</SplitButton><Button pressed>Баня</Button></div>
        <Switch label="Большая лента" checked onChange={() => {}} />
        <Slider label="Большая лента: яркость" value={70} format={(v) => `${v}%`} onCommit={() => {}} />
      </Tile>
    </section>
  );
}

function Demo() {
  const toast = useToast();
  const [view, setView] = useState<"board" | "backlog">("board");
  const [agent, setAgent] = useState(true);
  const [domain, setDomain] = useState("personal-os");
  const [open, setOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [priority, setPriority] = useState<"high" | "normal" | "low">("normal");
  const [status, setStatus] = useState("doing");
  return (
    <main style={{ padding: "1rem", display: "grid", gap: "1rem", maxWidth: "72rem", background: "var(--vs-bg)", color: "var(--vs-ink)", fontFamily: "var(--vs-font)" }}>
      <h1 style={{ fontFamily: "var(--vs-font-display)", margin: 0 }}>vshome-ui</h1>
      <h2 style={{ margin: 0 }}>Панели</h2>
      <Panels />
      <h2 style={{ margin: 0 }}>Панели · киоск</h2>
      <Panels kiosk />
      <section style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
        <Button onClick={() => toast("Обычная кнопка")}>Обычная</Button>
        <Button variant="primary" onClick={() => toast("Апрув")}>Апрув</Button>
        <Button variant="danger">На доработку</Button>
        <Button disabled>Занята</Button>
        <Button size="sm">Открыть в Толке</Button>
      </section>
      <Segment ariaLabel="Вид" value={view} onChange={setView} options={[{ value: "board", label: "Доска" }, { value: "backlog", label: "Бэклог" }]} />
      <Segment ariaLabel="Вид (soft)" variant="soft" value={view} onChange={setView} options={[{ value: "board", label: "Доска" }, { value: "backlog", label: "Бэклог" }]} />
      <section style={{ display: "flex", gap: ".3rem" }}>
        {["personal-os", "personal"].map((d) => <Chip key={d} pressed={d === domain} onClick={() => setDomain(d)}>{d}</Chip>)}
        <Chip>PR 1 · open</Chip>
      </section>
      <section style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Switch checked={agent} onChange={setAgent} label="Делает агент" icon="🤖" />
        <Switch checked={agent} onChange={setAgent} label="Делает агент (плитка)" icon="🤖" size="sm" />
      </section>
      <Select label="Приоритет" value={priority} onChange={setPriority} options={[{ value: "high", label: "🔴 высокий" }, { value: "normal", label: "🟡 обычный" }, { value: "low", label: "🟢 низкий" }]} />
      <ContextMenu items={[
        { label: "Открыть карточку", onSelect: () => toast("Открыть T-133") },
        { label: "Скопировать T-133", onSelect: () => toast("Скопировано") },
        "separator",
        { label: "Статус", value: status, options: [{ value: "planned", label: "To do" }, { value: "doing", label: "Doing" }, { value: "review", label: "Review" }], onValueChange: setStatus },
        "separator",
        { label: "🤖 Делает агент", checked: agent, onCheckedChange: setAgent },
      ]}>
        <div style={{ padding: "1rem", border: "1px dashed var(--vs-line)", borderRadius: "var(--vs-radius)" }}>Правый клик или долгое нажатие · {status}</div>
      </ContextMenu>
      <p>{linkify("Ссылка: https://vshome.space и [доска](https://tasks.vshome.space).").map((p, i) => (p.url ? <a key={i} href={p.url}>{p.text}</a> : <span key={i}>{p.text}</span>))}</p>
      <ChartCard title="Задержка выходов" sub="полосы — нет связи, линия рвётся на пропусках" legend={[{ name: "Швеция", color: chartPalette[0] }, { name: "Германия", color: chartPalette[2], extra: "доступен 97%" }]}>
        <LineChart t0={T0} step={1800} unit=" мс" bands={outageBands(alive)} bandLabel="VPN не работал" marks={[{ i: 30, label: "выкатка abc123" }, { i: 70, dashed: true, label: "перезапуск" }]}
          series={[{ name: "Швеция", color: chartPalette[0], data: wave(0), fmt: (v) => `${v} мс` }, { name: "Германия", color: chartPalette[2], data: wave(1), fmt: (v) => `${v} мс` }]} />
      </ChartCard>
      <ChartCard title="Расход по дням" sub="столбики с накоплением" legend={[{ name: "Мак", color: chartPalette[0] }, { name: "бокс", color: chartPalette[1] }]}>
        <StackedBars labels={["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04"]} fmt={(v) => `$${Math.round(v)}`}
          series={[{ name: "Мак", color: chartPalette[0], data: [12, 30, 8, 22] }, { name: "бокс", color: chartPalette[1], data: [5, 0, 14, 9] }]} />
      </ChartCard>
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
