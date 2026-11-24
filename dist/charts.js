import { jsxs as u, Fragment as E, jsx as n } from "react/jsx-runtime";
import { useRef as z, useState as J, useLayoutEffect as it } from "react";
import { c as K } from "./cx.js";
const ut = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], Z = (t) => String(t).padStart(2, "0");
function _(t) {
  if (!(t > 0)) return 4;
  const c = t / 4, a = 10 ** Math.floor(Math.log10(c)), s = c / a;
  for (const i of ut) if (s <= i + 1e-9) return i * a * 4;
  return 40 * a;
}
function mt(t, c, a, s) {
  const i = [];
  for (let h = 0; h < a; h++) {
    const p = new Date((t + h * c) * 1e3);
    p.getHours() === 0 && p.getMinutes() === 0 && i.push(h);
  }
  return s ? i.filter((h, p) => p % s === 0) : i;
}
function ft(t) {
  if (!t.length) return 4;
  const c = [...t].sort((i, h) => i - h), a = c[c.length - 1], s = c[Math.max(0, Math.ceil(0.95 * c.length) - 1)];
  return a > s * 1.5 ? _(s * 1.3) : _(a * 1.05);
}
function xt(t, c, a, s) {
  const i = (a - 1) * c;
  if (i >= 36 * 3600) return mt(t, c, a, s).map((m) => ({ i: m, label: nt(t + m * c).slice(0, 5) }));
  const h = i > 12 * 3600 ? 6 : 3, p = [];
  for (let m = 0; m < a; m++) {
    const R = new Date((t + m * c) * 1e3);
    R.getMinutes() === 0 && R.getHours() % h === 0 && p.push({ i: m, label: nt(t + m * c).slice(6) });
  }
  return p;
}
function Rt(t) {
  const c = [];
  let a = null;
  return t.forEach((s, i) => {
    s != null && s < 1 ? a == null && (a = i) : a != null && (c.push([a, i - 1]), a = null);
  }), a != null && c.push([a, t.length - 1]), c;
}
function vt(t, c, a, s) {
  let i = "", h = !1;
  return t.forEach((p, m) => {
    if (p == null) {
      s || (h = !1);
      return;
    }
    i += `${h ? "L" : "M"}${c(m).toFixed(1)} ${a(p).toFixed(1)}`, h = !0;
  }), i;
}
function nt(t) {
  const c = new Date(t * 1e3);
  return `${Z(c.getDate())}.${Z(c.getMonth() + 1)} ${Z(c.getHours())}:${Z(c.getMinutes())}`;
}
const y = 170, at = { L: 40, R: 12, T: 10, B: 22 };
function ct() {
  const t = z(null), [c, a] = J(0);
  return it(() => {
    const s = t.current;
    if (!s) return;
    const i = new ResizeObserver(([h]) => {
      h && a(Math.round(h.contentRect.width));
    });
    return i.observe(s), () => i.disconnect();
  }, []), [t, c];
}
function rt(t) {
  const c = z(null);
  return it(() => {
    const a = c.current;
    !a || !t || (a.style.left = `${Math.min(t.boxW - a.offsetWidth, Math.max(0, t.px + t.gap))}px`);
  }), c;
}
function ht(t, c) {
  const a = c.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - a.left, boxW: a.width };
}
const { L: F, R: O, T: j, B: Y } = at;
function Tt(t) {
  const [c, a] = ct(), s = z(null), [i, h] = J(null), p = rt(i), m = Math.max(280, a), R = t.series.filter((e) => !t.hidden?.includes(e.name)), b = Math.max(0, ...t.series.map((e) => e.data.length)), T = R.flatMap((e) => e.data.filter((o) => o != null)), S = t.yMax || (t.robust ? ft(T) : _(Math.max(0, ...T) * 1.05)), v = (e) => F + (m - F - O) * e / Math.max(1, b - 1), g = (e) => j + (y - j - Y) * (1 - Math.min(e, S) / S), D = xt(t.t0, t.step, b, t.xEvery), P = (e) => R.some((o) => o.data[e] != null);
  function M(e) {
    const o = s.current;
    if (!o) return;
    const { px: l, boxW: f } = ht(e, o);
    let x = Math.round((l * m / f - F) / (m - F - O) * (b - 1));
    if (!(x >= 0 && x < b)) return h(null);
    if (t.connect) {
      let B = -1;
      for (let N = 0; N < b; N++) P(N) && (B < 0 || Math.abs(N - x) < Math.abs(B - x)) && (B = N);
      if (B < 0) return h(null);
      x = B;
    }
    h({ i: x, px: l, boxW: f, gap: 12 });
  }
  let w = null;
  if (i) {
    const e = i.i;
    w = /* @__PURE__ */ u(E, { children: [
      /* @__PURE__ */ n("b", { children: nt(t.t0 + e * t.step) }),
      R.map((o) => {
        const l = o.data[e];
        return /* @__PURE__ */ u("span", { children: [
          /* @__PURE__ */ n("br", {}),
          /* @__PURE__ */ n("i", { style: { background: o.color } }),
          o.name,
          ": ",
          l == null ? "—" : o.fmt ? o.fmt(l) : l
        ] }, o.name);
      }),
      t.bands?.some(([o, l]) => e >= o && e <= l) && /* @__PURE__ */ u(E, { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ n("span", { className: "vs-chart-tip-band", children: t.bandLabel ?? "нет данных" })
      ] }),
      t.note?.(e) ? /* @__PURE__ */ u(E, { children: [
        /* @__PURE__ */ n("br", {}),
        t.note(e)
      ] }) : null,
      (t.marks ?? []).filter((o) => Math.abs(o.i - e) <= 1).map((o, l) => /* @__PURE__ */ u("span", { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ u("span", { className: o.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          o.dashed ? "↻ " : "🚀 ",
          o.label
        ] })
      ] }, l))
    ] });
  }
  return /* @__PURE__ */ u("div", { className: K("vs-chart", t.className), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: p, hidden: !i, children: w }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: c, children: a > 0 && /* @__PURE__ */ u("svg", { ref: s, viewBox: `0 0 ${m} ${y}`, width: m, height: y, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, o], l) => /* @__PURE__ */ n("rect", { className: "vs-chart-band", x: v(e), y: j, width: Math.max(2, v(o) - v(e)), height: y - j - Y }, l)),
      [0, 1, 2, 3, 4].map((e) => {
        const o = S * e / 4;
        return /* @__PURE__ */ u("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: F, x2: m - O, y1: g(o), y2: g(o) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: F - 6, y: g(o) + 4, textAnchor: "end", children: Math.round(o) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      D.map((e) => /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: v(e.i), y: y - 6, textAnchor: "middle", children: e.label }, e.i)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < b).map((e, o) => /* @__PURE__ */ n("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: v(e.i), x2: v(e.i), y1: j, y2: y - Y }, o)),
      R.map((e) => /* @__PURE__ */ u("g", { children: [
        t.connect && e.data.map((o, l) => o != null && /* @__PURE__ */ n("circle", { className: "vs-chart-dot", cx: v(l), cy: g(o), r: 3, fill: e.color, strokeWidth: 1.5 }, l)),
        /* @__PURE__ */ n("path", { d: vt(e.data, v, g, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((o, l) => o != null && (l === 0 || e.data[l - 1] == null) && (l === b - 1 || e.data[l + 1] == null) && /* @__PURE__ */ n("circle", { cx: v(l), cy: g(o), r: 2.5, fill: e.color }, `s${l}`)),
        e.data.map((o, l) => o != null && o > S && /* @__PURE__ */ n("circle", { className: "vs-chart-clip", cx: v(l), cy: j, r: 3, fill: e.color }, `c${l}`))
      ] }, e.name)),
      i && /* @__PURE__ */ n("line", { className: "vs-chart-cross", x1: v(i.i), x2: v(i.i), y1: j, y2: y - Y }),
      i && R.map((e) => {
        const o = e.data[i.i];
        return o != null && /* @__PURE__ */ n("circle", { className: "vs-chart-dot", r: 4, cx: v(i.i), cy: g(o), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ n("rect", { x: F, y: 0, width: m - F - O, height: y, fill: "transparent", onMouseMove: M, onTouchStart: M, onTouchMove: M, onMouseLeave: () => h(null) })
    ] }) })
  ] });
}
const { L: U, R: lt, T: st, B: pt } = at, gt = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function Wt({ labels: t, series: c, fmt: a, label: s, className: i, xFormat: h = gt }) {
  const [p, m] = ct(), R = z(null), [b, T] = J(null), S = rt(b), v = Math.max(280, m), g = t.length, D = t.map((l, f) => c.reduce((x, B) => x + (B.data[f] || 0), 0)), P = _(Math.max(0, ...D) * 1.05), M = (l) => st + (y - st - pt) * (1 - l / P), w = (v - U - lt) / Math.max(1, g), e = Math.max(4, w - 6);
  function o(l) {
    const f = R.current;
    if (!f) return;
    const x = f.getBoundingClientRect();
    T({ i: l, px: (U + w * (l + 1)) * x.width / v, boxW: x.width, gap: 6 });
  }
  return /* @__PURE__ */ u("div", { className: K("vs-chart", i), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: S, hidden: !b, children: b && /* @__PURE__ */ u(E, { children: [
      /* @__PURE__ */ n("b", { children: h(t[b.i] ?? "") }),
      " — ",
      a(D[b.i] ?? 0),
      c.map((l) => /* @__PURE__ */ u("span", { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ n("i", { style: { background: l.color } }),
        l.name,
        ": ",
        a(l.data[b.i] || 0)
      ] }, l.name))
    ] }) }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: p, children: m > 0 && /* @__PURE__ */ u("svg", { ref: R, viewBox: `0 0 ${v} ${y}`, width: v, height: y, role: "img", "aria-label": s, children: [
      [0, 1, 2, 3, 4].map((l) => {
        const f = P * l / 4;
        return /* @__PURE__ */ u("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: U, x2: v - lt, y1: M(f), y2: M(f) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: U - 6, y: M(f) + 4, textAnchor: "end", children: a(f) })
        ] }, l);
      }),
      t.map((l, f) => {
        const x = U + w * f + (w - e) / 2, B = D[f] ?? 0;
        let N = 0;
        return /* @__PURE__ */ u("g", { children: [
          c.map((W, Q) => {
            const L = W.data[f] || 0;
            if (!L) return null;
            const k = M(N), A = M(N + L);
            N += L;
            const q = !c.slice(Q + 1).some((tt) => tt.data[f]), I = N < B ? 2 : 0, V = Math.max(1, k - A - I);
            return q && V > 4 ? /* @__PURE__ */ n("path", { fill: W.color, d: `M${x} ${k}V${A + 4}Q${x} ${A} ${x + 4} ${A}H${x + e - 4}Q${x + e} ${A} ${x + e} ${A + 4}V${k}Z` }, W.name) : /* @__PURE__ */ n("rect", { fill: W.color, x, y: A + I, width: e, height: V }, W.name);
          }),
          f % 2 === (g - 1) % 2 && /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: x + e / 2, y: y - 6, textAnchor: "middle", children: h(l) }),
          /* @__PURE__ */ n("rect", { x: U + w * f, y: 0, width: w, height: y, fill: "transparent", onMouseMove: () => o(f), onTouchStart: () => o(f), onMouseLeave: () => T(null) })
        ] }, l);
      })
    ] }) })
  ] });
}
const { L: C, R: X, T: G, B: et } = at, Mt = (t) => {
  const c = 10 ** Math.floor(Math.log10(t)), a = t / c;
  return (a <= 1 ? 1 : a <= 2 ? 2 : a <= 2.5 ? 2.5 : a <= 5 ? 5 : 10) * c;
}, yt = (t, c) => {
  const a = [...t].sort((i, h) => h.y - i.y);
  let s = -1 / 0;
  return a.map((i) => {
    const h = c(i.y), p = h - s < 14;
    return s = p ? h + 16 : h, { r: i, below: p };
  });
}, $t = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }), bt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });
function Bt({ series: t, refLines: c = [], yFrom: a = "zero", now: s, unit: i, xFormat: h = (T) => $t.format(T * 1e3), tipFormat: p = (T) => bt.format(T * 1e3), yFormat: m = (T) => String(Math.round(T)), label: R, className: b }) {
  const [T, S] = ct(), v = z(null), [g, D] = J(null), P = rt(g), M = Math.max(280, S), w = t.flatMap((r) => r.points), e = w.map((r) => r[0]).concat(s != null ? [s] : []), o = w.map((r) => r[1]).concat(c.map((r) => r.y)), l = Math.min(...e), f = Math.max(...e), x = Math.max(0, ...o), B = a === "data" && o.length ? Math.max(0, Math.min(...o)) : 0, N = Mt((x - B || x || 1) / 4), W = a === "data" ? Math.floor(B / N) * N : 0, Q = a === "data" ? Math.max(W + N * 4, Math.ceil(x / N) * N) : _(x * 1.05), L = (r) => C + (M - C - X) * (r - l) / Math.max(1, f - l), k = (r) => G + (y - G - et) * (1 - (r - W) / Math.max(1e-9, Q - W)), A = [0, 1, 2, 3].map((r) => l + (f - l) * r / 3), q = (r) => w.reduce((d, $) => Math.abs($[0] - r) < Math.abs(d - r) ? $[0] : d, w[0]?.[0] ?? r);
  function I(r) {
    const d = v.current;
    if (!d || !w.length) return;
    const { px: $, boxW: H } = ht(r, d), dt = l + ($ * M / H - C) / (M - C - X) * (f - l);
    D({ t: q(dt), px: $, boxW: H, gap: 12 });
  }
  let V = null;
  g && (V = /* @__PURE__ */ u(E, { children: [
    /* @__PURE__ */ n("b", { children: p(g.t) }),
    t.map((r) => {
      const d = r.points.reduce(($, H) => !$ || Math.abs(H[0] - g.t) < Math.abs($[0] - g.t) ? H : $, void 0);
      return d ? /* @__PURE__ */ u("span", { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ n("i", { style: { background: r.color } }),
        r.name,
        ": ",
        r.fmt ? r.fmt(d[1]) : d[1]
      ] }, r.name) : null;
    })
  ] }));
  const tt = (s != null ? Math.min(L(s), M - X) : M - X) - 8, ot = (r) => r.map((d, $) => `${$ ? "L" : "M"}${L(d[0]).toFixed(1)},${k(d[1]).toFixed(1)}`).join("");
  return /* @__PURE__ */ u("div", { className: K("vs-chart", b), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: P, hidden: !g, children: V }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: T, children: S > 0 && /* @__PURE__ */ u("svg", { ref: v, viewBox: `0 0 ${M} ${y}`, width: M, height: y, role: "img", "aria-label": R, children: [
      [0, 1, 2, 3, 4].map((r) => {
        const d = W + (Q - W) * r / 4;
        return /* @__PURE__ */ u("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: C, x2: M - X, y1: k(d), y2: k(d) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: C - 6, y: k(d) + 4, textAnchor: "end", children: m(d) + (r === 4 ? i ?? "" : "") })
        ] }, r);
      }),
      A.map((r, d) => /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: L(r), y: y - 6, textAnchor: d === 0 ? "start" : d === 3 ? "end" : "middle", children: h(r) }, d)),
      yt(c, k).map(({ r, below: d }, $) => /* @__PURE__ */ u("g", { children: [
        /* @__PURE__ */ n("line", { x1: C, x2: M - X, y1: k(r.y), y2: k(r.y), stroke: r.color ?? "var(--vs-muted)", strokeWidth: 1, strokeDasharray: r.dashed === !1 ? void 0 : "4 3" }),
        /* @__PURE__ */ n("text", { className: "vs-chart-axis vs-chart-ref", x: tt, y: k(r.y) + (d ? 12 : -4), textAnchor: "end", children: r.label })
      ] }, `r${$}`)),
      s != null && /* @__PURE__ */ n("line", { className: "vs-chart-restart", x1: L(s), x2: L(s), y1: G, y2: y - et }),
      t.map((r) => {
        const d = [...r.points].sort(($, H) => $[0] - H[0]);
        return /* @__PURE__ */ u("g", { children: [
          r.area && d.length > 1 && /* @__PURE__ */ n("path", { d: `${ot(d)}L${L(d[d.length - 1][0]).toFixed(1)},${k(W)}L${L(d[0][0]).toFixed(1)},${k(W)}Z`, fill: r.color, opacity: 0.12 }),
          (r.line ?? !r.dots) && /* @__PURE__ */ n("path", { d: ot(d), fill: "none", stroke: r.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
          (r.dots || d.length === 1) && d.map(($, H) => /* @__PURE__ */ n("circle", { cx: L($[0]), cy: k($[1]), r: 3, fill: r.color }, H))
        ] }, r.name);
      }),
      g && /* @__PURE__ */ n("line", { className: "vs-chart-cross", x1: L(g.t), x2: L(g.t), y1: G, y2: y - et }),
      /* @__PURE__ */ n("rect", { x: C, y: 0, width: M - C - X, height: y, fill: "transparent", onMouseMove: I, onTouchStart: I, onTouchMove: I, onMouseLeave: () => D(null) })
    ] }) })
  ] });
}
function Nt({ items: t, hidden: c = [], onToggle: a }) {
  return /* @__PURE__ */ n("div", { className: "vs-chart-legend", children: t.map((s) => {
    const i = /* @__PURE__ */ u(E, { children: [
      /* @__PURE__ */ n("i", { style: { background: s.color } }),
      s.name,
      s.extra ? /* @__PURE__ */ u(E, { children: [
        " ",
        /* @__PURE__ */ n("em", { children: s.extra })
      ] }) : null
    ] });
    return a ? /* @__PURE__ */ n("button", { type: "button", className: "vs-chart-legend-item", "aria-pressed": !c.includes(s.name), onClick: () => a(s.name), children: i }, s.name) : /* @__PURE__ */ n("span", { children: i }, s.name);
  }) });
}
function St({ title: t, sub: c, legend: a, extra: s, className: i, children: h, hidden: p, onToggle: m }) {
  return /* @__PURE__ */ u("div", { className: K("vs-chart-card", i), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-title", children: t }),
    c != null && /* @__PURE__ */ n("div", { className: "vs-chart-sub", children: c }),
    s,
    a && /* @__PURE__ */ n(Nt, { items: a, hidden: p, onToggle: m }),
    h
  ] });
}
const At = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
export {
  St as ChartCard,
  Nt as ChartLegend,
  Tt as LineChart,
  Wt as StackedBars,
  Bt as TimeChart,
  At as chartPalette,
  mt as dayTicks,
  nt as fmtStamp,
  vt as linePath,
  _ as niceMax,
  Rt as outageBands,
  ft as robustMax,
  xt as timeTicks
};
