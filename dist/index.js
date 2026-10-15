import { c as h } from "./cx.js";
import { jsx as s, jsxs as d, Fragment as I } from "react/jsx-runtime";
import { useRef as f, useEffect as y, useId as G, useState as T, useCallback as k, useLayoutEffect as z, Children as K, useContext as Q, createContext as W, useSyncExternalStore as Y } from "react";
import { QueryClient as J } from "@tanstack/react-query";
import { createPortal as X } from "react-dom";
import { Dialog as M } from "@base-ui/react/dialog";
import { Drawer as b } from "@base-ui/react/drawer";
import { CSPProvider as V } from "@base-ui/react/csp-provider";
import { Select as _ } from "@base-ui/react/select";
import { ContextMenu as p } from "@base-ui/react/context-menu";
const w = (e) => String(e).padStart(2, "0");
function Ce(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${w(t.getDate())}.${w(t.getMonth() + 1)}.${t.getFullYear()} ${w(t.getHours())}:${w(t.getMinutes())}`;
}
function ye(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${w(t.getDate())}.${w(t.getMonth() + 1)}`;
}
function Te(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${w(e.getMonth() + 1)}-${w(e.getDate())}`;
}
function Me(e, t, n, l) {
  const r = Math.abs(Math.round(e)) % 100, a = r % 10;
  return a === 1 && r !== 11 ? t : a >= 2 && a <= 4 && (r < 12 || r > 14) ? n : l;
}
function $e(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function xe(e, t, n) {
  const l = e.split(`
`);
  let r = 0, a = l.length;
  for (let i = 0; i < l.length; i++)
    if (l[i].trim() && r++, r === t) {
      a = i + 1;
      break;
    }
  let o = l.slice(0, a).join(`
`), c = a < l.length && l.slice(a).some((i) => i.trim());
  if (o.length > n) {
    const i = o.slice(0, n + 1), u = i.lastIndexOf(" ");
    o = u > 0 ? i.slice(0, u) : o.slice(0, n), c = !0;
  }
  return c ? { text: o.trimEnd() + "…", cut: c } : { text: o, cut: c };
}
const q = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, ee = /[.,;:!?)»"']+$/;
function Se(e) {
  const t = [];
  let n = 0;
  for (const l of e.matchAll(q)) {
    const r = l.index;
    let a = l[2] ?? l[0], o = l[1] ?? a, c = r + l[0].length;
    if (!l[2]) {
      const i = ee.exec(a)?.[0] ?? "";
      a = a.slice(0, a.length - i.length), o = a, c -= i.length;
    }
    r > n && t.push({ text: e.slice(n, r) }), t.push({ url: a, text: o }), n = c;
  }
  return n < e.length && t.push({ text: e.slice(n) }), t;
}
class P extends Error {
  status;
  data;
  constructor(t, n, l) {
    super(t), this.name = "ApiError", this.status = n, this.data = l;
  }
}
function te(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function ke(e, t, n) {
  let l;
  try {
    l = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: n === void 0 ? {} : { "Content-Type": "application/json" },
      body: n === void 0 ? void 0 : JSON.stringify(n)
    });
  } catch {
    throw new P("нет связи с сервером", 0, null);
  }
  const r = await l.json().catch(() => ({}));
  if (!l.ok) throw new P(te(r, l.status), l.status, r);
  return r;
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
}, Pe = Object.keys(B);
function C({ name: e, size: t = "md", tone: n, className: l }) {
  return /* @__PURE__ */ s("svg", { "data-icon": e, className: h("vs-icon", `vs-icon--${t}`, n && `vs-icon--${n}`, l), viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ s("path", { d: B[e], fill: "currentColor" }) });
}
function Ee({ variant: e, size: t, pressed: n, icon: l, indicator: r, className: a, type: o = "button", children: c, ...i }) {
  const u = r === "lamp" && n ? /* @__PURE__ */ s(C, { name: "dot", size: "md", tone: "lamp" }) : l ? /* @__PURE__ */ s(C, { name: l, size: "sm" }) : null;
  return /* @__PURE__ */ d("button", { type: o, className: h("vs-button", e && `vs-button--${e}`, t === "sm" && "vs-button--sm", u && "vs-button--icon", r && `vs-button--${r}`, a), "aria-pressed": n, ...i, children: [
    u,
    c
  ] });
}
function Ie({ children: e, onClick: t, onHold: n, holdMs: l = 500, pressed: r, icon: a, indicator: o, more: c, className: i }) {
  const u = f(void 0), v = f(!1), m = () => clearTimeout(u.current);
  y(() => m, []);
  const g = () => {
    v.current = !1, n && (u.current = setTimeout(() => {
      v.current = !0, n();
    }, l));
  }, N = () => {
    if (v.current) {
      v.current = !1;
      return;
    }
    t();
  };
  return /* @__PURE__ */ d("span", { className: h("vs-split", o && `vs-split--${o}`, i), "data-pressed": r || void 0, children: [
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": r,
        onClick: N,
        onPointerDown: g,
        onPointerUp: m,
        onPointerLeave: m,
        onPointerCancel: m,
        onContextMenu: n ? (x) => x.preventDefault() : void 0,
        children: [
          o === "lamp" && r ? /* @__PURE__ */ s(C, { name: "dot", size: "md", tone: "lamp" }) : a && /* @__PURE__ */ s(C, { name: a, size: "sm" }),
          e
        ]
      }
    ),
    /* @__PURE__ */ s("button", { type: "button", className: "vs-split__more", "aria-label": c.label, title: c.label, "aria-haspopup": "dialog", onClick: c.onClick, children: /* @__PURE__ */ s(C, { name: c.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function Oe({ pressed: e, onClick: t, children: n, className: l, title: r }) {
  return /* @__PURE__ */ s("button", { type: "button", className: h("vs-chip", l), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: r, children: n });
}
function Le({ icon: e, label: t, size: n = "md", variant: l = "plain", className: r, type: a = "button", ...o }) {
  return /* @__PURE__ */ s("button", { type: a, "aria-label": t, title: t, className: h("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${l}`, r), ...o, children: /* @__PURE__ */ s(C, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function ne(e) {
  const t = f(null), [n, l] = T(""), r = k(() => {
    const a = t.current;
    if (!a || !e) return;
    const o = a.scrollTop > 1, c = a.scrollTop + a.clientHeight < a.scrollHeight - 1;
    l([o && "top", c && "bottom"].filter(Boolean).join(" "));
  }, [e]);
  return z(r), z(() => {
    const a = t.current;
    if (!a || !e || typeof ResizeObserver > "u") return;
    const o = new ResizeObserver(r);
    return o.observe(a), () => o.disconnect();
  }, [e, r]), { ref: t, fade: n, measure: r };
}
function De({ label: e, aside: t, tone: n = "default", children: l, footer: r, scroll: a, className: o, ...c }) {
  const i = G(), { ref: u, fade: v, measure: m } = ne(!!a), g = h("vs-tile", `vs-tile--${n}`, o), N = /* @__PURE__ */ d(I, { children: [
    e && t != null ? /* @__PURE__ */ d("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ s("div", { id: i, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ s("div", { className: "vs-tile__aside", children: t })
    ] }) : e && /* @__PURE__ */ s("div", { id: i, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ s(
      "div",
      {
        ref: u,
        className: h("vs-tile__body", a && "vs-tile__body--scroll"),
        "data-fade": a && v ? v : void 0,
        onScroll: a ? m : void 0,
        children: l
      }
    ),
    r && /* @__PURE__ */ s("div", { className: "vs-tile__footer", children: r })
  ] });
  return /* @__PURE__ */ s("section", { className: g, "aria-labelledby": e ? i : void 0, ...c, children: N });
}
function Re({ variant: e = "body", tone: t = "default", weight: n, as: l = "span", lines: r, className: a, title: o, children: c }) {
  return /* @__PURE__ */ s(
    l,
    {
      className: h("vs-text", `vs-text--${e}`, t !== "default" && `vs-text--${t}`, n && `vs-text--w-${n}`, r && `vs-text--lines-${r}`, a),
      title: o,
      children: c
    }
  );
}
function ze({ value: e, unit: t, caption: n, size: l = "lg", tone: r = "default", className: a }) {
  return /* @__PURE__ */ d("div", { className: h("vs-stat", `vs-stat--${l}`, `vs-stat--${r}`, a), children: [
    /* @__PURE__ */ d("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ s("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ s("span", { className: "vs-stat__unit", children: t })
    ] }),
    n && /* @__PURE__ */ s("div", { className: "vs-stat__caption", children: n })
  ] });
}
function Ae({ children: e, max: t, empty: n, className: l }) {
  const r = K.toArray(e);
  if (!r.length) return n ? /* @__PURE__ */ s("div", { className: h("vs-list-empty", l), children: n }) : null;
  const a = t ? r.slice(0, t) : r;
  return /* @__PURE__ */ d("div", { className: h("vs-list-wrap", l), children: [
    /* @__PURE__ */ s("ul", { className: "vs-list", children: a }),
    t && r.length > t && /* @__PURE__ */ d("div", { className: "vs-list-more", children: [
      "ещё ",
      r.length - t
    ] })
  ] });
}
function He({ title: e, titleLines: t = 1, sub: n, subTone: l = "muted", subLines: r = 1, meta: a, lead: o, tone: c = "default", onClick: i }) {
  const u = /* @__PURE__ */ d(I, { children: [
    o && /* @__PURE__ */ s("span", { className: "vs-list-row__lead", children: o }),
    n != null ? /* @__PURE__ */ d("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ s("span", { className: h("vs-list-row__name", t === 2 && "vs-list-row__name--2"), children: e }),
      /* @__PURE__ */ s("span", { className: h("vs-list-row__sub", `vs-list-row__sub--${l}`, r > 1 && `vs-list-row__sub--${r}`), children: n })
    ] }) : /* @__PURE__ */ s("span", { className: h("vs-list-row__title", t === 2 && "vs-list-row__title--2"), children: e }),
    a && /* @__PURE__ */ s("span", { className: "vs-list-row__meta", children: a })
  ] });
  return /* @__PURE__ */ s("li", { className: h("vs-list-row", `vs-list-row--${c}`, n != null && "vs-list-row--two"), children: i ? /* @__PURE__ */ s("button", { type: "button", className: "vs-list-row__inner", onClick: i, children: u }) : /* @__PURE__ */ s("div", { className: "vs-list-row__inner", children: u }) });
}
function Ve({ tone: e = "warn", children: t, className: n }) {
  return /* @__PURE__ */ d("div", { role: "status", className: h("vs-banner", `vs-banner--${e}`, n), children: [
    /* @__PURE__ */ s(C, { name: "alert", size: "sm" }),
    t
  ] });
}
function Be({ options: e, value: t, onChange: n, ariaLabel: l, variant: r = "default" }) {
  return /* @__PURE__ */ s("div", { className: h("vs-segment", r === "soft" && "vs-segment--soft"), role: "group", "aria-label": l, children: e.map((a) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": a.value === t, onClick: () => n(a.value), children: a.label }, a.value)) });
}
const $ = (e) => e.stopPropagation();
function Ze({ checked: e, onChange: t, label: n, icon: l, title: r, size: a = "md", disabled: o }) {
  return /* @__PURE__ */ d("label", { className: h("vs-switch", a === "sm" && "vs-switch--sm"), title: r, onClick: $, onKeyDown: $, onPointerDown: $, onMouseDown: $, onTouchStart: $, children: [
    l != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: l }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: o, onChange: (c) => t(c.target.checked) })
  ] });
}
function Ue({ value: e, min: t = 1, max: n = 100, step: l = 1, label: r, onCommit: a, format: o = String }) {
  const [c, i] = T(e), u = f(!1), v = f(e);
  y(() => {
    v.current = e, u.current || i(e);
  }, [e]);
  const m = () => {
    u.current = !1, c !== v.current && (v.current = c, a(c));
  }, g = `${(c - t) / (n - t) * 100}%`;
  return /* @__PURE__ */ d("label", { className: "vs-slider", style: { "--vs-slider-fill": g }, children: [
    /* @__PURE__ */ s(
      "input",
      {
        type: "range",
        "aria-label": r,
        min: t,
        max: n,
        step: l,
        value: c,
        onPointerDown: () => {
          u.current = !0;
        },
        onChange: (N) => i(Number(N.target.value)),
        onPointerUp: m,
        onPointerCancel: m,
        onKeyUp: m,
        onTouchEnd: m
      }
    ),
    /* @__PURE__ */ s("span", { className: "vs-slider__value", children: o(c) })
  ] });
}
function se(e, t) {
  return t instanceof P && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function je() {
  return new J({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: se },
      mutations: { retry: !1 }
    }
  });
}
const Z = W(null);
function Fe({ children: e, duration: t = 3500 }) {
  const [n, l] = T(null), r = f(void 0), a = k((o) => {
    clearTimeout(r.current), l((c) => ({ text: o, id: (c?.id ?? 0) + 1 })), r.current = setTimeout(() => l(null), t);
  }, [t]);
  return y(() => () => clearTimeout(r.current), []), /* @__PURE__ */ d(Z.Provider, { value: a, children: [
    e,
    n && X(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function Ge() {
  const e = Q(Z);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function re(e) {
  const t = k((n) => {
    const l = window.matchMedia(e);
    return l.addEventListener("change", n), () => l.removeEventListener("change", n);
  }, [e]);
  return Y(t, () => window.matchMedia(e).matches, () => !1);
}
const le = 1e3;
let E = 0, O = !1, U;
function S() {
  O = !1, clearTimeout(U), window.removeEventListener("click", S);
}
function A() {
  S(), O = !0, U = setTimeout(S, le), window.addEventListener("click", S);
}
function j() {
  return E += 1, document.addEventListener("pointerdown", A, !0), () => {
    E -= 1, document.removeEventListener("pointerdown", A, !0);
  };
}
const ae = () => E > 0 || O;
function oe(e, t) {
  const n = f(t);
  n.current = t, y(() => {
    const l = window.CloseWatcher;
    if (!e || !l || !/Android/i.test(navigator.userAgent)) return;
    let r;
    const a = () => {
      r = new l(), r.onclose = () => {
        n.current() === !1 && a();
      };
    };
    return a(), () => r.destroy();
  }, [e]);
}
const ce = "(max-width: 760px)";
function ie(e) {
  return (t, n) => {
    if (!t) {
      if (n.reason === "outside-press" && ae()) {
        n.cancel();
        return;
      }
      e() === !1 && n.cancel();
    }
  };
}
function Ke({ open: e, onRequestClose: t, head: n, actions: l, footer: r, children: a, scrollKey: o, className: c }) {
  const i = re(ce), u = f(null);
  y(() => {
    u.current && (u.current.scrollTop = 0);
  }, [o]);
  const v = f(!1), m = f(void 0), g = f(t);
  g.current = t;
  const N = f(() => (v.current || (v.current = !0, setTimeout(() => {
    v.current = !1;
  }, 0), m.current = g.current()), m.current)).current;
  oe(e, N);
  const x = ie(N), L = (F) => {
    F.pointerType === "touch" && N();
  }, D = i ? b : M, R = /* @__PURE__ */ d(I, { children: [
    /* @__PURE__ */ d("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(D.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ d("span", { className: "vs-sheet__actions", children: [
        l,
        /* @__PURE__ */ s(D.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: u, className: "vs-sheet__body", children: a }),
    r != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: r })
  ] });
  return i ? /* @__PURE__ */ s(b.Root, { open: e, onOpenChange: x, children: /* @__PURE__ */ s(b.VirtualKeyboardProvider, { children: /* @__PURE__ */ d(b.Portal, { children: [
    /* @__PURE__ */ s(b.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: L }),
    /* @__PURE__ */ s(b.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ d(b.Popup, { className: h("vs-sheet", "vs-sheet--drawer", c), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(b.Content, { className: "vs-sheet__content", children: R })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(M.Root, { open: e, onOpenChange: x, children: /* @__PURE__ */ d(M.Portal, { children: [
    /* @__PURE__ */ s(M.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: L }),
    /* @__PURE__ */ s(M.Popup, { className: h("vs-sheet", c), children: R })
  ] }) });
}
function Qe({ value: e, onChange: t, options: n, label: l, className: r, disabled: a }) {
  const [o, c] = T(!1);
  return y(() => o ? j() : void 0, [o]), /* @__PURE__ */ s(V, { disableStyleElements: !0, children: /* @__PURE__ */ d(_.Root, { open: o, onOpenChange: c, value: e, onValueChange: (i) => {
    i !== null && t(i);
  }, items: n, disabled: a, children: [
    /* @__PURE__ */ d("div", { className: h("vs-select", r), children: [
      /* @__PURE__ */ s(_.Label, { className: "vs-select__label", children: l }),
      /* @__PURE__ */ d(_.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(_.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(_.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ s(_.Portal, { children: /* @__PURE__ */ s(_.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(_.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(_.List, { className: "vs-select__list", children: n.map((i) => /* @__PURE__ */ d(_.Item, { value: i.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(_.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ s(_.ItemText, { children: i.label })
    ] }, i.value)) }) }) }) })
  ] }) });
}
const ue = 1500;
function de({ item: e }) {
  return "options" in e ? /* @__PURE__ */ d(p.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ s(p.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ s(p.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ d(p.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ s(p.RadioItemIndicator, { className: "vs-menu__check", children: "✓" }),
      /* @__PURE__ */ s("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ d(p.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ s(p.CheckboxItemIndicator, { className: "vs-menu__check", children: "✓" }),
    /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ s(p.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label }) });
}
function We({ items: e, children: t, longPress: n = !0, disabled: l, className: r }) {
  const [a, o] = T(!1);
  y(() => a ? j() : void 0, [a]);
  const c = f(0), i = n ? {} : {
    onTouchStart: (u) => {
      c.current = Date.now(), u.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (u) => {
      (u.nativeEvent.pointerType === "touch" || Date.now() - c.current < ue) && u.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(V, { disableStyleElements: !0, children: /* @__PURE__ */ d(p.Root, { open: a, onOpenChange: o, disabled: l, children: [
    /* @__PURE__ */ s(p.Trigger, { render: t, ...i }),
    /* @__PURE__ */ s(p.Portal, { children: /* @__PURE__ */ s(p.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(p.Popup, { className: h("vs-menu", r), children: e.map((u, v) => u === "separator" ? /* @__PURE__ */ s(p.Separator, { className: "vs-menu__separator" }, v) : /* @__PURE__ */ s(de, { item: u }, v)) }) }) })
  ] }) });
}
const H = {
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
function Ye(e, t) {
  const [n, l] = T(() => H.get(e, t)), r = k((a) => {
    l(a), H.set(e, a);
  }, [e]);
  return [n, r];
}
export {
  P as ApiError,
  Ve as Banner,
  Ee as Button,
  Oe as Chip,
  We as ContextMenu,
  Pe as ICON_NAMES,
  C as Icon,
  Le as IconButton,
  Ae as List,
  He as ListRow,
  Be as Segment,
  Qe as Select,
  Ke as Sheet,
  Ue as Slider,
  Ie as SplitButton,
  ze as Stat,
  Ze as Switch,
  Re as Text,
  De as Tile,
  Fe as ToastProvider,
  ke as api,
  xe as clampText,
  $e as compact,
  je as createQueryClient,
  h as cx,
  Ce as fmtDate,
  ye as fmtDay,
  Se as linkify,
  Te as localToday,
  Me as plural,
  se as shouldRetry,
  H as storage,
  Ye as useLocalStorage,
  re as useMediaQuery,
  Ge as useToast
};
