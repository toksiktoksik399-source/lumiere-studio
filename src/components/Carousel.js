"use client";

import { useRef } from "react";

export default function Carousel({ children }) {
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div ref={ref} className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
        {children}
      </div>
      <button onClick={() => scrollBy(-1)} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#e3d8c8] text-[#b08d57] text-xl items-center justify-center shadow hover:bg-[#f7f1e9]">‹</button>
      <button onClick={() => scrollBy(1)} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#e3d8c8] text-[#b08d57] text-xl items-center justify-center shadow hover:bg-[#f7f1e9]">›</button>
    </div>
  );
}