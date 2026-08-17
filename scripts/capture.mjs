import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = path.resolve("assets/shots");
const TOKEN = process.env.OWUI_TOKEN || "";
const CHROME = process.env.CHROME || "/opt/google/chrome/chrome";
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 1 },
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--window-size=1600,1000",
    "--hide-scrollbars",
  ],
});

async function shot(page, name, fullPage = false) {
  const dest = path.join(OUT, name);
  await page.screenshot({ path: dest, type: "png", fullPage });
  console.log("saved", dest);
}

async function wait(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function goto(page, url, extraMs = 1500) {
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await wait(extraMs);
}

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

// --- Open WebUI login (no auth) ---
await goto(page, "http://127.0.0.1:18473/auth", 2000);
await shot(page, "webui-login.png");

// --- inject session ---
if (!TOKEN) {
  console.error("OWUI_TOKEN missing");
  await browser.close();
  process.exit(1);
}

await page.evaluate((t) => {
  localStorage.setItem("token", t);
}, TOKEN);
await goto(page, "http://127.0.0.1:18473/", 4000);
await shot(page, "webui-home.png");

// model selector - click the model button near top
const modelClicked = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button, [role='button']")];
  const hit = buttons.find((b) => /Nemotron|Qwen|Select a model|เลือกโมเดล/i.test(b.innerText || ""));
  if (hit) {
    hit.click();
    return hit.innerText.slice(0, 80);
  }
  return "";
});
console.log("model click:", modelClicked || "(none)");
await wait(1500);
await shot(page, "webui-model-picker.png");
await page.keyboard.press("Escape");
await wait(500);

// sidebar / new chat area
await shot(page, "webui-sidebar.png");

// type a prompt but don't wait forever if input not found
const typed = await page.evaluate(() => {
  const ta = document.querySelector("textarea");
  if (!ta) return false;
  ta.focus();
  return true;
});
if (typed) {
  await page.keyboard.type("อธิบายสั้น ๆ เป็นภาษาไทย 2 ประโยค ว่าเครื่องนี้ใช้ทำอะไรได้", { delay: 15 });
  await wait(400);
  await shot(page, "webui-typed.png");
  await page.keyboard.down("Control");
  await page.keyboard.press("Enter");
  await page.keyboard.up("Control");
  // fallback Enter
  await wait(300);
  await page.keyboard.press("Enter");
  console.log("waiting for reply...");
  await wait(25000);
  await shot(page, "webui-chat-reply.png");
}

// settings / admin
for (const [url, name] of [
  ["http://127.0.0.1:18473/admin/settings", "webui-admin-settings.png"],
  ["http://127.0.0.1:18473/workspace", "webui-workspace.png"],
  ["http://127.0.0.1:18473/workspace/models", "webui-workspace-models.png"],
]) {
  await goto(page, url, 2500);
  await shot(page, name);
}

// try settings connections tab by clicking text
await goto(page, "http://127.0.0.1:18473/admin/settings", 2500);
await page.evaluate(() => {
  const el = [...document.querySelectorAll("a,button,div")].find((e) =>
    /Connections|เชื่อมต่อ|OpenAI/i.test(e.innerText || "")
  );
  el?.click();
});
await wait(1500);
await shot(page, "webui-connections.png");

// user settings
await goto(page, "http://127.0.0.1:18473/", 2000);
await page.evaluate(() => {
  const el = [...document.querySelectorAll("button,img,div")].find((e) =>
    /Settings|ตั้งค่า|Tee/i.test(e.getAttribute("aria-label") || e.innerText || "")
  );
  el?.click();
});
await wait(1200);
await shot(page, "webui-user-menu.png");

// --- ComfyUI ---
await goto(page, "http://127.0.0.1:8188/", 4000);
await shot(page, "comfy-home.png");

// click left tabs if present
async function clickText(re) {
  return page.evaluate((src) => {
    const rx = new RegExp(src, "i");
    const el = [...document.querySelectorAll("button,a,div,span")].find((e) => rx.test((e.innerText || "").trim()) && (e.innerText || "").trim().length < 24);
    if (el) {
      el.click();
      return el.innerText.trim();
    }
    return "";
  }, re.source);
}

for (const [re, name] of [
  [/Models/, "comfy-models.png"],
  [/Nodes/, "comfy-nodes.png"],
  [/Templates/, "comfy-templates.png"],
  [/Workflows/, "comfy-workflows.png"],
  [/Assets/, "comfy-assets.png"],
]) {
  const hit = await clickText(re);
  console.log("comfy click", hit || re);
  await wait(1200);
  await shot(page, name);
}

await browser.close();
console.log("done");
