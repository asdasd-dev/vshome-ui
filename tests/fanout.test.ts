// @vitest-environment node
// @ts-expect-error — scripts/fanout.mjs обычный node-модуль без типов
import { fanout, summary, taskId } from "../scripts/fanout.mjs";

const consumer = (name: string) => ({ name, repo: `asdasd-dev/${name}`, path: `/home/v/${name}`, remote: "github", base: "main", web: "web", test: "npm test", build: "npm run build" });

function fakes({ red = [] as string[], dupFirst = false, failCmd = [] as string[], clean = false, failClose = false } = {}) {
  const cmds: string[] = [];
  const tasks: string[][] = [];
  let next = 300;
  let dup = dupFirst;
  const sh = async (cmd: string, cwd: string) => {
    cmds.push(`${cwd} $ ${cmd}`);
    if (red.some((n) => cwd.includes(`/${n}-ui-`)) && cmd === "npm test") return { code: 1, out: "FAIL Board.test.tsx\nexpected 1 got 2" };
    if (failCmd.some((p) => cmd.startsWith(p))) return { code: 1, out: `boom: ${cmd}` };
    if (cmd === "git status --porcelain") return { code: 0, out: clean ? "" : " M package.json\n" };
    if (cmd.startsWith("gh pr create")) return { code: 0, out: "https://github.com/x/y/pull/7" };
    return { code: 0, out: "" };
  };
  const task = async (args: string[]) => {
    tasks.push(args);
    if (args[0] === "create" && dup) { dup = false; return { code: 3, out: '{"created":false,"similar":[{"id":250,"key":"T-250"}]}' }; }
    if (args[0] === "create") { next += 1; return { code: 0, out: `{"created":true,"id":${next},"key":"T-${next}"}` }; }
    if (args[0] === "close" && failClose) return { code: 1, out: "nope" };
    return { code: 0, out: "{}" };
  };
  return { sh, task, cmds, tasks, log: () => {} };
}

