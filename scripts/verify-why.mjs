import puppeteer from "puppeteer-core";

const BASE = "http://127.0.0.1:8790";
const OUT = "/home/dgxspark/ai/studio-guide/assets/shots";

const browser = await puppeteer.launch({
  executablePath: "/opt/google/chrome/chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,1100"],
});

async function checkPage(page, url, label) {
  const res = await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  const status = res?.status();
  await page.waitForSelector("main.main, .hero", { timeout: 10000 });
  const broken = await page.$$eval("img", (imgs) =>
    imgs
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.getAttribute("src"))
  );
  const sections = await page.$$eval("section", (els) =>
    els.map((e) => ({ id: e.id, h2: e.querySelector("h2")?.innerText || "", h: e.offsetHeight }))
  );
  const overflow = await page.evaluate(() => {
    const docs = document.documentElement;
    return { scrollW: docs.scrollWidth, clientW: docs.clientWidth };
  });
  console.log(`\n== ${label} ${url} status=${status} ==`);
  console.log("sections", sections);
  console.log("broken", broken);
  console.log("overflow", overflow);
  return { status, broken, sections, overflow };
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });

const models = await checkPage(page, `${BASE}/models.html#why`, "desktop-models");
await page.screenshot({ path: `${OUT}/ui-models-why.png`, fullPage: false });
await page.goto(`${BASE}/models.html#names`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${OUT}/ui-models-names.png`, fullPage: false });
await page.goto(`${BASE}/models.html#ramwhy`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${OUT}/ui-models-ram.png`, fullPage: false });
await page.goto(`${BASE}/models.html#verify35`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${OUT}/ui-models-verify.png`, fullPage: false });

const hermes = await checkPage(page, `${BASE}/hermes.html#name`, "desktop-hermes");
await page.screenshot({ path: `${OUT}/ui-hermes-name.png`, fullPage: false });

const fix = await checkPage(page, `${BASE}/fix.html#hermes`, "desktop-fix");
await page.screenshot({ path: `${OUT}/ui-fix-hermes.png`, fullPage: false });

// search filter on models
await page.goto(`${BASE}/models.html`, { waitUntil: "networkidle2" });
await page.type("#q", "404");
await new Promise((r) => setTimeout(r, 300));
const shown = await page.$$eval("section:not(.hidden)", (els) => els.map((e) => e.id));
console.log("search 404 shown", shown);

// mobile
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(`${BASE}/models.html#why`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 400));
const mobileOverflow = await page.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
}));
await page.screenshot({ path: `${OUT}/ui-models-why-mobile.png`, fullPage: false });
await page.goto(`${BASE}/hermes.html#name`, { waitUntil: "networkidle2" });
await page.screenshot({ path: `${OUT}/ui-hermes-name-mobile.png`, fullPage: false });
console.log("mobile overflow", mobileOverflow);

const fails = [];
if (models.status !== 200) fails.push("models status");
if (hermes.status !== 200) fails.push("hermes status");
if (fix.status !== 200) fails.push("fix status");
if (models.broken.length) fails.push("models broken imgs");
if (hermes.broken.length) fails.push("hermes broken imgs");
if (!shown.includes("names") || !shown.includes("why")) fails.push("search 404 filter");
if (mobileOverflow.scrollW > mobileOverflow.clientW + 8) fails.push("mobile overflow");
console.log("\nFAILS", fails);
await browser.close();
if (fails.length) process.exit(1);
