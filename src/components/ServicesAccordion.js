"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

export default function ServicesAccordion({ categories, lang }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-[#e3d8c8]">
      {categories.map((cat, i) => (
        <div key={i} className="border-b border-[#e3d8c8]">
          <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between py-5 text-left">
            <span className="font-display text-xl text-[#3f372e]">{t(cat.title, lang)}</span>
            <span className="text-[#b08d57] text-2xl leading-none">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <ul className="pb-5 space-y-2.5">
              {cat.items.map((it, j) => (
                <li key={j} className="flex justify-between gap-4 text-sm text-[#6b5f50]">
                  <span>{t(it.name, lang)}</span>
                  {it.price && <span className="text-[#b08d57] whitespace-nowrap">{it.price}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}