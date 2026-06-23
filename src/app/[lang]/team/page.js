import Link from "next/link";
import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

export default async function TeamPage({ params }) {
  const { lang } = await params;

  return (
    <>
      <section className="pt-14 md:pt-20 pb-10 md:pb-14 bg-[#f5ede8]">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-3">Lumière Studio</p>
            <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-[#1a1714] mb-4">НАШИ МАСТЕРА</h1>
            <p className="text-[#6b5f50] text-sm max-w-md leading-relaxed">
              Сертифицированные специалисты с опытом от 5 лет. Постоянное обучение, авторские техники.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team cards — portrait layout, 2 columns on tablet+ */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {site.team.map((m, i) => (
              <Reveal key={m._id} delay={i * 70}>
                <div className="border border-[#ede3da] bg-white flex flex-col">
                  {/* Portrait photo */}
                  <div className="aspect-[4/3] overflow-hidden bg-[#ede3da] w-full">
                    <SmartImage src={m.photoUrl} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                  </div>
                  {/* Info */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8976a] mb-2">{m.role}</p>
                    <h2 className="font-display text-xl md:text-2xl text-[#1a1714] mb-1">{m.name}</h2>
                    <p className="text-xs text-[#b8976a] mb-4 tracking-wider">{m.experience}</p>
                    <div className="w-6 h-px bg-[#ddd3ca] mb-4" />
                    <p className="text-xs text-[#9a8878] leading-relaxed mb-2 flex-1">
                      <span className="text-[#6b5f50]">Специализация: </span>{m.spec}
                    </p>
                    <p className="text-xs text-[#9a8878] leading-relaxed mb-5">{m.bio}</p>
                    <Link
                      href={`/${lang}#contacts`}
                      className="inline-flex w-fit items-center gap-2 text-[10px] tracking-[0.35em] uppercase bg-[#c9a898] hover:bg-[#b8967a] text-white px-5 py-2.5 transition-colors"
                    >
                      ЗАПИСАТЬСЯ
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#ede3da]">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Доверьтесь профессионалам</p>
            <h2 className="font-display font-light text-3xl md:text-5xl text-[#1a1714] mb-8">ЗАПИШИТЕСЬ К МАСТЕРУ</h2>
            <Link
              href={`/${lang}#contacts`}
              className="inline-flex items-center gap-4 bg-[#1a1714] hover:bg-[#2d2520] text-white text-[10px] tracking-[0.4em] uppercase px-8 py-4 transition-colors"
            >
              ЗАПИСАТЬСЯ ОНЛАЙН
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
