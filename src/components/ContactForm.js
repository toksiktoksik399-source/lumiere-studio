"use client";

import { useState } from "react";

export default function ContactForm({ labels }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="text-3xl mb-3">🌸</div>
        <p className="text-stone-700">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-7 shadow-sm space-y-4 text-left">
      <input name="name" value={form.name} onChange={handleChange} required placeholder={labels.name} className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300" />
      <input name="phone" value={form.phone} onChange={handleChange} required placeholder={labels.phone} className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300" />
      <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder={labels.message} className="w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-rose-300" />
      <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-rose-300 hover:bg-rose-400 disabled:opacity-60 text-white px-7 py-3 transition-colors">
        {status === "sending" ? labels.sending : labels.submit}
      </button>
      {status === "error" && <p className="text-red-500 text-sm text-center">{labels.error}</p>}
    </form>
  );
}