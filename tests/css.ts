import fs from "node:fs";
import path from "node:path";

const dir = path.join(__dirname, "..", "src", "components");
export const cssFiles = () => fs.readdirSync(dir).filter((f) => f.endsWith(".css"));
export const allCss = () => cssFiles().map((f) => fs.readFileSync(path.join(dir, f), "utf8")).join("\n");
