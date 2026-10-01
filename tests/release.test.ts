// @vitest-environment node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-expect-error — scripts/release.mjs обычный node-модуль без типов
import { release } from "../scripts/release.mjs";

const git = (cwd: string, ...args: string[]) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

const roots: string[] = [];
afterAll(() => {
  for (const r of roots) fs.rmSync(r, { recursive: true, force: true });
});

function setup(version: string) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vsui-release-"));
  roots.push(root);
  const remote = path.join(root, "remote.git");
  const work = path.join(root, "work");
  git(root, "init", "-q", "--bare", "-b", "main", remote);
  git(root, "clone", "-q", remote, work);
  git(work, "config", "user.email", "t@t");
  git(work, "config", "user.name", "t");
  fs.writeFileSync(path.join(work, "package.json"), JSON.stringify({
    name: "@vshome/ui",
    version,
    type: "module",
    exports: { ".": "./dist/index.js" },
    peerDependencies: { react: "^19.0.0" },
    scripts: { build: "vite build" },
    devDependencies: { vite: "7.3.5" },
  }));
  fs.writeFileSync(path.join(work, ".gitignore"), "dist/\n");
  git(work, "add", "-A");
  git(work, "commit", "-q", "-m", "init");
  git(work, "push", "-q", "origin", "HEAD:main");
  fs.mkdirSync(path.join(work, "dist"));
  fs.writeFileSync(path.join(work, "dist", "index.js"), "export const x = 1;\n");
  return { remote, work };
}

describe("release", () => {
  it("ставит тег на коммит с dist вне main; main и рабочая копия не меняются", () => {
    const { remote, work } = setup("0.2.0");
    const head = git(work, "rev-parse", "HEAD");
    expect(release({ cwd: work })).toEqual({ status: "released", tag: "v0.2.0" });
    expect(git(remote, "ls-tree", "-r", "--name-only", "v0.2.0")).toContain("dist/index.js");
    expect(git(remote, "rev-parse", "v0.2.0^")).toBe(head);
    expect(git(remote, "rev-parse", "main")).toBe(head);
    expect(git(work, "rev-parse", "HEAD")).toBe(head);
    expect(git(work, "status", "--porcelain")).toBe("");
  });
  it("package.json в теге без scripts и devDependencies — npm не собирает git-зависимость у потребителя", () => {
    const { remote, work } = setup("0.2.0");
    const before = fs.readFileSync(path.join(work, "package.json"), "utf8");
    release({ cwd: work });
    const tagged = JSON.parse(git(remote, "show", "v0.2.0:package.json"));
    expect(tagged.scripts).toBeUndefined();
    expect(tagged.devDependencies).toBeUndefined();
    expect(tagged).toMatchObject({ name: "@vshome/ui", version: "0.2.0", type: "module", exports: { ".": "./dist/index.js" }, peerDependencies: { react: "^19.0.0" } });
    expect(JSON.parse(git(remote, "show", "main:package.json")).scripts).toEqual({ build: "vite build" });
    expect(fs.readFileSync(path.join(work, "package.json"), "utf8")).toBe(before);
    expect(git(work, "status", "--porcelain")).toBe("");
  });
  it("тег уже есть — exists, ничего не пушит", () => {
    const { remote, work } = setup("0.2.0");
    release({ cwd: work });
    const tagged = git(remote, "rev-parse", "v0.2.0");
    expect(release({ cwd: work })).toEqual({ status: "exists", tag: "v0.2.0" });
    expect(git(remote, "rev-parse", "v0.2.0")).toBe(tagged);
  });
  it("нет dist — ошибка, тег не ставится", () => {
    const { remote, work } = setup("0.3.0");
    fs.rmSync(path.join(work, "dist"), { recursive: true });
    expect(() => release({ cwd: work })).toThrow(/dist/);
    expect(git(remote, "tag")).toBe("");
  });
  it("упавший push не оставляет локальный тег — повтор проходит", () => {
    const { remote, work } = setup("0.4.0");
    git(work, "remote", "set-url", "origin", "/nonexistent.git");
    expect(() => release({ cwd: work })).toThrow();
    git(work, "remote", "set-url", "origin", remote);
    expect(release({ cwd: work })).toEqual({ status: "released", tag: "v0.4.0" });
    expect(git(remote, "ls-tree", "-r", "--name-only", "v0.4.0")).toContain("dist/index.js");
  });
});
