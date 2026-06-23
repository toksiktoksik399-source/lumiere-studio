import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Имя клиента', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'text', title: 'Текст отзыва', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({
      name: 'rating', title: 'Оценка', type: 'number',
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
    defineField({name: 'photoUrl', title: 'Ссылка на фото клиента (URL)', type: 'url', description: 'Прямая ссылка на фото аватара'}),
    defineField({name: 'photo', title: 'Или загрузить фото', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', title: 'Порядок отображения', type: 'number', description: 'Меньше = раньше показывается'}),
  ],
  orderings: [{title: 'По порядку', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'text', media: 'photo'},
  },
})
