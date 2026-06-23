"use client";
import { useState, useEffect, useRef } from "react";
import DatePicker from "./DatePicker";

const DEFAULT_SERVICES = [
  "Ботокс / Диспорт", "Филлеры губ", "Биоревитализация", "Мезотерапия",
  "Контурная пластика", "RF-лифтинг InMode", "Фотоомоложение",
  "Химический пилинг", "Ультразвуковая чистка", "Карбокситерапия",
  "LPG-массаж", "Кавитация", "Прессотерапия", "Водорослевое обёртывание",
  "Лазерная эпиляция", "Удаление пигментации", "Фракционное омоложение",
  "Увлажняющий уход", "Антивозрастной уход", "Массаж лица Гуаша",
  "Другое",
];

const DEFAULT_MASTERS = [
  "Любой свободный мастер",
  "Анна Соколова", "Екатерина Павлова", "Марина Орлова", "Диана Михайлова",
];

const TIME_SLOTS = [
  "10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30",
  "14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30",
  "18:00","18:30","19:00","19:30","20:00","20:30",
];

const inputCls = "w-full border border-[#ddd3ca] bg-[#faf6f2] px-4 py-3 text-sm text-[#1a1714] placeholder-[#b8a898] outline-none focus:border-[#b8976a] transition-colors";

/* ─── Custom Dropdown ─────────────────────────── */
function DropDown({ placeholder, header, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    if (open) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 border text-sm text-left transition-colors ${
          open ? "border-[#b8976a] bg-[#faf6f2]" : "border-[#ddd3ca] bg-[#faf6f2] hover:border-[#b8976a]"
        }`}
      >
        <span className={value ? "text-[#1a1714]" : "text-[#b8a898]"}>{value || placeholder}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#b8976a" strokeWidth="2"
          className={`shrink-0 ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="absolute z-30 w-full top-full left-0 border border-t-0 border-[#b8976a] bg-white shadow-sm max-h-56 overflow-y-auto">
          <div className="px-4 py-2 bg-[#f5ede8] border-b border-[#ede3da]">
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#9a8878]">{header}</span>
          </div>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm border-b border-[#f0e8e0] last:border-0 transition-colors ${
                value === opt ? "bg-[#c9a898] text-white" : "text-[#1a1714] hover:bg-[#f5ede8] hover:text-[#b8976a]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Form ───────────────────────────────── */
export default function ContactForm({ labels }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    name: "", phone: "", service: "", customService: "",
    master: "", date: "", time: "", message: "",
  });

  const [masters,  setMasters]  = useState(DEFAULT_MASTERS);
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    fetch("/api/admin/masters")
      .then(r => r.json())
      .then(d => {
        if (d.source === "sanity") {
          const names = (d.items || []).map(m => m.name).filter(Boolean);
          setMasters(["Любой свободный мастер", ...names]);
        }
      })
      .catch(() => {});

    fetch("/api/admin/services")
      .then(r => r.json())
      .then(d => {
        if (d.source === "sanity" && d.items?.length > 0) {
          const names = d.items
            .map(s => (typeof s.title === "object" ? s.title?.ru : s.title) || "")
            .filter(Boolean);
          if (names.length > 0) setServices([...names, "Другое"]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function apply(data) {
      setForm(f => ({
        ...f,
        ...(data.service !== undefined ? { service: data.service } : {}),
        ...(data.master  !== undefined ? { master:  data.master  } : {}),
      }));
    }
    const saved = localStorage.getItem("lumiere_book");
    if (saved) { try { apply(JSON.parse(saved)); } catch {} localStorage.removeItem("lumiere_book"); }
    function handler(e) { if (e.detail) apply(e.detail); }
    window.addEventListener("lumiere-book", handler);
    return () => window.removeEventListener("lumiere-book", handler);
  }, []);

  const set = (field) => (val) => setForm(f => ({ ...f, [field]: val }));
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const serviceFinal = form.service === "Другое" ? (form.customService || "Другое") : form.service;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone,
          service: serviceFinal, master: form.master,
          date: form.date, time: form.time, message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name:"", phone:"", service:"", customService:"", master:"", date:"", time:"", message:"" });
      } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  if (status === "success") {
    return (
      <div className="border border-[#ddd3ca] bg-[#faf6f2] p-10 text-center">
        <div className="font-display text-3xl text-[#1a1714] mb-3">Спасибо</div>
        <p className="text-sm text-[#6b5f50]">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name"  value={form.name}  onChange={handleChange} required placeholder={labels.name}  className={inputCls} />
      <input name="phone" value={form.phone} onChange={handleChange} required placeholder={labels.phone} className={inputCls} />

      <DropDown
        placeholder="— Выберите услугу —"
        header="Услуга"
        value={form.service}
        options={services}
        onChange={set("service")}
      />
      {form.service === "Другое" && (
        <input name="customService" value={form.customService} onChange={handleChange}
          placeholder="Укажите вашу услугу" className={inputCls} autoFocus />
      )}

      <DropDown
        placeholder="— Выберите мастера —"
        header="Мастер"
        value={form.master}
        options={masters}
        onChange={set("master")}
      />

      {/* Дата и время */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9a8878] mb-1.5 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Дата записи
          </p>
          <DatePicker value={form.date} onChange={set("date")} />
        </div>

        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#9a8878] mb-1.5 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Время
          </p>
          <DropDown
            placeholder="— Выберите время —"
            header="Время записи"
            value={form.time}
            options={TIME_SLOTS}
            onChange={set("time")}
          />
        </div>
      </div>

      <textarea name="message" value={form.message} onChange={handleChange} rows={3}
        placeholder={labels.message} className={inputCls} />

      <button type="submit" disabled={status === "sending"}
        className="w-full bg-[#c9a898] hover:bg-[#b8967a] disabled:opacity-60 text-white text-[10px] tracking-[0.4em] uppercase py-4 transition-colors">
        {status === "sending" ? labels.sending : labels.submit}
      </button>
      {status === "error" && <p className="text-[#b8976a] text-xs text-center">{labels.error}</p>}
    </form>
  );
}
