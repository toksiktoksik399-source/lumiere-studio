const img = (id, w = 1100) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  settings: {
    title: { ru: "VALVERDE CLINIC", en: "VALVERDE CLINIC" },
    tagline: { ru: "Клиника косметологии и реабилитации", en: "Clinic of cosmetology & rehabilitation" },
    city: { ru: "Уфа", en: "Ufa" },
    phone: "+7 919 15 777 27",
    email: "info@valverdeclinic.ru",
    address: { ru: "Уфа, Коммунистическая улица, 105", en: "Ufa, Kommunisticheskaya St., 105" },
    workingHours: { ru: "Ежедневно с 9:00 до 21:00", en: "Daily 9:00–21:00" },
    whatsapp: "79191577727",
    telegram: "https://t.me/Dr_Miftakhova",
    vk: "https://vk.com/valverde_clinic",
    mapUrl: "https://yandex.ru/maps/org/valverde_clinic/26329607108/",
    heroHeading: { ru: "Искусство вашей красоты", en: "The art of your beauty" },
    heroSubheading: { ru: "Премиальная косметология и реабилитация в Уфе. Внимание к деталям и оборудование, которому нет аналогов в городе.", en: "Premium cosmetology and rehabilitation in Ufa. Attention to detail and equipment with no analogues in the city." },
    heroImageUrl: img("1616683693504-3ea7e9ad6fec", 1200),
    aboutHeading: { ru: "О клинике", en: "About the clinic" },
    aboutText: { ru: "Мы оказываем все виды врачебной и эстетической косметологии для лица и тела. Работаем более 10 лет и недавно переехали в новую клинику с уютным интерьером и современным оборудованием. Только сертифицированные специалисты и оригинальные препараты.", en: "We provide all types of medical and aesthetic cosmetology for face and body. We have worked for over 10 years and recently moved to a new clinic with a cosy interior and modern equipment. Only certified specialists and original products." },
    aboutImageUrl: img("1629909613654-28e377c37b09", 1000),
  },
  features: [
    { ru: "Премиальная косметология", en: "Premium cosmetology", sub: { ru: "Только проверенные методики", en: "Only proven techniques" } },
    { ru: "Опытные врачи", en: "Experienced doctors", sub: { ru: "Сертифицированные специалисты", en: "Certified specialists" } },
    { ru: "Современное оборудование", en: "Modern equipment", sub: { ru: "Аналогов нет в Уфе", en: "Unmatched in Ufa" } },
    { ru: "Индивидуальный подход", en: "Personal approach", sub: { ru: "Забота о каждом клиенте", en: "Care for every client" } },
  ],
  serviceCategories: [
    { title: { ru: "Инъекционная косметология", en: "Injectable cosmetology" }, items: [
      { name: { ru: "Ботулотоксины (Dysport, Xeomin)", en: "Botulinum toxins (Dysport, Xeomin)" } },
      { name: { ru: "Филлеры и контурная пластика", en: "Fillers and contouring" } },
      { name: { ru: "Мезотерапия и скин-бустеры", en: "Mesotherapy and skin boosters" } },
      { name: { ru: "Биорепаранты и плазмотерапия", en: "Biorepairants and plasma therapy" } },
    ] },
    { title: { ru: "Аппаратная косметология", en: "Hardware cosmetology" }, items: [
      { name: { ru: "Фотоомоложение Lumenis M22", en: "Lumenis M22 photorejuvenation" }, price: "от 4 500 ₽" },
      { name: { ru: "RF-лифтинг Morpheus 8", en: "Morpheus 8 RF lifting" }, price: "от 39 000 ₽" },
      { name: { ru: "Лазерная шлифовка Candela CO2", en: "Candela CO2 laser resurfacing" } },
      { name: { ru: "LDM-терапия для лица и тела", en: "LDM therapy for face and body" } },
    ] },
    { title: { ru: "Терапевтическая косметология", en: "Therapeutic cosmetology" }, items: [
      { name: { ru: "Чистка лица DMK / IMAGE", en: "DMK / IMAGE facial cleansing" } },
      { name: { ru: "Пилинги", en: "Peels" } },
      { name: { ru: "Ультразвуковая чистка", en: "Ultrasonic cleansing" } },
      { name: { ru: "Лимфодренажный массаж лица", en: "Lymphatic facial massage" } },
    ] },
    { title: { ru: "Лазерная косметология и эпиляция", en: "Laser cosmetology & hair removal" }, items: [
      { name: { ru: "Лазерная эпиляция (Magic One)", en: "Laser hair removal (Magic One)" }, price: "от 1 690 ₽" },
      { name: { ru: "Удаление новообразований", en: "Removal of skin lesions" } },
      { name: { ru: "Интимное омоложение", en: "Intimate rejuvenation" } },
    ] },
    { title: { ru: "Кислородотерапия", en: "Oxygen therapy" }, items: [
      { name: { ru: "Барокамера BaroOx 1.0", en: "BaroOx 1.0 hyperbaric chamber" }, price: "от 2 500 ₽" },
    ] },
  ],
  topProcedures: [
    { _id: "t1", title: { ru: "Фотоомоложение Lumenis M22", en: "Lumenis M22 photorejuvenation" }, description: { ru: "Идеальный тон кожи без боли и реабилитации за одну процедуру.", en: "Perfect skin tone without pain or downtime in one session." }, imageUrl: img("1598440947619-2c35fc9aa908"), priceLines: [
      { label: { ru: "Лицо + крылья носа", en: "Face + nose wings" }, price: "13 800 ₽" },
      { label: { ru: "Щёки", en: "Cheeks" }, price: "8 500 ₽" },
      { label: { ru: "Лицо + декольте", en: "Face + décolleté" }, price: "23 000 ₽" },
    ] },
    { _id: "t2", title: { ru: "Лифтинг Morpheus 8", en: "Morpheus 8 lifting" }, description: { ru: "Безоперационная подтяжка лица. Результат после первой процедуры.", en: "Non-surgical facial tightening. Results after the first session." }, imageUrl: img("1570172619644-dfd03ed5d881"), priceLines: [
      { label: { ru: "Лицо + шея + декольте", en: "Face + neck + décolleté" }, price: "39 000 ₽" },
      { label: { ru: "Живот + бёдра", en: "Abdomen + thighs" }, price: "42 000 ₽" },
    ] },
    { _id: "t3", title: { ru: "Барокамера BaroOx 1.0", en: "BaroOx 1.0 chamber" }, description: { ru: "Гипербарическая оксигенация и омоложение на клеточном уровне.", en: "Hyperbaric oxygenation and cellular-level rejuvenation." }, imageUrl: img("1512290923902-8a9f81dc236c"), priceLines: [
      { label: { ru: "1 сеанс", en: "1 session" }, price: "2 500 ₽" },
      { label: { ru: "5 сеансов", en: "5 sessions" }, price: "11 250 ₽" },
      { label: { ru: "10 сеансов", en: "10 sessions" }, price: "22 500 ₽" },
    ] },
  ],
  gallery: [
    img("1556228578-8c89e6adf883", 800), img("1512496015851-a90fb38ba796", 800), img("1583001931096-959e9a1a6223", 800),
    img("1616394584738-fc6e612e71b9", 800), img("1570172619644-dfd03ed5d881", 800), img("1629909613654-28e377c37b09", 800),
  ],
  team: [
    { _id: "m1", name: "Мифтахова Лия Даниловна", role: { ru: "Ведущий врач-косметолог, тренер SNA Beauty", en: "Lead cosmetologist, SNA Beauty trainer" }, experience: { ru: "Стаж 13 лет", en: "13 years" }, photoUrl: img("1573496359142-b8d87734a5a2", 600) },
    { _id: "m2", name: "Абубакирова Ирина Алексеевна", role: { ru: "Косметик-эстетист", en: "Aesthetician" }, experience: { ru: "Стаж 8 лет", en: "8 years" }, photoUrl: img("1494790108377-be9c29b29330", 600) },
    { _id: "m3", name: "Шилова Марина Александровна", role: { ru: "Косметик-эстетик", en: "Aesthetician" }, experience: { ru: "Стаж 3 года", en: "3 years" }, photoUrl: img("1438761681033-6461ffad8d80", 600) },
    { _id: "m4", name: "Байкова Лилия Амировна", role: { ru: "Врач-терапевт, гипербарическая оксигенация", en: "Therapist, hyperbaric oxygenation" }, experience: { ru: "Стаж 15 лет", en: "15 years" }, photoUrl: img("1544005313-94ddf0286df2", 600) },
  ],
  testimonials: [
    { _id: "r1", name: "Мария", text: { ru: "Прекрасная клиника и внимательные врачи. Результат превзошёл ожидания!", en: "A wonderful clinic and attentive doctors. The result exceeded my expectations!" }, rating: 5 },
    { _id: "r2", name: "Ольга", text: { ru: "Делала фотоомоложение M22 — кожа сияет. Спасибо команде Valverde!", en: "I had M22 photorejuvenation — my skin is glowing. Thanks to the Valverde team!" }, rating: 5 },
    { _id: "r3", name: "Анастасия", text: { ru: "Очень довольна Morpheus 8 — лицо подтянулось, выгляжу свежее.", en: "Very happy with Morpheus 8 — my face is tighter and I look fresher." }, rating: 5 },
    { _id: "r4", name: "Гульнара", text: { ru: "Уютная атмосфера и профессиональный подход. Рекомендую!", en: "Cosy atmosphere and a professional approach. Highly recommend!" }, rating: 5 },
  ],
};