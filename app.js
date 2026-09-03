/**
 * Studio root landing (https://learnlanguagesstudio.com/).
 * Deploy this folder’s files to the site root — do not overwrite /frenchbooks/.
 */
const LOCALE_KEYS = ["cht", "chs", "en", "fr"];

const STRINGS = {
  cht: {
    htmlLang: "zh-Hant",
    title: "Learn Languages Studio",
    kicker: "語言學習工作室",
    brand: "Learn Languages Studio Limited",
    lead: "我們做離線優先、節奏平靜的語言 App，讓你用閱讀的方式，照自己的步調學習。",
    productEyebrow: "產品",
    productTitle: "看小說學法語：法文分級雙語閱讀器",
    productBody: "分級雙語小說、點詞查義、文法提示，收藏後可匯出複習。",
    productCta: "前往產品頁 →",
    contactLabel: "支援",
    linkPrivacy: "隱私權政策",
    linkTerms: "使用條款",
    linkDeletion: "資料刪除",
    linkContact: "聯絡我們",
    footer: "Learn Languages Studio Limited",
  },
  chs: {
    htmlLang: "zh-Hans",
    title: "Learn Languages Studio",
    kicker: "语言学习工作室",
    brand: "Learn Languages Studio Limited",
    lead: "我们做离线优先、节奏平静的语言应用，让你用阅读的方式，按自己的步调学习。",
    productEyebrow: "产品",
    productTitle: "看小说学法语：法文分级双语阅读器",
    productBody: "分级双语小说、点词查义、文法提示，收藏后可导出复习。",
    productCta: "前往产品页 →",
    contactLabel: "支持",
    linkPrivacy: "隐私权政策",
    linkTerms: "使用条款",
    linkDeletion: "数据删除",
    linkContact: "联系我们",
    footer: "Learn Languages Studio Limited",
  },
  en: {
    htmlLang: "en",
    title: "Learn Languages Studio",
    kicker: "Learn Languages Studio",
    brand: "Learn Languages Studio Limited",
    lead: "We build calm, offline-first language apps so you can learn by reading — at your own pace.",
    productEyebrow: "App",
    productTitle: "Learn French: Bilingual Reader",
    productBody:
      "Graded bilingual novels, tap-for-glosses, grammar hints, and export for review.",
    productCta: "Open product page →",
    contactLabel: "Support",
    linkPrivacy: "Privacy",
    linkTerms: "Terms",
    linkDeletion: "Data deletion",
    linkContact: "Contact",
    footer: "Learn Languages Studio Limited",
  },
  fr: {
    htmlLang: "fr",
    title: "Learn Languages Studio",
    kicker: "Studio de langues",
    brand: "Learn Languages Studio Limited",
    lead: "Nous créons des apps de langues calmes et d’abord hors ligne, pour apprendre en lisant — à votre rythme.",
    productEyebrow: "App",
    productTitle: "Français Facile : Lectures Graduées",
    productBody:
      "Romans bilingues gradués, gloses au toucher, indices grammaticaux et export pour réviser.",
    productCta: "Voir la page produit →",
    contactLabel: "Assistance",
    linkPrivacy: "Confidentialité",
    linkTerms: "Conditions",
    linkDeletion: "Suppression des données",
    linkContact: "Contact",
    footer: "Learn Languages Studio Limited",
  },
};

function detectLocale() {
  const raw = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  if (raw.startsWith("fr")) return "fr";
  if (
    raw.includes("hant") ||
    raw === "zh-tw" ||
    raw === "zh-hk" ||
    raw === "zh-mo"
  ) {
    return "cht";
  }
  if (
    raw.includes("hans") ||
    raw === "zh-cn" ||
    raw === "zh-sg" ||
    raw === "zh"
  ) {
    return "chs";
  }
  if (raw.startsWith("zh")) return "cht";
  return "en";
}

function readLocaleFromQuery() {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && LOCALE_KEYS.includes(q)) return q;
  } catch (_) {
    /* ignore */
  }
  return null;
}

function readSavedLocale() {
  try {
    const saved = localStorage.getItem("studio_landing_locale");
    if (saved && LOCALE_KEYS.includes(saved)) return saved;
  } catch (_) {
    /* ignore */
  }
  return null;
}

function saveLocale(locale) {
  try {
    localStorage.setItem("studio_landing_locale", locale);
  } catch (_) {
    /* ignore */
  }
}

function applyLocale(locale) {
  const pack = STRINGS[locale] || STRINGS.en;
  document.documentElement.lang = pack.htmlLang;
  document.title = pack.title;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && pack[key] != null) node.textContent = pack[key];
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.getAttribute("data-locale") === locale;
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  } catch (_) {
    /* ignore */
  }
  saveLocale(locale);
}

const initial =
  readLocaleFromQuery() || readSavedLocale() || detectLocale() || "en";
applyLocale(initial);

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const next = btn.getAttribute("data-locale");
    if (next) applyLocale(next);
  });
});
