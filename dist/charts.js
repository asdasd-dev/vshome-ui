import { jsxs as x, Fragment as U, jsx as n } from "react/jsx-runtime";
import { useRef as _, useState as G, useLayoutEffect as it } from "react";
import { c as J } from "./cx.js";
const ut = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], Q = (t) => String(t).padStart(2, "0");
function et(t) {
  if (!(t > 0)) return 4;
  const c = t / 4, o = 10 ** Math.floor(Math.log10(c)), i = c / o;
  for (const s of ut) if (i <= s + 1e-9) return s * o * 4;
  return 40 * o;
}
function mt(t, c, o, i) {
  const s = [];
  for (let h = 0; h < o; h++) {
    const y = new Date((t + h * c) * 1e3);
    y.getHours() === 0 && y.getMinutes() === 0 && s.push(h);
  }
  return i ? s.filter((h, y) => y % i === 0) : s;
}
function Lt(t) {
  const c = [];
  let o = null;
  return t.forEach((i, s) => {
    i != null && i < 1 ? o == null && (o = s) : o != null && (c.push([o, s - 1]), o = null);
  }), o != null && c.push([o, t.length - 1]), c;
}
function xt(t, c, o, i) {
  let s = "", h = !1;
  return t.forEach((y, N) => {
    if (y == null) {
      i || (h = !1);
      return;
    }
    s += `${h ? "L" : "M"}${c(N).toFixed(1)} ${o(y).toFixed(1)}`, h = !0;
  }), s;
}
function ot(t) {
  const c = new Date(t * 1e3);
  return `${Q(c.getDate())}.${Q(c.getMonth() + 1)} ${Q(c.getHours())}:${Q(c.getMinutes())}`;
}
const v = 170, nt = { L: 40, R: 12, T: 10, B: 22 };
function at() {
  const t = _(null), [c, o] = G(0);
  return it(() => {
    const i = t.current;
    if (!i) return;
    const s = new ResizeObserver(([h]) => {
      h && o(Math.round(h.contentRect.width));
    });
    return s.observe(i), () => s.disconnect();
  }, []), [t, c];
}
function rt(t) {
  const c = _(null);
  return it(() => {
    const o = c.current;
    !o || !t || (o.style.left = `${Math.min(t.boxW - o.offsetWidth, Math.max(0, t.px + t.gap))}px`);
  }), c;
}
function ht(t, c) {
  const o = c.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - o.left, boxW: o.width };
}
const { L: j, R: Z, T: P, B: O } = nt;
function kt(t) {
  const [c, o] = at(), i = _(null), [s, h] = G(null), y = rt(s), N = Math.max(280, o), T = Math.max(0, ...t.series.map((e) => e.data.length)), B = Math.max(0, ...t.series.flatMap((e) => e.data.filter((r) => r != null))), w = t.yMax || et(B * 1.05), M = (e) => j + (N - j - Z) * e / Math.max(1, T - 1), $ = (e) => P + (v - P - O) * (1 - Math.min(e, w) / w), L = mt(t.t0, t.step, T, t.xEvery), D = (e) => t.series.some((r) => r.data[e] != null);
  function F(e) {
    const r = i.current;
    if (!r) return;
    const { px: d, boxW: m } = ht(e, r);
    let u = Math.round((d * N / m - j) / (N - j - Z) * (T - 1));
    if (!(u >= 0 && u < T)) return h(null);
    if (t.connect) {
      let f = -1;
      for (let W = 0; W < T; W++) D(W) && (f < 0 || Math.abs(W - u) < Math.abs(f - u)) && (f = W);
      if (f < 0) return h(null);
      u = f;
    }
    h({ i: u, px: d, boxW: m, gap: 12 });
  }
  let p = null;
  if (s) {
    const e = s.i;
    p = /* @__PURE__ */ x(U, { children: [
      /* @__PURE__ */ n("b", { children: ot(t.t0 + e * t.step) }),
      t.series.map((r) => {
        const d = r.data[e];
        return /* @__PURE__ */ x("span", { children: [
          /* @__PURE__ */ n("br", {}),
          /* @__PURE__ */ n("i", { style: { background: r.color } }),
          r.name,
          ": ",
          d == null ? "—" : r.fmt ? r.fmt(d) : d
        ] }, r.name);
      }),
      t.bands?.some(([r, d]) => e >= r && e <= d) && /* @__PURE__ */ x(U, { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ n("span", { className: "vs-chart-tip-band", children: t.bandLabel ?? "нет данных" })
      ] }),
      t.note?.(e) ? /* @__PURE__ */ x(U, { children: [
        /* @__PURE__ */ n("br", {}),
        t.note(e)
      ] }) : null,
      (t.marks ?? []).filter((r) => Math.abs(r.i - e) <= 1).map((r, d) => /* @__PURE__ */ x("span", { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ x("span", { className: r.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          r.dashed ? "↻ " : "🚀 ",
          r.label
        ] })
      ] }, d))
    ] });
  }
  return /* @__PURE__ */ x("div", { className: J("vs-chart", t.className), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: y, hidden: !s, children: p }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: c, children: o > 0 && /* @__PURE__ */ x("svg", { ref: i, viewBox: `0 0 ${N} ${v}`, width: N, height: v, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, r], d) => /* @__PURE__ */ n("rect", { className: "vs-chart-band", x: M(e), y: P, width: Math.max(2, M(r) - M(e)), height: v - P - O }, d)),
      [0, 1, 2, 3, 4].map((e) => {
        const r = w * e / 4;
        return /* @__PURE__ */ x("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: j, x2: N - Z, y1: $(r), y2: $(r) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: j - 6, y: $(r) + 4, textAnchor: "end", children: Math.round(r) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      L.map((e) => /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: M(e), y: v - 6, textAnchor: "middle", children: ot(t.t0 + e * t.step).slice(0, 5) }, e)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < T).map((e, r) => /* @__PURE__ */ n("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: M(e.i), x2: M(e.i), y1: P, y2: v - O }, r)),
      t.series.map((e) => /* @__PURE__ */ x("g", { children: [
        t.connect && e.data.map((r, d) => r != null && /* @__PURE__ */ n("circle", { className: "vs-chart-dot", cx: M(d), cy: $(r), r: 3, fill: e.color, strokeWidth: 1.5 }, d)),
        /* @__PURE__ */ n("path", { d: xt(e.data, M, $, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((r, d) => r != null && (d === 0 || e.data[d - 1] == null) && (d === T - 1 || e.data[d + 1] == null) && /* @__PURE__ */ n("circle", { cx: M(d), cy: $(r), r: 2.5, fill: e.color }, `s${d}`))
      ] }, e.name)),
      s && /* @__PURE__ */ n("line", { className: "vs-chart-cross", x1: M(s.i), x2: M(s.i), y1: P, y2: v - O }),
      s && t.series.map((e) => {
        const r = e.data[s.i];
        return r != null && /* @__PURE__ */ n("circle", { className: "vs-chart-dot", r: 4, cx: M(s.i), cy: $(r), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ n("rect", { x: j, y: 0, width: N - j - Z, height: v, fill: "transparent", onMouseMove: F, onTouchStart: F, onTouchMove: F, onMouseLeave: () => h(null) })
    ] }) })
  ] });
}
const { L: I, R: st, T: lt, B: ft } = nt, vt = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function Rt({ labels: t, series: c, fmt: o, label: i, className: s, xFormat: h = vt }) {
  const [y, N] = at(), T = _(null), [B, w] = G(null), M = rt(B), $ = Math.max(280, N), L = t.length, D = t.map((m, u) => c.reduce((f, W) => f + (W.data[u] || 0), 0)), F = et(Math.max(0, ...D) * 1.05), p = (m) => lt + (v - lt - ft) * (1 - m / F), e = ($ - I - st) / Math.max(1, L), r = Math.max(4, e - 6);
  function d(m) {
    const u = T.current;
    if (!u) return;
    const f = u.getBoundingClientRect();
    w({ i: m, px: (I + e * (m + 1)) * f.width / $, boxW: f.width, gap: 6 });
  }
  return /* @__PURE__ */ x("div", { className: J("vs-chart", s), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: M, hidden: !B, children: B && /* @__PURE__ */ x(U, { children: [
      /* @__PURE__ */ n("b", { children: h(t[B.i] ?? "") }),
      " — ",
      o(D[B.i] ?? 0),
      c.map((m) => /* @__PURE__ */ x("span", { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ n("i", { style: { background: m.color } }),
        m.name,
        ": ",
        o(m.data[B.i] || 0)
      ] }, m.name))
    ] }) }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: y, children: N > 0 && /* @__PURE__ */ x("svg", { ref: T, viewBox: `0 0 ${$} ${v}`, width: $, height: v, role: "img", "aria-label": i, children: [
      [0, 1, 2, 3, 4].map((m) => {
        const u = F * m / 4;
        return /* @__PURE__ */ x("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: I, x2: $ - st, y1: p(u), y2: p(u) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: I - 6, y: p(u) + 4, textAnchor: "end", children: o(u) })
        ] }, m);
      }),
      t.map((m, u) => {
        const f = I + e * u + (e - r) / 2, W = D[u] ?? 0;
        let S = 0;
        return /* @__PURE__ */ x("g", { children: [
          c.map((R, z) => {
            const k = R.data[u] || 0;
            if (!k) return null;
            const b = p(S), A = p(S + k);
            S += k;
            const K = !c.slice(z + 1).some((q) => q.data[u]), E = S < W ? 2 : 0, V = Math.max(1, b - A - E);
            return K && V > 4 ? /* @__PURE__ */ n("path", { fill: R.color, d: `M${f} ${b}V${A + 4}Q${f} ${A} ${f + 4} ${A}H${f + r - 4}Q${f + r} ${A} ${f + r} ${A + 4}V${b}Z` }, R.name) : /* @__PURE__ */ n("rect", { fill: R.color, x: f, y: A + E, width: r, height: V }, R.name);
          }),
          u % 2 === (L - 1) % 2 && /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: f + r / 2, y: v - 6, textAnchor: "middle", children: h(m) }),
          /* @__PURE__ */ n("rect", { x: I + e * u, y: 0, width: e, height: v, fill: "transparent", onMouseMove: () => d(u), onTouchStart: () => d(u), onMouseLeave: () => w(null) })
        ] }, m);
      })
    ] }) })
  ] });
}
const { L: C, R: X, T: Y, B: tt } = nt, pt = (t) => {
  const c = 10 ** Math.floor(Math.log10(t)), o = t / c;
  return (o <= 1 ? 1 : o <= 2 ? 2 : o <= 2.5 ? 2.5 : o <= 5 ? 5 : 10) * c;
}, gt = (t, c) => {
  const o = [...t].sort((s, h) => h.y - s.y);
  let i = -1 / 0;
  return o.map((s) => {
    const h = c(s.y), y = h - i < 14;
    return i = y ? h + 16 : h, { r: s, below: y };
  });
}, Mt = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }), yt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });
function Tt({ series: t, refLines: c = [], yFrom: o = "zero", now: i, unit: s, xFormat: h = (w) => Mt.format(w * 1e3), tipFormat: y = (w) => yt.format(w * 1e3), yFormat: N = (w) => String(Math.round(w)), label: T, className: B }) {
  const [w, M] = at(), $ = _(null), [L, D] = G(null), F = rt(L), p = Math.max(280, M), e = t.flatMap((a) => a.points), r = e.map((a) => a[0]).concat(i != null ? [i] : []), d = e.map((a) => a[1]).concat(c.map((a) => a.y)), m = Math.min(...r), u = Math.max(...r), f = Math.max(0, ...d), W = o === "data" && d.length ? Math.max(0, Math.min(...d)) : 0, S = pt((f - W || f || 1) / 4), R = o === "data" ? Math.floor(W / S) * S : 0, z = o === "data" ? Math.max(R + S * 4, Math.ceil(f / S) * S) : et(f * 1.05), k = (a) => C + (p - C - X) * (a - m) / Math.max(1, u - m), b = (a) => Y + (v - Y - tt) * (1 - (a - R) / Math.max(1e-9, z - R)), A = [0, 1, 2, 3].map((a) => m + (u - m) * a / 3), K = (a) => e.reduce((l, g) => Math.abs(g[0] - a) < Math.abs(l - a) ? g[0] : l, e[0]?.[0] ?? a);
  function E(a) {
    const l = $.current;
    if (!l || !e.length) return;
    const { px: g, boxW: H } = ht(a, l), dt = m + (g * p / H - C) / (p - C - X) * (u - m);
    D({ t: K(dt), px: g, boxW: H, gap: 12 });
  }
  let V = null;
  L && (V = /* @__PURE__ */ x(U, { children: [
    /* @__PURE__ */ n("b", { children: y(L.t) }),
    t.map((a) => {
      const l = a.points.reduce((g, H) => !g || Math.abs(H[0] - L.t) < Math.abs(g[0] - L.t) ? H : g, void 0);
      return l ? /* @__PURE__ */ x("span", { children: [
        /* @__PURE__ */ n("br", {}),
        /* @__PURE__ */ n("i", { style: { background: a.color } }),
        a.name,
        ": ",
        a.fmt ? a.fmt(l[1]) : l[1]
      ] }, a.name) : null;
    })
  ] }));
  const q = (i != null ? Math.min(k(i), p - X) : p - X) - 8, ct = (a) => a.map((l, g) => `${g ? "L" : "M"}${k(l[0]).toFixed(1)},${b(l[1]).toFixed(1)}`).join("");
  return /* @__PURE__ */ x("div", { className: J("vs-chart", B), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: F, hidden: !L, children: V }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: w, children: M > 0 && /* @__PURE__ */ x("svg", { ref: $, viewBox: `0 0 ${p} ${v}`, width: p, height: v, role: "img", "aria-label": T, children: [
      [0, 1, 2, 3, 4].map((a) => {
        const l = R + (z - R) * a / 4;
        return /* @__PURE__ */ x("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: C, x2: p - X, y1: b(l), y2: b(l) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: C - 6, y: b(l) + 4, textAnchor: "end", children: N(l) + (a === 4 ? s ?? "" : "") })
        ] }, a);
      }),
      A.map((a, l) => /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: k(a), y: v - 6, textAnchor: l === 0 ? "start" : l === 3 ? "end" : "middle", children: h(a) }, l)),
      gt(c, b).map(({ r: a, below: l }, g) => /* @__PURE__ */ x("g", { children: [
        /* @__PURE__ */ n("line", { x1: C, x2: p - X, y1: b(a.y), y2: b(a.y), stroke: a.color ?? "var(--vs-muted)", strokeWidth: 1, strokeDasharray: a.dashed === !1 ? void 0 : "4 3" }),
        /* @__PURE__ */ n("text", { className: "vs-chart-axis vs-chart-ref", x: q, y: b(a.y) + (l ? 12 : -4), textAnchor: "end", children: a.label })
      ] }, `r${g}`)),
      i != null && /* @__PURE__ */ n("line", { className: "vs-chart-restart", x1: k(i), x2: k(i), y1: Y, y2: v - tt }),
      t.map((a) => {
        const l = [...a.points].sort((g, H) => g[0] - H[0]);
        return /* @__PURE__ */ x("g", { children: [
          a.area && l.length > 1 && /* @__PURE__ */ n("path", { d: `${ct(l)}L${k(l[l.length - 1][0]).toFixed(1)},${b(R)}L${k(l[0][0]).toFixed(1)},${b(R)}Z`, fill: a.color, opacity: 0.12 }),
          (a.line ?? !a.dots) && /* @__PURE__ */ n("path", { d: ct(l), fill: "none", stroke: a.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
          (a.dots || l.length === 1) && l.map((g, H) => /* @__PURE__ */ n("circle", { cx: k(g[0]), cy: b(g[1]), r: 3, fill: a.color }, H))
        ] }, a.name);
      }),
      L && /* @__PURE__ */ n("line", { className: "vs-chart-cross", x1: k(L.t), x2: k(L.t), y1: Y, y2: v - tt }),
      /* @__PURE__ */ n("rect", { x: C, y: 0, width: p - C - X, height: v, fill: "transparent", onMouseMove: E, onTouchStart: E, onTouchMove: E, onMouseLeave: () => D(null) })
    ] }) })
  ] });
}
function $t({ items: t }) {
  return /* @__PURE__ */ n("div", { className: "vs-chart-legend", children: t.map((c) => /* @__PURE__ */ x("span", { children: [
    /* @__PURE__ */ n("i", { style: { background: c.color } }),
    c.name,
    c.extra ? /* @__PURE__ */ x(U, { children: [
      " ",
      /* @__PURE__ */ n("em", { children: c.extra })
    ] }) : null
  ] }, c.name)) });
}
function Wt({ title: t, sub: c, legend: o, extra: i, className: s, children: h }) {
  return /* @__PURE__ */ x("div", { className: J("vs-chart-card", s), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-title", children: t }),
    c != null && /* @__PURE__ */ n("div", { className: "vs-chart-sub", children: c }),
    i,
    o && /* @__PURE__ */ n($t, { items: o }),
    h
  ] });
}
const Bt = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
export {
  Wt as ChartCard,
  $t as ChartLegend,
  kt as LineChart,
  Rt as StackedBars,
  Tt as TimeChart,
  Bt as chartPalette,
  mt as dayTicks,
  ot as fmtStamp,
  xt as linePath,
  et as niceMax,
  Lt as outageBands
};
