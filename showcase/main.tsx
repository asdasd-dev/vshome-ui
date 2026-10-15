import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { marked } from "marked";
import "../src/styles.css";
import "../src/styles/fonts.css";
import { Card, Cluster, Disclosure, EmptyState, Link, PageHeader, Prose, SectionHeader, Segment, Stack, Switch, Table, Text, TextField, ToastProvider } from "../src";
import "../src/charts/charts.css";
import pkg from "../package.json";
import props from "./props.json";
import { componentDoc, families, GROUPS, guides, type StoryFile } from "./catalog";
import "./catalog.css";
import { TokensPage } from "./tokens-page";

type Theme = "system" | "light" | "dark";
type Route = { kind: "guide"; slug: string } | { kind: "component"; title: string } | { kind: "tokens" };
type PropRow = { name: string; type: string; required: boolean; default: string | null; deprecated: boolean };
type PropsInfo = Record<string, { file: string; props: PropRow[]; inherits: string | null }>;

const parse = (hash: string): Route => {
  const [kind, id] = decodeURIComponent(hash.replace(/^#\/?/, "")).split("/");
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

function ComponentPage({ family, kiosk }: { family: StoryFile; kiosk: boolean }) {
  const doc = componentDoc(family.meta.doc);
  return (
    <Stack gap="6">
      <Text variant="display" as="h1">{family.meta.title}</Text>
      {doc ? <Prose html={html(doc.replace(/^#\s+.+\n/, ""))} /> : <EmptyState title="Нет страницы">docs/components/{family.meta.doc}.md</EmptyState>}
      <Stack gap="3">
        <SectionHeader title="Примеры" count={family.stories.length} />
        {family.stories.map((s) => (
          <Card key={s.name} padding="none">
            <div className="cat-story-head"><Text variant="caption" tone="muted">{s.name}</Text></div>
            <div className={kiosk || s.kiosk ? "cat-story vs-kiosk" : "cat-story"}>{s.render()}</div>
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
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("cat.theme") as Theme) || "system");
  const [kiosk, setKiosk] = useState(() => localStorage.getItem("cat.kiosk") === "1");
  const [query, setQuery] = useState("");
  useEffect(() => {
    localStorage.setItem("cat.theme", theme);
    if (theme === "system") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => localStorage.setItem("cat.kiosk", kiosk ? "1" : "0"), [kiosk]);
  const family = route.kind === "component" ? families.find((f) => f.meta.title === route.title) : undefined;
  const guide = route.kind === "guide" ? guides.find((g) => g.slug === route.slug) : undefined;
  const guideHtml = useMemo(() => (guide ? html(guide.md) : ""), [guide]);
  const nav = <Nav query={query} route={route} />;
  return (
    <div className="cat">
      <PageHeader sticky title="vshome-ui" sub={`дизайн-система · v${pkg.version} · ${families.length} разделов`}
                  actions={<>
                    <Segment label="Тема" variant="soft" value={theme} onChange={setTheme} options={[{ value: "system", label: "Система" }, { value: "light", label: "Светлая" }, { value: "dark", label: "Тёмная" }]} />
                    <Cluster gap="2"><Text variant="caption" tone="muted">Киоск</Text><Switch label="Киоск" checked={kiosk} onChange={setKiosk} /></Cluster>
                  </>} />
      <div className="cat-body">
        <aside className="cat-side">
          <Stack gap="4">
            <TextField label="Поиск" hideLabel type="search" placeholder="Найти компонент" value={query} onChange={setQuery} size="sm" />
            <div className="cat-nav-wide">{nav}</div>
            <div className="cat-nav-narrow"><Disclosure summary="Разделы">{nav}</Disclosure></div>
          </Stack>
        </aside>
        <main className="cat-main">
          {route.kind === "tokens" ? <div className={kiosk ? "vs-kiosk" : undefined}><TokensPage /></div>
            : family ? <ComponentPage family={family} kiosk={kiosk} />
            : guide ? <Prose html={guideHtml} />
            : <EmptyState title="Нет такой страницы" action={<Link href="#/">К началу</Link>} />}
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><ToastProvider><App /></ToastProvider></StrictMode>);
