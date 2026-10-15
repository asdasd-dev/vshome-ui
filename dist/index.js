import { c as d } from "./cx.js";
import { jsx as s, jsxs as i, Fragment as k } from "react/jsx-runtime";
import { useId as z, Children as F, useState as M, useRef as f, useCallback as x, useEffect as w, useContext as G, createContext as U, useSyncExternalStore as K } from "react";
import { QueryClient as Q } from "@tanstack/react-query";
import { createPortal as W } from "react-dom";
import { Dialog as N } from "@base-ui/react/dialog";
import { Drawer as p } from "@base-ui/react/drawer";
import { CSPProvider as H } from "@base-ui/react/csp-provider";
import { Select as m } from "@base-ui/react/select";
import { ContextMenu as v } from "@base-ui/react/context-menu";
const _ = (e) => String(e).padStart(2, "0");
function ge(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${_(t.getDate())}.${_(t.getMonth() + 1)}.${t.getFullYear()} ${_(t.getHours())}:${_(t.getMinutes())}`;
}
function Ne(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${_(t.getDate())}.${_(t.getMonth() + 1)}`;
}
function be(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${_(e.getMonth() + 1)}-${_(e.getDate())}`;
}
function we(e, t, n, r) {
  const a = Math.abs(Math.round(e)) % 100, l = a % 10;
  return l === 1 && a !== 11 ? t : l >= 2 && l <= 4 && (a < 12 || a > 14) ? n : r;
}
function Ce(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function Me(e, t, n) {
  const r = e.split(`
`);
  let a = 0, l = r.length;
  for (let o = 0; o < r.length; o++)
    if (r[o].trim() && a++, a === t) {
      l = o + 1;
      break;
    }
  let c = r.slice(0, l).join(`
`), u = l < r.length && r.slice(l).some((o) => o.trim());
  if (c.length > n) {
    const o = c.slice(0, n + 1), h = o.lastIndexOf(" ");
    c = h > 0 ? o.slice(0, h) : c.slice(0, n), u = !0;
  }
  return u ? { text: c.trimEnd() + "…", cut: u } : { text: c, cut: u };
}
const Y = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, J = /[.,;:!?)»"']+$/;
function ye(e) {
  const t = [];
  let n = 0;
  for (const r of e.matchAll(Y)) {
    const a = r.index;
    let l = r[2] ?? r[0], c = r[1] ?? l, u = a + r[0].length;
    if (!r[2]) {
      const o = J.exec(l)?.[0] ?? "";
      l = l.slice(0, l.length - o.length), c = l, u -= o.length;
    }
    a > n && t.push({ text: e.slice(n, a) }), t.push({ url: l, text: c }), n = u;
  }
  return n < e.length && t.push({ text: e.slice(n) }), t;
}
class T extends Error {
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
    throw new T("нет связи с сервером", 0, null);
  }
  const a = await r.json().catch(() => ({}));
  if (!r.ok) throw new T(X(a, r.status), r.status, a);
  return a;
}
function Se({ variant: e, className: t, type: n = "button", ...r }) {
  return /* @__PURE__ */ s("button", { type: n, className: d("vs-button", e && `vs-button--${e}`, t), ...r });
}
function ke({ pressed: e, onClick: t, children: n, className: r, title: a }) {
  return /* @__PURE__ */ s("button", { type: "button", className: d("vs-chip", r), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: a, children: n });
}
const R = {
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
}, xe = Object.keys(R);
function V({ name: e, size: t = "md", className: n }) {
  return /* @__PURE__ */ s("svg", { "data-icon": e, className: d("vs-icon", `vs-icon--${t}`, n), viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ s("path", { d: R[e], fill: "currentColor" }) });
}
function Ie({ icon: e, label: t, size: n = "md", variant: r = "plain", className: a, type: l = "button", ...c }) {
  return /* @__PURE__ */ s("button", { type: l, "aria-label": t, title: t, className: d("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${r}`, a), ...c, children: /* @__PURE__ */ s(V, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function $e({ label: e, tone: t = "default", children: n, footer: r, className: a, ...l }) {
  const c = z(), u = d("vs-tile", `vs-tile--${t}`, a);
  return /* @__PURE__ */ s("section", { className: u, "aria-labelledby": e ? c : void 0, ...l, children: /* @__PURE__ */ i(k, { children: [
    e && /* @__PURE__ */ s("div", { id: c, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ s("div", { className: "vs-tile__body", children: n }),
    r && /* @__PURE__ */ s("div", { className: "vs-tile__footer", children: r })
  ] }) });
}
function Ee({ value: e, unit: t, caption: n, size: r = "lg", tone: a = "default", className: l }) {
  return /* @__PURE__ */ i("div", { className: d("vs-stat", `vs-stat--${r}`, `vs-stat--${a}`, l), children: [
    /* @__PURE__ */ i("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ s("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ s("span", { className: "vs-stat__unit", children: t })
    ] }),
    n && /* @__PURE__ */ s("div", { className: "vs-stat__caption", children: n })
  ] });
}
function Pe({ children: e, max: t, empty: n, className: r }) {
  const a = F.toArray(e);
  if (!a.length) return n ? /* @__PURE__ */ s("div", { className: d("vs-list-empty", r), children: n }) : null;
  const l = t ? a.slice(0, t) : a;
  return /* @__PURE__ */ i("div", { className: d("vs-list-wrap", r), children: [
    /* @__PURE__ */ s("ul", { className: "vs-list", children: l }),
    t && a.length > t && /* @__PURE__ */ i("div", { className: "vs-list-more", children: [
      "ещё ",
      a.length - t
    ] })
  ] });
}
function Le({ title: e, meta: t, lead: n, tone: r = "default", onClick: a }) {
  const l = /* @__PURE__ */ i(k, { children: [
    n && /* @__PURE__ */ s("span", { className: "vs-list-row__lead", children: n }),
    /* @__PURE__ */ s("span", { className: "vs-list-row__title", children: e }),
    t && /* @__PURE__ */ s("span", { className: "vs-list-row__meta", children: t })
  ] });
  return /* @__PURE__ */ s("li", { className: d("vs-list-row", `vs-list-row--${r}`), children: a ? /* @__PURE__ */ s("button", { type: "button", className: "vs-list-row__inner", onClick: a, children: l }) : /* @__PURE__ */ s("div", { className: "vs-list-row__inner", children: l }) });
}
function Oe({ tone: e = "warn", children: t, className: n }) {
  return /* @__PURE__ */ i("div", { role: "status", className: d("vs-banner", `vs-banner--${e}`, n), children: [
    /* @__PURE__ */ s(V, { name: "alert", size: "sm" }),
    t
  ] });
}
function De({ options: e, value: t, onChange: n, ariaLabel: r }) {
  return /* @__PURE__ */ s("div", { className: "vs-segment", role: "group", "aria-label": r, children: e.map((a) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": a.value === t, onClick: () => n(a.value), children: a.label }, a.value)) });
}
const b = (e) => e.stopPropagation();
function Ae({ checked: e, onChange: t, label: n, icon: r, title: a, size: l = "md", disabled: c }) {
  return /* @__PURE__ */ i("label", { className: d("vs-switch", l === "sm" && "vs-switch--sm"), title: a, onClick: b, onKeyDown: b, onPointerDown: b, onMouseDown: b, onTouchStart: b, children: [
    r != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: r }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: c, onChange: (u) => t(u.target.checked) })
  ] });
}
function q(e, t) {
  return t instanceof T && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function He() {
  return new Q({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: q },
      mutations: { retry: !1 }
    }
  });
}
const Z = U(null);
function Re({ children: e, duration: t = 3500 }) {
  const [n, r] = M(null), a = f(void 0), l = x((c) => {
    clearTimeout(a.current), r((u) => ({ text: c, id: (u?.id ?? 0) + 1 })), a.current = setTimeout(() => r(null), t);
  }, [t]);
  return w(() => () => clearTimeout(a.current), []), /* @__PURE__ */ i(Z.Provider, { value: l, children: [
    e,
    n && W(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function Ve() {
  const e = G(Z);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function ee(e) {
  const t = x((n) => {
    const r = window.matchMedia(e);
    return r.addEventListener("change", n), () => r.removeEventListener("change", n);
  }, [e]);
  return K(t, () => window.matchMedia(e).matches, () => !1);
}
const te = 1e3;
let S = 0, I = !1, B;
function C() {
  I = !1, clearTimeout(B), window.removeEventListener("click", C);
}
function D() {
  C(), I = !0, B = setTimeout(C, te), window.addEventListener("click", C);
}
function j() {
  return S += 1, document.addEventListener("pointerdown", D, !0), () => {
    S -= 1, document.removeEventListener("pointerdown", D, !0);
  };
}
const ne = () => S > 0 || I;
function se(e, t) {
  const n = f(t);
  n.current = t, w(() => {
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
function Ze({ open: e, onRequestClose: t, head: n, actions: r, footer: a, children: l, scrollKey: c, className: u }) {
  const o = ee(re), h = f(null);
  w(() => {
    h.current && (h.current.scrollTop = 0);
  }, [c]);
  const g = f(!1), y = f(void 0), $ = f(t);
  $.current = t;
  const E = f(() => (g.current || (g.current = !0, setTimeout(() => {
    g.current = !1;
  }, 0), y.current = $.current()), y.current)).current;
  se(e, E);
  const P = ae(E), L = o ? p : N, O = /* @__PURE__ */ i(k, { children: [
    /* @__PURE__ */ i("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(L.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ i("span", { className: "vs-sheet__actions", children: [
        r,
        /* @__PURE__ */ s(L.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: h, className: "vs-sheet__body", children: l }),
    a != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: a })
  ] });
  return o ? /* @__PURE__ */ s(p.Root, { open: e, onOpenChange: P, children: /* @__PURE__ */ s(p.VirtualKeyboardProvider, { children: /* @__PURE__ */ i(p.Portal, { children: [
    /* @__PURE__ */ s(p.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ s(p.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ i(p.Popup, { className: d("vs-sheet", "vs-sheet--drawer", u), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(p.Content, { className: "vs-sheet__content", children: O })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(N.Root, { open: e, onOpenChange: P, children: /* @__PURE__ */ i(N.Portal, { children: [
    /* @__PURE__ */ s(N.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ s(N.Popup, { className: d("vs-sheet", u), children: O })
  ] }) });
}
function Be({ value: e, onChange: t, options: n, label: r, className: a, disabled: l }) {
  const [c, u] = M(!1);
  return w(() => c ? j() : void 0, [c]), /* @__PURE__ */ s(H, { disableStyleElements: !0, children: /* @__PURE__ */ i(m.Root, { open: c, onOpenChange: u, value: e, onValueChange: (o) => {
    o !== null && t(o);
  }, items: n, disabled: l, children: [
    /* @__PURE__ */ i("div", { className: d("vs-select", a), children: [
      /* @__PURE__ */ s(m.Label, { className: "vs-select__label", children: r }),
      /* @__PURE__ */ i(m.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(m.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(m.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ s(m.Portal, { children: /* @__PURE__ */ s(m.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(m.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(m.List, { className: "vs-select__list", children: n.map((o) => /* @__PURE__ */ i(m.Item, { value: o.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(m.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ s(m.ItemText, { children: o.label })
    ] }, o.value)) }) }) }) })
  ] }) });
}
const le = 1500;
function ce({ item: e }) {
  return "options" in e ? /* @__PURE__ */ i(v.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ s(v.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ s(v.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ i(v.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ s(v.RadioItemIndicator, { className: "vs-menu__check", children: "✓" }),
      /* @__PURE__ */ s("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ i(v.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ s(v.CheckboxItemIndicator, { className: "vs-menu__check", children: "✓" }),
    /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ s(v.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label }) });
}
function je({ items: e, children: t, longPress: n = !0, disabled: r, className: a }) {
  const [l, c] = M(!1);
  w(() => l ? j() : void 0, [l]);
  const u = f(0), o = n ? {} : {
    onTouchStart: (h) => {
      u.current = Date.now(), h.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (h) => {
      (h.nativeEvent.pointerType === "touch" || Date.now() - u.current < le) && h.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(H, { disableStyleElements: !0, children: /* @__PURE__ */ i(v.Root, { open: l, onOpenChange: c, disabled: r, children: [
    /* @__PURE__ */ s(v.Trigger, { render: t, ...o }),
    /* @__PURE__ */ s(v.Portal, { children: /* @__PURE__ */ s(v.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(v.Popup, { className: d("vs-menu", a), children: e.map((h, g) => h === "separator" ? /* @__PURE__ */ s(v.Separator, { className: "vs-menu__separator" }, g) : /* @__PURE__ */ s(ce, { item: h }, g)) }) }) })
  ] }) });
}
const A = {
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
function ze(e, t) {
  const [n, r] = M(() => A.get(e, t)), a = x((l) => {
    r(l), A.set(e, l);
  }, [e]);
  return [n, a];
}
export {
  T as ApiError,
  Oe as Banner,
  Se as Button,
  ke as Chip,
  je as ContextMenu,
  xe as ICON_NAMES,
  V as Icon,
  Ie as IconButton,
  Pe as List,
  Le as ListRow,
  De as Segment,
  Be as Select,
  Ze as Sheet,
  Ee as Stat,
  Ae as Switch,
  $e as Tile,
  Re as ToastProvider,
  Te as api,
  Me as clampText,
  Ce as compact,
  He as createQueryClient,
  d as cx,
  ge as fmtDate,
  Ne as fmtDay,
  ye as linkify,
  be as localToday,
  we as plural,
  q as shouldRetry,
  A as storage,
  ze as useLocalStorage,
  ee as useMediaQuery,
  Ve as useToast
};
