"use client";
import { useState, useRef, useEffect } from "react";

const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAYS_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

function getToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseIso(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function toRu(str) {
  if (!str) return "";
  const [y, m, d] = str.split("-");
  return `${d}.${m}.${y}`;
}

export default function DatePicker({ value, onChange }) {
  const today = getToday();
  const selected = parseIso(value);

  const initDate = selected || today;
  const [open, setOpen]   = useState(false);
  const [year, setYear]   = useState(initDate.getFullYear());
  const [month, setMonth] = useState(initDate.getMonth());
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (selected) { setYear(selected.getFullYear()); setMonth(selected.getMonth()); }
  }, [value]);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }
  function pick(date) { onChange(toIso(date)); setOpen(false); }

  const firstDay   = new Date(year, month, 1);
  const startShift = (firstDay.getDay() + 6) % 7;
  const daysInMo   = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startShift; i++) cells.push(null);
  for (let i = 1; i <= daysInMo; i++) cells.push(new Date(year, month, i));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center justify-between px-4 py-3 border text-sm text-left transition-colors ${
          open ? "border-[#b8976a] bg-[#faf6f2]" : "border-[#ddd3ca] bg-[#faf6f2] hover:border-[#b8976a]"
        }`}
      >
        <span className={value ? "text-[#1a1714]" : "text-[#b8a898]"}>
          {value ? toRu(value) : "дд.мм.гггг"}
        </span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#b8976a" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 w-full min-w-[280px] bg-white border border-[#b8976a] shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#f5ede8] border-b border-[#ede3da]">
            <button type="button" onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center text-[#b8976a] hover:text-[#1a1714] transition-colors rounded">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#1a1714] select-none">
              {MONTHS[month]} {year}
            </span>
            <button type="button" onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center text-[#b8976a] hover:text-[#1a1714] transition-colors rounded">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 px-2 pt-2">
            {DAYS_SHORT.map(d => (
              <div key={d} className="text-center text-[9px] tracking-wider uppercase text-[#b8976a] py-1 select-none">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 px-2 pb-3 gap-y-1">
            {cells.map((date, i) => {
              if (!date) return <div key={`empty-${i}`} />;
              const past       = date < today;
              const isSel      = selected && date.toDateString() === selected.toDateString();
              const isToday    = date.toDateString() === today.toDateString();
              return (
                <button
                  key={i}
                  type="button"
                  disabled={past}
                  onClick={() => !past && pick(date)}
                  className={`text-sm py-1.5 rounded transition-colors select-none ${
                    isSel    ? "bg-[#c9a898] text-white font-medium" :
                    past     ? "text-[#d4c8bc] cursor-not-allowed" :
                    isToday  ? "text-[#b8976a] font-semibold hover:bg-[#f5ede8]" :
                               "text-[#1a1714] hover:bg-[#f5ede8] hover:text-[#b8976a]"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
