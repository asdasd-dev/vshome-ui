import { jsx as o, jsxs as d, Fragment as R } from "react/jsx-runtime";
import { QueryClient as j } from "@tanstack/react-query";
import { useState as P, useRef as f, useCallback as x, useEffect as N, useContext as B, createContext as F, useSyncExternalStore as V } from "react";
import { createPortal as H } from "react-dom";
import { Dialog as g } from "@base-ui/react/dialog";
import { Drawer as h } from "@base-ui/react/drawer";
import { CSPProvider as K } from "@base-ui/react/csp-provider";
import { Select as u } from "@base-ui/react/select";
function v(...e) {
  return e.filter(Boolean).join(" ");
}
const m = (e) => String(e).padStart(2, "0");
function ae(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${m(t.getDate())}.${m(t.getMonth() + 1)}.${t.getFullYear()} ${m(t.getHours())}:${m(t.getMinutes())}`;
}
function ue(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${m(t.getDate())}.${m(t.getMonth() + 1)}`;
}
function de(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${m(e.getMonth() + 1)}-${m(e.getDate())}`;
}
function he(e, t, r) {
  const n = e.split(`
`);
  let s = 0, c = n.length;
  for (let l = 0; l < n.length; l++)
    if (n[l].trim() && s++, s === t) {
      c = l + 1;
      break;
    }
  let i = n.slice(0, c).join(`
`), a = c < n.length && n.slice(c).some((l) => l.trim());
  if (i.length > r) {
    const l = i.slice(0, r + 1), p = l.lastIndexOf(" ");
    i = p > 0 ? l.slice(0, p) : i.slice(0, r), a = !0;
  }
  return a ? { text: i.trimEnd() + "…", cut: a } : { text: i, cut: a };
}
const Q = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, G = /[.,;:!?)»"']+$/;
function me(e) {
  const t = [];
  let r = 0;
  for (const n of e.matchAll(Q)) {
    const s = n.index;
    let c = n[2] ?? n[0], i = n[1] ?? c, a = s + n[0].length;
    if (!n[2]) {
      const l = G.exec(c)?.[0] ?? "";
      c = c.slice(0, c.length - l.length), i = c, a -= l.length;
    }
    s > r && t.push({ text: e.slice(r, s) }), t.push({ url: c, text: i }), r = a;
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
async function fe(e, t, r) {
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
function pe({ variant: e, className: t, type: r = "button", ...n }) {
  return /* @__PURE__ */ o("button", { type: r, className: v("vs-button", e && `vs-button--${e}`, t), ...n });
}
function ve({ pressed: e, onClick: t, children: r, className: n, title: s }) {
  return /* @__PURE__ */ o("button", { type: "button", className: v("vs-chip", n), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: s, children: r });
}
function ge({ options: e, value: t, onChange: r, ariaLabel: n }) {
  return /* @__PURE__ */ o("div", { className: "vs-segment", role: "group", "aria-label": n, children: e.map((s) => /* @__PURE__ */ o("button", { type: "button", "aria-pressed": s.value === t, onClick: () => r(s.value), children: s.label }, s.value)) });
}
const w = (e) => e.stopPropagation();
function we({ checked: e, onChange: t, label: r, icon: n, title: s, size: c = "md", disabled: i }) {
  return /* @__PURE__ */ d("label", { className: v("vs-switch", c === "sm" && "vs-switch--sm"), title: s, onClick: w, onKeyDown: w, onPointerDown: w, onMouseDown: w, onTouchStart: w, children: [
    n != null && /* @__PURE__ */ o("span", { "aria-hidden": "true", children: n }),
    /* @__PURE__ */ o("input", { type: "checkbox", role: "switch", "aria-label": r, checked: e, disabled: i, onChange: (a) => t(a.target.checked) })
  ] });
}
function Y(e, t) {
  return t instanceof y && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function _e() {
  return new j({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: Y },
      mutations: { retry: !1 }
    }
  });
}
const M = F(null);
function Ne({ children: e, duration: t = 3500 }) {
  const [r, n] = P(null), s = f(void 0), c = x((i) => {
    clearTimeout(s.current), n((a) => ({ text: i, id: (a?.id ?? 0) + 1 })), s.current = setTimeout(() => n(null), t);
  }, [t]);
  return N(() => () => clearTimeout(s.current), []), /* @__PURE__ */ d(M.Provider, { value: c, children: [
    e,
    r && H(/* @__PURE__ */ o("div", { className: "vs-toast", role: "status", children: r.text }, r.id), document.body)
  ] });
}
function be() {
  const e = B(M);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function J(e) {
  const t = x((r) => {
    const n = window.matchMedia(e);
    return n.addEventListener("change", r), () => n.removeEventListener("change", r);
  }, [e]);
  return V(t, () => window.matchMedia(e).matches, () => !1);
}
const U = 1e3;
let S = 0, C = !1, A;
function _() {
  C = !1, clearTimeout(A), window.removeEventListener("click", _);
}
function L() {
  _(), C = !0, A = setTimeout(_, U), window.addEventListener("click", _);
}
function q() {
  return S += 1, document.addEventListener("pointerdown", L, !0), () => {
    S -= 1, document.removeEventListener("pointerdown", L, !0);
  };
}
const z = () => S > 0 || C;
function X(e, t) {
  const r = f(t);
  r.current = t, N(() => {
    const n = window.CloseWatcher;
    if (!e || !n || !/Android/i.test(navigator.userAgent)) return;
    let s;
    const c = () => {
      s = new n(), s.onclose = () => {
        r.current() === !1 && c();
      };
    };
    return c(), () => s.destroy();
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
function Te({ open: e, onRequestClose: t, head: r, actions: n, footer: s, children: c, scrollKey: i, className: a }) {
  const l = J(Z), p = f(null);
  N(() => {
    p.current && (p.current.scrollTop = 0);
  }, [i]);
  const b = f(!1), T = f(void 0), E = f(t);
  E.current = t;
  const D = f(() => (b.current || (b.current = !0, setTimeout(() => {
    b.current = !1;
  }, 0), T.current = E.current()), T.current)).current;
  X(e, D);
  const $ = ee(D), k = l ? h : g, I = /* @__PURE__ */ d(R, { children: [
    /* @__PURE__ */ d("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ o(k.Title, { className: "vs-sheet__title", children: r }),
      /* @__PURE__ */ d("span", { className: "vs-sheet__actions", children: [
        n,
        /* @__PURE__ */ o(k.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { ref: p, className: "vs-sheet__body", children: c }),
    s != null && /* @__PURE__ */ o("footer", { className: "vs-sheet__foot", children: s })
  ] });
  return l ? /* @__PURE__ */ o(h.Root, { open: e, onOpenChange: $, children: /* @__PURE__ */ o(h.VirtualKeyboardProvider, { children: /* @__PURE__ */ d(h.Portal, { children: [
    /* @__PURE__ */ o(h.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ o(h.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ d(h.Popup, { className: v("vs-sheet", "vs-sheet--drawer", a), children: [
      /* @__PURE__ */ o("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ o(h.Content, { className: "vs-sheet__content", children: I })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ o(g.Root, { open: e, onOpenChange: $, children: /* @__PURE__ */ d(g.Portal, { children: [
    /* @__PURE__ */ o(g.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ o(g.Popup, { className: v("vs-sheet", a), children: I })
  ] }) });
}
function ye({ value: e, onChange: t, options: r, label: n, className: s, disabled: c }) {
  const [i, a] = P(!1);
  return N(() => i ? q() : void 0, [i]), /* @__PURE__ */ o(K, { disableStyleElements: !0, children: /* @__PURE__ */ d(u.Root, { open: i, onOpenChange: a, value: e, onValueChange: (l) => {
    l !== null && t(l);
  }, items: r, disabled: c, children: [
    /* @__PURE__ */ d("div", { className: v("vs-select", s), children: [
      /* @__PURE__ */ o(u.Label, { className: "vs-select__label", children: n }),
      /* @__PURE__ */ d(u.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ o(u.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ o(u.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ o(u.Portal, { children: /* @__PURE__ */ o(u.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ o(u.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ o(u.List, { className: "vs-select__list", children: r.map((l) => /* @__PURE__ */ d(u.Item, { value: l.value, className: "vs-select__item", children: [
      /* @__PURE__ */ o(u.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ o(u.ItemText, { children: l.label })
    ] }, l.value)) }) }) }) })
  ] }) });
}
const O = {
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
function Se(e, t) {
  const [r, n] = P(() => O.get(e, t)), s = x((c) => {
    n(c), O.set(e, c);
  }, [e]);
  return [r, s];
}
export {
  y as ApiError,
  pe as Button,
  ve as Chip,
  ge as Segment,
  ye as Select,
  Te as Sheet,
  we as Switch,
  Ne as ToastProvider,
  fe as api,
  he as clampText,
  _e as createQueryClient,
  v as cx,
  ae as fmtDate,
  ue as fmtDay,
  me as linkify,
  de as localToday,
  Y as shouldRetry,
  O as storage,
  Se as useLocalStorage,
  J as useMediaQuery,
  be as useToast
};
