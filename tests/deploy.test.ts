import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { afterEach, describe, expect, it } from "vitest";

const dirs: string[] = [];
afterEach(() => { for (const d of dirs.splice(0)) fs.rmSync(d, { recursive: true, force: true }); });
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vsui-deploy-"));
  dirs.push(dir);
  const bin = path.join(dir, "bin");
  const repo = path.join(dir, "repo");
  const prepared = path.join(dir, "prepared");
  fs.mkdirSync(bin);
  fs.mkdirSync(path.join(repo, "dist"), { recursive: true });
  fs.writeFileSync(path.join(repo, "dist/index.js"), "old");
  fs.mkdirSync(path.join(prepared, "dist"), { recursive: true });
  fs.mkdirSync(path.join(prepared, "dist-showcase"), { recursive: true });
  fs.writeFileSync(path.join(prepared, "dist/index.js"), "verified");
  fs.writeFileSync(path.join(prepared, "dist-showcase/index.html"), "showcase");
  fs.mkdirSync(path.join(dir, "scripts/repo-flow"), { recursive: true });
  fs.writeFileSync(path.join(dir, "scripts/repo-flow/deploy-lib.sh"), 'say() { :; }; ok() { :; }; fail() { echo "$*"; exit 1; }');
  fs.copyFileSync("deploy.sh", path.join(repo, "deploy.sh"));
  const script = (name: string, text: string) => fs.writeFileSync(path.join(bin, name), `#!/bin/bash\n${text}\n`, { mode: 0o755 });
  script("node", [
    'case "$1" in',
    '  */prepared-build.mjs) if [ "$2" = --prune ]; then echo prune >>"$TEST_LOG"; else [ "${FAIL_PREPARE:-0}" = 0 ] || exit 1; printf "%s\\n" "$PREPARED"; fi ;;',
    '  scripts/release.mjs) echo "exists 0.0.0" ;;',
    "esac",
  ].join("\n"));
  script("npm", 'echo npm >>"$TEST_LOG"');
  script("sudo", 'exec "$@"');
  script("ssh", 'cat >"$TEST_SHIPPED"');
  const log = path.join(dir, "calls");
  const shipped = path.join(dir, "shipped.tar");
  const run = (extra = {}) => spawnSync("bash", ["deploy.sh"], { cwd: repo, encoding: "utf8", env: { ...process.env, HOME: dir, TMPDIR: dir, PATH: `${bin}:/usr/bin:/bin`, PREPARED: prepared, TEST_LOG: log, TEST_SHIPPED: shipped, BOX_CHECKS_DIR: path.join(dir, "checks"), ...extra } });
  return { repo, log, shipped, run };
}
describe("deploy.sh", () => {
  it("ships the prepared build without npm", () => {
    const f = fixture();
    const r = f.run();
    expect(r.status, r.stdout + r.stderr).toBe(0);
    expect(fs.readFileSync(path.join(f.repo, "dist/index.js"), "utf8")).toBe("verified");
    expect(execFileSync("tar", ["-xOf", f.shipped, "./index.html"], { encoding: "utf8" })).toBe("showcase");
    expect(fs.readFileSync(f.log, "utf8")).toBe("prune\n");
  });
  it("leaves dist and the site untouched when preparation fails", () => {
    const f = fixture();
    expect(f.run({ FAIL_PREPARE: "1" }).status).toBe(1);
    expect(fs.readFileSync(path.join(f.repo, "dist/index.js"), "utf8")).toBe("old");
    expect(fs.existsSync(f.shipped)).toBe(false);
    expect(fs.existsSync(f.log)).toBe(false);
  });
});
