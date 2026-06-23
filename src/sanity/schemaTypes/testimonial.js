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
    defineField({
      name: 'text',
      title: 'Текст отзыва',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Фото клиента',
      type: 'image',
      options: {hotspot: true},
      description: 'Аватар — отображается рядом с именем в карточке отзыва',
    }),
    defineField({
      name: 'rating',
      title: 'Оценка',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
      options: {
        list: [
          {title: '★★★★★  5', value: 5},
          {title: '★★★★  4', value: 4},
          {title: '★★★  3', value: 3},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'order',
      title: 'Порядок (число)',
      type: 'number',
      description: 'Чем меньше — тем раньше показывается',
    }),
  ],
  orderings: [
    {
      title: 'По порядку',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'text.ru', media: 'photo'},
  },
})
