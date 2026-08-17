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

async function inspect(url, label, w = 1440, h = 1100) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  const res = await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  await wait(500);
  const data = await page.evaluate(() => {
    const h2s = [...document.querySelectorAll("section h2")];
    return {
      status: document.title,
      h2: h2s.length,
      icos: h2s.filter((h) => h.querySelector(".ico")).length,
      remembers: document.querySelectorAll(".remember").length,
      broken: [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.getAttribute("src")),
      icons: h2s.map((h) => ({
        id: h.parentElement.id,
        href: h.querySelector("use")?.getAttribute("href") || "",
        text: h.innerText.trim().slice(0, 40),
      })),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log("\n==", label, res && res.status(), "==");
  console.log(JSON.stringify(data, null, 2));
  await page.screenshot({ path: `${OUT}/${label}.png`, type: "png" });
  return data;
}

const fails = [];
const comfy = await inspect(`${BASE}/comfy.html#what`, "ui-comfy-what");
if (comfy.h2 < 15) fails.push("too few sections");
if (comfy.icos !== comfy.h2) fails.push("missing h2 icons");
if (comfy.broken.length) fails.push("broken " + comfy.broken.join(","));
const film = comfy.icons.find((i) => i.id === "video");
if (!film || !film.href.includes("i-film")) fails.push("video icon not film");
const power = comfy.icons.find((i) => i.id === "open");
if (!power || !power.href.includes("i-power")) fails.push("open icon not power");
const prompt = comfy.icons.find((i) => i.id === "t2i");
if (!prompt || !prompt.href.includes("i-prompt")) fails.push("t2i icon not prompt");

await inspect(`${BASE}/comfy.html#video`, "ui-comfy-video");
await inspect(`${BASE}/comfy.html#first`, "ui-comfy-first");
const mobile = await inspect(`${BASE}/comfy.html#video`, "ui-comfy-video-mobile", 390, 844);
if (mobile.overflow > 8) fails.push("mobile overflow " + mobile.overflow);
if (mobile.broken.length) fails.push("mobile broken");

const chat = await inspect(`${BASE}/chat.html#open`, "ui-chat-open-icon");
const chatOpen = chat.icons.find((i) => i.id === "open");
if (!chatOpen || !chatOpen.href.includes("i-browser")) fails.push("chat open should stay browser");

console.log("\nFAILS", fails);
await browser.close();
if (fails.length) process.exit(1);
