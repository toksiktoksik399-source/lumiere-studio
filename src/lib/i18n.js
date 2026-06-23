export const locales = ["ru", "en"];
export const defaultLocale = "ru";

export function t(field, lang) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.ru || field.en || String(field) || "";
}
