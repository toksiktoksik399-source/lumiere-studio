"use client";

import { useState } from "react";

export default function SmartImage({ src, alt = "", className = "" }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return null;
  return <img src={src} alt={alt} className={className} onError={() => setOk(false)} loading="lazy" />;
}