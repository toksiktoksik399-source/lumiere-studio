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
  const [selected, setSelected] = useState(null);
  const items = services[active] || [];

  function toggle(idx) {
    const key = `${active}:${idx}`;
    setSelected(selected === key ? null : key);
  }

  function handleBook(serviceName) {
    const data = { service: serviceName };
    localStorage.setItem("lumiere_book", JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("lumiere-book", { detail: data }));
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-0 border-b border-[#ddd3ca] mb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActive(tab.id); setSelected(null); }}
            className={`mr-6 pb-3 text-[10px] tracking-[0.35em] uppercase transition-colors whitespace-nowrap ${
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
        {items.map((item, i) => {
          const key = `${active}:${i}`;
          const isOpen = selected === key;
          return (
            <div key={i}>
              <div
                onClick={() => toggle(i)}
                className={`flex items-center justify-between py-4 border-b border-[#ede3da] cursor-pointer -mx-1 px-1 transition-colors ${isOpen ? "bg-[#faf6f2]" : "hover:bg-[#faf6f2]"}`}
              >
                <span className={`text-sm transition-colors ${isOpen ? "text-[#b8976a]" : "text-[#1a1714]"}`}>
                  {item.name}
                </span>
                <div className="flex items-center gap-3 shrink-0">
                  {item.price && <span className="text-[#b8976a] text-sm">{item.price}</span>}
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs leading-none transition-colors ${
                    isOpen ? "bg-[#b8976a] border-[#b8976a] text-white" : "border-[#b8976a] text-[#b8976a]"
                  }`}>
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
              </div>

              {isOpen && (
                <div className="flex items-center justify-between gap-4 py-3 px-1 bg-[#faf6f2] border-b border-[#ede3da]">
                  <span className="text-xs text-[#9a8878] truncate min-w-0">
                    Выбрано: <span className="text-[#6b5f50]">{item.name}</span>
                  </span>
                  <a
                    href={`/${lang}#contacts`}
                    onClick={() => handleBook(item.name)}
                    className="shrink-0 bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 transition-colors"
                  >
                    ЗАПИСАТЬСЯ
                  </a>
                </div>
              )}
            </div>
          );
        })}
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
