const NAV = [
  ["index.html", "หน้าแรก", "i-home"],
  ["start.html", "เริ่มต้น", "i-start"],
  ["chat.html", "แชท", "i-chat"],
  ["models.html", "โมเดล", "i-brain"],
  ["comfy.html", "ภาพ/วิดีโอ", "i-media"],
  ["hermes.html", "Hermes", "i-agent"],
  ["claude.html", "Claude", "i-claude"],
  ["system.html", "ระบบ", "i-sys"],
  ["fix.html", "แก้ปัญหา", "i-fix"],
  ["terms.html", "ศัพท์", "i-book"],
];

const SECTION_ICON = {
  overview: "i-studio", map: "i-map", status: "i-pulse", terminal: "i-term", check: "i-checklist",
  open: "i-browser", signup: "i-user", login: "i-key", ui: "i-layout", pick: "i-list",
  send: "i-send", more: "i-more", controls: "i-sliders", admin: "i-gear", conn: "i-plug",
  list: "i-chip", cmds: "i-term", stop: "i-stop", nemotron: "i-bolt", qwen27: "i-chat",
  why: "i-warn", twocmds: "i-split", path: "i-path", inside: "i-gear", names: "i-tag",
  ramwhy: "i-ram", fixed: "i-ok", qwen35: "i-brain", verify35: "i-checklist", webui: "i-browser", kv: "i-layers",
  enter: "i-browser", place: "i-folder", run: "i-play",
  what: "i-split", now: "i-pin", dash: "i-dash", talk: "i-chat", sessions: "i-folder",
  cli: "i-term", model: "i-link", name: "i-tag", fix: "i-fix",
  ops: "i-sys", ram: "i-ram", dont: "i-ban",
  nomodel: "i-empty", stuck: "i-clock", comfy: "i-media", phone: "i-phone", hermes: "i-agent", claude: "i-claude",
  first: "i-image", wire: "i-wire", t2i: "i-prompt", i2i: "i-editimg",
  video: "i-film", i2v: "i-frames", upscale: "i-expand", save: "i-save",
  nodes: "i-wire", catalog: "i-download",
  how: "i-book", base: "i-studio", hw: "i-ram", llm: "i-brain", files: "i-folder",
  quant: "i-layers", serve: "i-plug", infer: "i-pulse", ctx: "i-layers",
  image: "i-image", video: "i-film", docker: "i-sys", net: "i-globe",
  cmds: "i-term", err: "i-warn", agent: "i-agent",
};

const PAGE_ICONS = {
  "start.html": { overview: "i-studio", map: "i-map", status: "i-pulse", terminal: "i-term", check: "i-checklist" },
  "chat.html": {
    open: "i-browser", signup: "i-user", login: "i-key", ui: "i-layout",
    pick: "i-list", send: "i-send", more: "i-more", controls: "i-sliders",
    admin: "i-gear", conn: "i-plug",
  },
  "models.html": {
    list: "i-chip", cmds: "i-term", stop: "i-stop", nemotron: "i-bolt", qwen27: "i-chat",
    why: "i-warn", twocmds: "i-split", path: "i-path", inside: "i-gear", names: "i-tag",
    ramwhy: "i-ram", fixed: "i-ok", qwen35: "i-brain", verify35: "i-checklist",
    webui: "i-browser", kv: "i-layers",
  },
  "comfy.html": {
    what: "i-media", now: "i-pulse", open: "i-power", enter: "i-browser", ui: "i-canvas",
    wire: "i-wire", place: "i-folder", first: "i-image", t2i: "i-prompt", i2i: "i-editimg",
    video: "i-film", i2v: "i-frames", upscale: "i-expand", save: "i-save",
    nodes: "i-plugin", catalog: "i-download", ram: "i-ram", fix: "i-fix", dont: "i-ban",
  },
  "hermes.html": {
    what: "i-split", now: "i-pin", check: "i-checklist", dash: "i-dash", ui: "i-layout",
    talk: "i-chat", sessions: "i-folder", cli: "i-term", model: "i-link",
    name: "i-tag", fix: "i-fix",
  },
  "claude.html": {
    pick: "i-split", pro: "i-key", quota: "i-clock", local: "i-chip",
    switch: "i-split", more: "i-list", fix: "i-fix",
  },
  "system.html": { ops: "i-sys", ram: "i-ram", dont: "i-ban" },
  "fix.html": {
    webui: "i-browser", nomodel: "i-empty", stuck: "i-clock", ram: "i-ram",
    comfy: "i-media", run: "i-play", hermes: "i-agent", claude: "i-claude", phone: "i-phone",
  },
  "terms.html": {
    how: "i-book", base: "i-studio", hw: "i-chip", llm: "i-brain", files: "i-folder",
    quant: "i-layers", serve: "i-plug", infer: "i-pulse", ctx: "i-ram",
    chat: "i-chat", agent: "i-agent", image: "i-image", video: "i-film",
    docker: "i-sys", net: "i-globe", cmds: "i-term", err: "i-warn",
  },
};

