"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu({ lang, navItems, cta }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.replace(/^\/(ru|en)/, "");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2"
      >
        <span className="w-full h-px bg-[#3f372e] block" />
        <span className="w-full h-px bg-[#3f372e] block" />
        <span className="w-3/4 h-px bg-[#3f372e] block" />
      </button>

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#f7f1e9] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b border-[#e3d8c8] shrink-0">
          <Link
            href={`/${lang}`}
            onClick={() => setOpen(false)}
            className="font-display text-2xl tracking-[0.25em] text-[#3f372e]"
          >
            VALVERDE
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
            className="w-10 h-10 flex items-center justify-center text-[#3f372e] text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col px-5 mt-2 overflow-y-auto flex-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-5 border-b border-[#ede3d4] font-display text-2xl text-[#3f372e] hover:text-[#b08d57] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-5 py-8 shrink-0 flex flex-col gap-3">
          <div className="flex gap-3 text-sm text-center">
            <Link
              href={`/ru${rest}`}
              onClick={() => setOpen(false)}
              className={`flex-1 py-2 rounded-full border transition-colors ${lang === "ru" ? "border-[#b08d57] text-[#b08d57] bg-[#b08d57]/5" : "border-[#d9c9af] text-[#8a7c69]"}`}
            >
              RU
            </Link>
            <Link
              href={`/en${rest}`}
              onClick={() => setOpen(false)}
              className={`flex-1 py-2 rounded-full border transition-colors ${lang === "en" ? "border-[#b08d57] text-[#b08d57] bg-[#b08d57]/5" : "border-[#d9c9af] text-[#8a7c69]"}`}
            >
              EN
            </Link>
          </div>
          <a
            href={`/${lang}#contacts`}
            onClick={() => setOpen(false)}
            className="block text-center rounded-full bg-[#b08d57] hover:bg-[#9a7846] text-white py-4 text-sm tracking-widest uppercase transition-colors"
          >
            {cta}
          </a>
        </div>
      </div>
    </>
  );
}
