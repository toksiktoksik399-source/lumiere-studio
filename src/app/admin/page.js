"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ── helpers ── */
const inp = "w-full border border-[#ddd3ca] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#b8976a] transition-colors";
const txt = `${inp} resize-none`;
const btn = "bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-widest uppercase px-5 py-2.5 transition-colors disabled:opacity-50";
const btnOut = "border border-[#ddd3ca] text-[#6b5f50] text-[10px] tracking-widest uppercase px-5 py-2.5 hover:border-[#b8976a] transition-colors";
const btnDel = "border border-red-200 text-red-400 text-[10px] tracking-widest uppercase px-3 py-1.5 hover:bg-red-50 transition-colors";

const CATS = [
  { value: "face", label: "Лицо" },
  { value: "body", label: "Тело" },
  { value: "laser", label: "Лазер" },
  { value: "care", label: "Уход" },
];

/* ── Masters tab ── */
const MASTER_EMPTY = { name: "", role: "", experience: "", spec: "", bio: "", photoUrl: "", order: "" };

function MastersTab({ readonly }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(MASTER_EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  async function load() {
    try {
      const r = await fetch("/api/admin/masters");
      const d = await r.json();
      setItems(d.items || []);
    } catch { setItems([]); }
  }
  useEffect(() => { load(); }, []);

  const f = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  function startEdit(m) {
    setEditing(m._id);
    setForm({ name: m.name || "", role: m.role || "", experience: m.experience || "", spec: m.spec || "", bio: m.bio || "", photoUrl: m.photoUrl || "", order: m.order ?? "" });
  }
  function cancel() { setEditing(null); setForm(MASTER_EMPTY); setMsg(""); }

  async function save(e) {
    e.preventDefault();
    setMsg("saving");
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/masters/${editing}` : "/api/admin/masters";
    try {
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) { setMsg("ok"); cancel(); load(); } else setMsg("err");
    } catch { setMsg("err"); }
  }

  async function remove(id) {
    if (!confirm("Удалить мастера?")) return;
    await fetch(`/api/admin/masters/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      {!readonly && (
        <form onSubmit={save} className="bg-white border border-[#ddd3ca] p-5 grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2 text-xs tracking-widest uppercase text-[#9a8878] pb-1 border-b border-[#ede3da]">
            {editing ? "✎ Редактировать мастера" : "+ Добавить мастера"}
          </div>
          <input placeholder="Имя *" required value={form.name} onChange={f("name")} className={inp} />
          <input placeholder="Должность (напр. Главный косметолог)" value={form.role} onChange={f("role")} className={inp} />
          <input placeholder="Опыт (напр. 12 лет опыта)" value={form.experience} onChange={f("experience")} className={inp} />
          <input placeholder="Специализация" value={form.spec} onChange={f("spec")} className={inp} />
          <textarea placeholder="Биография" rows={3} value={form.bio} onChange={f("bio")} className={`${txt} sm:col-span-2`} />
          <input placeholder="Ссылка на фото (URL)" value={form.photoUrl} onChange={f("photoUrl")} className={inp} />
          <input placeholder="Порядок (1, 2, 3...)" type="number" value={form.order} onChange={f("order")} className={inp} />
          {form.photoUrl && <div className="sm:col-span-2"><img src={form.photoUrl} alt="" className="h-16 w-16 object-cover border border-[#ddd3ca]" onError={(e) => { e.target.style.display = "none"; }} /></div>}
          <div className="sm:col-span-2 flex gap-3 items-center flex-wrap">
            <button type="submit" className={btn} disabled={msg === "saving"}>{msg === "saving" ? "Сохраняем..." : editing ? "Сохранить" : "Добавить"}</button>
            {editing && <button type="button" onClick={cancel} className={btnOut}>Отмена</button>}
            {msg === "ok" && <span className="text-green-600 text-xs">Сохранено ✓</span>}
            {msg === "err" && <span className="text-red-500 text-xs">Ошибка — проверьте SANITY_API_TOKEN</span>}
          </div>
        </form>
      )}
      <div className="space-y-2">
        {items.length === 0 && <p className="text-[#9a8878] text-sm py-4">Нет мастеров</p>}
        {items.map((m) => (
          <div key={m._id} className="bg-white border border-[#ddd3ca] p-4 flex gap-4 items-start">
            {m.photoUrl && <img src={m.photoUrl} alt="" className="w-12 h-12 object-cover shrink-0 border border-[#ede3da]" onError={(e) => { e.target.style.display = "none"; }} />}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[#1a1714] text-sm">{m.name}</div>
              <div className="text-xs text-[#b8976a]">{m.role}</div>
              <div className="text-xs text-[#9a8878] mt-0.5">{m.experience}</div>
            </div>
            {!readonly && (
              <div className="flex gap-2 shrink-0 flex-wrap">
                <button onClick={() => startEdit(m)} className={btnOut}>Изменить</button>
                <button onClick={() => remove(m._id)} className={btnDel}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Reviews tab ── */
const REV_EMPTY = { name: "", text: "", rating: "5", photoUrl: "", order: "" };

function ReviewsTab({ readonly }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(REV_EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  async function load() {
    try {
      const r = await fetch("/api/admin/reviews");
      const d = await r.json();
      setItems(d.items || []);
    } catch { setItems([]); }
  }
  useEffect(() => { load(); }, []);

  const f = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  function startEdit(r) {
    setEditing(r._id);
    setForm({ name: r.name || "", text: typeof r.text === "object" ? r.text.ru || "" : r.text || "", rating: String(r.rating || 5), photoUrl: r.photoUrl || "", order: r.order ?? "" });
  }
  function cancel() { setEditing(null); setForm(REV_EMPTY); setMsg(""); }

  async function save(e) {
    e.preventDefault();
    setMsg("saving");
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/reviews/${editing}` : "/api/admin/reviews";
    try {
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) { setMsg("ok"); cancel(); load(); } else setMsg("err");
    } catch { setMsg("err"); }
  }

  async function remove(id) {
    if (!confirm("Удалить отзыв?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      {!readonly && (
        <form onSubmit={save} className="bg-white border border-[#ddd3ca] p-5 grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2 text-xs tracking-widest uppercase text-[#9a8878] pb-1 border-b border-[#ede3da]">
            {editing ? "✎ Редактировать отзыв" : "+ Добавить отзыв"}
          </div>
          <input placeholder="Имя клиента *" required value={form.name} onChange={f("name")} className={inp} />
          <div className="flex items-center gap-4 px-1">
            <span className="text-xs text-[#9a8878]">Оценка:</span>
            {["5","4","3"].map((r) => (
              <label key={r} className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="rev_rating" value={r} checked={form.rating === r} onChange={f("rating")} className="accent-[#b8976a]" />
                <span className="text-sm text-[#b8976a]">{"★".repeat(Number(r))}</span>
              </label>
            ))}
          </div>
          <textarea placeholder="Текст отзыва *" required rows={4} value={form.text} onChange={f("text")} className={`${txt} sm:col-span-2`} />
          <input placeholder="Ссылка на фото (URL)" value={form.photoUrl} onChange={f("photoUrl")} className={inp} />
          <input placeholder="Порядок (1, 2, 3...)" type="number" value={form.order} onChange={f("order")} className={inp} />
          {form.photoUrl && <div className="sm:col-span-2"><img src={form.photoUrl} alt="" className="h-14 w-14 object-cover rounded-full border border-[#ddd3ca]" onError={(e) => { e.target.style.display = "none"; }} /></div>}
          <div className="sm:col-span-2 flex gap-3 items-center flex-wrap">
            <button type="submit" className={btn} disabled={msg === "saving"}>{msg === "saving" ? "Сохраняем..." : editing ? "Сохранить" : "Добавить"}</button>
            {editing && <button type="button" onClick={cancel} className={btnOut}>Отмена</button>}
            {msg === "ok" && <span className="text-green-600 text-xs">Сохранено ✓</span>}
            {msg === "err" && <span className="text-red-500 text-xs">Ошибка — проверьте SANITY_API_TOKEN</span>}
          </div>
        </form>
      )}
      <div className="space-y-2">
        {items.length === 0 && <p className="text-[#9a8878] text-sm py-4">Нет отзывов</p>}
        {items.map((r) => (
          <div key={r._id} className="bg-white border border-[#ddd3ca] p-4 flex gap-4 items-start">
            {r.photoUrl && <img src={r.photoUrl} alt="" className="w-11 h-11 object-cover rounded-full shrink-0 border border-[#ede3da]" onError={(e) => { e.target.style.display = "none"; }} />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-[#1a1714] text-sm">{r.name}</span>
                <span className="text-[#b8976a] text-xs">{"★".repeat(r.rating || 5)}</span>
              </div>
              <p className="text-xs text-[#6b5f50] line-clamp-2">{typeof r.text === "object" ? r.text.ru : r.text}</p>
            </div>
            {!readonly && (
              <div className="flex gap-2 shrink-0 flex-wrap">
                <button onClick={() => startEdit(r)} className={btnOut}>Изменить</button>
                <button onClick={() => remove(r._id)} className={btnDel}>Удалить</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Services tab ── */
const SVC_EMPTY = { title: "", description: "", price: "", category: "face", order: "" };

function ServicesTab({ readonly }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(SVC_EMPTY);
  const [editing, setEditing] = useState(null);
  const [filterCat, setFilterCat] = useState("all");
  const [msg, setMsg] = useState("");

  async function load() {
    try {
      const r = await fetch("/api/admin/services");
      const d = await r.json();
      setItems(d.items || []);
    } catch { setItems([]); }
  }
  useEffect(() => { load(); }, []);

  const f = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  function startEdit(s) {
    setEditing(s._id);
    setForm({ title: typeof s.title === "object" ? s.title.ru || "" : s.title || "", description: typeof s.description === "object" ? s.description.ru || "" : s.description || "", price: s.price || "", category: s.category || "face", order: s.order ?? "" });
  }
  function cancel() { setEditing(null); setForm(SVC_EMPTY); setMsg(""); }

  async function save(e) {
    e.preventDefault();
    setMsg("saving");
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/admin/services/${editing}` : "/api/admin/services";
    try {
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) { setMsg("ok"); cancel(); load(); } else setMsg("err");
    } catch { setMsg("err"); }
  }

  async function remove(id) {
    if (!confirm("Удалить услугу?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    load();
  }

  const catLabel = (c) => CATS.find((x) => x.value === c)?.label || c;
  const filtered = filterCat === "all" ? items : items.filter((i) => i.category === filterCat);

  return (
    <div className="space-y-6">
      {!readonly && (
        <form onSubmit={save} className="bg-white border border-[#ddd3ca] p-5 grid sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2 text-xs tracking-widest uppercase text-[#9a8878] pb-1 border-b border-[#ede3da]">
            {editing ? "✎ Редактировать услугу" : "+ Добавить услугу"}
          </div>
          <div>
            <label className="text-[10px] text-[#9a8878] uppercase tracking-widest block mb-1">Категория</label>
            <select value={form.category} onChange={f("category")} className={inp}>
              {CATS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <input placeholder="Порядок (1, 2...)" type="number" value={form.order} onChange={f("order")} className={inp} />
          <input placeholder="Название услуги *" required value={form.title} onChange={f("title")} className={`${inp} sm:col-span-2`} />
          <input placeholder="Цена (напр. от 6 000 ₽)" value={form.price} onChange={f("price")} className={inp} />
          <input placeholder="Краткое описание" value={form.description} onChange={f("description")} className={inp} />
          <div className="sm:col-span-2 flex gap-3 items-center flex-wrap">
            <button type="submit" className={btn} disabled={msg === "saving"}>{msg === "saving" ? "Сохраняем..." : editing ? "Сохранить" : "Добавить"}</button>
            {editing && <button type="button" onClick={cancel} className={btnOut}>Отмена</button>}
            {msg === "ok" && <span className="text-green-600 text-xs">Сохранено ✓</span>}
            {msg === "err" && <span className="text-red-500 text-xs">Ошибка — проверьте SANITY_API_TOKEN</span>}
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-2">
        {[{ value: "all", label: "Все" }, ...CATS].map((c) => (
          <button key={c.value} onClick={() => setFilterCat(c.value)}
            className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-colors ${filterCat === c.value ? "bg-[#1a1714] text-white border-[#1a1714]" : "border-[#ddd3ca] text-[#6b5f50] hover:border-[#b8976a]"}`}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        {filtered.length === 0 && <p className="text-[#9a8878] text-sm py-4">Нет услуг</p>}
        {filtered.map((s) => (
          <div key={s._id} className="bg-white border border-[#ddd3ca] px-4 py-3 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-[#b8976a] w-12 shrink-0">{catLabel(s.category)}</span>
            <span className="flex-1 text-sm text-[#1a1714] truncate min-w-0">{typeof s.title === "object" ? s.title.ru : s.title}</span>
            <span className="text-[#b8976a] text-sm shrink-0">{s.price}</span>
            {!readonly && (
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(s)} className={btnOut}>Изм.</button>
                <button onClick={() => remove(s._id)} className={btnDel}>Удал.</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ── */
const TABS = [
  { id: "masters",  label: "👩‍⚕️ Мастера" },
  { id: "reviews",  label: "💬 Отзывы" },
  { id: "services", label: "📋 Услуги" },
];

export default function AdminPage() {
  const [tab, setTab] = useState("masters");
  const [sanityOk, setSanityOk] = useState(null); // null = loading

  useEffect(() => {
    // Use dedicated ping endpoint — reliable regardless of document count
    fetch("/api/admin/ping")
      .then((r) => r.json())
      .then((d) => setSanityOk(d.ok === true))
      .catch(() => setSanityOk(false));
  }, []);

  const readonly = sanityOk === false;

  return (
    <div className="min-h-screen bg-[#f5ede8]">
      {/* Header */}
      <header className="bg-[#1a1714] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.3em] text-white">LUMIÈRE</span>
          <Link href="/ru" className="text-[#9a8878] hover:text-white text-[10px] tracking-widest uppercase transition-colors">← Сайт</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl text-[#1a1714]">Панель управления</h1>
        </div>

        {/* Status banner */}
        {sanityOk === false && (
          <div className="bg-amber-50 border border-amber-200 p-4 mb-6 text-sm">
            <p className="font-medium text-amber-800 mb-1">⚠ Режим просмотра — сохранение недоступно</p>
            <p className="text-amber-700 text-xs leading-relaxed">
              Для редактирования добавьте <code className="bg-amber-100 px-1 rounded">SANITY_API_TOKEN</code> в переменные Vercel.<br/>
              Токен: <strong>sanity.io → проект → API → Tokens → Add API token (Editor)</strong>
            </p>
          </div>
        )}
        {sanityOk === true && (
          <div className="bg-green-50 border border-green-200 p-3 mb-6 text-xs text-green-800">
            ✓ Sanity подключён — изменения сохраняются в базе данных
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-[#ddd3ca] mb-6">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-[11px] tracking-widest uppercase transition-colors whitespace-nowrap ${tab === t.id ? "text-[#1a1714] border-b-2 border-[#b8976a] -mb-px" : "text-[#9a8878] hover:text-[#1a1714]"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "masters"  && <MastersTab  readonly={readonly} />}
        {tab === "reviews"  && <ReviewsTab  readonly={readonly} />}
        {tab === "services" && <ServicesTab readonly={readonly} />}

        {/* Quick links */}
        <div className="mt-10 pt-6 border-t border-[#ddd3ca] flex flex-wrap gap-3">
          {[
            { href: "/ru",           label: "Главная" },
            { href: "/ru/services",  label: "Услуги" },
            { href: "/ru/team",      label: "Мастера" },
            { href: "/studio",       label: "Sanity Studio ↗" },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              target={l.label.includes("↗") ? "_blank" : undefined}
              className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-4 py-2 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
