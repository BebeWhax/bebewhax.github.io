/* ============================================================
   СВІТ ПОКРІВЛІ — prototype scripts
   1. Product data (parsed from the old svitpokrivli.com)
   2. Catalog rendering + tabs
   3. Hero canvas: generated looping "video" (weather cycle)
   4. UI: nav, reveals, counters, modal, forms
   ============================================================ */

"use strict";

/* ------------------------------------------------------------
   1. DATA — products parsed from the old site
   ------------------------------------------------------------ */
const CATEGORIES = {
  tile:    { title: "Металочерепиця",        blurb: "Ruukki та ВВМ Явір — гарантія до 50 років" },
  profile: { title: "Металопрофіль",         blurb: "Покрівельний і стіновий профнастил" },
  siding:  { title: "Сайдинг і підсофіт",    blurb: "Вініловий сайдинг з Європи та України" },
  films:   { title: "Підпокрівельні плівки", blurb: "Гідро-, паро- та вітроізоляція MasterPlast" },
  gutters: { title: "Водостічні системи",    blurb: "Пластикові та металеві водостоки" },
  tin:     { title: "Вироби з жерсті",       blurb: "Планки, коньки, снігозатримувачі" },
  windows: { title: "Дахові вікна",          blurb: "Fakro, Roto, Velux" }
};

