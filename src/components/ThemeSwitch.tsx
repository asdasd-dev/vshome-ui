import { cx } from "../utils/cx";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { MEDIA } from "../responsive";
import type { ThemeChoice } from "../hooks/useTheme";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import { Segment } from "./Segment";

const OPTIONS: { value: ThemeChoice; label: string; icon: "weather-sunny" | "weather-clear-night" | "theme-auto" }[] = [
  { value: "light", label: "Светлая", icon: "weather-sunny" },
  { value: "dark", label: "Тёмная", icon: "weather-clear-night" },
  { value: "system", label: "Как в системе", icon: "theme-auto" },
];

export type ThemeSwitchProps = {
  value: ThemeChoice; onChange: (v: ThemeChoice) => void; variant?: "segment" | "button"; size?: "sm" | "md";
  label?: string; className?: string;
};

export function ThemeSwitch({ value, onChange, variant = "segment", size = "sm", label = "Тема", className }: ThemeSwitchProps) {
  const cls = cx("vs-theme-switch", className);
  const phone = useMediaQuery(MEDIA.phone);
  if (variant === "button") {
    const i = OPTIONS.findIndex((o) => o.value === value);
    const cur = OPTIONS[i] ?? OPTIONS[0]!;
    const next = OPTIONS[(i + 1) % OPTIONS.length]!;
    return <IconButton className={cls} icon={cur.icon} size={size} variant="ghost" label={`${label}: ${cur.label.toLowerCase()}. Нажмите — ${next.label.toLowerCase()}`} onClick={() => onChange(next.value)} />;
  }
  return (
    <Segment className={cls} label={label} size={size} variant="soft" value={value} onChange={onChange}
      options={OPTIONS.map((o) => ({ value: o.value, label: <span className="vs-theme-switch__opt"><Icon name={o.icon} size="sm" /><span className={cx("vs-theme-switch__text", phone && "vs-visually-hidden")}>{o.label}</span></span> }))} />
  );
}
