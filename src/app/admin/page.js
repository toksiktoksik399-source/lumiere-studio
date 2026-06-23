import Link from "next/link";
import { site } from "@/content/site";
import { isSanityConfigured } from "@/sanity/lib/adminClient";

export default function AdminPage() {
  const sanityOk = isSanityConfigured();

  const SECTIONS = [
    { href: "/admin/masters",  icon: "👩‍⚕️", title: "Мастера",   count: site.team.length,         label: "специалиста" },
    { href: "/admin/reviews",  icon: "💬",   title: "Отзывы",    count: site.testimonials.length,  label: "отзыва" },
    { href: "/admin/services", icon: "📋",   title: "Услуги",    count: site.serviceCategories.reduce((s, c) => s + c.items.length, 0), label: "услуги" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-[#1a1714] mb-2">Панель управления</h1>
      <p className="text-[#6b5f50] text-sm mb-6">Управляйте контентом студии LUMIÈRE</p>

      {/* Sanity status banner */}
      {!sanityOk ? (
        <div className="bg-amber-50 border border-amber-200 p-4 mb-8 text-sm">
          <p className="font-medium text-amber-800 mb-1">⚠ Режим просмотра — редактирование недоступно</p>
          <p className="text-amber-700 text-xs leading-relaxed">
            Чтобы включить редактирование, добавьте переменную <code className="bg-amber-100 px-1">SANITY_API_TOKEN</code> в настройки Vercel.<br/>
            Токен создаётся в <strong>sanity.io → проект → API → Tokens → Add API token (Editor)</strong>.
          </p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 p-3 mb-8 text-xs text-green-800">
          ✓ Sanity подключён — изменения сохраняются в базе данных
        </div>
      )}

      {/* Section cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href}
            className="bg-white border border-[#ddd3ca] p-6 hover:border-[#b8976a] hover:shadow-sm transition-all flex flex-col gap-3">
            <div className="text-3xl">{s.icon}</div>
            <div>
              <div className="font-display text-xl text-[#1a1714]">{s.title}</div>
              <div className="text-[#b8976a] text-sm">{s.count} {s.label}</div>
            </div>
            <div className="text-[10px] tracking-widest uppercase text-[#b8976a] mt-auto">
              {sanityOk ? "Открыть и редактировать →" : "Просмотр →"}
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-[#ddd3ca] p-6">
        <h2 className="font-display text-lg text-[#1a1714] mb-4">Быстрые ссылки</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/ru" className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-4 py-2 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">
            Сайт
          </Link>
          <Link href="/studio" target="_blank" className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-4 py-2 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">
            Sanity Studio ↗
          </Link>
          <Link href="/ru/services" className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-4 py-2 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">
            Страница услуг
          </Link>
          <Link href="/ru/team" className="text-[10px] tracking-widest uppercase border border-[#ddd3ca] px-4 py-2 hover:border-[#b8976a] text-[#6b5f50] hover:text-[#b8976a] transition-colors">
            Страница мастеров
          </Link>
        </div>
      </div>
    </div>
  );
}
