import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  groups: [
    {name: 'main', title: 'Основное', default: true},
    {name: 'contacts', title: 'Контакты и соцсети'},
    {name: 'hero', title: 'Главный экран'},
    {name: 'about', title: 'О клинике'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Название клиники',
      type: 'localeString',
      group: 'main',
      description: 'Отображается в шапке и в браузере',
    }),
    defineField({
      name: 'tagline',
      title: 'Слоган',
      type: 'localeString',
      group: 'main',
      description: 'Краткое описание под логотипом и в подвале',
    }),
    defineField({
      name: 'city',
      title: 'Город',
      type: 'localeString',
      group: 'main',
    }),

    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
      group: 'contacts',
      description: 'Формат: +7 919 15 777 27',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contacts',
    }),
    defineField({
      name: 'address',
      title: 'Адрес',
      type: 'localeString',
      group: 'contacts',
    }),
    defineField({
      name: 'workingHours',
      title: 'Часы работы',
      type: 'localeString',
      group: 'contacts',
      description: 'Например: Ежедневно с 9:00 до 21:00',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp (только цифры)',
      type: 'string',
      group: 'contacts',
      description: 'Например: 79191577727 (без плюса и пробелов)',
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram (ссылка)',
      type: 'url',
      group: 'contacts',
      description: 'Например: https://t.me/Dr_Miftakhova',
    }),
    defineField({
      name: 'vk',
      title: 'ВКонтакте (ссылка)',
      type: 'url',
      group: 'contacts',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Ссылка онлайн-записи',
      type: 'url',
      group: 'contacts',
      description: 'Необязательно — если подключена система записи',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Ссылка на карту',
      type: 'url',
      group: 'contacts',
      description: 'Ссылка на Яндекс.Карты или 2ГИС',
    }),

    defineField({
      name: 'heroHeading',
      title: 'Главный заголовок',
      type: 'localeString',
      group: 'hero',
      description: 'Большой текст на первом экране сайта',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Подзаголовок',
      type: 'localeText',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Фото главного экрана',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
      description: 'Рекомендуется соотношение сторон 4:5 (портретное)',
    }),

    defineField({
      name: 'aboutHeading',
      title: 'Заголовок раздела «О нас»',
      type: 'localeString',
      group: 'about',
    }),
    defineField({
      name: 'aboutText',
      title: 'Текст о клинике',
      type: 'localeText',
      group: 'about',
    }),
    defineField({
      name: 'aboutPhoto',
      title: 'Фото для раздела «О нас»',
      type: 'image',
      options: {hotspot: true},
      group: 'about',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Настройки сайта'}
    },
  },
})
