"use client";
import { useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "face",  label: "ЛИЦО" },
  { id: "body",  label: "ТЕЛО" },
  { id: "laser", label: "ЛАЗЕР" },
  { id: "care",  label: "УХОД" },
];

export default function ServicesTab({ services, lang = "ru" }) {
  const [active, setActive] = useState("face");
  const items = services[active] || [];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#ddd3ca] mb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`mr-7 pb-3 text-[10px] tracking-[0.35em] uppercase transition-colors ${
              active === tab.id
                ? "text-[#1a1714] border-b-2 border-[#b8976a] -mb-px"
                : "text-[#9a8878] hover:text-[#1a1714]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4 border-b border-[#ede3da] group"
          >
            <span className="text-[#1a1714] text-sm">{item.name}</span>
            <div className="flex items-center gap-4 shrink-0">
              {item.price && (
                <span className="text-[#b8976a] text-sm">{item.price}</span>
              )}
              <span className="w-5 h-5 rounded-full border border-[#b8976a] flex items-center justify-center text-[#b8976a] text-xs leading-none group-hover:bg-[#b8976a] group-hover:text-white transition-colors">
                +
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={`/${lang}/services`}
        className="inline-flex items-center gap-3 mt-8 text-[10px] tracking-[0.35em] uppercase text-[#b8976a] hover:text-[#1a1714] transition-colors"
      >
        ВСЕ УСЛУГИ
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </Link>
    </div>
  );
}
