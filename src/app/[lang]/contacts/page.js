import { site } from "@/content/site";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { dict } from "@/lib/dictionaries";

export default async function ContactsPage({ params }) {
  const { lang } = await params;
  const d = dict[lang] || dict.ru;

  const INFO = [
    { label: "Адрес", value: site.address, href: site.mapUrl },
    { label: "Телефон", value: site.phone, href: `tel:${site.phone}` },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Часы работы", value: site.workingHours, href: null },
  ];

  const SOCIALS = [
    { label: "Telegram", href: site.telegram },
    { label: "Instagram", href: site.instagram },
    { label: "WhatsApp", href: `https://wa.me/${site.whatsapp}` },
  ];

  return (
    <>
      <section className="pt-16 md:pt-24 pb-10 bg-[#f5ede8]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-[10px] tracking-[0.45em] uppercase text-[#b8976a] mb-4">Мы рядом</p>
            <h1 className="font-display font-light text-5xl md:text-7xl text-[#1a1714]">КОНТАКТЫ</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f5ede8] pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <div>
            <Reveal>
              <div className="space-y-8 mb-12">
                {INFO.map((item) => (
                  <div key={item.label}>
                    <div className="text-[10px] tracking-[0.4em] uppercase text-[#b8976a] mb-2">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[#1a1714] text-sm hover:text-[#b8976a] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[#6b5f50] text-sm">{item.value}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-[#ddd3ca] pt-8">
                <div className="text-[10px] tracking-[0.4em] uppercase text-[#b8976a] mb-4">Социальные сети</div>
                <div className="flex gap-5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-widest uppercase text-[#6b5f50] hover:text-[#b8976a] transition-colors border-b border-[#ddd3ca] pb-0.5"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={100}>
            <div className="bg-white p-8 md:p-12">
              <h2 className="font-display text-2xl text-[#1a1714] mb-8">ЗАПИСАТЬСЯ ОНЛАЙН</h2>
              <ContactForm labels={d.form} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-[300px] md:h-[420px] bg-[#ede3da] overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-display text-3xl text-[#1a1714] mb-3">LUMIÈRE</div>
            <p className="text-sm text-[#6b5f50]">{site.address}</p>
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#b8976a] hover:text-[#1a1714] transition-colors"
            >
              ОТКРЫТЬ НА КАРТЕ
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
