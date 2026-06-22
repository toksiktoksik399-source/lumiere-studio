import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Название клиники', type: 'localeString'}),
    defineField({name: 'tagline', title: 'Короткий слоган', type: 'localeString'}),
    defineField({name: 'city', title: 'Город', type: 'localeString'}),

    defineField({name: 'phone', title: 'Телефон', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'address', title: 'Адрес', type: 'localeString'}),
    defineField({name: 'workingHours', title: 'Часы работы', type: 'localeString'}),
    defineField({name: 'whatsapp', title: 'WhatsApp (номер)', type: 'string'}),
    defineField({name: 'telegram', title: 'Telegram (ссылка)', type: 'url'}),
    defineField({name: 'vk', title: 'ВКонтакте (ссылка)', type: 'url'}),
    defineField({name: 'bookingUrl', title: 'Ссылка онлайн-записи (необязательно)', type: 'url'}),
    defineField({name: 'mapUrl', title: 'Ссылка на карту', type: 'url'}),

    defineField({name: 'heroHeading', title: 'Заголовок на главном экране', type: 'localeString'}),
    defineField({name: 'heroSubheading', title: 'Подзаголовок на главном экране', type: 'localeText'}),
    defineField({name: 'heroImage', title: 'Фото главного экрана', type: 'image', options: {hotspot: true}}),

    defineField({name: 'aboutHeading', title: 'Заголовок блока «О нас»', type: 'localeString'}),
    defineField({name: 'aboutText', title: 'Текст «О нас»', type: 'localeText'}),
    defineField({name: 'aboutPhoto', title: 'Фото для блока «О нас»', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    prepare() {
      return {title: 'Настройки сайта'}
    },
  },
})