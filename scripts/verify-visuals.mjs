import puppeteer from "puppeteer-core";

const BASE = "http://127.0.0.1:8790";
const OUT = "/home/dgxspark/ai/studio-guide/assets/shots";
const browser = await puppeteer.launch({
  executablePath: "/opt/google/chrome/chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,1100"],
});
const page = await browser.newPage();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function inspect(url, label, width = 1440, height = 1100) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  const res = await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  await wait(400);
  const data = await page.evaluate(() => {
    const h2icos = [...document.querySelectorAll("section h2 .ico")].length;
    const h2s = [...document.querySelectorAll("section h2")].length;
    const remembers = document.querySelectorAll(".remember").length;
    const broken = [...document.images]
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.getAttribute("src"));
    const svgUse = [...document.querySelectorAll(".ico use")].map((u) => u.getAttribute("href"));
    return {
      title: document.title,
      h2s,
      h2icos,
      remembers,
      broken,
      svgUse: svgUse.slice(0, 8),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log("\n==", label, res.status(), "==");
  console.log(data);
  const shotName = label.replace(/[^\w-]+/g, "-") + ".png";
  await page.screenshot({ path: `${OUT}/${shotName}`, type: "png" });
  return data;
}

const fails = [];
const index = await inspect(`${BASE}/index.html`, "ui-index-icons");
if (index.broken.length) fails.push("index broken");
const models = await inspect(`${BASE}/models.html#why`, "ui-models-icons");
if (models.h2icos < 10) fails.push("models missing icons");
if (models.remembers < 8) fails.push("models missing remember");
if (models.broken.length) fails.push("models broken " + models.broken.join(","));
const hermes = await inspect(`${BASE}/hermes.html#what`, "ui-hermes-icons");
if (hermes.broken.length) fails.push("hermes broken");
const start = await inspect(`${BASE}/start.html`, "ui-start-icons");
if (start.broken.length) fails.push("start broken");
const mobile = await inspect(`${BASE}/models.html#twocmds`, "ui-models-icons-mobile", 390, 844);
if (mobile.overflow > 8) fails.push("mobile overflow " + mobile.overflow);
if (mobile.broken.length) fails.push("mobile broken");

console.log("\nFAILS", fails);
await browser.close();
if (fails.length) process.exit(1);
