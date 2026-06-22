export const locales = ["ru", "en"];
export const defaultLocale = "ru";

export function t(field, lang) {
  if (!field) return "";
  return field[lang] || field.ru || field.en || "";
}