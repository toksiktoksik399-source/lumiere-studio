"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export default function MobileMenu({ lang, navItems }) {
  const [open,    setOpen]    = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const overlay = (
    <div
      className={`fixed inset-0 z-[500] flex flex-col bg-[#f5ede8] transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-[#ddd3ca] shrink-0">
        <Link
          href={`/${lang}`}
          onClick={() => setOpen(false)}
          className="font-display text-2xl tracking-[0.35em] text-[#1a1714]"
        >
          LUMIÈRE
        </Link>
        <button
          onClick={() => setOpen(false)}
          aria-label="Закрыть меню"
          className="w-10 h-10 flex items-center justify-center text-[#1a1714]"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col px-6 mt-2 overflow-y-auto flex-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="py-5 border-b border-[#e6d9d0] font-display text-2xl text-[#1a1714] hover:text-[#b8976a] active:text-[#b8976a] transition-colors tracking-wide"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="px-6 py-8 shrink-0">
        <a
          href={`/${lang}#contacts`}
          onClick={() => setOpen(false)}
          className="block w-full text-center bg-[#c9a898] hover:bg-[#b8967a] active:bg-[#b8967a] text-white text-[10px] tracking-[0.35em] uppercase py-4 transition-colors"
        >
          ЗАПИСАТЬСЯ
        </a>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        className="flex flex-col justify-center gap-[5px] w-10 h-10 p-2 shrink-0"
      >
        <span className="w-full h-px bg-[#1a1714] block" />
        <span className="w-full h-px bg-[#1a1714] block" />
        <span className="w-3/4 h-px bg-[#1a1714] block" />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
