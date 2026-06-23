"use client";
import { useState, useEffect } from "react";

const CATS = [
  { value: "face",  label: "Лицо" },
  { value: "body",  label: "Тело" },
  { value: "laser", label: "Лазер" },
  { value: "care",  label: "Уход" },
];
const EMPTY = { title: "", description: "", price: "", category: "face", order: "" };
const inp = "w-full border border-[#ddd3ca] bg-white px-3 py-2 text-sm outline-none focus:border-[#b8976a] transition-colors";

export default function ServicesAdmin() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("loading");
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [filterCat, setFilterCat] = useState("all");
  const [status, setStatus] = useState("");

  async function load() {
    const res = await fetch("/api/admin/services");
    const d = await res.json();
    setItems(d.items || []);
    setSource(d.source || "fallback");
  }
  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function startEdit(item) {
    setEditing(item._id);
    setForm({
      title: typeof item.title === "object" ? item.title.ru || "" : item.title || "",
      description: typeof item.description === "object" ? item.description.ru || "" : item.description || "",
      price: item.price || "", category: item.category || "face", order: item.order ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancel() { setEditing(null); setForm(EMPTY); setStatus(""); }

  async function save(e) {
    e.preventDefault();
    if (source === "fallback") return;
    setStatus("saving");
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/services/${editing}` : "/api/admin/services";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setStatus("saved"); cancel(); await load(); }
    else setStatus("error");
  }

  async function remove(id) {
    if (!confirm("Удалить услугу?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    await load();
  }

  const readonly = source === "fallback";
  const filtered = filterCat === "all" ? items : items.filter((i) => i.category === filterCat);
  const catLabel = (c) => CATS.find((x) => x.value === c)?.label || c;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-[#1a1714]">Услуги</h1>
        <p className="text-xs text-[#9a8878] mt-0.5">{readonly ? "Режим просмотра (нужен SANITY_API_TOKEN)" : "Источник: Sanity"}</p>
      </div>

      {!readonly && (
        <div className="bg-white border border-[#ddd3ca] p-5 mb-8">
          <h2 className="font-display text-lg text-[#1a1714] mb-4">{editing ? "Редактировать услугу" : "Добавить услугу"}</h2>
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-[#9a8878] block mb-1">Категория</label>
              <select value={form.category} onChange={set("category")} className={inp}>
                {CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <input placeholder="Порядок (1, 2, 3...)" type="number" value={form.order} onChange={set("order")} className={inp} />
            <input placeholder="Название услуги *" required value={form.title} onChange={set("title")} className={`${inp} sm:col-span-2`} />
            <input placeholder="Цена (напр. от 6 000 ₽)" value={form.price} onChange={set("price")} className={inp} />
            <input placeholder="Краткое описание" value={form.description} onChange={set("description")} className={inp} />
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

      {/* Filter by category */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[{ value: "all", label: "Все" }, ...CATS].map(c => (
          <button key={c.value} onClick={() => setFilterCat(c.value)}
            className={`text-[10px] tracking-widest uppercase px-4 py-2 border transition-colors ${filterCat === c.value ? "bg-[#1a1714] text-white border-[#1a1714]" : "border-[#ddd3ca] text-[#6b5f50] hover:border-[#b8976a]"}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((s) => (
          <div key={s._id} className="bg-white border border-[#ddd3ca] px-4 py-3 flex items-center gap-4">
            <span className="text-[10px] tracking-widest uppercase text-[#b8976a] shrink-0 w-14">{catLabel(s.category)}</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-[#1a1714] truncate block">
                {typeof s.title === "object" ? s.title.ru : s.title}
              </span>
            </div>
            <span className="text-[#b8976a] text-sm shrink-0">{s.price}</span>
            {!readonly && (
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(s)} className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-3 py-1.5 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">Изменить</button>
                <button onClick={() => remove(s._id)} className="text-[10px] tracking-widest uppercase border border-red-200 px-3 py-1.5 hover:bg-red-50 text-red-400 transition-colors">Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
