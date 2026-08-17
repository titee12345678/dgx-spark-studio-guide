import puppeteer from "puppeteer-core";
const BASE = "http://127.0.0.1:8790";
const OUT = "/home/dgxspark/ai/studio-guide/assets/shots";
const browser = await puppeteer.launch({
  executablePath: "/opt/google/chrome/chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,1100"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
await page.goto(`${BASE}/comfy.html#now`, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 400));
const before = await page.evaluate(() => {
  const img = document.querySelector("figure.look img");
  const r = img.getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), hint: !!document.querySelector(".zoom-hint") };
});
await page.screenshot({ path: `${OUT}/ui-zoom-before.png`, type: "png" });
await page.click("figure.look img");
await new Promise((r) => setTimeout(r, 400));
const open = await page.evaluate(() => {
  const box = document.querySelector(".lightbox");
  const img = box?.querySelector("img");
  return {
    open: box?.classList.contains("open"),
    src: img?.getAttribute("src"),
    w: img ? Math.round(img.getBoundingClientRect().width) : 0,
    h: img ? Math.round(img.getBoundingClientRect().height) : 0,
  };
});
await page.screenshot({ path: `${OUT}/ui-zoom-open.png`, type: "png" });
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 200));
const closed = await page.evaluate(() => document.querySelector(".lightbox")?.classList.contains("open"));
console.log({ before, open, closed });
const fails = [];
if (before.h < 300) fails.push("inline too short " + before.h);
if (!before.hint) fails.push("no hint");
if (!open.open) fails.push("lightbox not open");
if (!/comfy-home\.png$/.test(open.src || "")) fails.push("did not expand original " + open.src);
if (open.w < 700) fails.push("lightbox small " + open.w);
if (closed) fails.push("escape did not close");
console.log("FAILS", fails);
await browser.close();
if (fails.length) process.exit(1);
