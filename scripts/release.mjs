#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultGit = (cwd) => (args, { input, ...env } = {}) =>
  execFileSync("git", args, { cwd, encoding: "utf8", input, stdio: [input === undefined ? "ignore" : "pipe", "pipe", "pipe"], env: { ...process.env, ...env } }).trim();

export function release({ cwd, remote = "origin", git = defaultGit(cwd) }) {
  const pkg = JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
  const { version } = pkg;
  const tag = `v${version}`;
  if (git(["ls-remote", "--tags", remote, `refs/tags/${tag}`])) return { status: "exists", tag };
  if (!fs.existsSync(path.join(cwd, "dist", "index.js"))) throw new Error("нет dist/index.js — сначала npm run build");
  // отдельный индекс: коммит с dist собирается без переключения ветки и без следов в рабочей копии
  const index = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "vsui-index-")), "index");
  const env = { GIT_INDEX_FILE: index };
  try {
    git(["read-tree", "HEAD"], env);
    git(["add", "-f", "dist"], env);
    // npm ставит git-зависимость со скриптом build полной сборкой (npm install с dev-зависимостями) у каждого потребителя
    const { scripts, devDependencies, ...published } = pkg;
    const blob = git(["hash-object", "-w", "--stdin"], { input: `${JSON.stringify(published, null, 2)}\n` });
    git(["update-index", "--add", "--cacheinfo", `100644,${blob},package.json`], env);
    const tree = git(["write-tree"], env);
    const commit = git(["commit-tree", tree, "-p", "HEAD", "-m", `release ${tag}`]);
    git(["push", "-q", remote, `${commit}:refs/tags/${tag}`]);
  } finally {
    fs.rmSync(path.dirname(index), { recursive: true, force: true });
  }
  return { status: "released", tag };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const r = release({ cwd: process.cwd() });
    console.log(`${r.status} ${r.tag}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