const PAGE_REMEMBER = {
  "claude.html": {
    pick: "จำง่าย: ล็อกอินใช้ pro · โควตาหมดค่อย local · คนละเซสชัน",
    pro: "จำง่าย: claude-use login แล้ว claude-use pro",
    quota: "จำง่าย: /usage → /exit → claude-use local ไม่มีสวิตช์ลับ",
    local: "จำง่าย: claude-use local qwen35",
    switch: "จำง่าย: ออกก่อนทุกครั้ง แล้วค่อยสลับเส้นทาง",
    more: "จำง่าย: fallback-model ไม่ได้พาไป Qwen",
    fix: "จำง่าย: Not signed in = ยังไม่ได้ login",
  },
  "comfy.html": {
    what: "จำง่าย: ComfyUI คนละระบบกับแชท ภาพนิ่งคนละกราฟกับวิดีโอ",
    now: "จำง่าย: เว็บเปิดได้แล้ว แต่โฟลเดอร์โมเดลภาพยังว่าง สร้างจริงยังไม่ได้",
    open: "จำง่าย: เปิดด้วยสคริปต์ start.sh อย่าไปยุ่งคอนเทนเนอร์โมเดลแชท",
    enter: "จำง่าย: ที่อยู่คือ :8188 ต้องเห็นผืนผ้าใบและปุ่มฟ้า Run",
    ui: "จำง่าย: ซ้ายคือเมนู กลางคือกราฟ กรอบแดง = ยังไม่มีไฟล์",
    ram: "จำง่าย: อย่ารันวิดีโอคู่ Qwen 35B หรือ Nemotron",
    fix: "จำง่าย: กรอบแดงคือไฟล์ขาด ไม่ใช่เครื่องพัง",
    dont: "จำง่าย: ห้ามลบโฟลเดอร์โมเดล ห้ามเริ่มคลิปยาวเป็นงานแรก",
  },
};

