import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "/opt/google/chrome/chrome",
  headless: "new",
  defaultViewport: { width: 1440, height: 1100 },
  args: ["--no-sandbox", "--disable-gpu", "--window-size=1440,1100"],
});
const page = await browser.newPage();
await page.goto("http://127.0.0.1:8790/", { waitUntil: "networkidle2" });
await page.screenshot({ path: "/home/dgxspark/ai/studio-guide/assets/shots/guide-home.png", fullPage: false });
await page.click('a[href="#first-chat"]');
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: "/home/dgxspark/ai/studio-guide/assets/shots/guide-first-chat.png" });
await page.click('a[href="#comfy-enter"]');
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: "/home/dgxspark/ai/studio-guide/assets/shots/guide-comfy.png" });
// search
await page.type("#q", "start-nemotron");
await new Promise((r) => setTimeout(r, 400));
const hidden = await page.$$eval("section.hidden", (els) => els.length);
const shown = await page.$$eval("section:not(.hidden)", (els) => els.length);
console.log({ hidden, shown, title: await page.title() });
// broken images
const broken = await page.$$eval("img", (imgs) =>
  imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src)
);
console.log("broken", broken);
await browser.close();
