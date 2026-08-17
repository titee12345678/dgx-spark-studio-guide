import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = path.resolve("assets/shots");
const browser = await puppeteer.launch({
  executablePath: "/opt/google/chrome/chrome",
  headless: "new",
  defaultViewport: { width: 1600, height: 1000 },
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1600,1000"],
});
const page = await browser.newPage();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const shot = async (name) => {
  await page.screenshot({ path: path.join(OUT, name), type: "png" });
  console.log("saved", name);
};

for (const [url, name, extra] of [
  ["http://127.0.0.1:18789/", "hermes-home.png", 3500],
  ["http://127.0.0.1:18789/chat", "hermes-chat.png", 3500],
  ["http://127.0.0.1:18789/sessions", "hermes-sessions.png", 2500],
  ["http://127.0.0.1:18789/settings", "hermes-settings.png", 2500],
  ["http://127.0.0.1:18789/docs", "hermes-docs.png", 2500],
]) {
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await wait(extra);
  await shot(name);
}

await browser.close();
console.log("done");
