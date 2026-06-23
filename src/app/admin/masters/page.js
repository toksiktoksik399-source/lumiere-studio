"use client";
import { useState, useEffect } from "react";

const EMPTY = { name: "", role: "", experience: "", spec: "", bio: "", photoUrl: "", order: "" };

const inp = "w-full border border-[#ddd3ca] bg-white px-3 py-2 text-sm outline-none focus:border-[#b8976a] transition-colors";
const txt = `${inp} resize-none`;

export default function MastersAdmin() {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState("loading");
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");

  async function load() {
    const res = await fetch("/api/admin/masters");
    const d = await res.json();
    setItems(d.items || []);
    setSource(d.source || "fallback");
  }
  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function startEdit(item) {
    setEditing(item._id);
    setForm({
      name: item.name || "", role: item.role || "",
      experience: item.experience || "", spec: item.spec || "",
      bio: item.bio || "", photoUrl: item.photoUrl || "", order: item.order ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancel() { setEditing(null); setForm(EMPTY); setStatus(""); }

  async function save(e) {
    e.preventDefault();
    if (source === "fallback") return;
    setStatus("saving");
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/masters/${editing}` : "/api/admin/masters";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setStatus("saved"); cancel(); await load(); }
    else setStatus("error");
  }

  async function remove(id) {
    if (!confirm("Удалить мастера?")) return;
    await fetch(`/api/admin/masters/${id}`, { method: "DELETE" });
    await load();
  }

  const readonly = source === "fallback";

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl text-[#1a1714]">Мастера</h1>
          <p className="text-xs text-[#9a8878] mt-0.5">{readonly ? "Режим просмотра (нужен SANITY_API_TOKEN)" : "Источник: Sanity"}</p>
        </div>
      </div>

      {!readonly && (
        <div className="bg-white border border-[#ddd3ca] p-5 mb-8">
          <h2 className="font-display text-lg text-[#1a1714] mb-4">{editing ? "Редактировать мастера" : "Добавить мастера"}</h2>
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Имя *" required value={form.name} onChange={set("name")} className={inp} />
            <input placeholder="Должность (напр. Главный косметолог)" value={form.role} onChange={set("role")} className={inp} />
            <input placeholder="Опыт (напр. 12 лет опыта)" value={form.experience} onChange={set("experience")} className={inp} />
            <input placeholder="Специализация" value={form.spec} onChange={set("spec")} className={inp} />
            <textarea placeholder="Биография (2-3 предложения)" rows={3} value={form.bio} onChange={set("bio")} className={`${txt} sm:col-span-2`} />
            <input placeholder="Ссылка на фото (URL)" value={form.photoUrl} onChange={set("photoUrl")} className={inp} />
            <input placeholder="Порядок (1, 2, 3...)" type="number" value={form.order} onChange={set("order")} className={inp} />
            {form.photoUrl && <div className="sm:col-span-2"><img src={form.photoUrl} alt="" className="h-20 w-20 object-cover border border-[#ddd3ca]" onError={(e) => e.target.style.display = "none"} /></div>}
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-widest uppercase px-6 py-2.5 transition-colors">
                {status === "saving" ? "Сохраняем..." : editing ? "Сохранить" : "Добавить"}
              </button>
              {editing && <button type="button" onClick={cancel} className="border border-[#ddd3ca] text-[#6b5f50] text-[10px] tracking-widest uppercase px-5 py-2.5 hover:border-[#b8976a] transition-colors">Отмена</button>}
              {status === "saved" && <span className="text-green-600 text-xs self-center">Сохранено ✓</span>}
              {status === "error" && <span className="text-red-500 text-xs self-center">Ошибка</span>}
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {items.map((m) => (
          <div key={m._id} className="bg-white border border-[#ddd3ca] p-4 flex gap-4 items-start">
            {m.photoUrl && <img src={m.photoUrl} alt="" className="w-14 h-14 object-cover shrink-0 border border-[#ede3da]" onError={(e) => e.target.style.display = "none"} />}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[#1a1714] text-sm">{m.name}</div>
              <div className="text-xs text-[#b8976a]">{m.role}</div>
              <div className="text-xs text-[#9a8878] mt-1">{m.experience} {m.spec && `· ${m.spec}`}</div>
            </div>
            {!readonly && (
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(m)} className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-3 py-1.5 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">Изменить</button>
                <button onClick={() => remove(m._id)} className="text-[10px] tracking-widest uppercase border border-red-200 px-3 py-1.5 hover:bg-red-50 text-red-400 transition-colors">Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
