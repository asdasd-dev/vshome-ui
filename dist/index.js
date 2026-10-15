import { c as d } from "./cx.js";
import { jsx as s, jsxs as v, Fragment as k } from "react/jsx-runtime";
import { useRef as _, useEffect as M, useId as Z, useState as w, useCallback as $, useLayoutEffect as T, useSyncExternalStore as W, Children as Y, useContext as q, createContext as J } from "react";
import { Dialog as H } from "@base-ui/react/dialog";
import { Drawer as b } from "@base-ui/react/drawer";
import { QueryClient as X } from "@tanstack/react-query";
import { createPortal as e1 } from "react-dom";
import { CSPProvider as B } from "@base-ui/react/csp-provider";
import { Select as L } from "@base-ui/react/select";
import { ContextMenu as A } from "@base-ui/react/context-menu";
const g = (e) => String(e).padStart(2, "0");
function x1(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${g(t.getDate())}.${g(t.getMonth() + 1)}.${t.getFullYear()} ${g(t.getHours())}:${g(t.getMinutes())}`;
}
function y1(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${g(t.getDate())}.${g(t.getMonth() + 1)}`;
}
function $1(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${g(e.getMonth() + 1)}-${g(e.getDate())}`;
}
function T1(e, t, n, r) {
  const a = Math.abs(Math.round(e)) % 100, l = a % 10;
  return l === 1 && a !== 11 ? t : l >= 2 && l <= 4 && (a < 12 || a > 14) ? n : r;
}
function V1(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function S1(e, t, n) {
  const r = e.split(`
`);
  let a = 0, l = r.length;
  for (let o = 0; o < r.length; o++)
    if (r[o].trim() && a++, a === t) {
      l = o + 1;
      break;
    }
  let c = r.slice(0, l).join(`
`), i = l < r.length && r.slice(l).some((o) => o.trim());
  if (c.length > n) {
    const o = c.slice(0, n + 1), u = o.lastIndexOf(" ");
    c = u > 0 ? o.slice(0, u) : c.slice(0, n), i = !0;
  }
  return i ? { text: c.trimEnd() + "…", cut: i } : { text: c, cut: i };
}
const t1 = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, s1 = /[.,;:!?)»"']+$/;
function P1(e) {
  const t = [];
  let n = 0;
  for (const r of e.matchAll(t1)) {
    const a = r.index;
    let l = r[2] ?? r[0], c = r[1] ?? l, i = a + r[0].length;
    if (!r[2]) {
      const o = s1.exec(l)?.[0] ?? "";
      l = l.slice(0, l.length - o.length), c = l, i -= o.length;
    }
    a > n && t.push({ text: e.slice(n, a) }), t.push({ url: l, text: c }), n = i;
  }
  return n < e.length && t.push({ text: e.slice(n) }), t;
}
class V extends Error {
  status;
  data;
  constructor(t, n, r) {
    super(t), this.name = "ApiError", this.status = n, this.data = r;
  }
}
function n1(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function Z1(e, t, n) {
  let r;
  try {
    r = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: n === void 0 ? {} : { "Content-Type": "application/json" },
      body: n === void 0 ? void 0 : JSON.stringify(n)
    });
  } catch {
    throw new V("нет связи с сервером", 0, null);
  }
  const a = await r.json().catch(() => ({}));
  if (!r.ok) throw new V(n1(a, r.status), r.status, a);
  return a;
}
const F = {
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
  "weather-exceptional": "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",
  close: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  "chevron-down": "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
  search: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z",
  "arrow-left": "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",
  plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
}, I1 = Object.keys(F);
function p({ name: e, size: t = "md", tone: n, label: r, className: a }) {
  return /* @__PURE__ */ s("svg", { "data-icon": e, className: d("vs-icon", `vs-icon--${t}`, n && `vs-icon--${n}`, a), viewBox: "0 0 24 24", focusable: "false", ...r ? { role: "img", "aria-label": r } : { "aria-hidden": !0 }, children: /* @__PURE__ */ s("path", { d: F[e], fill: "currentColor" }) });
}
function r1({ size: e = "md", label: t, className: n }) {
  return /* @__PURE__ */ s("span", { className: d("vs-spinner", `vs-spinner--${e}`, n), ...t ? { role: "status", "aria-label": t } : { "aria-hidden": !0 } });
}
function E1({ variant: e = "secondary", size: t, shape: n, block: r, loading: a, pressed: l, icon: c, indicator: i, disabled: o, className: u, type: h = "button", children: m, ...C }) {
  const f = a ? /* @__PURE__ */ s(r1, { size: "sm" }) : c ? /* @__PURE__ */ s(p, { name: c, size: "sm" }) : null, N = i === "lamp" && l ? /* @__PURE__ */ s(p, { name: "dot", size: "md", tone: "lamp", className: "vs-button__lamp" }) : null;
  return /* @__PURE__ */ v(
    "button",
    {
      type: h,
      disabled: o || a,
      "aria-busy": a || void 0,
      "aria-pressed": l,
      className: d("vs-button", `vs-button--${e}`, t && t !== "md" && `vs-button--${t}`, n === "pill" && "vs-button--pill", r && "vs-button--block", f && "vs-button--icon", i && `vs-button--${i}`, u),
      ...C,
      children: [
        N,
        f,
        m
      ]
    }
  );
}
function z1({ children: e, onClick: t, onHold: n, holdMs: r = 500, pressed: a, icon: l, indicator: c, more: i, className: o }) {
  const u = _(void 0), h = _(!1), m = () => clearTimeout(u.current);
  M(() => m, []);
  const C = () => {
    h.current = !1, n && (u.current = setTimeout(() => {
      h.current = !0, n();
    }, r));
  }, f = () => {
    if (h.current) {
      h.current = !1;
      return;
    }
    t();
  };
  return /* @__PURE__ */ v("span", { className: d("vs-split", c && `vs-split--${c}`, o), "data-pressed": a || void 0, children: [
    /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": a,
        onClick: f,
        onPointerDown: C,
        onPointerUp: m,
        onPointerLeave: m,
        onPointerCancel: m,
        onContextMenu: n ? (N) => N.preventDefault() : void 0,
        children: [
          c === "lamp" && a && /* @__PURE__ */ s(p, { name: "dot", size: "md", tone: "lamp", className: "vs-split__lamp" }),
          l && /* @__PURE__ */ s(p, { name: l, size: "sm" }),
          e
        ]
      }
    ),
    /* @__PURE__ */ s("button", { type: "button", className: "vs-split__more", "aria-label": i.label, title: i.label, "aria-haspopup": "dialog", onClick: i.onClick, children: /* @__PURE__ */ s(p, { name: i.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function a1({ children: e, tone: t = "accent", max: n, dot: r, label: a, className: l }) {
  if (r) return /* @__PURE__ */ s("span", { className: d("vs-badge", `vs-badge--${t}`, "vs-badge--dot", l), role: "img", "aria-label": a });
  const c = typeof e == "number" && n != null && e > n ? `${n}+` : e;
  return /* @__PURE__ */ s("span", { className: d("vs-badge", `vs-badge--${t}`, l), "aria-label": a, children: c });
}
function l1({ children: e, pressed: t, onClick: n, href: r, size: a = "md", disabled: l, count: c, title: i, className: o }) {
  const u = d("vs-chip", a === "sm" && "vs-chip--sm", o), h = /* @__PURE__ */ v(k, { children: [
    e,
    c != null && /* @__PURE__ */ s(a1, { tone: t ? "accent" : "muted", children: c })
  ] });
  return r != null ? /* @__PURE__ */ s("a", { className: u, href: r, title: i, "aria-current": t ? "page" : void 0, children: h }) : /* @__PURE__ */ s("button", { type: "button", className: u, "aria-pressed": t === void 0 ? void 0 : t, onClick: n, title: i, disabled: l, children: h });
}
function O1({ options: e, value: t, onChange: n, label: r, scroll: a, size: l, className: c }) {
  return /* @__PURE__ */ s("div", { role: "group", "aria-label": r, className: d("vs-chip-group", a && "vs-chip-group--scroll", c), children: e.map((i) => /* @__PURE__ */ s(l1, { size: l, pressed: i.value === t, count: i.count, onClick: () => n(i.value), children: i.label }, i.value)) });
}
function D1({ children: e, tone: t = "default", variant: n = "soft", size: r = "md", icon: a, className: l }) {
  return /* @__PURE__ */ v("span", { className: d("vs-tag", `vs-tag--${t}`, `vs-tag--${n}`, `vs-tag--${r}`, l), children: [
    a && /* @__PURE__ */ s(p, { name: a, size: "em" }),
    e
  ] });
}
function R1({ children: e, href: t, onClick: n, tone: r = "accent", external: a, underline: l = "hover", title: c, className: i }) {
  const o = d("vs-link", `vs-link--${r}`, `vs-link--underline-${l}`, i);
  return t == null ? /* @__PURE__ */ s("button", { type: "button", className: o, onClick: n, title: c, children: e }) : /* @__PURE__ */ v("a", { className: o, href: t, onClick: n, title: c, ...a ? { target: "_blank", rel: "noopener noreferrer" } : {}, children: [
    e,
    a && /* @__PURE__ */ s(p, { name: "external", size: "em", className: "vs-link__external" })
  ] });
}
function U({ label: e, hint: t, error: n, hideLabel: r, className: a, children: l }) {
  const c = Z(), i = t ? `${c}-hint` : void 0, o = n ? `${c}-error` : void 0, u = [i, o].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ v("div", { className: d("vs-field", a), children: [
    /* @__PURE__ */ s("label", { htmlFor: c, className: d("vs-field__label", r && "vs-visually-hidden"), children: e }),
    /* @__PURE__ */ s("div", { className: "vs-field__control", children: l({ id: c, "aria-describedby": u, ...n ? { "aria-invalid": !0 } : {} }) }),
    t && /* @__PURE__ */ s("p", { id: i, className: "vs-field__hint", children: t }),
    n && /* @__PURE__ */ s("p", { id: o, className: "vs-field__error", children: n })
  ] });
}
function B1({ label: e, hint: t, error: n, hideLabel: r, value: a, onChange: l, size: c = "md", variant: i = "default", className: o, type: u = "text", ...h }) {
  const m = u === "search";
  return /* @__PURE__ */ s(U, { label: e, hint: t, error: n, hideLabel: r, className: o, children: (C) => /* @__PURE__ */ v(k, { children: [
    m && /* @__PURE__ */ s(p, { name: "search", size: "sm", className: "vs-text-field__icon" }),
    /* @__PURE__ */ s(
      "input",
      {
        ...h,
        ...C,
        type: u,
        value: a,
        onChange: (f) => l(f.target.value),
        className: d("vs-text-field", `vs-text-field--${i}`, c === "sm" && "vs-text-field--sm", m && "vs-text-field--with-icon")
      }
    )
  ] }) });
}
function F1({ label: e, hint: t, error: n, hideLabel: r, value: a, onChange: l, size: c = "md", variant: i = "default", className: o, rows: u = 3, ...h }) {
  return /* @__PURE__ */ s(U, { label: e, hint: t, error: n, hideLabel: r, className: o, children: (m) => /* @__PURE__ */ s(
    "textarea",
    {
      ...h,
      ...m,
      rows: u,
      value: a,
      onChange: (C) => l(C.target.value),
      className: d("vs-text-field", "vs-text-field--area", `vs-text-field--${i}`, c === "sm" && "vs-text-field--sm")
    }
  ) });
}
function U1({ checked: e, onChange: t, label: n, hint: r, size: a = "md", disabled: l, className: c }) {
  return /* @__PURE__ */ v("label", { className: d("vs-checkbox", `vs-checkbox--${a}`, c), children: [
    /* @__PURE__ */ v("span", { className: "vs-checkbox__box", children: [
      /* @__PURE__ */ s("input", { type: "checkbox", className: "vs-checkbox__input", checked: e, disabled: l, onChange: (i) => t(i.target.checked) }),
      /* @__PURE__ */ s(p, { name: "check", size: "em", className: "vs-checkbox__mark" })
    ] }),
    /* @__PURE__ */ v("span", { className: "vs-checkbox__text", children: [
      n,
      r && /* @__PURE__ */ s("span", { className: "vs-checkbox__hint", children: r })
    ] })
  ] });
}
function j1({ legend: e, options: t, value: n, onChange: r, direction: a = "column", hideLegend: l, className: c }) {
  const i = Z();
  return /* @__PURE__ */ v("fieldset", { className: d("vs-radio-group", `vs-radio-group--${a}`, c), children: [
    /* @__PURE__ */ s("legend", { className: d("vs-radio-group__legend", l && "vs-visually-hidden"), children: e }),
    t.map((o) => /* @__PURE__ */ v("label", { className: "vs-radio", children: [
      /* @__PURE__ */ s("input", { type: "radio", className: "vs-radio__input", name: i, value: o.value, checked: o.value === n, disabled: o.disabled, onChange: () => r(o.value) }),
      /* @__PURE__ */ v("span", { className: "vs-checkbox__text", children: [
        o.label,
        o.hint && /* @__PURE__ */ s("span", { className: "vs-checkbox__hint", children: o.hint })
      ] })
    ] }, o.value))
  ] });
}
function G1({ icon: e, label: t, size: n = "md", variant: r = "plain", className: a, type: l = "button", ...c }) {
  return /* @__PURE__ */ s("button", { type: l, "aria-label": t, title: t, className: d("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${r}`, a), ...c, children: /* @__PURE__ */ s(p, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function c1(e) {
  const t = _(null), [n, r] = w(""), a = $(() => {
    const l = t.current;
    if (!l || !e) return;
    const c = l.scrollTop > 1, i = l.scrollTop + l.clientHeight < l.scrollHeight - 1;
    r([c && "top", i && "bottom"].filter(Boolean).join(" "));
  }, [e]);
  return T(a), T(() => {
    const l = t.current;
    if (!l || !e || typeof ResizeObserver > "u") return;
    const c = new ResizeObserver(a);
    return c.observe(l), () => c.disconnect();
  }, [e, a]), { ref: t, fade: n, measure: a };
}
function K1({ label: e, aside: t, tone: n = "default", children: r, footer: a, scroll: l, dimmed: c, className: i, ...o }) {
  const u = Z(), { ref: h, fade: m, measure: C } = c1(!!l), f = d("vs-tile", `vs-tile--${n}`, c && "vs-tile--dimmed", i), N = /* @__PURE__ */ v(k, { children: [
    e && t != null ? /* @__PURE__ */ v("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ s("div", { id: u, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ s("div", { className: "vs-tile__aside", children: t })
    ] }) : e && /* @__PURE__ */ s("div", { id: u, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ s(
      "div",
      {
        ref: h,
        className: d("vs-tile__body", l && "vs-tile__body--scroll"),
        "data-fade": l && m ? m : void 0,
        onScroll: l ? C : void 0,
        children: r
      }
    ),
    a && /* @__PURE__ */ s("div", { className: "vs-tile__footer", children: a })
  ] });
  return /* @__PURE__ */ s("section", { className: f, "aria-labelledby": e ? u : void 0, ...o, children: N });
}
function S({ variant: e = "body", tone: t = "default", weight: n, as: r = "span", lines: a, className: l, title: c, children: i }) {
  return /* @__PURE__ */ s(
    r,
    {
      className: d("vs-text", `vs-text--${e}`, t !== "default" && `vs-text--${t}`, n && `vs-text--w-${n}`, a && `vs-text--lines-${a}`, l),
      title: c,
      children: i
    }
  );
}
function Q1({ gap: e = "2", align: t = "center", justify: n, wrap: r, rigid: a, as: l = "div", className: c, children: i }) {
  return /* @__PURE__ */ s(l, { className: d("vs-cluster", `vs-cluster--gap-${e}`, `vs-cluster--align-${t}`, n && `vs-cluster--justify-${n}`, r && "vs-cluster--wrap", a && "vs-cluster--rigid", c), children: i });
}
function W1({ gap: e = "2", align: t, as: n = "div", className: r, children: a }) {
  return /* @__PURE__ */ s(n, { className: d("vs-stack", `vs-stack--gap-${e}`, t && `vs-stack--align-${t}`, r), children: a });
}
function Y1({ vertical: e, className: t }) {
  return /* @__PURE__ */ s("span", { role: "separator", "aria-orientation": e ? "vertical" : "horizontal", className: d("vs-divider", e && "vs-divider--vertical", t) });
}
function q1({ children: e, className: t }) {
  return /* @__PURE__ */ s("ul", { className: d("vs-control-list", t), children: e });
}
function J1({ label: e, control: t, children: n, className: r }) {
  return /* @__PURE__ */ v("li", { className: d("vs-control-row", r), children: [
    /* @__PURE__ */ s("span", { className: "vs-control-row__label", children: e }),
    /* @__PURE__ */ s("span", { className: "vs-control-row__control", children: t }),
    n && /* @__PURE__ */ s("div", { className: "vs-control-row__extra", children: n })
  ] });
}
function X1({ children: e, size: t = "lg", weight: n = "medium", tone: r, align: a, className: l }) {
  return /* @__PURE__ */ s("div", { className: d("vs-clock", `vs-clock--${t}`, `vs-clock--w-${n}`, r === "soft" && "vs-clock--soft", a === "center" && "vs-clock--center", l), children: e });
}
function ee({ src: e, alt: t = "", size: n = "md", className: r }) {
  return /* @__PURE__ */ s("img", { className: d("vs-artwork", `vs-artwork--${n}`, r), src: e, alt: t });
}
function i1(e) {
  const t = $((n) => {
    const r = window.matchMedia(e);
    return r.addEventListener("change", n), () => r.removeEventListener("change", n);
  }, [e]);
  return W(t, () => window.matchMedia(e).matches, () => !1);
}
const o1 = 1e3;
let P = 0, I = !1, j;
function y() {
  I = !1, clearTimeout(j), window.removeEventListener("click", y);
}
function D() {
  y(), I = !0, j = setTimeout(y, o1), window.addEventListener("click", y);
}
function G() {
  return P += 1, document.addEventListener("pointerdown", D, !0), () => {
    P -= 1, document.removeEventListener("pointerdown", D, !0);
  };
}
const u1 = () => P > 0 || I;
function d1(e, t) {
  const n = _(t);
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
const v1 = "(max-width: 760px)";
function h1(e) {
  return (t, n) => {
    if (!t) {
      if (n.reason === "outside-press" && u1()) {
        n.cancel();
        return;
      }
      e() === !1 && n.cancel();
    }
  };
}
function m1({ open: e, onRequestClose: t, head: n, actions: r, footer: a, children: l, scrollKey: c, className: i }) {
  const o = i1(v1), u = _(null);
  M(() => {
    u.current && (u.current.scrollTop = 0);
  }, [c]);
  const h = _(!1), m = _(void 0), C = _(t);
  C.current = t;
  const f = _(() => (h.current || (h.current = !0, setTimeout(() => {
    h.current = !1;
  }, 0), m.current = C.current()), m.current)).current;
  d1(e, f);
  const N = h1(f), E = (Q) => {
    Q.pointerType === "touch" && f();
  }, z = o ? b : H, O = /* @__PURE__ */ v(k, { children: [
    /* @__PURE__ */ v("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(z.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ v("span", { className: "vs-sheet__actions", children: [
        r,
        /* @__PURE__ */ s(z.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: /* @__PURE__ */ s(p, { name: "close", size: "md" }) })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: u, className: "vs-sheet__body", children: l }),
    a != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: a })
  ] });
  return o ? /* @__PURE__ */ s(b.Root, { open: e, onOpenChange: N, children: /* @__PURE__ */ s(b.VirtualKeyboardProvider, { children: /* @__PURE__ */ v(b.Portal, { children: [
    /* @__PURE__ */ s(b.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: E }),
    /* @__PURE__ */ s(b.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ v(b.Popup, { className: d("vs-sheet", "vs-sheet--drawer", i), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(b.Content, { className: "vs-sheet__content", children: O })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(H.Root, { open: e, onOpenChange: N, children: /* @__PURE__ */ v(H.Portal, { children: [
    /* @__PURE__ */ s(H.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: E }),
    /* @__PURE__ */ s(H.Popup, { className: d("vs-sheet", i), children: O })
  ] }) });
}
function te({ children: e, title: t, className: n }) {
  const r = _(null), [a, l] = w(!1), [c, i] = w(!1);
  T(() => {
    const u = r.current;
    if (!u) return;
    const h = () => l(u.scrollHeight > u.clientHeight + 1);
    if (h(), typeof ResizeObserver > "u") return;
    const m = new ResizeObserver(h);
    return m.observe(u), () => m.disconnect();
  }, [e]);
  const o = !!r.current?.closest(".vs-kiosk");
  return /* @__PURE__ */ v(k, { children: [
    /* @__PURE__ */ s(
      "div",
      {
        ref: r,
        className: d("vs-excerpt", n),
        "data-more": a ? "" : void 0,
        role: a ? "button" : void 0,
        tabIndex: a ? 0 : void 0,
        onClick: a ? () => i(!0) : void 0,
        onKeyDown: a ? (u) => {
          (u.key === "Enter" || u.key === " ") && (u.preventDefault(), i(!0));
        } : void 0,
        children: e
      }
    ),
    c && /* @__PURE__ */ s(m1, { open: !0, onRequestClose: () => i(!1), className: o ? "vs-kiosk" : void 0, head: /* @__PURE__ */ s(S, { variant: "display", children: t }), children: /* @__PURE__ */ s(S, { as: "p", variant: "lead", className: "vs-excerpt__full", children: e }) })
  ] });
}
function se({ value: e, unit: t, icon: n, caption: r, size: a = "lg", tone: l = "default", className: c }) {
  return /* @__PURE__ */ v("div", { className: d("vs-stat", `vs-stat--${a}`, `vs-stat--${l}`, c), children: [
    /* @__PURE__ */ v("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ s("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ s("span", { className: "vs-stat__unit", children: t }),
      n && /* @__PURE__ */ s("span", { className: "vs-stat__icon", children: /* @__PURE__ */ s(p, { name: n.name, size: "em", label: n.label }) })
    ] }),
    r && /* @__PURE__ */ s("div", { className: "vs-stat__caption", children: r })
  ] });
}
function ne({ children: e, label: t, max: n, empty: r, className: a }) {
  const l = Y.toArray(e);
  if (!l.length) return r ? /* @__PURE__ */ s("div", { className: d("vs-list-empty", a), children: r }) : null;
  const c = n ? l.slice(0, n) : l;
  return /* @__PURE__ */ v("div", { className: d("vs-list-wrap", a), children: [
    t && /* @__PURE__ */ s(S, { as: "p", variant: "label", className: "vs-list__label", children: t }),
    /* @__PURE__ */ s("ul", { className: "vs-list", children: c }),
    n && l.length > n && /* @__PURE__ */ v("div", { className: "vs-list-more", children: [
      "ещё ",
      l.length - n
    ] })
  ] });
}
function re({ title: e, titleLines: t = 1, sub: n, subTone: r = "muted", subLines: a = 1, meta: l, lead: c, tone: i = "default", onClick: o, className: u }) {
  const h = /* @__PURE__ */ v(k, { children: [
    c && /* @__PURE__ */ s("span", { className: "vs-list-row__lead", children: c }),
    n != null ? /* @__PURE__ */ v("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ s("span", { className: d("vs-list-row__name", t === 2 && "vs-list-row__name--2"), children: e }),
      /* @__PURE__ */ s("span", { className: d("vs-list-row__sub", `vs-list-row__sub--${r}`, a > 1 && `vs-list-row__sub--${a}`), children: n })
    ] }) : /* @__PURE__ */ s("span", { className: d("vs-list-row__title", t === 2 && "vs-list-row__title--2"), children: e }),
    l && /* @__PURE__ */ s("span", { className: "vs-list-row__meta", children: l })
  ] });
  return /* @__PURE__ */ s("li", { className: d("vs-list-row", `vs-list-row--${i}`, n != null && "vs-list-row--two", u), children: o ? /* @__PURE__ */ s("button", { type: "button", className: "vs-list-row__inner", onClick: o, children: h }) : /* @__PURE__ */ s("div", { className: "vs-list-row__inner", children: h }) });
}
function ae({ tone: e = "warn", truncate: t, children: n, className: r }) {
  return /* @__PURE__ */ v("div", { role: "status", className: d("vs-banner", `vs-banner--${e}`, t && "vs-banner--truncate", r), children: [
    /* @__PURE__ */ s(p, { name: "alert", size: "sm" }),
    /* @__PURE__ */ s("span", { className: "vs-banner__text", children: n })
  ] });
}
function le({ options: e, value: t, onChange: n, label: r, ariaLabel: a, variant: l = "default", className: c }) {
  return /* @__PURE__ */ s("div", { className: d("vs-segment", l === "soft" && "vs-segment--soft", c), role: "group", "aria-label": r ?? a, children: e.map((i) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": i.value === t, onClick: () => n(i.value), children: i.label }, i.value)) });
}
const x = (e) => e.stopPropagation();
function ce({ checked: e, onChange: t, label: n, icon: r, title: a, size: l = "md", disabled: c, className: i }) {
  return /* @__PURE__ */ v("label", { className: d("vs-switch", l === "sm" && "vs-switch--sm", i), title: a, onClick: x, onKeyDown: x, onPointerDown: x, onMouseDown: x, onTouchStart: x, children: [
    r != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: r }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: c, onChange: (o) => t(o.target.checked) })
  ] });
}
function ie({ value: e, min: t = 1, max: n = 100, step: r = 1, label: a, onCommit: l, format: c = String, className: i }) {
  const [o, u] = w(e), h = _(!1), m = _(e);
  M(() => {
    m.current = e, h.current || u(e);
  }, [e]);
  const C = () => {
    h.current = !1, o !== m.current && (m.current = o, l(o));
  }, f = `${(o - t) / (n - t) * 100}%`;
  return /* @__PURE__ */ v("label", { className: d("vs-slider", i), style: { "--vs-slider-fill": f }, children: [
    /* @__PURE__ */ s(
      "input",
      {
        type: "range",
        "aria-label": a,
        min: t,
        max: n,
        step: r,
        value: o,
        onPointerDown: () => {
          h.current = !0;
        },
        onChange: (N) => u(Number(N.target.value)),
        onPointerUp: C,
        onPointerCancel: C,
        onKeyUp: C,
        onTouchEnd: C
      }
    ),
    /* @__PURE__ */ s("span", { className: "vs-slider__value", children: c(o) })
  ] });
}
function C1(e, t) {
  return t instanceof V && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function oe() {
  return new X({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: C1 },
      mutations: { retry: !1 }
    }
  });
}
const K = J(null);
function ue({ children: e, duration: t = 3500 }) {
  const [n, r] = w(null), a = _(void 0), l = $((c) => {
    clearTimeout(a.current), r((i) => ({ text: c, id: (i?.id ?? 0) + 1 })), a.current = setTimeout(() => r(null), t);
  }, [t]);
  return M(() => () => clearTimeout(a.current), []), /* @__PURE__ */ v(K.Provider, { value: l, children: [
    e,
    n && e1(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function de() {
  const e = q(K);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function ve({ value: e, onChange: t, options: n, label: r, className: a, disabled: l }) {
  const [c, i] = w(!1);
  return M(() => c ? G() : void 0, [c]), /* @__PURE__ */ s(B, { disableStyleElements: !0, children: /* @__PURE__ */ v(L.Root, { open: c, onOpenChange: i, value: e, onValueChange: (o) => {
    o !== null && t(o);
  }, items: n, disabled: l, children: [
    /* @__PURE__ */ v("div", { className: d("vs-select", a), children: [
      /* @__PURE__ */ s(L.Label, { className: "vs-select__label", children: r }),
      /* @__PURE__ */ v(L.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(L.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(L.Icon, { className: "vs-select__icon", children: /* @__PURE__ */ s(p, { name: "chevron-down", size: "sm" }) })
      ] })
    ] }),
    /* @__PURE__ */ s(L.Portal, { children: /* @__PURE__ */ s(L.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(L.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(L.List, { className: "vs-select__list", children: n.map((o) => /* @__PURE__ */ v(L.Item, { value: o.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(L.ItemIndicator, { className: "vs-select__check", children: /* @__PURE__ */ s(p, { name: "check", size: "sm" }) }),
      /* @__PURE__ */ s(L.ItemText, { children: o.label })
    ] }, o.value)) }) }) }) })
  ] }) });
}
const p1 = 1500;
function f1({ item: e }) {
  return "options" in e ? /* @__PURE__ */ v(A.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ s(A.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ s(A.RadioGroup, { value: e.value, onValueChange: (t) => {
      t !== e.value && e.onValueChange(t);
    }, children: e.options.map((t) => /* @__PURE__ */ v(A.RadioItem, { value: t.value, disabled: t.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ s(A.RadioItemIndicator, { className: "vs-menu__check", children: /* @__PURE__ */ s(p, { name: "check", size: "sm" }) }),
      /* @__PURE__ */ s("span", { className: "vs-menu__text", children: t.label })
    ] }, t.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ v(A.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ s(A.CheckboxItemIndicator, { className: "vs-menu__check", children: /* @__PURE__ */ s(p, { name: "check", size: "sm" }) }),
    /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ s(A.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ s("span", { className: "vs-menu__text", children: e.label }) });
}
function he({ items: e, children: t, longPress: n = !0, disabled: r, className: a }) {
  const [l, c] = w(!1);
  M(() => l ? G() : void 0, [l]);
  const i = _(0), o = n ? {} : {
    onTouchStart: (u) => {
      i.current = Date.now(), u.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (u) => {
      (u.nativeEvent.pointerType === "touch" || Date.now() - i.current < p1) && u.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(B, { disableStyleElements: !0, children: /* @__PURE__ */ v(A.Root, { open: l, onOpenChange: c, disabled: r, children: [
    /* @__PURE__ */ s(A.Trigger, { render: t, ...o }),
    /* @__PURE__ */ s(A.Portal, { children: /* @__PURE__ */ s(A.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(A.Popup, { className: d("vs-menu", a), children: e.map((u, h) => u === "separator" ? /* @__PURE__ */ s(A.Separator, { className: "vs-menu__separator" }, h) : /* @__PURE__ */ s(f1, { item: u }, h)) }) }) })
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
function me(e, t) {
  const [n, r] = w(() => R.get(e, t)), a = $((l) => {
    r(l), R.set(e, l);
  }, [e]);
  return [n, a];
}
export {
  V as ApiError,
  ee as Artwork,
  a1 as Badge,
  ae as Banner,
  E1 as Button,
  U1 as Checkbox,
  l1 as Chip,
  O1 as ChipGroup,
  X1 as Clock,
  Q1 as Cluster,
  he as ContextMenu,
  q1 as ControlList,
  J1 as ControlRow,
  Y1 as Divider,
  te as Excerpt,
  U as Field,
  I1 as ICON_NAMES,
  p as Icon,
  G1 as IconButton,
  R1 as Link,
  ne as List,
  re as ListRow,
  j1 as RadioGroup,
  le as Segment,
  ve as Select,
  m1 as Sheet,
  ie as Slider,
  r1 as Spinner,
  z1 as SplitButton,
  W1 as Stack,
  se as Stat,
  ce as Switch,
  D1 as Tag,
  S as Text,
  F1 as TextArea,
  B1 as TextField,
  K1 as Tile,
  ue as ToastProvider,
  Z1 as api,
  S1 as clampText,
  V1 as compact,
  oe as createQueryClient,
  d as cx,
  x1 as fmtDate,
  y1 as fmtDay,
  P1 as linkify,
  $1 as localToday,
  T1 as plural,
  C1 as shouldRetry,
  R as storage,
  me as useLocalStorage,
  i1 as useMediaQuery,
  de as useToast
};
