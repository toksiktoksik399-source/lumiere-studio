import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Имя мастера / название', type: 'localeString'}),
    defineField({name: 'tagline', title: 'Короткий слоган', type: 'localeString'}),

    defineField({name: 'phone', title: 'Телефон', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'address', title: 'Адрес', type: 'localeString'}),
    defineField({name: 'instagram', title: 'Instagram (ссылка)', type: 'url'}),
    defineField({name: 'whatsapp', title: 'WhatsApp (ссылка или номер)', type: 'string'}),
    defineField({name: 'telegram', title: 'Telegram (ссылка)', type: 'url'}),

    defineField({name: 'heroHeading', title: 'Заголовок на главном экране', type: 'localeString'}),
    defineField({name: 'heroSubheading', title: 'Подзаголовок на главном экране', type: 'localeText'}),
    defineField({
      name: 'heroImage',
      title: 'Фоновое фото главного экрана',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({name: 'aboutHeading', title: 'Заголовок блока «Обо мне»', type: 'localeString'}),
    defineField({name: 'aboutText', title: 'Текст «Обо мне»', type: 'localeText'}),
    defineField({
      name: 'aboutPhoto',
      title: 'Фото для блока «Обо мне»',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'title.ru'},
    prepare({title}) {
      return {title: title || 'Настройки сайта'}
    },
  },
})