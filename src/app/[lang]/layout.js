import Link from "next/link";
import { site } from "@/content/site";
import Intro from "@/components/Intro";
import MobileMenu from "@/components/MobileMenu";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  const navItems = [
    { href: `/${lang}/services`, label: "УСЛУГИ" },
    { href: `/${lang}/team`,     label: "МАСТЕРА" },
    { href: `/${lang}/about`,    label: "О НАС" },
    { href: `/${lang}#contacts`, label: "КОНТАКТЫ" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Intro />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#f5ede8]/95 backdrop-blur-sm border-b border-[#ddd3ca]">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-[70px] flex items-center justify-between gap-6">

          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            <Link href={`/${lang}/services`} className="text-[10px] tracking-[0.35em] uppercase text-[#6b5f50] hover:text-[#1a1714] transition-colors">УСЛУГИ</Link>
            <Link href={`/${lang}/team`}     className="text-[10px] tracking-[0.35em] uppercase text-[#6b5f50] hover:text-[#1a1714] transition-colors">МАСТЕРА</Link>
            <Link href={`/${lang}/about`}    className="text-[10px] tracking-[0.35em] uppercase text-[#6b5f50] hover:text-[#1a1714] transition-colors">САЛОНЫ</Link>
          </nav>

          {/* Logo — always returns to homepage */}
          <a href={`/${lang}`} className="text-center shrink-0 flex flex-col items-center hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <span className="text-[#b8976a] text-base font-light">—</span>
              <span className="font-display text-2xl md:text-3xl tracking-[0.35em] text-[#1a1714]">LUMIÈRE</span>
              <span className="text-[#b8976a] text-base font-light">—</span>
            </div>
            <div className="text-[9px] tracking-[0.45em] uppercase text-[#b8976a] -mt-0.5">студия красоты</div>
          </a>

          {/* Right nav + CTA */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            <Link href={`/${lang}/about`}    className="text-[10px] tracking-[0.35em] uppercase text-[#6b5f50] hover:text-[#1a1714] transition-colors">О НАС</Link>
            <Link href={`/${lang}#contacts`} className="text-[10px] tracking-[0.35em] uppercase text-[#6b5f50] hover:text-[#1a1714] transition-colors">КОНТАКТЫ</Link>
            <Link
              href={`/${lang}#contacts`}
              className="bg-[#c9a898] hover:bg-[#b8967a] text-white text-[10px] tracking-[0.35em] uppercase px-6 py-3 transition-colors"
            >
              ЗАПИСАТЬСЯ
            </Link>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center">
            <MobileMenu lang={lang} navItems={navItems} cta="ЗАПИСАТЬСЯ" />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#1a1714] text-[#9a8878]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-10 mb-12 pb-12 border-b border-[#2d2520]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#b8976a]">—</span>
                <span className="font-display text-2xl tracking-[0.3em] text-white">LUMIÈRE</span>
                <span className="text-[#b8976a]">—</span>
              </div>
              <p className="text-xs text-[#6b5f50] leading-relaxed">{site.tagline}</p>
            </div>
            <div className="space-y-2 text-xs">
              <div><a href={`tel:${site.phone}`} className="hover:text-white transition-colors">{site.phone}</a></div>
              <div><a href={`mailto:${site.email}`} className="hover:text-white transition-colors">{site.email}</a></div>
              <div className="pt-1 text-[#6b5f50]">{site.address}</div>
              <div className="text-[#6b5f50]">{site.workingHours}</div>
            </div>
            <div className="flex md:justify-end gap-6 text-xs items-start flex-wrap">
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors tracking-wider">TELEGRAM</a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors tracking-wider">INSTAGRAM</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-[10px] tracking-widest uppercase text-[#4a3f38]">
            <span>© LUMIÈRE {new Date().getFullYear()}. Все права защищены.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#9a8878] transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-[#9a8878] transition-colors">Публичная оферта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