const REMEMBER = {
  overview: "จำง่าย: แชท / โมเดล / ภาพ / เอเจนต์ คนละโปรแกรม คนละพอร์ต",
  map: "จำง่าย: 18473 แชท · 8000 โมเดล · 8188 ภาพ · 18789 เอเจนต์",
  list: "จำง่าย: ไฟล์อยู่บนดิสก์แล้ว เปิดได้ทีละตัว",
  cmds: "จำง่าย: คำสั่งสตูดิโอขึ้นต้น start- เสมอ",
  stop: "จำง่าย: ปิดโมเดลด้วย stop-model ไม่ใช่ปิดแท็บเว็บ",
  why: "จำง่าย: ไม่ใช่ไฟล์หาย เป็นชื่อเรียก + สูตรจอง RAM",
  twocmds: "จำง่าย: start-qwen35 ≠ qwen35-start คนละไฟล์ คนละกล่อง",
  path: "จำง่าย: พิมพ์ start- ก่อน แล้วค่อยกด Tab",
  inside: "จำง่าย: start- ปิดของเก่าทั้งชุด · qwen35-start ปลุกกล่องเก่า",
  names: "จำง่าย: ไฟล์ ≠ ชื่อที่เสิร์ฟ ≠ ชื่อที่ Hermes ยิง",
  ramwhy: "จำง่าย: ดู available ไม่ใช่ used · Qwen35=0.35 Qwen27=0.50 Nemotron=0.60",
  fixed: "จำง่าย: วันนี้ใช้ start-qwen35 อันเดียว ทั้งแชทและ Hermes",
  qwen35: "จำง่าย: พิมพ์ start-qwen35 แล้วรอ Ready จนเห็นชื่อเต็ม",
  verify35: "จำง่าย: API มีชื่อเต็ม + Hermes healthy + แชทตอบได้",
  kv: "จำง่าย: RAM พุ่งตอนเปิด เพราะกันที่ให้บทสนทนายาวไว้ก่อน",
  what: "จำง่าย: NemoClaw ถือกรง · Hermes คือเอเจนต์ในกรง",
  model: "จำง่าย: Hermes ไม่โหลดโมเดลเอง มันยิงไปพอร์ต 8000",
  name: "จำง่าย: ชื่อต้องตรงทุกตัวอักษร ไม่ตรง = 404",
  launch: "จำง่าย: พิมพ์ claude-local ไม่ใช่ claude",
  switch: "จำง่าย: ออกจากเซสชันก่อน แล้ว claude-local ชื่อใหม่",
  future: "จำง่าย: ใส่ชื่อสั้นไม่มี / แล้ว start-* ใหม่ wrapper อ่านเอง",
  cloud: "จำง่าย: claude เปล่า ๆ ยังไป Anthropic",
  first: "จำง่าย: กราฟเริ่มต้นคือ Z-Image-Turbo ยังขาดไฟล์สองก้อน",
  wire: "จำง่าย: ต่อจุดสีเดียวกัน ม่วงโมเดล เหลืองข้อความ ชมพู latent ฟ้าภาพ",
  t2i: "จำง่าย: Templates → Image → เขียนพรอมต์ → Run เมื่องานไม่มีกรอบแดง",
  i2i: "จำง่าย: วางรูปใน input แล้วบอกว่าจะเปลี่ยนอะไร",
  video: "จำง่าย: เริ่ม 3–5 วินาที ไม่เกิน 720p ห้ามเริ่มคลิปยาว",
  i2v: "จำง่าย: ใส่รูปนิ่ง แล้วอธิบายการเคลื่อนไหว ไม่ใช่แค่วัตถุ",
  upscale: "จำง่าย: ขยายภาพทีหลัง · เพิ่มเฟรมด้วย RIFE หลังมีคลิปสั้น",
  save: "จำง่าย: ผลอยู่ที่ ~/ai/comfyui/output กราฟเซฟที่ workflows",
  catalog: "จำง่าย: อย่าโหลดทุกตัว เริ่ม Z-Image ก่อน วิดีโอค่อย Wan",
  nodes: "จำง่าย: มี Manager, Video Helper, KJNodes, RIFE อยู่แล้ว",
};

const THEME_KEY = "guide-theme";

function currentTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    const match = document.cookie.match(/(?:^|; )guide-theme=(light|dark)/);
    if (match) return match[1];
  } catch (_) {}
  return "dark";
}

function applyTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("light", theme === "light");
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, theme);
      document.cookie = `${THEME_KEY}=${theme};path=/;max-age=31536000;SameSite=Lax`;
    } catch (_) {}
  }
  const btn = document.querySelector(".theme-btn");
  if (btn) btn.textContent = theme === "light" ? "โหมดมืด" : "โหมดสว่าง";
}

window.addEventListener("storage", (e) => {
  if (e.key === THEME_KEY && (e.newValue === "light" || e.newValue === "dark")) {
    applyTheme(e.newValue, false);
  }
});

function ico(id) {
  return `<span class="ico" aria-hidden="true"><svg><use href="assets/icons.svg#${id}"></use></svg></span>`;
}

function currentFile() {
  const path = location.pathname.split("/").pop() || "index.html";
  return path === "" ? "index.html" : path;
}

