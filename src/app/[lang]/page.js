import ContactForm from "@/components/ContactForm";
import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import A from "@/components/A";
import Carousel from "@/components/Carousel";
import ServicesAccordion from "@/components/ServicesAccordion";
import HeroCarousel from "@/components/HeroCarousel";
import { client } from "@/sanity/lib/client";
import {
  SETTINGS_QUERY,
  PROCEDURES_QUERY,
  TEAM_QUERY,
  TESTIMONIALS_QUERY,
  SERVICES_QUERY,
} from "@/lib/queries";

const ICON_PATHS = [
  "M9 5h6v3H9zM8 8h8l-1 12H9z",
  "M12 2 20 9 12 22 4 9Z",
  "M5 11h14v7H5zM7 11V8a5 5 0 0 1 10 0v3",
  "M12 2l2.2 6.3L21 9l-5 4 1.8 7L12 16.8 6.2 20 8 13 3 9l6.8-.7Z",
];

const CATEGORY_ORDER = ["injectable", "hardware", "therapeutic", "laser"];
const CATEGORY_TITLES = {
  injectable: { ru: "Инъекционная косметология", en: "Injectable cosmetology" },
  hardware: { ru: "Аппаратная косметология", en: "Hardware cosmetology" },
  therapeutic: { ru: "Терапевтическая косметология", en: "Therapeutic cosmetology" },
  laser: { ru: "Лазерная косметология и эпиляция", en: "Laser cosmetology & hair removal" },
};

function groupServicesByCategory(services) {
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

async function fetchAll() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return {};
  try {
    const [sanitySettings, procedures, team, testimonials, services] = await Promise.all([
      client.fetch(SETTINGS_QUERY),
      client.fetch(PROCEDURES_QUERY),
      client.fetch(TEAM_QUERY),
      client.fetch(TESTIMONIALS_QUERY),
      client.fetch(SERVICES_QUERY),
    ]);
    return { sanitySettings, procedures, team, testimonials, services };
  } catch {
    return {};
  }
}

function mergeSettings(sanitySettings) {
  if (!sanitySettings) return site.settings;
  const s = { ...site.settings };
  const strFields = ["phone", "email", "whatsapp", "telegram", "vk", "mapUrl", "bookingUrl"];
  strFields.forEach((f) => { if (sanitySettings[f]) s[f] = sanitySettings[f]; });
  const locFields = ["title", "tagline", "city", "address", "workingHours", "heroHeading", "heroSubheading", "aboutHeading", "aboutText"];
  locFields.forEach((f) => { if (sanitySettings[f]?.ru || sanitySettings[f]?.en) s[f] = sanitySettings[f]; });
  if (sanitySettings.heroImageUrl) s.heroImageUrl = sanitySettings.heroImageUrl;
  if (sanitySettings.aboutImageUrl) s.aboutImageUrl = sanitySettings.aboutImageUrl;
  return s;
}

