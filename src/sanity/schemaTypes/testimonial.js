import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя клиента',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'text', title: 'Текст отзыва', type: 'localeText'}),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'rating',
      title: 'Оценка (1–5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'text.ru', media: 'photo'},
  },
})