function injectChrome() {
  const here = currentFile();
  const bar = document.querySelector(".topbar");
  if (bar && !bar.dataset.ready) {
    bar.dataset.ready = "1";
    bar.innerHTML = `
      <a class="brand" href="index.html">
        <span class="mark">N</span>
        <span><small>DGX Spark</small><b>คู่มือสตูดิโอ AI</b></span>
      </a>
      <nav class="top-nav">
        ${NAV.map(([href, label, icon]) => `<a href="${href}" class="${href === here ? "active" : ""}">${ico(icon)}${label}</a>`).join("")}
      </nav>
      <button class="theme-btn" type="button" aria-label="สลับโหมดสว่างหรือมืด"></button>
      <button class="menu-btn" type="button" aria-label="เมนู">☰</button>
    `;
  }
  if (!document.querySelector(".mobile-nav")) {
    const here = currentFile();
    const drawer = document.createElement("nav");
    drawer.className = "mobile-nav";
    drawer.innerHTML = NAV.map(([href, label, icon]) => `<a href="${href}" class="${href === here ? "active" : ""}">${ico(icon)}${label}</a>`).join("");
    document.body.appendChild(drawer);
  }
  if (!document.querySelector(".scrim")) {
    const scrim = document.createElement("div");
    scrim.className = "scrim";
    document.body.appendChild(scrim);
    scrim.addEventListener("click", () => document.body.classList.remove("nav-open"));
  }
  document.querySelector(".menu-btn")?.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });
  document.querySelector(".theme-btn")?.addEventListener("click", () => {
    applyTheme(currentTheme() === "light" ? "dark" : "light");
  });
  applyTheme(currentTheme());
  document.querySelectorAll(".side a, .top-nav a").forEach((a) => {
    a.addEventListener("click", () => document.body.classList.remove("nav-open"));
  });
}

const q = document.querySelector("#q");
const links = [...document.querySelectorAll(".nav a")];
const sections = links
  .map((a) => {
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#")) return null;
    return document.querySelector(href);
  })
  .filter(Boolean);

q?.addEventListener("input", () => {
  const term = q.value.trim().toLowerCase();
  document.querySelectorAll("section").forEach((sec) => {
    const cards = [...sec.querySelectorAll(".term")];
    if (cards.length) {
      let any = !term;
      cards.forEach((card) => {
        const hit = !term || card.innerText.toLowerCase().includes(term);
        card.classList.toggle("hidden", !hit);
        if (hit) any = true;
      });
      sec.classList.toggle("hidden", !any);
    } else {
      const hit = !term || sec.innerText.toLowerCase().includes(term);
      sec.classList.toggle("hidden", !hit);
    }
  });
  links.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const sec = href.startsWith("#") ? document.querySelector(href) : null;
    a.classList.toggle("hidden", !!(sec && sec.classList.contains("hidden")));
  });
});

function syncSideNav() {
  if (!sections.length) return;
  const line = (document.querySelector(".topbar")?.offsetHeight || 64) + 28;
  const visible = sections.filter((sec) => !sec.classList.contains("hidden"));
  if (!visible.length) return;
  let current = visible[0];
  for (const sec of visible) {
    if (sec.getBoundingClientRect().top <= line) current = sec;
  }
  const root = document.scrollingElement || document.documentElement;
  if (root.scrollTop + window.innerHeight >= root.scrollHeight - 16) {
    current = visible[visible.length - 1];
  }
  const hash = `#${current.id}`;
  let activeLink = null;
  links.forEach((a) => {
    const on = a.getAttribute("href") === hash;
    a.classList.toggle("active", on);
    if (on) activeLink = a;
  });
  if (activeLink) {
    const nav = activeLink.closest(".side");
    if (nav) {
      const a = activeLink.getBoundingClientRect();
      const b = nav.getBoundingClientRect();
      if (a.top < b.top + 8 || a.bottom > b.bottom - 8) {
        activeLink.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }
  }
}

let spyTick = 0;
function requestSync() {
  if (spyTick) return;
  spyTick = requestAnimationFrame(() => {
    spyTick = 0;
    syncSideNav();
  });
}

window.addEventListener("scroll", requestSync, { passive: true });
window.addEventListener("resize", requestSync);
document.addEventListener("click", (e) => {
  const a = e.target.closest(".side .nav a[href^='#']");
  if (!a) return;
  links.forEach((x) => x.classList.toggle("active", x === a));
});

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.parentElement.querySelector("pre")?.innerText || "";
    await navigator.clipboard.writeText(text);
    btn.textContent = "คัดลอกแล้ว";
    setTimeout(() => (btn.textContent = "คัดลอก"), 1200);
  });
});

