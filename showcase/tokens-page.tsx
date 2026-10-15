import type { CSSProperties } from "react";
import { Card, Cluster, SectionHeader, Stack, Text } from "../src";

const COLORS = ["bg", "panel", "surface-2", "ink", "muted", "line", "accent", "ok", "warn", "danger", "lamp", "violet", "pink", "gold", "accent-soft", "accent-tint", "ok-soft", "warn-soft", "danger-soft", "violet-soft", "pink-soft", "gold-soft"];
const SPACE = ["0_5", "1", "1_5", "2", "3", "4", "5", "6", "8", "10", "12"];
const RADIUS = ["xs", "sm", "md", "lg", "xl", "pill"];
const TEXT = ["4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs", "2xs"];

const swatch = (name: string): CSSProperties => ({ background: `var(--vs-${name})`, width: "100%", height: "var(--vs-space-10)", borderRadius: "var(--vs-radius-sm)", border: "1px solid var(--vs-line)" });

export function TokensPage() {
  return (
    <Stack gap="8">
      <Text variant="display" as="h1">Токены</Text>
      <Text tone="muted">Живые значения текущей темы и масштаба. Переключите тему и киоск вверху — образцы изменятся.</Text>
      <Stack gap="3">
        <SectionHeader title="Цвета" count={COLORS.length} />
        <div className="cat-tokens-grid">
          {COLORS.map((c) => <Card key={c} padding="sm"><Stack gap="2"><div style={swatch(c)} /><Text variant="caption"><code>--vs-{c}</code></Text></Stack></Card>)}
        </div>
      </Stack>
      <Stack gap="3">
        <SectionHeader title="Отступы" />
        {SPACE.map((s) => <Cluster key={s} gap="3"><Text variant="caption" className="cat-token-name"><code>--vs-space-{s}</code></Text><div style={{ width: `var(--vs-space-${s})`, height: "var(--vs-space-3)", background: "var(--vs-accent)", borderRadius: "var(--vs-radius-xs)" }} /></Cluster>)}
      </Stack>
      <Stack gap="3">
        <SectionHeader title="Текст" />
        {TEXT.map((t) => <Cluster key={t} gap="3" align="baseline"><Text variant="caption" className="cat-token-name"><code>--vs-text-{t}</code></Text><span style={{ fontSize: `var(--vs-text-${t})`, lineHeight: `var(--vs-leading-${t})` }}>Встреча через 5 минут</span></Cluster>)}
      </Stack>
      <Stack gap="3">
        <SectionHeader title="Скругления и тени" />
        <Cluster gap="4" wrap>
          {RADIUS.map((r) => <Stack key={r} gap="1" align="center"><div style={{ width: "var(--vs-space-12)", height: "var(--vs-space-12)", background: "var(--vs-surface-2)", borderRadius: `var(--vs-radius-${r})` }} /><Text variant="caption"><code>{r}</code></Text></Stack>)}
          <Card elevated padding="sm"><Text variant="caption"><code>--vs-shadow-card</code></Text></Card>
          <Card padding="sm"><div style={{ boxShadow: "var(--vs-shadow-popover)", padding: "var(--vs-space-2)", borderRadius: "var(--vs-radius)" }}><Text variant="caption"><code>--vs-shadow-popover</code></Text></div></Card>
        </Cluster>
      </Stack>
    </Stack>
  );
}