const PRODUCTS = [
  // — Металочерепиця —
  { cat: "tile", name: "Adamante", brand: "Ruukki", country: "Фінляндія",
    desc: "Виразний профіль преміум-класу з плавними лініями — для даху, що вирізняється.",
    tags: ["Гарантія 50/20 р.", "Purex / Pural"] },
  { cat: "tile", name: "Finnera", brand: "Ruukki", country: "Фінляндія",
    desc: "Модульна черепиця з полімерним покриттям Purex і захищеним переднім зрізом.",
    tags: ["Гарантія 40/15 р.", "Модульна"] },
  { cat: "tile", name: "Monterrey", brand: "Ruukki", country: "Фінляндія",
    desc: "Найпопулярніший профіль у Європі. Класична форма, перевірена десятиліттями.",
    tags: ["Гарантія 30–50 р.", "Бестселер"] },
  { cat: "tile", name: "Decorrey", brand: "Ruukki", country: "Фінляндія",
    desc: "Доступна фінська якість зі сталі з поліестеровим покриттям.",
    tags: ["Гарантія 30/10 р.", "Поліестер"] },
  { cat: "tile", name: "Classic", brand: "ВВМ Явір", country: "Україна",
    desc: "Низькопрофільна модель європейського зразка — стримана класика.",
    tags: ["Український виробник"] },
  { cat: "tile", name: "Classic+", brand: "ВВМ Явір", country: "Україна",
    desc: "Збільшена корисна ширина листа та глибокі насичені кольори.",
    tags: ["Більша ширина", "Економія"] },
  { cat: "tile", name: "Retro", brand: "ВВМ Явір", country: "Україна",
    desc: "Ретро-дизайн і лаконічні вишукані форми для автентичних проєктів.",
    tags: ["Ретро-стиль"] },

  // — Металопрофіль —
  { cat: "profile", name: "20R", brand: "Ruukki", country: "Фінляндія",
    desc: "Покрівельний профнастил, простий у монтажі. Кілька варіантів полімерних покриттів.",
    tags: ["Покрівельний"] },
  { cat: "profile", name: "35R", brand: "Ruukki", country: "Фінляндія",
    desc: "Підвищена жорсткість для покрівель великої площі та довгих прольотів.",
    tags: ["Покрівельний", "Посилений"] },
  { cat: "profile", name: "Т12+", brand: "ВВМ Явір", country: "Україна",
    desc: "Точна геометрія профілю. Універсальний — для житлових і промислових обʼєктів.",
    tags: ["Універсальний"] },
  { cat: "profile", name: "Т18 / Т35", brand: "ВВМ Явір", country: "Україна",
    desc: "Найекономічніше рішення з капілярною канавкою проти затікання води.",
    tags: ["Покрівельний", "Економ"] },
  { cat: "profile", name: "RAN 15", brand: "Ruukki", country: "Фінляндія",
    desc: "Універсальний стіновий матеріал нового покоління — для фасадів та інтерʼєрів.",
    tags: ["Стіновий"] },
  { cat: "profile", name: "RAN 20 / RAN 35", brand: "Ruukki", country: "Фінляндія",
    desc: "Новітні технології виробництва та бездоганна геометрична точність.",
    tags: ["Стіновий"] },
  { cat: "profile", name: "Т7", brand: "ВВМ Явір", country: "Україна",
    desc: "Легкий та економічний профіль з великою корисною шириною листа.",
    tags: ["Стіновий", "Легкий"] },

  // — Сайдинг —
  { cat: "siding", name: "VOX", brand: "VOX", country: "Польща",
    desc: "Лідер ринку. Висока довговічність і стабільність кольору на роки.",
    tags: ["Сайдинг", "Підсофіт"] },
  { cat: "siding", name: "ROYAL", brand: "Royal Europa", country: "Польща",
    desc: "Точна передача текстури дерева та насичені кольори.",
    tags: ["Текстура дерева"] },
  { cat: "siding", name: "BRYZA", brand: "Bryza", country: "Польща",
    desc: "Легкі панелі, стійкі до вологи та ультрафіолету.",
    tags: ["Вологостійкий"] },
  { cat: "siding", name: "Американський сайдинг", brand: "Американський", country: "Туреччина",
    desc: "Екологічний матеріал, стійкий до комах і грибка.",
    tags: ["Еко"] },
  { cat: "siding", name: "FaSiding", brand: "FaSiding", country: "Україна",
    desc: "Двошарові панелі з підвищеною жорсткістю — український виробник.",
    tags: ["Двошаровий"] },

  // — Плівки —
  { cat: "films", name: "Гідробарʼєр", brand: "MasterPlast", country: "Угорщина",
    desc: "Захищає утеплювач і конструкції даху від вологи ззовні.",
    tags: ["Гідроізоляція"] },
  { cat: "films", name: "Паробарʼєр", brand: "MasterPlast", country: "Угорщина",
    desc: "Зупиняє водяну пару зсередини будинку та подовжує життя утеплювача.",
    tags: ["Пароізоляція"] },
  { cat: "films", name: "Супердифузійна мембрана", brand: "MasterPlast", country: "Угорщина",
    desc: "Дихаюча мембрана: волога виходить назовні, а дощ лишається зовні.",
    tags: ["Мембрана"] },

  // — Водостоки —
  { cat: "gutters", name: "PLASTMO", brand: "Plastmo", country: "Польща",
    desc: "ПВХ-системи, стійкі до ультрафіолету та корозії. Клейовий монтаж.",
    tags: ["Пластик"] },
  { cat: "gutters", name: "PROFIL", brand: "Profil", country: "Польща",
    desc: "Ідеальні форми та висока механічна міцність.",
    tags: ["Пластик"] },
  { cat: "gutters", name: "BRYZA", brand: "Bryza", country: "Польща",
    desc: "Широка палітра кольорів. Витримує снігові та вітрові навантаження.",
    tags: ["Пластик"] },
  { cat: "gutters", name: "RainWay", brand: "RainWay", country: "Україна",
    desc: "Якісний український пластик з УФ-захистом усіх елементів.",
    tags: ["Пластик", "Україна"] },
  { cat: "gutters", name: "Акведук", brand: "Акведук", country: "Україна",
    desc: "Металева система з простим замковим кріпленням.",
    tags: ["Метал"] },
  { cat: "gutters", name: "Ruukki", brand: "Ruukki", country: "Фінляндія",
    desc: "Сталь з двошаровим полімерним покриттям Pural.",
    tags: ["Метал", "Pural"] },
  { cat: "gutters", name: "PLANNJA", brand: "Plannja", country: "Швеція",
    desc: "Унікальна технологія захисного покриття для максимальної довговічності.",
    tags: ["Метал"] },

  // — Жерсть —
  { cat: "tin", name: "Планки та доборні елементи", brand: "Ruukki", country: "Фінляндія",
    desc: "Коньки, єндови, вітрові планки — усе для завершеного даху.",
    tags: ["Комплектація"] },
  { cat: "tin", name: "Снігозатримувачі", brand: "ВВМ Явір", country: "Україна",
    desc: "Захист від лавинного сходу снігу під час весняного танення.",
    tags: ["Безпека"] },

  // — Вікна —
  { cat: "windows", name: "FAKRO", brand: "Fakro", country: "Польща",
    desc: "Соснові вікна з високими показниками теплоізоляції.",
    tags: ["Дерево"] },
  { cat: "windows", name: "ROTO", brand: "Roto", country: "Німеччина",
    desc: "Деревʼяні та пластикові варіанти з можливістю ламінації.",
    tags: ["Дерево / ПВХ"] },
  { cat: "windows", name: "VELUX", brand: "Velux", country: "Данія",
    desc: "Загартоване скло triplex із функцією самоочищення.",
    tags: ["Triplex", "Самоочищення"] }
];

