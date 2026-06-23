"use client";
import { useState, useEffect, useRef } from "react";

const SERVICES = [
  "Ботокс / Диспорт",
  "Филлеры губ",
  "Биоревитализация",
  "Мезотерапия",
  "Контурная пластика",
  "RF-лифтинг InMode",
  "Фотоомоложение",
  "Химический пилинг",
  "Ультразвуковая чистка",
  "Карбокситерапия",
  "LPG-массаж",
  "Кавитация",
  "Прессотерапия",
  "Водорослевое обёртывание",
  "Лазерная эпиляция",
  "Удаление пигментации",
  "Фракционное омоложение",
  "Увлажняющий уход",
  "Антивозрастной уход",
  "Массаж лица Гуаша",
  "Другое",
];

const inputCls = "w-full border border-[#ddd3ca] bg-[#faf6f2] px-4 py-3 text-sm text-[#1a1714] placeholder-[#b8a898] outline-none focus:border-[#b8976a] transition-colors";

export default function ContactForm({ labels }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", phone: "", service: "", customService: "", message: "" });
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  // Read pre-selected service from localStorage (set by ServicesTab)
  useEffect(() => {
    const saved = localStorage.getItem("lumiere_selected_service");
    if (saved) {
      setForm(f => ({ ...f, service: saved }));
      localStorage.removeItem("lumiere_selected_service");
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    if (dropOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropOpen]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function selectService(name) {
    setForm(f => ({ ...f, service: name, customService: "" }));
    setDropOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const serviceFinal = form.service === "Другое"
      ? (form.customService || "Другое")
      : form.service;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, service: serviceFinal, message: form.message }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", service: "", customService: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder={labels.name}
        className={inputCls}
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
        placeholder={labels.phone}
        className={inputCls}
      />

      {/* Custom service selector dropdown */}
      <div ref={dropRef} className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setDropOpen(!dropOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 border text-sm text-left transition-colors ${
            dropOpen ? "border-[#b8976a] bg-[#faf6f2]" : "border-[#ddd3ca] bg-[#faf6f2] hover:border-[#b8976a]"
          }`}
        >
          <span className={form.service ? "text-[#1a1714]" : "text-[#b8a898]"}>
            {form.service || "— Выберите услугу —"}
          </span>
          <svg
            viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#b8976a" strokeWidth="2"
            className={`shrink-0 ml-2 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {/* Dropdown panel */}
        {dropOpen && (
          <div className="absolute z-30 w-full top-full left-0 border border-t-0 border-[#b8976a] bg-white shadow-sm max-h-60 overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-2 bg-[#f5ede8] border-b border-[#ede3da]">
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#9a8878]">Выберите услугу</span>
            </div>
            {SERVICES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => selectService(s)}
                className={`w-full text-left px-4 py-3 text-sm border-b border-[#f0e8e0] last:border-0 transition-colors ${
                  form.service === s
                    ? "bg-[#c9a898] text-white"
                    : "text-[#1a1714] hover:bg-[#f5ede8] hover:text-[#b8976a]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom input when "Другое" selected */}
      {form.service === "Другое" && (
        <input
          name="customService"
          value={form.customService}
          onChange={handleChange}
          placeholder="Укажите вашу услугу"
          className={inputCls}
          autoFocus
        />
      )}

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={3}
        placeholder={labels.message}
        className={inputCls}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#c9a898] hover:bg-[#b8967a] disabled:opacity-60 text-white text-[10px] tracking-[0.4em] uppercase py-4 transition-colors"
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>

      {status === "error" && (
        <p className="text-[#b8976a] text-xs text-center">{labels.error}</p>
      )}
    </form>
  );
}
