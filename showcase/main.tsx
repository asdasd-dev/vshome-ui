import { StrictMode, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { marked } from "marked";
import "../src/styles.css";
import "../src/styles/fonts.css";
import { Card, Cluster, EmptyState, IconButton, Link, PageHeader, Prose, SectionHeader, Segment, Sheet, Stack, Switch, Table, Text, TextField, ThemeSwitch, ToastProvider, useMediaQuery, useTheme, MEDIA } from "../src";
import "../src/charts/charts.css";
import pkg from "../package.json";
import props from "./props.json";
import { componentDoc, families, GROUPS, guides, type StoryFile } from "./catalog";
import "./catalog.css";
import { TokensPage } from "./tokens-page";

type Route = { kind: "guide"; slug: string } | { kind: "component"; title: string } | { kind: "tokens" } | { kind: "frame"; title: string; index: number; theme: string; kiosk: boolean };
type PropRow = { name: string; type: string; required: boolean; default: string | null; deprecated: boolean };
type PropsInfo = Record<string, { file: string; props: PropRow[]; inherits: string | null }>;

const parse = (hash: string): Route => {
  const [kind, id, a, b, c] = hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
  if (kind === "frame" && id) return { kind: "frame", title: id, index: Number(a ?? 0), theme: b ?? "system", kiosk: c === "1" };
  if (kind === "c" && id) return { kind: "component", title: id };
  if (kind === "tokens") return { kind: "tokens" };
  return { kind: "guide", slug: id && kind === "g" ? id : guides[0]?.slug ?? "" };
};

const html = (md: string) => marked.parse(md, { async: false }) as string;

function useRoute() {
  const [route, setRoute] = useState(() => parse(location.hash));
  useEffect(() => {
    const on = () => { setRoute(parse(location.hash)); document.querySelector(".cat-main")?.scrollTo(0, 0); };
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return route;
}

function Nav({ query, route }: { query: string; route: Route }) {
  const q = query.trim().toLowerCase();
  const match = (s: string) => !q || s.toLowerCase().includes(q);
  const current = (href: string) => (route.kind === "guide" ? `#/g/${route.slug}` : route.kind === "tokens" ? "#/tokens" : `#/c/${route.title}`) === href;
  return (
    <Stack gap="4">
      <Stack gap="1">
        <SectionHeader title="Гайдлайны" as="h2" />
        {guides.filter((g) => match(g.title)).map((g) => <Link key={g.slug} href={`#/g/${g.slug}`} tone={current(`#/g/${g.slug}`) ? "accent" : "muted"}>{g.title}</Link>)}
        {match("Токены") && <Link href="#/tokens" tone={current("#/tokens") ? "accent" : "muted"}>Токены</Link>}
      </Stack>
      {GROUPS.map((group) => {
        const items = families.filter((f) => f.meta.group === group && (match(f.meta.title) || f.meta.components.some(match)));
        if (!items.length) return null;
        return (
          <Stack key={group} gap="1">
            <SectionHeader title={group} as="h2" count={items.length} />
            {items.map((f) => <Link key={f.meta.title} href={`#/c/${f.meta.title}`} tone={current(`#/c/${f.meta.title}`) ? "accent" : "muted"}>{f.meta.title}</Link>)}
          </Stack>
        );
      })}
    </Stack>
  );
}

function PropsTable({ name }: { name: string }) {
  const info = (props as PropsInfo)[name];
  if (!info) return null;
  return (
    <Stack gap="2">
      <Text variant="title" as="h3">{name}</Text>
      <Table caption={`Свойства ${name}`} dense rowKey={(r) => r.name} rows={info.props} empty="без свойств"
             columns={[
               { key: "name", label: "Свойство", nowrap: true, render: (r) => <code>{r.name}{r.required ? "" : "?"}{r.deprecated ? " · устарело" : ""}</code> },
               { key: "type", label: "Тип", render: (r) => <code className="cat-type">{r.type}</code> },
               { key: "default", label: "По умолчанию", nowrap: true, muted: true, render: (r) => (r.default ? <code>{r.default}</code> : "—") },
             ]} />
      {info.inherits && <Text variant="caption" tone="muted">Плюс все атрибуты {info.inherits}. Исходник: {info.file}</Text>}
      {!info.inherits && <Text variant="caption" tone="muted">Исходник: {info.file}</Text>}
    </Stack>
  );
}

type Viewport = "full" | "tablet" | "phone";
const WIDTH: Record<Viewport, number> = { full: 0, tablet: 820, phone: 390 };

function Frame({ title, index, width, theme, kiosk }: { title: string; index: number; width: number; theme: string; kiosk: boolean }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(160);
  useEffect(() => {
    const on = (e: MessageEvent) => { if (e.source === ref.current?.contentWindow && typeof e.data?.catHeight === "number") setHeight(e.data.catHeight); };
    addEventListener("message", on);
    return () => removeEventListener("message", on);
  }, []);
  const src = `#/frame/${encodeURIComponent(title)}/${index}/${theme}/${kiosk ? 1 : 0}`;
  return <iframe ref={ref} title={`${title}: пример ${index + 1}`} src={src} className="cat-frame" style={{ width, height }} />;
}

function FramePage({ title, index, theme, kiosk }: { title: string; index: number; theme: string; kiosk: boolean }) {
  const story = families.find((f) => f.meta.title === title)?.stories[index];
  useEffect(() => {
    if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
    const post = () => parent.postMessage({ catHeight: document.documentElement.scrollHeight }, "*");
    post();
    const ro = new ResizeObserver(post);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [theme]);
  if (!story) return null;
  return <div className={kiosk || story.kiosk ? "cat-frame-body vs-kiosk" : "cat-frame-body"}>{story.render()}</div>;
}

function ComponentPage({ family, kiosk, theme }: { family: StoryFile; kiosk: boolean; theme: string }) {
  const doc = componentDoc(family.meta.doc);
  const [viewport, setViewport] = useState<Viewport>("full");
  return (
    <Stack gap="6">
      <Text variant="display" as="h1">{family.meta.title}</Text>
      {doc ? <Prose html={html(doc.replace(/^#\s+.+\n/, ""))} /> : <EmptyState title="Нет страницы">docs/components/{family.meta.doc}.md</EmptyState>}
      <Stack gap="3">
        <Cluster justify="between" wrap>
          <SectionHeader title="Примеры" count={family.stories.length} />
          <Segment label="Ширина" size="sm" variant="soft" value={viewport} onChange={setViewport} options={[{ value: "full", label: "Компьютер" }, { value: "tablet", label: "Планшет" }, { value: "phone", label: "Телефон" }]} />
        </Cluster>
        {family.stories.map((s, i) => (
          <Card key={s.name} padding="none">
            <div className="cat-story-head"><Text variant="caption" tone="muted">{s.name}</Text></div>
            {viewport === "full"
              ? <div className={kiosk || s.kiosk ? "cat-story vs-kiosk" : "cat-story"}>{s.render()}</div>
              : <div className="cat-story cat-story--framed"><Frame title={family.meta.title} index={i} width={WIDTH[viewport]} theme={theme} kiosk={kiosk} /></div>}
          </Card>
        ))}
      </Stack>
      <Stack gap="4">
        <SectionHeader title="Свойства" />
        {family.meta.components.map((c) => <PropsTable key={c} name={c} />)}
      </Stack>
    </Stack>
  );
}

function App() {
  const route = useRoute();
  if (route.kind === "frame") return <FramePage title={route.title} index={route.index} theme={route.theme} kiosk={route.kiosk} />;
  return <Catalog route={route} />;
}

function Catalog({ route }: { route: Exclude<Route, { kind: "frame" }> }) {
  const { value: theme, set: setTheme } = useTheme({ key: "cat.theme" });
  const [kiosk, setKiosk] = useState(() => localStorage.getItem("cat.kiosk") === "1");
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const phone = useMediaQuery(MEDIA.phone);
  useEffect(() => setMenu(false), [route]);
  useEffect(() => localStorage.setItem("cat.kiosk", kiosk ? "1" : "0"), [kiosk]);
  const family = route.kind === "component" ? families.find((f) => f.meta.title === route.title) : undefined;
  const guide = route.kind === "guide" ? guides.find((g) => g.slug === route.slug) : undefined;
  const guideHtml = useMemo(() => (guide ? html(guide.md) : ""), [guide]);
  const nav = <Nav query={query} route={route} />;
  const controls = <><ThemeSwitch size={phone ? "sm" : "md"} value={theme} onChange={setTheme} />
                    <Cluster gap="2"><Text variant="caption" tone="muted">Киоск</Text><Switch label="Киоск" checked={kiosk} onChange={setKiosk} /></Cluster></>;
  const search = <TextField label="Поиск" hideLabel type="search" placeholder="Найти компонент" value={query} onChange={setQuery} size="sm" />;
  return (
    <div className="cat">
      <PageHeader sticky title="vshome-ui" sub={phone ? `v${pkg.version}` : `дизайн-система · v${pkg.version} · ${families.length} разделов`}
                  lead={phone ? <IconButton icon="menu" label="Разделы" variant="ghost" onClick={() => setMenu(true)} /> : undefined}
                  actions={phone ? undefined : controls} />
      <div className="cat-body">
        {!phone && <aside className="cat-side"><Stack gap="4">{search}{nav}</Stack></aside>}
        <main className="cat-main">
          {phone && <Sheet open={menu} onRequestClose={() => setMenu(false)} head="Разделы"><Stack gap="4"><Cluster wrap gap="3">{controls}</Cluster>{search}{nav}</Stack></Sheet>}
          {route.kind === "tokens" ? <div className={kiosk ? "vs-kiosk" : undefined}><TokensPage /></div>
            : family ? <ComponentPage family={family} kiosk={kiosk} theme={theme} />
            : guide ? <Prose html={guideHtml} />
            : <EmptyState title="Нет такой страницы" action={<Link href="#/">К началу</Link>} />}
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><ToastProvider><App /></ToastProvider></StrictMode>);
