import { jsxs as h, Fragment as S, jsx as a } from "react/jsx-runtime";
import { useRef as E, useState as D, useLayoutEffect as O } from "react";
import { c as U } from "./cx.js";
const Y = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], H = (e) => String(e).padStart(2, "0");
function Z(e) {
  if (!(e > 0)) return 4;
  const r = e / 4, s = 10 ** Math.floor(Math.log10(r)), o = r / s;
  for (const l of Y) if (o <= l + 1e-9) return l * s * 4;
  return 40 * s;
}
function tt(e, r, s, o) {
  const l = [];
  for (let i = 0; i < s; i++) {
    const d = new Date((e + i * r) * 1e3);
    d.getHours() === 0 && d.getMinutes() === 0 && l.push(i);
  }
  return o ? l.filter((i, d) => d % o === 0) : l;
}
function it(e) {
  const r = [];
  let s = null;
  return e.forEach((o, l) => {
    o != null && o < 1 ? s == null && (s = l) : s != null && (r.push([s, l - 1]), s = null);
  }), s != null && r.push([s, e.length - 1]), r;
}
function et(e, r, s, o) {
  let l = "", i = !1;
  return e.forEach((d, f) => {
    if (d == null) {
      o || (i = !1);
      return;
    }
    l += `${i ? "L" : "M"}${r(f).toFixed(1)} ${s(d).toFixed(1)}`, i = !0;
  }), l;
}
function V(e) {
  const r = new Date(e * 1e3);
  return `${H(r.getDate())}.${H(r.getMonth() + 1)} ${H(r.getHours())}:${H(r.getMinutes())}`;
}
const m = 170, q = { L: 40, R: 12, T: 10, B: 22 };
function G() {
  const e = E(null), [r, s] = D(0);
  return O(() => {
    const o = e.current;
    if (!o) return;
    const l = new ResizeObserver(([i]) => {
      i && s(Math.round(i.contentRect.width));
    });
    return l.observe(o), () => l.disconnect();
  }, []), [e, r];
}
function I(e) {
  const r = E(null);
  return O(() => {
    const s = r.current;
    !s || !e || (s.style.left = `${Math.min(e.boxW - s.offsetWidth, Math.max(0, e.px + e.gap))}px`);
  }), r;
}
function nt(e, r) {
  const s = r.getBoundingClientRect();
  return { px: ("touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX) - s.left, boxW: s.width };
}
const { L: $, R: A, T, B: C } = q;
function ot(e) {
  const [r, s] = G(), o = E(null), [l, i] = D(null), d = I(l), f = Math.max(280, s), M = Math.max(0, ...e.series.map((t) => t.data.length)), b = Math.max(0, ...e.series.flatMap((t) => t.data.filter((n) => n != null))), L = e.yMax || Z(b * 1.05), u = (t) => $ + (f - $ - A) * t / Math.max(1, M - 1), g = (t) => T + (m - T - C) * (1 - Math.min(t, L) / L), w = tt(e.t0, e.step, M, e.xEvery), y = (t) => e.series.some((n) => n.data[t] != null);
  function p(t) {
    const n = o.current;
    if (!n) return;
    const { px: c, boxW: R } = nt(t, n);
    let x = Math.round((c * f / R - $) / (f - $ - A) * (M - 1));
    if (!(x >= 0 && x < M)) return i(null);
    if (e.connect) {
      let v = -1;
      for (let N = 0; N < M; N++) y(N) && (v < 0 || Math.abs(N - x) < Math.abs(v - x)) && (v = N);
      if (v < 0) return i(null);
      x = v;
    }
    i({ i: x, px: c, boxW: R, gap: 12 });
  }
  let B = null;
  if (l) {
    const t = l.i;
    B = /* @__PURE__ */ h(S, { children: [
      /* @__PURE__ */ a("b", { children: V(e.t0 + t * e.step) }),
      e.series.map((n) => {
        const c = n.data[t];
        return /* @__PURE__ */ h("span", { children: [
          /* @__PURE__ */ a("br", {}),
          /* @__PURE__ */ a("i", { style: { background: n.color } }),
          n.name,
          ": ",
          c == null ? "—" : n.fmt ? n.fmt(c) : c
        ] }, n.name);
      }),
      e.bands?.some(([n, c]) => t >= n && t <= c) && /* @__PURE__ */ h(S, { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("span", { className: "vs-chart-tip-band", children: e.bandLabel ?? "нет данных" })
      ] }),
      e.note?.(t) ? /* @__PURE__ */ h(S, { children: [
        /* @__PURE__ */ a("br", {}),
        e.note(t)
      ] }) : null,
      (e.marks ?? []).filter((n) => Math.abs(n.i - t) <= 1).map((n, c) => /* @__PURE__ */ h("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ h("span", { className: n.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          n.dashed ? "↻ " : "🚀 ",
          n.label
        ] })
      ] }, c))
    ] });
  }
  return /* @__PURE__ */ h("div", { className: "vs-chart", children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: d, hidden: !l, children: B }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: r, children: s > 0 && /* @__PURE__ */ h("svg", { ref: o, viewBox: `0 0 ${f} ${m}`, width: f, height: m, role: "img", children: [
      (e.bands ?? []).map(([t, n], c) => /* @__PURE__ */ a("rect", { className: "vs-chart-band", x: u(t), y: T, width: Math.max(2, u(n) - u(t)), height: m - T - C }, c)),
      [0, 1, 2, 3, 4].map((t) => {
        const n = L * t / 4;
        return /* @__PURE__ */ h("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: $, x2: f - A, y1: g(n), y2: g(n) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: $ - 6, y: g(n) + 4, textAnchor: "end", children: Math.round(n) + (t === 4 ? e.unit ?? "" : "") })
        ] }, t);
      }),
      w.map((t) => /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: u(t), y: m - 6, textAnchor: "middle", children: V(e.t0 + t * e.step).slice(0, 5) }, t)),
      (e.marks ?? []).filter((t) => t.i >= 0 && t.i < M).map((t, n) => /* @__PURE__ */ a("line", { className: t.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: u(t.i), x2: u(t.i), y1: T, y2: m - C }, n)),
      e.series.map((t) => /* @__PURE__ */ h("g", { children: [
        e.connect && t.data.map((n, c) => n != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", cx: u(c), cy: g(n), r: 3, fill: t.color, strokeWidth: 1.5 }, c)),
        /* @__PURE__ */ a("path", { d: et(t.data, u, g, !!e.connect), fill: "none", stroke: t.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        t.data.map((n, c) => n != null && (c === 0 || t.data[c - 1] == null) && (c === M - 1 || t.data[c + 1] == null) && /* @__PURE__ */ a("circle", { cx: u(c), cy: g(n), r: 2.5, fill: t.color }, `s${c}`))
      ] }, t.name)),
      l && /* @__PURE__ */ a("line", { className: "vs-chart-cross", x1: u(l.i), x2: u(l.i), y1: T, y2: m - C }),
      l && e.series.map((t) => {
        const n = t.data[l.i];
        return n != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", r: 4, cx: u(l.i), cy: g(n), fill: t.color, strokeWidth: 2 }, t.name);
      }),
      /* @__PURE__ */ a("rect", { x: $, y: 0, width: f - $ - A, height: m, fill: "transparent", onMouseMove: p, onTouchStart: p, onTouchMove: p, onMouseLeave: () => i(null) })
    ] }) })
  ] });
}
const { L: W, R: _, T: Q, B: rt } = q, z = (e) => `${e.slice(8, 10)}.${e.slice(5, 7)}`;
function ht({ labels: e, series: r, fmt: s }) {
  const [o, l] = G(), i = E(null), [d, f] = D(null), M = I(d), b = Math.max(280, l), L = e.length, u = e.map((t, n) => r.reduce((c, R) => c + (R.data[n] || 0), 0)), g = Z(Math.max(0, ...u) * 1.05), w = (t) => Q + (m - Q - rt) * (1 - t / g), y = (b - W - _) / Math.max(1, L), p = Math.max(4, y - 6);
  function B(t) {
    const n = i.current;
    if (!n) return;
    const c = n.getBoundingClientRect();
    f({ i: t, px: (W + y * (t + 1)) * c.width / b, boxW: c.width, gap: 6 });
  }
  return /* @__PURE__ */ h("div", { className: "vs-chart", children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: M, hidden: !d, children: d && /* @__PURE__ */ h(S, { children: [
      /* @__PURE__ */ a("b", { children: z(e[d.i] ?? "") }),
      " — ",
      s(u[d.i] ?? 0),
      r.map((t) => /* @__PURE__ */ h("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("i", { style: { background: t.color } }),
        t.name,
        ": ",
        s(t.data[d.i] || 0)
      ] }, t.name))
    ] }) }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: o, children: l > 0 && /* @__PURE__ */ h("svg", { ref: i, viewBox: `0 0 ${b} ${m}`, width: b, height: m, role: "img", children: [
      [0, 1, 2, 3, 4].map((t) => {
        const n = g * t / 4;
        return /* @__PURE__ */ h("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: W, x2: b - _, y1: w(n), y2: w(n) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: W - 6, y: w(n) + 4, textAnchor: "end", children: s(n) })
        ] }, t);
      }),
      e.map((t, n) => {
        const c = W + y * n + (y - p) / 2, R = u[n] ?? 0;
        let x = 0;
        return /* @__PURE__ */ h("g", { children: [
          r.map((v, N) => {
            const X = v.data[n] || 0;
            if (!X) return null;
            const j = w(x), k = w(x + X);
            x += X;
            const J = !r.slice(N + 1).some((K) => K.data[n]), P = x < R ? 2 : 0, F = Math.max(1, j - k - P);
            return J && F > 4 ? /* @__PURE__ */ a("path", { fill: v.color, d: `M${c} ${j}V${k + 4}Q${c} ${k} ${c + 4} ${k}H${c + p - 4}Q${c + p} ${k} ${c + p} ${k + 4}V${j}Z` }, v.name) : /* @__PURE__ */ a("rect", { fill: v.color, x: c, y: k + P, width: p, height: F }, v.name);
          }),
          n % 2 === (L - 1) % 2 && /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: c + p / 2, y: m - 6, textAnchor: "middle", children: z(t) }),
          /* @__PURE__ */ a("rect", { x: W + y * n, y: 0, width: y, height: m, fill: "transparent", onMouseMove: () => B(n), onTouchStart: () => B(n), onMouseLeave: () => f(null) })
        ] }, t);
      })
    ] }) })
  ] });
}
function at({ items: e }) {
  return /* @__PURE__ */ a("div", { className: "vs-chart-legend", children: e.map((r) => /* @__PURE__ */ h("span", { children: [
    /* @__PURE__ */ a("i", { style: { background: r.color } }),
    r.name,
    r.extra ? /* @__PURE__ */ h(S, { children: [
      " ",
      /* @__PURE__ */ a("em", { children: r.extra })
    ] }) : null
  ] }, r.name)) });
}
function dt({ title: e, sub: r, legend: s, extra: o, className: l, children: i }) {
  return /* @__PURE__ */ h("div", { className: U("vs-chart-card", l), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-title", children: e }),
    r != null && /* @__PURE__ */ a("div", { className: "vs-chart-sub", children: r }),
    o,
    s && /* @__PURE__ */ a(at, { items: s }),
    i
  ] });
}
const ut = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
export {
  dt as ChartCard,
  at as Legend,
  ot as LineChart,
  ht as StackedBars,
  ut as chartPalette,
  tt as dayTicks,
  V as fmtStamp,
  et as linePath,
  Z as niceMax,
  it as outageBands
};
