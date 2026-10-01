import { jsx as c, jsxs as h, Fragment as k } from "react/jsx-runtime";
import { QueryClient as M } from "@tanstack/react-query";
import { useState as D, useRef as f, useCallback as T, useEffect as y, useContext as L, createContext as O, useSyncExternalStore as j } from "react";
import { createPortal as A } from "react-dom";
import { Dialog as g } from "@base-ui/react/dialog";
import { Drawer as d } from "@base-ui/react/drawer";
import { CSPProvider as R } from "@base-ui/react/csp-provider";
import { Select as u } from "@base-ui/react/select";
function v(...e) {
  return e.filter(Boolean).join(" ");
}
const m = (e) => String(e).padStart(2, "0");
function te(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${m(t.getDate())}.${m(t.getMonth() + 1)}.${t.getFullYear()} ${m(t.getHours())}:${m(t.getMinutes())}`;
}
function ne(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${m(t.getDate())}.${m(t.getMonth() + 1)}`;
}
function re(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${m(e.getMonth() + 1)}-${m(e.getDate())}`;
}
function se(e, t, r) {
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
const B = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, F = /[.,;:!?)»"']+$/;
function ce(e) {
  const t = [];
  let r = 0;
  for (const n of e.matchAll(B)) {
    const s = n.index;
    let o = n[2] ?? n[0], l = n[1] ?? o, i = s + n[0].length;
    if (!n[2]) {
      const a = F.exec(o)?.[0] ?? "";
      o = o.slice(0, o.length - a.length), l = o, i -= a.length;
    }
    s > r && t.push({ text: e.slice(r, s) }), t.push({ url: o, text: l }), r = i;
  }
  return r < e.length && t.push({ text: e.slice(r) }), t;
}
class b extends Error {
  status;
  data;
  constructor(t, r, n) {
    super(t), this.name = "ApiError", this.status = r, this.data = n;
  }
}
function V(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function oe(e, t, r) {
  let n;
  try {
    n = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: r === void 0 ? {} : { "Content-Type": "application/json" },
      body: r === void 0 ? void 0 : JSON.stringify(r)
    });
  } catch {
    throw new b("нет связи с сервером", 0, null);
  }
  const s = await n.json().catch(() => ({}));
  if (!n.ok) throw new b(V(s, n.status), n.status, s);
  return s;
}
function le({ variant: e, className: t, type: r = "button", ...n }) {
  return /* @__PURE__ */ c("button", { type: r, className: v("vs-button", e && `vs-button--${e}`, t), ...n });
}
function ae({ pressed: e, onClick: t, children: r, className: n, title: s }) {
  return /* @__PURE__ */ c("button", { type: "button", className: v("vs-chip", n), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: s, children: r });
}
function ie({ options: e, value: t, onChange: r, ariaLabel: n }) {
  return /* @__PURE__ */ c("div", { className: "vs-segment", role: "group", "aria-label": n, children: e.map((s) => /* @__PURE__ */ c("button", { type: "button", "aria-pressed": s.value === t, onClick: () => r(s.value), children: s.label }, s.value)) });
}
const w = (e) => e.stopPropagation();
function ue({ checked: e, onChange: t, label: r, icon: n, title: s, size: o = "md", disabled: l }) {
  return /* @__PURE__ */ h("label", { className: v("vs-switch", o === "sm" && "vs-switch--sm"), title: s, onClick: w, onKeyDown: w, onPointerDown: w, onMouseDown: w, onTouchStart: w, children: [
    n != null && /* @__PURE__ */ c("span", { "aria-hidden": "true", children: n }),
    /* @__PURE__ */ c("input", { type: "checkbox", role: "switch", "aria-label": r, checked: e, disabled: l, onChange: (i) => t(i.target.checked) })
  ] });
}
function H(e, t) {
  return t instanceof b && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function he() {
  return new M({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: H },
      mutations: { retry: !1 }
    }
  });
}
const I = O(null);
function de({ children: e, duration: t = 3500 }) {
  const [r, n] = D(null), s = f(void 0), o = T((l) => {
    clearTimeout(s.current), n((i) => ({ text: l, id: (i?.id ?? 0) + 1 })), s.current = setTimeout(() => n(null), t);
  }, [t]);
  return y(() => () => clearTimeout(s.current), []), /* @__PURE__ */ h(I.Provider, { value: o, children: [
    e,
    r && A(/* @__PURE__ */ c("div", { className: "vs-toast", role: "status", children: r.text }, r.id), document.body)
  ] });
}
function me() {
  const e = L(I);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function K(e) {
  const t = T((r) => {
    const n = window.matchMedia(e);
    return n.addEventListener("change", r), () => n.removeEventListener("change", r);
  }, [e]);
  return j(t, () => window.matchMedia(e).matches, () => !1);
}
function Q(e, t) {
  const r = f(t);
  r.current = t, y(() => {
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
const W = "(max-width: 760px)";
function Y(e) {
  return (t, r) => {
    t || e() === !1 && r.cancel();
  };
}
function fe({ open: e, onRequestClose: t, head: r, actions: n, footer: s, children: o, scrollKey: l, className: i }) {
  const a = K(W), p = f(null);
  y(() => {
    p.current && (p.current.scrollTop = 0);
  }, [l]);
  const _ = f(!1), N = f(void 0), S = f(t);
  S.current = t;
  const x = f(() => (_.current || (_.current = !0, setTimeout(() => {
    _.current = !1;
  }, 0), N.current = S.current()), N.current)).current;
  Q(e, x);
  const P = Y(x), C = a ? d : g, E = /* @__PURE__ */ h(k, { children: [
    /* @__PURE__ */ h("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ c(C.Title, { className: "vs-sheet__title", children: r }),
      /* @__PURE__ */ h("span", { className: "vs-sheet__actions", children: [
        n,
        /* @__PURE__ */ c(C.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ c("div", { ref: p, className: "vs-sheet__body", children: o }),
    s != null && /* @__PURE__ */ c("footer", { className: "vs-sheet__foot", children: s })
  ] });
  return a ? /* @__PURE__ */ c(d.Root, { open: e, onOpenChange: P, children: /* @__PURE__ */ c(d.VirtualKeyboardProvider, { children: /* @__PURE__ */ h(d.Portal, { children: [
    /* @__PURE__ */ c(d.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ c(d.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ h(d.Popup, { className: v("vs-sheet", "vs-sheet--drawer", i), children: [
      /* @__PURE__ */ c("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ c(d.Content, { className: "vs-sheet__content", children: E })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ c(g.Root, { open: e, onOpenChange: P, children: /* @__PURE__ */ h(g.Portal, { children: [
    /* @__PURE__ */ c(g.Backdrop, { className: "vs-sheet-backdrop" }),
    /* @__PURE__ */ c(g.Popup, { className: v("vs-sheet", i), children: E })
  ] }) });
}
function pe({ value: e, onChange: t, options: r, label: n, className: s, disabled: o }) {
  return /* @__PURE__ */ c(R, { disableStyleElements: !0, children: /* @__PURE__ */ h(u.Root, { value: e, onValueChange: (l) => {
    l !== null && t(l);
  }, items: r, disabled: o, children: [
    /* @__PURE__ */ h("div", { className: v("vs-select", s), children: [
      /* @__PURE__ */ c(u.Label, { className: "vs-select__label", children: n }),
      /* @__PURE__ */ h(u.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ c(u.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ c(u.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ c(u.Portal, { children: /* @__PURE__ */ c(u.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ c(u.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ c(u.List, { className: "vs-select__list", children: r.map((l) => /* @__PURE__ */ h(u.Item, { value: l.value, className: "vs-select__item", children: [
      /* @__PURE__ */ c(u.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ c(u.ItemText, { children: l.label })
    ] }, l.value)) }) }) }) })
  ] }) });
}
const $ = {
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
function ve(e, t) {
  const [r, n] = D(() => $.get(e, t)), s = T((o) => {
    n(o), $.set(e, o);
  }, [e]);
  return [r, s];
}
export {
  b as ApiError,
  le as Button,
  ae as Chip,
  ie as Segment,
  pe as Select,
  fe as Sheet,
  ue as Switch,
  de as ToastProvider,
  oe as api,
  se as clampText,
  he as createQueryClient,
  v as cx,
  te as fmtDate,
  ne as fmtDay,
  ce as linkify,
  re as localToday,
  H as shouldRetry,
  $ as storage,
  ve as useLocalStorage,
  K as useMediaQuery,
  me as useToast
};
