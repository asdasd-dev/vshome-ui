// @vitest-environment node
import fs from "node:fs";
import { sharedTestSetup, vshomeBuild, vshomeTest } from "../src/node/vite";

const names = (c: ReturnType<typeof vshomeBuild>) => (c.plugins ?? []).flat().map((p) => (p && typeof p === "object" && "name" in p ? p.name : ""));

describe("vshomeBuild", () => {
  it("React, hex-хеши и outDir; singlefile только по флагу", () => {
    const c = vshomeBuild({ outDir: "dist/x" });
    expect(c.build?.outDir).toBe("dist/x");
    expect(c.build?.rollupOptions?.output).toEqual({ hashCharacters: "hex" });
    expect(names(c).some((n) => /react/.test(n))).toBe(true);
    expect(names(c).some((n) => /singlefile/i.test(n))).toBe(false);
    expect(names(vshomeBuild({ outDir: "x", singleFile: true })).some((n) => /singlefile/i.test(n))).toBe(true);
  });
  it("прокси /api только когда задан адрес", () => {
    expect(vshomeBuild({ outDir: "x" }).server).toBeUndefined();
    expect(vshomeBuild({ outDir: "x", proxy: "http://box:8110" }).server?.proxy).toEqual({ "/api": { target: "http://box:8110", changeOrigin: true } });
  });
});

describe("vshomeTest", () => {
  it("jsdom, московское время, общий setup первым", () => {
    const t = vshomeTest({ setupFiles: ["src/test/setup.ts"] });
    expect(t.environment).toBe("jsdom");
    expect(t.env).toEqual({ TZ: "Europe/Moscow" });
    expect(t.setupFiles).toEqual([sharedTestSetup, "src/test/setup.ts"]);
  });
  it("общий setup лежит рядом с пресетом", () => {
    expect(sharedTestSetup.endsWith("test-setup.js")).toBe(true);
    expect(fs.existsSync(sharedTestSetup.replace(/\.js$/, ".ts")) || fs.existsSync(sharedTestSetup)).toBe(true);
  });
});
