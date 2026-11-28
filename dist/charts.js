import { jsxs as m, Fragment as E, jsx as a } from "react/jsx-runtime";
import { useRef as Q, useState as J, useLayoutEffect as it } from "react";
import { c as K } from "./cx.js";
const ut = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], O = (t) => String(t).padStart(2, "0");
function z(t) {
  if (!(t > 0)) return 4;
  const r = t / 4, n = 10 ** Math.floor(Math.log10(r)), s = r / n;
  for (const i of ut) if (s <= i + 1e-9) return i * n * 4;
  return 40 * n;
}
function mt(t, r, n, s) {
  const i = [];
  for (let h = 0; h < n; h++) {
    const v = new Date((t + h * r) * 1e3);
    v.getHours() === 0 && v.getMinutes() === 0 && i.push(h);
  }
  return s ? i.filter((h, v) => v % s === 0) : i;
}
function ft(t) {
  if (!t.length) return 4;
  const r = [...t].sort((i, h) => i - h), n = r[r.length - 1], s = r[Math.max(0, Math.ceil(0.95 * r.length) - 1)];
  return n > s * 1.5 ? z(s * 1.3) : z(n * 1.05);
}
function xt(t, r, n, s) {
  const i = (n - 1) * r;
  if (i >= 36 * 3600) return mt(t, r, n, s).map((u) => ({ i: u, label: nt(t + u * r).slice(0, 5) }));
  const h = i > 12 * 3600 ? 6 : 3, v = [];
  for (let u = 0; u < n; u++) {
    const R = new Date((t + u * r) * 1e3);
    R.getMinutes() === 0 && R.getHours() % h === 0 && v.push({ i: u, label: nt(t + u * r).slice(6) });
  }
  return v;
}
function vt(t, r, n = 44) {
  if (t.length < 2) return t;
  const s = (t[t.length - 1].i - t[0].i) / (t.length - 1) * r, i = Math.max(1, Math.ceil(n / Math.max(s, 1)));
  return t.filter((h, v) => v % i === 0);
}
function Tt(t) {
  const r = [];
  let n = null;
  return t.forEach((s, i) => {
    s != null && s < 1 ? n == null && (n = i) : n != null && (r.push([n, i - 1]), n = null);
  }), n != null && r.push([n, t.length - 1]), r;
}
function pt(t, r, n, s) {
  let i = "", h = !1;
  return t.forEach((v, u) => {
    if (v == null) {
      s || (h = !1);
      return;
    }
    i += `${h ? "L" : "M"}${r(u).toFixed(1)} ${n(v).toFixed(1)}`, h = !0;
  }), i;
}
function nt(t) {
  const r = new Date(t * 1e3);
  return `${O(r.getDate())}.${O(r.getMonth() + 1)} ${O(r.getHours())}:${O(r.getMinutes())}`;
}
const y = 170, at = { L: 40, R: 12, T: 10, B: 22 };
function rt() {
  const t = Q(null), [r, n] = J(0);
  return it(() => {
    const s = t.current;
    if (!s) return;
    const i = new ResizeObserver(([h]) => {
      h && n(Math.round(h.contentRect.width));
    });
    return i.observe(s), () => i.disconnect();
  }, []), [t, r];
}
function ct(t) {
  const r = Q(null);
  return it(() => {
    const n = r.current;
    !n || !t || (n.style.left = `${Math.min(t.boxW - n.offsetWidth, Math.max(0, t.px + t.gap))}px`);
  }), r;
}
function ht(t, r) {
  const n = r.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - n.left, boxW: n.width };
}
const { L: C, R: V, T: j, B: Y } = at;
function Wt(t) {
  const [r, n] = rt(), s = Q(null), [i, h] = J(null), v = ct(i), u = Math.max(280, n), R = t.series.filter((e) => !t.hidden?.includes(e.name)), $ = Math.max(0, ...t.series.map((e) => e.data.length)), T = R.flatMap((e) => e.data.filter((o) => o != null)), S = t.yMax || (t.robust ? ft(T) : z(Math.max(0, ...T) * 1.05)), p = (e) => C + (u - C - V) * e / Math.max(1, $ - 1), g = (e) => j + (y - j - Y) * (1 - Math.min(e, S) / S), F = vt(xt(t.t0, t.step, $, t.xEvery), (u - C - V) / Math.max(1, $ - 1)), P = (e) => R.some((o) => o.data[e] != null);
  function M(e) {
    const o = s.current;
    if (!o) return;
    const { px: l, boxW: f } = ht(e, o);
    let x = Math.round((l * u / f - C) / (u - C - V) * ($ - 1));
    if (!(x >= 0 && x < $)) return h(null);
    if (t.connect) {
      let B = -1;
      for (let N = 0; N < $; N++) P(N) && (B < 0 || Math.abs(N - x) < Math.abs(B - x)) && (B = N);
      if (B < 0) return h(null);
      x = B;
    }
    h({ i: x, px: l, boxW: f, gap: 12 });
  }
  let w = null;
  if (i) {
    const e = i.i;
    w = /* @__PURE__ */ m(E, { children: [
      /* @__PURE__ */ a("b", { children: nt(t.t0 + e * t.step) }),
      R.map((o) => {
        const l = o.data[e];
        return /* @__PURE__ */ m("span", { children: [
          /* @__PURE__ */ a("br", {}),
          /* @__PURE__ */ a("i", { style: { background: o.color } }),
          o.name,
          ": ",
          l == null ? "—" : o.fmt ? o.fmt(l) : l
        ] }, o.name);
      }),
      t.bands?.some(([o, l]) => e >= o && e <= l) && /* @__PURE__ */ m(E, { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("span", { className: "vs-chart-tip-band", children: t.bandLabel ?? "нет данных" })
      ] }),
      t.note?.(e) ? /* @__PURE__ */ m(E, { children: [
        /* @__PURE__ */ a("br", {}),
        t.note(e)
      ] }) : null,
      (t.marks ?? []).filter((o) => Math.abs(o.i - e) <= 1).map((o, l) => /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ m("span", { className: o.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          o.dashed ? "↻ " : "🚀 ",
          o.label
        ] })
      ] }, l))
    ] });
  }
  return /* @__PURE__ */ m("div", { className: K("vs-chart", t.className), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: v, hidden: !i, children: w }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: r, children: n > 0 && /* @__PURE__ */ m("svg", { ref: s, viewBox: `0 0 ${u} ${y}`, width: u, height: y, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, o], l) => /* @__PURE__ */ a("rect", { className: "vs-chart-band", x: p(e), y: j, width: Math.max(2, p(o) - p(e)), height: y - j - Y }, l)),
      [0, 1, 2, 3, 4].map((e) => {
        const o = S * e / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: C, x2: u - V, y1: g(o), y2: g(o) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: C - 6, y: g(o) + 4, textAnchor: "end", children: Math.round(o) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      F.map((e) => /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: p(e.i), y: y - 6, textAnchor: "middle", children: e.label }, e.i)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < $).map((e, o) => /* @__PURE__ */ a("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: p(e.i), x2: p(e.i), y1: j, y2: y - Y }, o)),
      R.map((e) => /* @__PURE__ */ m("g", { children: [
        t.connect && e.data.map((o, l) => o != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", cx: p(l), cy: g(o), r: 3, fill: e.color, strokeWidth: 1.5 }, l)),
        /* @__PURE__ */ a("path", { d: pt(e.data, p, g, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((o, l) => o != null && (l === 0 || e.data[l - 1] == null) && (l === $ - 1 || e.data[l + 1] == null) && /* @__PURE__ */ a("circle", { cx: p(l), cy: g(o), r: 2.5, fill: e.color }, `s${l}`)),
        e.data.map((o, l) => o != null && o > S && /* @__PURE__ */ a("circle", { className: "vs-chart-clip", cx: p(l), cy: j, r: 3, fill: e.color }, `c${l}`))
      ] }, e.name)),
      i && /* @__PURE__ */ a("line", { className: "vs-chart-cross", x1: p(i.i), x2: p(i.i), y1: j, y2: y - Y }),
      i && R.map((e) => {
        const o = e.data[i.i];
        return o != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", r: 4, cx: p(i.i), cy: g(o), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ a("rect", { x: C, y: 0, width: u - C - V, height: y, fill: "transparent", onMouseMove: M, onTouchStart: M, onTouchMove: M, onMouseLeave: () => h(null) })
    ] }) })
  ] });
}
const { L: I, R: lt, T: st, B: gt } = at, Mt = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function Bt({ labels: t, series: r, fmt: n, label: s, className: i, xFormat: h = Mt }) {
  const [v, u] = rt(), R = Q(null), [$, T] = J(null), S = ct($), p = Math.max(280, u), g = t.length, F = t.map((l, f) => r.reduce((x, B) => x + (B.data[f] || 0), 0)), P = z(Math.max(0, ...F) * 1.05), M = (l) => st + (y - st - gt) * (1 - l / P), w = (p - I - lt) / Math.max(1, g), e = Math.max(4, w - 6);
  function o(l) {
    const f = R.current;
    if (!f) return;
    const x = f.getBoundingClientRect();
    T({ i: l, px: (I + w * (l + 1)) * x.width / p, boxW: x.width, gap: 6 });
  }
  return /* @__PURE__ */ m("div", { className: K("vs-chart", i), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: S, hidden: !$, children: $ && /* @__PURE__ */ m(E, { children: [
      /* @__PURE__ */ a("b", { children: h(t[$.i] ?? "") }),
      " — ",
      n(F[$.i] ?? 0),
      r.map((l) => /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("i", { style: { background: l.color } }),
        l.name,
        ": ",
        n(l.data[$.i] || 0)
      ] }, l.name))
    ] }) }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: v, children: u > 0 && /* @__PURE__ */ m("svg", { ref: R, viewBox: `0 0 ${p} ${y}`, width: p, height: y, role: "img", "aria-label": s, children: [
      [0, 1, 2, 3, 4].map((l) => {
        const f = P * l / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: I, x2: p - lt, y1: M(f), y2: M(f) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: I - 6, y: M(f) + 4, textAnchor: "end", children: n(f) })
        ] }, l);
      }),
      t.map((l, f) => {
        const x = I + w * f + (w - e) / 2, B = F[f] ?? 0;
        let N = 0;
        return /* @__PURE__ */ m("g", { children: [
          r.map((W, Z) => {
            const k = W.data[f] || 0;
            if (!k) return null;
            const L = M(N), A = M(N + k);
            N += k;
            const q = !r.slice(Z + 1).some((tt) => tt.data[f]), _ = N < B ? 2 : 0, U = Math.max(1, L - A - _);
            return q && U > 4 ? /* @__PURE__ */ a("path", { fill: W.color, d: `M${x} ${L}V${A + 4}Q${x} ${A} ${x + 4} ${A}H${x + e - 4}Q${x + e} ${A} ${x + e} ${A + 4}V${L}Z` }, W.name) : /* @__PURE__ */ a("rect", { fill: W.color, x, y: A + _, width: e, height: U }, W.name);
          }),
          f % 2 === (g - 1) % 2 && /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: x + e / 2, y: y - 6, textAnchor: "middle", children: h(l) }),
          /* @__PURE__ */ a("rect", { x: I + w * f, y: 0, width: w, height: y, fill: "transparent", onMouseMove: () => o(f), onTouchStart: () => o(f), onMouseLeave: () => T(null) })
        ] }, l);
      })
    ] }) })
  ] });
}
const { L: D, R: X, T: G, B: et } = at, yt = (t) => {
  const r = 10 ** Math.floor(Math.log10(t)), n = t / r;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * r;
}, bt = (t, r) => {
  const n = [...t].sort((i, h) => h.y - i.y);
  let s = -1 / 0;
  return n.map((i) => {
    const h = r(i.y), v = h - s < 14;
    return s = v ? h + 16 : h, { r: i, below: v };
  });
}, $t = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }), Nt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });
function St({ series: t, refLines: r = [], yFrom: n = "zero", now: s, unit: i, xFormat: h = (T) => $t.format(T * 1e3), tipFormat: v = (T) => Nt.format(T * 1e3), yFormat: u = (T) => String(Math.round(T)), label: R, className: $ }) {
  const [T, S] = rt(), p = Q(null), [g, F] = J(null), P = ct(g), M = Math.max(280, S), w = t.flatMap((c) => c.points), e = w.map((c) => c[0]).concat(s != null ? [s] : []), o = w.map((c) => c[1]).concat(r.map((c) => c.y)), l = Math.min(...e), f = Math.max(...e), x = Math.max(0, ...o), B = n === "data" && o.length ? Math.max(0, Math.min(...o)) : 0, N = yt((x - B || x || 1) / 4), W = n === "data" ? Math.floor(B / N) * N : 0, Z = n === "data" ? Math.max(W + N * 4, Math.ceil(x / N) * N) : z(x * 1.05), k = (c) => D + (M - D - X) * (c - l) / Math.max(1, f - l), L = (c) => G + (y - G - et) * (1 - (c - W) / Math.max(1e-9, Z - W)), A = [0, 1, 2, 3].map((c) => l + (f - l) * c / 3), q = (c) => w.reduce((d, b) => Math.abs(b[0] - c) < Math.abs(d - c) ? b[0] : d, w[0]?.[0] ?? c);
  function _(c) {
    const d = p.current;
    if (!d || !w.length) return;
    const { px: b, boxW: H } = ht(c, d), dt = l + (b * M / H - D) / (M - D - X) * (f - l);
    F({ t: q(dt), px: b, boxW: H, gap: 12 });
  }
  let U = null;
  g && (U = /* @__PURE__ */ m(E, { children: [
    /* @__PURE__ */ a("b", { children: v(g.t) }),
    t.map((c) => {
      const d = c.points.reduce((b, H) => !b || Math.abs(H[0] - g.t) < Math.abs(b[0] - g.t) ? H : b, void 0);
      return d ? /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("i", { style: { background: c.color } }),
        c.name,
        ": ",
        c.fmt ? c.fmt(d[1]) : d[1]
      ] }, c.name) : null;
    })
  ] }));
  const tt = (s != null ? Math.min(k(s), M - X) : M - X) - 8, ot = (c) => c.map((d, b) => `${b ? "L" : "M"}${k(d[0]).toFixed(1)},${L(d[1]).toFixed(1)}`).join("");
  return /* @__PURE__ */ m("div", { className: K("vs-chart", $), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: P, hidden: !g, children: U }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: T, children: S > 0 && /* @__PURE__ */ m("svg", { ref: p, viewBox: `0 0 ${M} ${y}`, width: M, height: y, role: "img", "aria-label": R, children: [
      [0, 1, 2, 3, 4].map((c) => {
        const d = W + (Z - W) * c / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: D, x2: M - X, y1: L(d), y2: L(d) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: D - 6, y: L(d) + 4, textAnchor: "end", children: u(d) + (c === 4 ? i ?? "" : "") })
        ] }, c);
      }),
      A.map((c, d) => /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: k(c), y: y - 6, textAnchor: d === 0 ? "start" : d === 3 ? "end" : "middle", children: h(c) }, d)),
      bt(r, L).map(({ r: c, below: d }, b) => /* @__PURE__ */ m("g", { children: [
        /* @__PURE__ */ a("line", { x1: D, x2: M - X, y1: L(c.y), y2: L(c.y), stroke: c.color ?? "var(--vs-muted)", strokeWidth: 1, strokeDasharray: c.dashed === !1 ? void 0 : "4 3" }),
        /* @__PURE__ */ a("text", { className: "vs-chart-axis vs-chart-ref", x: tt, y: L(c.y) + (d ? 12 : -4), textAnchor: "end", children: c.label })
      ] }, `r${b}`)),
      s != null && /* @__PURE__ */ a("line", { className: "vs-chart-restart", x1: k(s), x2: k(s), y1: G, y2: y - et }),
      t.map((c) => {
        const d = [...c.points].sort((b, H) => b[0] - H[0]);
        return /* @__PURE__ */ m("g", { children: [
          c.area && d.length > 1 && /* @__PURE__ */ a("path", { d: `${ot(d)}L${k(d[d.length - 1][0]).toFixed(1)},${L(W)}L${k(d[0][0]).toFixed(1)},${L(W)}Z`, fill: c.color, opacity: 0.12 }),
          (c.line ?? !c.dots) && /* @__PURE__ */ a("path", { d: ot(d), fill: "none", stroke: c.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
          (c.dots || d.length === 1) && d.map((b, H) => /* @__PURE__ */ a("circle", { cx: k(b[0]), cy: L(b[1]), r: 3, fill: c.color }, H))
        ] }, c.name);
      }),
      g && /* @__PURE__ */ a("line", { className: "vs-chart-cross", x1: k(g.t), x2: k(g.t), y1: G, y2: y - et }),
      /* @__PURE__ */ a("rect", { x: D, y: 0, width: M - D - X, height: y, fill: "transparent", onMouseMove: _, onTouchStart: _, onTouchMove: _, onMouseLeave: () => F(null) })
    ] }) })
  ] });
}
function wt({ items: t, hidden: r = [], onToggle: n }) {
  return /* @__PURE__ */ a("div", { className: "vs-chart-legend", children: t.map((s) => {
    const i = /* @__PURE__ */ m(E, { children: [
      /* @__PURE__ */ a("i", { style: { background: s.color } }),
      s.name,
      s.extra ? /* @__PURE__ */ m(E, { children: [
        " ",
        /* @__PURE__ */ a("em", { children: s.extra })
      ] }) : null
    ] });
    return n ? /* @__PURE__ */ a("button", { type: "button", className: "vs-chart-legend-item", "aria-pressed": !r.includes(s.name), onClick: () => n(s.name), children: i }, s.name) : /* @__PURE__ */ a("span", { children: i }, s.name);
  }) });
}
function At({ title: t, sub: r, legend: n, extra: s, className: i, children: h, hidden: v, onToggle: u }) {
  return /* @__PURE__ */ m("div", { className: K("vs-chart-card", i), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-title", children: t }),
    r != null && /* @__PURE__ */ a("div", { className: "vs-chart-sub", children: r }),
    s,
    n && /* @__PURE__ */ a(wt, { items: n, hidden: v, onToggle: u }),
    h
  ] });
}
const Ht = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#8a63d2", "#1c9bb8", "#9c6b3e"];
export {
  At as ChartCard,
  wt as ChartLegend,
  Wt as LineChart,
  Bt as StackedBars,
  St as TimeChart,
  Ht as chartPalette,
  mt as dayTicks,
  nt as fmtStamp,
  pt as linePath,
  z as niceMax,
  Tt as outageBands,
  ft as robustMax,
  xt as timeTicks
};
