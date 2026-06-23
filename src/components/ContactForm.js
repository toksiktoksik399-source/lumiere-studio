"use client";
import { useState } from "react";

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
const selectCls = `${inputCls} appearance-none cursor-pointer`;

export default function ContactForm({ labels }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", phone: "", service: "", customService: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const serviceFinal = form.service === "Другое" ? (form.customService || "Другое") : form.service;
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
      <div className="bg-[#f5ede8] border border-[#ddd3ca] p-10 text-center">
        <div className="font-display text-3xl text-[#1a1714] mb-3">Спасибо</div>
        <p className="text-sm text-[#6b5f50]">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {/* Service select */}
      <div className="relative">
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={selectCls}
        >
          <option value="">— Выберите услугу —</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#b8976a]">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {/* Custom service input when "Другое" selected */}
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
