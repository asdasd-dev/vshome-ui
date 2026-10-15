import { jsxs as m, Fragment as P, jsx as a } from "react/jsx-runtime";
import { useRef as V, useState as O, useLayoutEffect as ct } from "react";
import { c as Y } from "./cx.js";
const lt = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], z = (t) => String(t).padStart(2, "0");
function K(t) {
  if (!(t > 0)) return 4;
  const c = t / 4, o = 10 ** Math.floor(Math.log10(c)), d = c / o;
  for (const l of lt) if (d <= l + 1e-9) return l * o * 4;
  return 40 * o;
}
function it(t, c, o, d) {
  const l = [];
  for (let x = 0; x < o; x++) {
    const R = new Date((t + x * c) * 1e3);
    R.getHours() === 0 && R.getMinutes() === 0 && l.push(x);
  }
  return d ? l.filter((x, R) => R % d === 0) : l;
}
function yt(t) {
  const c = [];
  let o = null;
  return t.forEach((d, l) => {
    d != null && d < 1 ? o == null && (o = l) : o != null && (c.push([o, l - 1]), o = null);
  }), o != null && c.push([o, t.length - 1]), c;
}
function ht(t, c, o, d) {
  let l = "", x = !1;
  return t.forEach((R, N) => {
    if (R == null) {
      d || (x = !1);
      return;
    }
    l += `${x ? "L" : "M"}${c(N).toFixed(1)} ${o(R).toFixed(1)}`, x = !0;
  }), l;
}
function nt(t) {
  const c = new Date(t * 1e3);
  return `${z(c.getDate())}.${z(c.getMonth() + 1)} ${z(c.getHours())}:${z(c.getMinutes())}`;
}
const v = 170, q = { L: 40, R: 12, T: 10, B: 22 };
function tt() {
  const t = V(null), [c, o] = O(0);
  return ct(() => {
    const d = t.current;
    if (!d) return;
    const l = new ResizeObserver(([x]) => {
      x && o(Math.round(x.contentRect.width));
    });
    return l.observe(d), () => l.disconnect();
  }, []), [t, c];
}
function et(t) {
  const c = V(null);
  return ct(() => {
    const o = c.current;
    !o || !t || (o.style.left = `${Math.min(t.boxW - o.offsetWidth, Math.max(0, t.px + t.gap))}px`);
  }), c;
}
function ot(t, c) {
  const o = c.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - o.left, boxW: o.width };
}
const { L: D, R: I, T: j, B: Q } = q;
function Mt(t) {
  const [c, o] = tt(), d = V(null), [l, x] = O(null), R = et(l), N = Math.max(280, o), T = Math.max(0, ...t.series.map((e) => e.data.length)), W = Math.max(0, ...t.series.flatMap((e) => e.data.filter((r) => r != null))), w = t.yMax || K(W * 1.05), y = (e) => D + (N - D - I) * e / Math.max(1, T - 1), M = (e) => j + (v - j - Q) * (1 - Math.min(e, w) / w), L = it(t.t0, t.step, T, t.xEvery), F = (e) => t.series.some((r) => r.data[e] != null);
  function C(e) {
    const r = d.current;
    if (!r) return;
    const { px: i, boxW: u } = ot(e, r);
    let h = Math.round((i * N / u - D) / (N - D - I) * (T - 1));
    if (!(h >= 0 && h < T)) return x(null);
    if (t.connect) {
      let f = -1;
      for (let $ = 0; $ < T; $++) F($) && (f < 0 || Math.abs($ - h) < Math.abs(f - h)) && (f = $);
      if (f < 0) return x(null);
      h = f;
    }
    x({ i: h, px: i, boxW: u, gap: 12 });
  }
  let p = null;
  if (l) {
    const e = l.i;
    p = /* @__PURE__ */ m(P, { children: [
      /* @__PURE__ */ a("b", { children: nt(t.t0 + e * t.step) }),
      t.series.map((r) => {
        const i = r.data[e];
        return /* @__PURE__ */ m("span", { children: [
          /* @__PURE__ */ a("br", {}),
          /* @__PURE__ */ a("i", { style: { background: r.color } }),
          r.name,
          ": ",
          i == null ? "—" : r.fmt ? r.fmt(i) : i
        ] }, r.name);
      }),
      t.bands?.some(([r, i]) => e >= r && e <= i) && /* @__PURE__ */ m(P, { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("span", { className: "vs-chart-tip-band", children: t.bandLabel ?? "нет данных" })
      ] }),
      t.note?.(e) ? /* @__PURE__ */ m(P, { children: [
        /* @__PURE__ */ a("br", {}),
        t.note(e)
      ] }) : null,
      (t.marks ?? []).filter((r) => Math.abs(r.i - e) <= 1).map((r, i) => /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ m("span", { className: r.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          r.dashed ? "↻ " : "🚀 ",
          r.label
        ] })
      ] }, i))
    ] });
  }
  return /* @__PURE__ */ m("div", { className: Y("vs-chart", t.className), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: R, hidden: !l, children: p }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: c, children: o > 0 && /* @__PURE__ */ m("svg", { ref: d, viewBox: `0 0 ${N} ${v}`, width: N, height: v, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, r], i) => /* @__PURE__ */ a("rect", { className: "vs-chart-band", x: y(e), y: j, width: Math.max(2, y(r) - y(e)), height: v - j - Q }, i)),
      [0, 1, 2, 3, 4].map((e) => {
        const r = w * e / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: D, x2: N - I, y1: M(r), y2: M(r) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: D - 6, y: M(r) + 4, textAnchor: "end", children: Math.round(r) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      L.map((e) => /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: y(e), y: v - 6, textAnchor: "middle", children: nt(t.t0 + e * t.step).slice(0, 5) }, e)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < T).map((e, r) => /* @__PURE__ */ a("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: y(e.i), x2: y(e.i), y1: j, y2: v - Q }, r)),
      t.series.map((e) => /* @__PURE__ */ m("g", { children: [
        t.connect && e.data.map((r, i) => r != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", cx: y(i), cy: M(r), r: 3, fill: e.color, strokeWidth: 1.5 }, i)),
        /* @__PURE__ */ a("path", { d: ht(e.data, y, M, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((r, i) => r != null && (i === 0 || e.data[i - 1] == null) && (i === T - 1 || e.data[i + 1] == null) && /* @__PURE__ */ a("circle", { cx: y(i), cy: M(r), r: 2.5, fill: e.color }, `s${i}`))
      ] }, e.name)),
      l && /* @__PURE__ */ a("line", { className: "vs-chart-cross", x1: y(l.i), x2: y(l.i), y1: j, y2: v - Q }),
      l && t.series.map((e) => {
        const r = e.data[l.i];
        return r != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", r: 4, cx: y(l.i), cy: M(r), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ a("rect", { x: D, y: 0, width: N - D - I, height: v, fill: "transparent", onMouseMove: C, onTouchStart: C, onTouchMove: C, onMouseLeave: () => x(null) })
    ] }) })
  ] });
}
const { L: E, R: at, T: rt, B: dt } = q, ut = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function $t({ labels: t, series: c, fmt: o, label: d, className: l, xFormat: x = ut }) {
  const [R, N] = tt(), T = V(null), [W, w] = O(null), y = et(W), M = Math.max(280, N), L = t.length, F = t.map((u, h) => c.reduce((f, $) => f + ($.data[h] || 0), 0)), C = K(Math.max(0, ...F) * 1.05), p = (u) => rt + (v - rt - dt) * (1 - u / C), e = (M - E - at) / Math.max(1, L), r = Math.max(4, e - 6);
  function i(u) {
    const h = T.current;
    if (!h) return;
    const f = h.getBoundingClientRect();
    w({ i: u, px: (E + e * (u + 1)) * f.width / M, boxW: f.width, gap: 6 });
  }
  return /* @__PURE__ */ m("div", { className: Y("vs-chart", l), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: y, hidden: !W, children: W && /* @__PURE__ */ m(P, { children: [
      /* @__PURE__ */ a("b", { children: x(t[W.i] ?? "") }),
      " — ",
      o(F[W.i] ?? 0),
      c.map((u) => /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("i", { style: { background: u.color } }),
        u.name,
        ": ",
        o(u.data[W.i] || 0)
      ] }, u.name))
    ] }) }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: R, children: N > 0 && /* @__PURE__ */ m("svg", { ref: T, viewBox: `0 0 ${M} ${v}`, width: M, height: v, role: "img", "aria-label": d, children: [
      [0, 1, 2, 3, 4].map((u) => {
        const h = C * u / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: E, x2: M - at, y1: p(h), y2: p(h) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: E - 6, y: p(h) + 4, textAnchor: "end", children: o(h) })
        ] }, u);
      }),
      t.map((u, h) => {
        const f = E + e * h + (e - r) / 2, $ = F[h] ?? 0;
        let k = 0;
        return /* @__PURE__ */ m("g", { children: [
          c.map((b, G) => {
            const U = b.data[h] || 0;
            if (!U) return null;
            const H = p(k), B = p(k + U);
            k += U;
            const _ = !c.slice(G + 1).some((g) => g.data[h]), n = k < $ ? 2 : 0, s = Math.max(1, H - B - n);
            return _ && s > 4 ? /* @__PURE__ */ a("path", { fill: b.color, d: `M${f} ${H}V${B + 4}Q${f} ${B} ${f + 4} ${B}H${f + r - 4}Q${f + r} ${B} ${f + r} ${B + 4}V${H}Z` }, b.name) : /* @__PURE__ */ a("rect", { fill: b.color, x: f, y: B + n, width: r, height: s }, b.name);
          }),
          h % 2 === (L - 1) % 2 && /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: f + r / 2, y: v - 6, textAnchor: "middle", children: x(u) }),
          /* @__PURE__ */ a("rect", { x: E + e * h, y: 0, width: e, height: v, fill: "transparent", onMouseMove: () => i(h), onTouchStart: () => i(h), onMouseLeave: () => w(null) })
        ] }, u);
      })
    ] }) })
  ] });
}
const { L: A, R: X, T: Z, B: J } = q, mt = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }), xt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });
function bt({ series: t, refLines: c = [], yFrom: o = "zero", now: d, unit: l, xFormat: x = (w) => mt.format(w * 1e3), tipFormat: R = (w) => xt.format(w * 1e3), yFormat: N = (w) => String(Math.round(w)), label: T, className: W }) {
  const [w, y] = tt(), M = V(null), [L, F] = O(null), C = et(L), p = Math.max(280, y), e = t.flatMap((n) => n.points), r = e.map((n) => n[0]).concat(d != null ? [d] : []), i = e.map((n) => n[1]).concat(c.map((n) => n.y)), u = Math.min(...r), h = Math.max(...r), f = K(Math.max(0, ...i) * 1.05), $ = o === "data" && i.length ? Math.max(0, Math.min(...i) * 0.9) : 0, k = (n) => A + (p - A - X) * (n - u) / Math.max(1, h - u), b = (n) => Z + (v - Z - J) * (1 - (n - $) / Math.max(1e-9, f - $)), G = [0, 1, 2, 3].map((n) => u + (h - u) * n / 3), U = (n) => e.reduce((s, g) => Math.abs(g[0] - n) < Math.abs(s - n) ? g[0] : s, e[0]?.[0] ?? n);
  function H(n) {
    const s = M.current;
    if (!s || !e.length) return;
    const { px: g, boxW: S } = ot(n, s), st = u + (g * p / S - A) / (p - A - X) * (h - u);
    F({ t: U(st), px: g, boxW: S, gap: 12 });
  }
  let B = null;
  L && (B = /* @__PURE__ */ m(P, { children: [
    /* @__PURE__ */ a("b", { children: R(L.t) }),
    t.map((n) => {
      const s = n.points.reduce((g, S) => !g || Math.abs(S[0] - L.t) < Math.abs(g[0] - L.t) ? S : g, void 0);
      return s ? /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("i", { style: { background: n.color } }),
        n.name,
        ": ",
        n.fmt ? n.fmt(s[1]) : s[1]
      ] }, n.name) : null;
    })
  ] }));
  const _ = (n) => n.map((s, g) => `${g ? "L" : "M"}${k(s[0]).toFixed(1)},${b(s[1]).toFixed(1)}`).join("");
  return /* @__PURE__ */ m("div", { className: Y("vs-chart", W), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: C, hidden: !L, children: B }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: w, children: y > 0 && /* @__PURE__ */ m("svg", { ref: M, viewBox: `0 0 ${p} ${v}`, width: p, height: v, role: "img", "aria-label": T, children: [
      [0, 1, 2, 3, 4].map((n) => {
        const s = $ + (f - $) * n / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: A, x2: p - X, y1: b(s), y2: b(s) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: A - 6, y: b(s) + 4, textAnchor: "end", children: N(s) + (n === 4 ? l ?? "" : "") })
        ] }, n);
      }),
      G.map((n, s) => /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: k(n), y: v - 6, textAnchor: s === 0 ? "start" : s === 3 ? "end" : "middle", children: x(n) }, s)),
      c.map((n, s) => /* @__PURE__ */ m("g", { children: [
        /* @__PURE__ */ a("line", { x1: A, x2: p - X, y1: b(n.y), y2: b(n.y), stroke: n.color ?? "var(--vs-muted)", strokeWidth: 1, strokeDasharray: n.dashed === !1 ? void 0 : "4 3" }),
        /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: p - X, y: b(n.y) - 4, textAnchor: "end", children: n.label })
      ] }, `r${s}`)),
      d != null && /* @__PURE__ */ a("line", { className: "vs-chart-restart", x1: k(d), x2: k(d), y1: Z, y2: v - J }),
      t.map((n) => {
        const s = [...n.points].sort((g, S) => g[0] - S[0]);
        return /* @__PURE__ */ m("g", { children: [
          n.area && s.length > 1 && /* @__PURE__ */ a("path", { d: `${_(s)}L${k(s[s.length - 1][0]).toFixed(1)},${b($)}L${k(s[0][0]).toFixed(1)},${b($)}Z`, fill: n.color, opacity: 0.12 }),
          (n.line ?? !n.dots) && /* @__PURE__ */ a("path", { d: _(s), fill: "none", stroke: n.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
          (n.dots || s.length === 1) && s.map((g, S) => /* @__PURE__ */ a("circle", { cx: k(g[0]), cy: b(g[1]), r: 3, fill: n.color }, S))
        ] }, n.name);
      }),
      L && /* @__PURE__ */ a("line", { className: "vs-chart-cross", x1: k(L.t), x2: k(L.t), y1: Z, y2: v - J }),
      /* @__PURE__ */ a("rect", { x: A, y: 0, width: p - A - X, height: v, fill: "transparent", onMouseMove: H, onTouchStart: H, onTouchMove: H, onMouseLeave: () => F(null) })
    ] }) })
  ] });
}
function ft({ items: t }) {
  return /* @__PURE__ */ a("div", { className: "vs-chart-legend", children: t.map((c) => /* @__PURE__ */ m("span", { children: [
    /* @__PURE__ */ a("i", { style: { background: c.color } }),
    c.name,
    c.extra ? /* @__PURE__ */ m(P, { children: [
      " ",
      /* @__PURE__ */ a("em", { children: c.extra })
    ] }) : null
  ] }, c.name)) });
}
function Nt({ title: t, sub: c, legend: o, extra: d, className: l, children: x }) {
  return /* @__PURE__ */ m("div", { className: Y("vs-chart-card", l), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-title", children: t }),
    c != null && /* @__PURE__ */ a("div", { className: "vs-chart-sub", children: c }),
    d,
    o && /* @__PURE__ */ a(ft, { items: o }),
    x
  ] });
}
const wt = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
export {
  Nt as ChartCard,
  ft as ChartLegend,
  Mt as LineChart,
  $t as StackedBars,
  bt as TimeChart,
  wt as chartPalette,
  it as dayTicks,
  nt as fmtStamp,
  ht as linePath,
  K as niceMax,
  yt as outageBands
};