const BRANDS = [
  ["Ruukki", "Фінляндія"], ["ВВМ Явір", "Україна"], ["VOX", "Польща"],
  ["Plastmo", "Польща"], ["Bryza", "Польща"], ["RainWay", "Україна"],
  ["Plannja", "Швеція"], ["MasterPlast", "Угорщина"], ["Fakro", "Польща"],
  ["Velux", "Данія"], ["Roto", "Німеччина"], ["Royal Europa", "Польща"],
  ["Акведук", "Україна"], ["FaSiding", "Україна"], ["Profil", "Польща"]
];

/* ------------------------------------------------------------
   2. CATALOG RENDERING
   ------------------------------------------------------------ */
const ART_COLORS = ["#cf5230", "#5b7d99", "#7d8b5a", "#3a4048", "#c98a2e", "#8a5a44"];

function artSvg(cat, i) {
  const c = ART_COLORS[i % ART_COLORS.length];
  const bg = `<rect width="280" height="130" fill="#181b20"/>`;
  let body = "";
  if (cat === "tile") {
    let rows = "";
    for (let r = 0; r < 5; r++) {
      let d = `M0 ${34 + r * 22}`;
      for (let x = 0; x <= 280; x += 40) d += ` q20 -16 40 0`;
      rows += `<path d="${d}" fill="none" stroke="${c}" stroke-width="7" opacity="${1 - r * 0.13}"/>`;
    }
    body = rows;
  } else if (cat === "profile") {
    let d = "M-10 95";
    for (let x = -10; x <= 290; x += 36) d += ` l12 -42 l12 0 l12 42`;
    body = `<path d="${d}" fill="none" stroke="${c}" stroke-width="7" stroke-linejoin="round"/>
            <path d="${d.replace(/95/g, "112")}" fill="none" stroke="${c}" stroke-width="4" opacity=".35"/>`;
  } else if (cat === "siding") {
    let rows = "";
    for (let r = 0; r < 5; r++)
      rows += `<rect x="18" y="${16 + r * 21}" width="244" height="13" rx="4" fill="${c}" opacity="${1 - r * 0.15}"/>`;
    body = rows;
  } else if (cat === "films") {
    let waves = "";
    for (let r = 0; r < 4; r++) {
      let d = `M-10 ${30 + r * 25}`;
      for (let x = -10; x <= 290; x += 70) d += ` q35 ${r % 2 ? -18 : 18} 70 0`;
      waves += `<path d="${d}" fill="none" stroke="${c}" stroke-width="5" stroke-dasharray="${r % 2 ? "14 8" : "none"}" opacity="${0.95 - r * 0.18}"/>`;
    }
    body = waves;
  } else if (cat === "gutters") {
    body = `<path d="M30 38 h180" stroke="${c}" stroke-width="9" stroke-linecap="round"/>
            <path d="M30 38 q0 26 26 26 h128 q26 0 26 -26" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" opacity=".55"/>
            <path d="M210 42 q26 4 26 30 v34" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>
            <circle cx="90" cy="92" r="5" fill="${c}" opacity=".8"/><circle cx="120" cy="104" r="4" fill="${c}" opacity=".5"/><circle cx="70" cy="108" r="3.4" fill="${c}" opacity=".35"/>`;
  } else if (cat === "tin") {
    body = `<path d="M20 96 L140 22 L260 96" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M62 72 h48 M170 72 h48" stroke="${c}" stroke-width="6" stroke-linecap="round" opacity=".55"/>
            <circle cx="140" cy="22" r="7" fill="${c}"/>`;
  } else if (cat === "windows") {
    body = `<g transform="rotate(-8 140 65)">
              <rect x="82" y="18" width="116" height="94" rx="8" fill="none" stroke="${c}" stroke-width="8"/>
              <line x1="140" y1="18" x2="140" y2="112" stroke="${c}" stroke-width="5" opacity=".6"/>
              <rect x="94" y="30" width="38" height="30" fill="${c}" opacity=".25"/>
            </g>`;
  }
  return `<svg viewBox="0 0 280 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${bg}${body}</svg>`;
}

