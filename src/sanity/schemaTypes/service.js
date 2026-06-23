import {defineType, defineField} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Услуга',
  type: 'document',
  fields: [
    defineField({
      name: 'category', title: 'Категория', type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Лицо', value: 'face'},
          {title: 'Тело', value: 'body'},
          {title: 'Лазер', value: 'laser'},
          {title: 'Уход', value: 'care'},
        ],
        layout: 'radio',
      },
      description: 'Категория услуги',
    }),
    defineField({name: 'title', title: 'Название услуги', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Описание (необязательно)', type: 'text', rows: 2}),
    defineField({name: 'price', title: 'Цена', type: 'string', description: 'Например: от 6 000 ₽'}),
    defineField({name: 'order', title: 'Порядок', type: 'number', description: 'Меньше = выше в списке'}),
  ],
  orderings: [
    {title: 'По категории и порядку', name: 'catOrder', by: [{field: 'category', direction: 'asc'}, {field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'category'},
    prepare({title, subtitle}) {
      const labels = {face: 'Лицо', body: 'Тело', laser: 'Лазер', care: 'Уход'};
      return {title, subtitle: labels[subtitle] || subtitle};
    },
  },
})
