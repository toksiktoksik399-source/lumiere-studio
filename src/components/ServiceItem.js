"use client";
import { useState } from "react";

export default function ServiceItem({ item, lang }) {
  const [open, setOpen] = useState(false);

  function handleBook() {
    const data = { service: item.name };
    localStorage.setItem("lumiere_book", JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("lumiere-book", { detail: data }));
  }

  return (
    <div>
      <div
        onClick={() => setOpen((v) => !v)}
        className={`flex gap-4 py-4 md:py-5 cursor-pointer -mx-2 px-2 transition-colors border-b border-[#ede3da] ${open ? "bg-[#faf6f2]" : "hover:bg-[#faf6f2]"}`}
      >
        <div className="flex-1 min-w-0">
          <p className={`text-sm leading-snug transition-colors ${open ? "text-[#b8976a]" : "text-[#1a1714]"}`}>
            {item.name}
          </p>
          {item.desc && <p className="text-xs text-[#9a8878] leading-relaxed mt-1 pr-4">{item.desc}</p>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <p className="text-[#b8976a] text-sm font-medium whitespace-nowrap">{item.price}</p>
          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs transition-colors ${
            open ? "bg-[#b8976a] border-[#b8976a] text-white" : "border-[#b8976a] text-[#b8976a]"
          }`}>
            {open ? "−" : "+"}
          </span>
        </div>
      </div>

      {open && (
        <div className="flex items-center justify-between gap-4 py-3 px-2 bg-[#faf6f2] border-b border-[#ede3da]">
          <span className="text-xs text-[#9a8878] truncate min-w-0">
            Выбрано: <span className="text-[#6b5f50]">{item.name}</span>
          </span>
          <a
            href={`/${lang}#contacts`}
            onClick={handleBook}
            className="shrink-0 bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 transition-colors"
          >
            ЗАПИСАТЬСЯ
          </a>
        </div>
      )}
    </div>
  );
}
