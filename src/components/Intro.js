"use client";

import { useEffect, useState } from "react";

export default function Intro({ brand = "VALVERDE", subtitle = "клиника косметологии" }) {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 2200);
    const t2 = setTimeout(() => setRemoved(true), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (removed) return null;

  return (
    <div className={`intro-overlay ${hidden ? "hide" : ""}`}>
      <div className="font-display text-5xl md:text-7xl tracking-[0.3em] text-[#b08d57] intro-rise">{brand}</div>
      <div className="mt-5 h-px w-16 bg-[#b08d57]/50 intro-rise" />
      <div className="mt-5 text-[#8a7c69] tracking-[0.35em] uppercase text-xs intro-rise">{subtitle}</div>
    </div>
  );
}