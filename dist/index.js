import { c as v } from "./cx.js";
import { jsx as c, jsxs as d, Fragment as R } from "react/jsx-runtime";
import { QueryClient as j } from "@tanstack/react-query";
import { useState as x, useRef as f, useCallback as P, useEffect as b, useContext as F, createContext as V, useSyncExternalStore as B } from "react";
import { createPortal as H } from "react-dom";
import { Dialog as g } from "@base-ui/react/dialog";
import { Drawer as h } from "@base-ui/react/drawer";
import { CSPProvider as K } from "@base-ui/react/csp-provider";
import { Select as u } from "@base-ui/react/select";
const m = (e) => String(e).padStart(2, "0");
function ue(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${m(t.getDate())}.${m(t.getMonth() + 1)}.${t.getFullYear()} ${m(t.getHours())}:${m(t.getMinutes())}`;
}
function de(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${m(t.getDate())}.${m(t.getMonth() + 1)}`;
}
function he(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${m(e.getMonth() + 1)}-${m(e.getDate())}`;
}
function me(e, t, r, n) {
  const s = Math.abs(Math.round(e)) % 100, o = s % 10;
  return o === 1 && s !== 11 ? t : o >= 2 && o <= 4 && (s < 12 || s > 14) ? r : n;
}
function fe(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function pe(e, t, r) {
  const n = e.split(`
`);
  let s = 0, o = n.length;
  for (let a = 0; a < n.length; a++)
    if (n[a].trim() && s++, s === t) {
      o = a + 1;
      break;
    }
  let l = n.slice(0, o).join(`
`), i = o < n.length && n.slice(o).some((a) => a.trim());
  if (l.length > r) {
    const a = l.slice(0, r + 1), p = a.lastIndexOf(" ");
    l = p > 0 ? a.slice(0, p) : l.slice(0, r), i = !0;
  }
  return i ? { text: l.trimEnd() + "…", cut: i } : { text: l, cut: i };
}
const Q = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, G = /[.,;:!?)»"']+$/;
function ve(e) {
  const t = [];
  let r = 0;
  for (const n of e.matchAll(Q)) {
    const s = n.index;
    let o = n[2] ?? n[0], l = n[1] ?? o, i = s + n[0].length;
    if (!n[2]) {
      const a = G.exec(o)?.[0] ?? "";
      o = o.slice(0, o.length - a.length), l = o, i -= a.length;
    }
    s > r && t.push({ text: e.slice(r, s) }), t.push({ url: o, text: l }), r = i;
  }
  return r < e.length && t.push({ text: e.slice(r) }), t;
}
class y extends Error {
  status;
  data;
  constructor(t, r, n) {
    super(t), this.name = "ApiError", this.status = r, this.data = n;
  }
}
function W(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function ge(e, t, r) {
  let n;
  try {
    n = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: r === void 0 ? {} : { "Content-Type": "application/json" },
      body: r === void 0 ? void 0 : JSON.stringify(r)
    });
  } catch {
    throw new y("нет связи с сервером", 0, null);
  }
  const s = await n.json().catch(() => ({}));
  if (!n.ok) throw new y(W(s, n.status), n.status, s);
  return s;
}
function we({ variant: e, className: t, type: r = "button", ...n }) {
  return /* @__PURE__ */ c("button", { type: r, className: v("vs-button", e && `vs-button--${e}`, t), ...n });
}
function _e({ pressed: e, onClick: t, children: r, className: n, title: s }) {
  return /* @__PURE__ */ c("button", { type: "button", className: v("vs-chip", n), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: s, children: r });
}
function be({ options: e, value: t, onChange: r, ariaLabel: n }) {
  return /* @__PURE__ */ c("div", { className: "vs-segment", role: "group", "aria-label": n, children: e.map((s) => /* @__PURE__ */ c("button", { type: "button", "aria-pressed": s.value === t, onClick: () => r(s.value), children: s.label }, s.value)) });
}
const w = (e) => e.stopPropagation();
function Ne({ checked: e, onChange: t, label: r, icon: n, title: s, size: o = "md", disabled: l }) {
  return /* @__PURE__ */ d("label", { className: v("vs-switch", o === "sm" && "vs-switch--sm"), title: s, onClick: w, onKeyDown: w, onPointerDown: w, onMouseDown: w, onTouchStart: w, children: [
    n != null && /* @__PURE__ */ c("span", { "aria-hidden": "true", children: n }),
    /* @__PURE__ */ c("input", { type: "checkbox", role: "switch", "aria-label": r, checked: e, disabled: l, onChange: (i) => t(i.target.checked) })
  ] });
}
function Y(e, t) {
  return t instanceof y && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function Te() {
  return new j({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: Y },
      mutations: { retry: !1 }
    }
  });
}
const O = V(null);
function ye({ children: e, duration: t = 3500 }) {
  const [r, n] = x(null), s = f(void 0), o = P((l) => {
    clearTimeout(s.current), n((i) => ({ text: l, id: (i?.id ?? 0) + 1 })), s.current = setTimeout(() => n(null), t);
  }, [t]);
  return b(() => () => clearTimeout(s.current), []), /* @__PURE__ */ d(O.Provider, { value: o, children: [
    e,
    r && H(/* @__PURE__ */ c("div", { className: "vs-toast", role: "status", children: r.text }, r.id), document.body)
  ] });
}
function Se() {
  const e = F(O);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function J(e) {
  const t = P((r) => {
    const n = window.matchMedia(e);
    return n.addEventListener("change", r), () => n.removeEventListener("change", r);
  }, [e]);
  return B(t, () => window.matchMedia(e).matches, () => !1);
}
const U = 1e3;
let S = 0, C = !1, A;
function _() {
  C = !1, clearTimeout(A), window.removeEventListener("click", _);
}
function I() {
  _(), C = !0, A = setTimeout(_, U), window.addEventListener("click", _);
}
function q() {
  return S += 1, document.addEventListener("pointerdown", I, !0), () => {
    S -= 1, document.removeEventListener("pointerdown", I, !0);
  };
}
const z = () => S > 0 || C;
function X(e, t) {
  const r = f(t);
  r.current = t, b(() => {
    const n = window.CloseWatcher;
    if (!e || !n || !/Android/i.test(navigator.userAgent)) return;
    let s;
    const o = () => {
      s = new n(), s.onclose = () => {
        r.current() === !1 && o();
      };
    };
    return o(), () => s.destroy();
  }, [e]);
}
const Z = "(max-width: 760px)";
function ee(e) {
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
function xe({ open: e, onRequestClose: t, head: r, actions: n, footer: s, children: o, scrollKey: l, className: i }) {
  const a = J(Z), p = f(null);
  b(() => {
    p.current && (p.current.scrollTop = 0);
  }, [l]);
  const N = f(!1), T = f(void 0), E = f(t);
  E.current = t;
  const $ = f(() => (N.current || (N.current = !0, setTimeout(() => {
    N.current = !1;
  }, 0), T.current = E.current()), T.current)).current;
  X(e, $);
  const k = ee($), D = a ? h : g, M = /* @__PURE__ */ d(R, { children: [
    /* @__PURE__ */ d("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ c(D.Title, { className: "vs-sheet__title", children: r }),
      /* @__PURE__ */ d("span", { className: "vs-sheet__actions", children: [
        n,
        /* @__PURE__ */ c(D.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ c("div", { ref: p, className: "vs-sheet__body", children: o }),
    s != null && /* @__PURE__ */ c("footer", { className: "vs-sheet__foot", children: s })
  ] });
  return a ? /* @__PURE__ */ c(h.Root, { open: e, onOpenChange: k, children: /* @__PURE__ */ c(h.VirtualKeyboardProvider, { children: /* @__PURE__ */ d(h.Portal, { children: [
    /* @__PURE__ */ c(h.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ c(h.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ d(h.Popup, { className: v("vs-sheet", "vs-sheet--drawer", i), children: [
      /* @__PURE__ */ c("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ c(h.Content, { className: "vs-sheet__content", children: M })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ c(g.Root, { open: e, onOpenChange: k, children: /* @__PURE__ */ d(g.Portal, { children: [
    /* @__PURE__ */ c(g.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ c(g.Popup, { className: v("vs-sheet", i), children: M })
  ] }) });
}
function Pe({ value: e, onChange: t, options: r, label: n, className: s, disabled: o }) {
  const [l, i] = x(!1);
  return b(() => l ? q() : void 0, [l]), /* @__PURE__ */ c(K, { disableStyleElements: !0, children: /* @__PURE__ */ d(u.Root, { open: l, onOpenChange: i, value: e, onValueChange: (a) => {
    a !== null && t(a);
  }, items: r, disabled: o, children: [
    /* @__PURE__ */ d("div", { className: v("vs-select", s), children: [
      /* @__PURE__ */ c(u.Label, { className: "vs-select__label", children: n }),
      /* @__PURE__ */ d(u.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ c(u.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ c(u.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ c(u.Portal, { children: /* @__PURE__ */ c(u.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ c(u.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ c(u.List, { className: "vs-select__list", children: r.map((a) => /* @__PURE__ */ d(u.Item, { value: a.value, className: "vs-select__item", children: [
      /* @__PURE__ */ c(u.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ c(u.ItemText, { children: a.label })
    ] }, a.value)) }) }) }) })
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
function Ce(e, t) {
  const [r, n] = x(() => L.get(e, t)), s = P((o) => {
    n(o), L.set(e, o);
  }, [e]);
  return [r, s];
}
export {
  y as ApiError,
  we as Button,
  _e as Chip,
  be as Segment,
  Pe as Select,
  xe as Sheet,
  Ne as Switch,
  ye as ToastProvider,
  ge as api,
  pe as clampText,
  fe as compact,
  Te as createQueryClient,
  v as cx,
  ue as fmtDate,
  de as fmtDay,
  ve as linkify,
  he as localToday,
  me as plural,
  Y as shouldRetry,
  L as storage,
  Ce as useLocalStorage,
  J as useMediaQuery,
  Se as useToast
};
