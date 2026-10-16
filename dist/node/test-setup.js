import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// jsdom не реализует эти API; сайт может подменить их своими во втором setup-файле
if (typeof window !== "undefined") {
    window.scrollTo ??= () => { };
    Element.prototype.scrollIntoView ??= () => { };
    window.matchMedia ??= (query) => ({
        matches: false, media: query, onchange: null,
        addEventListener() { }, removeEventListener() { }, addListener() { }, removeListener() { }, dispatchEvent: () => false,
    });
    window.IntersectionObserver ??= class {
        root = null;
        rootMargin = "";
        thresholds = [];
        observe() { }
        unobserve() { }
        disconnect() { }
        takeRecords() { return []; }
    };
    // jsdom не считает раскладку: графики @vshome/ui/charts получают ширину 600
    window.ResizeObserver ??= class {
        cb;
        constructor(cb) {
            this.cb = cb;
        }
        observe(target) {
            this.cb([{ target, contentRect: { width: 600, height: 0 } }], this);
        }
        unobserve() { }
        disconnect() { }
    };
}
afterEach(() => {
    cleanup();
    if (typeof window !== "undefined")
        localStorage.clear();
});
