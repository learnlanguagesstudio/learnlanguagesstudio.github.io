/**
 * Store URLs — fill after listing on Google Play / App Store.
 * Empty string → “Coming soon” disabled buttons.
 */
const PLAY_URL = "";
const APP_STORE_URL = "";

const STRINGS = {
  cht: {
    htmlLang: "zh-Hant",
    title: "看小說學法語：法文分級雙語閱讀器",
    brand: "看小說學法語：法文分級雙語閱讀器",
    headline: "用讀小說的方式學法語",
    lead: "法文小說雙語對照；也可用更淺的法語讀懂句意。點詞學、文法提示，收藏後匯出複習。",
    playLabel: "Google Play",
    iosLabel: "App Store",
    playCta: "即將上架",
    iosCta: "即將上架",
    playOpen: "前往下載",
    iosOpen: "前往下載",
    f1Title: "雙語對照",
    f1Body: "法文＋中／英對照，邊讀邊對，不中斷故事節奏。",
    f2Title: "簡易法語說明",
    f2Body: "用法語介面時，用比原著更淺的法語講清句意，沉浸也不怕卡住。",
    f3Title: "點詞與文法",
    f3Body: "點選單字看詞義；時態、結構與變位提示幫你看懂為什麼。",
    f4Title: "匯出 Anki／CSV",
    f4Body: "收藏生詞後一鍵匯出，接到你的複習流程。",
    footer: "看小說學法語：法文分級雙語閱讀器",
    linkPrivacy: "隱私權政策",
    linkTerms: "使用條款",
    linkContact: "聯絡我們",
  },
  chs: {
    htmlLang: "zh-Hans",
    title: "看小说学法语：法文分级双语阅读器",
    brand: "看小说学法语：法文分级双语阅读器",
    headline: "用读小说的方式学法语",
    lead: "法文小说双语对照；也可用更浅的法语读懂句意。点词学、文法提示，收藏后导出复习。",
    playLabel: "Google Play",
    iosLabel: "App Store",
    playCta: "即将上架",
    iosCta: "即将上架",
    playOpen: "前往下载",
    iosOpen: "前往下载",
    f1Title: "双语对照",
    f1Body: "法文＋中／英对照，边读边对，不中断故事节奏。",
    f2Title: "简易法语说明",
    f2Body: "用法语界面时，用比原著更浅的法语讲清句意，沉浸也不怕卡住。",
    f3Title: "点词与文法",
    f3Body: "点选单字看词义；时态、结构与变位提示帮你看懂为什么。",
    f4Title: "导出 Anki／CSV",
    f4Body: "收藏生词后一键导出，接到你的复习流程。",
    footer: "看小说学法语：法文分级双语阅读器",
    linkPrivacy: "隐私权政策",
    linkTerms: "使用条款",
    linkContact: "联系我们",
  },
  en: {
    htmlLang: "en",
    title: "Learn French: Bilingual Reader",
    brand: "Learn French: Bilingual Reader",
    headline: "Learn French by reading novels",
    lead: "Bilingual novel reading, plus simpler French paraphrases when you want to stay in French. Tap words, see grammar, export for review.",
    playLabel: "Google Play",
    iosLabel: "App Store",
    playCta: "Coming soon",
    iosCta: "Coming soon",
    playOpen: "Get it on Play",
    iosOpen: "Download on the App Store",
    f1Title: "Bilingual reading",
    f1Body: "French alongside Chinese or English — follow the story without losing the thread.",
    f2Title: "Simpler French notes",
    f2Body: "In the French UI, sentence meaning in easier French than the book — immersive, not stuck.",
    f3Title: "Tap & grammar",
    f3Body: "Tap a word for glosses; tense and structure cues explain the forms.",
    f4Title: "Anki／CSV export",
    f4Body: "Save words, then export into your review workflow.",
    footer: "Learn French: Bilingual Reader",
    linkPrivacy: "Privacy policy",
    linkTerms: "Terms of use",
    linkContact: "Contact",
  },
  fr: {
    htmlLang: "fr",
    title: "Français Facile : Lectures Graduées",
    brand: "Français Facile : Lectures Graduées",
    headline: "Apprendre le français en lisant des romans",
    lead: "Lecture bilingue des romans, et un français plus simple pour comprendre la phrase. Touchez les mots, voyez la grammaire, exportez pour réviser.",
    playLabel: "Google Play",
    iosLabel: "App Store",
    playCta: "Bientôt disponible",
    iosCta: "Bientôt disponible",
    playOpen: "Sur Google Play",
    iosOpen: "Sur l’App Store",
    f1Title: "Lecture bilingue",
    f1Body: "Français avec chinois ou anglais — suivez l’histoire sans perdre le fil.",
    f2Title: "Français plus simple",
    f2Body: "En interface française, le sens de la phrase en français plus accessible que le livre.",
    f3Title: "Mot et grammaire",
    f3Body: "Touchez un mot pour le sens ; temps et structure éclairent les formes.",
    f4Title: "Export Anki／CSV",
    f4Body: "Enregistrez des mots, puis exportez vers votre révision.",
    footer: "Français Facile : Lectures Graduées",
    linkPrivacy: "Confidentialité",
    linkTerms: "Conditions",
    linkContact: "Contact",
  },
};

function applyStoreButton(el, url, openLabel, soonLabel) {
  const ready = Boolean(url && url.trim());
  if (ready) {
    el.href = url.trim();
    el.removeAttribute("aria-disabled");
    el.setAttribute("target", "_blank");
    const name = el.querySelector(".store-btn__name");
    if (name) name.textContent = openLabel;
  } else {
    el.href = "#";
    el.setAttribute("aria-disabled", "true");
    el.removeAttribute("target");
    const name = el.querySelector(".store-btn__name");
    if (name) name.textContent = soonLabel;
  }
}

function applyI18n(locale) {
  const pack = STRINGS[locale] || STRINGS.en;
  document.documentElement.lang = pack.htmlLang;
  document.title = pack.title;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && pack[key] != null) {
      node.textContent = pack[key];
    }
  });

  markLangButtons(locale);

  const play = document.getElementById("btn-play");
  const ios = document.getElementById("btn-ios");
  if (play) {
    applyStoreButton(play, PLAY_URL, pack.playOpen, pack.playCta);
  }
  if (ios) {
    applyStoreButton(ios, APP_STORE_URL, pack.iosOpen, pack.iosCta);
  }

  syncLangQueryLinks(locale);
  saveLocale(locale);
}

function init() {
  let locale = resolveLocale(Object.keys(STRINGS));
  if (!STRINGS[locale]) locale = "en";

  applyI18n(locale);
  wireLangButtons((next) => {
    if (STRINGS[next]) applyI18n(next);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
