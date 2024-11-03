let currentLanguage = localStorage.getItem("appLanguage") || "en";
const translations = {};

export async function loadLanguage(lang) {
  if (translations[lang]) {
    setLanguage(lang);
    return;
  }

  try {
    const response = await fetch(`/src/localization/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Could not load ${lang}.json`);
    }
    const jsonData = await response.json();
    translations[lang] = jsonData;
    setLanguage(lang);
  } catch (error) {
    console.error(`Error loading language file: ${error}`);
    if (lang !== "en") {
      await loadLanguage("en");
    }
  }
}

export async function initLocalization() {
  await loadLanguage(currentLanguage);
}

export function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  localStorage.setItem("appLanguage", lang);
  document.dispatchEvent(
    new CustomEvent("language-changed", { detail: { language: lang } })
  );
}

export function t(key, replacements = {}) {
  const languageTranslations = translations[currentLanguage] || {};
  let translation = languageTranslations[key];

  if (!translation) {
    return key;
  }

  for (const [placeholder, value] of Object.entries(replacements)) {
    translation = translation.replace(
      new RegExp(`{${placeholder}}`, "g"),
      value
    );
  }

  return translation;
}

export function toggleLanguage() {
  const newLanguage = currentLanguage === "en" ? "tr" : "en";
  loadLanguage(newLanguage);
}
