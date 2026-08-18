import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = path.resolve("assets/shots");
const CHROME = process.env.CHROME || "/opt/google/chrome/chrome";
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  ["term-claude-help.png", "dgxspark@spark:~$", fs.readFileSync("/tmp/guide-cmd/claude-help.txt", "utf8")],
  ["term-claude-status.png", "dgxspark@spark:~$", fs.readFileSync("/tmp/guide-cmd/claude-status.txt", "utf8")],
  ["term-claude-models.png", "dgxspark@spark:~$", fs.readFileSync("/tmp/guide-cmd/claude-models.txt", "utf8")],
  ["term-claude-ping.png", "dgxspark@spark:~$", fs.readFileSync("/tmp/guide-cmd/claude-ping.txt", "utf8")],
];

function html(prompt, body) {
  const esc = (s) =>
    s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  return `<!doctype html><html><head><meta charset="utf-8">
<style>
  html,body{margin:0;background:#0c0f0b;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .term{background:#11160f;color:#e8f0e4;padding:18px 20px 22px;min-height:100vh;box-sizing:border-box}
  .bar{display:flex;gap:8px;align-items:center;margin-bottom:16px;color:#9db59a;font-size:13px}
  .d{width:12px;height:12px;border-radius:50%;display:inline-block;margin-right:4px}
  pre{margin:0;white-space:pre-wrap;font-size:15px;line-height:1.55}
  .p{color:#76b900}
</style></head><body><div class="term">
<div class="bar"><span class="d" style="background:#c2410c"></span><span class="d" style="background:#ca8a04"></span><span class="d" style="background:#16a34a"></span> Terminal · DGX Spark</div>
<pre><span class="p">${esc(prompt)}</span> ${esc(body.trim())}\n</pre>
</div></body></html>`;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1400,820"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 820, deviceScaleFactor: 1 });
for (const [name, prompt, body] of shots) {
  const file = `/tmp/guide-cmd/${name}.html`;
  fs.mkdirSync("/tmp/guide-cmd", { recursive: true });
  fs.writeFileSync(file, html(prompt, body));
  await page.goto("file://" + file, { waitUntil: "load" });
  await page.screenshot({ path: path.join(OUT, name), type: "png" });
  console.log("saved", name);
}
await browser.close();
