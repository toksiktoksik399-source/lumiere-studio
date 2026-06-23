import Link from "next/link";
import { site } from "@/content/site";
import { t } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Intro from "@/components/Intro";
import A from "@/components/A";
import MobileMenu from "@/components/MobileMenu";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const settings = site.settings;
  const d = dict[lang] || dict.ru;
  const brand = t(settings?.title, lang) || "VALVERDE";
  const subtitle = lang === "ru" ? "клиника косметологии" : "cosmetology clinic";

  const navLeft = [
    { href: `/${lang}/services`, label: d.nav.services },
    { href: `/${lang}#procedures`, label: lang === "ru" ? "Процедуры" : "Procedures" },
    { href: `/${lang}#team`, label: lang === "ru" ? "Команда" : "Team" },
  ];
  const navRight = [
    { href: `/${lang}#about`, label: d.nav.about },
    { href: `/${lang}#contacts`, label: d.nav.contacts },
  ];
  const allNavItems = [...navLeft, ...navRight];

  return (
    <div className="min-h-screen flex flex-col">
      <Intro brand="VALVERDE" subtitle={subtitle} />

      <header className="sticky top-0 z-40 bg-[#f7f1e9]/90 backdrop-blur border-b border-[#e3d8c8]">
        <div className="max-w-6xl mx-auto px-5 h-16 md:h-20 flex items-center justify-between gap-4">
          <nav className="hidden lg:flex items-center gap-6 text-xs tracking-widest uppercase text-[#6b5f50] flex-1">
            {navLeft.map((i) => (
              <A key={i.href} href={i.href} className="hover:text-[#b08d57] transition-colors">{i.label}</A>
            ))}
          </nav>

          <Link href={`/${lang}`} className="text-center shrink-0">
            <div className="font-display text-xl md:text-3xl tracking-[0.25em] text-[#3f372e]">{brand}</div>
            <div className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#b08d57]">{subtitle}</div>
          </Link>

          <div className="hidden lg:flex items-center gap-5 flex-1 justify-end">
            {navRight.map((i) => (
              <A key={i.href} href={i.href} className="text-xs tracking-widest uppercase text-[#6b5f50] hover:text-[#b08d57] transition-colors">{i.label}</A>
            ))}
            <LanguageSwitcher lang={lang} />
            <A href={`/${lang}#contacts`} className="rounded-full bg-[#b08d57] hover:bg-[#9a7846] text-white px-5 py-2 text-xs tracking-widest uppercase transition-colors">{d.cta}</A>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher lang={lang} />
            <MobileMenu lang={lang} navItems={allNavItems} cta={d.cta} />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[#efe6d9] border-t border-[#e3d8c8]">
        <div className="max-w-6xl mx-auto px-5 py-10 md:py-12 grid md:grid-cols-3 gap-8 text-sm text-[#6b5f50]">
          <div>
            <div className="font-display text-2xl tracking-[0.2em] text-[#3f372e] mb-2">{brand}</div>
            <div>{t(settings?.tagline, lang)}</div>
          </div>
          <div className="space-y-1">
            {settings?.phone && <div><A href={`tel:${settings.phone}`} className="hover:text-[#b08d57]">{settings.phone}</A></div>}
            {settings?.email && <div>{settings.email}</div>}
            {settings?.address && <div>{t(settings.address, lang)}</div>}
            {settings?.workingHours && <div>{t(settings.workingHours, lang)}</div>}
          </div>
          <div className="flex md:justify-end gap-4 items-start flex-wrap">
            {settings?.telegram && <A href={settings.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-[#b08d57]">Telegram</A>}
            {settings?.vk && <A href={settings.vk} target="_blank" rel="noopener noreferrer" className="hover:text-[#b08d57]">ВКонтакте</A>}
          </div>
        </div>
        <div className="text-center text-xs text-[#a8997f] pb-6">© {new Date().getFullYear()} {brand}. {d.rights}.</div>
      </footer>
    </div>
  );
}
