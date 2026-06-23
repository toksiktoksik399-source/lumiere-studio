export const dynamic = 'force-dynamic';

import Link from "next/link";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import Carousel from "@/components/Carousel";
import ServicesTab from "@/components/ServicesTab";
import ContactForm from "@/components/ContactForm";
import { dict } from "@/lib/dictionaries";
import { client } from "@/sanity/lib/client";
import { TEAM_QUERY, TESTIMONIALS_QUERY, SERVICES_QUERY } from "@/lib/queries";

const CATS = ["injectable","hardware","therapeutic","laser","face","body","laser","care"];
const CAT_TITLES = {
  face: {ru:"Лицо",en:"Face"}, body: {ru:"Тело",en:"Body"},
  laser: {ru:"Лазер",en:"Laser"}, care: {ru:"Уход",en:"Care"},
};

async function fetchFromSanity() {
  const safe = async (q) => { try { return await client.fetch(q); } catch { return null; } };
  const [team, testimonials, services] = await Promise.all([
    safe(TEAM_QUERY), safe(TESTIMONIALS_QUERY), safe(SERVICES_QUERY),
  ]);
  return { team, testimonials, services };
}

// Feature icons
const ICONS = {
  bottle: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6v4l2 3v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V10l2-3V3z"/><line x1="9" y1="3" x2="9" y2="7"/><line x1="15" y1="3" x2="15" y2="7"/></svg>,
  diamond: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><line x1="2" y1="9" x2="22" y2="9"/></svg>,
  chair: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11h14v4H5zM3 15h18v2H3zM7 17v4M17 17v4M8 11V5a4 4 0 0 1 8 0v6"/></svg>,
  star: <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

export default async function HomePage({ params }) {
  const { lang } = await params;
  const d = dict[lang] || dict.ru;

  const { team: sanityTeam, testimonials: sanityReviews, services: sanityServices } = await fetchFromSanity();

  const teamMembers = sanityTeam?.length > 0 ? sanityTeam : site.team;
  const reviews     = sanityReviews?.length > 0 ? sanityReviews : site.testimonials;

  // Build services object for ServicesTab from Sanity or site.js
  let servicesObj = site.services;
  if (sanityServices?.length > 0) {
    servicesObj = { face: [], body: [], laser: [], care: [] };
    sanityServices.forEach(s => {
      const cat = s.category || "face";
      if (servicesObj[cat]) servicesObj[cat].push({ name: s.title, price: s.price });
    });
  }

  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative flex flex-col md:flex-row min-h-[100svh]">
        {/* Left: text */}
        <div className="order-2 md:order-1 md:w-[44%] lg:w-[40%] bg-[#f5ede8] flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 py-12 md:py-24 relative z-10">
          <Reveal>
            <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#b8976a] mb-5 md:mb-8">
              Студия красоты · Lumière
            </p>
            <h1 className="font-display font-light text-5xl sm:text-6xl md:text-6xl lg:text-8xl leading-[0.92] text-[#1a1714] mb-5 md:mb-8">
              {site.heroHeading.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <p className="text-[#6b5f50] text-sm mb-7 md:mb-10 max-w-xs leading-relaxed">
              {site.heroSubheading}
            </p>
            <Link
              href={`/${lang}#contacts`}
              className="inline-flex w-fit items-center gap-3 bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase px-6 md:px-8 py-3.5 md:py-4 transition-colors"
            >
              ЗАПИСАТЬСЯ ОНЛАЙН
            </Link>
            <div className="hidden sm:flex items-center gap-4 mt-10 md:mt-12 text-[10px] tracking-[0.35em] uppercase text-[#9a8878]">
              <span className="w-8 h-px bg-[#b8976a]" />
              ПРОКРУТИТЕ ВНИЗ
            </div>
          </Reveal>
        </div>

        {/* Right: hero image */}
        <div className="order-1 md:order-2 flex-1 relative overflow-hidden" style={{minHeight: "min(50vw, 320px)"}}>
          <img
            src={site.heroImage}
            alt="Lumière — студия красоты"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5ede8]/20 md:hidden" />
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────── */}
      <section className="bg-[#ede3da] border-y border-[#ddd3ca]">
        <div className="max-w-7xl mx-auto feature-grid grid grid-cols-2 md:grid-cols-4">
          {site.features.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="flex gap-3 md:gap-4 items-start px-4 sm:px-6 md:px-8 py-6 md:py-8">
                <div className="text-[#b8976a] shrink-0 mt-0.5 hidden sm:block">{ICONS[f.icon]}</div>
                <div>
                  <div className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#1a1714] font-medium mb-1 leading-tight">{f.title}</div>
                  <div className="text-xs text-[#9a8878] hidden sm:block">{f.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────── */}
      <section id="services" className="py-20 md:py-28 bg-[#f5ede8] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Что мы делаем</p>
            <h2 className="font-display font-light text-5xl md:text-6xl text-[#1a1714] mb-12">НАШИ УСЛУГИ</h2>
            <ServicesTab services={servicesObj} lang={lang} />
          </Reveal>

          {/* Right: staggered photos + info block */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="aspect-[2/3] overflow-hidden bg-[#ede3da] rounded-sm">
                <SmartImage src={site.clinicImages[0]} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-4 pt-10">
                <div className="aspect-[2/3] overflow-hidden bg-[#ede3da] rounded-sm">
                  <SmartImage src={site.clinicImages[1]} className="w-full h-full object-cover" />
                </div>
                <div className="bg-[#ede3da] p-5">
                  <h3 className="font-display text-xl text-[#1a1714] mb-2">О СТУДИИ</h3>
                  <p className="text-xs text-[#6b5f50] leading-relaxed mb-4">
                    Lumière — это место, где красота и наука встречаются.
                  </p>
                  <Link
                    href={`/${lang}/about`}
                    className="text-[10px] tracking-[0.35em] uppercase text-[#b8976a] hover:text-[#1a1714] transition-colors inline-flex items-center gap-2"
                  >
                    ПОДРОБНЕЕ <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#ede3da]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-3">Атмосфера</p>
                <h2 className="font-display font-light text-4xl md:text-5xl text-[#1a1714]">НАША СТУДИЯ</h2>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <Carousel>
              {site.gallery.map((url, i) => (
                <div key={i} className="snap-start shrink-0 w-[72vw] sm:w-64 md:w-72 lg:w-80 aspect-[3/4] overflow-hidden bg-[#ddd3ca] rounded-sm">
                  <SmartImage src={url} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ── TEAM PREVIEW ──────────────────────────────── */}
      <section id="team" className="py-20 md:py-28 bg-[#f5ede8] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-3">Кому вы доверяете</p>
                <h2 className="font-display font-light text-4xl md:text-5xl text-[#1a1714]">НАШИ МАСТЕРА</h2>
              </div>
              <Link
                href={`/${lang}/team`}
                className="text-[10px] tracking-[0.35em] uppercase text-[#b8976a] hover:text-[#1a1714] transition-colors inline-flex items-center gap-2"
              >
                ВСЕ МАСТЕРА <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {teamMembers.map((m, i) => (
              <Reveal key={m._id || i} delay={i * 80}>
                <div>
                  <div className="aspect-[3/4] bg-[#ede3da] overflow-hidden mb-4 rounded-sm">
                    <SmartImage src={m.photoUrl} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="font-display text-base md:text-lg text-[#1a1714]">{m.name}</p>
                  <p className="text-[10px] tracking-wider uppercase text-[#b8976a] mt-1">{typeof m.role === "object" ? m.role.ru : m.role}</p>
                  <p className="text-xs text-[#9a8878] mt-1">{typeof m.experience === "object" ? m.experience.ru : m.experience}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#1a1714]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Что говорят клиенты</p>
              <h2 className="font-display font-light text-4xl md:text-5xl text-white">ОТЗЫВЫ</h2>
            </div>
          </Reveal>
          <Reveal>
            <Carousel>
              {reviews.map((r, ri) => (
                <div key={r._id || ri} className="snap-start shrink-0 w-[85vw] sm:w-80 md:w-96 bg-[#221d19] border border-[#2d2520] p-8 flex flex-col">
                  <div className="text-[#b8976a] mb-4 text-sm tracking-widest">{"★".repeat(r.rating || 5)}</div>
                  <p className="text-[#c4b49a] text-sm leading-relaxed italic mb-6 flex-1">«{typeof r.text === "object" ? r.text.ru : r.text}»</p>
                  <div className="flex items-center gap-3 border-t border-[#2d2520] pt-5">
                    {r.photoUrl && (
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#3d3229] shrink-0">
                        <SmartImage src={r.photoUrl} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="text-white text-sm font-medium">{r.name}</div>
                  </div>
                </div>
              ))}
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#ede3da]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-5">Начните сейчас</p>
            <h2 className="font-display font-light text-4xl md:text-6xl text-[#1a1714] mb-6">
              ЗАПИШИТЕСЬ<br/>НА КОНСУЛЬТАЦИЮ
            </h2>
            <p className="text-[#6b5f50] text-sm mb-10 max-w-md mx-auto leading-relaxed">
              Мы подберём процедуры, которые подойдут именно вам. Первая консультация — бесплатно.
            </p>
            <Link
              href={`/${lang}#contacts`}
              className="inline-flex items-center gap-4 bg-[#1a1714] hover:bg-[#2d2520] text-white text-[10px] tracking-[0.4em] uppercase px-10 py-4 transition-colors"
            >
              ЗАПИСАТЬСЯ ОНЛАЙН
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACTS ──────────────────────────────────── */}
      <section id="contacts" className="py-20 md:py-28 bg-[#f5ede8] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Запишитесь сегодня</p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-[#1a1714] mb-10">КОНТАКТЫ</h2>
            <div className="space-y-5 text-sm text-[#3d3229]">
              <div>
                <div className="text-[10px] tracking-widest uppercase text-[#b8976a] mb-1">Телефон</div>
                <a href={`tel:${site.phone}`} className="hover:text-[#b8976a] transition-colors text-base">{site.phone}</a>
              </div>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-[#b8976a] mb-1">Адрес</div>
                <div>{site.address}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-[#b8976a] mb-1">Часы работы</div>
                <div className="text-[#6b5f50]">{site.workingHours}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-[#b8976a] mb-1">Email</div>
                <a href={`mailto:${site.email}`} className="hover:text-[#b8976a] transition-colors">{site.email}</a>
              </div>
            </div>
            <div className="flex gap-5 mt-8 text-[10px] tracking-widest uppercase text-[#6b5f50]">
              <a href={site.telegram} className="hover:text-[#b8976a] transition-colors">Telegram</a>
              <a href={site.instagram} className="hover:text-[#b8976a] transition-colors">Instagram</a>
              <a href={`https://wa.me/${site.whatsapp}`} className="hover:text-[#b8976a] transition-colors">WhatsApp</a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm labels={d.form} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
