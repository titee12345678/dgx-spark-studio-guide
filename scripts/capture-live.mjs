import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = path.resolve("assets/shots");
const TOKEN = fs.readFileSync("/tmp/owui.token", "utf8").trim();
const CHROME = "/opt/google/chrome/chrome";
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 1 },
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1600,1000", "--hide-scrollbars"],
});

async function shot(page, name) {
  const dest = path.join(OUT, name);
  await page.screenshot({ path: dest, type: "png" });
  console.log("saved", name);
}

const page = await browser.newPage();
await page.evaluateOnNewDocument((t) => localStorage.setItem("token", t), TOKEN);

// --- Open WebUI home with live Qwen 35B ---
await page.goto("http://127.0.0.1:18473/", { waitUntil: "networkidle2", timeout: 60000 });
await wait(3500);
await shot(page, "webui-qwen35-home.png");

const modelClicked = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button, [role='button']")];
  const hit = buttons.find((b) => /Qwen|Nemotron|Select a model|เลือกโมเดล|nvidia\//i.test(b.innerText || ""));
  if (hit) {
    hit.click();
    return (hit.innerText || "").slice(0, 120);
  }
  return "";
});
console.log("model click:", modelClicked || "(none)");
await wait(1800);
await shot(page, "webui-qwen35-picker.png");
await page.keyboard.press("Escape");
await wait(400);

// type a short test, send if possible
const typed = await page.evaluate(() => {
  const ta = document.querySelector("textarea");
  if (!ta) return false;
  ta.focus();
  ta.value = "";
  ta.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
});
if (typed) {
  await page.click("textarea");
  await page.keyboard.type("ตอบคำเดียวว่า pong", { delay: 20 });
  await wait(400);
  await shot(page, "webui-qwen35-typed.png");
  await page.keyboard.press("Enter");
  // wait for some reply text, max ~90s
  const start = Date.now();
  while (Date.now() - start < 90000) {
    const hasReply = await page.evaluate(() => {
      const t = document.body.innerText || "";
      return /\bpong\b/i.test(t) && t.split("pong").length > 2;
    });
    if (hasReply) break;
    await wait(2000);
  }
  await wait(1500);
  await shot(page, "webui-qwen35-reply.png");
}

// --- Hermes live ---
const hermes = await browser.newPage();
await hermes.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });
for (const [url, name, extra] of [
  ["http://127.0.0.1:18789/", "hermes-home-now.png", 3000],
  ["http://127.0.0.1:18789/chat", "hermes-chat-now.png", 3000],
  ["http://127.0.0.1:18789/sessions", "hermes-sessions-now.png", 2500],
]) {
  await hermes.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await wait(extra);
  await shot(hermes, name);
}

// models JSON in browser
await page.goto("http://127.0.0.1:8000/v1/models", { waitUntil: "networkidle2" });
await wait(400);
await shot(page, "api-models-browser.png");

await browser.close();
console.log("live capture done");
