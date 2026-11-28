import { jsxs as m, Fragment as E, jsx as a } from "react/jsx-runtime";
import { useRef as Q, useState as J, useLayoutEffect as it } from "react";
import { c as K } from "./cx.js";
const ut = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10], O = (t) => String(t).padStart(2, "0");
function z(t) {
  if (!(t > 0)) return 4;
  const c = t / 4, n = 10 ** Math.floor(Math.log10(c)), o = c / n;
  for (const i of ut) if (o <= i + 1e-9) return i * n * 4;
  return 40 * n;
}
function mt(t, c, n, o) {
  const i = [];
  for (let h = 0; h < n; h++) {
    const v = new Date((t + h * c) * 1e3);
    v.getHours() === 0 && v.getMinutes() === 0 && i.push(h);
  }
  return o ? i.filter((h, v) => v % o === 0) : i;
}
function ft(t) {
  if (!t.length) return 4;
  const c = [...t].sort((i, h) => i - h), n = c[c.length - 1], o = c[Math.max(0, Math.ceil(0.95 * c.length) - 1)];
  return n > o * 1.5 ? z(o * 1.3) : z(n * 1.05);
}
function xt(t, c, n, o) {
  const i = (n - 1) * c;
  if (i >= 36 * 3600) return mt(t, c, n, o).map((u) => ({ i: u, label: nt(t + u * c).slice(0, 5) }));
  const h = i > 12 * 3600 ? 6 : 3, v = [];
  for (let u = 0; u < n; u++) {
    const R = new Date((t + u * c) * 1e3);
    R.getMinutes() === 0 && R.getHours() % h === 0 && v.push({ i: u, label: nt(t + u * c).slice(6) });
  }
  return v;
}
function vt(t, c, n = 44) {
  if (t.length < 2) return t;
  const o = (t[t.length - 1].i - t[0].i) / (t.length - 1) * c, i = Math.max(1, Math.ceil(n / Math.max(o, 1)));
  return t.filter((h, v) => v % i === 0);
}
function Tt(t) {
  const c = [];
  let n = null;
  return t.forEach((o, i) => {
    o != null && o < 1 ? n == null && (n = i) : n != null && (c.push([n, i - 1]), n = null);
  }), n != null && c.push([n, t.length - 1]), c;
}
function pt(t, c, n, o) {
  let i = "", h = !1;
  return t.forEach((v, u) => {
    if (v == null) {
      o || (h = !1);
      return;
    }
    i += `${h ? "L" : "M"}${c(u).toFixed(1)} ${n(v).toFixed(1)}`, h = !0;
  }), i;
}
function nt(t) {
  const c = new Date(t * 1e3);
  return `${O(c.getDate())}.${O(c.getMonth() + 1)} ${O(c.getHours())}:${O(c.getMinutes())}`;
}
const y = 170, at = { L: 40, R: 12, T: 10, B: 22 };
function ct() {
  const t = Q(null), [c, n] = J(0);
  return it(() => {
    const o = t.current;
    if (!o) return;
    const i = new ResizeObserver(([h]) => {
      h && n(Math.round(h.contentRect.width));
    });
    return i.observe(o), () => i.disconnect();
  }, []), [t, c];
}
function rt(t) {
  const c = Q(null);
  return it(() => {
    const n = c.current;
    if (!n || !t) return;
    const o = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
    n.style.left = o ? "0px" : `${Math.min(t.boxW - n.offsetWidth, Math.max(0, t.px + t.gap))}px`;
  }), c;
}
function ht(t, c) {
  const n = c.getBoundingClientRect();
  return { px: ("touches" in t ? t.touches[0]?.clientX ?? 0 : t.clientX) - n.left, boxW: n.width };
}
const { L: C, R: V, T: j, B: Y } = at;
function Wt(t) {
  const [c, n] = ct(), o = Q(null), [i, h] = J(null), v = rt(i), u = Math.max(280, n), R = t.series.filter((e) => !t.hidden?.includes(e.name)), $ = Math.max(0, ...t.series.map((e) => e.data.length)), T = R.flatMap((e) => e.data.filter((l) => l != null)), S = t.yMax || (t.robust ? ft(T) : z(Math.max(0, ...T) * 1.05)), p = (e) => C + (u - C - V) * e / Math.max(1, $ - 1), M = (e) => j + (y - j - Y) * (1 - Math.min(e, S) / S), F = vt(xt(t.t0, t.step, $, t.xEvery), (u - C - V) / Math.max(1, $ - 1)), P = (e) => R.some((l) => l.data[e] != null);
  function g(e) {
    const l = o.current;
    if (!l) return;
    const { px: s, boxW: f } = ht(e, l);
    let x = Math.round((s * u / f - C) / (u - C - V) * ($ - 1));
    if (!(x >= 0 && x < $)) return h(null);
    if (t.connect) {
      let B = -1;
      for (let N = 0; N < $; N++) P(N) && (B < 0 || Math.abs(N - x) < Math.abs(B - x)) && (B = N);
      if (B < 0) return h(null);
      x = B;
    }
    h({ i: x, px: s, boxW: f, gap: 12 });
  }
  let w = null;
  if (i) {
    const e = i.i;
    w = /* @__PURE__ */ m(E, { children: [
      /* @__PURE__ */ a("b", { children: nt(t.t0 + e * t.step) }),
      R.map((l) => {
        const s = l.data[e];
        return /* @__PURE__ */ m("span", { children: [
          /* @__PURE__ */ a("br", {}),
          /* @__PURE__ */ a("i", { style: { background: l.color } }),
          l.name,
          ": ",
          s == null ? "—" : l.fmt ? l.fmt(s) : s
        ] }, l.name);
      }),
      t.bands?.some(([l, s]) => e >= l && e <= s) && /* @__PURE__ */ m(E, { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("span", { className: "vs-chart-tip-band", children: t.bandLabel ?? "нет данных" })
      ] }),
      t.note?.(e) ? /* @__PURE__ */ m(E, { children: [
        /* @__PURE__ */ a("br", {}),
        t.note(e)
      ] }) : null,
      (t.marks ?? []).filter((l) => Math.abs(l.i - e) <= 1).map((l, s) => /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ m("span", { className: l.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark", children: [
          l.dashed ? "↻ " : "🚀 ",
          l.label
        ] })
      ] }, s))
    ] });
  }
  return /* @__PURE__ */ m("div", { className: K("vs-chart", t.className), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: v, hidden: !i, children: w }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: c, children: n > 0 && /* @__PURE__ */ m("svg", { ref: o, viewBox: `0 0 ${u} ${y}`, width: u, height: y, role: "img", "aria-label": t.label, children: [
      (t.bands ?? []).map(([e, l], s) => /* @__PURE__ */ a("rect", { className: "vs-chart-band", x: p(e), y: j, width: Math.max(2, p(l) - p(e)), height: y - j - Y }, s)),
      [0, 1, 2, 3, 4].map((e) => {
        const l = S * e / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: C, x2: u - V, y1: M(l), y2: M(l) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: C - 6, y: M(l) + 4, textAnchor: "end", children: Math.round(l) + (e === 4 ? t.unit ?? "" : "") })
        ] }, e);
      }),
      F.map((e) => /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: p(e.i), y: y - 6, textAnchor: "middle", children: e.label }, e.i)),
      (t.marks ?? []).filter((e) => e.i >= 0 && e.i < $).map((e, l) => /* @__PURE__ */ a("line", { className: e.dashed ? "vs-chart-restart" : "vs-chart-mark", x1: p(e.i), x2: p(e.i), y1: j, y2: y - Y }, l)),
      R.map((e) => /* @__PURE__ */ m("g", { children: [
        t.connect && e.data.map((l, s) => l != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", cx: p(s), cy: M(l), r: 3, fill: e.color, strokeWidth: 1.5 }, s)),
        /* @__PURE__ */ a("path", { d: pt(e.data, p, M, !!t.connect), fill: "none", stroke: e.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
        e.data.map((l, s) => l != null && (s === 0 || e.data[s - 1] == null) && (s === $ - 1 || e.data[s + 1] == null) && /* @__PURE__ */ a("circle", { cx: p(s), cy: M(l), r: 2.5, fill: e.color }, `s${s}`)),
        e.data.map((l, s) => l != null && l > S && /* @__PURE__ */ a("circle", { className: "vs-chart-clip", cx: p(s), cy: j, r: 3, fill: e.color }, `c${s}`))
      ] }, e.name)),
      i && /* @__PURE__ */ a("line", { className: "vs-chart-cross", x1: p(i.i), x2: p(i.i), y1: j, y2: y - Y }),
      i && R.map((e) => {
        const l = e.data[i.i];
        return l != null && /* @__PURE__ */ a("circle", { className: "vs-chart-dot", r: 4, cx: p(i.i), cy: M(l), fill: e.color, strokeWidth: 2 }, e.name);
      }),
      /* @__PURE__ */ a("rect", { x: C, y: 0, width: u - C - V, height: y, fill: "transparent", onMouseMove: g, onTouchStart: g, onTouchMove: g, onMouseLeave: () => h(null) })
    ] }) })
  ] });
}
const { L: I, R: lt, T: st, B: Mt } = at, gt = (t) => `${t.slice(8, 10)}.${t.slice(5, 7)}`;
function Bt({ labels: t, series: c, fmt: n, label: o, className: i, xFormat: h = gt }) {
  const [v, u] = ct(), R = Q(null), [$, T] = J(null), S = rt($), p = Math.max(280, u), M = t.length, F = t.map((s, f) => c.reduce((x, B) => x + (B.data[f] || 0), 0)), P = z(Math.max(0, ...F) * 1.05), g = (s) => st + (y - st - Mt) * (1 - s / P), w = (p - I - lt) / Math.max(1, M), e = Math.max(4, w - 6);
  function l(s) {
    const f = R.current;
    if (!f) return;
    const x = f.getBoundingClientRect();
    T({ i: s, px: (I + w * (s + 1)) * x.width / p, boxW: x.width, gap: 6 });
  }
  return /* @__PURE__ */ m("div", { className: K("vs-chart", i), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: S, hidden: !$, children: $ && /* @__PURE__ */ m(E, { children: [
      /* @__PURE__ */ a("b", { children: h(t[$.i] ?? "") }),
      " — ",
      n(F[$.i] ?? 0),
      c.map((s) => /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("i", { style: { background: s.color } }),
        s.name,
        ": ",
        n(s.data[$.i] || 0)
      ] }, s.name))
    ] }) }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: v, children: u > 0 && /* @__PURE__ */ m("svg", { ref: R, viewBox: `0 0 ${p} ${y}`, width: p, height: y, role: "img", "aria-label": o, children: [
      [0, 1, 2, 3, 4].map((s) => {
        const f = P * s / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: I, x2: p - lt, y1: g(f), y2: g(f) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: I - 6, y: g(f) + 4, textAnchor: "end", children: n(f) })
        ] }, s);
      }),
      t.map((s, f) => {
        const x = I + w * f + (w - e) / 2, B = F[f] ?? 0;
        let N = 0;
        return /* @__PURE__ */ m("g", { children: [
          c.map((W, Z) => {
            const k = W.data[f] || 0;
            if (!k) return null;
            const L = g(N), A = g(N + k);
            N += k;
            const q = !c.slice(Z + 1).some((tt) => tt.data[f]), _ = N < B ? 2 : 0, U = Math.max(1, L - A - _);
            return q && U > 4 ? /* @__PURE__ */ a("path", { fill: W.color, d: `M${x} ${L}V${A + 4}Q${x} ${A} ${x + 4} ${A}H${x + e - 4}Q${x + e} ${A} ${x + e} ${A + 4}V${L}Z` }, W.name) : /* @__PURE__ */ a("rect", { fill: W.color, x, y: A + _, width: e, height: U }, W.name);
          }),
          f % 2 === (M - 1) % 2 && /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: x + e / 2, y: y - 6, textAnchor: "middle", children: h(s) }),
          /* @__PURE__ */ a("rect", { x: I + w * f, y: 0, width: w, height: y, fill: "transparent", onMouseMove: () => l(f), onTouchStart: () => l(f), onMouseLeave: () => T(null) })
        ] }, s);
      })
    ] }) })
  ] });
}
const { L: D, R: X, T: G, B: et } = at, yt = (t) => {
  const c = 10 ** Math.floor(Math.log10(t)), n = t / c;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * c;
}, bt = (t, c) => {
  const n = [...t].sort((i, h) => h.y - i.y);
  let o = -1 / 0;
  return n.map((i) => {
    const h = c(i.y), v = h - o < 14;
    return o = v ? h + 16 : h, { r: i, below: v };
  });
}, $t = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }), Nt = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });
function St({ series: t, refLines: c = [], yFrom: n = "zero", now: o, unit: i, xFormat: h = (T) => $t.format(T * 1e3), tipFormat: v = (T) => Nt.format(T * 1e3), yFormat: u = (T) => String(Math.round(T)), label: R, className: $ }) {
  const [T, S] = ct(), p = Q(null), [M, F] = J(null), P = rt(M), g = Math.max(280, S), w = t.flatMap((r) => r.points), e = w.map((r) => r[0]).concat(o != null ? [o] : []), l = w.map((r) => r[1]).concat(c.map((r) => r.y)), s = Math.min(...e), f = Math.max(...e), x = Math.max(0, ...l), B = n === "data" && l.length ? Math.max(0, Math.min(...l)) : 0, N = yt((x - B || x || 1) / 4), W = n === "data" ? Math.floor(B / N) * N : 0, Z = n === "data" ? Math.max(W + N * 4, Math.ceil(x / N) * N) : z(x * 1.05), k = (r) => D + (g - D - X) * (r - s) / Math.max(1, f - s), L = (r) => G + (y - G - et) * (1 - (r - W) / Math.max(1e-9, Z - W)), A = [0, 1, 2, 3].map((r) => s + (f - s) * r / 3), q = (r) => w.reduce((d, b) => Math.abs(b[0] - r) < Math.abs(d - r) ? b[0] : d, w[0]?.[0] ?? r);
  function _(r) {
    const d = p.current;
    if (!d || !w.length) return;
    const { px: b, boxW: H } = ht(r, d), dt = s + (b * g / H - D) / (g - D - X) * (f - s);
    F({ t: q(dt), px: b, boxW: H, gap: 12 });
  }
  let U = null;
  M && (U = /* @__PURE__ */ m(E, { children: [
    /* @__PURE__ */ a("b", { children: v(M.t) }),
    t.map((r) => {
      const d = r.points.reduce((b, H) => !b || Math.abs(H[0] - M.t) < Math.abs(b[0] - M.t) ? H : b, void 0);
      return d ? /* @__PURE__ */ m("span", { children: [
        /* @__PURE__ */ a("br", {}),
        /* @__PURE__ */ a("i", { style: { background: r.color } }),
        r.name,
        ": ",
        r.fmt ? r.fmt(d[1]) : d[1]
      ] }, r.name) : null;
    })
  ] }));
  const tt = (o != null ? Math.min(k(o), g - X) : g - X) - 8, ot = (r) => r.map((d, b) => `${b ? "L" : "M"}${k(d[0]).toFixed(1)},${L(d[1]).toFixed(1)}`).join("");
  return /* @__PURE__ */ m("div", { className: K("vs-chart", $), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-tip", ref: P, hidden: !M, children: U }),
    /* @__PURE__ */ a("div", { className: "vs-chart-view", ref: T, children: S > 0 && /* @__PURE__ */ m("svg", { ref: p, viewBox: `0 0 ${g} ${y}`, width: g, height: y, role: "img", "aria-label": R, children: [
      [0, 1, 2, 3, 4].map((r) => {
        const d = W + (Z - W) * r / 4;
        return /* @__PURE__ */ m("g", { children: [
          /* @__PURE__ */ a("line", { className: "vs-chart-grid", x1: D, x2: g - X, y1: L(d), y2: L(d) }),
          /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: D - 6, y: L(d) + 4, textAnchor: "end", children: u(d) + (r === 4 ? i ?? "" : "") })
        ] }, r);
      }),
      A.map((r, d) => /* @__PURE__ */ a("text", { className: "vs-chart-axis", x: k(r), y: y - 6, textAnchor: d === 0 ? "start" : d === 3 ? "end" : "middle", children: h(r) }, d)),
      bt(c, L).map(({ r, below: d }, b) => /* @__PURE__ */ m("g", { children: [
        /* @__PURE__ */ a("line", { x1: D, x2: g - X, y1: L(r.y), y2: L(r.y), stroke: r.color ?? "var(--vs-muted)", strokeWidth: 1, strokeDasharray: r.dashed === !1 ? void 0 : "4 3" }),
        /* @__PURE__ */ a("text", { className: "vs-chart-axis vs-chart-ref", x: tt, y: L(r.y) + (d ? 12 : -4), textAnchor: "end", children: r.label })
      ] }, `r${b}`)),
      o != null && /* @__PURE__ */ a("line", { className: "vs-chart-restart", x1: k(o), x2: k(o), y1: G, y2: y - et }),
      t.map((r) => {
        const d = [...r.points].sort((b, H) => b[0] - H[0]);
        return /* @__PURE__ */ m("g", { children: [
          r.area && d.length > 1 && /* @__PURE__ */ a("path", { d: `${ot(d)}L${k(d[d.length - 1][0]).toFixed(1)},${L(W)}L${k(d[0][0]).toFixed(1)},${L(W)}Z`, fill: r.color, opacity: 0.12 }),
          (r.line ?? !r.dots) && /* @__PURE__ */ a("path", { d: ot(d), fill: "none", stroke: r.color, strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" }),
          (r.dots || d.length === 1) && d.map((b, H) => /* @__PURE__ */ a("circle", { cx: k(b[0]), cy: L(b[1]), r: 3, fill: r.color }, H))
        ] }, r.name);
      }),
      M && /* @__PURE__ */ a("line", { className: "vs-chart-cross", x1: k(M.t), x2: k(M.t), y1: G, y2: y - et }),
      /* @__PURE__ */ a("rect", { x: D, y: 0, width: g - D - X, height: y, fill: "transparent", onMouseMove: _, onTouchStart: _, onTouchMove: _, onMouseLeave: () => F(null) })
    ] }) })
  ] });
}
function wt({ items: t, hidden: c = [], onToggle: n }) {
  return /* @__PURE__ */ a("div", { className: "vs-chart-legend", children: t.map((o) => {
    const i = /* @__PURE__ */ m(E, { children: [
      /* @__PURE__ */ a("i", { style: { background: o.color } }),
      o.name,
      o.extra ? /* @__PURE__ */ m(E, { children: [
        " ",
        /* @__PURE__ */ a("em", { children: o.extra })
      ] }) : null
    ] });
    return n ? /* @__PURE__ */ a("button", { type: "button", className: "vs-chart-legend-item", "aria-pressed": !c.includes(o.name), onClick: () => n(o.name), children: i }, o.name) : /* @__PURE__ */ a("span", { children: i }, o.name);
  }) });
}
function At({ title: t, sub: c, legend: n, extra: o, className: i, children: h, hidden: v, onToggle: u }) {
  return /* @__PURE__ */ m("div", { className: K("vs-chart-card", i), children: [
    /* @__PURE__ */ a("div", { className: "vs-chart-title", children: t }),
    c != null && /* @__PURE__ */ a("div", { className: "vs-chart-sub", children: c }),
    o,
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
