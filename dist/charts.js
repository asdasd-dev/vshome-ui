import { jsxs as x, Fragment as U, jsx as n } from "react/jsx-runtime";
import { useRef as _, useState as J, useLayoutEffect as lt } from "react";
import { c as K } from "./cx.js";
const dt = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], Z = (t) => String(t).padStart(2, "0");
function et(t) {
  if (!(t > 0)) return 4;
  const c = t / 4, o = 10 ** Math.floor(Math.log10(c)), h = c / o;
  for (const s of dt) if (h <= s + 1e-9) return s * o * 4;
  return 40 * o;
}
function ut(t, c, o, h) {
  const s = [];
  for (let i = 0; i < o; i++) {
    const y = new Date((t + i * c) * 1e3);
    y.getHours() === 0 && y.getMinutes() === 0 && s.push(i);
  }
  return h ? s.filter((i, y) => y % h === 0) : s;
}
function wt(t) {
  const c = [];
  let o = null;
  return t.forEach((h, s) => {
    h != null && h < 1 ? o == null && (o = s) : o != null && (c.push([o, s - 1]), o = null);
  }), o != null && c.push([o, t.length - 1]), c;
}
function mt(t, c, o, h) {
  let s = "", i = !1;
  return t.forEach((y, N) => {
    if (y == null) {
      h || (i = !1);
      return;
    }
    s += `${i ? "L" : "M"}${c(N).toFixed(1)} ${o(y).toFixed(1)}`, i = !0;
  }), s;
}
function ct(t) {
  const c = new Date(t * 1e3);
  return `${Z(c.getDate())}.${Z(c.getMonth() + 1)} ${Z(c.getHours())}:${Z(c.getMinutes())}`;
}
const v = 170, nt = { L: 40, R: 12, T: 10, B: 22 };
function at() {
  const t = _(null), [c, o] = J(0);
  return lt(() => {
    const h = t.current;
    if (!h) return;
    const s = new ResizeObserver(([i]) => {
      i && o(Math.round(i.contentRect.width));
    });
    return s.observe(h), () => s.disconnect();
  }, []), [t, c];
}
function rt(t) {
  const c = _(null);
  return lt(() => {
    const o = c.current;
    !o || !t || (o.style.left = `${Math.min(t.boxW - o.offsetWidth, Math.max(0, t.px + t.gap))}px`);
  }), c;
}
function it(t, c) {
  const o = c.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - o.left, boxW: o.width };
}
const { L: j, R: O, T: X, B: Y } = nt;
function Lt(t) {
  const [c, o] = at(), h = _(null), [s, i] = J(null), y = rt(s), N = Math.max(280, o), T = Math.max(0, ...t.series.map((e) => e.data.length)), B = Math.max(0, ...t.series.flatMap((e) => e.data.filter((r) => r != null))), w = t.yMax || et(B * 1.05), M = (e) => j + (N - j - O) * e / Math.max(1, T - 1), $ = (e) => X + (v - X - Y) * (1 - Math.min(e, w) / w), L = ut(t.t0, t.step, T, t.xEvery), D = (e) => t.series.some((r) => r.data[e] != null);
  function F(e) {
    const r = h.current;
    if (!r) return;
    const { px: d, boxW: m } = it(e, r);
    let u = Math.round((d * N / m - j) / (N - j - O) * (T - 1));
    if (!(u >= 0 && u < T)) return i(null);
    if (t.connect) {
      let f = -1;
      for (let W = 0; W < T; W++) D(W) && (f < 0 || Math.abs(W - u) < Math.abs(f - u)) && (f = W);
      if (f < 0) return i(null);
      u = f;
    }
    i({ i: u, px: d, boxW: m, gap: 12 });
  }
  let p = null;
  if (s) {
    const e = s.i;
    p = /* @__PURE__ */ x(U, { children: [
      /* @__PURE__ */ n("b", { children: ct(t.t0 + e * t.step) }),
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
  return /* @__PURE__ */ x("div", { className: K("vs-chart", t.className), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: y, hidden: !s, children: p }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: c, children: o > 0 && /* @__PURE__ */ x("svg", { ref: h, viewBox: `0 0 ${N} ${v}`, width: N, height: v, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, r], d) => /* @__PURE__ */ n("rect", { className: "vs-chart-band", x: M(e), y: X, width: Math.max(2, M(r) - M(e)), height: v - X - Y }, d)),
      [0, 1, 2, 3, 4].map((e) => {
        const r = w * e / 4;
        return /* @__PURE__ */ x("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: j, x2: N - O, y1: $(r), y2: $(r) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: j - 6, y: $(r) + 4, textAnchor: "end", children: Math.round(r) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      L.map((e) => /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: M(e), y: v - 6, textAnchor: "middle", children: ct(t.t0 + e * t.step).slice(0, 5) }, e)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < T).map((e, r) => /* @__PURE__ */ n("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: M(e.i), x2: M(e.i), y1: X, y2: v - Y }, r)),
      t.series.map((e) => /* @__PURE__ */ x("g", { children: [
        t.connect && e.data.map((r, d) => r != null && /* @__PURE__ */ n("circle", { className: "vs-chart-dot", cx: M(d), cy: $(r), r: 3, fill: e.color, strokeWidth: 1.5 }, d)),
        /* @__PURE__ */ n("path", { d: mt(e.data, M, $, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((r, d) => r != null && (d === 0 || e.data[d - 1] == null) && (d === T - 1 || e.data[d + 1] == null) && /* @__PURE__ */ n("circle", { cx: M(d), cy: $(r), r: 2.5, fill: e.color }, `s${d}`))
      ] }, e.name)),
      s && /* @__PURE__ */ n("line", { className: "vs-chart-cross", x1: M(s.i), x2: M(s.i), y1: X, y2: v - Y }),
      s && t.series.map((e) => {
        const r = e.data[s.i];
        return r != null && /* @__PURE__ */ n("circle", { className: "vs-chart-dot", r: 4, cx: M(s.i), cy: $(r), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ n("rect", { x: j, y: 0, width: N - j - O, height: v, fill: "transparent", onMouseMove: F, onTouchStart: F, onTouchMove: F, onMouseLeave: () => i(null) })
    ] }) })
  ] });
}
const { L: P, R: ot, T: st, B: xt } = nt, ft = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function kt({ labels: t, series: c, fmt: o, label: h, className: s, xFormat: i = ft }) {
  const [y, N] = at(), T = _(null), [B, w] = J(null), M = rt(B), $ = Math.max(280, N), L = t.length, D = t.map((m, u) => c.reduce((f, W) => f + (W.data[u] || 0), 0)), F = et(Math.max(0, ...D) * 1.05), p = (m) => st + (v - st - xt) * (1 - m / F), e = ($ - P - ot) / Math.max(1, L), r = Math.max(4, e - 6);
  function d(m) {
    const u = T.current;
    if (!u) return;
    const f = u.getBoundingClientRect();
    w({ i: m, px: (P + e * (m + 1)) * f.width / $, boxW: f.width, gap: 6 });
  }
  return /* @__PURE__ */ x("div", { className: K("vs-chart", s), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: M, hidden: !B, children: B && /* @__PURE__ */ x(U, { children: [
      /* @__PURE__ */ n("b", { children: i(t[B.i] ?? "") }),
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
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: y, children: N > 0 && /* @__PURE__ */ x("svg", { ref: T, viewBox: `0 0 ${$} ${v}`, width: $, height: v, role: "img", "aria-label": h, children: [
      [0, 1, 2, 3, 4].map((m) => {
        const u = F * m / 4;
        return /* @__PURE__ */ x("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: P, x2: $ - ot, y1: p(u), y2: p(u) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: P - 6, y: p(u) + 4, textAnchor: "end", children: o(u) })
        ] }, m);
      }),
      t.map((m, u) => {
        const f = P + e * u + (e - r) / 2, W = D[u] ?? 0;
        let S = 0;
        return /* @__PURE__ */ x("g", { children: [
          c.map((k, z) => {
            const R = k.data[u] || 0;
            if (!R) return null;
            const b = p(S), A = p(S + R);
            S += R;
            const q = !c.slice(z + 1).some((Q) => Q.data[u]), E = S < W ? 2 : 0, V = Math.max(1, b - A - E);
            return q && V > 4 ? /* @__PURE__ */ n("path", { fill: k.color, d: `M${f} ${b}V${A + 4}Q${f} ${A} ${f + 4} ${A}H${f + r - 4}Q${f + r} ${A} ${f + r} ${A + 4}V${b}Z` }, k.name) : /* @__PURE__ */ n("rect", { fill: k.color, x: f, y: A + E, width: r, height: V }, k.name);
          }),
          u % 2 === (L - 1) % 2 && /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: f + r / 2, y: v - 6, textAnchor: "middle", children: i(m) }),
          /* @__PURE__ */ n("rect", { x: P + e * u, y: 0, width: e, height: v, fill: "transparent", onMouseMove: () => d(u), onTouchStart: () => d(u), onMouseLeave: () => w(null) })
        ] }, m);
      })
    ] }) })
  ] });
}
const { L: C, R: I, T: G, B: tt } = nt, vt = (t) => {
  const c = 10 ** Math.floor(Math.log10(t)), o = t / c;
  return (o <= 1 ? 1 : o <= 2 ? 2 : o <= 2.5 ? 2.5 : o <= 5 ? 5 : 10) * c;
}, pt = (t, c) => {
  const o = [...t].sort((s, i) => i.y - s.y);
  let h = -1 / 0;
  return o.map((s) => {
    const i = c(s.y), y = i - h < 14;
    return h = y ? i + 16 : i, { r: s, below: y };
  });
}, gt = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }), Mt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });
function Rt({ series: t, refLines: c = [], yFrom: o = "zero", now: h, unit: s, xFormat: i = (w) => gt.format(w * 1e3), tipFormat: y = (w) => Mt.format(w * 1e3), yFormat: N = (w) => String(Math.round(w)), label: T, className: B }) {
  const [w, M] = at(), $ = _(null), [L, D] = J(null), F = rt(L), p = Math.max(280, M), e = t.flatMap((a) => a.points), r = e.map((a) => a[0]).concat(h != null ? [h] : []), d = e.map((a) => a[1]).concat(c.map((a) => a.y)), m = Math.min(...r), u = Math.max(...r), f = Math.max(0, ...d), W = o === "data" && d.length ? Math.max(0, Math.min(...d)) : 0, S = vt((f - W || f || 1) / 4), k = o === "data" ? Math.floor(W / S) * S : 0, z = o === "data" ? Math.max(k + S * 4, Math.ceil(f / S) * S) : et(f * 1.05), R = (a) => C + (p - C - I) * (a - m) / Math.max(1, u - m), b = (a) => G + (v - G - tt) * (1 - (a - k) / Math.max(1e-9, z - k)), A = [0, 1, 2, 3].map((a) => m + (u - m) * a / 3), q = (a) => e.reduce((l, g) => Math.abs(g[0] - a) < Math.abs(l - a) ? g[0] : l, e[0]?.[0] ?? a);
  function E(a) {
    const l = $.current;
    if (!l || !e.length) return;
    const { px: g, boxW: H } = it(a, l), ht = m + (g * p / H - C) / (p - C - I) * (u - m);
    D({ t: q(ht), px: g, boxW: H, gap: 12 });
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
  const Q = (a) => a.map((l, g) => `${g ? "L" : "M"}${R(l[0]).toFixed(1)},${b(l[1]).toFixed(1)}`).join("");
  return /* @__PURE__ */ x("div", { className: K("vs-chart", B), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-tip", ref: F, hidden: !L, children: V }),
    /* @__PURE__ */ n("div", { className: "vs-chart-view", ref: w, children: M > 0 && /* @__PURE__ */ x("svg", { ref: $, viewBox: `0 0 ${p} ${v}`, width: p, height: v, role: "img", "aria-label": T, children: [
      [0, 1, 2, 3, 4].map((a) => {
        const l = k + (z - k) * a / 4;
        return /* @__PURE__ */ x("g", { children: [
          /* @__PURE__ */ n("line", { className: "vs-chart-grid", x1: C, x2: p - I, y1: b(l), y2: b(l) }),
          /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: C - 6, y: b(l) + 4, textAnchor: "end", children: N(l) + (a === 4 ? s ?? "" : "") })
        ] }, a);
      }),
      A.map((a, l) => /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: R(a), y: v - 6, textAnchor: l === 0 ? "start" : l === 3 ? "end" : "middle", children: i(a) }, l)),
      pt(c, b).map(({ r: a, below: l }, g) => /* @__PURE__ */ x("g", { children: [
        /* @__PURE__ */ n("line", { x1: C, x2: p - I, y1: b(a.y), y2: b(a.y), stroke: a.color ?? "var(--vs-muted)", strokeWidth: 1, strokeDasharray: a.dashed === !1 ? void 0 : "4 3" }),
        /* @__PURE__ */ n("text", { className: "vs-chart-axis", x: p - I, y: b(a.y) + (l ? 12 : -4), textAnchor: "end", children: a.label })
      ] }, `r${g}`)),
      h != null && /* @__PURE__ */ n("line", { className: "vs-chart-restart", x1: R(h), x2: R(h), y1: G, y2: v - tt }),
      t.map((a) => {
        const l = [...a.points].sort((g, H) => g[0] - H[0]);
        return /* @__PURE__ */ x("g", { children: [
          a.area && l.length > 1 && /* @__PURE__ */ n("path", { d: `${Q(l)}L${R(l[l.length - 1][0]).toFixed(1)},${b(k)}L${R(l[0][0]).toFixed(1)},${b(k)}Z`, fill: a.color, opacity: 0.12 }),
          (a.line ?? !a.dots) && /* @__PURE__ */ n("path", { d: Q(l), fill: "none", stroke: a.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
          (a.dots || l.length === 1) && l.map((g, H) => /* @__PURE__ */ n("circle", { cx: R(g[0]), cy: b(g[1]), r: 3, fill: a.color }, H))
        ] }, a.name);
      }),
      L && /* @__PURE__ */ n("line", { className: "vs-chart-cross", x1: R(L.t), x2: R(L.t), y1: G, y2: v - tt }),
      /* @__PURE__ */ n("rect", { x: C, y: 0, width: p - C - I, height: v, fill: "transparent", onMouseMove: E, onTouchStart: E, onTouchMove: E, onMouseLeave: () => D(null) })
    ] }) })
  ] });
}
function yt({ items: t }) {
  return /* @__PURE__ */ n("div", { className: "vs-chart-legend", children: t.map((c) => /* @__PURE__ */ x("span", { children: [
    /* @__PURE__ */ n("i", { style: { background: c.color } }),
    c.name,
    c.extra ? /* @__PURE__ */ x(U, { children: [
      " ",
      /* @__PURE__ */ n("em", { children: c.extra })
    ] }) : null
  ] }, c.name)) });
}
function Tt({ title: t, sub: c, legend: o, extra: h, className: s, children: i }) {
  return /* @__PURE__ */ x("div", { className: K("vs-chart-card", s), children: [
    /* @__PURE__ */ n("div", { className: "vs-chart-title", children: t }),
    c != null && /* @__PURE__ */ n("div", { className: "vs-chart-sub", children: c }),
    h,
    o && /* @__PURE__ */ n(yt, { items: o }),
    i
  ] });
}
const Wt = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
export {
  Tt as ChartCard,
  yt as ChartLegend,
  Lt as LineChart,
  kt as StackedBars,
  Rt as TimeChart,
  Wt as chartPalette,
  ut as dayTicks,
  ct as fmtStamp,
  mt as linePath,
  et as niceMax,
  wt as outageBands
};
