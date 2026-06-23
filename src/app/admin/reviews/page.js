"use client";
import { useState, useEffect } from "react";

const EMPTY = { name: "", text: "", rating: "5", photoUrl: "", order: "" };
const inp = "w-full border border-[#ddd3ca] bg-white px-3 py-2 text-sm outline-none focus:border-[#b8976a] transition-colors";

export default function ReviewsAdmin() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("loading");
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");

  async function load() {
    const res = await fetch("/api/admin/reviews");
    const d = await res.json();
    setItems(d.items || []);
    setSource(d.source || "fallback");
  }
  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function startEdit(item) {
    setEditing(item._id);
    setForm({
      name: item.name || "", text: typeof item.text === "object" ? item.text.ru || "" : item.text || "",
      rating: String(item.rating || 5), photoUrl: item.photoUrl || "", order: item.order ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancel() { setEditing(null); setForm(EMPTY); setStatus(""); }

  async function save(e) {
    e.preventDefault();
    if (source === "fallback") return;
    setStatus("saving");
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/reviews/${editing}` : "/api/admin/reviews";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setStatus("saved"); cancel(); await load(); }
    else setStatus("error");
  }

  async function remove(id) {
    if (!confirm("Удалить отзыв?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    await load();
  }

  const readonly = source === "fallback";

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-[#1a1714]">Отзывы</h1>
        <p className="text-xs text-[#9a8878] mt-0.5">{readonly ? "Режим просмотра (нужен SANITY_API_TOKEN)" : "Источник: Sanity"}</p>
      </div>

      {!readonly && (
        <div className="bg-white border border-[#ddd3ca] p-5 mb-8">
          <h2 className="font-display text-lg text-[#1a1714] mb-4">{editing ? "Редактировать отзыв" : "Добавить отзыв"}</h2>
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Имя клиента *" required value={form.name} onChange={set("name")} className={inp} />
            <div className="flex gap-2 items-center">
              <span className="text-xs text-[#9a8878] whitespace-nowrap">Оценка:</span>
              {["5","4","3"].map(r => (
                <label key={r} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="rating" value={r} checked={form.rating === r} onChange={set("rating")} className="accent-[#b8976a]" />
                  <span className="text-sm text-[#b8976a]">{"★".repeat(Number(r))}</span>
                </label>
              ))}
            </div>
            <textarea placeholder="Текст отзыва *" required rows={4} value={form.text} onChange={set("text")} className={`${inp} resize-none sm:col-span-2`} />
            <input placeholder="Ссылка на фото (URL)" value={form.photoUrl} onChange={set("photoUrl")} className={inp} />
            <input placeholder="Порядок (1, 2, 3...)" type="number" value={form.order} onChange={set("order")} className={inp} />
            {form.photoUrl && <div className="sm:col-span-2"><img src={form.photoUrl} alt="" className="h-16 w-16 object-cover border border-[#ddd3ca] rounded-full" onError={(e) => e.target.style.display = "none"} /></div>}
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-widest uppercase px-6 py-2.5 transition-colors">
                {status === "saving" ? "Сохраняем..." : editing ? "Сохранить" : "Добавить"}
              </button>
              {editing && <button type="button" onClick={cancel} className="border border-[#ddd3ca] text-[#6b5f50] text-[10px] tracking-widest uppercase px-5 py-2.5 hover:border-[#b8976a] transition-colors">Отмена</button>}
              {status === "saved" && <span className="text-green-600 text-xs self-center">Сохранено ✓</span>}
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {items.map((r) => (
          <div key={r._id} className="bg-white border border-[#ddd3ca] p-4 flex gap-4 items-start">
            {r.photoUrl && <img src={r.photoUrl} alt="" className="w-12 h-12 object-cover rounded-full shrink-0 border border-[#ede3da]" onError={(e) => e.target.style.display = "none"} />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-[#1a1714] text-sm">{r.name}</span>
                <span className="text-[#b8976a] text-xs">{"★".repeat(r.rating || 5)}</span>
              </div>
              <p className="text-xs text-[#6b5f50] leading-relaxed line-clamp-2">
                {typeof r.text === "object" ? r.text.ru : r.text}
              </p>
            </div>
            {!readonly && (
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(r)} className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-3 py-1.5 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">Изменить</button>
                <button onClick={() => remove(r._id)} className="text-[10px] tracking-widest uppercase border border-red-200 px-3 py-1.5 hover:bg-red-50 text-red-400 transition-colors">Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
