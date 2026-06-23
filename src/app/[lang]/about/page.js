import Link from "next/link";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

export default async function AboutPage({ params }) {
  const { lang } = await params;

  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col md:flex-row min-h-[50vh]">
        <div className="md:w-[50%] bg-[#f5ede8] flex flex-col justify-center px-6 sm:px-12 md:px-20 py-16 md:py-24">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-5">Наша история</p>
            <h1 className="font-display font-light text-4xl sm:text-5xl md:text-7xl text-[#1a1714] leading-none mb-8">
              О<br/>СТУДИИ
            </h1>
            <div className="w-10 h-px bg-[#b8976a] mb-8" />
            <p className="text-[#6b5f50] text-sm leading-relaxed whitespace-pre-line">{site.aboutText}</p>
          </Reveal>
        </div>
        <div className="flex-1 relative overflow-hidden min-h-[260px] md:min-h-0">
          <SmartImage src={site.clinicImages[0]} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1a1714] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2d2520]">
            {site.aboutStats.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-[#1a1714] py-8 md:py-10 px-5 md:px-8 text-center">
                  <div className="font-display text-3xl md:text-5xl text-white mb-2">{s.n}</div>
                  <div className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#b8976a]">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-28 bg-[#f5ede8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Наши принципы</p>
            <h2 className="font-display font-light text-3xl md:text-6xl text-[#1a1714] mb-10 md:mb-16">ЦЕННОСТИ</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ddd3ca]">
            {[
              { n: "01", title: "Безопасность", text: "Только оригинальные препараты, сертифицированные в России. Аллерготест перед каждой процедурой." },
              { n: "02", title: "Профессионализм", text: "Наши мастера — врачи с медицинским образованием. Ежегодное обучение в Европе." },
              { n: "03", title: "Результат", text: "Мы не гонимся за количеством клиентов. Нас интересует ваш долгосрочный результат." },
              { n: "04", title: "Комфорт", text: "Студия спроектирована так, чтобы вы чувствовали себя как дома. Тишина, свет, аромат." },
              { n: "05", title: "Честность", text: "Мы назначаем только те процедуры, которые вам действительно нужны." },
              { n: "06", title: "Индивидуальность", text: "Каждый клиент уникален. Программа подбирается лично под ваши цели и особенности кожи." },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-[#f5ede8] p-7 md:p-10">
                  <div className="font-display text-4xl text-[#ddd3ca] mb-4">{v.n}</div>
                  <h3 className="font-display text-xl text-[#1a1714] mb-3">{v.title}</h3>
                  <p className="text-xs text-[#9a8878] leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery row */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-1">
        {site.gallery.slice(0, 3).map((url, i) => (
          <div key={i} className="aspect-[4/3] sm:aspect-square overflow-hidden">
            <SmartImage src={url} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#ede3da]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-[#1a1714] mb-8">
              ОТКРОЙТЕ КРАСОТУ<br/>ВМЕСТЕ С НАМИ
            </h2>
            <Link
              href={`/${lang}#contacts`}
              className="inline-flex items-center gap-4 bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.25em] sm:tracking-[0.4em] uppercase px-8 sm:px-10 py-4 transition-colors"
            >
              ЗАПИСАТЬСЯ
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
