import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import A from "@/components/A";
import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/lib/queries";

const CATEGORY_ORDER = ["injectable", "hardware", "therapeutic", "laser"];
const CATEGORY_TITLES = {
  injectable: { ru: "Инъекционная косметология", en: "Injectable cosmetology" },
  hardware: { ru: "Аппаратная косметология", en: "Hardware cosmetology" },
  therapeutic: { ru: "Терапевтическая косметология", en: "Therapeutic cosmetology" },
  laser: { ru: "Лазерная косметология и эпиляция", en: "Laser cosmetology & hair removal" },
};

function groupByCategory(services) {
  const groups = {};
  CATEGORY_ORDER.forEach((cat) => { groups[cat] = []; });
  services.forEach((svc) => {
    if (svc.category && groups[svc.category]) {
      groups[svc.category].push({ name: svc.title, price: svc.price });
    }
  });
  const result = CATEGORY_ORDER
    .filter((cat) => groups[cat].length > 0)
    .map((cat) => ({ title: CATEGORY_TITLES[cat], items: groups[cat] }));
  return result.length > 0 ? result : null;
}

async function getCategories() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    const services = await client.fetch(SERVICES_QUERY);
    return services?.length > 0 ? groupByCategory(services) : null;
  } catch {
    return null;
  }
}

const CATEGORY_ICONS = [
  <svg key="inj" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 2 4 4-14 14H4v-4L18 2z"/><path d="m14.5 5.5 4 4"/></svg>,
  <svg key="app" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  <svg key="ther" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="laser" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/></svg>,
];

export default async function ServicesPage({ params }) {
  const { lang } = await params;

  const sanityCategories = await getCategories();
  const categories = sanityCategories || site.serviceCategories;

  return (
    <>
      <section className="py-16 md:py-24 bg-[#f2ebe0]">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <Reveal>
            <p className="text-[#b08d57] tracking-[0.35em] uppercase text-xs mb-4">Valverde Clinic</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#3f372e] mb-5">
              {lang === "ru" ? "Все услуги" : "All services"}
            </h1>
            <p className="text-[#6b5f50] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {lang === "ru"
                ? "Полный спектр процедур инъекционной, аппаратной, терапевтической и лазерной косметологии"
                : "Full range of injectable, hardware, therapeutic and laser cosmetology procedures"}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8">
              {categories.map((cat, i) => (
                <a
                  key={i}
                  href={`#cat-${i}`}
                  className="px-3 md:px-4 py-2 rounded-full border border-[#d9c9af] text-xs tracking-widest uppercase text-[#6b5f50] hover:border-[#b08d57] hover:text-[#b08d57] transition-colors"
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
          className={`py-14 md:py-20 scroll-mt-24 ${ci % 2 === 1 ? "bg-[#f9f5ef]" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto px-5">
            <Reveal>
              <div className="flex items-center gap-4 mb-8 md:mb-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#f2ebe0] flex items-center justify-center text-[#b08d57] shrink-0">
                  {CATEGORY_ICONS[ci] || CATEGORY_ICONS[0]}
                </div>
                <h2 className="font-display text-2xl md:text-4xl text-[#3f372e]">
                  {t(cat.title, lang)}
                </h2>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {cat.items.map((item, ii) => (
                <Reveal key={ii} delay={ii * 40}>
                  <div className="bg-[#fdf9f4] border border-[#ede3d4] rounded-xl md:rounded-2xl px-5 py-4 flex items-start justify-between gap-4 hover:border-[#b08d57] hover:shadow-sm transition-all">
                    <div className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#b08d57] shrink-0" />
                      <span className="text-[#3f372e] text-sm leading-snug">{t(item.name, lang)}</span>
                    </div>
                    {item.price && (
                      <span className="text-[#b08d57] font-medium text-sm whitespace-nowrap shrink-0">{item.price}</span>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 md:py-20 bg-[#3f372e]">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <Reveal>
            <p className="text-[#c9a96e] tracking-[0.3em] uppercase text-xs mb-4">
              {lang === "ru" ? "Индивидуальный план" : "Personal treatment plan"}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-white mb-5">
              {lang === "ru" ? "Запишитесь на консультацию" : "Book a consultation"}
            </h2>
            <p className="text-[#c4b49a] mb-10 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
              {lang === "ru"
                ? "Врач подберёт оптимальные процедуры под ваши задачи и бюджет"
                : "Our doctor will select the best procedures for your goals and budget"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <A href={`/${lang}#contacts`} className="inline-flex justify-center rounded-full bg-[#b08d57] hover:bg-[#c9a45f] text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors">
                {lang === "ru" ? "Записаться онлайн" : "Book online"}
              </A>
              <A href="tel:+79191577727" className="inline-flex justify-center rounded-full border border-[#b08d57] text-[#c9a96e] hover:bg-[#b08d57] hover:text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors">
                {lang === "ru" ? "Позвонить" : "Call us"}
              </A>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
