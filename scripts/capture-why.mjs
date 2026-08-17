import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = path.resolve("assets/shots");
const CHROME = process.env.CHROME || "/opt/google/chrome/chrome";
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  ["term-two-cmds.png", 900, fs.readFileSync("/tmp/guide-cmd/two-cmds.txt", "utf8")],
  ["term-status-now.png", 780, fs.readFileSync("/tmp/guide-cmd/status-now.txt", "utf8")],
  ["term-models-json.png", 1100, fs.readFileSync("/tmp/guide-cmd/models-json.txt", "utf8")],
  ["term-inspect-cmd.png", 980, fs.readFileSync("/tmp/guide-cmd/inspect-cmd.txt", "utf8")],
  ["term-free-now.png", 620, fs.readFileSync("/tmp/guide-cmd/free-now.txt", "utf8")],
  ["term-name-match.png", 700, fs.readFileSync("/tmp/guide-cmd/name-match.txt", "utf8")],
  ["term-name-404.png", 640, fs.readFileSync("/tmp/guide-cmd/name-404.txt", "utf8")],
  ["term-hermes-now.png", 900, fs.readFileSync("/tmp/guide-cmd/hermes-now.txt", "utf8")],
];

function html(body) {
  const esc = (s) =>
    s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  html,body{margin:0;background:#0b1209;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .term{background:#0d140b;color:#dcecc8;padding:18px 20px 22px;min-height:100vh;box-sizing:border-box}
  .bar{display:flex;gap:8px;align-items:center;margin-bottom:16px;color:#9aa392;font-size:13px}
  .d{width:12px;height:12px;border-radius:50%;display:inline-block;margin-right:4px}
  pre{margin:0;white-space:pre-wrap;font-size:14px;line-height:1.5}
  .p{color:#76b900}
</style></head><body><div class="term">
<div class="bar"><span class="d" style="background:#c2410c"></span><span class="d" style="background:#ca8a04"></span><span class="d" style="background:#76b900"></span> Terminal · DGX Spark</div>
<pre>${esc(body.trim())}\n</pre>
</div></body></html>`;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1400,1100"],
});
const page = await browser.newPage();
for (const [name, height, body] of shots) {
  const file = `/tmp/guide-cmd/${name}.html`;
  fs.writeFileSync(file, html(body));
  await page.setViewport({ width: 1400, height, deviceScaleFactor: 1 });
  await page.goto("file://" + file, { waitUntil: "load" });
  await page.screenshot({ path: path.join(OUT, name), type: "png" });
  console.log("saved", name);
}
await browser.close();
