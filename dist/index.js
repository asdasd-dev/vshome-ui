import { jsx as a, jsxs as d } from "react/jsx-runtime";
import { QueryClient as $ } from "@tanstack/react-query";
import { useState as x, useRef as p, useCallback as N, useEffect as m, useContext as D, createContext as S, useId as C } from "react";
import { createPortal as E } from "react-dom";
function g(...t) {
  return t.filter(Boolean).join(" ");
}
const h = (t) => String(t).padStart(2, "0");
function B(t) {
  if (t == null) return "";
  const e = new Date(t);
  return `${h(e.getDate())}.${h(e.getMonth() + 1)}.${e.getFullYear()} ${h(e.getHours())}:${h(e.getMinutes())}`;
}
function F(t) {
  if (t == null) return "";
  const e = new Date(t);
  return `${h(e.getDate())}.${h(e.getMonth() + 1)}`;
}
function K(t = /* @__PURE__ */ new Date()) {
  return `${t.getFullYear()}-${h(t.getMonth() + 1)}-${h(t.getDate())}`;
}
function Q(t, e, r) {
  const n = t.split(`
`);
  let o = 0, s = n.length;
  for (let l = 0; l < n.length; l++)
    if (n[l].trim() && o++, o === e) {
      s = l + 1;
      break;
    }
  let c = n.slice(0, s).join(`
`), i = s < n.length && n.slice(s).some((l) => l.trim());
  if (c.length > r) {
    const l = c.slice(0, r + 1), f = l.lastIndexOf(" ");
    c = f > 0 ? l.slice(0, f) : c.slice(0, r), i = !0;
  }
  return i ? { text: c.trimEnd() + "…", cut: i } : { text: c, cut: i };
}
const I = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, P = /[.,;:!?)»"']+$/;
function R(t) {
  const e = [];
  let r = 0;
  for (const n of t.matchAll(I)) {
    const o = n.index;
    let s = n[2] ?? n[0], c = n[1] ?? s, i = o + n[0].length;
    if (!n[2]) {
      const l = P.exec(s)?.[0] ?? "";
      s = s.slice(0, s.length - l.length), c = s, i -= l.length;
    }
    o > r && e.push({ text: t.slice(r, o) }), e.push({ url: s, text: c }), r = i;
  }
  return r < t.length && e.push({ text: t.slice(r) }), e;
}
class w extends Error {
  status;
  data;
  constructor(e, r, n) {
    super(e), this.name = "ApiError", this.status = r, this.data = n;
  }
}
function j(t, e) {
  return typeof t == "object" && t !== null && "error" in t && typeof t.error == "string" ? t.error : `HTTP ${e}`;
}
async function Y(t, e, r) {
  let n;
  try {
    n = await fetch(e, {
      method: t,
      credentials: "same-origin",
      headers: r === void 0 ? {} : { "Content-Type": "application/json" },
      body: r === void 0 ? void 0 : JSON.stringify(r)
    });
  } catch {
    throw new w("нет связи с сервером", 0, null);
  }
  const o = await n.json().catch(() => ({}));
  if (!n.ok) throw new w(j(o, n.status), n.status, o);
  return o;
}
function G({ variant: t, className: e, type: r = "button", ...n }) {
  return /* @__PURE__ */ a("button", { type: r, className: g("vs-button", t && `vs-button--${t}`, e), ...n });
}
function J({ pressed: t, onClick: e, children: r, className: n, title: o }) {
  return /* @__PURE__ */ a("button", { type: "button", className: g("vs-chip", n), "aria-pressed": t === void 0 ? void 0 : t, onClick: e, title: o, children: r });
}
function V({ options: t, value: e, onChange: r, ariaLabel: n }) {
  return /* @__PURE__ */ a("div", { className: "vs-segment", role: "group", "aria-label": n, children: t.map((o) => /* @__PURE__ */ a("button", { type: "button", "aria-pressed": o.value === e, onClick: () => r(o.value), children: o.label }, o.value)) });
}
const b = (t) => t.stopPropagation();
function W({ checked: t, onChange: e, label: r, icon: n, title: o, size: s = "md", disabled: c }) {
  return /* @__PURE__ */ d("label", { className: g("vs-switch", s === "sm" && "vs-switch--sm"), title: o, onClick: b, onKeyDown: b, onPointerDown: b, children: [
    n != null && /* @__PURE__ */ a("span", { "aria-hidden": "true", children: n }),
    /* @__PURE__ */ a("input", { type: "checkbox", role: "switch", "aria-label": r, checked: t, disabled: c, onChange: (i) => e(i.target.checked) })
  ] });
}
function M(t, e) {
  return e instanceof w && e.status >= 400 && e.status < 500 ? !1 : t < 2;
}
function q() {
  return new $({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: M },
      mutations: { retry: !1 }
    }
  });
}
const _ = S(null);
function k() {
  const t = document.querySelectorAll("dialog[open]");
  return t.length ? t[t.length - 1] : document.body;
}
function z({ children: t, duration: e = 3500 }) {
  const [r, n] = x(null), o = p(void 0), s = N((c) => {
    clearTimeout(o.current), n((i) => ({ text: c, host: k(), id: (i?.id ?? 0) + 1 })), o.current = setTimeout(() => n(null), e);
  }, [e]);
  return m(() => () => clearTimeout(o.current), []), m(() => {
    if (!r || !(r.host instanceof HTMLDialogElement)) return;
    const c = r.host, i = () => {
      n((l) => l && l.host === c ? { ...l, host: document.body } : l);
    };
    return c.addEventListener("close", i), () => c.removeEventListener("close", i);
  }, [r]), /* @__PURE__ */ d(_.Provider, { value: s, children: [
    t,
    r && E(/* @__PURE__ */ a("div", { className: "vs-toast", role: "status", children: r.text }, r.id), r.host)
  ] });
}
function U() {
  const t = D(_);
  if (!t) throw new Error("useToast вне ToastProvider");
  return t;
}
function X({ open: t, onRequestClose: e, head: r, actions: n, footer: o, children: s, scrollKey: c, className: i }) {
  const l = p(null), f = p(null), v = p(!1), y = C();
  return m(() => {
    const u = l.current;
    u && (t && !u.open && u.showModal(), !t && u.open && (v.current = !0, u.close()));
  }, [t]), m(() => {
    f.current && (f.current.scrollTop = 0);
  }, [c]), /* @__PURE__ */ d(
    "dialog",
    {
      ref: l,
      className: g("vs-sheet", i),
      "aria-labelledby": y,
      onCancel: (u) => {
        u.cancelable && (u.preventDefault(), e());
      },
      onClose: () => {
        if (v.current) {
          v.current = !1;
          return;
        }
        t && e() === !1 && l.current?.showModal();
      },
      children: [
        /* @__PURE__ */ d("header", { className: "vs-sheet__head", children: [
          /* @__PURE__ */ a("span", { id: y, className: "vs-sheet__title", children: r }),
          /* @__PURE__ */ d("span", { className: "vs-sheet__actions", children: [
            n,
            /* @__PURE__ */ a("button", { type: "button", className: "vs-sheet__close", "aria-label": "Закрыть", onClick: () => e(), children: "✕" })
          ] })
        ] }),
        /* @__PURE__ */ a("div", { ref: f, className: "vs-sheet__body", children: s }),
        o != null && /* @__PURE__ */ a("footer", { className: "vs-sheet__foot", children: o })
      ]
    }
  );
}
const T = {
  get(t, e) {
    try {
      return localStorage.getItem(t) ?? e;
    } catch {
      return e;
    }
  },
  set(t, e) {
    try {
      localStorage.setItem(t, e);
    } catch {
    }
  }
};
function Z(t, e) {
  const [r, n] = x(() => T.get(t, e)), o = N((s) => {
    n(s), T.set(t, s);
  }, [t]);
  return [r, o];
}
export {
  w as ApiError,
  G as Button,
  J as Chip,
  V as Segment,
  X as Sheet,
  W as Switch,
  z as ToastProvider,
  Y as api,
  Q as clampText,
  q as createQueryClient,
  g as cx,
  B as fmtDate,
  F as fmtDay,
  R as linkify,
  K as localToday,
  M as shouldRetry,
  T as storage,
  Z as useLocalStorage,
  U as useToast
};
