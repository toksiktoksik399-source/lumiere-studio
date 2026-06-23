"use client";
import { useState, useEffect, useCallback } from "react";
import SmartImage from "./SmartImage";

export default function HeroCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <div className="relative w-full h-full">
      {images.map((url, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <SmartImage src={url} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
