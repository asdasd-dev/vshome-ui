import { c as h } from "./cx.js";
import { jsx as s, jsxs as d, Fragment as $ } from "react/jsx-runtime";
import { useRef as p, useEffect as M, useId as K, useState as g, useCallback as x, useLayoutEffect as T, useSyncExternalStore as Q, Children as W, useContext as Y, createContext as q } from "react";
import { Dialog as H } from "@base-ui/react/dialog";
import { Drawer as L } from "@base-ui/react/drawer";
import { QueryClient as J } from "@tanstack/react-query";
import { createPortal as X } from "react-dom";
import { CSPProvider as z } from "@base-ui/react/csp-provider";
import { Select as A } from "@base-ui/react/select";
import { ContextMenu as m } from "@base-ui/react/context-menu";
const N = (e) => String(e).padStart(2, "0");
function M1(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${N(t.getDate())}.${N(t.getMonth() + 1)}.${t.getFullYear()} ${N(t.getHours())}:${N(t.getMinutes())}`;
}
function b1(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${N(t.getDate())}.${N(t.getMonth() + 1)}`;
}
function H1(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${N(e.getMonth() + 1)}-${N(e.getDate())}`;
}
function k1(e, t, n, r) {
  const a = Math.abs(Math.round(e)) % 100, l = a % 10;
  return l === 1 && a !== 11 ? t : l >= 2 && l <= 4 && (a < 12 || a > 14) ? n : r;
}
function y1(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function $1(e, t, n) {
  const r = e.split(`
`);
  let a = 0, l = r.length;
  for (let i = 0; i < r.length; i++)
    if (r[i].trim() && a++, a === t) {
      l = i + 1;
      break;
    }
  let o = r.slice(0, l).join(`
`), c = l < r.length && r.slice(l).some((i) => i.trim());
  if (o.length > n) {
    const i = o.slice(0, n + 1), u = i.lastIndexOf(" ");
    o = u > 0 ? i.slice(0, u) : o.slice(0, n), c = !0;
  }
  return c ? { text: o.trimEnd() + "…", cut: c } : { text: o, cut: c };
}
const e1 = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, t1 = /[.,;:!?)»"']+$/;
function x1(e) {
  const t = [];
  let n = 0;
  for (const r of e.matchAll(e1)) {
    const a = r.index;
    let l = r[2] ?? r[0], o = r[1] ?? l, c = a + r[0].length;
    if (!r[2]) {
      const i = t1.exec(l)?.[0] ?? "";
      l = l.slice(0, l.length - i.length), o = l, c -= i.length;
    }
    a > n && t.push({ text: e.slice(n, a) }), t.push({ url: l, text: o }), n = c;
  }
  return n < e.length && t.push({ text: e.slice(n) }), t;
}
class S extends Error {
  status;
  data;
  constructor(t, n, r) {
    super(t), this.name = "ApiError", this.status = n, this.data = r;
  }
}
function n1(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function T1(e, t, n) {
  let r;
  try {
    r = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: n === void 0 ? {} : { "Content-Type": "application/json" },
      body: n === void 0 ? void 0 : JSON.stringify(n)
    });
  } catch {
    throw new S("нет связи с сервером", 0, null);
  }
  const a = await r.json().catch(() => ({}));
  if (!r.ok) throw new S(n1(a, r.status), r.status, a);
  return a;
}
const B = {
  play: "M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z",
  pause: "M7 5h3.5v14H7zM13.5 5H17v14h-3.5z",
  prev: "M6 5h2.5v14H6zM19 5.9v12.2a.9.9 0 0 1-1.38.76L9.5 13.7a2 2 0 0 1 0-3.4l8.12-5.16A.9.9 0 0 1 19 5.9Z",
  next: "M15.5 5H18v14h-2.5zM5 5.9v12.2a.9.9 0 0 0 1.38.76l8.12-5.16a2 2 0 0 0 0-3.4L6.38 5.14A.9.9 0 0 0 5 5.9Z",
  check: "M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7z",
  alert: "M12 3 1.8 20.5h20.4L12 3Zm-1 6h2v6h-2V9Zm0 8h2v2h-2v-2Z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3v6l5 3 1-1.7-4-2.3V7h-2Z",
  external: "M14 3h7v7h-2V6.4l-8.3 8.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  "chevron-right": "M9.3 5.3 7.9 6.7l5.3 5.3-5.3 5.3 1.4 1.4 6.7-6.7z",
  dot: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  "weather-clear-night": "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",
  "weather-sunny": "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z",
  "weather-partlycloudy": "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z",
  "weather-cloudy": "M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z",
  "weather-fog": "M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z",
  "weather-rainy": "M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59",
  "weather-pouring": "M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z",
  "weather-snowy": "M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z",
  "weather-snowy-rainy": "M18.5,18.67C18.5,19.96 17.5,21 16.25,21C15,21 14,19.96 14,18.67C14,17.12 16.25,14.5 16.25,14.5C16.25,14.5 18.5,17.12 18.5,18.67M4,17.36C3.86,16.82 4.18,16.25 4.73,16.11L7,15.5L5.33,13.86C4.93,13.46 4.93,12.81 5.33,12.4C5.73,12 6.4,12 6.79,12.4L8.45,14.05L9.04,11.8C9.18,11.24 9.75,10.92 10.29,11.07C10.85,11.21 11.17,11.78 11,12.33L10.42,14.58L12.67,14C13.22,13.83 13.79,14.15 13.93,14.71C14.08,15.25 13.76,15.82 13.2,15.96L10.95,16.55L12.6,18.21C13,18.6 13,19.27 12.6,19.67C12.2,20.07 11.54,20.07 11.15,19.67L9.5,18L8.89,20.27C8.75,20.83 8.18,21.14 7.64,21C7.08,20.86 6.77,20.29 6.91,19.74L7.5,17.5L5.26,18.09C4.71,18.23 4.14,17.92 4,17.36M1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,11.85 3.35,12.61 3.91,13.16C4.27,13.55 4.26,14.16 3.88,14.54C3.5,14.93 2.85,14.93 2.47,14.54C1.56,13.63 1,12.38 1,11Z",
  "weather-lightning": "M6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14H7A1,1 0 0,1 8,15A1,1 0 0,1 7,16H6M12,11H15L13,15H15L11.25,22L12,17H9.5L12,11Z",
  "weather-lightning-rainy": "M4.5,13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.44 4,15.6 3.5,15.33V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59M9.5,11H12.5L10.5,15H12.5L8.75,22L9.5,17H7L9.5,11M17.5,18.67C17.5,19.96 16.5,21 15.25,21C14,21 13,19.96 13,18.67C13,17.12 15.25,14.5 15.25,14.5C15.25,14.5 17.5,17.12 17.5,18.67Z",
  "weather-windy": "M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z",
  "weather-hail": "M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M10,18A2,2 0 0,1 12,20A2,2 0 0,1 10,22A2,2 0 0,1 8,20A2,2 0 0,1 10,18M14.5,16A1.5,1.5 0 0,1 16,17.5A1.5,1.5 0 0,1 14.5,19A1.5,1.5 0 0,1 13,17.5A1.5,1.5 0 0,1 14.5,16M10.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,15A1.5,1.5 0 0,1 9,13.5A1.5,1.5 0 0,1 10.5,12Z",
  "weather-exceptional": "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
}, S1 = Object.keys(B);
function w({ name: e, size: t = "md", tone: n, label: r, className: a }) {
  return /* @__PURE__ */ s("svg", { "data-icon": e, className: h("vs-icon", `vs-icon--${t}`, n && `vs-icon--${n}`, a), viewBox: "0 0 24 24", focusable: "false", ...r ? { role: "img", "aria-label": r } : { "aria-hidden": !0 }, children: /* @__PURE__ */ s("path", { d: B[e], fill: "currentColor" }) });
}
function V1({ variant: e, size: t, pressed: n, icon: r, indicator: a, className: l, type: o = "button", children: c, ...i }) {
  const u = r ? /* @__PURE__ */ s(w, { name: r, size: "sm" }) : null, v = a === "lamp" && n ? /* @__PURE__ */ s(w, { name: "dot", size: "md", tone: "lamp", className: "vs-button__lamp" }) : null;
  return /* @__PURE__ */ d("button", { type: o, className: h("vs-button", e && `vs-button--${e}`, t === "sm" && "vs-button--sm", u && "vs-button--icon", a && `vs-button--${a}`, l), "aria-pressed": n, ...i, children: [
    v,
    u,
    c
  ] });
}
function P1({ children: e, onClick: t, onHold: n, holdMs: r = 500, pressed: a, icon: l, indicator: o, more: c, className: i }) {
  const u = p(void 0), v = p(!1), C = () => clearTimeout(u.current);
  M(() => C, []);
  const _ = () => {
    v.current = !1, n && (u.current = setTimeout(() => {
      v.current = !0, n();
    }, r));
  }, f = () => {
    if (v.current) {
      v.current = !1;
      return;
    }
    t();
  };
  return /* @__PURE__ */ d("span", { className: h("vs-split", o && `vs-split--${o}`, i), "data-pressed": a || void 0, children: [
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": a,
        onClick: f,
        onPointerDown: _,
        onPointerUp: C,
        onPointerLeave: C,
        onPointerCancel: C,
        onContextMenu: n ? (b) => b.preventDefault() : void 0,
        children: [
          o === "lamp" && a && /* @__PURE__ */ s(w, { name: "dot", size: "md", tone: "lamp", className: "vs-split__lamp" }),
          l && /* @__PURE__ */ s(w, { name: l, size: "sm" }),
          e
        ]
      }
    ),
    /* @__PURE__ */ s("button", { type: "button", className: "vs-split__more", "aria-label": c.label, title: c.label, "aria-haspopup": "dialog", onClick: c.onClick, children: /* @__PURE__ */ s(w, { name: c.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function E1({ pressed: e, onClick: t, children: n, className: r, title: a }) {
  return /* @__PURE__ */ s("button", { type: "button", className: h("vs-chip", r), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: a, children: n });
}
function I1({ icon: e, label: t, size: n = "md", variant: r = "plain", className: a, type: l = "button", ...o }) {
  return /* @__PURE__ */ s("button", { type: l, "aria-label": t, title: t, className: h("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${r}`, a), ...o, children: /* @__PURE__ */ s(w, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function s1(e) {
  const t = p(null), [n, r] = g(""), a = x(() => {
    const l = t.current;
    if (!l || !e) return;
    const o = l.scrollTop > 1, c = l.scrollTop + l.clientHeight < l.scrollHeight - 1;
    r([o && "top", c && "bottom"].filter(Boolean).join(" "));
  }, [e]);
  return T(a), T(() => {
    const l = t.current;
    if (!l || !e || typeof ResizeObserver > "u") return;
    const o = new ResizeObserver(a);
    return o.observe(l), () => o.disconnect();
  }, [e, a]), { ref: t, fade: n, measure: a };
}
function O1({ label: e, aside: t, tone: n = "default", children: r, footer: a, scroll: l, dimmed: o, className: c, ...i }) {
  const u = K(), { ref: v, fade: C, measure: _ } = s1(!!l), f = h("vs-tile", `vs-tile--${n}`, o && "vs-tile--dimmed", c), b = /* @__PURE__ */ d($, { children: [
    e && t != null ? /* @__PURE__ */ d("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ s("div", { id: u, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ s("div", { className: "vs-tile__aside", children: t })
    ] }) : e && /* @__PURE__ */ s("div", { id: u, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ s(
      "div",
      {
        ref: v,
        className: h("vs-tile__body", l && "vs-tile__body--scroll"),
        "data-fade": l && C ? C : void 0,
        onScroll: l ? _ : void 0,
        children: r
      }
    ),
    a && /* @__PURE__ */ s("div", { className: "vs-tile__footer", children: a })
  ] });
  return /* @__PURE__ */ s("section", { className: f, "aria-labelledby": e ? u : void 0, ...i, children: b });
}
function V({ variant: e = "body", tone: t = "default", weight: n, as: r = "span", lines: a, className: l, title: o, children: c }) {
  return /* @__PURE__ */ s(
    r,
    {
      className: h("vs-text", `vs-text--${e}`, t !== "default" && `vs-text--${t}`, n && `vs-text--w-${n}`, a && `vs-text--lines-${a}`, l),
      title: o,
      children: c
    }
  );
}
function Z1({ gap: e = "2", align: t = "center", justify: n, wrap: r, rigid: a, as: l = "div", className: o, children: c }) {
  return /* @__PURE__ */ s(l, { className: h("vs-cluster", `vs-cluster--gap-${e}`, `vs-cluster--align-${t}`, n && `vs-cluster--justify-${n}`, r && "vs-cluster--wrap", a && "vs-cluster--rigid", o), children: c });
}
function D1({ gap: e = "2", align: t, as: n = "div", className: r, children: a }) {
  return /* @__PURE__ */ s(n, { className: h("vs-stack", `vs-stack--gap-${e}`, t && `vs-stack--align-${t}`, r), children: a });
}
function R1({ vertical: e, className: t }) {
  return /* @__PURE__ */ s("span", { role: "separator", "aria-orientation": e ? "vertical" : "horizontal", className: h("vs-divider", e && "vs-divider--vertical", t) });
}
function z1({ children: e, className: t }) {
  return /* @__PURE__ */ s("ul", { className: h("vs-control-list", t), children: e });
}
function B1({ label: e, control: t, children: n, className: r }) {
  return /* @__PURE__ */ d("li", { className: h("vs-control-row", r), children: [
    /* @__PURE__ */ s("span", { className: "vs-control-row__label", children: e }),
    /* @__PURE__ */ s("span", { className: "vs-control-row__control", children: t }),
    n && /* @__PURE__ */ s("div", { className: "vs-control-row__extra", children: n })
  ] });
}
function U1({ children: e, size: t = "lg", weight: n = "medium", tone: r, align: a, className: l }) {
  return /* @__PURE__ */ s("div", { className: h("vs-clock", `vs-clock--${t}`, `vs-clock--w-${n}`, r === "soft" && "vs-clock--soft", a === "center" && "vs-clock--center", l), children: e });
}
function j1({ src: e, alt: t = "", size: n = "md", className: r }) {
  return /* @__PURE__ */ s("img", { className: h("vs-artwork", `vs-artwork--${n}`, r), src: e, alt: t });
}
function r1(e) {
  const t = x((n) => {
    const r = window.matchMedia(e);
    return r.addEventListener("change", n), () => r.removeEventListener("change", n);
  }, [e]);
  return Q(t, () => window.matchMedia(e).matches, () => !1);
}
const a1 = 1e3;
let P = 0, E = !1, U;
function y() {
  E = !1, clearTimeout(U), window.removeEventListener("click", y);
}
function D() {
  y(), E = !0, U = setTimeout(y, a1), window.addEventListener("click", y);
}
function j() {
  return P += 1, document.addEventListener("pointerdown", D, !0), () => {
    P -= 1, document.removeEventListener("pointerdown", D, !0);
  };
}
const l1 = () => P > 0 || E;
function o1(e, t) {
  const n = p(t);
  n.current = t, M(() => {
    const r = window.CloseWatcher;
    if (!e || !r || !/Android/i.test(navigator.userAgent)) return;
    let a;
    const l = () => {
      a = new r(), a.onclose = () => {
        n.current() === !1 && l();
      };
    };
    return l(), () => a.destroy();
  }, [e]);
}
const c1 = "(max-width: 760px)";
function i1(e) {
  return (t, n) => {
    if (!t) {
      if (n.reason === "outside-press" && l1()) {
        n.cancel();
        return;
      }
      e() === !1 && n.cancel();
    }
  };
}
function u1({ open: e, onRequestClose: t, head: n, actions: r, footer: a, children: l, scrollKey: o, className: c }) {
  const i = r1(c1), u = p(null);
  M(() => {
    u.current && (u.current.scrollTop = 0);
  }, [o]);
  const v = p(!1), C = p(void 0), _ = p(t);
  _.current = t;
  const f = p(() => (v.current || (v.current = !0, setTimeout(() => {
    v.current = !1;
  }, 0), C.current = _.current()), C.current)).current;
  o1(e, f);
  const b = i1(f), I = (G) => {
    G.pointerType === "touch" && f();
  }, O = i ? L : H, Z = /* @__PURE__ */ d($, { children: [
    /* @__PURE__ */ d("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(O.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ d("span", { className: "vs-sheet__actions", children: [
        r,
        /* @__PURE__ */ s(O.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: u, className: "vs-sheet__body", children: l }),
    a != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: a })
  ] });
  return i ? /* @__PURE__ */ s(L.Root, { open: e, onOpenChange: b, children: /* @__PURE__ */ s(L.VirtualKeyboardProvider, { children: /* @__PURE__ */ d(L.Portal, { children: [
    /* @__PURE__ */ s(L.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: I }),
    /* @__PURE__ */ s(L.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ d(L.Popup, { className: h("vs-sheet", "vs-sheet--drawer", c), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(L.Content, { className: "vs-sheet__content", children: Z })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(H.Root, { open: e, onOpenChange: b, children: /* @__PURE__ */ d(H.Portal, { children: [
    /* @__PURE__ */ s(H.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: I }),
    /* @__PURE__ */ s(H.Popup, { className: h("vs-sheet", c), children: Z })
  ] }) });
}
function F1({ children: e, title: t, className: n }) {
  const r = p(null), [a, l] = g(!1), [o, c] = g(!1);
  T(() => {
    const u = r.current;
    if (!u) return;
    const v = () => l(u.scrollHeight > u.clientHeight + 1);
    if (v(), typeof ResizeObserver > "u") return;
    const C = new ResizeObserver(v);
    return C.observe(u), () => C.disconnect();
  }, [e]);
  const i = !!r.current?.closest(".vs-kiosk");
  return /* @__PURE__ */ d($, { children: [
    /* @__PURE__ */ s(
      "div",
      {
        ref: r,
        className: h("vs-excerpt", n),
        "data-more": a ? "" : void 0,
        role: a ? "button" : void 0,
        tabIndex: a ? 0 : void 0,
        onClick: a ? () => c(!0) : void 0,
        children: e
      }
    ),
    o && /* @__PURE__ */ s(u1, { open: !0, onRequestClose: () => c(!1), className: i ? "vs-kiosk" : void 0, head: /* @__PURE__ */ s(V, { variant: "display", children: t }), children: /* @__PURE__ */ s(V, { as: "p", variant: "lead", className: "vs-excerpt__full", children: e }) })
  ] });
}
function G1({ value: e, unit: t, icon: n, caption: r, size: a = "lg", tone: l = "default", className: o }) {
  return /* @__PURE__ */ d("div", { className: h("vs-stat", `vs-stat--${a}`, `vs-stat--${l}`, o), children: [
    /* @__PURE__ */ d("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ s("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ s("span", { className: "vs-stat__unit", children: t }),
      n && /* @__PURE__ */ s("span", { className: "vs-stat__icon", children: /* @__PURE__ */ s(w, { name: n.name, size: "em", label: n.label }) })
    ] }),
    r && /* @__PURE__ */ s("div", { className: "vs-stat__caption", children: r })
  ] });
}
function K1({ children: e, label: t, max: n, empty: r, className: a }) {
  const l = W.toArray(e);
  if (!l.length) return r ? /* @__PURE__ */ s("div", { className: h("vs-list-empty", a), children: r }) : null;
  const o = n ? l.slice(0, n) : l;
  return /* @__PURE__ */ d("div", { className: h("vs-list-wrap", a), children: [
    t && /* @__PURE__ */ s(V, { as: "p", variant: "label", className: "vs-list__label", children: t }),
    /* @__PURE__ */ s("ul", { className: "vs-list", children: o }),
    n && l.length > n && /* @__PURE__ */ d("div", { className: "vs-list-more", children: [
      "ещё ",
      l.length - n
    ] })
  ] });
}
function Q1({ title: e, titleLines: t = 1, sub: n, subTone: r = "muted", subLines: a = 1, meta: l, lead: o, tone: c = "default", onClick: i }) {
  const u = /* @__PURE__ */ d($, { children: [
    o && /* @__PURE__ */ s("span", { className: "vs-list-row__lead", children: o }),
    n != null ? /* @__PURE__ */ d("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ s("span", { className: h("vs-list-row__name", t === 2 && "vs-list-row__name--2"), children: e }),
      /* @__PURE__ */ s("span", { className: h("vs-list-row__sub", `vs-list-row__sub--${r}`, a > 1 && `vs-list-row__sub--${a}`), children: n })
    ] }) : /* @__PURE__ */ s("span", { className: h("vs-list-row__title", t === 2 && "vs-list-row__title--2"), children: e }),
    l && /* @__PURE__ */ s("span", { className: "vs-list-row__meta", children: l })
  ] });
  return /* @__PURE__ */ s("li", { className: h("vs-list-row", `vs-list-row--${c}`, n != null && "vs-list-row--two"), children: i ? /* @__PURE__ */ s("button", { type: "button", className: "vs-list-row__inner", onClick: i, children: u }) : /* @__PURE__ */ s("div", { className: "vs-list-row__inner", children: u }) });
}
function W1({ tone: e = "warn", truncate: t, children: n, className: r }) {
  return /* @__PURE__ */ d("div", { role: "status", className: h("vs-banner", `vs-banner--${e}`, t && "vs-banner--truncate", r), children: [
    /* @__PURE__ */ s(w, { name: "alert", size: "sm" }),
    /* @__PURE__ */ s("span", { className: "vs-banner__text", children: n })
  ] });
}
function Y1({ options: e, value: t, onChange: n, ariaLabel: r, variant: a = "default" }) {
  return /* @__PURE__ */ s("div", { className: h("vs-segment", a === "soft" && "vs-segment--soft"), role: "group", "aria-label": r, children: e.map((l) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": l.value === t, onClick: () => n(l.value), children: l.label }, l.value)) });
}
const k = (e) => e.stopPropagation();
function q1({ checked: e, onChange: t, label: n, icon: r, title: a, size: l = "md", disabled: o }) {
  return /* @__PURE__ */ d("label", { className: h("vs-switch", l === "sm" && "vs-switch--sm"), title: a, onClick: k, onKeyDown: k, onPointerDown: k, onMouseDown: k, onTouchStart: k, children: [
    r != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: r }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: o, onChange: (c) => t(c.target.checked) })
  ] });
}
function J1({ value: e, min: t = 1, max: n = 100, step: r = 1, label: a, onCommit: l, format: o = String }) {
  const [c, i] = g(e), u = p(!1), v = p(e);
  M(() => {
    v.current = e, u.current || i(e);
  }, [e]);
  const C = () => {
    u.current = !1, c !== v.current && (v.current = c, l(c));
  }, _ = `${(c - t) / (n - t) * 100}%`;
  return /* @__PURE__ */ d("label", { className: "vs-slider", style: { "--vs-slider-fill": _ }, children: [
    /* @__PURE__ */ s(
      "input",
      {
        type: "range",
        "aria-label": a,
        min: t,
        max: n,
        step: r,
        value: c,
        onPointerDown: () => {
          u.current = !0;
        },
        onChange: (f) => i(Number(f.target.value)),
        onPointerUp: C,
        onPointerCancel: C,
        onKeyUp: C,
        onTouchEnd: C
      }
    ),
    /* @__PURE__ */ s("span", { className: "vs-slider__value", children: o(c) })
  ] });
}
function d1(e, t) {
  return t instanceof S && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function X1() {
  return new J({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: d1 },
      mutations: { retry: !1 }
    }
  });
}
const F = q(null);
function ee({ children: e, duration: t = 3500 }) {
  const [n, r] = g(null), a = p(void 0), l = x((o) => {
    clearTimeout(a.current), r((c) => ({ text: o, id: (c?.id ?? 0) + 1 })), a.current = setTimeout(() => r(null), t);
  }, [t]);
  return M(() => () => clearTimeout(a.current), []), /* @__PURE__ */ d(F.Provider, { value: l, children: [
    e,
    n && X(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function te() {
  const e = Y(F);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function ne({ value: e, onChange: t, options: n, label: r, className: a, disabled: l }) {
  const [o, c] = g(!1);
  return M(() => o ? j() : void 0, [o]), /* @__PURE__ */ s(z, { disableStyleElements: !0, children: /* @__PURE__ */ d(A.Root, { open: o, onOpenChange: c, value: e, onValueChange: (i) => {
    i !== null && t(i);
  }, items: n, disabled: l, children: [
    /* @__PURE__ */ d("div", { className: h("vs-select", a), children: [
      /* @__PURE__ */ s(A.Label, { className: "vs-select__label", children: r }),
      /* @__PURE__ */ d(A.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(A.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(A.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ s(A.Portal, { children: /* @__PURE__ */ s(A.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(A.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(A.List, { className: "vs-select__list", children: n.map((i) => /* @__PURE__ */ d(A.Item, { value: i.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(A.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ s(A.ItemText, { children: i.label })
    ] }, i.value)) }) }) }) })
  ] }) });
}
const h1 = 1500;
function v1({ item: e }) {
  return "options" in e ? /* @__PURE__ */ d(m.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ s(m.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ s(m.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ d(m.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ s(m.RadioItemIndicator, { className: "vs-menu__check", children: "✓" }),
      /* @__PURE__ */ s("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ d(m.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ s(m.CheckboxItemIndicator, { className: "vs-menu__check", children: "✓" }),
    /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ s(m.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label }) });
}
function se({ items: e, children: t, longPress: n = !0, disabled: r, className: a }) {
  const [l, o] = g(!1);
  M(() => l ? j() : void 0, [l]);
  const c = p(0), i = n ? {} : {
    onTouchStart: (u) => {
      c.current = Date.now(), u.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (u) => {
      (u.nativeEvent.pointerType === "touch" || Date.now() - c.current < h1) && u.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(z, { disableStyleElements: !0, children: /* @__PURE__ */ d(m.Root, { open: l, onOpenChange: o, disabled: r, children: [
    /* @__PURE__ */ s(m.Trigger, { render: t, ...i }),
    /* @__PURE__ */ s(m.Portal, { children: /* @__PURE__ */ s(m.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(m.Popup, { className: h("vs-menu", a), children: e.map((u, v) => u === "separator" ? /* @__PURE__ */ s(m.Separator, { className: "vs-menu__separator" }, v) : /* @__PURE__ */ s(v1, { item: u }, v)) }) }) })
  ] }) });
}
const R = {
  get(e, t) {
    try {
      return localStorage.getItem(e) ?? t;
    } catch {
      return t;
    }
  },
  set(e, t) {
    try {
      localStorage.setItem(e, t);
    } catch {
    }
  }
};
function re(e, t) {
  const [n, r] = g(() => R.get(e, t)), a = x((l) => {
    r(l), R.set(e, l);
  }, [e]);
  return [n, a];
}
export {
  S as ApiError,
  j1 as Artwork,
  W1 as Banner,
  V1 as Button,
  E1 as Chip,
  U1 as Clock,
  Z1 as Cluster,
  se as ContextMenu,
  z1 as ControlList,
  B1 as ControlRow,
  R1 as Divider,
  F1 as Excerpt,
  S1 as ICON_NAMES,
  w as Icon,
  I1 as IconButton,
  K1 as List,
  Q1 as ListRow,
  Y1 as Segment,
  ne as Select,
  u1 as Sheet,
  J1 as Slider,
  P1 as SplitButton,
  D1 as Stack,
  G1 as Stat,
  q1 as Switch,
  V as Text,
  O1 as Tile,
  ee as ToastProvider,
  T1 as api,
  $1 as clampText,
  y1 as compact,
  X1 as createQueryClient,
  h as cx,
  M1 as fmtDate,
  b1 as fmtDay,
  x1 as linkify,
  H1 as localToday,
  k1 as plural,
  d1 as shouldRetry,
  R as storage,
  re as useLocalStorage,
  r1 as useMediaQuery,
  te as useToast
};
