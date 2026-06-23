import Link from "next/link";
import { site } from "@/content/site";

const SECTIONS = [
  {
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    title: "Настройки студии",
    description: "Название, телефон, адрес, часы работы, ссылки на соцсети",
    info: [site.phone, site.email],
    count: null,
  },
  {
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    title: "Услуги",
    description: "Полный список процедур по категориям с ценами",
    count: Object.values(site.services).flat().length,
    countLabel: "услуг",
  },
  {
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Мастера",
    description: "Специалисты студии — имя, должность, стаж, фотография",
    count: site.team.length,
    countLabel: "специалиста",
  },
  {
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: "Отзывы",
    description: "Отзывы клиентов — текст, имя, оценка, фото",
    count: site.testimonials.length,
    countLabel: "отзывов",
  },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f5ede8]">
      {/* Header */}
      <header className="bg-[#1a1714] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg tracking-[0.3em] text-white">LUMIÈRE</span>
            <span className="text-[#4a3f38] text-xs hidden sm:block">/ Панель управления</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/studio" target="_blank" className="flex items-center gap-2 bg-[#b8976a] hover:bg-[#9a7a55] text-white text-[10px] px-4 py-2 tracking-widest uppercase transition-colors">
              Sanity Studio
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </Link>
            <Link href="/ru" className="text-[#6b5f50] hover:text-white text-[10px] tracking-widest uppercase transition-colors hidden sm:block">← Сайт</Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-5 py-8 md:py-12">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-[#1a1714] mb-1">Панель управления</h1>
          <p className="text-[#6b5f50] text-sm">Управляйте контентом студии LUMIÈRE через Sanity Studio</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: "Услуг", value: Object.values(site.services).flat().length },
            { label: "Мастеров", value: site.team.length },
            { label: "Отзывов", value: site.testimonials.length },
            { label: "Категорий", value: site.serviceCategories.length },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#ddd3ca] p-4 text-center">
              <div className="font-display text-3xl text-[#b8976a] mb-1">{s.value}</div>
              <div className="text-[10px] tracking-widest uppercase text-[#9a8878]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <h2 className="font-display text-xl text-[#1a1714] mb-5">Разделы контента</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {SECTIONS.map((s, i) => (
            <div key={i} className="bg-white border border-[#ddd3ca] overflow-hidden flex flex-col hover:shadow-sm transition-shadow">
              <div className="bg-[#1a1714] px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 flex items-center justify-center text-[#b8976a]">{s.icon}</div>
                <div>
                  <div className="text-white text-sm font-medium">{s.title}</div>
                  {s.count !== null && <div className="text-white/50 text-xs">{s.count} {s.countLabel}</div>}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[#6b5f50] text-xs leading-relaxed mb-4 flex-1">{s.description}</p>
                {s.info && (
                  <div className="mb-4 space-y-1">
                    {s.info.filter(Boolean).map((f, j) => (
                      <div key={j} className="text-xs text-[#9a8878] bg-[#f5ede8] px-3 py-2 truncate">{f}</div>
                    ))}
                  </div>
                )}
                <Link
                  href="/studio"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#f5ede8] hover:bg-[#b8976a] hover:text-white text-[#1a1714] text-[10px] py-3 tracking-widest uppercase transition-colors"
                >
                  Редактировать
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How to */}
        <div className="bg-white border border-[#ddd3ca] p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl text-[#1a1714] mb-6">Как редактировать</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Откройте нужный раздел кнопкой «Редактировать»",
              "Войдите в Sanity Studio (потребуется аккаунт)",
              "Измените данные в форме и нажмите «Publish»",
              "Изменения появятся на сайте автоматически",
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-7 h-7 bg-[#b8976a] text-white flex items-center justify-center text-xs shrink-0 font-medium">{i + 1}</div>
                <p className="text-[#6b5f50] text-xs leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-[#ede3da]">
            <Link href="/studio" target="_blank" className="inline-flex items-center gap-2 bg-[#1a1714] hover:bg-[#2d2520] text-white px-6 py-3 text-[10px] tracking-widest uppercase transition-colors">
              Открыть Sanity Studio
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-[#1a1714] p-6 md:p-8">
          <h2 className="font-display text-lg text-white mb-4">Быстрые ссылки</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Главная", href: "/ru" },
              { label: "Услуги", href: "/ru/services" },
              { label: "Мастера", href: "/ru/team" },
              { label: "Studio", href: "/studio" },
            ].map((l) => (
              <Link key={l.href} href={l.href} target={l.href === "/studio" ? "_blank" : undefined} className="bg-white/10 hover:bg-white/20 text-white text-[10px] tracking-widest uppercase py-3 text-center transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center py-5 text-[10px] text-[#9a8878] tracking-widest uppercase">
        LUMIÈRE — Панель управления
      </footer>
    </div>
  );
}
