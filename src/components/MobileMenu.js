"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileMenu({ lang, navItems, cta }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        className="flex flex-col justify-center gap-[5px] w-10 h-10 p-2"
      >
        <span className="w-full h-px bg-[#1a1714] block" />
        <span className="w-full h-px bg-[#1a1714] block" />
        <span className="w-3/4 h-px bg-[#1a1714] block" />
      </button>

      <div className={`fixed inset-0 z-[100] flex flex-col bg-[#f5ede8] transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#ddd3ca] shrink-0">
          <Link href={`/${lang}`} onClick={() => setOpen(false)} className="font-display text-2xl tracking-[0.35em] text-[#1a1714]">
            LUMIÈRE
          </Link>
          <button onClick={() => setOpen(false)} className="w-9 h-9 flex items-center justify-center text-[#1a1714]">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 mt-4 overflow-y-auto flex-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-5 border-b border-[#e6d9d0] font-display text-2xl text-[#1a1714] hover:text-[#b8976a] transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-6 py-8 shrink-0">
          <a
            href={`/${lang}#contacts`}
            onClick={() => setOpen(false)}
            className="block w-full text-center bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.35em] uppercase py-4 transition-colors"
          >
            {cta}
          </a>
          <div className="flex gap-4 mt-4 text-xs text-[#9a8878] justify-center">
            <a href={`/${lang}`} className="hover:text-[#1a1714]">RU</a>
            <span>/</span>
            <a href={`/en`} className="hover:text-[#1a1714]">EN</a>
          </div>
        </div>
      </div>
    </>
  );
}
