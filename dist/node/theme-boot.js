export const THEME_DEFAULTS = { key: "vs-theme", fallback: "system" };
export const SYSTEM_DARK = "(prefers-color-scheme: dark)";
export function themeBootScript({ key = THEME_DEFAULTS.key, fallback = THEME_DEFAULTS.fallback } = {}) {
    const k = JSON.stringify(key), f = JSON.stringify(fallback), q = JSON.stringify(SYSTEM_DARK);
    return `(function(){var d=document.documentElement,m=matchMedia(${q});function a(){var t;try{t=localStorage.getItem(${k})}catch(e){}if(t!=="light"&&t!=="dark"&&t!=="system")t=${f};d.dataset.theme=t==="system"?(m.matches?"dark":"light"):t}a();m.addEventListener("change",a)})()`;
}
const RULES = [
    { re: /prefers-color-scheme/, why: "системную тему решает @vshome/ui: стили — через :root[data-theme=\"dark\"], в коде — useTheme().resolved" },
    { re: /data-color-scheme|data-[\w-]+-theme\b|dataset\.(?:colorScheme|\w+Theme)\b/, why: "своя пометка темы: тема одна — data-theme на <html>" },
    { re: /(?<!:root|html)\[data-theme\b|(?<![[\w-])data-theme=["'{]/, why: "data-theme бывает только на <html>: селектор :root[data-theme=\"dark\"] …" },
];
export function themeViolations(code) {
    const out = [];
    code.split("\n").forEach((line, i) => {
        for (const { re, why } of RULES)
            if (re.test(line))
                out.push(`${i + 1}: ${line.trim().slice(0, 120)} — ${why}`);
    });
    return out;
}
