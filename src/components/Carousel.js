"use client";

import { useRef } from "react";

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function Carousel({ children }) {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      <div ref={ref} className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
        {children}
      </div>
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Назад"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-[#e3d8c8] text-[#b08d57] items-center justify-center shadow-sm hover:bg-[#f7f1e9] hover:border-[#b08d57] transition-colors z-10"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Вперёд"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white border border-[#e3d8c8] text-[#b08d57] items-center justify-center shadow-sm hover:bg-[#f7f1e9] hover:border-[#b08d57] transition-colors z-10"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
