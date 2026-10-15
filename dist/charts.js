import { jsxs as u, Fragment as B, jsx as c } from "react/jsx-runtime";
import { useRef as X, useState as P, useLayoutEffect as q } from "react";
import { c as F } from "./cx.js";
const et = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], H = (t) => String(t).padStart(2, "0");
function G(t) {
  if (!(t > 0)) return 4;
  const r = t / 4, s = 10 ** Math.floor(Math.log10(r)), h = r / s;
  for (const l of et) if (h <= l + 1e-9) return l * s * 4;
  return 40 * s;
}
function nt(t, r, s, h) {
  const l = [];
  for (let i = 0; i < s; i++) {
    const v = new Date((t + i * r) * 1e3);
    v.getHours() === 0 && v.getMinutes() === 0 && l.push(i);
  }
  return h ? l.filter((i, v) => v % h === 0) : l;
}
function ht(t) {
  const r = [];
  let s = null;
  return t.forEach((h, l) => {
    h != null && h < 1 ? s == null && (s = l) : s != null && (r.push([s, l - 1]), s = null);
  }), s != null && r.push([s, t.length - 1]), r;
}
function at(t, r, s, h) {
  let l = "", i = !1;
  return t.forEach((v, g) => {
    if (v == null) {
      h || (i = !1);
      return;
    }
    l += `${i ? "L" : "M"}${r(g).toFixed(1)} ${s(v).toFixed(1)}`, i = !0;
  }), l;
}
function Q(t) {
  const r = new Date(t * 1e3);
  return `${H(r.getDate())}.${H(r.getMonth() + 1)} ${H(r.getHours())}:${H(r.getMinutes())}`;
}
const x = 170, I = { L: 40, R: 12, T: 10, B: 22 };
function J() {
  const t = X(null), [r, s] = P(0);
  return q(() => {
    const h = t.current;
    if (!h) return;
    const l = new ResizeObserver(([i]) => {
      i && s(Math.round(i.contentRect.width));
    });
    return l.observe(h), () => l.disconnect();
  }, []), [t, r];
}
function K(t) {
  const r = X(null);
  return q(() => {
    const s = r.current;
    !s || !t || (s.style.left = `${Math.min(t.boxW - s.offsetWidth, Math.max(0, t.px + t.gap))}px`);
  }), r;
}
function rt(t, r) {
  const s = r.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - s.left, boxW: s.width };
}
const { L: N, R: A, T: k, B: E } = I;
function dt(t) {
  const [r, s] = J(), h = X(null), [l, i] = P(null), v = K(l), g = Math.max(280, s), f = Math.max(0, ...t.series.map((e) => e.data.length)), S = Math.max(0, ...t.series.flatMap((e) => e.data.filter((n) => n != null))), R = t.yMax || G(S * 1.05), m = (e) => N + (g - N - A) * e / Math.max(1, f - 1), p = (e) => k + (x - k - E) * (1 - Math.min(e, R) / R), T = nt(t.t0, t.step, f, t.xEvery), C = (e) => t.series.some((n) => n.data[e] != null);
  function y(e) {
    const n = h.current;
    if (!n) return;
    const { px: a, boxW: o } = rt(e, n);
    let d = Math.round((a * g / o - N) / (g - N - A) * (f - 1));
    if (!(d >= 0 && d < f)) return i(null);
    if (t.connect) {
      let b = -1;
      for (let M = 0; M < f; M++) C(M) && (b < 0 || Math.abs(M - d) < Math.abs(b - d)) && (b = M);
      if (b < 0) return i(null);
      d = b;
    }
    i({ i: d, px: a, boxW: o, gap: 12 });
  }
  let $ = null;
  if (l) {
    const e = l.i;
    $ = /* @__PURE__ */ u(B, { children: [
      /* @__PURE__ */ c("b", { children: Q(t.t0 + e * t.step) }),
      t.series.map((n) => {
        const a = n.data[e];
        return /* @__PURE__ */ u("span", { children: [
          /* @__PURE__ */ c("br", {}),
          /* @__PURE__ */ c("i", { style: { background: n.color } }),
          n.name,
          ": ",
          a == null ? "—" : n.fmt ? n.fmt(a) : a
        ] }, n.name);
      }),
      t.bands?.some(([n, a]) => e >= n && e <= a) && /* @__PURE__ */ u(B, { children: [
        /* @__PURE__ */ c("br", {}),
        /* @__PURE__ */ c("span", { className: "vs-chart-tip-band", children: t.bandLabel ?? "нет данных" })
      ] }),
      t.note?.(e) ? /* @__PURE__ */ u(B, { children: [
        /* @__PURE__ */ c("br", {}),
        t.note(e)
      ] }) : null,
      (t.marks ?? []).filter((n) => Math.abs(n.i - e) <= 1).map((n, a) => /* @__PURE__ */ u("span", { children: [
        /* @__PURE__ */ c("br", {}),
        /* @__PURE__ */ u("span", { className: n.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          n.dashed ? "↻ " : "🚀 ",
          n.label
        ] })
      ] }, a))
    ] });
  }
  return /* @__PURE__ */ u("div", { className: F("vs-chart", t.className), children: [
    /* @__PURE__ */ c("div", { className: "vs-chart-tip", ref: v, hidden: !l, children: $ }),
    /* @__PURE__ */ c("div", { className: "vs-chart-view", ref: r, children: s > 0 && /* @__PURE__ */ u("svg", { ref: h, viewBox: `0 0 ${g} ${x}`, width: g, height: x, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, n], a) => /* @__PURE__ */ c("rect", { className: "vs-chart-band", x: m(e), y: k, width: Math.max(2, m(n) - m(e)), height: x - k - E }, a)),
      [0, 1, 2, 3, 4].map((e) => {
        const n = R * e / 4;
        return /* @__PURE__ */ u("g", { children: [
          /* @__PURE__ */ c("line", { className: "vs-chart-grid", x1: N, x2: g - A, y1: p(n), y2: p(n) }),
          /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: N - 6, y: p(n) + 4, textAnchor: "end", children: Math.round(n) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      T.map((e) => /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: m(e), y: x - 6, textAnchor: "middle", children: Q(t.t0 + e * t.step).slice(0, 5) }, e)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < f).map((e, n) => /* @__PURE__ */ c("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: m(e.i), x2: m(e.i), y1: k, y2: x - E }, n)),
      t.series.map((e) => /* @__PURE__ */ u("g", { children: [
        t.connect && e.data.map((n, a) => n != null && /* @__PURE__ */ c("circle", { className: "vs-chart-dot", cx: m(a), cy: p(n), r: 3, fill: e.color, strokeWidth: 1.5 }, a)),
        /* @__PURE__ */ c("path", { d: at(e.data, m, p, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((n, a) => n != null && (a === 0 || e.data[a - 1] == null) && (a === f - 1 || e.data[a + 1] == null) && /* @__PURE__ */ c("circle", { cx: m(a), cy: p(n), r: 2.5, fill: e.color }, `s${a}`))
      ] }, e.name)),
      l && /* @__PURE__ */ c("line", { className: "vs-chart-cross", x1: m(l.i), x2: m(l.i), y1: k, y2: x - E }),
      l && t.series.map((e) => {
        const n = e.data[l.i];
        return n != null && /* @__PURE__ */ c("circle", { className: "vs-chart-dot", r: 4, cx: m(l.i), cy: p(n), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ c("rect", { x: N, y: 0, width: g - N - A, height: x, fill: "transparent", onMouseMove: y, onTouchStart: y, onTouchMove: y, onMouseLeave: () => i(null) })
    ] }) })
  ] });
}
const { L, R: z, T: O, B: ct } = I, Z = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function ut({ labels: t, series: r, fmt: s, label: h, className: l }) {
  const [i, v] = J(), g = X(null), [f, S] = P(null), R = K(f), m = Math.max(280, v), p = t.length, T = t.map((a, o) => r.reduce((d, b) => d + (b.data[o] || 0), 0)), C = G(Math.max(0, ...T) * 1.05), y = (a) => O + (x - O - ct) * (1 - a / C), $ = (m - L - z) / Math.max(1, p), e = Math.max(4, $ - 6);
  function n(a) {
    const o = g.current;
    if (!o) return;
    const d = o.getBoundingClientRect();
    S({ i: a, px: (L + $ * (a + 1)) * d.width / m, boxW: d.width, gap: 6 });
  }
  return /* @__PURE__ */ u("div", { className: F("vs-chart", l), children: [
    /* @__PURE__ */ c("div", { className: "vs-chart-tip", ref: R, hidden: !f, children: f && /* @__PURE__ */ u(B, { children: [
      /* @__PURE__ */ c("b", { children: Z(t[f.i] ?? "") }),
      " — ",
      s(T[f.i] ?? 0),
      r.map((a) => /* @__PURE__ */ u("span", { children: [
        /* @__PURE__ */ c("br", {}),
        /* @__PURE__ */ c("i", { style: { background: a.color } }),
        a.name,
        ": ",
        s(a.data[f.i] || 0)
      ] }, a.name))
    ] }) }),
    /* @__PURE__ */ c("div", { className: "vs-chart-view", ref: i, children: v > 0 && /* @__PURE__ */ u("svg", { ref: g, viewBox: `0 0 ${m} ${x}`, width: m, height: x, role: "img", "aria-label": h, children: [
      [0, 1, 2, 3, 4].map((a) => {
        const o = C * a / 4;
        return /* @__PURE__ */ u("g", { children: [
          /* @__PURE__ */ c("line", { className: "vs-chart-grid", x1: L, x2: m - z, y1: y(o), y2: y(o) }),
          /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: L - 6, y: y(o) + 4, textAnchor: "end", children: s(o) })
        ] }, a);
      }),
      t.map((a, o) => {
        const d = L + $ * o + ($ - e) / 2, b = T[o] ?? 0;
        let M = 0;
        return /* @__PURE__ */ u("g", { children: [
          r.map((W, U) => {
            const j = W.data[o] || 0;
            if (!j) return null;
            const D = y(M), w = y(M + j);
            M += j;
            const Y = !r.slice(U + 1).some((tt) => tt.data[o]), V = M < b ? 2 : 0, _ = Math.max(1, D - w - V);
            return Y && _ > 4 ? /* @__PURE__ */ c("path", { fill: W.color, d: `M${d} ${D}V${w + 4}Q${d} ${w} ${d + 4} ${w}H${d + e - 4}Q${d + e} ${w} ${d + e} ${w + 4}V${D}Z` }, W.name) : /* @__PURE__ */ c("rect", { fill: W.color, x: d, y: w + V, width: e, height: _ }, W.name);
          }),
          o % 2 === (p - 1) % 2 && /* @__PURE__ */ c("text", { className: "vs-chart-axis", x: d + e / 2, y: x - 6, textAnchor: "middle", children: Z(a) }),
          /* @__PURE__ */ c("rect", { x: L + $ * o, y: 0, width: $, height: x, fill: "transparent", onMouseMove: () => n(o), onTouchStart: () => n(o), onMouseLeave: () => S(null) })
        ] }, a);
      })
    ] }) })
  ] });
}
function st({ items: t }) {
  return /* @__PURE__ */ c("div", { className: "vs-chart-legend", children: t.map((r) => /* @__PURE__ */ u("span", { children: [
    /* @__PURE__ */ c("i", { style: { background: r.color } }),
    r.name,
    r.extra ? /* @__PURE__ */ u(B, { children: [
      " ",
      /* @__PURE__ */ c("em", { children: r.extra })
    ] }) : null
  ] }, r.name)) });
}
function mt({ title: t, sub: r, legend: s, extra: h, className: l, children: i }) {
  return /* @__PURE__ */ u("div", { className: F("vs-chart-card", l), children: [
    /* @__PURE__ */ c("div", { className: "vs-chart-title", children: t }),
    r != null && /* @__PURE__ */ c("div", { className: "vs-chart-sub", children: r }),
    h,
    s && /* @__PURE__ */ c(st, { items: s }),
    i
  ] });
}
const ft = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
export {
  mt as ChartCard,
  st as ChartLegend,
  dt as LineChart,
  ut as StackedBars,
  ft as chartPalette,
  nt as dayTicks,
  Q as fmtStamp,
  at as linePath,
  G as niceMax,
  ht as outageBands
};
