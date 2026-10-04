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

async function run(sh, cmd, cwd) {
  const r = await sh(cmd, cwd);
  return r.code === 0 ? { ok: true, log: "" } : { ok: false, log: `$ ${cmd}\n${tail(r.out)}` };
}

async function check(sh, c, web) {
  for (const cmd of [c.test, c.build]) {
    const r = await run(sh, cmd, web);
    if (!r.ok) return r;
  }
  return { ok: true, log: "" };
}

function createFixTask(task, c, tag, rollout, evidence, proposal) {
  return createTask(task, [
    "--source", SOURCE, "--domain", "personal-os",
    "--title", `${c.name}: не собирается с @vshome/ui ${tag}`,
    "--body", `Где: раскатка @vshome/ui ${tag} (${rollout}), ${c.repo}.\nДоказательство:\n${evidence}\nЧем грозит: сайт остаётся на прежней версии UI.\nЧто предлагаю: ${proposal}`,
  ]);
}

async function rollOne({ c, tag, rollout, sh, task, log }) {
  const wt = `${c.path}-ui-${tag}`;
  const tmp = `ui-${tag}-tmp`;
  const web = path.join(wt, c.web);
  let branch = null;
  let key = null;
  await sh(`git worktree remove --force ${wt}`, c.path);
  await sh("git worktree prune", c.path);
  await sh(`git branch -D ${tmp}`, c.path);
  await must(sh, `git fetch -q ${c.remote}`, c.path);
  await must(sh, `git worktree add -q ${wt} -b ${tmp} ${c.remote}/${c.base}`, c.path);
  try {
    const installed = await run(sh, `npm install --save-exact @vshome/ui@github:asdasd-dev/vshome-ui#${tag}`, web);
    if (!installed.ok) {
      key = await createFixTask(task, c, tag, rollout, installed.log,
        `обновить @vshome/ui до ${tag} в ${c.repo} вручную и починить установку; PR не открыт — установка упала до коммита.`);
      log(`${c.name}: установка упала → ${key}`);
      return { ok: false, task: key };
    }
    const status = await must(sh, "git status --porcelain", wt);
    if (!status.trim()) {
      log(`${c.name}: уже на ${tag}`);
      return { ok: true };
    }
    const result = await check(sh, c, web);
    key = result.ok ? rollout : await createFixTask(task, c, tag, rollout, result.log,
      "починить сборку в PR, привязанном к этой задаче, и смёржить — сайт получит новый UI.");
    branch = `${key}-ui-${tag}`;
    await must(sh, `git branch -m ${tmp} ${branch}`, wt);
    await must(sh, `git add -A ${c.web}`, wt);
    await must(sh, `git commit -q -m "${key} @vshome/ui ${tag}" -m "Раскатка ${rollout}."`, wt);
    await must(sh, `git push -q -u ${c.remote} ${branch}`, wt);
    const title = result.ok ? `[${key}] @vshome/ui ${tag}` : `[${key}] @vshome/ui ${tag} — не собирается`;
    await must(sh, `gh pr create --repo ${c.repo} --base ${c.base} --head ${branch} --title "${title}" --body "Раскатка @vshome/ui ${tag} (${rollout})."`, wt);
    if (!result.ok) {
      log(`${c.name}: красный → ${key}`);
      return { ok: false, task: key };
    }
    const merged = await sh(`gh pr merge ${branch} --repo ${c.repo} --squash`, wt);
    if (merged.code !== 0) {
      log(`${c.name}: мёрж не удался — ${merged.out.slice(-300)}`);
      return { ok: false, task: rollout };
    }
    await sh(`git push -q ${c.remote} --delete ${branch}`, wt);
    log(`${c.name}: смёржено`);
    return { ok: true };
  } catch (e) {
    if (key === null) throw e;
    log(`${c.name}: ${e.message}`);
    return { ok: false, task: key };
  } finally {
    await sh(`git worktree remove --force ${wt}`, c.path);
    await sh(`git branch -D ${tmp}`, c.path);
    if (branch) await sh(`git branch -D ${branch}`, c.path);
  }
}

export async function fanout({ tag, consumers, sh, task, log = console.log, delay = (ms) => new Promise((res) => setTimeout(res, ms)) }) {
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
  let closed = false;
  if (!red.some((r) => r.task === rollout)) {
    // агент не может закрыть задачу с открытым PR, а статус PR обновляет вебхук — даём ему догнать мёрж
    for (let i = 0; i < 3 && !closed; i++) {
      const r = await task(["close", "--id", rollout, "--source", SOURCE, "--as", "done", "--text", summary(tag, result)]);
      closed = r.code === 0;
      if (!closed && i < 2) await delay(5000);
    }
  }
  if (!closed) result.unclosed = true;
  return result;
}

export function summary(tag, { rollout, green, red, unclosed }) {
  if (!rollout) return `раскатка ${tag}: потребителей нет`;
  const parts = [`обновлены ${green.length ? green.join(", ") : "—"}`];
  if (red.length) parts.push(`красные: ${red.map((r) => `${r.name} → ${r.task}`).join(", ")}`);
  if (unclosed) parts.push("задача раскатки не закрыта");
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
