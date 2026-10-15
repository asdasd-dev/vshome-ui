import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const entries = ["src/index.ts", "src/charts/index.ts"].map((f) => path.join(root, f));
const program = ts.createProgram(entries, { jsx: ts.JsxEmit.ReactJSX, strict: true, skipLibCheck: true, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 });
const checker = program.getTypeChecker();

const defaultsOf = (file, component) => {
  const src = fs.readFileSync(file, "utf8");
  const m = src.match(new RegExp(`export function ${component}(?:<[^>]*>)?\\(\\{([^}]*)\\}`));
  const out = {};
  if (!m) return out;
  for (const part of m[1].split(",")) {
    const d = part.match(/^\s*(?:as:\s*\w+\s*=|(\w+)\s*=)\s*(.+?)\s*$/);
    if (d && d[1]) out[d[1]] = d[2];
    const asDef = part.match(/^\s*as:\s*\w+\s*=\s*(.+?)\s*$/);
    if (asDef) out.as = asDef[1];
  }
  return out;
};

const FLAGS = ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType;
const aliases = [];
for (const entry of entries) {
  const mod = checker.getSymbolAtLocation(program.getSourceFile(entry));
  for (const sym of checker.getExportsOfModule(mod)) {
    const target = sym.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym) : sym;
    if (!(target.flags & ts.SymbolFlags.TypeAlias) || /Props$/.test(sym.name)) continue;
    const text = checker.typeToString(checker.getDeclaredTypeOfSymbol(target), undefined, FLAGS);
    if (text.includes("|")) aliases.push([text, sym.name]);
  }
}
const named = (t) => aliases.reduce((acc, [text, name]) => acc.split(text).join(name), t);

const result = {};
for (const entry of entries) {
  const sf = program.getSourceFile(entry);
  const mod = checker.getSymbolAtLocation(sf);
  for (const sym of checker.getExportsOfModule(mod)) {
    if (!/^[A-Z]\w*Props$/.test(sym.name)) continue;
    const target = sym.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym) : sym;
    const decl = target.declarations?.[0];
    if (!decl) continue;
    const type = checker.getDeclaredTypeOfSymbol(target);
    const component = sym.name.replace(/Props$/, "");
    const defaults = defaultsOf(decl.getSourceFile().fileName, component);
    const props = [];
    let inherits = null;
    for (const p of checker.getPropertiesOfType(type)) {
      const pd = p.declarations?.[0];
      if (!pd) continue;
      const fromReact = pd.getSourceFile().fileName.includes("node_modules");
      if (fromReact) { inherits = inherits ?? (pd.parent?.name?.text ?? "HTML"); continue; }
      const t = pd.type ? pd.type.getText().replace(/\s+/g, " ") : named(checker.typeToString(checker.getTypeOfSymbolAtLocation(p, pd), undefined, FLAGS));
      props.push({ name: p.name, type: t.replace(/ \| undefined$/, ""), required: !(p.flags & ts.SymbolFlags.Optional), default: defaults[p.name] ?? null, deprecated: ts.getJSDocTags(pd).some((x) => x.tagName.text === "deprecated") });
    }
    result[component] = { file: path.relative(root, decl.getSourceFile().fileName), props, inherits };
  }
}
const out = path.join(root, "showcase", "props.json");
const json = JSON.stringify(result, null, 2) + "\n";
if (process.argv.includes("--check")) {
  if (!fs.existsSync(out) || fs.readFileSync(out, "utf8") !== json) { console.error("showcase/props.json устарел: npm run showcase:props"); process.exit(1); }
} else fs.writeFileSync(out, json);