function decorateSections() {
  const page = currentFile();
  const map = { ...SECTION_ICON, ...(PAGE_ICONS[page] || {}) };
  document.querySelectorAll("section[id] > h2").forEach((h2) => {
    const id = h2.parentElement.id;
    const icon = map[id];
    if (icon && !h2.querySelector(".ico")) {
      h2.insertAdjacentHTML("afterbegin", ico(icon));
    }
    const sec = h2.parentElement;
    if (id && !sec.querySelector(":scope > .sec-art")) {
      const img = document.createElement("img");
      img.className = "sec-art";
      img.src = `assets/sec/${id}.jpg`;
      img.alt = "";
      img.addEventListener("error", () => img.remove());
      h2.insertAdjacentElement("afterend", img);
    }
    const tip = (PAGE_REMEMBER[page] && PAGE_REMEMBER[page][id]) || REMEMBER[id];
    if (tip && !sec.querySelector(":scope > .remember")) {
      const after = sec.querySelector(":scope > .sec-art") || h2;
      after.insertAdjacentHTML("afterend", `<p class="remember">${tip.replace(/^จำง่าย:\s*/, "")}</p>`);
    }
  });
  document.querySelectorAll(".side .nav a[href^='#']").forEach((a) => {
    const id = (a.getAttribute("href") || "").slice(1);
    const icon = map[id];
    if (icon && !a.querySelector(".ico")) a.insertAdjacentHTML("afterbegin", ico(icon));
  });
  document.querySelectorAll(".tile[href]").forEach((tile) => {
    const href = tile.getAttribute("href");
    const hit = NAV.find(([h]) => h === href);
    if (hit && !tile.querySelector(".ico")) {
      tile.insertAdjacentHTML("afterbegin", ico(hit[2]));
    }
  });
}

const BANDS = {
  "start.html": [
    ["รู้จักเครื่อง", "know", ["overview", "map", "status"]],
    ["ลงมือ", "file", ["terminal", "check"]],
  ],
  "chat.html": [
    ["เข้าสู่ระบบ", "chat", ["open", "signup", "login"]],
    ["คุย", "chat", ["ui", "pick", "send", "more"]],
    ["ตั้งค่า", "care", ["controls", "admin", "conn"]],
  ],
  "models.html": [
    ["เปิดปิดโมเดล", "know", ["list", "cmds", "stop", "nemotron", "qwen27"]],
    ["สองคำสั่งและชื่อ", "file", ["why", "twocmds", "path", "inside", "names"]],
    ["RAM และสูตรใหม่", "care", ["ramwhy", "fixed", "qwen35", "verify35", "webui", "kv"]],
  ],
  "comfy.html": [
    ["รู้จักระบบ", "know", ["what", "now", "open", "enter", "ui", "wire"]],
    ["ไฟล์และงานแรก", "file", ["place", "first"]],
    ["สร้างภาพ", "pic", ["t2i", "i2i"]],
    ["สร้างวิดีโอ", "vid", ["video", "i2v", "upscale"]],
    ["ดูแล", "care", ["save", "nodes", "catalog", "ram", "fix", "dont"]],
  ],
  "hermes.html": [
    ["รู้จักเอเจนต์", "agent", ["what", "now", "check", "dash", "ui"]],
    ["ใช้งาน", "agent", ["talk", "sessions", "cli"]],
    ["โมเดลและปัญหา", "fix", ["model", "name", "fix"]],
  ],
  "claude.html": [
    ["เลือกเส้นทาง", "know", ["pick"]],
    ["ลงมือ", "file", ["pro", "quota", "local"]],
    ["สลับและอื่น", "care", ["switch", "more", "fix"]],
  ],
  "system.html": [["ระบบเครื่อง", "care", ["ops", "ram", "dont"]]],
  "fix.html": [["แก้ตามอาการ", "fix", ["webui", "nomodel", "stuck", "ram", "comfy", "run", "hermes", "claude", "phone"]]],
  "terms.html": [
    ["อ่านก่อน", "know", ["how"]],
    ["พื้นฐาน", "know", ["base", "hw"]],
    ["โมเดลภาษา", "file", ["llm", "files", "quant", "serve", "infer", "ctx"]],
    ["โปรแกรมบนเครื่องนี้", "pic", ["chat", "agent", "image", "video"]],
    ["ระบบ", "care", ["docker", "net", "cmds", "err"]],
  ],
};

