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

async function shot(url, name, w = 1440, h = 1100) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  await wait(400);
  const data = await page.evaluate(() => ({
    bands: [...document.querySelectorAll(".band-head")].map((e) => e.textContent),
    tones: [...document.querySelectorAll("section[class*='tone-']")].length,
    looks: document.querySelectorAll("figure.look").length,
    broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src")),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  await page.screenshot({ path: `${OUT}/${name}.png`, type: "png" });
  console.log(name, data);
  return data;
}

const fails = [];
const a = await shot(`${BASE}/comfy.html`, "ui-comfy-layout");
if (a.bands.length < 4) fails.push("bands");
if (a.looks < 8) fails.push("looks " + a.looks);
if (a.broken.length) fails.push("broken " + a.broken.join(","));
await page.evaluate(() => document.getElementById("video")?.scrollIntoView());
await wait(200);
await page.screenshot({ path: `${OUT}/ui-comfy-layout-video.png`, type: "png" });
const b = await shot(`${BASE}/comfy.html`, "ui-comfy-layout-mobile", 390, 844);
if (b.overflow > 8) fails.push("mobile overflow " + b.overflow);
const c = await shot(`${BASE}/models.html#names`, "ui-models-layout");
if (c.broken.length) fails.push("models broken");
console.log("FAILS", fails);
await browser.close();
if (fails.length) process.exit(1);
