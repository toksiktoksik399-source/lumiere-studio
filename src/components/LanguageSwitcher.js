"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ lang }) {
  const pathname = usePathname() || "/ru";
  const rest = pathname.replace(/^\/(ru|en)/, "");

  const linkClass = (active) =>
    active ? "text-stone-800 font-semibold" : "text-stone-400 hover:text-stone-600";

  return (
    <div className="flex items-center gap-1 text-sm">
      <Link href={`/ru${rest}`} className={linkClass(lang === "ru")}>RU</Link>
      <span className="text-stone-300">/</span>
      <Link href={`/en${rest}`} className={linkClass(lang === "en")}>EN</Link>
    </div>
  );
}