const CAT_ICONS = {
  tile: `<path d="M4 20 q5 -8 10 0 q5 -8 10 0 q5 -8 10 0 M4 30 q5 -8 10 0 q5 -8 10 0 q5 -8 10 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,
  profile: `<path d="M4 32 l5 -16 l5 0 l5 16 l5 -16 l5 0 l5 16" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>`,
  siding: `<path d="M6 12 h34 M6 20 h34 M6 28 h34 M6 36 h34" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>`,
  films: `<path d="M4 16 q6 -6 12 0 t12 0 t12 0 M4 28 q6 -6 12 0 t12 0 t12 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,
  gutters: `<path d="M8 12 h24 M8 12 q0 10 10 10 h6 q10 0 10 -10 M32 14 q6 2 6 10 v12" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>`,
  tin: `<path d="M6 30 L23 12 L40 30 M14 34 h6 M28 34 h6" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`,
  windows: `<rect x="10" y="8" width="26" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="3.2"/><line x1="23" y1="8" x2="23" y2="38" stroke="currentColor" stroke-width="2.4"/>`
};

function renderCats() {
  const grid = document.getElementById("catsGrid");
  grid.innerHTML = Object.entries(CATEGORIES).map(([key, c], i) => {
    const count = PRODUCTS.filter(p => p.cat === key).length;
    return `<button class="cat-card reveal ${i % 4 ? "d" + (i % 4) : ""}" data-cat="${key}" type="button">
      <svg class="cat-card__icon" viewBox="0 0 44 44">${CAT_ICONS[key]}</svg>
      <span class="cat-card__count">${count} поз.</span>
      <h3>${c.title}</h3>
      <p>${c.blurb}</p>
    </button>`;
  }).join("");
}

let activeCat = "tile";

function renderTabs() {
  const tabs = document.getElementById("catalogTabs");
  tabs.innerHTML = Object.entries(CATEGORIES).map(([key, c]) =>
    `<button class="tab ${key === activeCat ? "is-active" : ""}" role="tab"
       aria-selected="${key === activeCat}" data-tab="${key}" type="button">${c.title}</button>`
  ).join("");
}

function renderProducts() {
  const grid = document.getElementById("catalogGrid");
  const items = PRODUCTS.filter(p => p.cat === activeCat);
  grid.innerHTML = items.map((p, i) => `
    <article class="pcard" style="animation-delay:${i * 55}ms">
      <div class="pcard__art">${artSvg(p.cat, i)}<span class="pcard__flag">${p.country}</span></div>
      <div class="pcard__body">
        <span class="pcard__brand">${p.brand}</span>
        <h3 class="pcard__name">${p.name}</h3>
        <p class="pcard__desc">${p.desc}</p>
        <div class="pcard__meta">${p.tags.map(t => `<span class="pcard__tag">${t}</span>`).join("")}</div>
        <button class="pcard__cta" data-open-form type="button">Дізнатись ціну →</button>
      </div>
    </article>`).join("");
}

function setCategory(cat, scroll) {
  if (!CATEGORIES[cat]) return;
  activeCat = cat;
  renderTabs();
  renderProducts();
  if (scroll) document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
}

function renderBrands() {
  const row = document.getElementById("brandsRow");
  const chips = BRANDS.map(([n, c]) => `<span class="brand-chip">${n}<small>${c}</small></span>`).join("");
  row.innerHTML = chips + chips; // duplicated for seamless marquee
}

/* ------------------------------------------------------------
   3. HERO CANVAS — generated looping "video"
   Weather cycle: clear → clouds → rain (roof sheds water) →
   clearing → golden sun with a glint sweeping the metal tiles.
   ------------------------------------------------------------ */
