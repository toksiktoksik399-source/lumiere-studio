import Link from "next/link";
import { site } from "@/content/site";

const SECTIONS = [
  {
    id: "settings",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    title: "Настройки сайта",
    description: "Название, телефон, адрес, часы работы, ссылки на соцсети, фото главного экрана",
    count: null,
    countLabel: null,
    fields: [site.settings.phone, site.settings.email, site.settings.address?.ru],
    studioPath: "/studio",
    color: "from-[#b08d57] to-[#9a7846]",
  },
  {
    id: "procedures",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "ТОП-процедуры",
    description: "Три главные процедуры на главной странице — фото, описание, цены",
    count: site.topProcedures.length,
    countLabel: "процедуры",
    studioPath: "/studio",
    color: "from-[#8b6a3e] to-[#7a5c35]",
  },
  {
    id: "services",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    title: "Все услуги",
    description: "Полный список услуг по категориям на странице /services",
    count: site.serviceCategories.reduce((s, c) => s + c.items.length, 0),
    countLabel: "услуг",
    studioPath: "/studio",
    color: "from-[#6b5f50] to-[#5a4f42]",
  },
  {
    id: "team",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Команда",
    description: "Специалисты клиники — имя, должность, стаж, фотография",
    count: site.team.length,
    countLabel: "специалиста",
    studioPath: "/studio",
    color: "from-[#7a6d5e] to-[#6a5e50]",
  },
  {
    id: "testimonials",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Отзывы",
    description: "Отзывы клиентов — текст, имя, оценка, фото",
    count: site.testimonials.length,
    countLabel: "отзывов",
    studioPath: "/studio",
    color: "from-[#a07850] to-[#8d6843]",
  },
];

const STEPS = [
  { n: "1", text: "Откройте нужный раздел кнопкой «Редактировать»" },
  { n: "2", text: "Войдите в Sanity Studio (потребуется аккаунт)" },
  { n: "3", text: "Измените данные в форме и нажмите «Publish»" },
  { n: "4", text: "Изменения появятся на сайте автоматически" },
];

export default function AdminPage() {
  const totalServices = site.serviceCategories.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="min-h-screen bg-[#f2ebe0]">
      {/* Header */}
      <header className="bg-[#3f372e] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/ru" className="font-display text-xl md:text-2xl tracking-[0.2em] text-white hover:text-[#c9a96e] transition-colors">
              VALVERDE
            </Link>
            <span className="text-[#8a7c69] text-xs hidden sm:block">/ Панель управления</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/studio"
              target="_blank"
              className="flex items-center gap-2 bg-[#b08d57] hover:bg-[#9a7846] text-white text-xs px-4 py-2 rounded-full tracking-wide uppercase transition-colors"
            >
              <span>Sanity Studio</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </Link>
            <Link href="/ru" className="text-[#8a7c69] hover:text-white text-xs transition-colors hidden sm:block">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* Welcome */}
        <div className="mb-8 md:mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-[#3f372e] mb-2">Добро пожаловать</h1>
          <p className="text-[#6b5f50] text-sm md:text-base">Управляйте контентом сайта VALVERDE CLINIC через Sanity Studio</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 md:mb-10">
          {[
            { label: "Услуг", value: totalServices },
            { label: "Специалистов", value: site.team.length },
            { label: "Отзывов", value: site.testimonials.length },
            { label: "ТОП-процедур", value: site.topProcedures.length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-[#e9ddca] text-center">
              <div className="font-display text-3xl md:text-4xl text-[#b08d57] mb-1">{stat.value}</div>
              <div className="text-[#8a7c69] text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <h2 className="font-display text-xl md:text-2xl text-[#3f372e] mb-5">Разделы контента</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 md:mb-14">
          {SECTIONS.map((sec) => (
            <div
              key={sec.id}
              className="bg-white rounded-2xl border border-[#e9ddca] overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className={`bg-gradient-to-r ${sec.color} p-5 flex items-center gap-3`}>
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-white">
                  {sec.icon}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{sec.title}</div>
                  {sec.count !== null && (
                    <div className="text-white/70 text-xs">{sec.count} {sec.countLabel}</div>
                  )}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-[#6b5f50] text-sm leading-relaxed mb-4 flex-1">{sec.description}</p>
                {sec.fields && (
                  <div className="mb-4 space-y-1">
                    {sec.fields.filter(Boolean).map((f, i) => (
                      <div key={i} className="text-xs text-[#8a7c69] bg-[#f7f1e9] rounded-lg px-3 py-2 truncate">{f}</div>
                    ))}
                  </div>
                )}
                <Link
                  href={sec.studioPath}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#f2ebe0] hover:bg-[#b08d57] hover:text-white text-[#3f372e] text-xs py-3 rounded-xl uppercase tracking-widest font-medium transition-colors"
                >
                  Редактировать
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How to use */}
        <div className="bg-white rounded-2xl border border-[#e9ddca] p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl md:text-2xl text-[#3f372e] mb-6">Как редактировать контент</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {STEPS.map((step) => (
              <div key={step.n} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#b08d57] text-white flex items-center justify-center text-sm font-medium shrink-0">
                  {step.n}
                </div>
                <p className="text-[#6b5f50] text-sm leading-relaxed pt-1">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-[#ede3d4]">
            <Link
              href="/studio"
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#3f372e] hover:bg-[#2d2822] text-white px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-colors"
            >
              Открыть Sanity Studio
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-[#3f372e] rounded-2xl p-6 md:p-8">
          <h2 className="font-display text-xl text-white mb-5">Быстрые ссылки</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Главная", href: "/ru" },
              { label: "Все услуги", href: "/ru/services" },
              { label: "Sanity Studio", href: "/studio" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith("/studio") ? "_blank" : undefined}
                className="bg-white/10 hover:bg-white/20 text-white text-sm py-3 px-4 rounded-xl text-center transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-[#a8997f]">
        VALVERDE CLINIC — Панель управления
      </footer>
    </div>
  );
}
