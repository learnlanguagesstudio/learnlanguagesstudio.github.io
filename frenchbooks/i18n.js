/**
 * Shared locale helpers for landing + legal pages.
 */
const LOCALE_KEYS = ["cht", "chs", "en", "fr"];

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

function readLocaleFromQuery(validKeys) {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && validKeys.includes(q)) return q;
  } catch (_) {
    /* ignore */
  }
  return null;
}

function readSavedLocale(validKeys) {
  try {
    const saved = localStorage.getItem("landing_locale");
    if (saved && validKeys.includes(saved)) return saved;
  } catch (_) {
    /* ignore */
  }
  return null;
}

function saveLocale(locale) {
  try {
    localStorage.setItem("landing_locale", locale);
  } catch (_) {
    /* ignore */
  }
}

/** Priority: ?lang= → localStorage → browser. */
function resolveLocale(validKeys) {
  const keys = validKeys && validKeys.length ? validKeys : LOCALE_KEYS;
  return (
    readLocaleFromQuery(keys) ||
    readSavedLocale(keys) ||
    detectLocale() ||
    "en"
  );
}

function wireLangButtons(onPick) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-locale");
      if (next) onPick(next);
    });
  });
}

function markLangButtons(locale) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.getAttribute("data-locale") === locale;
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

/** Keep site HTML links carrying ?lang= for cross-page consistency. */
function syncLangQueryLinks(locale) {
  document.querySelectorAll("a[href]").forEach((a) => {
    const raw = a.getAttribute("href") || "";
    if (
      raw.startsWith("mailto:") ||
      raw.startsWith("http://") ||
      raw.startsWith("https://") ||
      raw.startsWith("#") ||
      raw === ""
    ) {
      return;
    }
    if (!/\.html($|\?)/i.test(raw) && raw !== "./" && raw !== "/") {
      return;
    }
    try {
      const url = new URL(raw, window.location.href);
      url.searchParams.set("lang", locale);
      const file = url.pathname.split("/").pop() || "index.html";
      a.setAttribute("href", file + "?" + url.searchParams.toString());
    } catch (_) {
      /* ignore */
    }
  });
}

function replaceLangInUrl(locale) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  } catch (_) {
    /* ignore */
  }
}

/** Show [data-legal-locale] panels; hide others. */
function applyLegalLocale(locale, titleByLocale) {
  const langMap = { cht: "zh-Hant", chs: "zh-Hans", en: "en", fr: "fr" };
  document.documentElement.lang = langMap[locale] || "en";
  if (titleByLocale && titleByLocale[locale]) {
    document.title = titleByLocale[locale];
  }
  document.querySelectorAll("[data-legal-locale]").forEach((node) => {
    const match = node.getAttribute("data-legal-locale") === locale;
    node.hidden = !match;
  });
  applyLegalChrome(locale);
  markLangButtons(locale);
  syncLangQueryLinks(locale);
  replaceLangInUrl(locale);
  saveLocale(locale);
}

/** Footer / nav chrome shared by privacy & terms pages. */
const LEGAL_CHROME = {
  cht: {
    linkPrivacy: "隱私權政策",
    linkTerms: "使用條款",
    linkDeletion: "資料刪除",
    linkContact: "聯絡我們",
    homeLink: "看小說學法語：法文分級雙語閱讀器",
    footer: "看小說學法語：法文分級雙語閱讀器",
  },
  chs: {
    linkPrivacy: "隐私权政策",
    linkTerms: "使用条款",
    linkDeletion: "数据删除",
    linkContact: "联系我们",
    homeLink: "看小说学法语：法文分级双语阅读器",
    footer: "看小说学法语：法文分级双语阅读器",
  },
  en: {
    linkPrivacy: "Privacy policy",
    linkTerms: "Terms of use",
    linkDeletion: "Data deletion",
    linkContact: "Contact",
    homeLink: "Learn French: Bilingual Reader",
    footer: "Learn French: Bilingual Reader",
  },
  fr: {
    linkPrivacy: "Confidentialité",
    linkTerms: "Conditions",
    linkDeletion: "Suppression des données",
    linkContact: "Contact",
    homeLink: "Français Facile : Lectures Graduées",
    footer: "Français Facile : Lectures Graduées",
  },
};

function applyLegalChrome(locale) {
  const pack = LEGAL_CHROME[locale] || LEGAL_CHROME.en;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && pack[key] != null) {
      node.textContent = pack[key];
    }
  });
}

function initLegalPage(titleByLocale) {
  const keys = Object.keys(titleByLocale);
  let locale = resolveLocale(keys);
  if (!keys.includes(locale)) locale = "en";
  applyLegalLocale(locale, titleByLocale);
  wireLangButtons((next) => {
    if (keys.includes(next)) applyLegalLocale(next, titleByLocale);
  });
}