const heroCanvas = document.getElementById("heroCanvas");
const ctx = heroCanvas.getContext("2d");
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let W = 0, H = 0, DPR = 1;
function resizeCanvas() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  const w = heroCanvas.clientWidth, h = heroCanvas.clientHeight;
  if (!w || !h || (w === W && h === H)) return;
  W = w; H = h;
  heroCanvas.width = W * DPR; heroCanvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (REDUCED) drawScene(4000);
}
new ResizeObserver(resizeCanvas).observe(heroCanvas);

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = t => Math.max(0, Math.min(1, t));
const smooth = t => t * t * (3 - 2 * t);
// envelope: 0→1→0 between [a,b] with fade width f
function env(t, a, b, f) {
  return smooth(clamp01((t - a) / f)) * smooth(clamp01((b - t) / f));
}
const mixC = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
const rgb = c => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;

const SKY = {
  dayTop: [96, 126, 156], dayBot: [168, 176, 172],
  stormTop: [34, 39, 48], stormBot: [66, 72, 80],
  goldTop: [186, 118, 66], goldBot: [232, 161, 60]
};

// rain particle pool
const drops = Array.from({ length: 150 }, () => ({ x: 0, y: -1, v: 0, live: false }));
const splashes = [];

function roofSurfaceY(x, house) {
  // y of roof line at x for the main house (gable triangle), or null
  const { cx, half, peakY, eaveY } = house;
  if (x < cx - half || x > cx + half) return null;
  const k = Math.abs(x - cx) / half;
  return lerp(peakY, eaveY, k);
}

