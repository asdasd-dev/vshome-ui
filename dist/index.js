import { c as h } from "./cx.js";
import { jsx as s, jsxs as u, Fragment as x } from "react/jsx-runtime";
import { useRef as f, useEffect as b, useId as U, Children as j, useState as M, useCallback as I, useContext as F, createContext as G, useSyncExternalStore as K } from "react";
import { QueryClient as Q } from "@tanstack/react-query";
import { createPortal as W } from "react-dom";
import { Dialog as C } from "@base-ui/react/dialog";
import { Drawer as g } from "@base-ui/react/drawer";
import { CSPProvider as V } from "@base-ui/react/csp-provider";
import { Select as p } from "@base-ui/react/select";
import { ContextMenu as v } from "@base-ui/react/context-menu";
const N = (e) => String(e).padStart(2, "0");
function ge(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${N(t.getDate())}.${N(t.getMonth() + 1)}.${t.getFullYear()} ${N(t.getHours())}:${N(t.getMinutes())}`;
}
function Ne(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${N(t.getDate())}.${N(t.getMonth() + 1)}`;
}
function be(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${N(e.getMonth() + 1)}-${N(e.getDate())}`;
}
function we(e, t, n, r) {
  const a = Math.abs(Math.round(e)) % 100, l = a % 10;
  return l === 1 && a !== 11 ? t : l >= 2 && l <= 4 && (a < 12 || a > 14) ? n : r;
}
function Ce(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function ye(e, t, n) {
  const r = e.split(`
`);
  let a = 0, l = r.length;
  for (let c = 0; c < r.length; c++)
    if (r[c].trim() && a++, a === t) {
      l = c + 1;
      break;
    }
  let i = r.slice(0, l).join(`
`), o = l < r.length && r.slice(l).some((c) => c.trim());
  if (i.length > n) {
    const c = i.slice(0, n + 1), d = c.lastIndexOf(" ");
    i = d > 0 ? c.slice(0, d) : i.slice(0, n), o = !0;
  }
  return o ? { text: i.trimEnd() + "…", cut: o } : { text: i, cut: o };
}
const Y = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, J = /[.,;:!?)»"']+$/;
function Me(e) {
  const t = [];
  let n = 0;
  for (const r of e.matchAll(Y)) {
    const a = r.index;
    let l = r[2] ?? r[0], i = r[1] ?? l, o = a + r[0].length;
    if (!r[2]) {
      const c = J.exec(l)?.[0] ?? "";
      l = l.slice(0, l.length - c.length), i = l, o -= c.length;
    }
    a > n && t.push({ text: e.slice(n, a) }), t.push({ url: l, text: i }), n = o;
  }
  return n < e.length && t.push({ text: e.slice(n) }), t;
}
class k extends Error {
  status;
  data;
  constructor(t, n, r) {
    super(t), this.name = "ApiError", this.status = n, this.data = r;
  }
}
function X(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function Te(e, t, n) {
  let r;
  try {
    r = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: n === void 0 ? {} : { "Content-Type": "application/json" },
      body: n === void 0 ? void 0 : JSON.stringify(n)
    });
  } catch {
    throw new k("нет связи с сервером", 0, null);
  }
  const a = await r.json().catch(() => ({}));
  if (!r.ok) throw new k(X(a, r.status), r.status, a);
  return a;
}
function Se({ variant: e, pressed: t, className: n, type: r = "button", ...a }) {
  return /* @__PURE__ */ s("button", { type: r, className: h("vs-button", e && `vs-button--${e}`, n), "aria-pressed": t, ...a });
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
function $({ name: e, size: t = "md", className: n }) {
  return /* @__PURE__ */ s("svg", { "data-icon": e, className: h("vs-icon", `vs-icon--${t}`, n), viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ s("path", { d: Z[e], fill: "currentColor" }) });
}
function Pe({ children: e, onClick: t, onHold: n, holdMs: r = 500, pressed: a, more: l, className: i }) {
  const o = f(void 0), c = f(!1), d = () => clearTimeout(o.current);
  b(() => d, []);
  const m = () => {
    c.current = !1, n && (o.current = setTimeout(() => {
      c.current = !0, n();
    }, r));
  }, _ = () => {
    if (c.current) {
      c.current = !1;
      return;
    }
    t();
  };
  return /* @__PURE__ */ u("span", { className: h("vs-split", i), "data-pressed": a || void 0, children: [
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": a,
        onClick: _,
        onPointerDown: m,
        onPointerUp: d,
        onPointerLeave: d,
        onPointerCancel: d,
        onContextMenu: n ? (w) => w.preventDefault() : void 0,
        children: e
      }
    ),
    /* @__PURE__ */ s("button", { type: "button", className: "vs-split__more", "aria-label": l.label, title: l.label, "aria-haspopup": "dialog", onClick: l.onClick, children: /* @__PURE__ */ s($, { name: l.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function xe({ pressed: e, onClick: t, children: n, className: r, title: a }) {
  return /* @__PURE__ */ s("button", { type: "button", className: h("vs-chip", r), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: a, children: n });
}
function Ie({ icon: e, label: t, size: n = "md", variant: r = "plain", className: a, type: l = "button", ...i }) {
  return /* @__PURE__ */ s("button", { type: l, "aria-label": t, title: t, className: h("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${r}`, a), ...i, children: /* @__PURE__ */ s($, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function $e({ label: e, tone: t = "default", children: n, footer: r, className: a, ...l }) {
  const i = U(), o = h("vs-tile", `vs-tile--${t}`, a);
  return /* @__PURE__ */ s("section", { className: o, "aria-labelledby": e ? i : void 0, ...l, children: /* @__PURE__ */ u(x, { children: [
    e && /* @__PURE__ */ s("div", { id: i, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ s("div", { className: "vs-tile__body", children: n }),
    r && /* @__PURE__ */ s("div", { className: "vs-tile__footer", children: r })
  ] }) });
}
function Ee({ value: e, unit: t, caption: n, size: r = "lg", tone: a = "default", className: l }) {
  return /* @__PURE__ */ u("div", { className: h("vs-stat", `vs-stat--${r}`, `vs-stat--${a}`, l), children: [
    /* @__PURE__ */ u("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ s("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ s("span", { className: "vs-stat__unit", children: t })
    ] }),
    n && /* @__PURE__ */ s("div", { className: "vs-stat__caption", children: n })
  ] });
}
function Le({ children: e, max: t, empty: n, className: r }) {
  const a = j.toArray(e);
  if (!a.length) return n ? /* @__PURE__ */ s("div", { className: h("vs-list-empty", r), children: n }) : null;
  const l = t ? a.slice(0, t) : a;
  return /* @__PURE__ */ u("div", { className: h("vs-list-wrap", r), children: [
    /* @__PURE__ */ s("ul", { className: "vs-list", children: l }),
    t && a.length > t && /* @__PURE__ */ u("div", { className: "vs-list-more", children: [
      "ещё ",
      a.length - t
    ] })
  ] });
}
function Oe({ title: e, meta: t, lead: n, tone: r = "default", onClick: a }) {
  const l = /* @__PURE__ */ u(x, { children: [
    n && /* @__PURE__ */ s("span", { className: "vs-list-row__lead", children: n }),
    /* @__PURE__ */ s("span", { className: "vs-list-row__title", children: e }),
    t && /* @__PURE__ */ s("span", { className: "vs-list-row__meta", children: t })
  ] });
  return /* @__PURE__ */ s("li", { className: h("vs-list-row", `vs-list-row--${r}`), children: a ? /* @__PURE__ */ s("button", { type: "button", className: "vs-list-row__inner", onClick: a, children: l }) : /* @__PURE__ */ s("div", { className: "vs-list-row__inner", children: l }) });
}
function De({ tone: e = "warn", children: t, className: n }) {
  return /* @__PURE__ */ u("div", { role: "status", className: h("vs-banner", `vs-banner--${e}`, n), children: [
    /* @__PURE__ */ s($, { name: "alert", size: "sm" }),
    t
  ] });
}
function Ae({ options: e, value: t, onChange: n, ariaLabel: r, variant: a = "default" }) {
  return /* @__PURE__ */ s("div", { className: h("vs-segment", a === "soft" && "vs-segment--soft"), role: "group", "aria-label": r, children: e.map((l) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": l.value === t, onClick: () => n(l.value), children: l.label }, l.value)) });
}
const y = (e) => e.stopPropagation();
function Re({ checked: e, onChange: t, label: n, icon: r, title: a, size: l = "md", disabled: i }) {
  return /* @__PURE__ */ u("label", { className: h("vs-switch", l === "sm" && "vs-switch--sm"), title: a, onClick: y, onKeyDown: y, onPointerDown: y, onMouseDown: y, onTouchStart: y, children: [
    r != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: r }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: i, onChange: (o) => t(o.target.checked) })
  ] });
}
function Ve({ value: e, min: t = 1, max: n = 100, step: r = 1, label: a, onCommit: l, format: i = String }) {
  const [o, c] = M(e), d = f(!1), m = f(e);
  b(() => {
    m.current = e, d.current || c(e);
  }, [e]);
  const _ = () => {
    d.current = !1, o !== m.current && (m.current = o, l(o));
  }, w = `${(o - t) / (n - t) * 100}%`;
  return /* @__PURE__ */ u("label", { className: "vs-slider", style: { "--vs-slider-fill": w }, children: [
    /* @__PURE__ */ s(
      "input",
      {
        type: "range",
        "aria-label": a,
        min: t,
        max: n,
        step: r,
        value: o,
        onPointerDown: () => {
          d.current = !0;
        },
        onChange: (T) => c(Number(T.target.value)),
        onPointerUp: _,
        onPointerCancel: _,
        onKeyUp: _,
        onTouchEnd: _
      }
    ),
    /* @__PURE__ */ s("span", { className: "vs-slider__value", children: i(o) })
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
  const [n, r] = M(null), a = f(void 0), l = I((i) => {
    clearTimeout(a.current), r((o) => ({ text: i, id: (o?.id ?? 0) + 1 })), a.current = setTimeout(() => r(null), t);
  }, [t]);
  return b(() => () => clearTimeout(a.current), []), /* @__PURE__ */ u(H.Provider, { value: l, children: [
    e,
    n && W(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function Be() {
  const e = F(H);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function ee(e) {
  const t = I((n) => {
    const r = window.matchMedia(e);
    return r.addEventListener("change", n), () => r.removeEventListener("change", n);
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
  const n = f(t);
  n.current = t, b(() => {
    const r = window.CloseWatcher;
    if (!e || !r || !/Android/i.test(navigator.userAgent)) return;
    let a;
    const l = () => {
      a = new r(), a.onclose = () => {
        n.current() === !1 && l();
      };
    };
    return l(), () => a.destroy();
  }, [e]);
}
const re = "(max-width: 760px)";
function ae(e) {
  return (t, n) => {
    if (!t) {
      if (n.reason === "outside-press" && ne()) {
        n.cancel();
        return;
      }
      e() === !1 && n.cancel();
    }
  };
}
function ze({ open: e, onRequestClose: t, head: n, actions: r, footer: a, children: l, scrollKey: i, className: o }) {
  const c = ee(re), d = f(null);
  b(() => {
    d.current && (d.current.scrollTop = 0);
  }, [i]);
  const m = f(!1), _ = f(void 0), w = f(t);
  w.current = t;
  const T = f(() => (m.current || (m.current = !0, setTimeout(() => {
    m.current = !1;
  }, 0), _.current = w.current()), _.current)).current;
  se(e, T);
  const L = ae(T), O = c ? g : C, D = /* @__PURE__ */ u(x, { children: [
    /* @__PURE__ */ u("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(O.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ u("span", { className: "vs-sheet__actions", children: [
        r,
        /* @__PURE__ */ s(O.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: d, className: "vs-sheet__body", children: l }),
    a != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: a })
  ] });
  return c ? /* @__PURE__ */ s(g.Root, { open: e, onOpenChange: L, children: /* @__PURE__ */ s(g.VirtualKeyboardProvider, { children: /* @__PURE__ */ u(g.Portal, { children: [
    /* @__PURE__ */ s(g.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ s(g.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ u(g.Popup, { className: h("vs-sheet", "vs-sheet--drawer", o), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(g.Content, { className: "vs-sheet__content", children: D })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(C.Root, { open: e, onOpenChange: L, children: /* @__PURE__ */ u(C.Portal, { children: [
    /* @__PURE__ */ s(C.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ s(C.Popup, { className: h("vs-sheet", o), children: D })
  ] }) });
}
function Ue({ value: e, onChange: t, options: n, label: r, className: a, disabled: l }) {
  const [i, o] = M(!1);
  return b(() => i ? z() : void 0, [i]), /* @__PURE__ */ s(V, { disableStyleElements: !0, children: /* @__PURE__ */ u(p.Root, { open: i, onOpenChange: o, value: e, onValueChange: (c) => {
    c !== null && t(c);
  }, items: n, disabled: l, children: [
    /* @__PURE__ */ u("div", { className: h("vs-select", a), children: [
      /* @__PURE__ */ s(p.Label, { className: "vs-select__label", children: r }),
      /* @__PURE__ */ u(p.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(p.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(p.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ s(p.Portal, { children: /* @__PURE__ */ s(p.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(p.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(p.List, { className: "vs-select__list", children: n.map((c) => /* @__PURE__ */ u(p.Item, { value: c.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(p.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ s(p.ItemText, { children: c.label })
    ] }, c.value)) }) }) }) })
  ] }) });
}
const le = 1500;
function ce({ item: e }) {
  return "options" in e ? /* @__PURE__ */ u(v.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ s(v.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ s(v.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ u(v.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ s(v.RadioItemIndicator, { className: "vs-menu__check", children: "✓" }),
      /* @__PURE__ */ s("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ u(v.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ s(v.CheckboxItemIndicator, { className: "vs-menu__check", children: "✓" }),
    /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ s(v.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label }) });
}
function je({ items: e, children: t, longPress: n = !0, disabled: r, className: a }) {
  const [l, i] = M(!1);
  b(() => l ? z() : void 0, [l]);
  const o = f(0), c = n ? {} : {
    onTouchStart: (d) => {
      o.current = Date.now(), d.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (d) => {
      (d.nativeEvent.pointerType === "touch" || Date.now() - o.current < le) && d.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(V, { disableStyleElements: !0, children: /* @__PURE__ */ u(v.Root, { open: l, onOpenChange: i, disabled: r, children: [
    /* @__PURE__ */ s(v.Trigger, { render: t, ...c }),
    /* @__PURE__ */ s(v.Portal, { children: /* @__PURE__ */ s(v.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(v.Popup, { className: h("vs-menu", a), children: e.map((d, m) => d === "separator" ? /* @__PURE__ */ s(v.Separator, { className: "vs-menu__separator" }, m) : /* @__PURE__ */ s(ce, { item: d }, m)) }) }) })
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
  const [n, r] = M(() => R.get(e, t)), a = I((l) => {
    r(l), R.set(e, l);
  }, [e]);
  return [n, a];
}
export {
  k as ApiError,
  De as Banner,
  Se as Button,
  xe as Chip,
  je as ContextMenu,
  ke as ICON_NAMES,
  $ as Icon,
  Ie as IconButton,
  Le as List,
  Oe as ListRow,
  Ae as Segment,
  Ue as Select,
  ze as Sheet,
  Ve as Slider,
  Pe as SplitButton,
  Ee as Stat,
  Re as Switch,
  $e as Tile,
  He as ToastProvider,
  Te as api,
  ye as clampText,
  Ce as compact,
  Ze as createQueryClient,
  h as cx,
  ge as fmtDate,
  Ne as fmtDay,
  Me as linkify,
  be as localToday,
  we as plural,
  q as shouldRetry,
  R as storage,
  Fe as useLocalStorage,
  ee as useMediaQuery,
  Be as useToast
};
