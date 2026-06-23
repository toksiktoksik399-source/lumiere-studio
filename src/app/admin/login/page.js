"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res  = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(data.error || "Ошибка входа");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5ede8] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-[#b8976a] font-light text-lg">—</span>
            <span className="font-display text-3xl tracking-[0.35em] text-[#1a1714]">LUMIÈRE</span>
            <span className="text-[#b8976a] font-light text-lg">—</span>
          </div>
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#b8976a]">студия красоты</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-[#ddd3ca] p-8 space-y-5">
          <p className="text-[10px] tracking-widest uppercase text-[#9a8878] border-b border-[#ede3da] pb-3">
            Вход в панель управления
          </p>

          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#9a8878] mb-1.5">Пароль</p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              placeholder="Введите пароль"
              className="w-full border border-[#ddd3ca] bg-[#faf6f2] px-4 py-3 text-sm text-[#1a1714] placeholder-[#b8a898] outline-none focus:border-[#b8976a] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs bg-red-50 border border-red-200 px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a898] hover:bg-[#b8967a] disabled:opacity-40 text-white text-[10px] tracking-[0.35em] uppercase py-3.5 transition-colors"
          >
            {loading ? "Проверяем..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
