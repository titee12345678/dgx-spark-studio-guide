import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = path.resolve("assets/shots");
const TOKEN = process.env.OWUI_TOKEN;
const browser = await puppeteer.launch({
  executablePath: "/opt/google/chrome/chrome",
  headless: "new",
  defaultViewport: { width: 1600, height: 1000 },
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1600,1000"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000 });
const shot = async (name) => {
  await page.screenshot({ path: path.join(OUT, name), type: "png" });
  console.log("saved", name);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// login form filled (demo email only)
await page.goto("http://127.0.0.1:18473/auth", { waitUntil: "networkidle2" });
await wait(800);
await page.click('input[type="email"]');
await page.keyboard.type("you@example.com", { delay: 20 });
await page.click('input[type="password"]');
await page.keyboard.type("your-password", { delay: 20 });
await shot("webui-login-filled.png");

// authenticated home
await page.evaluate((t) => localStorage.setItem("token", t), TOKEN);
await page.goto("http://127.0.0.1:18473/", { waitUntil: "networkidle2" });
await wait(3000);

// click composer
const box = await page.evaluateHandle(() => {
  const el = [...document.querySelectorAll("div,textarea,[contenteditable]")].find((e) =>
    /How can I help you today/i.test(e.innerText || e.getAttribute("placeholder") || "")
  );
  return el || document.querySelector("[contenteditable='true']");
});
if (box) {
  await box.asElement()?.click();
}
await wait(300);
await page.keyboard.type("ตอบคำเดียวว่า pong", { delay: 20 });
await wait(400);
await shot("webui-typed.png");
await page.keyboard.press("Enter");
console.log("waiting reply");
for (let i = 0; i < 40; i++) {
  await wait(1500);
  const has = await page.evaluate(() => /pong|Pong|Thinking|คิด/i.test(document.body.innerText));
  if (has && i > 3) break;
}
await wait(2000);
await shot("webui-chat-reply.png");

// click left history icon (first button)
const icons = await page.$$("aside button, nav button, .flex button");
if (icons[0]) {
  await icons[0].click();
  await wait(800);
  await shot("webui-history.png");
}

// admin connections
await page.goto("http://127.0.0.1:18473/admin/settings", { waitUntil: "networkidle2" });
await wait(2000);
await page.evaluate(() => {
  const el = [...document.querySelectorAll("button,a,div")].find((e) => (e.innerText || "").trim() === "Connections");
  el?.click();
});
await wait(1500);
await shot("webui-connections.png");

await page.evaluate(() => {
  const el = [...document.querySelectorAll("button,a,div")].find((e) => (e.innerText || "").trim() === "Models");
  el?.click();
});
await wait(1500);
await shot("webui-admin-models.png");

// comfy missing details
await page.goto("http://127.0.0.1:8188/", { waitUntil: "networkidle2" });
await wait(3000);
await page.evaluate(() => {
  const el = [...document.querySelectorAll("button")].find((e) => /View details/i.test(e.innerText || ""));
  el?.click();
});
await wait(1200);
await shot("comfy-missing-details.png");

await browser.close();
console.log("done");
