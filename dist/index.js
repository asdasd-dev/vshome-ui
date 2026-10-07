import { c as g } from "./cx.js";
import { jsx as s, jsxs as u, Fragment as B } from "react/jsx-runtime";
import { QueryClient as F } from "@tanstack/react-query";
import { useState as T, useRef as f, useCallback as y, useEffect as N, useContext as H, createContext as G, useSyncExternalStore as U } from "react";
import { createPortal as K } from "react-dom";
import { Dialog as b } from "@base-ui/react/dialog";
import { Drawer as p } from "@base-ui/react/drawer";
import { CSPProvider as R } from "@base-ui/react/csp-provider";
import { Select as m } from "@base-ui/react/select";
import { ContextMenu as h } from "@base-ui/react/context-menu";
const v = (e) => String(e).padStart(2, "0");
function pe(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${v(t.getDate())}.${v(t.getMonth() + 1)}.${t.getFullYear()} ${v(t.getHours())}:${v(t.getMinutes())}`;
}
function fe(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${v(t.getDate())}.${v(t.getMonth() + 1)}`;
}
function ve(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${v(e.getMonth() + 1)}-${v(e.getDate())}`;
}
function _e(e, t, r, n) {
  const o = Math.abs(Math.round(e)) % 100, c = o % 10;
  return c === 1 && o !== 11 ? t : c >= 2 && c <= 4 && (o < 12 || o > 14) ? r : n;
}
function ge(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function be(e, t, r) {
  const n = e.split(`
`);
  let o = 0, c = n.length;
  for (let a = 0; a < n.length; a++)
    if (n[a].trim() && o++, o === t) {
      c = a + 1;
      break;
    }
  let l = n.slice(0, c).join(`
`), i = c < n.length && n.slice(c).some((a) => a.trim());
  if (l.length > r) {
    const a = l.slice(0, r + 1), d = a.lastIndexOf(" ");
    l = d > 0 ? a.slice(0, d) : l.slice(0, r), i = !0;
  }
  return i ? { text: l.trimEnd() + "…", cut: i } : { text: l, cut: i };
}
const Q = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, W = /[.,;:!?)»"']+$/;
function we(e) {
  const t = [];
  let r = 0;
  for (const n of e.matchAll(Q)) {
    const o = n.index;
    let c = n[2] ?? n[0], l = n[1] ?? c, i = o + n[0].length;
    if (!n[2]) {
      const a = W.exec(c)?.[0] ?? "";
      c = c.slice(0, c.length - a.length), l = c, i -= a.length;
    }
    o > r && t.push({ text: e.slice(r, o) }), t.push({ url: c, text: l }), r = i;
  }
  return r < e.length && t.push({ text: e.slice(r) }), t;
}
class S extends Error {
  status;
  data;
  constructor(t, r, n) {
    super(t), this.name = "ApiError", this.status = r, this.data = n;
  }
}
function Y(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function Ne(e, t, r) {
  let n;
  try {
    n = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: r === void 0 ? {} : { "Content-Type": "application/json" },
      body: r === void 0 ? void 0 : JSON.stringify(r)
    });
  } catch {
    throw new S("нет связи с сервером", 0, null);
  }
  const o = await n.json().catch(() => ({}));
  if (!n.ok) throw new S(Y(o, n.status), n.status, o);
  return o;
}
function Ce({ variant: e, className: t, type: r = "button", ...n }) {
  return /* @__PURE__ */ s("button", { type: r, className: g("vs-button", e && `vs-button--${e}`, t), ...n });
}
function Te({ pressed: e, onClick: t, children: r, className: n, title: o }) {
  return /* @__PURE__ */ s("button", { type: "button", className: g("vs-chip", n), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: o, children: r });
}
function xe({ options: e, value: t, onChange: r, ariaLabel: n }) {
  return /* @__PURE__ */ s("div", { className: "vs-segment", role: "group", "aria-label": n, children: e.map((o) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": o.value === t, onClick: () => r(o.value), children: o.label }, o.value)) });
}
const w = (e) => e.stopPropagation();
function Se({ checked: e, onChange: t, label: r, icon: n, title: o, size: c = "md", disabled: l }) {
  return /* @__PURE__ */ u("label", { className: g("vs-switch", c === "sm" && "vs-switch--sm"), title: o, onClick: w, onKeyDown: w, onPointerDown: w, onMouseDown: w, onTouchStart: w, children: [
    n != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: n }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": r, checked: e, disabled: l, onChange: (i) => t(i.target.checked) })
  ] });
}
function J(e, t) {
  return t instanceof S && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function ke() {
  return new F({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: J },
      mutations: { retry: !1 }
    }
  });
}
const A = G(null);
function ye({ children: e, duration: t = 3500 }) {
  const [r, n] = T(null), o = f(void 0), c = y((l) => {
    clearTimeout(o.current), n((i) => ({ text: l, id: (i?.id ?? 0) + 1 })), o.current = setTimeout(() => n(null), t);
  }, [t]);
  return N(() => () => clearTimeout(o.current), []), /* @__PURE__ */ u(A.Provider, { value: c, children: [
    e,
    r && K(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: r.text }, r.id), document.body)
  ] });
}
function Pe() {
  const e = H(A);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function X(e) {
  const t = y((r) => {
    const n = window.matchMedia(e);
    return n.addEventListener("change", r), () => n.removeEventListener("change", r);
  }, [e]);
  return U(t, () => window.matchMedia(e).matches, () => !1);
}
const q = 1e3;
let k = 0, P = !1, V;
function C() {
  P = !1, clearTimeout(V), window.removeEventListener("click", C);
}
function D() {
  C(), P = !0, V = setTimeout(C, q), window.addEventListener("click", C);
}
function j() {
  return k += 1, document.addEventListener("pointerdown", D, !0), () => {
    k -= 1, document.removeEventListener("pointerdown", D, !0);
  };
}
const z = () => k > 0 || P;
function Z(e, t) {
  const r = f(t);
  r.current = t, N(() => {
    const n = window.CloseWatcher;
    if (!e || !n || !/Android/i.test(navigator.userAgent)) return;
    let o;
    const c = () => {
      o = new n(), o.onclose = () => {
        r.current() === !1 && c();
      };
    };
    return c(), () => o.destroy();
  }, [e]);
}
const ee = "(max-width: 760px)";
function te(e) {
  return (t, r) => {
    if (!t) {
      if (r.reason === "outside-press" && z()) {
        r.cancel();
        return;
      }
      e() === !1 && r.cancel();
    }
  };
}
function Ee({ open: e, onRequestClose: t, head: r, actions: n, footer: o, children: c, scrollKey: l, className: i }) {
  const a = X(ee), d = f(null);
  N(() => {
    d.current && (d.current.scrollTop = 0);
  }, [l]);
  const _ = f(!1), x = f(void 0), E = f(t);
  E.current = t;
  const I = f(() => (_.current || (_.current = !0, setTimeout(() => {
    _.current = !1;
  }, 0), x.current = E.current()), x.current)).current;
  Z(e, I);
  const M = te(I), O = a ? p : b, $ = /* @__PURE__ */ u(B, { children: [
    /* @__PURE__ */ u("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(O.Title, { className: "vs-sheet__title", children: r }),
      /* @__PURE__ */ u("span", { className: "vs-sheet__actions", children: [
        n,
        /* @__PURE__ */ s(O.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: d, className: "vs-sheet__body", children: c }),
    o != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: o })
  ] });
  return a ? /* @__PURE__ */ s(p.Root, { open: e, onOpenChange: M, children: /* @__PURE__ */ s(p.VirtualKeyboardProvider, { children: /* @__PURE__ */ u(p.Portal, { children: [
    /* @__PURE__ */ s(p.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ s(p.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ u(p.Popup, { className: g("vs-sheet", "vs-sheet--drawer", i), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(p.Content, { className: "vs-sheet__content", children: $ })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(b.Root, { open: e, onOpenChange: M, children: /* @__PURE__ */ u(b.Portal, { children: [
    /* @__PURE__ */ s(b.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ s(b.Popup, { className: g("vs-sheet", i), children: $ })
  ] }) });
}
function Ie({ value: e, onChange: t, options: r, label: n, className: o, disabled: c }) {
  const [l, i] = T(!1);
  return N(() => l ? j() : void 0, [l]), /* @__PURE__ */ s(R, { disableStyleElements: !0, children: /* @__PURE__ */ u(m.Root, { open: l, onOpenChange: i, value: e, onValueChange: (a) => {
    a !== null && t(a);
  }, items: r, disabled: c, children: [
    /* @__PURE__ */ u("div", { className: g("vs-select", o), children: [
      /* @__PURE__ */ s(m.Label, { className: "vs-select__label", children: n }),
      /* @__PURE__ */ u(m.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(m.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(m.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ s(m.Portal, { children: /* @__PURE__ */ s(m.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(m.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(m.List, { className: "vs-select__list", children: r.map((a) => /* @__PURE__ */ u(m.Item, { value: a.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(m.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ s(m.ItemText, { children: a.label })
    ] }, a.value)) }) }) }) })
  ] }) });
}
const ne = 1500;
function re({ item: e }) {
  return "options" in e ? /* @__PURE__ */ u(h.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ s(h.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ s(h.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ u(h.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ s(h.RadioItemIndicator, { className: "vs-menu__check", children: "✓" }),
      /* @__PURE__ */ s("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ u(h.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ s(h.CheckboxItemIndicator, { className: "vs-menu__check", children: "✓" }),
    /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ s(h.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label }) });
}
function Me({ items: e, children: t, longPress: r = !0, disabled: n, className: o }) {
  const [c, l] = T(!1);
  N(() => c ? j() : void 0, [c]);
  const i = f(0), a = r ? {} : {
    onTouchStart: (d) => {
      i.current = Date.now(), d.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (d) => {
      (d.nativeEvent.pointerType === "touch" || Date.now() - i.current < ne) && d.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(R, { disableStyleElements: !0, children: /* @__PURE__ */ u(h.Root, { open: c, onOpenChange: l, disabled: n, children: [
    /* @__PURE__ */ s(h.Trigger, { render: t, ...a }),
    /* @__PURE__ */ s(h.Portal, { children: /* @__PURE__ */ s(h.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(h.Popup, { className: g("vs-menu", o), children: e.map((d, _) => d === "separator" ? /* @__PURE__ */ s(h.Separator, { className: "vs-menu__separator" }, _) : /* @__PURE__ */ s(re, { item: d }, _)) }) }) })
  ] }) });
}
const L = {
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
function Oe(e, t) {
  const [r, n] = T(() => L.get(e, t)), o = y((c) => {
    n(c), L.set(e, c);
  }, [e]);
  return [r, o];
}
export {
  S as ApiError,
  Ce as Button,
  Te as Chip,
  Me as ContextMenu,
  xe as Segment,
  Ie as Select,
  Ee as Sheet,
  Se as Switch,
  ye as ToastProvider,
  Ne as api,
  be as clampText,
  ge as compact,
  ke as createQueryClient,
  g as cx,
  pe as fmtDate,
  fe as fmtDay,
  we as linkify,
  ve as localToday,
  _e as plural,
  J as shouldRetry,
  L as storage,
  Oe as useLocalStorage,
  X as useMediaQuery,
  Pe as useToast
};
