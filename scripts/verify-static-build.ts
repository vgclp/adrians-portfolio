import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";
import { staticDeployment } from "../src/lib/static-deployment";

const deployment = staticDeployment(true);
const output = resolve(deployment.publicDir);
const index = resolve(output, "index.html");
if (!existsSync(index)) throw new Error(`Missing prerendered homepage: ${index}`);
const html = readFileSync(index, "utf8");
if (!html.includes("<html") || !html.includes("Adrian") || !html.includes('id="kontakt"')) {
  throw new Error("The homepage must contain the prerendered portfolio, not an empty shell.");
}

function files(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const file = resolve(directory, name);
    return statSync(file).isDirectory() ? files(file) : [file];
  });
}
const emitted = files(output);
for (const extension of [".css", ".js"]) {
  if (!emitted.some((file) => file.endsWith(extension))) throw new Error(`Missing ${extension} assets`);
}

function checkAsset(value: string) {
  if (/^(?:https?:|data:|mailto:|#|\/\/)/i.test(value)) return;
  const url = new URL(value, `https://example.test${deployment.base}`);
  if (!url.pathname.startsWith(deployment.base)) throw new Error(`Asset escapes Pages base: ${value}`);
  const file = resolve(output, decodeURIComponent(url.pathname.slice(deployment.base.length)));
  if (!file.startsWith(`${output}/`) || !existsSync(file)) throw new Error(`Missing local asset: ${value}`);
}
for (const match of html.matchAll(/<(?:script|link|img|source)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
  const value = match[1];
  if (value) checkAsset(value.replaceAll("&amp;", "&"));
}
console.log(`Verified ${relative(process.cwd(), index)} and ${emitted.length} static files.`);