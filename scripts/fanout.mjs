#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = "fanout";

export function taskId(out) {
  const m = /"key":"(T-\d+)"/.exec(out);
  if (!m) throw new Error(`task.mjs не вернул ключ задачи: ${out.slice(0, 200)}`);
  return m[1];
}

async function createTask(task, args) {
  let r = await task(["create", ...args]);
  if (r.code === 3) {
    const ids = [...r.out.matchAll(/"id":(\d+)/g)].map((m) => m[1]);
    r = await task(["create", ...args, "--not-duplicate-of", ids.join(",")]);
  }
  if (r.code !== 0) throw new Error(`task.mjs create: ${r.out.slice(0, 300)}`);
  return taskId(r.out);
}

async function must(sh, cmd, cwd) {
  const r = await sh(cmd, cwd);
  if (r.code !== 0) throw new Error(`${cmd} (${cwd}): ${r.out.slice(-500)}`);
  return r.out;
}

const tail = (s, n = 40) => s.split("\n").slice(-n).join("\n");

async function check(sh, c, web) {
  for (const cmd of [c.test, c.build]) {
    const r = await sh(cmd, web);
    if (r.code !== 0) return { ok: false, log: `$ ${cmd}\n${tail(r.out)}` };
  }
  return { ok: true, log: "" };
}

async function rollOne({ c, tag, rollout, sh, task, log }) {
  const wt = `${c.path}-ui-${tag}`;
  const tmp = `ui-${tag}-tmp`;
  const web = path.join(wt, c.web);
  await must(sh, `git fetch -q ${c.remote}`, c.path);
  await must(sh, `git worktree add -q ${wt} -b ${tmp} ${c.remote}/${c.base}`, c.path);
  try {
    await must(sh, `npm install --save-exact @vshome/ui@github:asdasd-dev/vshome-ui#${tag}`, web);
    const result = await check(sh, c, web);
    const key = result.ok ? rollout : await createTask(task, [
      "--source", SOURCE, "--domain", "personal-os", "--agent", "true",
      "--title", `${c.name}: не собирается с @vshome/ui ${tag}`,
      "--body", `Где: раскатка @vshome/ui ${tag} (${rollout}), ${c.repo}.\nДоказательство:\n${result.log}\nЧем грозит: сайт остаётся на прежней версии UI.\nЧто предлагаю: починить сборку в открытом PR этой задачи (ветка <ключ>-ui-${tag}), смёржить — сайт получит новый UI.`,
    ]);
    const branch = `${key}-ui-${tag}`;
    await must(sh, `git branch -m ${tmp} ${branch}`, wt);
    await must(sh, `git add -A ${c.web}`, wt);
    await must(sh, `git commit -q -m "${key} @vshome/ui ${tag}" -m "Раскатка ${rollout}."`, wt);
    await must(sh, `git push -q -u ${c.remote} ${branch}`, wt);
    const title = result.ok ? `[${key}] @vshome/ui ${tag}` : `[${key}] @vshome/ui ${tag} — не собирается`;
    await must(sh, `gh pr create --repo ${c.repo} --base ${c.base} --head ${branch} --title "${title}" --body "Раскатка @vshome/ui ${tag} (${rollout})."`, wt);
    if (result.ok) await must(sh, `gh pr merge ${branch} --repo ${c.repo} --squash --delete-branch`, wt);
    log(`${c.name}: ${result.ok ? "смёржено" : `красный → ${key}`}`);
    return result.ok ? { ok: true } : { ok: false, task: key };
  } finally {
    await sh(`git worktree remove --force ${wt}`, c.path);
    await sh(`git branch -D ${tmp}`, c.path);
  }
}

export async function fanout({ tag, consumers, sh, task, log = console.log }) {
  if (!consumers.length) return { rollout: null, green: [], red: [] };
  const rollout = await createTask(task, [
    "--source", SOURCE, "--domain", "personal-os",
    "--title", `UI ${tag} → сайты`,
    "--body", `Где: релиз @vshome/ui ${tag}.\nДоказательство: тег ${tag} в asdasd-dev/vshome-ui.\nЧем грозит: —\nЧто предлагаю: раскатка по ${consumers.map((c) => c.name).join(", ")}; зелёные мёржатся автоматически.`,
  ]);
  const green = [];
  const red = [];
  for (const c of consumers) {
    try {
      const r = await rollOne({ c, tag, rollout, sh, task, log });
      if (r.ok) green.push(c.name);
      else red.push({ name: c.name, task: r.task });
    } catch (e) {
      log(`${c.name}: ошибка раскатки — ${e.message}`);
      red.push({ name: c.name, task: "—" });
    }
  }
  const result = { rollout, green, red };
  // агент не может закрыть задачу с открытым PR, а статус PR обновляет вебхук — даём ему догнать мёрж
  for (let i = 0; i < 3; i++) {
    const r = await task(["close", "--id", rollout, "--source", SOURCE, "--as", "done", "--text", summary(tag, result)]);
    if (r.code === 0) break;
    await new Promise((res) => setTimeout(res, 5000));
  }
  return result;
}

export function summary(tag, { rollout, green, red }) {
  if (!rollout) return `раскатка ${tag}: потребителей нет`;
  const parts = [`обновлены ${green.length ? green.join(", ") : "—"}`];
  if (red.length) parts.push(`красные: ${red.map((r) => `${r.name} → ${r.task}`).join(", ")}`);
  return `раскатка ${tag} (${rollout}): ${parts.join("; ")}`;
}

function shReal(cmd, cwd) {
  return new Promise((resolve) => {
    const p = spawn("bash", ["-lc", cmd], { cwd });
    let out = "";
    p.stdout.on("data", (d) => { out += d; });
    p.stderr.on("data", (d) => { out += d; });
    p.on("close", (code) => resolve({ code: code ?? 1, out }));
  });
}

const TASK_CLI = path.join(os.homedir(), "personalai", "scripts", "task.mjs");
const taskReal = (args) => shReal(["node", TASK_CLI, ...args].map((a) => `'${a.replaceAll("'", "'\\''")}'`).join(" "), os.homedir());

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const tag = process.argv[2];
  if (!/^v\d+\.\d+\.\d+$/.test(tag ?? "")) { console.error("usage: fanout.mjs vX.Y.Z"); process.exit(2); }
  const here = path.dirname(fileURLToPath(import.meta.url));
  const consumers = JSON.parse(fs.readFileSync(path.join(here, "..", "consumers.json"), "utf8"));
  const result = await fanout({ tag, consumers, sh: shReal, task: taskReal });
  console.log(summary(tag, result));
}
