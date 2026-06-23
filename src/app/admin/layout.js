import Link from "next/link";

const NAV = [
  { href: "/admin", label: "Главная" },
  { href: "/admin/masters", label: "Мастера" },
  { href: "/admin/reviews", label: "Отзывы" },
  { href: "/admin/services", label: "Услуги" },
];

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f5ede8]">
      <header className="bg-[#1a1714] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg tracking-[0.3em] text-white shrink-0">LUMIÈRE</span>
            <nav className="hidden sm:flex items-center gap-1">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href}
                  className="text-[10px] tracking-widest uppercase text-[#9a8878] hover:text-white hover:bg-white/10 px-3 py-2 transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/ru" className="text-[#6b5f50] hover:text-white text-[10px] tracking-widest uppercase transition-colors shrink-0">
            ← Сайт
          </Link>
        </div>
        {/* Mobile nav */}
        <nav className="sm:hidden flex border-t border-[#2d2520] overflow-x-auto">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}
              className="flex-1 text-center text-[10px] tracking-widest uppercase text-[#9a8878] hover:text-white py-2.5 whitespace-nowrap px-2">
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
