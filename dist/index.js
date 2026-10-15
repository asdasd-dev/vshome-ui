import { c as h } from "./cx.js";
import { jsx as s, jsxs as d, Fragment as V } from "react/jsx-runtime";
import { useRef as A, useEffect as w, useId as G, useState as N, useCallback as x, useLayoutEffect as Z, Children as K, useContext as Q, createContext as W, useSyncExternalStore as Y } from "react";
import { QueryClient as J } from "@tanstack/react-query";
import { createPortal as X } from "react-dom";
import { Dialog as b } from "@base-ui/react/dialog";
import { Drawer as L } from "@base-ui/react/drawer";
import { CSPProvider as z } from "@base-ui/react/csp-provider";
import { Select as p } from "@base-ui/react/select";
import { ContextMenu as m } from "@base-ui/react/context-menu";
const M = (e) => String(e).padStart(2, "0");
function g1(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${M(t.getDate())}.${M(t.getMonth() + 1)}.${t.getFullYear()} ${M(t.getHours())}:${M(t.getMinutes())}`;
}
function w1(e) {
  if (e == null) return "";
  const t = new Date(e);
  return `${M(t.getDate())}.${M(t.getMonth() + 1)}`;
}
function N1(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${M(e.getMonth() + 1)}-${M(e.getDate())}`;
}
function b1(e, t, n, a) {
  const r = Math.abs(Math.round(e)) % 100, l = r % 10;
  return l === 1 && r !== 11 ? t : l >= 2 && l <= 4 && (r < 12 || r > 14) ? n : a;
}
function H1(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function y1(e, t, n) {
  const a = e.split(`
`);
  let r = 0, l = a.length;
  for (let i = 0; i < a.length; i++)
    if (a[i].trim() && r++, r === t) {
      l = i + 1;
      break;
    }
  let o = a.slice(0, l).join(`
`), c = l < a.length && a.slice(l).some((i) => i.trim());
  if (o.length > n) {
    const i = o.slice(0, n + 1), u = i.lastIndexOf(" ");
    o = u > 0 ? i.slice(0, u) : o.slice(0, n), c = !0;
  }
  return c ? { text: o.trimEnd() + "…", cut: c } : { text: o, cut: c };
}
const q = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, e1 = /[.,;:!?)»"']+$/;
function T1(e) {
  const t = [];
  let n = 0;
  for (const a of e.matchAll(q)) {
    const r = a.index;
    let l = a[2] ?? a[0], o = a[1] ?? l, c = r + a[0].length;
    if (!a[2]) {
      const i = e1.exec(l)?.[0] ?? "";
      l = l.slice(0, l.length - i.length), o = l, c -= i.length;
    }
    r > n && t.push({ text: e.slice(n, r) }), t.push({ url: l, text: o }), n = c;
  }
  return n < e.length && t.push({ text: e.slice(n) }), t;
}
class $ extends Error {
  status;
  data;
  constructor(t, n, a) {
    super(t), this.name = "ApiError", this.status = n, this.data = a;
  }
}
function t1(e, t) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${t}`;
}
async function x1(e, t, n) {
  let a;
  try {
    a = await fetch(t, {
      method: e,
      credentials: "same-origin",
      headers: n === void 0 ? {} : { "Content-Type": "application/json" },
      body: n === void 0 ? void 0 : JSON.stringify(n)
    });
  } catch {
    throw new $("нет связи с сервером", 0, null);
  }
  const r = await a.json().catch(() => ({}));
  if (!a.ok) throw new $(t1(r, a.status), a.status, r);
  return r;
}
const R = {
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
}, $1 = Object.keys(R);
function g({ name: e, size: t = "md", tone: n, label: a, className: r }) {
  return /* @__PURE__ */ s("svg", { "data-icon": e, className: h("vs-icon", `vs-icon--${t}`, n && `vs-icon--${n}`, r), viewBox: "0 0 24 24", focusable: "false", ...a ? { role: "img", "aria-label": a } : { "aria-hidden": !0 }, children: /* @__PURE__ */ s("path", { d: R[e], fill: "currentColor" }) });
}
function S1({ variant: e, size: t, pressed: n, icon: a, indicator: r, className: l, type: o = "button", children: c, ...i }) {
  const u = a ? /* @__PURE__ */ s(g, { name: a, size: "sm" }) : null, C = r === "lamp" && n ? /* @__PURE__ */ s(g, { name: "dot", size: "md", tone: "lamp", className: "vs-button__lamp" }) : null;
  return /* @__PURE__ */ d("button", { type: o, className: h("vs-button", e && `vs-button--${e}`, t === "sm" && "vs-button--sm", u && "vs-button--icon", r && `vs-button--${r}`, l), "aria-pressed": n, ...i, children: [
    C,
    u,
    c
  ] });
}
function V1({ children: e, onClick: t, onHold: n, holdMs: a = 500, pressed: r, icon: l, indicator: o, more: c, className: i }) {
  const u = A(void 0), C = A(!1), v = () => clearTimeout(u.current);
  w(() => v, []);
  const _ = () => {
    C.current = !1, n && (u.current = setTimeout(() => {
      C.current = !0, n();
    }, a));
  }, f = () => {
    if (C.current) {
      C.current = !1;
      return;
    }
    t();
  };
  return /* @__PURE__ */ d("span", { className: h("vs-split", o && `vs-split--${o}`, i), "data-pressed": r || void 0, children: [
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": r,
        onClick: f,
        onPointerDown: _,
        onPointerUp: v,
        onPointerLeave: v,
        onPointerCancel: v,
        onContextMenu: n ? (y) => y.preventDefault() : void 0,
        children: [
          o === "lamp" && r && /* @__PURE__ */ s(g, { name: "dot", size: "md", tone: "lamp", className: "vs-split__lamp" }),
          l && /* @__PURE__ */ s(g, { name: l, size: "sm" }),
          e
        ]
      }
    ),
    /* @__PURE__ */ s("button", { type: "button", className: "vs-split__more", "aria-label": c.label, title: c.label, "aria-haspopup": "dialog", onClick: c.onClick, children: /* @__PURE__ */ s(g, { name: c.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function k1({ pressed: e, onClick: t, children: n, className: a, title: r }) {
  return /* @__PURE__ */ s("button", { type: "button", className: h("vs-chip", a), "aria-pressed": e === void 0 ? void 0 : e, onClick: t, title: r, children: n });
}
function P1({ icon: e, label: t, size: n = "md", variant: a = "plain", className: r, type: l = "button", ...o }) {
  return /* @__PURE__ */ s("button", { type: l, "aria-label": t, title: t, className: h("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${a}`, r), ...o, children: /* @__PURE__ */ s(g, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function n1(e) {
  const t = A(null), [n, a] = N(""), r = x(() => {
    const l = t.current;
    if (!l || !e) return;
    const o = l.scrollTop > 1, c = l.scrollTop + l.clientHeight < l.scrollHeight - 1;
    a([o && "top", c && "bottom"].filter(Boolean).join(" "));
  }, [e]);
  return Z(r), Z(() => {
    const l = t.current;
    if (!l || !e || typeof ResizeObserver > "u") return;
    const o = new ResizeObserver(r);
    return o.observe(l), () => o.disconnect();
  }, [e, r]), { ref: t, fade: n, measure: r };
}
function E1({ label: e, aside: t, tone: n = "default", children: a, footer: r, scroll: l, className: o, ...c }) {
  const i = G(), { ref: u, fade: C, measure: v } = n1(!!l), _ = h("vs-tile", `vs-tile--${n}`, o), f = /* @__PURE__ */ d(V, { children: [
    e && t != null ? /* @__PURE__ */ d("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ s("div", { id: i, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ s("div", { className: "vs-tile__aside", children: t })
    ] }) : e && /* @__PURE__ */ s("div", { id: i, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ s(
      "div",
      {
        ref: u,
        className: h("vs-tile__body", l && "vs-tile__body--scroll"),
        "data-fade": l && C ? C : void 0,
        onScroll: l ? v : void 0,
        children: a
      }
    ),
    r && /* @__PURE__ */ s("div", { className: "vs-tile__footer", children: r })
  ] });
  return /* @__PURE__ */ s("section", { className: _, "aria-labelledby": e ? i : void 0, ...c, children: f });
}
function I1({ variant: e = "body", tone: t = "default", weight: n, as: a = "span", lines: r, className: l, title: o, children: c }) {
  return /* @__PURE__ */ s(
    a,
    {
      className: h("vs-text", `vs-text--${e}`, t !== "default" && `vs-text--${t}`, n && `vs-text--w-${n}`, r && `vs-text--lines-${r}`, l),
      title: o,
      children: c
    }
  );
}
function Z1({ value: e, unit: t, icon: n, caption: a, size: r = "lg", tone: l = "default", className: o }) {
  return /* @__PURE__ */ d("div", { className: h("vs-stat", `vs-stat--${r}`, `vs-stat--${l}`, o), children: [
    /* @__PURE__ */ d("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ s("span", { className: "vs-stat__value", children: e }),
      t && /* @__PURE__ */ s("span", { className: "vs-stat__unit", children: t }),
      n && /* @__PURE__ */ s("span", { className: "vs-stat__icon", children: /* @__PURE__ */ s(g, { name: n.name, size: "em", label: n.label }) })
    ] }),
    a && /* @__PURE__ */ s("div", { className: "vs-stat__caption", children: a })
  ] });
}
function O1({ children: e, max: t, empty: n, className: a }) {
  const r = K.toArray(e);
  if (!r.length) return n ? /* @__PURE__ */ s("div", { className: h("vs-list-empty", a), children: n }) : null;
  const l = t ? r.slice(0, t) : r;
  return /* @__PURE__ */ d("div", { className: h("vs-list-wrap", a), children: [
    /* @__PURE__ */ s("ul", { className: "vs-list", children: l }),
    t && r.length > t && /* @__PURE__ */ d("div", { className: "vs-list-more", children: [
      "ещё ",
      r.length - t
    ] })
  ] });
}
function D1({ title: e, titleLines: t = 1, sub: n, subTone: a = "muted", subLines: r = 1, meta: l, lead: o, tone: c = "default", onClick: i }) {
  const u = /* @__PURE__ */ d(V, { children: [
    o && /* @__PURE__ */ s("span", { className: "vs-list-row__lead", children: o }),
    n != null ? /* @__PURE__ */ d("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ s("span", { className: h("vs-list-row__name", t === 2 && "vs-list-row__name--2"), children: e }),
      /* @__PURE__ */ s("span", { className: h("vs-list-row__sub", `vs-list-row__sub--${a}`, r > 1 && `vs-list-row__sub--${r}`), children: n })
    ] }) : /* @__PURE__ */ s("span", { className: h("vs-list-row__title", t === 2 && "vs-list-row__title--2"), children: e }),
    l && /* @__PURE__ */ s("span", { className: "vs-list-row__meta", children: l })
  ] });
  return /* @__PURE__ */ s("li", { className: h("vs-list-row", `vs-list-row--${c}`, n != null && "vs-list-row--two"), children: i ? /* @__PURE__ */ s("button", { type: "button", className: "vs-list-row__inner", onClick: i, children: u }) : /* @__PURE__ */ s("div", { className: "vs-list-row__inner", children: u }) });
}
function z1({ tone: e = "warn", children: t, className: n }) {
  return /* @__PURE__ */ d("div", { role: "status", className: h("vs-banner", `vs-banner--${e}`, n), children: [
    /* @__PURE__ */ s(g, { name: "alert", size: "sm" }),
    t
  ] });
}
function R1({ options: e, value: t, onChange: n, ariaLabel: a, variant: r = "default" }) {
  return /* @__PURE__ */ s("div", { className: h("vs-segment", r === "soft" && "vs-segment--soft"), role: "group", "aria-label": a, children: e.map((l) => /* @__PURE__ */ s("button", { type: "button", "aria-pressed": l.value === t, onClick: () => n(l.value), children: l.label }, l.value)) });
}
const H = (e) => e.stopPropagation();
function B1({ checked: e, onChange: t, label: n, icon: a, title: r, size: l = "md", disabled: o }) {
  return /* @__PURE__ */ d("label", { className: h("vs-switch", l === "sm" && "vs-switch--sm"), title: r, onClick: H, onKeyDown: H, onPointerDown: H, onMouseDown: H, onTouchStart: H, children: [
    a != null && /* @__PURE__ */ s("span", { "aria-hidden": "true", children: a }),
    /* @__PURE__ */ s("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: o, onChange: (c) => t(c.target.checked) })
  ] });
}
function U1({ value: e, min: t = 1, max: n = 100, step: a = 1, label: r, onCommit: l, format: o = String }) {
  const [c, i] = N(e), u = A(!1), C = A(e);
  w(() => {
    C.current = e, u.current || i(e);
  }, [e]);
  const v = () => {
    u.current = !1, c !== C.current && (C.current = c, l(c));
  }, _ = `${(c - t) / (n - t) * 100}%`;
  return /* @__PURE__ */ d("label", { className: "vs-slider", style: { "--vs-slider-fill": _ }, children: [
    /* @__PURE__ */ s(
      "input",
      {
        type: "range",
        "aria-label": r,
        min: t,
        max: n,
        step: a,
        value: c,
        onPointerDown: () => {
          u.current = !0;
        },
        onChange: (f) => i(Number(f.target.value)),
        onPointerUp: v,
        onPointerCancel: v,
        onKeyUp: v,
        onTouchEnd: v
      }
    ),
    /* @__PURE__ */ s("span", { className: "vs-slider__value", children: o(c) })
  ] });
}
function s1(e, t) {
  return t instanceof $ && t.status >= 400 && t.status < 500 ? !1 : e < 2;
}
function j1() {
  return new J({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: s1 },
      mutations: { retry: !1 }
    }
  });
}
const B = W(null);
function F1({ children: e, duration: t = 3500 }) {
  const [n, a] = N(null), r = A(void 0), l = x((o) => {
    clearTimeout(r.current), a((c) => ({ text: o, id: (c?.id ?? 0) + 1 })), r.current = setTimeout(() => a(null), t);
  }, [t]);
  return w(() => () => clearTimeout(r.current), []), /* @__PURE__ */ d(B.Provider, { value: l, children: [
    e,
    n && X(/* @__PURE__ */ s("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function G1() {
  const e = Q(B);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function r1(e) {
  const t = x((n) => {
    const a = window.matchMedia(e);
    return a.addEventListener("change", n), () => a.removeEventListener("change", n);
  }, [e]);
  return Y(t, () => window.matchMedia(e).matches, () => !1);
}
const a1 = 1e3;
let S = 0, k = !1, U;
function T() {
  k = !1, clearTimeout(U), window.removeEventListener("click", T);
}
function O() {
  T(), k = !0, U = setTimeout(T, a1), window.addEventListener("click", T);
}
function j() {
  return S += 1, document.addEventListener("pointerdown", O, !0), () => {
    S -= 1, document.removeEventListener("pointerdown", O, !0);
  };
}
const l1 = () => S > 0 || k;
function o1(e, t) {
  const n = A(t);
  n.current = t, w(() => {
    const a = window.CloseWatcher;
    if (!e || !a || !/Android/i.test(navigator.userAgent)) return;
    let r;
    const l = () => {
      r = new a(), r.onclose = () => {
        n.current() === !1 && l();
      };
    };
    return l(), () => r.destroy();
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
function K1({ open: e, onRequestClose: t, head: n, actions: a, footer: r, children: l, scrollKey: o, className: c }) {
  const i = r1(c1), u = A(null);
  w(() => {
    u.current && (u.current.scrollTop = 0);
  }, [o]);
  const C = A(!1), v = A(void 0), _ = A(t);
  _.current = t;
  const f = A(() => (C.current || (C.current = !0, setTimeout(() => {
    C.current = !1;
  }, 0), v.current = _.current()), v.current)).current;
  o1(e, f);
  const y = i1(f), P = (F) => {
    F.pointerType === "touch" && f();
  }, E = i ? L : b, I = /* @__PURE__ */ d(V, { children: [
    /* @__PURE__ */ d("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ s(E.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ d("span", { className: "vs-sheet__actions", children: [
        a,
        /* @__PURE__ */ s(E.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: "✕" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { ref: u, className: "vs-sheet__body", children: l }),
    r != null && /* @__PURE__ */ s("footer", { className: "vs-sheet__foot", children: r })
  ] });
  return i ? /* @__PURE__ */ s(L.Root, { open: e, onOpenChange: y, children: /* @__PURE__ */ s(L.VirtualKeyboardProvider, { children: /* @__PURE__ */ d(L.Portal, { children: [
    /* @__PURE__ */ s(L.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: P }),
    /* @__PURE__ */ s(L.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ d(L.Popup, { className: h("vs-sheet", "vs-sheet--drawer", c), children: [
      /* @__PURE__ */ s("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ s(L.Content, { className: "vs-sheet__content", children: I })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ s(b.Root, { open: e, onOpenChange: y, children: /* @__PURE__ */ d(b.Portal, { children: [
    /* @__PURE__ */ s(b.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: P }),
    /* @__PURE__ */ s(b.Popup, { className: h("vs-sheet", c), children: I })
  ] }) });
}
function Q1({ value: e, onChange: t, options: n, label: a, className: r, disabled: l }) {
  const [o, c] = N(!1);
  return w(() => o ? j() : void 0, [o]), /* @__PURE__ */ s(z, { disableStyleElements: !0, children: /* @__PURE__ */ d(p.Root, { open: o, onOpenChange: c, value: e, onValueChange: (i) => {
    i !== null && t(i);
  }, items: n, disabled: l, children: [
    /* @__PURE__ */ d("div", { className: h("vs-select", r), children: [
      /* @__PURE__ */ s(p.Label, { className: "vs-select__label", children: a }),
      /* @__PURE__ */ d(p.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ s(p.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ s(p.Icon, { className: "vs-select__icon", children: "▾" })
      ] })
    ] }),
    /* @__PURE__ */ s(p.Portal, { children: /* @__PURE__ */ s(p.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ s(p.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ s(p.List, { className: "vs-select__list", children: n.map((i) => /* @__PURE__ */ d(p.Item, { value: i.value, className: "vs-select__item", children: [
      /* @__PURE__ */ s(p.ItemIndicator, { className: "vs-select__check", children: "✓" }),
      /* @__PURE__ */ s(p.ItemText, { children: i.label })
    ] }, i.value)) }) }) }) })
  ] }) });
}
const u1 = 1500;
function d1({ item: e }) {
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
function W1({ items: e, children: t, longPress: n = !0, disabled: a, className: r }) {
  const [l, o] = N(!1);
  w(() => l ? j() : void 0, [l]);
  const c = A(0), i = n ? {} : {
    onTouchStart: (u) => {
      c.current = Date.now(), u.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (u) => {
      (u.nativeEvent.pointerType === "touch" || Date.now() - c.current < u1) && u.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ s(z, { disableStyleElements: !0, children: /* @__PURE__ */ d(m.Root, { open: l, onOpenChange: o, disabled: a, children: [
    /* @__PURE__ */ s(m.Trigger, { render: t, ...i }),
    /* @__PURE__ */ s(m.Portal, { children: /* @__PURE__ */ s(m.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ s(m.Popup, { className: h("vs-menu", r), children: e.map((u, C) => u === "separator" ? /* @__PURE__ */ s(m.Separator, { className: "vs-menu__separator" }, C) : /* @__PURE__ */ s(d1, { item: u }, C)) }) }) })
  ] }) });
}
const D = {
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
function Y1(e, t) {
  const [n, a] = N(() => D.get(e, t)), r = x((l) => {
    a(l), D.set(e, l);
  }, [e]);
  return [n, r];
}
export {
  $ as ApiError,
  z1 as Banner,
  S1 as Button,
  k1 as Chip,
  W1 as ContextMenu,
  $1 as ICON_NAMES,
  g as Icon,
  P1 as IconButton,
  O1 as List,
  D1 as ListRow,
  R1 as Segment,
  Q1 as Select,
  K1 as Sheet,
  U1 as Slider,
  V1 as SplitButton,
  Z1 as Stat,
  B1 as Switch,
  I1 as Text,
  E1 as Tile,
  F1 as ToastProvider,
  x1 as api,
  y1 as clampText,
  H1 as compact,
  j1 as createQueryClient,
  h as cx,
  g1 as fmtDate,
  w1 as fmtDay,
  T1 as linkify,
  N1 as localToday,
  b1 as plural,
  s1 as shouldRetry,
  D as storage,
  Y1 as useLocalStorage,
  r1 as useMediaQuery,
  G1 as useToast
};
