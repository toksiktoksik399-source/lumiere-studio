import Link from "next/link";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

export default async function TeamPage({ params }) {
  const { lang } = await params;

  return (
    <>
      <section className="pt-16 md:pt-24 pb-14 md:pb-20 bg-[#f5ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Lumière Studio</p>
            <h1 className="font-display font-light text-5xl md:text-7xl text-[#1a1714] mb-6">НАШИ МАСТЕРА</h1>
            <p className="text-[#6b5f50] text-sm max-w-xl leading-relaxed">
              Команда сертифицированных специалистов с опытом от 5 лет. Постоянное обучение, авторские техники.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-px bg-[#ede3da]">
            {site.team.map((m, i) => (
              <Reveal key={m._id} delay={i * 80}>
                <div className="bg-white p-8 md:p-12 flex flex-col sm:flex-row gap-8">
                  <div className="w-40 sm:w-44 aspect-[3/4] shrink-0 overflow-hidden bg-[#ede3da] rounded-sm">
                    <SmartImage src={m.photoUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8976a] mb-3">{m.role}</p>
                    <h2 className="font-display text-2xl md:text-3xl text-[#1a1714] mb-2">{m.name}</h2>
                    <p className="text-xs text-[#b8976a] mb-4 tracking-wider">{m.experience}</p>
                    <div className="w-8 h-px bg-[#ddd3ca] mb-5" />
                    <p className="text-xs text-[#9a8878] leading-relaxed mb-3">
                      <span className="text-[#6b5f50] font-medium">Специализация:</span> {m.spec}
                    </p>
                    <p className="text-xs text-[#9a8878] leading-relaxed">{m.bio}</p>
                    <Link
                      href={`/${lang}#contacts`}
                      className="mt-6 inline-flex w-fit items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-[#b8976a] hover:text-[#1a1714] transition-colors"
                    >
                      ЗАПИСАТЬСЯ
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#ede3da]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-5">Доверьтесь профессионалам</p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-[#1a1714] mb-10">ЗАПИШИТЕСЬ К МАСТЕРУ</h2>
            <Link
              href={`/${lang}#contacts`}
              className="inline-flex items-center gap-4 bg-[#1a1714] hover:bg-[#2d2520] text-white text-[10px] tracking-[0.4em] uppercase px-10 py-4 transition-colors"
            >
              ЗАПИСАТЬСЯ ОНЛАЙН
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
