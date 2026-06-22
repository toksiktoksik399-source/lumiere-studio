import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { t } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "en" }];
}

async function getSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const settings = await getSettings();
  const d = dict[lang] || dict.ru;
  const brand = t(settings?.title, lang) || "Cosmetology";

  const navItems = [
    { href: "#services", label: d.nav.services },
    { href: "#about", label: d.nav.about },
    { href: "#reviews", label: d.nav.reviews },
    { href: "#contacts", label: d.nav.contacts },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur bg-[#faf6f2]/80 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <Link href={`/${lang}`} className="font-display text-xl text-stone-800">
            {brand}
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-stone-600">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-rose-400 transition-colors">{item.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher lang={lang} />
            <a href="#contacts" className="hidden sm:inline-flex rounded-full bg-rose-300 hover:bg-rose-400 text-white px-5 py-2 text-sm transition-colors">{d.cta}</a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-stone-200 bg-[#f3ece6]">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm text-stone-600">
          <div>
            <div className="font-display text-lg text-stone-800 mb-1">{brand}</div>
            <div>{t(settings?.tagline, lang)}</div>
          </div>
          <div className="space-y-1">
            {settings?.phone && <div>{d.phone}: {settings.phone}</div>}
            {settings?.email && <div>{settings.email}</div>}
            {settings?.address && <div>{t(settings.address, lang)}</div>}
          </div>
        </div>
        <div className="text-center text-xs text-stone-400 pb-6">
          © {new Date().getFullYear()} {brand}. {d.rights}.
        </div>
      </footer>
    </div>
  );
}