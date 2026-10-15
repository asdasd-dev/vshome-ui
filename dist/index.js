import { c as h } from "./cx.js";
import { jsx as n, jsxs as u, Fragment as x } from "react/jsx-runtime";
import { useRef as f, useEffect as b, useId as U, Children as j, useState as M, useCallback as $, useContext as F, createContext as G, useSyncExternalStore as K } from "react";
import { QueryClient as Q } from "@tanstack/react-query";
import { createPortal as W } from "react-dom";
import { Dialog as C } from "@base-ui/react/dialog";
import { Drawer as N } from "@base-ui/react/drawer";
import { CSPProvider as V } from "@base-ui/react/csp-provider";
import { Select as p } from "@base-ui/react/select";
import { ContextMenu as v } from "@base-ui/react/context-menu";
const g = (e) => String(e).padStart(2, "0");
function Ne(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${g(t.getDate())}.${g(t.getMonth() + 1)}.${t.getFullYear()} ${g(t.getHours())}:${g(t.getMinutes())}`;
}
function ge(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${g(t.getDate())}.${g(t.getMonth() + 1)}`;
}
function be(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${g(e.getMonth() + 1)}-${g(e.getDate())}`;
}
function we(e, t, s, r) {
  const l = Math.abs(Math.round(e)) % 100, a = l % 10;
  return a === 1 && l !== 11 ? t : a >= 2 && a <= 4 && (l < 12 || l > 14) ? s : r;
}
function Ce(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function ye(e, t, s) {
  const r = e.split(`
`);
  let l = 0, a = r.length;
  for (let o = 0; o < r.length; o++)
    if (r[o].trim() && l++, l === t) {
      a = o + 1;
      break;
    }
  let i = r.slice(0, a).join(`
`), c = a < r.length && r.slice(a).some((o) => o.trim());
  if (i.length > s) {
    const o = i.slice(0, s + 1), d = o.lastIndexOf(" ");
    i = d > 0 ? o.slice(0, d) : i.slice(0, s), c = !0;
  }
  return c ? { text: i.trimEnd() + "…", cut: c } : { text: i, cut: c };
}
const Y = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, J = /[.,;:!?)»"']+$/;
function Me(e) {
  const t = [];
  let s = 0;
  for (const r of e.matchAll(Y)) {
    const l = r.index;
    let a = r[2] ?? r[0], i = r[1] ?? a, c = l + r[0].length;
    if (!r[2]) {
      const o = J.exec(a)?.[0] ?? "";
      a = a.slice(0, a.length - o.length), i = a, c -= o.length;
    }
    l > s && t.push({ text: e.slice(s, l) }), t.push({ url: a, text: i }), s = c;
  }
  return s < e.length && t.push({ text: e.slice(s) }), t;
}
class k extends Error {
  status;
  data;
  constructor(t, s, r) {
    super(t), this.name = "ApiError", this.status = s, this.data = r;
  }
}
function X(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function Te(e, t, s) {
  let r;
  try {
    r = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: s === void 0 ? {} : { "Content-Type": "application/json" },
      body: s === void 0 ? void 0 : JSON.stringify(s)
    });
  } catch {
    throw new k("нет связи с сервером", 0, null);
  }
  const l = await r.json().catch(() => ({}));
  if (!r.ok) throw new k(X(l, r.status), r.status, l);
  return l;
}
function Se({ variant: e, size: t, pressed: s, className: r, type: l = "button", ...a }) {
  return /* @__PURE__ */ n("button", { type: l, className: h("vs-button", e && `vs-button--${e}`, t === "sm" && "vs-button--sm", r), "aria-pressed": s, ...a });
}
const Z = {
  play: "M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z",
  pause: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z",
  prev: "M6 5h2.5v14H6zM19 5.9v12.2a.9.9 0 0 1-1.38.76L9.5 13.7a2 2 0 0 1 0-3.4l8.12-5.16A.9.9 0 0 1 19 5.9Z",
  next: "M15.5 5H18v14h-2.5zM5 5.9v12.2a.9.9 0 0 0 1.38.76l8.12-5.16a2 2 0 0 0 0-3.4L6.38 5.14A.9.9 0 0 0 5 5.9Z",
  check: "M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7z",
  alert: "M12 3 1.8 20.5h20.4L12 3Zm-1 6h2v6h-2V9Zm0 8h2v2h-2v-2Z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3v6l5 3 1-1.7-4-2.3V7h-2Z",
  external: "M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  "chevron-right": "M9.3 5.3 7.9 6.7l5.3 5.3-5.3 5.3 1.4 1.4 6.7-6.7z",
  dot: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
}, ke = Object.keys(Z);
function I({ name: e, size: t = "md", className: s }) {
  return /* @__PURE__ */ n("svg", { "data-icon": e, className: h("vs-icon", `vs-icon--${t}`, s), viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: Z[e], fill: "currentColor" }) });
}
function Pe({ children: e, onClick: t, onHold: s, holdMs: r = 500, pressed: l, more: a, className: i }) {
  const c = f(void 0), o = f(!1), d = () => clearTimeout(c.current);
  b(() => d, []);
  const m = () => {
    o.current = !1, s && (c.current = setTimeout(() => {
      o.current = !0, s();
    }, r));
  }, _ = () => {
    if (o.current) {
      o.current = !1;
      return;
    }
    t();
  };
  return /* @__PURE__ */ u("span", { className: h("vs-split", i), "data-pressed": l || void 0, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": l,
        onClick: _,
        onPointerDown: m,
        onPointerUp: d,
        onPointerLeave: d,
        onPointerCancel: d,
        onContextMenu: s ? (w) => w.preventDefault() : void 0,
        children: e
      }
    ),
    /* @__PURE__ */ n("button", { type: "button", className: "vs-split__more", "aria-label": a.label, title: a.label, "aria-haspopup": "dialog", onClick: a.onClick, children: /* @__PURE__ */ n(I, { name: a.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function xe({ pressed: e, onClick: t, children: s, className: r, title: l }) {
  return /* @__PURE__ */ n("button", { type: "button", className: h("vs-chip", r), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: l, children: s });
}
function $e({ icon: e, label: t, size: s = "md", variant: r = "plain", className: l, type: a = "button", ...i }) {
  return /* @__PURE__ */ n("button", { type: a, "aria-label": t, title: t, className: h("vs-icon-button", `vs-icon-button--${s}`, `vs-icon-button--${r}`, l), ...i, children: /* @__PURE__ */ n(I, { name: e, size: s === "lg" ? "lg" : "md" }) });
}
function Ie({ label: e, aside: t, tone: s = "default", children: r, footer: l, className: a, ...i }) {
  const c = U(), o = h("vs-tile", `vs-tile--${s}`, a), d = /* @__PURE__ */ u(x, { children: [
    e && t != null ? /* @__PURE__ */ u("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ n("div", { id: c, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ n("div", { className: "vs-tile__aside", children: t })
    ] }) : e && /* @__PURE__ */ n("div", { id: c, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ n("div", { className: "vs-tile__body", children: r }),
    l && /* @__PURE__ */ n("div", { className: "vs-tile__footer", children: l })
  ] });
  return /* @__PURE__ */ n("section", { className: o, "aria-labelledby": e ? c : void 0, ...i, children: d });
}
function Ee({ value: e, unit: t, caption: s, size: r = "lg", tone: l = "default", className: a }) {
  return /* @__PURE__ */ u("div", { className: h("vs-stat", `vs-stat--${r}`, `vs-stat--${l}`, a), children: [
    /* @__PURE__ */ u("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ n("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ n("span", { className: "vs-stat__unit", children: t })
    ] }),
    s && /* @__PURE__ */ n("div", { className: "vs-stat__caption", children: s })
  ] });
}
function Le({ children: e, max: t, empty: s, className: r }) {
  const l = j.toArray(e);
  if (!l.length) return s ? /* @__PURE__ */ n("div", { className: h("vs-list-empty", r), children: s }) : null;
  const a = t ? l.slice(0, t) : l;
  return /* @__PURE__ */ u("div", { className: h("vs-list-wrap", r), children: [
    /* @__PURE__ */ n("ul", { className: "vs-list", children: a }),
    t && l.length > t && /* @__PURE__ */ u("div", { className: "vs-list-more", children: [
      "ещё ",
      l.length - t
    ] })
  ] });
}
function Oe({ title: e, sub: t, subTone: s = "muted", meta: r, lead: l, tone: a = "default", onClick: i }) {
  const c = /* @__PURE__ */ u(x, { children: [
    l && /* @__PURE__ */ n("span", { className: "vs-list-row__lead", children: l }),
    t != null ? /* @__PURE__ */ u("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ n("span", { className: "vs-list-row__name", children: e }),
      /* @__PURE__ */ n("span", { className: h("vs-list-row__sub", `vs-list-row__sub--${s}`), children: t })
    ] }) : /* @__PURE__ */ n("span", { className: "vs-list-row__title", children: e }),
    r && /* @__PURE__ */ n("span", { className: "vs-list-row__meta", children: r })
  ] });
  return /* @__PURE__ */ n("li", { className: h("vs-list-row", `vs-list-row--${a}`, t != null && "vs-list-row--two"), children: i ? /* @__PURE__ */ n("button", { type: "button", className: "vs-list-row__inner", onClick: i, children: c }) : /* @__PURE__ */ n("div", { className: "vs-list-row__inner", children: c }) });
}
function De({ tone: e = "warn", children: t, className: s }) {
  return /* @__PURE__ */ u("div", { role: "status", className: h("vs-banner", `vs-banner--${e}`, s), children: [
    /* @__PURE__ */ n(I, { name: "alert", size: "sm" }),
    t
  ] });
}
function Ae({ options: e, value: t, onChange: s, ariaLabel: r, variant: l = "default" }) {
  return /* @__PURE__ */ n("div", { className: h("vs-segment", l === "soft" && "vs-segment--soft"), role: "group", "aria-label": r, children: e.map((a) => /* @__PURE__ */ n("button", { type: "button", "aria-pressed": a.value === t, onClick: () => s(a.value), children: a.label }, a.value)) });
}
const y = (e) => e.stopPropagation();
function Re({ checked: e, onChange: t, label: s, icon: r, title: l, size: a = "md", disabled: i }) {
  return /* @__PURE__ */ u("label", { className: h("vs-switch", a === "sm" && "vs-switch--sm"), title: l, onClick: y, onKeyDown: y, onPointerDown: y, onMouseDown: y, onTouchStart: y, children: [
    r != null && /* @__PURE__ */ n("span", { "aria-hidden": "true", children: r }),
    /* @__PURE__ */ n("input", { type: "checkbox", role: "switch", "aria-label": s, checked: e, disabled: i, onChange: (c) => t(c.target.checked) })
  ] });
}
function Ve({ value: e, min: t = 1, max: s = 100, step: r = 1, label: l, onCommit: a, format: i = String }) {
  const [c, o] = M(e), d = f(!1), m = f(e);
  b(() => {
    m.current = e, d.current || o(e);
  }, [e]);
  const _ = () => {
    d.current = !1, c !== m.current && (m.current = c, a(c));
  }, w = `${(c - t) / (s - t) * 100}%`;
  return /* @__PURE__ */ u("label", { className: "vs-slider", style: { "--vs-slider-fill": w }, children: [
    /* @__PURE__ */ n(
      "input",
      {
        type: "range",
        "aria-label": l,
        min: t,
        max: s,
        step: r,
        value: c,
        onPointerDown: () => {
          d.current = !0;
        },
        onChange: (T) => o(Number(T.target.value)),
        onPointerUp: _,
        onPointerCancel: _,
        onKeyUp: _,
        onTouchEnd: _
      }
    ),
    /* @__PURE__ */ n("span", { className: "vs-slider__value", children: i(c) })
  ] });
}
function q(e, t) {
  return t instanceof k && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function Ze() {
  return new Q({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: q },
      mutations: { retry: !1 }
    }
  });
}
const H = G(null);
function He({ children: e, duration: t = 3500 }) {
  const [s, r] = M(null), l = f(void 0), a = $((i) => {
    clearTimeout(l.current), r((c) => ({ text: i, id: (c?.id ?? 0) + 1 })), l.current = setTimeout(() => r(null), t);
  }, [t]);
  return b(() => () => clearTimeout(l.current), []), /* @__PURE__ */ u(H.Provider, { value: a, children: [
    e,
    s && W(/* @__PURE__ */ n("div", { className: "vs-toast", role: "status", children: s.text }, s.id), document.body)
  ] });
}
function Be() {
  const e = F(H);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function ee(e) {
  const t = $((s) => {
    const r = window.matchMedia(e);
    return r.addEventListener("change", s), () => r.removeEventListener("change", s);
  }, [e]);
  return K(t, () => window.matchMedia(e).matches, () => !1);
}
const te = 1e3;
let P = 0, E = !1, B;
function S() {
  E = !1, clearTimeout(B), window.removeEventListener("click", S);
}
function A() {
  S(), E = !0, B = setTimeout(S, te), window.addEventListener("click", S);
}
function z() {
  return P += 1, document.addEventListener("pointerdown", A, !0), () => {
    P -= 1, document.removeEventListener("pointerdown", A, !0);
  };
}
const ne = () => P > 0 || E;
function se(e, t) {
  const s = f(t);
  s.current = t, b(() => {
    const r = window.CloseWatcher;
    if (!e || !r || !/Android/i.test(navigator.userAgent)) return;
    let l;
    const a = () => {
      l = new r(), l.onclose = () => {
        s.current() === !1 && a();
      };
    };
    return a(), () => l.destroy();
  }, [e]);
}
const re = "(max-width: 760px)";
function le(e) {
  return (t, s) => {
    if (!t) {
      if (s.reason === "outside-press" && ne()) {
        s.cancel();
        return;
      }
      e() === !1 && s.cancel();
    }
  };
}
function ze({ open: e, onRequestClose: t, head: s, actions: r, footer: l, children: a, scrollKey: i, className: c }) {
  const o = ee(re), d = f(null);
  b(() => {
    d.current && (d.current.scrollTop = 0);
  }, [i]);
  const m = f(!1), _ = f(void 0), w = f(t);
  w.current = t;
  const T = f(() => (m.current || (m.current = !0, setTimeout(() => {
    m.current = !1;
  }, 0), _.current = w.current()), _.current)).current;
  se(e, T);
  const L = le(T), O = o ? N : C, D = /* @__PURE__ */ u(x, { children: [
    /* @__PURE__ */ u("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ n(O.Title, { className: "vs-sheet__title", children: s }),
      /* @__PURE__ */ u("span", { className: "vs-sheet__actions", children: [
        r,
        /* @__PURE__ */ n(O.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { ref: d, className: "vs-sheet__body", children: a }),
    l != null && /* @__PURE__ */ n("footer", { className: "vs-sheet__foot", children: l })
  ] });
  return o ? /* @__PURE__ */ n(N.Root, { open: e, onOpenChange: L, children: /* @__PURE__ */ n(N.VirtualKeyboardProvider, { children: /* @__PURE__ */ u(N.Portal, { children: [
    /* @__PURE__ */ n(N.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ n(N.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ u(N.Popup, { className: h("vs-sheet", "vs-sheet--drawer", c), children: [
      /* @__PURE__ */ n("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ n(N.Content, { className: "vs-sheet__content", children: D })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ n(C.Root, { open: e, onOpenChange: L, children: /* @__PURE__ */ u(C.Portal, { children: [
    /* @__PURE__ */ n(C.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ n(C.Popup, { className: h("vs-sheet", c), children: D })
  ] }) });
}
function Ue({ value: e, onChange: t, options: s, label: r, className: l, disabled: a }) {
  const [i, c] = M(!1);
  return b(() => i ? z() : void 0, [i]), /* @__PURE__ */ n(V, { disableStyleElements: !0, children: /* @__PURE__ */ u(p.Root, { open: i, onOpenChange: c, value: e, onValueChange: (o) => {
    o !== null && t(o);
  }, items: s, disabled: a, children: [
    /* @__PURE__ */ u("div", { className: h("vs-select", l), children: [
      /* @__PURE__ */ n(p.Label, { className: "vs-select__label", children: r }),
      /* @__PURE__ */ u(p.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ n(p.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ n(p.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ n(p.Portal, { children: /* @__PURE__ */ n(p.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ n(p.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ n(p.List, { className: "vs-select__list", children: s.map((o) => /* @__PURE__ */ u(p.Item, { value: o.value, className: "vs-select__item", children: [
      /* @__PURE__ */ n(p.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ n(p.ItemText, { children: o.label })
    ] }, o.value)) }) }) }) })
  ] }) });
}
const ae = 1500;
function ce({ item: e }) {
  return "options" in e ? /* @__PURE__ */ u(v.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ n(v.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ n(v.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ u(v.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ n(v.RadioItemIndicator, { className: "vs-menu__check", children: "✓" }),
      /* @__PURE__ */ n("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ u(v.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ n(v.CheckboxItemIndicator, { className: "vs-menu__check", children: "✓" }),
    /* @__PURE__ */ n("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ n(v.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ n("span", { className: "vs-menu__text", children: e.label }) });
}
function je({ items: e, children: t, longPress: s = !0, disabled: r, className: l }) {
  const [a, i] = M(!1);
  b(() => a ? z() : void 0, [a]);
  const c = f(0), o = s ? {} : {
    onTouchStart: (d) => {
      c.current = Date.now(), d.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (d) => {
      (d.nativeEvent.pointerType === "touch" || Date.now() - c.current < ae) && d.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ n(V, { disableStyleElements: !0, children: /* @__PURE__ */ u(v.Root, { open: a, onOpenChange: i, disabled: r, children: [
    /* @__PURE__ */ n(v.Trigger, { render: t, ...o }),
    /* @__PURE__ */ n(v.Portal, { children: /* @__PURE__ */ n(v.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ n(v.Popup, { className: h("vs-menu", l), children: e.map((d, m) => d === "separator" ? /* @__PURE__ */ n(v.Separator, { className: "vs-menu__separator" }, m) : /* @__PURE__ */ n(ce, { item: d }, m)) }) }) })
  ] }) });
}
const R = {
  get(e, t) {
    try {
      return localStorage.getItem(e) ?? t;
    } catch {
      return t;
    }
  },
  set(e, t) {
    try {
      localStorage.setItem(e, t);
    } catch {
    }
  }
};
function Fe(e, t) {
  const [s, r] = M(() => R.get(e, t)), l = $((a) => {
    r(a), R.set(e, a);
  }, [e]);
  return [s, l];
}
export {
  k as ApiError,
  De as Banner,
  Se as Button,
  xe as Chip,
  je as ContextMenu,
  ke as ICON_NAMES,
  I as Icon,
  $e as IconButton,
  Le as List,
  Oe as ListRow,
  Ae as Segment,
  Ue as Select,
  ze as Sheet,
  Ve as Slider,
  Pe as SplitButton,
  Ee as Stat,
  Re as Switch,
  Ie as Tile,
  He as ToastProvider,
  Te as api,
  ye as clampText,
  Ce as compact,
  Ze as createQueryClient,
  h as cx,
  Ne as fmtDate,
  ge as fmtDay,
  Me as linkify,
  be as localToday,
  we as plural,
  q as shouldRetry,
  R as storage,
  Fe as useLocalStorage,
  ee as useMediaQuery,
  Be as useToast
};