function FeatureIcon({ i }) {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#b08d57" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
      <path d={ICON_PATHS[i % 4]} />
    </svg>
  );
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const d = dict[lang] || dict.ru;

  const { sanitySettings, procedures, team, testimonials, services } = await fetchAll();

  const s = mergeSettings(sanitySettings);
  const waNumber = (s.whatsapp || "").replace(/[^0-9]/g, "");

  const heroImages =
    sanitySettings?.heroImages?.filter(Boolean).length > 0
      ? sanitySettings.heroImages.filter(Boolean)
      : site.heroImages;

  const gallery =
    sanitySettings?.galleryImages?.filter(Boolean).length > 0
      ? sanitySettings.galleryImages.filter(Boolean)
      : site.gallery;

  const topProcedures = procedures?.length > 0 ? procedures : site.topProcedures;
  const teamMembers = team?.length > 0 ? team : site.team;
  const reviews = testimonials?.length > 0 ? testimonials : site.testimonials;
  const serviceCategories =
    (services?.length > 0 && groupServicesByCategory(services)) || site.serviceCategories;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-8 md:gap-10 items-center pt-10 pb-12 md:pt-16 md:pb-24">
          <Reveal>
            <p className="text-[#b08d57] tracking-[0.35em] uppercase text-xs mb-5">{t(s.tagline, lang)}</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[1.02] text-[#3f372e] mb-4 md:mb-6">{t(s.heroHeading, lang)}</h1>
            <p className="text-[#6b5f50] text-base md:text-lg mb-6 md:mb-8 max-w-md leading-relaxed">{t(s.heroSubheading, lang)}</p>
            <A href={`/${lang}#contacts`} className="inline-flex rounded-full bg-[#b08d57] hover:bg-[#9a7846] text-white px-8 py-4 text-sm tracking-widest uppercase transition-colors">{lang === "ru" ? "Записаться онлайн" : "Book online"}</A>
            <A href={`/${lang}/services`} className="mt-10 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#8a7c69] hover:text-[#b08d57]">
              <span className="w-8 h-px bg-[#b08d57]" />
              {lang === "ru" ? "Все услуги" : "All services"}
            </A>
          </Reveal>
          <Reveal delay={150}>
            <div className="relative aspect-[4/5] max-h-[60vw] md:max-h-none rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#efe2d2] to-[#e7d3bd] shadow-xl">
              <HeroCarousel images={heroImages} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#e3d8c8] bg-[#f2ebe0]">
        <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {site.features.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex items-start gap-4">
                <FeatureIcon i={i} />
                <div>
                  <div className="font-display text-base text-[#3f372e] uppercase tracking-wide">{f[lang]}</div>
                  <div className="text-sm text-[#8a7c69]">{f.sub[lang]}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-start">
          <Reveal>
            <p className="text-[#b08d57] tracking-[0.3em] uppercase text-xs mb-3">{lang === "ru" ? "Что мы делаем" : "What we do"}</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#3f372e] mb-8">{lang === "ru" ? "Наши услуги" : "Our services"}</h2>
            <ServicesAccordion categories={serviceCategories} lang={lang} />
            <A href={`/${lang}/services`} className="inline-flex mt-8 rounded-full bg-[#b08d57] hover:bg-[#9a7846] text-white px-7 py-3 text-sm tracking-widest uppercase">{lang === "ru" ? "Все услуги" : "All services"}</A>
          </Reveal>
          <Reveal delay={150}>
            <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#e7d3bd] to-[#efe2d2] shadow-lg md:sticky md:top-24">
              <SmartImage src={gallery[1] || gallery[0]} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="procedures" className="py-16 md:py-24 bg-[#f2ebe0] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[#b08d57] tracking-[0.3em] uppercase text-xs mb-3">{lang === "ru" ? "Хиты клиники" : "Clinic favourites"}</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#3f372e]">{lang === "ru" ? "ТОП-процедуры" : "Top procedures"}</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-7">
            {topProcedures.map((p, i) => (
              <Reveal key={p._id} delay={i * 120}>
                <div className="h-full bg-white rounded-3xl overflow-hidden border border-[#e9ddca] flex flex-col">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#efe2d2] to-[#e7d3bd] overflow-hidden">
                    <SmartImage src={p.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-[#3f372e] mb-2">{t(p.title, lang)}</h3>
                    <p className="text-[#8a7c69] text-sm mb-5 leading-relaxed">{t(p.description, lang)}</p>
                    <div className="mt-auto space-y-2 border-t border-[#efe6d9] pt-4">
                      {(p.priceLines || []).map((pl, j) => (
                        <div key={j} className="flex justify-between gap-3 text-sm">
                          <span className="text-[#6b5f50]">{t(pl.label, lang)}</span>
                          <span className="text-[#b08d57] font-medium whitespace-nowrap">{pl.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#b08d57] tracking-[0.3em] uppercase text-xs mb-3">{lang === "ru" ? "Атмосфера" : "Atmosphere"}</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#3f372e]">{lang === "ru" ? "Атмосфера клиники" : "Clinic atmosphere"}</h2>
            </div>
          </Reveal>
          <Reveal>
            <Carousel>
              {gallery.map((url, i) => (
                <div key={i} className="snap-start shrink-0 w-[72vw] sm:w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#efe2d2] to-[#e7d3bd]">
                  <SmartImage src={url} className="w-full h-full object-cover" />
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-[#f2ebe0] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#e7d3bd] to-[#efe2d2] shadow-lg">
              <SmartImage src={s.aboutImageUrl} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[#b08d57] tracking-[0.3em] uppercase text-xs mb-3">{t(s.city, lang)}</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#3f372e] mb-6">{t(s.aboutHeading, lang)}</h2>
            <p className="text-[#6b5f50] leading-relaxed whitespace-pre-line">{t(s.aboutText, lang)}</p>
          </Reveal>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[#b08d57] tracking-[0.3em] uppercase text-xs mb-3">{lang === "ru" ? "Кому вы доверяете" : "Who you trust"}</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#3f372e]">{lang === "ru" ? "Наши мастера" : "Our specialists"}</h2>
            </div>
          </Reveal>
          <Reveal>
            <Carousel>
              {teamMembers.map((m) => (
                <div key={m._id} className="snap-start shrink-0 w-48 sm:w-60 text-center">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#e7d3bd] to-[#d8bfa0]">
                    <SmartImage src={m.photoUrl} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg text-[#3f372e]">{m.name}</h3>
                  <p className="text-sm text-[#8a7c69]">{t(m.role, lang)}</p>
                  <p className="text-xs text-[#b08d57] mt-1">{t(m.experience, lang)}</p>
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      <section id="reviews" className="py-16 md:py-24 bg-[#f2ebe0] scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-[#3f372e] mb-12 text-center">{d.reviewsTitle}</h2>
          </Reveal>
          <Reveal>
            <Carousel>
              {reviews.map((r) => (
                <div key={r._id} className="snap-start shrink-0 w-[85vw] sm:w-80 md:w-96 bg-white border border-[#e9ddca] rounded-2xl p-6 md:p-8 flex flex-col">
                  <div className="text-[#b08d57] mb-3">{"★".repeat(r.rating || 5)}</div>
                  <p className="text-[#6b5f50] italic mb-6 leading-relaxed flex-1">«{t(r.text, lang)}»</p>
                  <div className="flex items-center gap-3 border-t border-[#efe6d9] pt-5">
                    {r.photoUrl && (
                      <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-[#e7d3bd] to-[#d8bfa0] shrink-0">
                        <SmartImage src={r.photoUrl} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="font-medium text-[#3f372e]">{r.name}</div>
                  </div>
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12">
          <Reveal>
            <p className="text-[#b08d57] tracking-[0.3em] uppercase text-xs mb-3">{lang === "ru" ? "Запишитесь сегодня" : "Book today"}</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#3f372e] mb-6">{d.contactsTitle}</h2>
            <p className="text-[#6b5f50] mb-8">{d.contactsSubtitle}</p>
            <div className="space-y-3 text-[#4a4036]">
              <div className="text-xl"><A href={`tel:${s.phone}`} className="hover:text-[#b08d57]">{s.phone}</A></div>
              <div>{t(s.address, lang)}</div>
              <div className="text-[#8a7c69]">{t(s.workingHours, lang)}</div>
              <div className="text-[#8a7c69]">{s.email}</div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 text-sm text-[#6b5f50]">
              {s.telegram && <A href={s.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-[#b08d57]">Telegram</A>}
              {s.vk && <A href={s.vk} target="_blank" rel="noopener noreferrer" className="hover:text-[#b08d57]">ВКонтакте</A>}
              {waNumber && <A href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#b08d57]">WhatsApp</A>}
              {s.mapUrl && <A href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#b08d57]">{lang === "ru" ? "На карте" : "On map"}</A>}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <ContactForm labels={d.form} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
