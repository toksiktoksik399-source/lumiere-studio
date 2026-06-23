"use client";
import { useEffect, useState } from "react";

export default function Intro() {
  const [phase, setPhase] = useState("wait"); // wait | show | hide | done

  useEffect(() => {
    if (sessionStorage.getItem("lumiere_intro")) {
      setPhase("done");
      return;
    }
    setPhase("show");
    const t1 = setTimeout(() => setPhase("hide"), 2000);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("lumiere_intro", "1");
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "wait" || phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#f5ede8]"
      style={{ opacity: phase === "hide" ? 0 : 1, transition: "opacity 1.2s ease", pointerEvents: phase === "hide" ? "none" : "auto" }}
    >
      <div className="flex items-center gap-5 intro-rise">
        <span className="text-[#b8976a] text-xl tracking-widest font-light">—</span>
        <span className="font-display text-5xl md:text-7xl tracking-[0.35em] text-[#1a1714]">LUMIÈRE</span>
        <span className="text-[#b8976a] text-xl tracking-widest font-light">—</span>
      </div>
      <p className="mt-4 text-[10px] tracking-[0.55em] uppercase text-[#b8976a] intro-rise-2">
        студия красоты
      </p>
    </div>
  );
}
