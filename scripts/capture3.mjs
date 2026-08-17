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
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const shot = async (name) => {
  await page.screenshot({ path: path.join(OUT, name), type: "png" });
  console.log("saved", name);
};
const clickText = async (exact) =>
  page.evaluate((t) => {
    const el = [...document.querySelectorAll("button,a,div,span")].find((e) => (e.innerText || "").trim() === t);
    if (el) {
      el.click();
      return true;
    }
    return false;
  }, exact);

await page.evaluateOnNewDocument((t) => localStorage.setItem("token", t), TOKEN);
await page.goto("http://127.0.0.1:18473/admin/settings", { waitUntil: "networkidle2", timeout: 60000 });
await wait(2500);
await shot("webui-admin-settings.png");
console.log("click Connections", await clickText("Connections"));
await wait(1800);
await shot("webui-connections.png");
console.log("click Models", await clickText("Models"));
await wait(1800);
await shot("webui-admin-models.png");
console.log("click Authentication", await clickText("Authentication"));
await wait(1500);
await shot("webui-admin-auth.png");

await page.goto("http://127.0.0.1:8188/", { waitUntil: "networkidle2", timeout: 60000 });
await wait(3500);
console.log("click View details", await clickText("View details"));
await wait(1500);
await shot("comfy-missing-details.png");
await clickText("Models");
await wait(1000);
await shot("comfy-models.png");

await browser.close();
console.log("done");
