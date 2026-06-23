import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import A from "@/components/A";

const CATEGORY_ICONS = [
  // Инъекционная
  <svg key="inj" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4-14 14H4v-4L18 2z"/><path d="m14.5 5.5 4 4"/></svg>,
  // Аппаратная
  <svg key="app" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  // Терапевтическая
  <svg key="ther" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  // Лазерная
  <svg key="laser" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/></svg>,
];

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  const categories = site.serviceCategories;

  return (
    <>
      <section className="py-16 md:py-24 bg-[#f2ebe0]">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <Reveal>
            <p className="text-[#b08d57] tracking-[0.35em] uppercase text-xs mb-4">
              {lang === "ru" ? "Valverde Clinic" : "Valverde Clinic"}
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-[#3f372e] mb-5">
              {lang === "ru" ? "Все услуги" : "All services"}
            </h1>
            <p className="text-[#6b5f50] text-lg max-w-xl mx-auto leading-relaxed">
              {lang === "ru"
                ? "Полный спектр процедур инъекционной, аппаратной, терапевтической и лазерной косметологии"
                : "Full range of injectable, hardware, therapeutic and laser cosmetology procedures"}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat, i) => (
                <a
                  key={i}
                  href={`#cat-${i}`}
                  className="px-4 py-2 rounded-full border border-[#d9c9af] text-xs tracking-widest uppercase text-[#6b5f50] hover:border-[#b08d57] hover:text-[#b08d57] transition-colors"
                >
                  {t(cat.title, lang)}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <section
          key={ci}
          id={`cat-${ci}`}
          className={`py-16 md:py-20 scroll-mt-24 ${ci % 2 === 1 ? "bg-[#f9f5ef]" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-5">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#f2ebe0] flex items-center justify-center text-[#b08d57] shrink-0">
                  {CATEGORY_ICONS[ci] || CATEGORY_ICONS[0]}
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-[#3f372e]">
                    {t(cat.title, lang)}
                  </h2>
                </div>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.items.map((item, ii) => (
                <Reveal key={ii} delay={ii * 40}>
                  <div className="group bg-[#fdf9f4] border border-[#ede3d4] rounded-2xl px-6 py-5 flex items-start justify-between gap-4 hover:border-[#b08d57] hover:shadow-sm transition-all">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#b08d57] shrink-0" />
                      <span className="text-[#3f372e] text-sm leading-snug">{t(item.name, lang)}</span>
                    </div>
                    {item.price && (
                      <span className="text-[#b08d57] font-medium text-sm whitespace-nowrap shrink-0">
                        {item.price}
                      </span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-[#3f372e]">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <Reveal>
            <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
              {lang === "ru" ? "Индивидуальный план" : "Personal treatment plan"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-5">
              {lang === "ru" ? "Запишитесь на консультацию" : "Book a consultation"}
            </h2>
            <p className="text-[#c4b49a] mb-10 max-w-lg mx-auto leading-relaxed">
              {lang === "ru"
                ? "Врач подберёт оптимальные процедуры под ваши задачи и бюджет"
                : "Our doctor will select the best procedures for your goals and budget"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <A
                href={`/${lang}#contacts`}
                className="inline-flex rounded-full bg-[#b08d57] hover:bg-[#c9a45f] text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors"
              >
                {lang === "ru" ? "Записаться онлайн" : "Book online"}
              </A>
              <A
                href={`tel:+79191577727`}
                className="inline-flex rounded-full border border-[#b08d57] text-[#c9a96e] hover:bg-[#b08d57] hover:text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors"
              >
                {lang === "ru" ? "Позвонить" : "Call us"}
              </A>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
