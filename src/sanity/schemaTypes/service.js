import {defineType, defineField} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Услуга',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'description', title: 'Описание', type: 'localeText'}),
    defineField({
      name: 'price',
      title: 'Цена',
      type: 'string',
      description: 'Например: от 3 000 ₽',
    }),
    defineField({
      name: 'image',
      title: 'Фото',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      description: 'Чем меньше число — тем выше услуга в списке',
    }),
  ],
  preview: {
    select: {title: 'title.ru', subtitle: 'price', media: 'image'},
  },
})