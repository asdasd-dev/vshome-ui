import { c as h } from "./cx.js";
import { jsx as n, jsxs as u, Fragment as x } from "react/jsx-runtime";
import { useRef as f, useEffect as b, useId as F, Children as G, useState as M, useCallback as $, useContext as K, createContext as Q, useSyncExternalStore as W } from "react";
import { QueryClient as Y } from "@tanstack/react-query";
import { createPortal as J } from "react-dom";
import { Dialog as y } from "@base-ui/react/dialog";
import { Drawer as N } from "@base-ui/react/drawer";
import { CSPProvider as Z } from "@base-ui/react/csp-provider";
import { Select as p } from "@base-ui/react/select";
import { ContextMenu as v } from "@base-ui/react/context-menu";
const g = (e) => String(e).padStart(2, "0");
function be(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${g(t.getDate())}.${g(t.getMonth() + 1)}.${t.getFullYear()} ${g(t.getHours())}:${g(t.getMinutes())}`;
}
function we(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${g(t.getDate())}.${g(t.getMonth() + 1)}`;
}
function Ce(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${g(e.getMonth() + 1)}-${g(e.getDate())}`;
}
function ye(e, t, s, r) {
  const l = Math.abs(Math.round(e)) % 100, a = l % 10;
  return a === 1 && l !== 11 ? t : a >= 2 && a <= 4 && (l < 12 || l > 14) ? s : r;
}
function Te(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function Me(e, t, s) {
  const r = e.split(`
`);
  let l = 0, a = r.length;
  for (let c = 0; c < r.length; c++)
    if (r[c].trim() && l++, l === t) {
      a = c + 1;
      break;
    }
  let i = r.slice(0, a).join(`
`), o = a < r.length && r.slice(a).some((c) => c.trim());
  if (i.length > s) {
    const c = i.slice(0, s + 1), d = c.lastIndexOf(" ");
    i = d > 0 ? c.slice(0, d) : i.slice(0, s), o = !0;
  }
  return o ? { text: i.trimEnd() + "…", cut: o } : { text: i, cut: o };
}
const X = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, q = /[.,;:!?)»"']+$/;
function ke(e) {
  const t = [];
  let s = 0;
  for (const r of e.matchAll(X)) {
    const l = r.index;
    let a = r[2] ?? r[0], i = r[1] ?? a, o = l + r[0].length;
    if (!r[2]) {
      const c = q.exec(a)?.[0] ?? "";
      a = a.slice(0, a.length - c.length), i = a, o -= c.length;
    }
    l > s && t.push({ text: e.slice(s, l) }), t.push({ url: a, text: i }), s = o;
  }
  return s < e.length && t.push({ text: e.slice(s) }), t;
}
class P extends Error {
  status;
  data;
  constructor(t, s, r) {
    super(t), this.name = "ApiError", this.status = s, this.data = r;
  }
}
function ee(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function Pe(e, t, s) {
  let r;
  try {
    r = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: s === void 0 ? {} : { "Content-Type": "application/json" },
      body: s === void 0 ? void 0 : JSON.stringify(s)
    });
  } catch {
    throw new P("нет связи с сервером", 0, null);
  }
  const l = await r.json().catch(() => ({}));
  if (!r.ok) throw new P(ee(l, r.status), r.status, l);
  return l;
}
function Se({ variant: e, size: t, pressed: s, className: r, type: l = "button", ...a }) {
  return /* @__PURE__ */ n("button", { type: l, className: h("vs-button", e && `vs-button--${e}`, t === "sm" && "vs-button--sm", r), "aria-pressed": s, ...a });
}
const B = {
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
}, xe = Object.keys(B);
function I({ name: e, size: t = "md", className: s }) {
  return /* @__PURE__ */ n("svg", { "data-icon": e, className: h("vs-icon", `vs-icon--${t}`, s), viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: B[e], fill: "currentColor" }) });
}
function $e({ children: e, onClick: t, onHold: s, holdMs: r = 500, pressed: l, more: a, className: i }) {
  const o = f(void 0), c = f(!1), d = () => clearTimeout(o.current);
  b(() => d, []);
  const m = () => {
    c.current = !1, s && (o.current = setTimeout(() => {
      c.current = !0, s();
    }, r));
  }, _ = () => {
    if (c.current) {
      c.current = !1;
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
function Ie({ pressed: e, onClick: t, children: s, className: r, title: l }) {
  return /* @__PURE__ */ n("button", { type: "button", className: h("vs-chip", r), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: l, children: s });
}
function Ee({ icon: e, label: t, size: s = "md", variant: r = "plain", className: l, type: a = "button", ...i }) {
  return /* @__PURE__ */ n("button", { type: a, "aria-label": t, title: t, className: h("vs-icon-button", `vs-icon-button--${s}`, `vs-icon-button--${r}`, l), ...i, children: /* @__PURE__ */ n(I, { name: e, size: s === "lg" ? "lg" : "md" }) });
}
function Le({ label: e, aside: t, tone: s = "default", children: r, footer: l, className: a, ...i }) {
  const o = F(), c = h("vs-tile", `vs-tile--${s}`, a), d = /* @__PURE__ */ u(x, { children: [
    e && t != null ? /* @__PURE__ */ u("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ n("div", { id: o, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ n("div", { className: "vs-tile__aside", children: t })
    ] }) : e && /* @__PURE__ */ n("div", { id: o, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ n("div", { className: "vs-tile__body", children: r }),
    l && /* @__PURE__ */ n("div", { className: "vs-tile__footer", children: l })
  ] });
  return /* @__PURE__ */ n("section", { className: c, "aria-labelledby": e ? o : void 0, ...i, children: d });
}
function Oe({ value: e, unit: t, caption: s, size: r = "lg", tone: l = "default", className: a }) {
  return /* @__PURE__ */ u("div", { className: h("vs-stat", `vs-stat--${r}`, `vs-stat--${l}`, a), children: [
    /* @__PURE__ */ u("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ n("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ n("span", { className: "vs-stat__unit", children: t })
    ] }),
    s && /* @__PURE__ */ n("div", { className: "vs-stat__caption", children: s })
  ] });
}
function De({ children: e, max: t, empty: s, className: r }) {
  const l = G.toArray(e);
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
function Ae({ title: e, sub: t, subTone: s = "muted", subLines: r = 1, meta: l, lead: a, tone: i = "default", onClick: o }) {
  const c = /* @__PURE__ */ u(x, { children: [
    a && /* @__PURE__ */ n("span", { className: "vs-list-row__lead", children: a }),
    t != null ? /* @__PURE__ */ u("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ n("span", { className: "vs-list-row__name", children: e }),
      /* @__PURE__ */ n("span", { className: h("vs-list-row__sub", `vs-list-row__sub--${s}`, r === 2 && "vs-list-row__sub--2"), children: t })
    ] }) : /* @__PURE__ */ n("span", { className: "vs-list-row__title", children: e }),
    l && /* @__PURE__ */ n("span", { className: "vs-list-row__meta", children: l })
  ] });
  return /* @__PURE__ */ n("li", { className: h("vs-list-row", `vs-list-row--${i}`, t != null && "vs-list-row--two"), children: o ? /* @__PURE__ */ n("button", { type: "button", className: "vs-list-row__inner", onClick: o, children: c }) : /* @__PURE__ */ n("div", { className: "vs-list-row__inner", children: c }) });
}
function Re({ tone: e = "warn", children: t, className: s }) {
  return /* @__PURE__ */ u("div", { role: "status", className: h("vs-banner", `vs-banner--${e}`, s), children: [
    /* @__PURE__ */ n(I, { name: "alert", size: "sm" }),
    t
  ] });
}
function Ve({ options: e, value: t, onChange: s, ariaLabel: r, variant: l = "default" }) {
  return /* @__PURE__ */ n("div", { className: h("vs-segment", l === "soft" && "vs-segment--soft"), role: "group", "aria-label": r, children: e.map((a) => /* @__PURE__ */ n("button", { type: "button", "aria-pressed": a.value === t, onClick: () => s(a.value), children: a.label }, a.value)) });
}
const T = (e) => e.stopPropagation();
function Ze({ checked: e, onChange: t, label: s, icon: r, title: l, size: a = "md", disabled: i }) {
  return /* @__PURE__ */ u("label", { className: h("vs-switch", a === "sm" && "vs-switch--sm"), title: l, onClick: T, onKeyDown: T, onPointerDown: T, onMouseDown: T, onTouchStart: T, children: [
    r != null && /* @__PURE__ */ n("span", { "aria-hidden": "true", children: r }),
    /* @__PURE__ */ n("input", { type: "checkbox", role: "switch", "aria-label": s, checked: e, disabled: i, onChange: (o) => t(o.target.checked) })
  ] });
}
function Be({ value: e, min: t = 1, max: s = 100, step: r = 1, label: l, onCommit: a, format: i = String }) {
  const [o, c] = M(e), d = f(!1), m = f(e);
  b(() => {
    m.current = e, d.current || c(e);
  }, [e]);
  const _ = () => {
    d.current = !1, o !== m.current && (m.current = o, a(o));
  }, w = `${(o - t) / (s - t) * 100}%`;
  return /* @__PURE__ */ u("label", { className: "vs-slider", style: { "--vs-slider-fill": w }, children: [
    /* @__PURE__ */ n(
      "input",
      {
        type: "range",
        "aria-label": l,
        min: t,
        max: s,
        step: r,
        value: o,
        onPointerDown: () => {
          d.current = !0;
        },
        onChange: (C) => c(Number(C.target.value)),
        onPointerUp: _,
        onPointerCancel: _,
        onKeyUp: _,
        onTouchEnd: _
      }
    ),
    /* @__PURE__ */ n("span", { className: "vs-slider__value", children: i(o) })
  ] });
}
function te(e, t) {
  return t instanceof P && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function He() {
  return new Y({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: te },
      mutations: { retry: !1 }
    }
  });
}
const H = Q(null);
function Ue({ children: e, duration: t = 3500 }) {
  const [s, r] = M(null), l = f(void 0), a = $((i) => {
    clearTimeout(l.current), r((o) => ({ text: i, id: (o?.id ?? 0) + 1 })), l.current = setTimeout(() => r(null), t);
  }, [t]);
  return b(() => () => clearTimeout(l.current), []), /* @__PURE__ */ u(H.Provider, { value: a, children: [
    e,
    s && J(/* @__PURE__ */ n("div", { className: "vs-toast", role: "status", children: s.text }, s.id), document.body)
  ] });
}
function ze() {
  const e = K(H);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function ne(e) {
  const t = $((s) => {
    const r = window.matchMedia(e);
    return r.addEventListener("change", s), () => r.removeEventListener("change", s);
  }, [e]);
  return W(t, () => window.matchMedia(e).matches, () => !1);
}
const se = 1e3;
let S = 0, E = !1, U;
function k() {
  E = !1, clearTimeout(U), window.removeEventListener("click", k);
}
function R() {
  k(), E = !0, U = setTimeout(k, se), window.addEventListener("click", k);
}
function z() {
  return S += 1, document.addEventListener("pointerdown", R, !0), () => {
    S -= 1, document.removeEventListener("pointerdown", R, !0);
  };
}
const re = () => S > 0 || E;
function le(e, t) {
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
const ae = "(max-width: 760px)";
function ce(e) {
  return (t, s) => {
    if (!t) {
      if (s.reason === "outside-press" && re()) {
        s.cancel();
        return;
      }
      e() === !1 && s.cancel();
    }
  };
}
function je({ open: e, onRequestClose: t, head: s, actions: r, footer: l, children: a, scrollKey: i, className: o }) {
  const c = ne(ae), d = f(null);
  b(() => {
    d.current && (d.current.scrollTop = 0);
  }, [i]);
  const m = f(!1), _ = f(void 0), w = f(t);
  w.current = t;
  const C = f(() => (m.current || (m.current = !0, setTimeout(() => {
    m.current = !1;
  }, 0), _.current = w.current()), _.current)).current;
  le(e, C);
  const L = ce(C), O = (j) => {
    j.pointerType === "touch" && C();
  }, D = c ? N : y, A = /* @__PURE__ */ u(x, { children: [
    /* @__PURE__ */ u("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ n(D.Title, { className: "vs-sheet__title", children: s }),
      /* @__PURE__ */ u("span", { className: "vs-sheet__actions", children: [
        r,
        /* @__PURE__ */ n(D.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { ref: d, className: "vs-sheet__body", children: a }),
    l != null && /* @__PURE__ */ n("footer", { className: "vs-sheet__foot", children: l })
  ] });
  return c ? /* @__PURE__ */ n(N.Root, { open: e, onOpenChange: L, children: /* @__PURE__ */ n(N.VirtualKeyboardProvider, { children: /* @__PURE__ */ u(N.Portal, { children: [
    /* @__PURE__ */ n(N.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: O }),
    /* @__PURE__ */ n(N.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ u(N.Popup, { className: h("vs-sheet", "vs-sheet--drawer", o), children: [
      /* @__PURE__ */ n("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ n(N.Content, { className: "vs-sheet__content", children: A })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ n(y.Root, { open: e, onOpenChange: L, children: /* @__PURE__ */ u(y.Portal, { children: [
    /* @__PURE__ */ n(y.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: O }),
    /* @__PURE__ */ n(y.Popup, { className: h("vs-sheet", o), children: A })
  ] }) });
}
function Fe({ value: e, onChange: t, options: s, label: r, className: l, disabled: a }) {
  const [i, o] = M(!1);
  return b(() => i ? z() : void 0, [i]), /* @__PURE__ */ n(Z, { disableStyleElements: !0, children: /* @__PURE__ */ u(p.Root, { open: i, onOpenChange: o, value: e, onValueChange: (c) => {
    c !== null && t(c);
  }, items: s, disabled: a, children: [
    /* @__PURE__ */ u("div", { className: h("vs-select", l), children: [
      /* @__PURE__ */ n(p.Label, { className: "vs-select__label", children: r }),
      /* @__PURE__ */ u(p.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ n(p.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ n(p.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ n(p.Portal, { children: /* @__PURE__ */ n(p.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ n(p.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ n(p.List, { className: "vs-select__list", children: s.map((c) => /* @__PURE__ */ u(p.Item, { value: c.value, className: "vs-select__item", children: [
      /* @__PURE__ */ n(p.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ n(p.ItemText, { children: c.label })
    ] }, c.value)) }) }) }) })
  ] }) });
}
const oe = 1500;
function ie({ item: e }) {
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
function Ge({ items: e, children: t, longPress: s = !0, disabled: r, className: l }) {
  const [a, i] = M(!1);
  b(() => a ? z() : void 0, [a]);
  const o = f(0), c = s ? {} : {
    onTouchStart: (d) => {
      o.current = Date.now(), d.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (d) => {
      (d.nativeEvent.pointerType === "touch" || Date.now() - o.current < oe) && d.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ n(Z, { disableStyleElements: !0, children: /* @__PURE__ */ u(v.Root, { open: a, onOpenChange: i, disabled: r, children: [
    /* @__PURE__ */ n(v.Trigger, { render: t, ...c }),
    /* @__PURE__ */ n(v.Portal, { children: /* @__PURE__ */ n(v.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ n(v.Popup, { className: h("vs-menu", l), children: e.map((d, m) => d === "separator" ? /* @__PURE__ */ n(v.Separator, { className: "vs-menu__separator" }, m) : /* @__PURE__ */ n(ie, { item: d }, m)) }) }) })
  ] }) });
}
const V = {
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
function Ke(e, t) {
  const [s, r] = M(() => V.get(e, t)), l = $((a) => {
    r(a), V.set(e, a);
  }, [e]);
  return [s, l];
}
export {
  P as ApiError,
  Re as Banner,
  Se as Button,
  Ie as Chip,
  Ge as ContextMenu,
  xe as ICON_NAMES,
  I as Icon,
  Ee as IconButton,
  De as List,
  Ae as ListRow,
  Ve as Segment,
  Fe as Select,
  je as Sheet,
  Be as Slider,
  $e as SplitButton,
  Oe as Stat,
  Ze as Switch,
  Le as Tile,
  Ue as ToastProvider,
  Pe as api,
  Me as clampText,
  Te as compact,
  He as createQueryClient,
  h as cx,
  be as fmtDate,
  we as fmtDay,
  ke as linkify,
  Ce as localToday,
  ye as plural,
  te as shouldRetry,
  V as storage,
  Ke as useLocalStorage,
  ne as useMediaQuery,
  ze as useToast
};
