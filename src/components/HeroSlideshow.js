"use client";
import { useState, useEffect, useCallback } from "react";

export default function HeroSlideshow({ images = [] }) {
  const [cur, setCur] = useState(0);
  const len = images.length;

  const next = useCallback(() => setCur(i => (i + 1) % len), [len]);

  useEffect(() => {
    if (len <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [len, next]);

  if (!len) return null;

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
            i === cur ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Gradient overlay (mobile) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5ede8]/20 md:hidden pointer-events-none" />

      {/* Dot navigation */}
      {len > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              aria-label={`Фото ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === cur ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrow navigation (shown on hover on desktop) */}
      {len > 1 && (
        <>
          <button
            onClick={() => setCur(i => (i - 1 + len) % len)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/50 text-white flex items-center justify-center transition-colors z-10 hidden md:flex"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/50 text-white flex items-center justify-center transition-colors z-10 hidden md:flex"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </>
      )}
    </div>
  );
}