function drawScene(now) {
  const T = 32000;
  const t = (now % T) / T;

  // — weather envelopes —
  const cloud = env(t, 0.16, 0.66, 0.1);
  const rain  = env(t, 0.28, 0.56, 0.07);
  const gold  = env(t, 0.7, 1.02, 0.09);
  const flash = env(t, 0.415, 0.425, 0.004); // lightning blink

  // — sky —
  let top = mixC(SKY.dayTop, SKY.stormTop, cloud);
  let bot = mixC(SKY.dayBot, SKY.stormBot, cloud);
  top = mixC(top, SKY.goldTop, gold);
  bot = mixC(bot, SKY.goldBot, gold);
  if (flash > 0) { top = mixC(top, [220, 226, 240], flash * 0.7); bot = mixC(bot, [220, 226, 240], flash * 0.7); }
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, rgb(top)); sky.addColorStop(1, rgb(bot));
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

  // — sun —
  const sunA = (1 - cloud * 0.92) * (0.5 + gold * 0.5);
  const sx = W * lerp(0.78, 0.66, gold), sy = H * lerp(0.2, 0.3, gold);
  const sr = H * (0.07 + gold * 0.05);
  const sunG = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 6);
  sunG.addColorStop(0, `rgba(255,214,140,${0.9 * sunA})`);
  sunG.addColorStop(0.12, `rgba(255,196,110,${0.55 * sunA})`);
  sunG.addColorStop(1, "rgba(255,196,110,0)");
  ctx.fillStyle = sunG; ctx.fillRect(0, 0, W, H);
  ctx.beginPath(); ctx.arc(sx, sy, sr, 0, 7);
  ctx.fillStyle = `rgba(255,230,170,${sunA})`; ctx.fill();

  // — birds (clear/golden sky) —
  const birdA = (1 - cloud) * 0.8;
  if (birdA > 0.05) {
    ctx.strokeStyle = `rgba(20,24,30,${birdA * 0.65})`;
    ctx.lineWidth = 1.6; ctx.lineCap = "round";
    for (let b = 0; b < 3; b++) {
      const bx = ((now * 0.012 + b * 340) % (W + 200)) - 100;
      const by = H * (0.18 + b * 0.06) + Math.sin(now * 0.002 + b * 9) * 8;
      const w = 9 + b * 2, f = Math.sin(now * 0.01 + b * 5) * 3;
      ctx.beginPath();
      ctx.moveTo(bx - w, by); ctx.quadraticCurveTo(bx - w / 2, by - 4 - f, bx, by);
      ctx.quadraticCurveTo(bx + w / 2, by - 4 - f, bx + w, by);
      ctx.stroke();
    }
  }

  // — far hills —
  ctx.fillStyle = `rgba(30,36,42,${0.5 + cloud * 0.25})`;
  ctx.beginPath(); ctx.moveTo(0, H * 0.74);
  ctx.quadraticCurveTo(W * 0.22, H * 0.63, W * 0.45, H * 0.73);
  ctx.quadraticCurveTo(W * 0.7, H * 0.82, W, H * 0.7);
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

  // — clouds —
  const cAlpha = 0.25 + cloud * 0.7;
  for (let i = 0; i < 7; i++) {
    const speed = 0.006 + i * 0.0018;
    const cx = ((now * speed + i * 480) % (W + 460)) - 230;
    const cy = H * (0.1 + (i % 4) * 0.075);
    const scale = 0.65 + (i % 3) * 0.3;
    const shade = mixC([238, 238, 235], [52, 58, 66], cloud);
    ctx.fillStyle = `rgba(${shade[0] | 0},${shade[1] | 0},${shade[2] | 0},${cAlpha * (0.5 + (i % 3) * 0.2)})`;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 95 * scale, 26 * scale, 0, 0, 7);
    ctx.ellipse(cx + 55 * scale, cy + 8 * scale, 70 * scale, 20 * scale, 0, 0, 7);
    ctx.ellipse(cx - 60 * scale, cy + 10 * scale, 60 * scale, 18 * scale, 0, 0, 7);
    ctx.fill();
  }

  // — ground —
  const groundY = H * 0.86;
  const gShade = mixC([58, 66, 58], [30, 34, 36], cloud);
  ctx.fillStyle = rgb(mixC(gShade, [94, 74, 48], gold * 0.4));
  ctx.fillRect(0, groundY, W, H - groundY);

  // — houses —
  const unit = Math.min(H, 900);
  const main = {
    cx: W * 0.66, half: unit * 0.24,
    peakY: groundY - unit * 0.4, eaveY: groundY - unit * 0.2,
    wallW: unit * 0.36, wallH: unit * 0.2
  };
  const small = {
    cx: W * 0.16, half: unit * 0.15,
    peakY: groundY - unit * 0.26, eaveY: groundY - unit * 0.13,
    wallW: unit * 0.22, wallH: unit * 0.13
  };
  drawHouse(small, cloud, gold, now, false);
  drawHouse(main, cloud, gold, now, true);

  // — glint sweep on metal roof (golden phase) —
  if (gold > 0.05) {
    const gx = main.cx - main.half + (main.half * 2) * clamp01((t - 0.7) / 0.3);
    ctx.save();
    roofPath(main); ctx.clip();
    const gl = ctx.createLinearGradient(gx - 70, 0, gx + 70, 0);
    gl.addColorStop(0, "rgba(255,240,200,0)");
    gl.addColorStop(0.5, `rgba(255,240,200,${0.5 * gold})`);
    gl.addColorStop(1, "rgba(255,240,200,0)");
    ctx.fillStyle = gl;
    ctx.fillRect(main.cx - main.half - 40, main.peakY - 10, main.half * 2 + 80, main.eaveY - main.peakY + 30);
    ctx.restore();
  }

  // — rain —
  if (!REDUCED && rain > 0.02) {
    ctx.strokeStyle = `rgba(190,208,224,${0.5 * rain})`;
    ctx.lineWidth = 1.3; ctx.lineCap = "round";
    for (const d of drops) {
      if (!d.live) {
        if (Math.random() < rain * 0.5) {
          d.x = Math.random() * W; d.y = -20 - Math.random() * H * 0.3;
          d.v = 9 + Math.random() * 5; d.live = true;
        }
        continue;
      }
      d.y += d.v; d.x += 1.1;
      const ry = roofSurfaceY(d.x, main);
      const hitY = (ry !== null && d.y > ry) ? ry : (d.y > groundY ? groundY : null);
      ctx.beginPath(); ctx.moveTo(d.x, d.y - 14); ctx.lineTo(d.x - 1.4, d.y); ctx.stroke();
      if (hitY !== null) {
        d.live = false;
        if (splashes.length < 60) splashes.push({ x: d.x, y: hitY, r: 1, a: 0.7 });
      }
    }
    // splashes
    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      s.r += 0.9; s.a -= 0.05;
      if (s.a <= 0) { splashes.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(200,216,230,${s.a})`;
      ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r * 1.6, s.r * 0.6, 0, 0, 7); ctx.stroke();
    }
    // downspout stream
    ctx.strokeStyle = `rgba(180,205,225,${0.55 * rain})`;
    ctx.lineWidth = 2;
    const spoutX = main.cx + main.half + 4;
    ctx.beginPath();
    ctx.moveTo(spoutX, main.eaveY + 4);
    ctx.quadraticCurveTo(spoutX + 3 + Math.sin(now * 0.02) * 2, (main.eaveY + groundY) / 2, spoutX + 2, groundY);
    ctx.stroke();
  }

  // — depth fog —
  const fog = ctx.createLinearGradient(0, H * 0.55, 0, H);
  fog.addColorStop(0, "rgba(16,18,22,0)");
  fog.addColorStop(1, `rgba(16,18,22,${0.28 + cloud * 0.15})`);
  ctx.fillStyle = fog; ctx.fillRect(0, 0, W, H);
}

function roofPath(hs) {
  const o = hs.half * 0.08; // overhang
  ctx.beginPath();
  ctx.moveTo(hs.cx - hs.half - o, hs.eaveY + o * 0.4);
  ctx.lineTo(hs.cx, hs.peakY);
  ctx.lineTo(hs.cx + hs.half + o, hs.eaveY + o * 0.4);
  ctx.closePath();
}

function drawHouse(hs, cloud, gold, now, main) {
  const wallTop = hs.eaveY;
  const wallBot = hs.eaveY + hs.wallH;
  const wx = hs.cx - hs.wallW / 2;

  // walls
  const wallC = mixC(mixC([214, 206, 190], [96, 96, 100], cloud * 0.55), [226, 190, 140], gold * 0.35);
  ctx.fillStyle = rgb(wallC);
  ctx.fillRect(wx, wallTop, hs.wallW, hs.wallH);

  // gable (triangle between roof and walls)
  ctx.beginPath();
  ctx.moveTo(hs.cx - hs.half, hs.eaveY);
  ctx.lineTo(hs.cx, hs.peakY + 5);
  ctx.lineTo(hs.cx + hs.half, hs.eaveY);
  ctx.closePath();
  ctx.fillStyle = rgb(mixC(wallC, [40, 40, 44], 0.18));
  ctx.fill();

  // windows — glow when stormy
  const glow = cloud * 0.85;
  const winC = mixC([70, 78, 88], [255, 196, 90], glow);
  const winN = main ? 3 : 2;
  for (let i = 0; i < winN; i++) {
    const ww = hs.wallW * 0.16;
    const wxx = wx + hs.wallW * (0.12 + i * (main ? 0.3 : 0.5));
    ctx.fillStyle = rgb(winC);
    if (glow > 0.4) { ctx.shadowColor = "rgba(255,190,90,.8)"; ctx.shadowBlur = 18 * glow; }
    ctx.fillRect(wxx, wallTop + hs.wallH * 0.22, ww, hs.wallH * 0.42);
    ctx.shadowBlur = 0;
  }

  // door on main house
  if (main) {
    ctx.fillStyle = "#cf5230";
    const dw = hs.wallW * 0.13;
    ctx.fillRect(hs.cx + hs.wallW * 0.3, wallBot - hs.wallH * 0.62, dw, hs.wallH * 0.62);
  }

  // chimney
  ctx.fillStyle = rgb(mixC([120, 110, 104], [60, 58, 60], cloud * 0.5));
  const chX = hs.cx + hs.half * 0.45;
  const chY = roofYAt(hs, chX);
  ctx.fillRect(chX, chY - hs.wallH * 0.42, hs.wallW * 0.07, hs.wallH * 0.42);

  // roof
  const roofBase = mixC(mixC([176, 66, 38], [86, 44, 34], cloud * 0.6), [214, 110, 50], gold * 0.45);
  ctx.fillStyle = rgb(roofBase);
  roofPath(hs); ctx.fill();

  // tile courses (scalloped lines clipped to roof)
  ctx.save(); roofPath(hs); ctx.clip();
  ctx.strokeStyle = `rgba(20,16,14,.32)`;
  ctx.lineWidth = Math.max(1.2, hs.half * 0.012);
  const rows = main ? 7 : 5;
  for (let r = 1; r <= rows; r++) {
    const k = r / (rows + 1);
    const y = lerp(hs.peakY, hs.eaveY, k);
    const spanHalf = hs.half * k + hs.half * 0.08;
    const seg = Math.max(14, spanHalf / 5);
    ctx.beginPath();
    let x = hs.cx - spanHalf;
    ctx.moveTo(x, y);
    while (x < hs.cx + spanHalf) {
      ctx.quadraticCurveTo(x + seg / 2, y - seg * 0.34, x + seg, y);
      x += seg;
    }
    ctx.stroke();
  }
  ctx.restore();

  // ridge highlight
  ctx.strokeStyle = `rgba(255,235,205,${0.14 + gold * 0.3})`;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(hs.cx - hs.half, hs.eaveY);
  ctx.lineTo(hs.cx, hs.peakY);
  ctx.lineTo(hs.cx + hs.half, hs.eaveY);
  ctx.stroke();

  // gutter line under eaves
  ctx.strokeStyle = "rgba(30,32,36,.85)";
  ctx.lineWidth = 4; ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(hs.cx - hs.half - hs.half * 0.08, hs.eaveY + hs.half * 0.032 + 8);
  ctx.lineTo(hs.cx + hs.half + hs.half * 0.08, hs.eaveY + hs.half * 0.032 + 8);
  ctx.stroke();
}

function roofYAt(hs, x) {
  const k = Math.abs(x - hs.cx) / hs.half;
  return lerp(hs.peakY, hs.eaveY, Math.min(k, 1));
}

let heroVisible = true;
function loop(now) {
  if (heroVisible && W > 0) drawScene(now);
  requestAnimationFrame(loop);
}

/* ------------------------------------------------------------
   4. UI WIRING
   ------------------------------------------------------------ */
function initUI() {
  // year
  document.getElementById("year").textContent = new Date().getFullYear();

  // burger / mobile nav
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.addEventListener("click", e => {
    if (e.target.closest("a")) {
      nav.classList.remove("is-open");
      burger.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  });

  // header shadow on scroll
  const header = document.getElementById("header");
  addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

  // category links everywhere (menu dropdown, footer links, category cards)
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-cat]");
    if (el) setCategory(el.dataset.cat, true);
  });

  // catalog tabs
  document.getElementById("catalogTabs").addEventListener("click", e => {
    const tab = e.target.closest(".tab");
    if (tab) setCategory(tab.dataset.tab, false);
  });

  // reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // nav active link highlight
  const secIds = ["home", "about", "catalog", "steps", "contact"];
  const links = [...document.querySelectorAll(".nav__link")];
  const secIo = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  secIds.forEach(id => { const s = document.getElementById(id); if (s) secIo.observe(s); });

  // animated counters
  const counters = document.querySelectorAll("[data-count]");
  const cIo = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      cIo.unobserve(en.target);
      const target = +en.target.dataset.count;
      const t0 = performance.now(), dur = 1400;
      (function tick(now) {
        const k = Math.min(1, (now - t0) / dur);
        en.target.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => cIo.observe(c));

  // modal
  const modal = document.getElementById("modal");
  document.addEventListener("click", e => {
    if (e.target.closest("[data-open-form]")) {
      modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    if (e.target.closest("[data-close-modal]")) closeModal();
  });
  addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  function closeModal() {
    modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // forms (prototype: no backend)
  const toast = document.getElementById("toast");
  function showToast(html) {
    toast.innerHTML = html;
    toast.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("is-show"), 3600);
  }
  function handleForm(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const phone = form.querySelector("[name=phone]").value.trim();
      if (phone.replace(/\D/g, "").length < 9) {
        showToast("Будь ласка, вкажіть коректний номер телефону");
        return;
      }
      form.reset(); closeModal();
      showToast("<b>Дякуємо!</b> Ми зателефонуємо вам протягом робочого дня.");
    });
  }
  handleForm(document.getElementById("ctaForm"));
  handleForm(document.getElementById("modalForm"));

  // pause hero rendering when offscreen
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
  }).observe(document.querySelector(".hero"));
}

/* ------------------------------------------------------------
   BOOT
   ------------------------------------------------------------ */
renderCats();
renderTabs();
renderProducts();
renderBrands();
initUI();

resizeCanvas();
addEventListener("resize", resizeCanvas);
if (REDUCED) {
  drawScene(4000); // static frame for reduced-motion users
} else {
  requestAnimationFrame(loop);
}