describe("fanout", () => {
  it("зелёный сайт: бамп, тесты и сборка до push, ветка раскатки, PR и автомёрж; задача раскатки закрыта", async () => {
    const f = fakes();
    const r = await fanout({ tag: "v0.2.0", consumers: [consumer("personalai")], ...f });
    expect(r).toEqual({ rollout: "T-301", green: ["personalai"], red: [] });
    const wt = "/home/v/personalai-ui-v0.2.0";
    const order = f.cmds.map((c) => c.replace(/^.* \$ /, ""));
    expect(order.indexOf("npm test")).toBeLessThan(order.findIndex((c) => c.startsWith("git push")));
    expect(f.cmds).toContain(`${wt}/web $ npm install --save-exact @vshome/ui@github:asdasd-dev/vshome-ui#v0.2.0`);
    expect(f.cmds.some((c) => c.includes("git push -q -u github T-301-ui-v0.2.0"))).toBe(true);
    expect(f.cmds.some((c) => c.startsWith(`${wt} $ gh pr merge`) && c.includes("--squash"))).toBe(true);
    expect(f.cmds.some((c) => c.includes("git worktree remove"))).toBe(true);
    expect(f.cmds.some((c) => c.includes("--delete-branch"))).toBe(false);
    expect(f.cmds.some((c) => c.includes("git push -q github --delete T-301-ui-v0.2.0"))).toBe(true);
    expect(f.cmds).toContain(`/home/v/personalai $ git branch -D ui-v0.2.0-tmp`);
    expect(f.cmds).toContain(`/home/v/personalai $ git branch -D T-301-ui-v0.2.0`);
    expect(f.tasks.at(-1)).toEqual(expect.arrayContaining(["close", "--id", "T-301", "--as", "done"]));
  });
  it("красный сайт: задача на починку с agent true и логом, PR к ней, без мёржа; зелёные не блокирует", async () => {
    const f = fakes({ red: ["lenta-tracker"] });
    const r = await fanout({ tag: "v0.2.0", consumers: [consumer("lenta-tracker"), consumer("personalai")], ...f });
    expect(r.green).toEqual(["personalai"]);
    expect(r.red).toEqual([{ name: "lenta-tracker", task: "T-302" }]);
    const fix = f.tasks.find((a) => a[0] === "create" && a.includes("--agent"))!;
    expect(fix).toEqual(expect.arrayContaining(["--agent", "true", "--title", "lenta-tracker: не собирается с @vshome/ui v0.2.0"]));
    expect(fix.join(" ")).toContain("expected 1 got 2");
    const lenta = f.cmds.filter((c) => c.startsWith("/home/v/lenta-tracker-ui-"));
    expect(lenta.some((c) => c.includes("git push -q -u github T-302-ui-v0.2.0"))).toBe(true);
    expect(lenta.some((c) => c.includes("gh pr merge"))).toBe(false);
  });
  it("похожая задача раскатки — повтор с --not-duplicate-of", async () => {
    const f = fakes({ dupFirst: true });
    await fanout({ tag: "v0.2.1", consumers: [consumer("personalai")], ...f });
    expect(f.tasks[1]).toEqual(expect.arrayContaining(["--not-duplicate-of", "250"]));
  });
  it("нет потребителей — ничего не делает", async () => {
    const f = fakes();
    expect(await fanout({ tag: "v0.2.0", consumers: [], ...f })).toEqual({ rollout: null, green: [], red: [] });
    expect(f.tasks).toEqual([]);
  });
  it("npm install упал: задача на починку с логом, красный с ключом, без push и мёржа", async () => {
    const f = fakes({ failCmd: ["npm install"] });
    const r = await fanout({ tag: "v0.2.0", consumers: [consumer("personalai")], ...f });
    expect(r.red).toEqual([{ name: "personalai", task: "T-302" }]);
    const fix = f.tasks.find((a) => a[0] === "create" && a.includes("--agent"))!;
    expect(fix.join(" ")).toContain("boom: npm install --save-exact");
    expect(f.cmds.some((c) => c.includes("gh pr merge"))).toBe(false);
  });
  it("gh pr create упал после задачи на починку: красный с ключом починки", async () => {
    const f = fakes({ red: ["personalai"], failCmd: ["gh pr create"] });
    const r = await fanout({ tag: "v0.2.0", consumers: [consumer("personalai")], ...f });
    expect(r.red).toEqual([{ name: "personalai", task: "T-302" }]);
    expect(f.cmds.some((c) => c.includes("gh pr merge"))).toBe(false);
  });
  it("зелёный, но gh pr merge упал: красный с ключом раскатки, задача не закрыта", async () => {
    const f = fakes({ failCmd: ["gh pr merge"] });
    const r = await fanout({ tag: "v0.2.0", consumers: [consumer("personalai")], ...f });
    expect(r.red).toEqual([{ name: "personalai", task: "T-301" }]);
    expect(f.tasks.some((a) => a[0] === "close")).toBe(false);
    expect(summary("v0.2.0", r)).toContain("задача раскатки не закрыта");
  });
  it("закрытие задачи не удалось во всех попытках: в сводке «не закрыта»", async () => {
    const f = fakes({ failClose: true });
    const r = await fanout({ tag: "v0.2.0", consumers: [consumer("personalai")], delay: async () => {}, ...f });
    expect(f.tasks.filter((a) => a[0] === "close")).toHaveLength(3);
    expect(summary("v0.2.0", r)).toContain("не закрыта");
  });
  it("после install нет изменений: сайт уже на теге, без коммита, push и PR", async () => {
    const f = fakes({ clean: true });
    const r = await fanout({ tag: "v0.2.0", consumers: [consumer("personalai")], ...f });
    expect(r.green).toEqual(["personalai"]);
    expect(f.cmds.some((c) => /git commit|git push|gh pr/.test(c))).toBe(false);
    expect(f.cmds.some((c) => c.includes("git worktree remove"))).toBe(true);
  });
  it("перед созданием worktree чистит хвосты прерванного запуска", async () => {
    const f = fakes();
    await fanout({ tag: "v0.2.0", consumers: [consumer("personalai")], ...f });
    const order = f.cmds.map((c) => c.replace(/^.* \$ /, ""));
    const add = order.findIndex((c) => c.startsWith("git worktree add"));
    expect(order.slice(0, add)).toEqual(expect.arrayContaining(["git worktree prune", "git branch -D ui-v0.2.0-tmp"]));
  });
  it("taskId и сводка", () => {
    expect(taskId('{"created":true,"id":5,"key":"T-5"}\nT-5 · inbox')).toBe("T-5");
    expect(summary("v0.2.0", { rollout: "T-9", green: ["personalai"], red: [{ name: "lenta-tracker", task: "T-10" }] }))
      .toBe("раскатка v0.2.0 (T-9): обновлены personalai; красные: lenta-tracker → T-10");
    expect(summary("v0.2.0", { rollout: null, green: [], red: [] })).toBe("раскатка v0.2.0: потребителей нет");
  });
});
