#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultGit = (cwd) => (args, env = {}) =>
  execFileSync("git", args, { cwd, encoding: "utf8", env: { ...process.env, ...env } }).trim();

export function release({ cwd, remote = "origin", git = defaultGit(cwd) }) {
  const { version } = JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
  const tag = `v${version}`;
  if (git(["ls-remote", "--tags", remote, `refs/tags/${tag}`])) return { status: "exists", tag };
  if (!fs.existsSync(path.join(cwd, "dist", "index.js"))) throw new Error("нет dist/index.js — сначала npm run build");
  // отдельный индекс: коммит с dist собирается без переключения ветки и без следов в рабочей копии
  const index = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "vsui-index-")), "index");
  const env = { GIT_INDEX_FILE: index };
  try {
    git(["read-tree", "HEAD"], env);
    git(["add", "-f", "dist"], env);
    const tree = git(["write-tree"], env);
    const commit = git(["commit-tree", tree, "-p", "HEAD", "-m", `release ${tag}`]);
    git(["tag", tag, commit]);
    git(["push", "-q", remote, `refs/tags/${tag}`]);
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
