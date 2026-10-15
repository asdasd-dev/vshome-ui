import { c as u } from "./cx.js";
import { jsx as t, jsxs as v, Fragment as M } from "react/jsx-runtime";
import { useRef as N, useEffect as k, useId as E, useState as g, useCallback as x, useLayoutEffect as T, useSyncExternalStore as Y, Children as q, useContext as J, createContext as X } from "react";
import { Dialog as y } from "@base-ui/react/dialog";
import { Drawer as L } from "@base-ui/react/drawer";
import { QueryClient as e1 } from "@tanstack/react-query";
import { createPortal as s1 } from "react-dom";
import { CSPProvider as F } from "@base-ui/react/csp-provider";
import { Select as b } from "@base-ui/react/select";
import { ContextMenu as f } from "@base-ui/react/context-menu";
const w = (e) => String(e).padStart(2, "0");
function x1(e) {
  if (e == null) return "";
  const s = new Date(e);
  return `${w(s.getDate())}.${w(s.getMonth() + 1)}.${s.getFullYear()} ${w(s.getHours())}:${w(s.getMinutes())}`;
}
function T1(e) {
  if (e == null) return "";
  const s = new Date(e);
  return `${w(s.getDate())}.${w(s.getMonth() + 1)}`;
}
function V1(e = /* @__PURE__ */ new Date()) {
  return `${e.getFullYear()}-${w(e.getMonth() + 1)}-${w(e.getDate())}`;
}
function S1(e, s, n, a) {
  const l = Math.abs(Math.round(e)) % 100, r = l % 10;
  return r === 1 && l !== 11 ? s : r >= 2 && r <= 4 && (l < 12 || l > 14) ? n : a;
}
function P1(e) {
  return e >= 1e6 ? `${(e / 1e6).toFixed(1)}M` : e >= 1e3 ? `${Math.round(e / 1e3)}k` : String(e || 0);
}
function E1(e, s, n) {
  const a = e.split(`
`);
  let l = 0, r = a.length;
  for (let i = 0; i < a.length; i++)
    if (a[i].trim() && l++, l === s) {
      r = i + 1;
      break;
    }
  let c = a.slice(0, r).join(`
`), o = r < a.length && a.slice(r).some((i) => i.trim());
  if (c.length > n) {
    const i = c.slice(0, n + 1), d = i.lastIndexOf(" ");
    c = d > 0 ? i.slice(0, d) : c.slice(0, n), o = !0;
  }
  return o ? { text: c.trimEnd() + "…", cut: o } : { text: c, cut: o };
}
const t1 = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s<>"]+/gi, n1 = /[.,;:!?)»"']+$/;
function I1(e) {
  const s = [];
  let n = 0;
  for (const a of e.matchAll(t1)) {
    const l = a.index;
    let r = a[2] ?? a[0], c = a[1] ?? r, o = l + a[0].length;
    if (!a[2]) {
      const i = n1.exec(r)?.[0] ?? "";
      r = r.slice(0, r.length - i.length), c = r, o -= i.length;
    }
    l > n && s.push({ text: e.slice(n, l) }), s.push({ url: r, text: c }), n = o;
  }
  return n < e.length && s.push({ text: e.slice(n) }), s;
}
class V extends Error {
  status;
  data;
  constructor(s, n, a) {
    super(s), this.name = "ApiError", this.status = n, this.data = a;
  }
}
function a1(e, s) {
  return typeof e == "object" && e !== null && "error" in e && typeof e.error == "string" ? e.error : `HTTP ${s}`;
}
async function Z1(e, s, n) {
  let a;
  try {
    a = await fetch(s, {
      method: e,
      credentials: "same-origin",
      headers: n === void 0 ? {} : { "Content-Type": "application/json" },
      body: n === void 0 ? void 0 : JSON.stringify(n)
    });
  } catch {
    throw new V("нет связи с сервером", 0, null);
  }
  const l = await a.json().catch(() => ({}));
  if (!a.ok) throw new V(a1(l, a.status), a.status, l);
  return l;
}
const U = {
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
  plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
  info: "M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
}, z1 = Object.keys(U);
function p({ name: e, size: s = "md", tone: n, label: a, className: l }) {
  return /* @__PURE__ */ t("svg", { "data-icon": e, className: u("vs-icon", `vs-icon--${s}`, n && `vs-icon--${n}`, l), viewBox: "0 0 24 24", focusable: "false", ...a ? { role: "img", "aria-label": a } : { "aria-hidden": !0 }, children: /* @__PURE__ */ t("path", { d: U[e], fill: "currentColor" }) });
}
function r1({ size: e = "md", label: s, className: n }) {
  return /* @__PURE__ */ t("span", { className: u("vs-spinner", `vs-spinner--${e}`, n), ...s ? { role: "status", "aria-label": s } : { "aria-hidden": !0 } });
}
function O1({ variant: e = "secondary", size: s, shape: n, block: a, loading: l, pressed: r, icon: c, indicator: o, disabled: i, className: d, type: h = "button", children: m, ..._ }) {
  const C = l ? /* @__PURE__ */ t(r1, { size: "sm" }) : c ? /* @__PURE__ */ t(p, { name: c, size: "sm" }) : null, A = o === "lamp" && r ? /* @__PURE__ */ t(p, { name: "dot", size: "md", tone: "lamp", className: "vs-button__lamp" }) : null;
  return /* @__PURE__ */ v(
    "button",
    {
      type: h,
      disabled: i || l,
      "aria-busy": l || void 0,
      "aria-pressed": r,
      className: u("vs-button", `vs-button--${e}`, s && s !== "md" && `vs-button--${s}`, n === "pill" && "vs-button--pill", a && "vs-button--block", C && "vs-button--icon", o && `vs-button--${o}`, d),
      ..._,
      children: [
        A,
        C,
        m
      ]
    }
  );
}
function D1({ children: e, onClick: s, onHold: n, holdMs: a = 500, pressed: l, icon: r, indicator: c, more: o, className: i }) {
  const d = N(void 0), h = N(!1), m = () => clearTimeout(d.current);
  k(() => m, []);
  const _ = () => {
    h.current = !1, n && (d.current = setTimeout(() => {
      h.current = !0, n();
    }, a));
  }, C = () => {
    if (h.current) {
      h.current = !1;
      return;
    }
    s();
  };
  return /* @__PURE__ */ v("span", { className: u("vs-split", c && `vs-split--${c}`, i), "data-pressed": l || void 0, children: [
    /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "vs-split__main",
        "aria-pressed": l,
        onClick: C,
        onPointerDown: _,
        onPointerUp: m,
        onPointerLeave: m,
        onPointerCancel: m,
        onContextMenu: n ? (A) => A.preventDefault() : void 0,
        children: [
          c === "lamp" && l && /* @__PURE__ */ t(p, { name: "dot", size: "md", tone: "lamp", className: "vs-split__lamp" }),
          r && /* @__PURE__ */ t(p, { name: r, size: "sm" }),
          e
        ]
      }
    ),
    /* @__PURE__ */ t("button", { type: "button", className: "vs-split__more", "aria-label": o.label, title: o.label, "aria-haspopup": "dialog", onClick: o.onClick, children: /* @__PURE__ */ t(p, { name: o.icon ?? "chevron-right", size: "md" }) })
  ] });
}
function I({ children: e, tone: s = "accent", max: n, dot: a, label: l, className: r }) {
  if (a) return /* @__PURE__ */ t("span", { className: u("vs-badge", `vs-badge--${s}`, "vs-badge--dot", r), role: "img", "aria-label": l });
  const c = typeof e == "number" && n != null && e > n ? `${n}+` : e;
  return /* @__PURE__ */ t("span", { className: u("vs-badge", `vs-badge--${s}`, r), "aria-label": l, children: c });
}
function l1({ children: e, pressed: s, onClick: n, href: a, size: l = "md", disabled: r, count: c, title: o, className: i }) {
  const d = u("vs-chip", l === "sm" && "vs-chip--sm", i), h = /* @__PURE__ */ v(M, { children: [
    e,
    c != null && /* @__PURE__ */ t(I, { tone: s ? "accent" : "muted", children: c })
  ] });
  return a != null ? /* @__PURE__ */ t("a", { className: d, href: a, title: o, "aria-current": s ? "page" : void 0, children: h }) : /* @__PURE__ */ t("button", { type: "button", className: d, "aria-pressed": s === void 0 ? void 0 : s, onClick: n, title: o, disabled: r, children: h });
}
function B1({ options: e, value: s, onChange: n, label: a, scroll: l, size: r, className: c }) {
  return /* @__PURE__ */ t("div", { role: "group", "aria-label": a, className: u("vs-chip-group", l && "vs-chip-group--scroll", c), children: e.map((o) => /* @__PURE__ */ t(l1, { size: r, pressed: o.value === s, count: o.count, onClick: () => n(o.value), children: o.label }, o.value)) });
}
function R1({ children: e, tone: s = "default", variant: n = "soft", size: a = "md", icon: l, className: r }) {
  return /* @__PURE__ */ v("span", { className: u("vs-tag", `vs-tag--${s}`, `vs-tag--${n}`, `vs-tag--${a}`, r), children: [
    l && /* @__PURE__ */ t(p, { name: l, size: "em" }),
    e
  ] });
}
function F1({ children: e, href: s, onClick: n, tone: a = "accent", external: l, underline: r = "hover", title: c, className: o }) {
  const i = u("vs-link", `vs-link--${a}`, `vs-link--underline-${r}`, o);
  return s == null ? /* @__PURE__ */ t("button", { type: "button", className: i, onClick: n, title: c, children: e }) : /* @__PURE__ */ v("a", { className: i, href: s, onClick: n, title: c, ...l ? { target: "_blank", rel: "noopener noreferrer" } : {}, children: [
    e,
    l && /* @__PURE__ */ t(p, { name: "external", size: "em", className: "vs-link__external" })
  ] });
}
function j({ label: e, hint: s, error: n, hideLabel: a, className: l, children: r }) {
  const c = E(), o = s ? `${c}-hint` : void 0, i = n ? `${c}-error` : void 0, d = [o, i].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ v("div", { className: u("vs-field", l), children: [
    /* @__PURE__ */ t("label", { htmlFor: c, className: u("vs-field__label", a && "vs-visually-hidden"), children: e }),
    /* @__PURE__ */ t("div", { className: "vs-field__control", children: r({ id: c, "aria-describedby": d, ...n ? { "aria-invalid": !0 } : {} }) }),
    s && /* @__PURE__ */ t("p", { id: o, className: "vs-field__hint", children: s }),
    n && /* @__PURE__ */ t("p", { id: i, className: "vs-field__error", children: n })
  ] });
}
function U1({ label: e, hint: s, error: n, hideLabel: a, value: l, onChange: r, size: c = "md", variant: o = "default", className: i, type: d = "text", ...h }) {
  const m = d === "search";
  return /* @__PURE__ */ t(j, { label: e, hint: s, error: n, hideLabel: a, className: i, children: (_) => /* @__PURE__ */ v(M, { children: [
    m && /* @__PURE__ */ t(p, { name: "search", size: "sm", className: "vs-text-field__icon" }),
    /* @__PURE__ */ t(
      "input",
      {
        ...h,
        ..._,
        type: d,
        value: l,
        onChange: (C) => r(C.target.value),
        className: u("vs-text-field", `vs-text-field--${o}`, c === "sm" && "vs-text-field--sm", m && "vs-text-field--with-icon")
      }
    )
  ] }) });
}
function j1({ label: e, hint: s, error: n, hideLabel: a, value: l, onChange: r, size: c = "md", variant: o = "default", className: i, rows: d = 3, ...h }) {
  return /* @__PURE__ */ t(j, { label: e, hint: s, error: n, hideLabel: a, className: i, children: (m) => /* @__PURE__ */ t(
    "textarea",
    {
      ...h,
      ...m,
      rows: d,
      value: l,
      onChange: (_) => r(_.target.value),
      className: u("vs-text-field", "vs-text-field--area", `vs-text-field--${o}`, c === "sm" && "vs-text-field--sm")
    }
  ) });
}
function G1({ checked: e, onChange: s, label: n, hint: a, size: l = "md", disabled: r, className: c }) {
  return /* @__PURE__ */ v("label", { className: u("vs-checkbox", `vs-checkbox--${l}`, c), children: [
    /* @__PURE__ */ v("span", { className: "vs-checkbox__box", children: [
      /* @__PURE__ */ t("input", { type: "checkbox", className: "vs-checkbox__input", checked: e, disabled: r, onChange: (o) => s(o.target.checked) }),
      /* @__PURE__ */ t(p, { name: "check", size: "em", className: "vs-checkbox__mark" })
    ] }),
    /* @__PURE__ */ v("span", { className: "vs-checkbox__text", children: [
      n,
      a && /* @__PURE__ */ t("span", { className: "vs-checkbox__hint", children: a })
    ] })
  ] });
}
function K1({ legend: e, options: s, value: n, onChange: a, direction: l = "column", hideLegend: r, className: c }) {
  const o = E();
  return /* @__PURE__ */ v("fieldset", { className: u("vs-radio-group", `vs-radio-group--${l}`, c), children: [
    /* @__PURE__ */ t("legend", { className: u("vs-radio-group__legend", r && "vs-visually-hidden"), children: e }),
    s.map((i) => /* @__PURE__ */ v("label", { className: "vs-radio", children: [
      /* @__PURE__ */ t("input", { type: "radio", className: "vs-radio__input", name: o, value: i.value, checked: i.value === n, disabled: i.disabled, onChange: () => a(i.value) }),
      /* @__PURE__ */ v("span", { className: "vs-checkbox__text", children: [
        i.label,
        i.hint && /* @__PURE__ */ t("span", { className: "vs-checkbox__hint", children: i.hint })
      ] })
    ] }, i.value))
  ] });
}
function Q1({ icon: e, label: s, size: n = "md", variant: a = "plain", className: l, type: r = "button", ...c }) {
  return /* @__PURE__ */ t("button", { type: r, "aria-label": s, title: s, className: u("vs-icon-button", `vs-icon-button--${n}`, `vs-icon-button--${a}`, l), ...c, children: /* @__PURE__ */ t(p, { name: e, size: n === "lg" ? "lg" : "md" }) });
}
function c1(e) {
  const s = N(null), [n, a] = g(""), l = x(() => {
    const r = s.current;
    if (!r || !e) return;
    const c = r.scrollTop > 1, o = r.scrollTop + r.clientHeight < r.scrollHeight - 1;
    a([c && "top", o && "bottom"].filter(Boolean).join(" "));
  }, [e]);
  return T(l), T(() => {
    const r = s.current;
    if (!r || !e || typeof ResizeObserver > "u") return;
    const c = new ResizeObserver(l);
    return c.observe(r), () => c.disconnect();
  }, [e, l]), { ref: s, fade: n, measure: l };
}
function W1({ label: e, aside: s, tone: n = "default", children: a, footer: l, scroll: r, dimmed: c, className: o, ...i }) {
  const d = E(), { ref: h, fade: m, measure: _ } = c1(!!r), C = u("vs-tile", `vs-tile--${n}`, c && "vs-tile--dimmed", o), A = /* @__PURE__ */ v(M, { children: [
    e && s != null ? /* @__PURE__ */ v("div", { className: "vs-tile__head", children: [
      /* @__PURE__ */ t("div", { id: d, className: "vs-tile__label", children: e }),
      /* @__PURE__ */ t("div", { className: "vs-tile__aside", children: s })
    ] }) : e && /* @__PURE__ */ t("div", { id: d, className: "vs-tile__label", children: e }),
    /* @__PURE__ */ t(
      "div",
      {
        ref: h,
        className: u("vs-tile__body", r && "vs-tile__body--scroll"),
        "data-fade": r && m ? m : void 0,
        onScroll: r ? _ : void 0,
        children: a
      }
    ),
    l && /* @__PURE__ */ t("div", { className: "vs-tile__footer", children: l })
  ] });
  return /* @__PURE__ */ t("section", { className: C, "aria-labelledby": e ? d : void 0, ...i, children: A });
}
function S({ variant: e = "body", tone: s = "default", weight: n, as: a = "span", lines: l, className: r, title: c, children: o }) {
  return /* @__PURE__ */ t(
    a,
    {
      className: u("vs-text", `vs-text--${e}`, s !== "default" && `vs-text--${s}`, n && `vs-text--w-${n}`, l && `vs-text--lines-${l}`, r),
      title: c,
      children: o
    }
  );
}
function Y1({ gap: e = "2", align: s = "center", justify: n, wrap: a, rigid: l, as: r = "div", className: c, children: o }) {
  return /* @__PURE__ */ t(r, { className: u("vs-cluster", `vs-cluster--gap-${e}`, `vs-cluster--align-${s}`, n && `vs-cluster--justify-${n}`, a && "vs-cluster--wrap", l && "vs-cluster--rigid", c), children: o });
}
function q1({ gap: e = "2", align: s, as: n = "div", className: a, children: l }) {
  return /* @__PURE__ */ t(n, { className: u("vs-stack", `vs-stack--gap-${e}`, s && `vs-stack--align-${s}`, a), children: l });
}
function J1({ vertical: e, className: s }) {
  return /* @__PURE__ */ t("span", { role: "separator", "aria-orientation": e ? "vertical" : "horizontal", className: u("vs-divider", e && "vs-divider--vertical", s) });
}
function X1({ children: e, className: s }) {
  return /* @__PURE__ */ t("ul", { className: u("vs-control-list", s), children: e });
}
function ee({ label: e, control: s, children: n, className: a }) {
  return /* @__PURE__ */ v("li", { className: u("vs-control-row", a), children: [
    /* @__PURE__ */ t("span", { className: "vs-control-row__label", children: e }),
    /* @__PURE__ */ t("span", { className: "vs-control-row__control", children: s }),
    n && /* @__PURE__ */ t("div", { className: "vs-control-row__extra", children: n })
  ] });
}
function se({ children: e, size: s = "lg", weight: n = "medium", tone: a, align: l, className: r }) {
  return /* @__PURE__ */ t("div", { className: u("vs-clock", `vs-clock--${s}`, `vs-clock--w-${n}`, a === "soft" && "vs-clock--soft", l === "center" && "vs-clock--center", r), children: e });
}
function te({ src: e, alt: s = "", fallback: n, size: a = "md", className: l }) {
  const [r, c] = g(void 0), o = u("vs-artwork", `vs-artwork--${a}`, l);
  return !e || r === e ? /* @__PURE__ */ t("span", { className: u(o, "vs-artwork--fallback"), "aria-hidden": s ? void 0 : !0, "aria-label": s || void 0, role: s ? "img" : void 0, children: n }) : /* @__PURE__ */ t("img", { className: o, src: e, alt: s, onError: () => c(e) });
}
function i1(e) {
  const s = x((n) => {
    const a = window.matchMedia(e);
    return a.addEventListener("change", n), () => a.removeEventListener("change", n);
  }, [e]);
  return Y(s, () => window.matchMedia(e).matches, () => !1);
}
const o1 = 1e3;
let P = 0, Z = !1, G;
function H() {
  Z = !1, clearTimeout(G), window.removeEventListener("click", H);
}
function B() {
  H(), Z = !0, G = setTimeout(H, o1), window.addEventListener("click", H);
}
function K() {
  return P += 1, document.addEventListener("pointerdown", B, !0), () => {
    P -= 1, document.removeEventListener("pointerdown", B, !0);
  };
}
const d1 = () => P > 0 || Z;
function u1(e, s) {
  const n = N(s);
  n.current = s, k(() => {
    const a = window.CloseWatcher;
    if (!e || !a || !/Android/i.test(navigator.userAgent)) return;
    let l;
    const r = () => {
      l = new a(), l.onclose = () => {
        n.current() === !1 && r();
      };
    };
    return r(), () => l.destroy();
  }, [e]);
}
const v1 = "(max-width: 760px)";
function h1(e) {
  return (s, n) => {
    if (!s) {
      if (n.reason === "outside-press" && d1()) {
        n.cancel();
        return;
      }
      e() === !1 && n.cancel();
    }
  };
}
function m1({ open: e, onRequestClose: s, head: n, actions: a, footer: l, children: r, scrollKey: c, className: o }) {
  const i = i1(v1), d = N(null);
  k(() => {
    d.current && (d.current.scrollTop = 0);
  }, [c]);
  const h = N(!1), m = N(void 0), _ = N(s);
  _.current = s;
  const C = N(() => (h.current || (h.current = !0, setTimeout(() => {
    h.current = !1;
  }, 0), m.current = _.current()), m.current)).current;
  u1(e, C);
  const A = h1(C), z = (W) => {
    W.pointerType === "touch" && C();
  }, O = i ? L : y, D = /* @__PURE__ */ v(M, { children: [
    /* @__PURE__ */ v("header", { className: "vs-sheet__head", children: [
      /* @__PURE__ */ t(O.Title, { className: "vs-sheet__title", children: n }),
      /* @__PURE__ */ v("span", { className: "vs-sheet__actions", children: [
        a,
        /* @__PURE__ */ t(O.Close, { className: "vs-sheet__close", "aria-label": "Закрыть", children: /* @__PURE__ */ t(p, { name: "close", size: "md" }) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { ref: d, className: "vs-sheet__body", children: r }),
    l != null && /* @__PURE__ */ t("footer", { className: "vs-sheet__foot", children: l })
  ] });
  return i ? /* @__PURE__ */ t(L.Root, { open: e, onOpenChange: A, children: /* @__PURE__ */ t(L.VirtualKeyboardProvider, { children: /* @__PURE__ */ v(L.Portal, { children: [
    /* @__PURE__ */ t(L.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: z }),
    /* @__PURE__ */ t(L.Viewport, { className: "vs-sheet-viewport", children: /* @__PURE__ */ v(L.Popup, { className: u("vs-sheet", "vs-sheet--drawer", o), children: [
      /* @__PURE__ */ t("span", { className: "vs-sheet__grip", "aria-hidden": "true" }),
      /* @__PURE__ */ t(L.Content, { className: "vs-sheet__content", children: D })
    ] }) })
  ] }) }) }) : /* @__PURE__ */ t(y.Root, { open: e, onOpenChange: A, children: /* @__PURE__ */ v(y.Portal, { children: [
    /* @__PURE__ */ t(y.Backdrop, { className: "vs-sheet-backdrop", onPointerUp: z }),
    /* @__PURE__ */ t(y.Popup, { className: u("vs-sheet", o), children: D })
  ] }) });
}
function ne({ children: e, title: s, className: n }) {
  const a = N(null), [l, r] = g(!1), [c, o] = g(!1);
  T(() => {
    const d = a.current;
    if (!d) return;
    const h = () => r(d.scrollHeight > d.clientHeight + 1);
    if (h(), typeof ResizeObserver > "u") return;
    const m = new ResizeObserver(h);
    return m.observe(d), () => m.disconnect();
  }, [e]);
  const i = !!a.current?.closest(".vs-kiosk");
  return /* @__PURE__ */ v(M, { children: [
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: u("vs-excerpt", n),
        "data-more": l ? "" : void 0,
        role: l ? "button" : void 0,
        tabIndex: l ? 0 : void 0,
        onClick: l ? () => o(!0) : void 0,
        onKeyDown: l ? (d) => {
          (d.key === "Enter" || d.key === " ") && (d.preventDefault(), o(!0));
        } : void 0,
        children: e
      }
    ),
    c && /* @__PURE__ */ t(m1, { open: !0, onRequestClose: () => o(!1), className: i ? "vs-kiosk" : void 0, head: /* @__PURE__ */ t(S, { variant: "display", children: s }), children: /* @__PURE__ */ t(S, { as: "p", variant: "lead", className: "vs-excerpt__full", children: e }) })
  ] });
}
function ae({ value: e, unit: s, icon: n, caption: a, size: l = "lg", tone: r = "default", className: c }) {
  return /* @__PURE__ */ v("div", { className: u("vs-stat", `vs-stat--${l}`, `vs-stat--${r}`, c), children: [
    /* @__PURE__ */ v("div", { className: "vs-stat__line", children: [
      /* @__PURE__ */ t("span", { className: "vs-stat__value", children: e }),
      s && /* @__PURE__ */ t("span", { className: "vs-stat__unit", children: s }),
      n && /* @__PURE__ */ t("span", { className: "vs-stat__icon", children: /* @__PURE__ */ t(p, { name: n.name, size: "em", label: n.label }) })
    ] }),
    a && /* @__PURE__ */ t("div", { className: "vs-stat__caption", children: a })
  ] });
}
function re({ children: e, label: s, max: n, empty: a, className: l }) {
  const r = q.toArray(e);
  if (!r.length) return a ? /* @__PURE__ */ t("div", { className: u("vs-list-empty", l), children: a }) : null;
  const c = n ? r.slice(0, n) : r;
  return /* @__PURE__ */ v("div", { className: u("vs-list-wrap", l), children: [
    s && /* @__PURE__ */ t(S, { as: "p", variant: "label", className: "vs-list__label", children: s }),
    /* @__PURE__ */ t("ul", { className: "vs-list", children: c }),
    n && r.length > n && /* @__PURE__ */ v("div", { className: "vs-list-more", children: [
      "ещё ",
      r.length - n
    ] })
  ] });
}
function le({ title: e, titleLines: s = 1, sub: n, subTone: a = "muted", subLines: l = 1, meta: r, lead: c, tone: o = "default", onClick: i, className: d }) {
  const h = /* @__PURE__ */ v(M, { children: [
    c && /* @__PURE__ */ t("span", { className: "vs-list-row__lead", children: c }),
    n != null ? /* @__PURE__ */ v("span", { className: "vs-list-row__title", children: [
      /* @__PURE__ */ t("span", { className: u("vs-list-row__name", s === 2 && "vs-list-row__name--2"), children: e }),
      /* @__PURE__ */ t("span", { className: u("vs-list-row__sub", `vs-list-row__sub--${a}`, l > 1 && `vs-list-row__sub--${l}`), children: n })
    ] }) : /* @__PURE__ */ t("span", { className: u("vs-list-row__title", s === 2 && "vs-list-row__title--2"), children: e }),
    r && /* @__PURE__ */ t("span", { className: "vs-list-row__meta", children: r })
  ] });
  return /* @__PURE__ */ t("li", { className: u("vs-list-row", `vs-list-row--${o}`, n != null && "vs-list-row--two", d), children: i ? /* @__PURE__ */ t("button", { type: "button", className: "vs-list-row__inner", onClick: i, children: h }) : /* @__PURE__ */ t("div", { className: "vs-list-row__inner", children: h }) });
}
const p1 = { warn: "alert", danger: "alert", muted: "alert", accent: "info", ok: "check" };
function ce({ tone: e = "warn", variant: s = "inline", title: n, action: a, truncate: l, children: r, className: c }) {
  return /* @__PURE__ */ v("div", { role: "status", className: u("vs-banner", `vs-banner--${e}`, s === "box" && "vs-banner--box", l && "vs-banner--truncate", c), children: [
    /* @__PURE__ */ t(p, { name: p1[e], size: "sm" }),
    n ? /* @__PURE__ */ v("span", { className: "vs-banner__body", children: [
      /* @__PURE__ */ t("span", { className: "vs-banner__title", children: n }),
      /* @__PURE__ */ t("span", { className: "vs-banner__text", children: r })
    ] }) : /* @__PURE__ */ t("span", { className: "vs-banner__text", children: r }),
    a && /* @__PURE__ */ t("span", { className: "vs-banner__action", children: a })
  ] });
}
function ie({ title: e, sub: s, lead: n, actions: a, children: l, sticky: r, tone: c = "plain", className: o }) {
  return /* @__PURE__ */ v("header", { className: u("vs-page-header", `vs-page-header--${c}`, r && "vs-page-header--sticky", o), children: [
    /* @__PURE__ */ v("div", { className: "vs-page-header__row", children: [
      n && /* @__PURE__ */ t("div", { className: "vs-page-header__lead", children: n }),
      /* @__PURE__ */ v("div", { className: "vs-page-header__titles", children: [
        /* @__PURE__ */ t("h1", { className: "vs-page-header__title", children: e }),
        s && /* @__PURE__ */ t("p", { className: "vs-page-header__sub", children: s })
      ] }),
      a && /* @__PURE__ */ t("div", { className: "vs-page-header__actions", children: a })
    ] }),
    l && /* @__PURE__ */ t("div", { className: "vs-page-header__extra", children: l })
  ] });
}
function oe({ items: e, value: s, onChange: n, label: a, variant: l = "underline", className: r }) {
  const c = u("vs-tabs", `vs-tabs--${l}`, r), o = (i) => /* @__PURE__ */ v(M, { children: [
    i.icon && /* @__PURE__ */ t(p, { name: i.icon, size: "md" }),
    /* @__PURE__ */ t("span", { className: "vs-tabs__label", children: i.label }),
    i.count != null && /* @__PURE__ */ t(I, { tone: i.value === s ? "accent" : "muted", children: i.count })
  ] });
  return e.some((i) => i.href != null) ? /* @__PURE__ */ t("nav", { "aria-label": a, className: c, children: e.map((i) => /* @__PURE__ */ t("a", { className: "vs-tabs__item", href: i.href, "aria-current": i.value === s ? "page" : void 0, onClick: n ? () => n(i.value) : void 0, children: o(i) }, i.value)) }) : /* @__PURE__ */ t("div", { role: "tablist", "aria-label": a, className: c, children: e.map((i) => /* @__PURE__ */ t("button", { type: "button", role: "tab", className: "vs-tabs__item", "aria-selected": i.value === s, onClick: () => n?.(i.value), children: o(i) }, i.value)) });
}
const _1 = ["accent", "ok", "warn", "danger", "muted", "violet", "pink", "gold"];
function de({ children: e, as: s = "div", tone: n = "default", stripe: a, padding: l = "md", elevated: r, onClick: c, href: o, title: i, className: d }) {
  const h = u("vs-card", `vs-card--${n}`, `vs-card--pad-${l}`, r && "vs-card--elevated", a && "vs-card--stripe", (c || o != null) && "vs-card--interactive", d), m = a ? { "--vs-card-stripe": _1.includes(a) ? `var(--vs-${a})` : a } : void 0;
  return o != null ? /* @__PURE__ */ t("a", { className: h, style: m, href: o, title: i, children: e }) : c ? /* @__PURE__ */ t("button", { type: "button", className: h, style: m, onClick: c, title: i, children: e }) : /* @__PURE__ */ t(s, { className: h, style: m, title: i, children: e });
}
function ue({ summary: e, children: s, open: n, onToggle: a, tone: l = "default", className: r }) {
  return /* @__PURE__ */ v("details", { className: u("vs-disclosure", `vs-disclosure--${l}`, r), open: n, onToggle: a ? (c) => a(c.currentTarget.open) : void 0, children: [
    /* @__PURE__ */ v("summary", { className: "vs-disclosure__summary", children: [
      /* @__PURE__ */ t(p, { name: "chevron-right", size: "sm", className: "vs-disclosure__chevron" }),
      e
    ] }),
    /* @__PURE__ */ t("div", { className: "vs-disclosure__body", children: s })
  ] });
}
function ve({ title: e, children: s, action: n, icon: a, size: l = "md", className: r }) {
  return /* @__PURE__ */ v("div", { className: u("vs-empty", `vs-empty--${l}`, r), children: [
    a && /* @__PURE__ */ t(p, { name: a, size: "lg", className: "vs-empty__icon" }),
    e && /* @__PURE__ */ t("p", { className: "vs-empty__title", children: e }),
    s && /* @__PURE__ */ t("div", { className: "vs-empty__text", children: s }),
    n && /* @__PURE__ */ t("div", { className: "vs-empty__action", children: n })
  ] });
}
function he({ value: e, max: s = 100, label: n, tone: a = "accent", size: l = "md", className: r }) {
  const c = s > 0 ? Math.min(100, Math.max(0, e / s * 100)) : 0;
  return /* @__PURE__ */ t("div", { role: "progressbar", "aria-label": n, "aria-valuenow": e, "aria-valuemin": 0, "aria-valuemax": s, className: u("vs-progress", `vs-progress--${l}`, r), children: /* @__PURE__ */ t("span", { className: "vs-progress__fill", style: { width: `${c}%`, "--vs-progress-color": `var(--vs-${a})` } }) });
}
function me({ parts: e, label: s, size: n = "md", className: a }) {
  const l = `${s}: ${e.map((r) => `${r.label} ${r.value}`).join(", ")}`;
  return /* @__PURE__ */ t("div", { role: "img", "aria-label": l, className: u("vs-split-bar", `vs-progress--${n}`, a), children: e.filter((r) => r.value > 0).map((r, c) => /* @__PURE__ */ t("span", { className: "vs-split-bar__part", title: `${r.label} ${r.value}`, style: { flexGrow: r.value, "--vs-progress-color": r.color ?? `var(--vs-${r.tone ?? "accent"})` } }, c)) });
}
function pe({ columns: e, rows: s, rowKey: n, caption: a, dense: l, onRowClick: r, empty: c, className: o }) {
  if (!s.length && c != null) return /* @__PURE__ */ t("div", { className: "vs-table-empty", children: c });
  const i = (d) => u("vs-table__cell", d.numeric && "vs-table__cell--numeric", d.nowrap && "vs-table__cell--nowrap", d.muted && "vs-table__cell--muted");
  return /* @__PURE__ */ t("div", { className: u("vs-table-wrap", o), children: /* @__PURE__ */ v("table", { className: u("vs-table", l && "vs-table--dense"), "aria-label": a, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: e.map((d) => /* @__PURE__ */ t("th", { scope: "col", className: i(d), style: d.width ? { width: d.width } : void 0, children: d.label }, d.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: s.map((d, h) => /* @__PURE__ */ t(
      "tr",
      {
        className: r ? "vs-table__row--clickable" : void 0,
        tabIndex: r ? 0 : void 0,
        onClick: r ? () => r(d) : void 0,
        onKeyDown: r ? (m) => {
          m.key === "Enter" && r(d);
        } : void 0,
        children: e.map((m) => /* @__PURE__ */ t("td", { className: i(m), children: m.render ? m.render(d) : String(d[m.key] ?? "") }, m.key))
      },
      n(d, h)
    )) })
  ] }) });
}
function _e({ items: e, cols: s = 2, size: n = "md", className: a }) {
  return /* @__PURE__ */ t("dl", { className: u("vs-kv", `vs-kv--cols-${s}`, `vs-kv--${n}`, a), children: e.map((l, r) => /* @__PURE__ */ v("div", { className: "vs-kv__item", children: [
    /* @__PURE__ */ t("dt", { className: "vs-kv__label", children: l.label }),
    /* @__PURE__ */ t("dd", { className: u("vs-kv__value", l.tone && l.tone !== "default" && `vs-kv__value--${l.tone}`), children: l.value }),
    l.hint && /* @__PURE__ */ t("dd", { className: "vs-kv__hint", children: l.hint })
  ] }, r)) });
}
function Ce({ items: e, className: s }) {
  return /* @__PURE__ */ t("ul", { className: u("vs-legend", s), children: e.map((n, a) => /* @__PURE__ */ v("li", { className: "vs-legend__item", children: [
    /* @__PURE__ */ t("span", { className: u("vs-legend__swatch", `vs-legend__swatch--${n.shape ?? "dot"}`), style: { "--vs-legend-color": n.color ?? `var(--vs-${n.tone ?? "accent"})` } }),
    n.label
  ] }, a)) });
}
function fe({ tone: e, pulse: s, label: n, className: a }) {
  return /* @__PURE__ */ t("span", { className: u("vs-status-dot", `vs-status-dot--${e}`, s && "vs-status-dot--pulse", a), ...n ? { role: "img", "aria-label": n } : { "aria-hidden": !0 } });
}
function Ne({ title: e, count: s, aside: n, as: a = "h2", className: l }) {
  return /* @__PURE__ */ v("div", { className: u("vs-section-header", l), children: [
    /* @__PURE__ */ v(a, { className: "vs-section-header__title", children: [
      e,
      s != null && /* @__PURE__ */ t(I, { tone: "muted", children: s })
    ] }),
    n && /* @__PURE__ */ t("span", { className: "vs-section-header__aside", children: n })
  ] });
}
function be({ options: e, value: s, onChange: n, label: a, ariaLabel: l, variant: r = "default", className: c }) {
  return /* @__PURE__ */ t("div", { className: u("vs-segment", r === "soft" && "vs-segment--soft", c), role: "group", "aria-label": a ?? l, children: e.map((o) => /* @__PURE__ */ t("button", { type: "button", "aria-pressed": o.value === s, onClick: () => n(o.value), children: o.label }, o.value)) });
}
const $ = (e) => e.stopPropagation();
function Ae({ checked: e, onChange: s, label: n, icon: a, title: l, size: r = "md", disabled: c, className: o }) {
  return /* @__PURE__ */ v("label", { className: u("vs-switch", r === "sm" && "vs-switch--sm", o), title: l, onClick: $, onKeyDown: $, onPointerDown: $, onMouseDown: $, onTouchStart: $, children: [
    a != null && /* @__PURE__ */ t("span", { "aria-hidden": "true", children: a }),
    /* @__PURE__ */ t("input", { type: "checkbox", role: "switch", "aria-label": n, checked: e, disabled: c, onChange: (i) => s(i.target.checked) })
  ] });
}
function ge({ value: e, min: s = 1, max: n = 100, step: a = 1, label: l, onCommit: r, format: c = String, className: o }) {
  const [i, d] = g(e), h = N(!1), m = N(e);
  k(() => {
    m.current = e, h.current || d(e);
  }, [e]);
  const _ = () => {
    h.current = !1, i !== m.current && (m.current = i, r(i));
  }, C = `${(i - s) / (n - s) * 100}%`;
  return /* @__PURE__ */ v("label", { className: u("vs-slider", o), style: { "--vs-slider-fill": C }, children: [
    /* @__PURE__ */ t(
      "input",
      {
        type: "range",
        "aria-label": l,
        min: s,
        max: n,
        step: a,
        value: i,
        onPointerDown: () => {
          h.current = !0;
        },
        onChange: (A) => d(Number(A.target.value)),
        onPointerUp: _,
        onPointerCancel: _,
        onKeyUp: _,
        onTouchEnd: _
      }
    ),
    /* @__PURE__ */ t("span", { className: "vs-slider__value", children: c(i) })
  ] });
}
function C1(e, s) {
  return s instanceof V && s.status >= 400 && s.status < 500 ? !1 : e < 2;
}
function Le() {
  return new e1({
    defaultOptions: {
      queries: { refetchOnWindowFocus: !0, staleTime: 0, retry: C1 },
      mutations: { retry: !1 }
    }
  });
}
const Q = X(null);
function we({ children: e, duration: s = 3500 }) {
  const [n, a] = g(null), l = N(void 0), r = x((c) => {
    clearTimeout(l.current), a((o) => ({ text: c, id: (o?.id ?? 0) + 1 })), l.current = setTimeout(() => a(null), s);
  }, [s]);
  return k(() => () => clearTimeout(l.current), []), /* @__PURE__ */ v(Q.Provider, { value: r, children: [
    e,
    n && s1(/* @__PURE__ */ t("div", { className: "vs-toast", role: "status", children: n.text }, n.id), document.body)
  ] });
}
function Me() {
  const e = J(Q);
  if (!e) throw new Error("useToast вне ToastProvider");
  return e;
}
function ke({ value: e, onChange: s, options: n, label: a, className: l, disabled: r }) {
  const [c, o] = g(!1);
  return k(() => c ? K() : void 0, [c]), /* @__PURE__ */ t(F, { disableStyleElements: !0, children: /* @__PURE__ */ v(b.Root, { open: c, onOpenChange: o, value: e, onValueChange: (i) => {
    i !== null && s(i);
  }, items: n, disabled: r, children: [
    /* @__PURE__ */ v("div", { className: u("vs-select", l), children: [
      /* @__PURE__ */ t(b.Label, { className: "vs-select__label", children: a }),
      /* @__PURE__ */ v(b.Trigger, { className: "vs-select__trigger", children: [
        /* @__PURE__ */ t(b.Value, { className: "vs-select__value" }),
        /* @__PURE__ */ t(b.Icon, { className: "vs-select__icon", children: /* @__PURE__ */ t(p, { name: "chevron-down", size: "sm" }) })
      ] })
    ] }),
    /* @__PURE__ */ t(b.Portal, { children: /* @__PURE__ */ t(b.Positioner, { className: "vs-select__positioner", sideOffset: 4, children: /* @__PURE__ */ t(b.Popup, { className: "vs-select__popup", children: /* @__PURE__ */ t(b.List, { className: "vs-select__list", children: n.map((i) => /* @__PURE__ */ v(b.Item, { value: i.value, className: "vs-select__item", children: [
      /* @__PURE__ */ t(b.ItemIndicator, { className: "vs-select__check", children: /* @__PURE__ */ t(p, { name: "check", size: "sm" }) }),
      /* @__PURE__ */ t(b.ItemText, { children: i.label })
    ] }, i.value)) }) }) }) })
  ] }) });
}
const f1 = 1500;
function N1({ item: e }) {
  return "options" in e ? /* @__PURE__ */ v(f.Group, { className: "vs-menu__group", children: [
    /* @__PURE__ */ t(f.GroupLabel, { className: "vs-menu__label", children: e.label }),
    /* @__PURE__ */ t(f.RadioGroup, { value: e.value, onValueChange: (s) => {
      s !== e.value && e.onValueChange(s);
    }, children: e.options.map((s) => /* @__PURE__ */ v(f.RadioItem, { value: s.value, disabled: s.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
      /* @__PURE__ */ t(f.RadioItemIndicator, { className: "vs-menu__check", children: /* @__PURE__ */ t(p, { name: "check", size: "sm" }) }),
      /* @__PURE__ */ t("span", { className: "vs-menu__text", children: s.label })
    ] }, s.value)) })
  ] }) : "checked" in e ? /* @__PURE__ */ v(f.CheckboxItem, { checked: e.checked, onCheckedChange: e.onCheckedChange, disabled: e.disabled, closeOnClick: !0, className: "vs-menu__item", children: [
    /* @__PURE__ */ t(f.CheckboxItemIndicator, { className: "vs-menu__check", children: /* @__PURE__ */ t(p, { name: "check", size: "sm" }) }),
    /* @__PURE__ */ t("span", { className: "vs-menu__text", children: e.label })
  ] }) : /* @__PURE__ */ t(f.Item, { onClick: e.onSelect, disabled: e.disabled, className: "vs-menu__item", children: /* @__PURE__ */ t("span", { className: "vs-menu__text", children: e.label }) });
}
function ye({ items: e, children: s, longPress: n = !0, disabled: a, className: l }) {
  const [r, c] = g(!1);
  k(() => r ? K() : void 0, [r]);
  const o = N(0), i = n ? {} : {
    onTouchStart: (d) => {
      o.current = Date.now(), d.preventBaseUIHandler();
    },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (d) => {
      (d.nativeEvent.pointerType === "touch" || Date.now() - o.current < f1) && d.preventBaseUIHandler();
    }
  };
  return /* @__PURE__ */ t(F, { disableStyleElements: !0, children: /* @__PURE__ */ v(f.Root, { open: r, onOpenChange: c, disabled: a, children: [
    /* @__PURE__ */ t(f.Trigger, { render: s, ...i }),
    /* @__PURE__ */ t(f.Portal, { children: /* @__PURE__ */ t(f.Positioner, { className: "vs-menu__positioner", children: /* @__PURE__ */ t(f.Popup, { className: u("vs-menu", l), children: e.map((d, h) => d === "separator" ? /* @__PURE__ */ t(f.Separator, { className: "vs-menu__separator" }, h) : /* @__PURE__ */ t(N1, { item: d }, h)) }) }) })
  ] }) });
}
const R = {
  get(e, s) {
    try {
      return localStorage.getItem(e) ?? s;
    } catch {
      return s;
    }
  },
  set(e, s) {
    try {
      localStorage.setItem(e, s);
    } catch {
    }
  }
};
function $e(e, s) {
  const [n, a] = g(() => R.get(e, s)), l = x((r) => {
    a(r), R.set(e, r);
  }, [e]);
  return [n, l];
}
export {
  V as ApiError,
  te as Artwork,
  I as Badge,
  ce as Banner,
  O1 as Button,
  de as Card,
  G1 as Checkbox,
  l1 as Chip,
  B1 as ChipGroup,
  se as Clock,
  Y1 as Cluster,
  ye as ContextMenu,
  X1 as ControlList,
  ee as ControlRow,
  ue as Disclosure,
  J1 as Divider,
  ve as EmptyState,
  ne as Excerpt,
  j as Field,
  z1 as ICON_NAMES,
  p as Icon,
  Q1 as IconButton,
  _e as KeyValue,
  Ce as Legend,
  F1 as Link,
  re as List,
  le as ListRow,
  ie as PageHeader,
  he as Progress,
  K1 as RadioGroup,
  Ne as SectionHeader,
  be as Segment,
  ke as Select,
  m1 as Sheet,
  ge as Slider,
  r1 as Spinner,
  me as SplitBar,
  D1 as SplitButton,
  q1 as Stack,
  ae as Stat,
  fe as StatusDot,
  Ae as Switch,
  pe as Table,
  oe as Tabs,
  R1 as Tag,
  S as Text,
  j1 as TextArea,
  U1 as TextField,
  W1 as Tile,
  we as ToastProvider,
  Z1 as api,
  E1 as clampText,
  P1 as compact,
  Le as createQueryClient,
  u as cx,
  x1 as fmtDate,
  T1 as fmtDay,
  I1 as linkify,
  V1 as localToday,
  S1 as plural,
  C1 as shouldRetry,
  R as storage,
  $e as useLocalStorage,
  i1 as useMediaQuery,
  Me as useToast
};
