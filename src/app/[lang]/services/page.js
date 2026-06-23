export const dynamic = 'force-dynamic';

import Link from "next/link";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import ServiceItem from "@/components/ServiceItem";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/lib/queries";

const TAB_ICONS = {
  face:  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21c0-4 4-7 9-7s9 3 9 7"/></svg>,
  body:  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>,
  laser: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
  care:  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

export default async function ServicesPage({ params }) {
  const { lang } = await params;

  let categories = site.serviceCategories;
  try {
    const svc = await client.fetch(SERVICES_QUERY);
    if (svc?.length > 0) {
      const map = { face: [], body: [], laser: [], care: [] };
      const titles = { face: "Лицо", body: "Тело", laser: "Лазер", care: "Уход" };
      svc.forEach(s => { if (map[s.category]) map[s.category].push({ name: typeof s.title === "object" ? s.title.ru : s.title, price: s.price, desc: typeof s.description === "object" ? s.description.ru : s.description }); });
      const built = Object.entries(map).filter(([, v]) => v.length > 0).map(([k, v]) => ({ title: titles[k], tab: k, items: v }));
      if (built.length > 0) categories = built;
    }
  } catch {}

  return (
    <>
      <section className="pt-12 md:pt-20 pb-8 md:pb-16 bg-[#f5ede8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-3">Lumière Studio</p>
            <h1 className="font-display font-light text-3xl sm:text-5xl md:text-6xl text-[#1a1714] mb-4">УСЛУГИ И ЦЕНЫ</h1>
            <p className="text-[#6b5f50] text-sm max-w-md leading-relaxed">
              Профессиональные процедуры. Оригинальные препараты, сертифицированные специалисты.
            </p>
          </Reveal>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section
          key={ci}
          id={cat.tab}
          className={`py-10 md:py-16 scroll-mt-20 ${ci % 2 === 0 ? "bg-white" : "bg-[#f5ede8]"}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-7 md:mb-10">
                <div className="w-10 h-10 border border-[#ddd3ca] flex items-center justify-center text-[#b8976a] shrink-0">
                  {TAB_ICONS[cat.tab]}
                </div>
                <h2 className="font-display font-light text-2xl md:text-4xl text-[#1a1714] uppercase tracking-wide">
                  {cat.title}
                </h2>
              </div>
            </Reveal>
            <div>
              {cat.items.map((item, ii) => (
                <ServiceItem key={ii} item={item} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-14 md:py-20 bg-[#1a1714]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Персональный подбор</p>
            <h2 className="font-display font-light text-2xl sm:text-3xl md:text-5xl text-white mb-5">НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?</h2>
            <p className="text-[#9a8878] text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Запишитесь на бесплатную консультацию — подберём процедуры под ваш запрос.
            </p>
            <Link
              href={`/${lang}/contacts`}
              className="inline-flex items-center gap-3 bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.25em] sm:tracking-[0.4em] uppercase px-7 sm:px-8 py-4 transition-colors"
            >
              ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
