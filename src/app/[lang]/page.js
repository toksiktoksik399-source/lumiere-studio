import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { t } from "@/lib/i18n";
import { dict } from "@/lib/dictionaries";
import ContactForm from "@/components/ContactForm";

async function getData() {
  const [settings, services, testimonials] = await Promise.all([
    client.fetch(`*[_type == "siteSettings"][0]`),
    client.fetch(`*[_type == "service"] | order(order asc)`),
    client.fetch(`*[_type == "testimonial"]`),
  ]);
  return { settings, services, testimonials };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const { settings, services, testimonials } = await getData();
  const d = dict[lang] || dict.ru;
  const waNumber = settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, "") : "";

  return (
    <>
      <section className="overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-rose-400 tracking-wide uppercase text-sm mb-4">
              {t(settings?.tagline, lang)}
            </p>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-stone-800 mb-6">
              {t(settings?.heroHeading, lang)}
            </h1>
            <p className="text-stone-600 text-lg mb-8 max-w-md">
              {t(settings?.heroSubheading, lang)}
            </p>
            <a href="#contacts" className="inline-flex rounded-full bg-rose-300 hover:bg-rose-400 text-white px-7 py-3 transition-colors">
              {d.cta}
            </a>
          </div>
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-rose-100 to-amber-100 shadow-sm">
            {settings?.heroImage && (
              <img src={urlFor(settings.heroImage).width(800).height(1000).url()} alt="" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#f3ece6]/50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-3">{d.servicesTitle}</h2>
            <p className="text-stone-500">{d.servicesSubtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service) => (
              <div key={service._id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video rounded-xl mb-5 overflow-hidden bg-gradient-to-br from-rose-100 to-amber-100">
                  {service.image && (
                    <img src={urlFor(service.image).width(500).height(280).url()} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <h3 className="font-display text-xl text-stone-800 mb-2">{t(service.title, lang)}</h3>
                <p className="text-stone-500 text-sm mb-4">{t(service.description, lang)}</p>
                {service.price && <div className="text-rose-400 font-medium">{service.price}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-amber-100 to-rose-100 shadow-sm">
            {settings?.aboutPhoto && (
              <img src={urlFor(settings.aboutPhoto).width(800).height(1000).url()} alt="" className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-5">{t(settings?.aboutHeading, lang)}</h2>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">{t(settings?.aboutText, lang)}</p>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-[#f3ece6]/50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-12 text-center">{d.reviewsTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials?.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl p-7 shadow-sm">
                <div className="text-rose-300 mb-3">{"★".repeat(item.rating || 5)}</div>
                <p className="text-stone-600 italic mb-4">«{t(item.text, lang)}»</p>
                <div className="font-medium text-stone-800">— {item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 scroll-mt-16">
        <div className="max-w-xl mx-auto px-5 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-3">{d.contactsTitle}</h2>
          <p className="text-stone-500 mb-10">{d.contactsSubtitle}</p>

          <ContactForm labels={d.form} />

          <div className="mt-10 space-y-2 text-stone-700">
            {settings?.phone && (
              <div className="text-lg"><a href={`tel:${settings.phone}`} className="hover:text-rose-400">{settings.phone}</a></div>
            )}
            {settings?.address && <div className="text-stone-500">{t(settings.address, lang)}</div>}
          </div>

          {settings?.whatsapp && (
            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex mt-6 rounded-full bg-rose-300 hover:bg-rose-400 text-white px-7 py-3 transition-colors">
              {d.writeWhatsapp}
            </a>
          )}
        </div>
      </section>
    </>
  );
}