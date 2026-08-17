import puppeteer from "puppeteer-core";

const pages = ["/", "/start.html", "/chat.html", "/models.html", "/comfy.html", "/system.html", "/fix.html"];
const browser = await puppeteer.launch({
  executablePath: "/opt/google/chrome/chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

async function check(width, height, name) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 800, hasTouch: width < 800 });
  const brokenAll = [];
  for (const path of pages) {
    const res = await page.goto("http://127.0.0.1:8790" + path, { waitUntil: "networkidle2", timeout: 30000 });
    const broken = await page.$$eval("img", (imgs) =>
      imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute("src"))
    );
    if (broken.length) brokenAll.push([path, broken]);
    console.log(name, path, res.status(), "broken", broken.length);
  }
  await page.goto("http://127.0.0.1:8790/", { waitUntil: "networkidle2" });
  await page.screenshot({ path: `/home/dgxspark/ai/studio-guide/assets/shots/ui-${name}-home.png` });
  await page.goto("http://127.0.0.1:8790/chat.html", { waitUntil: "networkidle2" });
  await page.screenshot({ path: `/home/dgxspark/ai/studio-guide/assets/shots/ui-${name}-chat.png` });
  if (width < 800) {
    await page.click(".menu-btn");
    await new Promise((r) => setTimeout(r, 300));
    await page.screenshot({ path: `/home/dgxspark/ai/studio-guide/assets/shots/ui-${name}-menu.png` });
  }
  await page.close();
  return brokenAll;
}

const a = await check(1440, 980, "desktop");
const b = await check(390, 844, "mobile");
console.log("broken desktop", a);
console.log("broken mobile", b);
await browser.close();
