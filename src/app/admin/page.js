"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ─── Styles ─────────────────────────────────────── */
const cls = {
  inp:  "w-full border border-[#ddd3ca] bg-white px-3 py-2.5 text-sm text-[#1a1714] placeholder-[#b8a898] outline-none focus:border-[#b8976a] transition-colors",
  sel:  "w-full border border-[#ddd3ca] bg-white px-3 py-2.5 text-sm text-[#1a1714] outline-none focus:border-[#b8976a] transition-colors",
  txt:  "w-full border border-[#ddd3ca] bg-white px-3 py-2.5 text-sm text-[#1a1714] placeholder-[#b8a898] outline-none focus:border-[#b8976a] transition-colors resize-none",
  save: "bg-[#c9a898] hover:bg-[#b8967a] disabled:opacity-40 text-white text-[10px] tracking-widest uppercase px-6 py-2.5 transition-colors",
  out:  "border border-[#ddd3ca] text-[#6b5f50] text-[10px] tracking-widest uppercase px-4 py-2.5 hover:border-[#b8976a] transition-colors",
  del:  "border border-red-200 text-red-400 text-[10px] tracking-widest uppercase px-3 py-2 hover:bg-red-50 transition-colors",
  tag:  "text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-colors",
};

/* ─── Photo Upload Widget ────────────────────────── */
function Photo({ value, onChange }) {
  const ref = useRef();
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState("");

  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setErr(data.error || "Ошибка");
    } catch { setErr("Нет сети"); }
    setBusy(false);
  }

  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase text-[#9a8878] mb-2">Фото</p>
      <div className="flex gap-3 items-start flex-wrap">
        {/* Preview */}
        <div className="relative w-20 h-20 border border-[#ddd3ca] bg-[#f5ede8] shrink-0 flex items-center justify-center overflow-hidden">
          {value
            ? <img src={value} alt="" className="w-full h-full object-cover" onError={(e)=>e.target.style.opacity=0} />
            : <span className="text-2xl text-[#ddd3ca]">📷</span>
          }
          {value && (
            <button type="button" onClick={() => onChange("")}
              className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center leading-none">
              ✕
            </button>
          )}
        </div>
        {/* Controls */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <button type="button" disabled={busy} onClick={() => ref.current?.click()}
            className="text-[10px] tracking-widest uppercase bg-[#1a1714] hover:bg-[#2d2520] text-white px-4 py-2 disabled:opacity-40 transition-colors self-start">
            {busy ? "Загружаем..." : "📤 С устройства"}
          </button>
          <input ref={ref} type="file" accept="image/*" className="hidden" onChange={upload} />
          <input value={value} onChange={e => onChange(e.target.value)}
            placeholder="или вставьте ссылку на фото"
            className={cls.inp} />
          {err && <p className="text-red-500 text-xs">{err}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Label ──────────────────────────────────────── */
function Label({ children }) {
  return <p className="text-[10px] tracking-widest uppercase text-[#9a8878] mb-1">{children}</p>;
}

/* ─── Seed button logic ──────────────────────────── */
function SeedBanner() {
  return (
    <div className="bg-green-50 border border-green-200 p-4 mb-6">
      <p className="text-green-800 text-sm font-semibold">✓ База данных подключена</p>
      <p className="text-green-700 text-xs mt-0.5">
        Изменения сохраняются автоматически и сразу отображаются на сайте.
      </p>
    </div>
  );
}

/* ─── Masters ────────────────────────────────────── */
const M0 = { name:"", role:"", experience:"", spec:"", bio:"", photoUrl:"", order:"" };

function Masters({ canEdit }) {
  const [list, setList]  = useState([]);
  const [form, setForm]  = useState(M0);
  const [edit, setEdit]  = useState(null);
  const [busy, setBusy]  = useState(false);
  const [ok,   setOk]    = useState("");

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/masters"); const d = await r.json(); setList(d.items || []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = k => v => setForm(f => ({ ...f, [k]: typeof v === "string" ? v : v.target.value }));

  function startEdit(m) {
    setEdit(m._id);
    setForm({ name: m.name||"", role: m.role||"", experience: m.experience||"",
              spec: m.spec||"", bio: m.bio||"", photoUrl: m.photoUrl||"", order: m.order??""});
  }
  function cancel() { setEdit(null); setForm(M0); setOk(""); }

  async function submit(e) {
    e.preventDefault(); setBusy(true); setOk("");
    const method = edit ? "PUT" : "POST";
    const url    = edit ? `/api/admin/masters/${edit}` : "/api/admin/masters";
    const r = await fetch(url, { method, headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setBusy(false);
    if (r.ok) { setOk("ok"); cancel(); load(); } else setOk("err");
  }

  async function del(id) {
    if (!confirm("Удалить мастера?")) return;
    await fetch(`/api/admin/masters/${id}`, { method:"DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      {canEdit && (
        <form onSubmit={submit} className="bg-white border border-[#ddd3ca] p-5 space-y-4">
          <p className="text-[10px] tracking-widest uppercase text-[#9a8878] border-b border-[#ede3da] pb-2">
            {edit ? "✎ Редактировать мастера" : "+ Добавить мастера"}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Имя *</Label><input required value={form.name} onChange={set("name")} className={cls.inp} /></div>
            <div><Label>Должность</Label><input value={form.role} onChange={set("role")} className={cls.inp} /></div>
            <div><Label>Опыт</Label><input value={form.experience} onChange={set("experience")} placeholder="12 лет опыта" className={cls.inp} /></div>
            <div><Label>Специализация</Label><input value={form.spec} onChange={set("spec")} className={cls.inp} /></div>
            <div className="sm:col-span-2"><Label>Биография</Label><textarea rows={3} value={form.bio} onChange={set("bio")} className={cls.txt} /></div>
            <div className="sm:col-span-2"><Photo value={form.photoUrl} onChange={set("photoUrl")} /></div>
            <div><Label>Порядок</Label><input type="number" value={form.order} onChange={set("order")} placeholder="1" className={cls.inp} /></div>
          </div>
          <div className="flex gap-3 items-center flex-wrap pt-1">
            <button type="submit" disabled={busy} className={cls.save}>{busy ? "Сохраняем..." : edit ? "Сохранить" : "Добавить"}</button>
            {edit && <button type="button" onClick={cancel} className={cls.out}>Отмена</button>}
            {ok === "ok"  && <span className="text-green-600 text-xs">Сохранено ✓</span>}
            {ok === "err" && <span className="text-red-500 text-xs">Ошибка — попробуйте ещё раз</span>}
          </div>
        </form>
      )}

      <div className="space-y-2">
        {list.length === 0 && <p className="text-[#9a8878] text-sm text-center py-8">Нет данных — нажмите «Загрузить данные» выше</p>}
        {list.map(m => (
          <div key={m._id} className="bg-white border border-[#ddd3ca] p-4 flex gap-4 items-center">
            <div className="w-12 h-12 shrink-0 border border-[#ede3da] overflow-hidden bg-[#f5ede8]">
              {m.photoUrl && <img src={m.photoUrl} alt="" className="w-full h-full object-cover" onError={e=>e.target.style.display="none"} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1a1714]">{m.name}</p>
              <p className="text-xs text-[#b8976a]">{m.role}</p>
              <p className="text-xs text-[#9a8878]">{m.experience}</p>
            </div>
            {canEdit && (
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(m)} className={cls.out}>Изм.</button>
                <button onClick={() => del(m._id)} className={cls.del}>Удал.</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Reviews ────────────────────────────────────── */
const R0 = { name:"", text:"", rating:"5", photoUrl:"", order:"" };

function Reviews({ canEdit }) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(R0);
  const [edit, setEdit] = useState(null);
  const [busy, setBusy] = useState(false);
  const [ok,   setOk]   = useState("");

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/reviews"); const d = await r.json(); setList(d.items || []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = k => v => setForm(f => ({ ...f, [k]: typeof v === "string" ? v : v.target.value }));

  function startEdit(r) {
    setEdit(r._id);
    setForm({ name: r.name||"", text: typeof r.text==="object" ? r.text.ru||"" : r.text||"",
              rating: String(r.rating||5), photoUrl: r.photoUrl||"", order: r.order??""});
  }
  function cancel() { setEdit(null); setForm(R0); setOk(""); }

  async function submit(e) {
    e.preventDefault(); setBusy(true); setOk("");
    const method = edit ? "PUT" : "POST";
    const url    = edit ? `/api/admin/reviews/${edit}` : "/api/admin/reviews";
    const r = await fetch(url, { method, headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setBusy(false);
    if (r.ok) { setOk("ok"); cancel(); load(); } else setOk("err");
  }

  async function del(id) {
    if (!confirm("Удалить отзыв?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method:"DELETE" });
    load();
  }

  return (
    <div className="space-y-6">
      {canEdit && (
        <form onSubmit={submit} className="bg-white border border-[#ddd3ca] p-5 space-y-4">
          <p className="text-[10px] tracking-widest uppercase text-[#9a8878] border-b border-[#ede3da] pb-2">
            {edit ? "✎ Редактировать отзыв" : "+ Добавить отзыв"}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Имя клиента *</Label><input required value={form.name} onChange={set("name")} className={cls.inp} /></div>
            <div className="flex items-center gap-4 pt-5">
              <span className="text-xs text-[#9a8878]">Оценка:</span>
              {["5","4","3"].map(v => (
                <label key={v} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="rating" value={v} checked={form.rating===v} onChange={set("rating")} className="accent-[#b8976a]" />
                  <span className="text-[#b8976a]">{"★".repeat(+v)}</span>
                </label>
              ))}
            </div>
            <div className="sm:col-span-2"><Label>Текст отзыва *</Label><textarea required rows={4} value={form.text} onChange={set("text")} className={cls.txt} /></div>
            <div className="sm:col-span-2"><Photo value={form.photoUrl} onChange={set("photoUrl")} /></div>
            <div><Label>Порядок</Label><input type="number" value={form.order} onChange={set("order")} placeholder="1" className={cls.inp} /></div>
          </div>
          <div className="flex gap-3 items-center flex-wrap pt-1">
            <button type="submit" disabled={busy} className={cls.save}>{busy ? "Сохраняем..." : edit ? "Сохранить" : "Добавить"}</button>
            {edit && <button type="button" onClick={cancel} className={cls.out}>Отмена</button>}
            {ok === "ok"  && <span className="text-green-600 text-xs">Сохранено ✓</span>}
            {ok === "err" && <span className="text-red-500 text-xs">Ошибка</span>}
          </div>
        </form>
      )}

      <div className="space-y-2">
        {list.length === 0 && <p className="text-[#9a8878] text-sm text-center py-8">Нет данных</p>}
        {list.map(r => (
          <div key={r._id} className="bg-white border border-[#ddd3ca] p-4 flex gap-4 items-start">
            <div className="w-11 h-11 shrink-0 rounded-full border border-[#ede3da] overflow-hidden bg-[#f5ede8]">
              {r.photoUrl && <img src={r.photoUrl} alt="" className="w-full h-full object-cover" onError={e=>e.target.style.display="none"} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2"><span className="text-sm font-medium text-[#1a1714]">{r.name}</span><span className="text-[#b8976a] text-xs">{"★".repeat(r.rating||5)}</span></div>
              <p className="text-xs text-[#6b5f50] line-clamp-2 mt-0.5">{typeof r.text==="object" ? r.text.ru : r.text}</p>
            </div>
            {canEdit && (
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(r)} className={cls.out}>Изм.</button>
                <button onClick={() => del(r._id)} className={cls.del}>Удал.</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Services ───────────────────────────────────── */
const CATS = [{v:"face",l:"Лицо"},{v:"body",l:"Тело"},{v:"laser",l:"Лазер"},{v:"care",l:"Уход"}];
const S0 = { title:"", description:"", price:"", category:"face", order:"" };

function Services({ canEdit }) {
  const [list,   setList]   = useState([]);
  const [form,   setForm]   = useState(S0);
  const [edit,   setEdit]   = useState(null);
  const [filter, setFilter] = useState("all");
  const [busy,   setBusy]   = useState(false);
  const [ok,     setOk]     = useState("");

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/services"); const d = await r.json(); setList(d.items || []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = k => v => setForm(f => ({ ...f, [k]: typeof v === "string" ? v : v.target.value }));

  function startEdit(s) {
    setEdit(s._id);
    setForm({ title: typeof s.title==="object" ? s.title.ru||"" : s.title||"",
              description: typeof s.description==="object" ? s.description.ru||"" : s.description||"",
              price: s.price||"", category: s.category||"face", order: s.order??"" });
  }
  function cancel() { setEdit(null); setForm(S0); setOk(""); }

  async function submit(e) {
    e.preventDefault(); setBusy(true); setOk("");
    const method = edit ? "PUT" : "POST";
    const url    = edit ? `/api/admin/services/${edit}` : "/api/admin/services";
    const r = await fetch(url, { method, headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setBusy(false);
    if (r.ok) { setOk("ok"); cancel(); load(); } else setOk("err");
  }

  async function del(id) {
    if (!confirm("Удалить услугу?")) return;
    await fetch(`/api/admin/services/${id}`, { method:"DELETE" });
    load();
  }

  const catLabel = v => CATS.find(c => c.v===v)?.l || v;
  const shown = filter==="all" ? list : list.filter(s => s.category===filter);

  return (
    <div className="space-y-6">
      {canEdit && (
        <form onSubmit={submit} className="bg-white border border-[#ddd3ca] p-5 space-y-4">
          <p className="text-[10px] tracking-widest uppercase text-[#9a8878] border-b border-[#ede3da] pb-2">
            {edit ? "✎ Редактировать услугу" : "+ Добавить услугу"}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Категория</Label>
              <select value={form.category} onChange={set("category")} className={cls.sel}>
                {CATS.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
              </select>
            </div>
            <div><Label>Порядок</Label><input type="number" value={form.order} onChange={set("order")} placeholder="1" className={cls.inp} /></div>
            <div className="sm:col-span-2"><Label>Название *</Label><input required value={form.title} onChange={set("title")} className={cls.inp} /></div>
            <div><Label>Цена</Label><input value={form.price} onChange={set("price")} placeholder="от 6 000 ₽" className={cls.inp} /></div>
            <div><Label>Описание</Label><input value={form.description} onChange={set("description")} className={cls.inp} /></div>
          </div>
          <div className="flex gap-3 items-center flex-wrap pt-1">
            <button type="submit" disabled={busy} className={cls.save}>{busy ? "Сохраняем..." : edit ? "Сохранить" : "Добавить"}</button>
            {edit && <button type="button" onClick={cancel} className={cls.out}>Отмена</button>}
            {ok === "ok"  && <span className="text-green-600 text-xs">Сохранено ✓</span>}
            {ok === "err" && <span className="text-red-500 text-xs">Ошибка</span>}
          </div>
        </form>
      )}

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {[{v:"all",l:"Все"}, ...CATS].map(c => (
          <button key={c.v} onClick={() => setFilter(c.v)}
            className={`${cls.tag} ${filter===c.v ? "bg-[#1a1714] text-white border-[#1a1714]" : "border-[#ddd3ca] text-[#6b5f50] hover:border-[#b8976a]"}`}>
            {c.l}
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        {shown.length === 0 && <p className="text-[#9a8878] text-sm text-center py-8">Нет данных</p>}
        {shown.map(s => (
          <div key={s._id} className="bg-white border border-[#ddd3ca] px-4 py-3 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-[#b8976a] shrink-0 w-12">{catLabel(s.category)}</span>
            <span className="flex-1 text-sm text-[#1a1714] truncate">{typeof s.title==="object" ? s.title.ru : s.title}</span>
            <span className="text-[#b8976a] text-sm shrink-0">{s.price}</span>
            {canEdit && (
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(s)} className={cls.out}>Изм.</button>
                <button onClick={() => del(s._id)} className={cls.del}>Удал.</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────── */
const TABS = [
  { id: "masters",  label: "Мастера" },
  { id: "reviews",  label: "Отзывы" },
  { id: "services", label: "Услуги" },
];

export default function AdminPage() {
  const [tab,      setTab]      = useState("masters");
  const [status,   setStatus]   = useState("checking"); // checking | ok | no_token
  useEffect(() => {
    fetch("/api/admin/ping")
      .then(r => r.json())
      .then(d => setStatus(d.ok ? "ok" : "no_token"))
      .catch(() => setStatus("no_token"));
  }, []);

  const canEdit = status === "ok";

  return (
    <div className="min-h-screen bg-[#f5ede8]">
      {/* Header */}
      <header className="bg-[#1a1714] sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-[0.3em] text-white">LUMIÈRE</span>
            <span className="text-[#4a3f38] text-xs hidden sm:block">/ Панель управления</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/ru" className="text-[#6b5f50] hover:text-white text-[10px] tracking-widest uppercase transition-colors">
              ← На сайт
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/admin/auth", { method: "DELETE" });
                window.location.href = "/admin/login";
              }}
              className="border border-[#3d3229] text-[#6b5f50] hover:border-[#b8976a] hover:text-[#b8976a] text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-8">

        {/* Status banners */}
        {status === "checking" && (
          <div className="border border-[#ddd3ca] bg-white p-4 mb-6 text-sm text-[#9a8878]">
            Проверяем подключение к базе данных...
          </div>
        )}
        {status === "no_token" && (
          <div className="bg-amber-50 border border-amber-300 p-4 mb-6 rounded">
            <p className="text-amber-800 font-semibold text-sm mb-1">⚠ База данных не подключена</p>
            <p className="text-amber-700 text-xs leading-relaxed">
              Добавьте переменную <code className="bg-amber-100 px-1 rounded font-mono">SANITY_API_TOKEN</code> в настройки Vercel → Settings → Environment Variables, затем передеплойте.
            </p>
          </div>
        )}
        {status === "ok" && <SeedBanner />}

        {/* Tabs */}
        <div className="flex border-b border-[#ddd3ca] mb-7 overflow-x-auto gap-0">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-6 py-3 text-xs tracking-widest uppercase whitespace-nowrap shrink-0 transition-colors ${
                tab === t.id
                  ? "text-[#1a1714] border-b-2 border-[#b8976a] -mb-px font-medium"
                  : "text-[#9a8878] hover:text-[#1a1714]"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {tab === "masters"  && <Masters  canEdit={canEdit} />}
          {tab === "reviews"  && <Reviews  canEdit={canEdit} />}
          {tab === "services" && <Services canEdit={canEdit} />}
        </div>

        {/* Footer links */}
        <div className="mt-12 pt-6 border-t border-[#ddd3ca] flex flex-wrap gap-3">
          {[
            { href: "/ru",          label: "Главная" },
            { href: "/ru/services", label: "Услуги" },
            { href: "/ru/team",     label: "Мастера" },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-4 py-2 text-[#6b5f50] hover:border-[#b8976a] hover:text-[#b8976a] transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