function decorateBands() {
  const groups = BANDS[currentFile()];
  if (!groups) return;
  for (const [label, tone, ids] of groups) {
    const first = document.getElementById(ids[0]);
    if (!first) continue;
    const head = document.createElement("div");
    head.className = `band-head tone-${tone}`;
    head.textContent = label;
    first.parentNode.insertBefore(head, first);
    ids.forEach((id) => document.getElementById(id)?.classList.add(`tone-${tone}`));
  }
}

const FULL_SHOT = {
  "comfy-red-nodes.png": "comfy-home.png",
  "comfy-runbar.png": "comfy-home.png",
  "comfy-errors-toast.png": "comfy-home.png",
  "comfy-ksampler-node.png": "comfy-home.png",
  "comfy-rail.png": "comfy-home.png",
  "comfy-model-folders.png": "comfy-models.png",
  "comfy-node-list.png": "comfy-nodes.png",
  "comfy-tpl-image.png": "comfy-templates-image.png",
  "comfy-tpl-zimage.png": "comfy-templates-image.png",
  "comfy-tpl-video.png": "comfy-templates-video.png",
  "comfy-tpl-video-tab.png": "comfy-templates-video.png",
  "comfy-prompt-panel.png": "comfy-clip-prompt.png",
  "comfy-prompt-node.png": "comfy-clip-prompt.png",
  "comfy-missing-panel.png": "comfy-missing-details.png",
  "comfy-graph-menu.png": "comfy-guide-run.png",
  "comfy-runbar-errors.png": "comfy-guide-run.png",
  "comfy-size-panel.png": "comfy-latent.png",
  "comfy-sampler-focus.png": "comfy-ksampler.png",
  "comfy-assets-empty.png": "comfy-assets.png",
  "comfy-manager-modal.png": "comfy-guide-manager.png",
  "comfy-nodes-installed.png": "comfy-node-manager.png",
  "comfy-add-node.png": "comfy-guide-search.png",
  "comfy-search-ksampler.png": "comfy-guide-ksampler.png",
  "comfy-shortcuts.png": "comfy-guide-shortcuts.png",
  "webui-center.png": "webui-qwen35-home.png",
  "webui-picker.png": "webui-qwen35-picker.png",
  "webui-picker-wide.png": "webui-qwen35-picker.png",
  "hermes-menu.png": "hermes-home-now.png",
  "hermes-sessions.png": "hermes-home-now.png",
  "hermes-chat-focus.png": "hermes-chat-now.png",
};

function fullSrc(src) {
  const name = (src || "").split("/").pop();
  if (FULL_SHOT[name]) return src.replace(/focus\/[^/]+$/, FULL_SHOT[name]);
  return src;
}

function enableLightbox() {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `<button class="lb-close" type="button">ปิด ✕</button><div><img alt=""><div class="lb-cap"></div></div>`;
  document.body.appendChild(box);
  const img = box.querySelector("img");
  const cap = box.querySelector(".lb-cap");
  const close = () => {
    box.classList.remove("open");
    document.body.style.overflow = "";
  };
  box.addEventListener("click", (e) => {
    if (e.target === box || e.target === img || e.target.classList.contains("lb-close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.querySelectorAll("figure.shot img, figure.look img").forEach((el) => {
    const fig = el.closest("figure");
    if (fig && !fig.querySelector(".zoom-hint")) {
      const hint = document.createElement("span");
      hint.className = "zoom-hint";
      hint.textContent = "กดรูปเพื่อขยายเต็มจอ";
      (fig.querySelector("figcaption") || fig).appendChild(hint);
    }
    el.addEventListener("click", () => {
      img.src = fullSrc(el.getAttribute("src"));
      img.alt = el.alt || "";
      const text = fig?.querySelector("figcaption")?.innerText || el.alt || "";
      cap.textContent = text.replace(/\s*กดรูปเพื่อขยายเต็มจอ\s*/g, " ").trim();
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
}

injectChrome();
decorateSections();
decorateBands();
enableLightbox();
syncSideNav();
