import { jsxs as f, Fragment as X, jsx as c } from "react/jsx-runtime";
import { useRef as Q, useState as K, useLayoutEffect as ft } from "react";
import { c as q } from "./cx.js";
const pt = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], O = (t) => String(t).padStart(2, "0");
function J(t) {
  if (!(t > 0)) return 4;
  const r = t / 4, a = 10 ** Math.floor(Math.log10(r)), l = r / a;
  for (const s of pt) if (l <= s + 1e-9) return s * a * 4;
  return 40 * a;
}
function Mt(t, r, a, l) {
  const s = [];
  for (let d = 0; d < a; d++) {
    const v = new Date((t + d * r) * 1e3);
    v.getHours() === 0 && v.getMinutes() === 0 && s.push(d);
  }
  return l ? s.filter((d, v) => v % l === 0) : s;
}
function gt(t) {
  if (!t.length) return 4;
  const r = [...t].sort((s, d) => s - d), a = r[r.length - 1], l = r[Math.max(0, Math.ceil(0.95 * r.length) - 1)];
  return a > l * 1.5 ? J(l * 1.3) : J(a * 1.05);
}
function yt(t, r, a, l) {
  const s = (a - 1) * r;
  if (s >= 36 * 3600) return Mt(t, r, a, l).map((u) => ({ i: u, label: ct(t + u * r).slice(0, 5) }));
  const d = s > 12 * 3600 ? 6 : 3, v = [];
  for (let u = 0; u < a; u++) {
    const R = new Date((t + u * r) * 1e3);
    R.getMinutes() === 0 && R.getHours() % d === 0 && v.push({ i: u, label: ct(t + u * r).slice(6) });
  }
  return v;
}
function bt(t, r, a = 44) {
  if (t.length < 2) return t;
  const l = (t[t.length - 1].i - t[0].i) / (t.length - 1) * r, s = Math.max(1, Math.ceil(a / Math.max(l, 1)));
  return t.filter((d, v) => v % s === 0);
}
function Ht(t) {
  const r = [];
  let a = null;
  return t.forEach((l, s) => {
    l != null && l < 1 ? a == null && (a = s) : a != null && (r.push([a, s - 1]), a = null);
  }), a != null && r.push([a, t.length - 1]), r;
}
function $t(t, r, a, l) {
  let s = "", d = !1;
  return t.forEach((v, u) => {
    if (v == null) {
      l || (d = !1);
      return;
    }
    s += `${d ? "L" : "M"}${r(u).toFixed(1)} ${a(v).toFixed(1)}`, d = !0;
  }), s;
}
function ct(t) {
  const r = new Date(t * 1e3);
  return `${O(r.getDate())}.${O(r.getMonth() + 1)} ${O(r.getHours())}:${O(r.getMinutes())}`;
}
const b = 170, rt = { L: 40, R: 12, T: 10, B: 22 };
function ot() {
  const t = Q(null), [r, a] = K(0);
  return ft(() => {
    const l = t.current;
    if (!l) return;
    const s = new ResizeObserver(([d]) => {
      d && a(Math.round(d.contentRect.width));
    });
    return s.observe(l), () => s.disconnect();
  }, []), [t, r];
}
function lt(t) {
  const r = Q(null);
  return ft(() => {
    const a = r.current;
    if (!a || !t) return;
    const l = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
    a.style.left = l ? "0px" : `${Math.min(t.boxW - a.offsetWidth, Math.max(0, t.px + t.gap))}px`;
  }), r;
}
function xt(t, r) {
  const a = r.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - a.left, boxW: a.width };
}
const { L: C, R: z, T: F, B: Y } = rt;
function Ct(t) {
  const [r, a] = ot(), l = Q(null), [s, d] = K(null), v = lt(s), u = Math.max(280, a), R = t.series.filter((e) => !t.hidden?.includes(e.name)), w = Math.max(0, ...t.series.map((e) => e.data.length)), T = R.flatMap((e) => e.data.filter((i) => i != null)), S = t.yMax || (t.robust ? gt(T) : J(Math.max(0, ...T) * 1.05)), p = (e) => C + (u - C - z) * e / Math.max(1, w - 1), g = (e) => F + (b - F - Y) * (1 - Math.min(e, S) / S), j = bt(yt(t.t0, t.step, w, t.xEvery), (u - C - z) / Math.max(1, w - 1)), E = (e) => R.some((i) => i.data[e] != null);
  function M(e) {
    const i = l.current;
    if (!i) return;
    const { px: o, boxW: m } = xt(e, i);
    let x = Math.round((o * u / m - C) / (u - C - z) * (w - 1));
    if (!(x >= 0 && x < w)) return d(null);
    if (t.connect) {
      let B = -1;
      for (let $ = 0; $ < w; $++) E($) && (B < 0 || Math.abs($ - x) < Math.abs(B - x)) && (B = $);
      if (B < 0) return d(null);
      x = B;
    }
    d({ i: x, px: o, boxW: m, gap: 12 });
  }
  let L = null;
  if (s) {
    const e = s.i;
    L = /* @__PURE__ */ f(X, { children: [
      /* @__PURE__ */ c("b", { children: ct(t.t0 + e * t.step) }),
      R.map((i) => {
        const o = i.data[e];
        return /* @__PURE__ */ f("span", { children: [
          /* @__PURE__ */ c("br", {}),
          /* @__PURE__ */ c("i", { style: { background: i.color } }),
          i.name,
          ": ",
          o == null ? "—" : i.fmt ? i.fmt(o) : o
        ] }, i.name);
      }),
      t.bands?.some(([i, o]) => e >= i && e <= o) && /* @__PURE__ */ f(X, { children: [
        /* @__PURE__ */ c("br", {}),
        /* @__PURE__ */ c("span", { className: "vs-chart-tip-band", children: t.bandLabel ?? "нет данных" })
      ] }),
      t.note?.(e) ? /* @__PURE__ */ f(X, { children: [
        /* @__PURE__ */ c("br", {}),
        t.note(e)
      ] }) : null,
      (t.marks ?? []).filter((i) => Math.abs(i.i - e) <= 1).map((i, o) => /* @__PURE__ */ f("span", { children: [
        /* @__PURE__ */ c("br", {}),
        /* @__PURE__ */ f("span", { className: i.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          i.dashed ? "↻ " : "🚀 ",
          i.label
        ] })
      ] }, o))
    ] });
  }
  return /* @__PURE__ */ f("div", { className: q("vs-chart", t.className), children: [
    /* @__PURE__ */ c("div", { className: "vs-chart-tip", ref: v, hidden: !s, children: L }),
    /* @__PURE__ */ c("div", { className: "vs-chart-view", ref: r, children: a > 0 && /* @__PURE__ */ f("svg", { ref: l, viewBox: `0 0 ${u} ${b}`, width: u, height: b, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, i], o) => /* @__PURE__ */ c("rect", { className: "vs-chart-band", x: p(e), y: F, width: Math.max(2, p(i) - p(e)), height: b - F - Y }, o)),
      [0, 1, 2, 3, 4].map((e) => {
        const i = S * e / 4;
        return /* @__PURE__ */ f("g", { children: [
          /* @__PURE__ */ c("line", { className: "vs-chart-grid", x1: C, x2: u - z, y1: g(i), y2: g(i) }),
          /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: C - 6, y: g(i) + 4, textAnchor: "end", children: Math.round(i) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      j.map((e) => /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: p(e.i), y: b - 6, textAnchor: "middle", children: e.label }, e.i)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < w).map((e, i) => /* @__PURE__ */ c("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: p(e.i), x2: p(e.i), y1: F, y2: b - Y }, i)),
      R.map((e) => /* @__PURE__ */ f("g", { children: [
        t.connect && e.data.map((i, o) => i != null && /* @__PURE__ */ c("circle", { className: "vs-chart-dot", cx: p(o), cy: g(i), r: 3, fill: e.color, strokeWidth: 1.5 }, o)),
        /* @__PURE__ */ c("path", { d: $t(e.data, p, g, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((i, o) => i != null && (o === 0 || e.data[o - 1] == null) && (o === w - 1 || e.data[o + 1] == null) && /* @__PURE__ */ c("circle", { cx: p(o), cy: g(i), r: 2.5, fill: e.color }, `s${o}`)),
        e.data.map((i, o) => i != null && i > S && /* @__PURE__ */ c("circle", { className: "vs-chart-clip", cx: p(o), cy: F, r: 3, fill: e.color }, `c${o}`))
      ] }, e.name)),
      s && /* @__PURE__ */ c("line", { className: "vs-chart-cross", x1: p(s.i), x2: p(s.i), y1: F, y2: b - Y }),
      s && R.map((e) => {
        const i = e.data[s.i];
        return i != null && /* @__PURE__ */ c("circle", { className: "vs-chart-dot", r: 4, cx: p(s.i), cy: g(i), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ c("rect", { x: C, y: 0, width: u - C - z, height: b, fill: "transparent", onMouseMove: M, onTouchStart: M, onTouchMove: M, onMouseLeave: () => d(null) })
    ] }) })
  ] });
}
const { L: I, R: ut, T: mt, B: Nt } = rt, wt = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function Dt({ labels: t, series: r, fmt: a, label: l, className: s, xFormat: d = wt }) {
  const [v, u] = ot(), R = Q(null), [w, T] = K(null), S = lt(w), p = Math.max(280, u), g = t.length, j = t.map((o, m) => r.reduce((x, B) => x + (B.data[m] || 0), 0)), E = J(Math.max(0, ...j) * 1.05), M = (o) => mt + (b - mt - Nt) * (1 - o / E), L = (p - I - ut) / Math.max(1, g), e = Math.max(4, L - 6);
  function i(o) {
    const m = R.current;
    if (!m) return;
    const x = m.getBoundingClientRect();
    T({ i: o, px: (I + L * (o + 1)) * x.width / p, boxW: x.width, gap: 6 });
  }
  return /* @__PURE__ */ f("div", { className: q("vs-chart", s), children: [
    /* @__PURE__ */ c("div", { className: "vs-chart-tip", ref: S, hidden: !w, children: w && /* @__PURE__ */ f(X, { children: [
      /* @__PURE__ */ c("b", { children: d(t[w.i] ?? "") }),
      " — ",
      a(j[w.i] ?? 0),
      r.map((o) => /* @__PURE__ */ f("span", { children: [
        /* @__PURE__ */ c("br", {}),
        /* @__PURE__ */ c("i", { style: { background: o.color } }),
        o.name,
        ": ",
        a(o.data[w.i] || 0)
      ] }, o.name))
    ] }) }),
    /* @__PURE__ */ c("div", { className: "vs-chart-view", ref: v, children: u > 0 && /* @__PURE__ */ f("svg", { ref: R, viewBox: `0 0 ${p} ${b}`, width: p, height: b, role: "img", "aria-label": l, children: [
      [0, 1, 2, 3, 4].map((o) => {
        const m = E * o / 4;
        return /* @__PURE__ */ f("g", { children: [
          /* @__PURE__ */ c("line", { className: "vs-chart-grid", x1: I, x2: p - ut, y1: M(m), y2: M(m) }),
          /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: I - 6, y: M(m) + 4, textAnchor: "end", children: a(m) })
        ] }, o);
      }),
      t.map((o, m) => {
        const x = I + L * m + (L - e) / 2, B = j[m] ?? 0;
        let $ = 0;
        return /* @__PURE__ */ f("g", { children: [
          r.map((W, Z) => {
            const _ = W.data[m] || 0;
            if (!_) return null;
            const k = M($), y = M($ + _);
            $ += _;
            const tt = !r.slice(Z + 1).some((et) => et.data[m]), P = $ < B ? 2 : 0, U = Math.max(1, k - y - P);
            return tt && U > 4 ? /* @__PURE__ */ c("path", { fill: W.color, d: `M${x} ${k}V${y + 4}Q${x} ${y} ${x + 4} ${y}H${x + e - 4}Q${x + e} ${y} ${x + e} ${y + 4}V${k}Z` }, W.name) : /* @__PURE__ */ c("rect", { fill: W.color, x, y: y + P, width: e, height: U }, W.name);
          }),
          m % 2 === (g - 1) % 2 && /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: x + e / 2, y: b - 6, textAnchor: "middle", children: d(o) }),
          /* @__PURE__ */ c("rect", { x: I + L * m, y: 0, width: L, height: b, fill: "transparent", onMouseMove: () => i(m), onTouchStart: () => i(m), onMouseLeave: () => T(null) })
        ] }, o);
      })
    ] }) })
  ] });
}
const { L: A, R: D, T: G, B: at } = rt, Lt = (t) => {
  const r = 10 ** Math.floor(Math.log10(t)), a = t / r;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 2.5 ? 2.5 : a <= 5 ? 5 : 10) * r;
}, kt = (t, r) => {
  const a = [...t].sort((s, d) => d.y - s.y);
  let l = -1 / 0;
  return a.map((s) => {
    const d = r(s.y), v = d - l < 14;
    return l = v ? d + 16 : d, { r: s, below: v };
  });
}, Rt = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }), Tt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });
function jt({ series: t, refLines: r = [], yFrom: a = "zero", now: l, unit: s, xFormat: d = (T) => Rt.format(T * 1e3), tipFormat: v = (T) => Tt.format(T * 1e3), yFormat: u = (T) => String(Math.round(T)), label: R, className: w }) {
  const [T, S] = ot(), p = Q(null), [g, j] = K(null), E = lt(g), M = Math.max(280, S), L = t.flatMap((n) => n.points), e = L.map((n) => n[0]).concat(l != null ? [l] : []), i = L.map((n) => n[1]).concat(r.map((n) => n.y)), o = Math.min(...e), m = Math.max(...e), x = Math.max(0, ...i), B = a === "data" && i.length ? Math.max(0, Math.min(...i)) : 0, $ = Lt((x * (a === "data" ? 1 : 1.05) - B || x || 1) / 4), W = a === "data" ? Math.floor(B / $) * $ : 0, Z = Math.max(W + $, Math.ceil(x * (a === "data" ? 1 : 1.05) / $) * $), _ = Array.from({ length: Math.round((Z - W) / $) + 1 }, (n, h) => W + h * $), k = (n) => A + (M - A - D) * (n - o) / Math.max(1, m - o), y = (n) => G + (b - G - at) * (1 - (n - W) / Math.max(1e-9, Z - W)), tt = [0, 1, 2, 3].map((n) => o + (m - o) * n / 3), P = M - A - D > 0 ? (m - o) / (M - A - D) * 8 : 0, U = (n, h) => {
    const N = n.points.reduce((V, dt) => !V || Math.abs(dt[0] - h) < Math.abs(V[0] - h) ? dt : V, void 0);
    if (!N) return;
    const H = n.points.map((V) => V[0]);
    return (n.line ?? !n.dots ? h >= Math.min(...H) - P && h <= Math.max(...H) + P : Math.abs(N[0] - h) <= P) ? N : void 0;
  }, et = (n) => L.reduce((h, N) => Math.abs(N[0] - n) < Math.abs(h - n) ? N[0] : h, L[0]?.[0] ?? n);
  function nt(n) {
    const h = p.current;
    if (!h || !L.length) return;
    const { px: N, boxW: H } = xt(n, h), ht = o + (N * M / H - A) / (M - A - D) * (m - o);
    j({ t: et(ht), px: N, boxW: H, gap: 12 });
  }
  let it = null;
  g && (it = /* @__PURE__ */ f(X, { children: [
    /* @__PURE__ */ c("b", { children: v(g.t) }),
    t.map((n) => {
      const h = U(n, g.t);
      return h ? /* @__PURE__ */ f("span", { children: [
        /* @__PURE__ */ c("br", {}),
        /* @__PURE__ */ c("i", { style: { background: n.color } }),
        n.name,
        ": ",
        n.fmt ? n.fmt(h[1]) : h[1]
      ] }, n.name) : null;
    })
  ] }));
  const vt = (l != null ? Math.min(k(l), M - D) : M - D) - 8, st = (n) => n.map((h, N) => `${N ? "L" : "M"}${k(h[0]).toFixed(1)},${y(h[1]).toFixed(1)}`).join("");
  return /* @__PURE__ */ f("div", { className: q("vs-chart", w), children: [
    /* @__PURE__ */ c("div", { className: "vs-chart-tip", ref: E, hidden: !g, children: it }),
    /* @__PURE__ */ c("div", { className: "vs-chart-view", ref: T, children: S > 0 && /* @__PURE__ */ f("svg", { ref: p, viewBox: `0 0 ${M} ${b}`, width: M, height: b, role: "img", "aria-label": R, children: [
      _.map((n, h) => /* @__PURE__ */ f("g", { children: [
        /* @__PURE__ */ c("line", { className: "vs-chart-grid", x1: A, x2: M - D, y1: y(n), y2: y(n) }),
        /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: A - 6, y: y(n) + 4, textAnchor: "end", children: u(n) + (h === _.length - 1 ? s ?? "" : "") })
      ] }, h)),
      tt.map((n, h) => /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: k(n), y: b - 6, textAnchor: h === 0 ? "start" : h === 3 ? "end" : "middle", children: d(n) }, h)),
      kt(r, y).map(({ r: n, below: h }, N) => /* @__PURE__ */ f("g", { children: [
        /* @__PURE__ */ c("line", { x1: A, x2: M - D, y1: y(n.y), y2: y(n.y), stroke: n.color ?? "var(--vs-muted)", strokeWidth: 1, strokeDasharray: n.dashed === !1 ? void 0 : "4 3" }),
        /* @__PURE__ */ c("text", { className: "vs-chart-axis vs-chart-ref", x: vt, y: y(n.y) + (h ? 12 : -4), textAnchor: "end", children: n.label })
      ] }, `r${N}`)),
      l != null && /* @__PURE__ */ c("line", { className: "vs-chart-restart", x1: k(l), x2: k(l), y1: G, y2: b - at }),
      t.map((n) => {
        const h = [...n.points].sort((N, H) => N[0] - H[0]);
        return /* @__PURE__ */ f("g", { children: [
          n.area && h.length > 1 && /* @__PURE__ */ c("path", { d: `${st(h)}L${k(h[h.length - 1][0]).toFixed(1)},${y(W)}L${k(h[0][0]).toFixed(1)},${y(W)}Z`, fill: n.color, opacity: 0.12 }),
          (n.line ?? !n.dots) && /* @__PURE__ */ c("path", { d: st(h), fill: "none", stroke: n.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
          (n.dots || h.length === 1) && h.map((N, H) => /* @__PURE__ */ c("circle", { cx: k(N[0]), cy: y(N[1]), r: 3, fill: n.color }, H))
        ] }, n.name);
      }),
      g && /* @__PURE__ */ c("line", { className: "vs-chart-cross", x1: k(g.t), x2: k(g.t), y1: G, y2: b - at }),
      g && t.map((n) => {
        const h = U(n, g.t);
        return h && /* @__PURE__ */ c("circle", { className: "vs-chart-dot", r: 4, cx: k(h[0]), cy: y(h[1]), fill: n.color, strokeWidth: 2 }, `h${n.name}`);
      }),
      /* @__PURE__ */ c("rect", { x: A, y: 0, width: M - A - D, height: b, fill: "transparent", onMouseMove: nt, onTouchStart: nt, onTouchMove: nt, onMouseLeave: () => j(null) })
    ] }) })
  ] });
}
function Wt({ items: t, hidden: r = [], onToggle: a }) {
  return /* @__PURE__ */ c("div", { className: "vs-chart-legend", children: t.map((l) => {
    const s = /* @__PURE__ */ f(X, { children: [
      /* @__PURE__ */ c("i", { style: { background: l.color } }),
      l.name,
      l.extra ? /* @__PURE__ */ f(X, { children: [
        " ",
        /* @__PURE__ */ c("em", { children: l.extra })
      ] }) : null
    ] });
    return a ? /* @__PURE__ */ c("button", { type: "button", className: "vs-chart-legend-item", "aria-pressed": !r.includes(l.name), onClick: () => a(l.name), children: s }, l.name) : /* @__PURE__ */ c("span", { children: s }, l.name);
  }) });
}
function Ft({ title: t, sub: r, legend: a, extra: l, className: s, children: d, hidden: v, onToggle: u }) {
  return /* @__PURE__ */ f("div", { className: q("vs-chart-card", s), children: [
    /* @__PURE__ */ c("div", { className: "vs-chart-title", children: t }),
    r != null && /* @__PURE__ */ c("div", { className: "vs-chart-sub", children: r }),
    l,
    a && /* @__PURE__ */ c(Wt, { items: a, hidden: v, onToggle: u }),
    d
  ] });
}
const Xt = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#8a63d2", "#1c9bb8", "#9c6b3e"];
export {
  Ft as ChartCard,
  Wt as ChartLegend,
  Ct as LineChart,
  Dt as StackedBars,
  jt as TimeChart,
  Xt as chartPalette,
  Mt as dayTicks,
  ct as fmtStamp,
  $t as linePath,
  J as niceMax,
  Ht as outageBands,
  gt as robustMax,
  yt as timeTicks
};
