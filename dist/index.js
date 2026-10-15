import { c as h } from "./cx.js";
import { jsx as s, jsxs as d, Fragment as $ } from "react/jsx-runtime";
import { useRef as p, useEffect as C, useId as G, useState as y, useCallback as S, useLayoutEffect as A, Children as K, useContext as Q, createContext as W, useSyncExternalStore as Y } from "react";
import { QueryClient as J } from "@tanstack/react-query";
import { createPortal as X } from "react-dom";
import { Dialog as T } from "@base-ui/react/dialog";
import { Drawer as g } from "@base-ui/react/drawer";
import { CSPProvider as B } from "@base-ui/react/csp-provider";
import { Select as _ } from "@base-ui/react/select";
import { ContextMenu as m } from "@base-ui/react/context-menu";
const b = (e) => String(e).padStart(2, "0");
function Ce(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${b(t.getDate())}.${b(t.getMonth() + 1)}.${t.getFullYear()} ${b(t.getHours())}:${b(t.getMinutes())}`;
}
function ye(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${b(t.getDate())}.${b(t.getMonth() + 1)}`;
}
function Te(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${b(e.getMonth() + 1)}-${b(e.getDate())}`;
}
function Me(e, t, n, a) {
  const l = Math.abs(Math.round(e)) % 100, r = l % 10;
  return r === 1 && l !== 11 ? t : r >= 2 && r <= 4 && (l < 12 || l > 14) ? n : a;
}
function xe(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function Se(e, t, n) {
  const a = e.split(`
`);
  let l = 0, r = a.length;
  for (let o = 0; o < a.length; o++)
    if (a[o].trim() && l++, l === t) {
      r = o + 1;
      break;
    }
  let c = a.slice(0, r).join(`
`), i = r < a.length && a.slice(r).some((o) => o.trim());
  if (c.length > n) {
    const o = c.slice(0, n + 1), u = o.lastIndexOf(" ");
    c = u > 0 ? o.slice(0, u) : c.slice(0, n), i = !0;
  }
  return i ? { text: c.trimEnd() + "…", cut: i } : { text: c, cut: i };
}
const q = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, ee = /[.,;:!?)»"']+$/;
function ke(e) {
  const t = [];
  let n = 0;
  for (const a of e.matchAll(q)) {
    const l = a.index;
    let r = a[2] ?? a[0], c = a[1] ?? r, i = l + a[0].length;
    if (!a[2]) {
      const o = ee.exec(r)?.[0] ?? "";
      r = r.slice(0, r.length - o.length), c = r, i -= o.length;
    }
    l > n && t.push({ text: e.slice(n, l) }), t.push({ url: r, text: c }), n = i;
  }
  return n < e.length && t.push({ text: e.slice(n) }), t;
}
class k extends Error {
  status;
  data;
  constructor(t, n, a) {
    super(t), this.name = "ApiError", this.status = n, this.data = a;
  }
}
function te(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function Pe(e, t, n) {
  let a;
  try {
    a = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: n === void 0 ? {} : { "Content-Type": "application/json" },
      body: n === void 0 ? void 0 : JSON.stringify(n)
    });
  } catch {
    throw new k("нет связи с сервером", 0, null);
  }
  const l = await a.json().catch(() => ({}));
  if (!a.ok) throw new k(te(l, a.status), a.status, l);
  return l;
}
function $e({ variant: e, size: t, pressed: n, className: a, type: l = "button", ...r }) {
  return /* @__PURE__ */ s("button", { type: l, className: h("vs-button", e && `vs-button--${e}`, t === "sm" && "vs-button--sm", a), "aria-pressed": n, ...r });
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
}, Ee = Object.keys(Z);
function E({ name: e, size: t = "md", className: n }) {
  return /* @__PURE__ */ s("svg", { "data-icon": e, className: h("vs-icon", `vs-icon--${t}`, n), viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ s("path", { d: Z[e], fill: "currentColor" }) });
}
function Ie({ children: e, onClick: t, onHold: n, holdMs: a = 500, pressed: l, more: r, className: c }) {
  const i = p(void 0), o = p(!1), u = () => clearTimeout(i.current);
  C(() => u, []);
  const v = () => {
    o.current = !1, n && (i.current = setTimeout(() => {
      o.current = !0, n();
    }, a));
  }, f = () => {
    if (o.current) {
      o.current = !1;
      return;
    }
    t();
  };
  return /* @__PURE__ */ d("span", { className: h("vs-split", c), "data-pressed": l || void 0, children: [
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": l,
        onClick: f,
        onPointerDown: v,
        onPointerUp: u,
        onPointerLeave: u,
        onPointerCancel: u,
        onContextMenu: n ? (N) => N.preventDefault() : void 0,
        children: e
      }
    ),
    /* @__PURE__ */ s("button", { type: "button", className: "vs-split__more", "aria-label": r.label, title: r.label, "aria-haspopup": "dialog", onClick: r.onClick, children: /* @__PURE__ */ s(E, { name: r.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function Oe({ pressed: e, onClick: t, children: n, className: a, title: l }) {
  return /* @__PURE__ */ s("button", { type: "button", className: h("vs-chip", a), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: l, children: n });
}
function Le({ icon: e, label: t, size: n = "md", variant: a = "plain", className: l, type: r = "button", ...c }) {
  return /* @__PURE__ */ s("button", { type: r, "aria-label": t, title: t, className: h("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${a}`, l), ...c, children: /* @__PURE__ */ s(E, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function ne(e) {
  const t = p(null), [n, a] = y(""), l = S(() => {
    const r = t.current;
    if (!r || !e) return;
    const c = r.scrollTop > 1, i = r.scrollTop + r.clientHeight < r.scrollHeight - 1;
    a([c && "top", i && "bottom"].filter(Boolean).join(" "));
  }, [e]);
  return A(l), A(() => {
    const r = t.current;
    if (!r || !e || typeof ResizeObserver > "u") return;
    const c = new ResizeObserver(l);
    return c.observe(r), () => c.disconnect();
  }, [e, l]), { ref: t, fade: n, measure: l };
}
function De({ label: e, aside: t, tone: n = "default", children: a, footer: l, scroll: r, className: c, ...i }) {
  const o = G(), { ref: u, fade: v, measure: f } = ne(!!r), N = h("vs-tile", `vs-tile--${n}`, c), w = /* @__PURE__ */ d($, { children: [
    e && t != null ? /* @__PURE__ */ d("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ s("div", { id: o, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ s("div", { className: "vs-tile__aside", children: t })
    ] }) : e && /* @__PURE__ */ s("div", { id: o, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ s(
      "div",
      {
        ref: u,
        className: h("vs-tile__body", r && "vs-tile__body--scroll"),
        "data-fade": r && v ? v : void 0,
        onScroll: r ? f : void 0,
        children: a
      }
    ),
    l && /* @__PURE__ */ s("div", { className: "vs-tile__footer", children: l })
  ] });
  return /* @__PURE__ */ s("section", { className: N, "aria-labelledby": e ? o : void 0, ...i, children: w });
}
function Re({ variant: e = "body", tone: t = "default", weight: n, as: a = "span", lines: l, className: r, title: c, children: i }) {
  return /* @__PURE__ */ s(
    a,
    {
      className: h("vs-text", `vs-text--${e}`, t !== "default" && `vs-text--${t}`, n && `vs-text--w-${n}`, l && `vs-text--lines-${l}`, r),
      title: c,
      children: i
    }
  );
}
function Ae({ value: e, unit: t, caption: n, size: a = "lg", tone: l = "default", className: r }) {
  return /* @__PURE__ */ d("div", { className: h("vs-stat", `vs-stat--${a}`, `vs-stat--${l}`, r), children: [
    /* @__PURE__ */ d("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ s("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ s("span", { className: "vs-stat__unit", children: t })
    ] }),
    n && /* @__PURE__ */ s("div", { className: "vs-stat__caption", children: n })
  ] });
}
function He({ children: e, max: t, empty: n, className: a }) {
  const l = K.toArray(e);
  if (!l.length) return n ? /* @__PURE__ */ s("div", { className: h("vs-list-empty", a), children: n }) : null;
  const r = t ? l.slice(0, t) : l;
  return /* @__PURE__ */ d("div", { className: h("vs-list-wrap", a), children: [
    /* @__PURE__ */ s("ul", { className: "vs-list", children: r }),
    t && l.length > t && /* @__PURE__ */ d("div", { className: "vs-list-more", children: [
      "ещё ",
      l.length - t
    ] })
  ] });
}
function Ve({ title: e, titleLines: t = 1, sub: n, subTone: a = "muted", subLines: l = 1, meta: r, lead: c, tone: i = "default", onClick: o }) {
  const u = /* @__PURE__ */ d($, { children: [
    c && /* @__PURE__ */ s("span", { className: "vs-list-row__lead", children: c }),
    n != null ? /* @__PURE__ */ d("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ s("span", { className: h("vs-list-row__name", t === 2 && "vs-list-row__name--2"), children: e }),
      /* @__PURE__ */ s("span", { className: h("vs-list-row__sub", `vs-list-row__sub--${a}`, l > 1 && `vs-list-row__sub--${l}`), children: n })
    ] }) : /* @__PURE__ */ s("span", { className: h("vs-list-row__title", t === 2 && "vs-list-row__title--2"), children: e }),
    r && /* @__PURE__ */ s("span", { className: "vs-list-row__meta", children: r })
  ] });
  return /* @__PURE__ */ s("li", { className: h("vs-list-row", `vs-list-row--${i}`, n != null && "vs-list-row--two"), children: o ? /* @__PURE__ */ s("button", { type: "button", className: "vs-list-row__inner", onClick: o, children: u }) : /* @__PURE__ */ s("div", { className: "vs-list-row__inner", children: u }) });
}
function Be({ tone: e = "warn", children: t, className: n }) {
  return /* @__PURE__ */ d("div", { role: "status", className: h("vs-banner", `vs-banner--${e}`, n), children: [
    /* @__PURE__ */ s(E, { name: "alert", size: "sm" }),
    t
  ] });
}
function Ze({ options: e, value: t, onChange: n, ariaLabel: a, variant: l = "default" }) {
  return /* @__PURE__ */ s("div", { className: h("vs-segment", l === "soft" && "vs-segment--soft"), role: "group", "aria-label": a, children: e.map((r) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": r.value === t, onClick: () => n(r.value), children: r.label }, r.value)) });
}
const M = (e) => e.stopPropagation();
function Ue({ checked: e, onChange: t, label: n, icon: a, title: l, size: r = "md", disabled: c }) {
  return /* @__PURE__ */ d("label", { className: h("vs-switch", r === "sm" && "vs-switch--sm"), title: l, onClick: M, onKeyDown: M, onPointerDown: M, onMouseDown: M, onTouchStart: M, children: [
    a != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: a }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: c, onChange: (i) => t(i.target.checked) })
  ] });
}
function ze({ value: e, min: t = 1, max: n = 100, step: a = 1, label: l, onCommit: r, format: c = String }) {
  const [i, o] = y(e), u = p(!1), v = p(e);
  C(() => {
    v.current = e, u.current || o(e);
  }, [e]);
  const f = () => {
    u.current = !1, i !== v.current && (v.current = i, r(i));
  }, N = `${(i - t) / (n - t) * 100}%`;
  return /* @__PURE__ */ d("label", { className: "vs-slider", style: { "--vs-slider-fill": N }, children: [
    /* @__PURE__ */ s(
      "input",
      {
        type: "range",
        "aria-label": l,
        min: t,
        max: n,
        step: a,
        value: i,
        onPointerDown: () => {
          u.current = !0;
        },
        onChange: (w) => o(Number(w.target.value)),
        onPointerUp: f,
        onPointerCancel: f,
        onKeyUp: f,
        onTouchEnd: f
      }
    ),
    /* @__PURE__ */ s("span", { className: "vs-slider__value", children: c(i) })
  ] });
}
function se(e, t) {
  return t instanceof k && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function je() {
  return new J({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: se },
      mutations: { retry: !1 }
    }
  });
}
const U = W(null);
function Fe({ children: e, duration: t = 3500 }) {
  const [n, a] = y(null), l = p(void 0), r = S((c) => {
    clearTimeout(l.current), a((i) => ({ text: c, id: (i?.id ?? 0) + 1 })), l.current = setTimeout(() => a(null), t);
  }, [t]);
  return C(() => () => clearTimeout(l.current), []), /* @__PURE__ */ d(U.Provider, { value: r, children: [
    e,
    n && X(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function Ge() {
  const e = Q(U);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function re(e) {
  const t = S((n) => {
    const a = window.matchMedia(e);
    return a.addEventListener("change", n), () => a.removeEventListener("change", n);
  }, [e]);
  return Y(t, () => window.matchMedia(e).matches, () => !1);
}
const le = 1e3;
let P = 0, I = !1, z;
function x() {
  I = !1, clearTimeout(z), window.removeEventListener("click", x);
}
function H() {
  x(), I = !0, z = setTimeout(x, le), window.addEventListener("click", x);
}
function j() {
  return P += 1, document.addEventListener("pointerdown", H, !0), () => {
    P -= 1, document.removeEventListener("pointerdown", H, !0);
  };
}
const ae = () => P > 0 || I;
function ce(e, t) {
  const n = p(t);
  n.current = t, C(() => {
    const a = window.CloseWatcher;
    if (!e || !a || !/Android/i.test(navigator.userAgent)) return;
    let l;
    const r = () => {
      l = new a(), l.onclose = () => {
        n.current() === !1 && r();
      };
    };
    return r(), () => l.destroy();
  }, [e]);
}
const oe = "(max-width: 760px)";
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
function Ke({ open: e, onRequestClose: t, head: n, actions: a, footer: l, children: r, scrollKey: c, className: i }) {
  const o = re(oe), u = p(null);
  C(() => {
    u.current && (u.current.scrollTop = 0);
  }, [c]);
  const v = p(!1), f = p(void 0), N = p(t);
  N.current = t;
  const w = p(() => (v.current || (v.current = !0, setTimeout(() => {
    v.current = !1;
  }, 0), f.current = N.current()), f.current)).current;
  ce(e, w);
  const O = ie(w), L = (F) => {
    F.pointerType === "touch" && w();
  }, D = o ? g : T, R = /* @__PURE__ */ d($, { children: [
    /* @__PURE__ */ d("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(D.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ d("span", { className: "vs-sheet__actions", children: [
        a,
        /* @__PURE__ */ s(D.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: u, className: "vs-sheet__body", children: r }),
    l != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: l })
  ] });
  return o ? /* @__PURE__ */ s(g.Root, { open: e, onOpenChange: O, children: /* @__PURE__ */ s(g.VirtualKeyboardProvider, { children: /* @__PURE__ */ d(g.Portal, { children: [
    /* @__PURE__ */ s(g.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: L }),
    /* @__PURE__ */ s(g.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ d(g.Popup, { className: h("vs-sheet", "vs-sheet--drawer", i), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(g.Content, { className: "vs-sheet__content", children: R })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(T.Root, { open: e, onOpenChange: O, children: /* @__PURE__ */ d(T.Portal, { children: [
    /* @__PURE__ */ s(T.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: L }),
    /* @__PURE__ */ s(T.Popup, { className: h("vs-sheet", i), children: R })
  ] }) });
}
function Qe({ value: e, onChange: t, options: n, label: a, className: l, disabled: r }) {
  const [c, i] = y(!1);
  return C(() => c ? j() : void 0, [c]), /* @__PURE__ */ s(B, { disableStyleElements: !0, children: /* @__PURE__ */ d(_.Root, { open: c, onOpenChange: i, value: e, onValueChange: (o) => {
    o !== null && t(o);
  }, items: n, disabled: r, children: [
    /* @__PURE__ */ d("div", { className: h("vs-select", l), children: [
      /* @__PURE__ */ s(_.Label, { className: "vs-select__label", children: a }),
      /* @__PURE__ */ d(_.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(_.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(_.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ s(_.Portal, { children: /* @__PURE__ */ s(_.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(_.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(_.List, { className: "vs-select__list", children: n.map((o) => /* @__PURE__ */ d(_.Item, { value: o.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(_.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ s(_.ItemText, { children: o.label })
    ] }, o.value)) }) }) }) })
  ] }) });
}
const ue = 1500;
function de({ item: e }) {
  return "options" in e ? /* @__PURE__ */ d(m.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ s(m.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ s(m.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ d(m.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ s(m.RadioItemIndicator, { className: "vs-menu__check", children: "✓" }),
      /* @__PURE__ */ s("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ d(m.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ s(m.CheckboxItemIndicator, { className: "vs-menu__check", children: "✓" }),
    /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ s(m.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label }) });
}
function We({ items: e, children: t, longPress: n = !0, disabled: a, className: l }) {
  const [r, c] = y(!1);
  C(() => r ? j() : void 0, [r]);
  const i = p(0), o = n ? {} : {
    onTouchStart: (u) => {
      i.current = Date.now(), u.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (u) => {
      (u.nativeEvent.pointerType === "touch" || Date.now() - i.current < ue) && u.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(B, { disableStyleElements: !0, children: /* @__PURE__ */ d(m.Root, { open: r, onOpenChange: c, disabled: a, children: [
    /* @__PURE__ */ s(m.Trigger, { render: t, ...o }),
    /* @__PURE__ */ s(m.Portal, { children: /* @__PURE__ */ s(m.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(m.Popup, { className: h("vs-menu", l), children: e.map((u, v) => u === "separator" ? /* @__PURE__ */ s(m.Separator, { className: "vs-menu__separator" }, v) : /* @__PURE__ */ s(de, { item: u }, v)) }) }) })
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
function Ye(e, t) {
  const [n, a] = y(() => V.get(e, t)), l = S((r) => {
    a(r), V.set(e, r);
  }, [e]);
  return [n, l];
}
export {
  k as ApiError,
  Be as Banner,
  $e as Button,
  Oe as Chip,
  We as ContextMenu,
  Ee as ICON_NAMES,
  E as Icon,
  Le as IconButton,
  He as List,
  Ve as ListRow,
  Ze as Segment,
  Qe as Select,
  Ke as Sheet,
  ze as Slider,
  Ie as SplitButton,
  Ae as Stat,
  Ue as Switch,
  Re as Text,
  De as Tile,
  Fe as ToastProvider,
  Pe as api,
  Se as clampText,
  xe as compact,
  je as createQueryClient,
  h as cx,
  Ce as fmtDate,
  ye as fmtDay,
  ke as linkify,
  Te as localToday,
  Me as plural,
  se as shouldRetry,
  V as storage,
  Ye as useLocalStorage,
  re as useMediaQuery,
  Ge as useToast
};
