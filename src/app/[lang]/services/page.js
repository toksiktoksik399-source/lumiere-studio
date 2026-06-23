import Link from "next/link";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";

const TAB_ICONS = {
  face:  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M3 21c0-4 4-7 9-7s9 3 9 7"/></svg>,
  body:  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>,
  laser: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
  care:  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

export default async function ServicesPage({ params }) {
  const { lang } = await params;

  return (
    <>
      {/* Page header */}
      <section className="pt-16 md:pt-24 pb-14 md:pb-20 bg-[#f5ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Lumière Studio</p>
            <h1 className="font-display font-light text-5xl md:text-7xl text-[#1a1714] mb-6">УСЛУГИ И ЦЕНЫ</h1>
            <p className="text-[#6b5f50] text-sm max-w-xl leading-relaxed">
              Профессиональные процедуры для лица, тела и волос. Все препараты — оригинальные, сертифицированные.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      {site.serviceCategories.map((cat, ci) => (
        <section
          key={ci}
          id={cat.tab}
          className={`py-16 md:py-20 scroll-mt-20 ${ci % 2 === 0 ? "bg-white" : "bg-[#f5ede8]"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="flex items-center gap-4 mb-10 md:mb-14">
                <div className="w-12 h-12 border border-[#ddd3ca] flex items-center justify-center text-[#b8976a]">
                  {TAB_ICONS[cat.tab]}
                </div>
                <h2 className="font-display font-light text-3xl md:text-5xl text-[#1a1714] tracking-wide uppercase">
                  {cat.title}
                </h2>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-0">
              {cat.items.map((item, ii) => (
                <Reveal key={ii} delay={ii * 30}>
                  <div className="flex items-start justify-between gap-6 py-5 border-b border-[#ede3da] group hover:bg-[#ede3da]/30 px-2 -mx-2 transition-colors rounded-sm">
                    <div className="flex-1">
                      <div className="text-[#1a1714] text-sm mb-1">{item.name}</div>
                      {item.desc && <div className="text-xs text-[#9a8878] leading-relaxed">{item.desc}</div>}
                    </div>
                    <div className="text-[#b8976a] text-sm font-medium whitespace-nowrap shrink-0">{item.price}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-[#1a1714]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-5">Персональный подбор</p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-white mb-6">
              НЕ ЗНАЕТЕ С ЧЕГО НАЧАТЬ?
            </h2>
            <p className="text-[#9a8878] text-sm mb-10 max-w-md mx-auto leading-relaxed">
              Запишитесь на бесплатную консультацию — мы подберём процедуры именно под ваш запрос и кожу.
            </p>
            <Link
              href={`/${lang}#contacts`}
              className="inline-flex items-center gap-4 bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.4em] uppercase px-10 py-4 transition-colors"
            >
              ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
