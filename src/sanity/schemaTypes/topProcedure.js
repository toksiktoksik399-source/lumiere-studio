import {defineType, defineField} from 'sanity'

export const topProcedure = defineType({
  name: 'topProcedure',
  title: 'ТОП-процедура',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Название', type: 'localeString', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Описание', type: 'localeText'}),
    defineField({name: 'image', title: 'Фото', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'priceLines',
      title: 'Цены',
      type: 'array',
      of: [
        defineField({
          name: 'priceLine',
          title: 'Строка цены',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Зона / вариант', type: 'localeString'}),
            defineField({name: 'price', title: 'Цена', type: 'string'}),
          ],
          preview: {select: {title: 'label.ru', subtitle: 'price'}},
        }),
      ],
    }),
    defineField({name: 'order', title: 'Порядок', type: 'number'}),
  ],
  preview: {
    select: {title: 'title.ru', media: 'image'},
  },
})