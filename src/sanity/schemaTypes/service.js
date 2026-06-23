import {defineType, defineField} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Услуга',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Инъекционная косметология', value: 'injectable'},
          {title: 'Аппаратная косметология', value: 'hardware'},
          {title: 'Терапевтическая косметология', value: 'therapeutic'},
          {title: 'Лазерная косметология и эпиляция', value: 'laser'},
        ],
        layout: 'radio',
      },
      description: 'К какому разделу относится эта услуга',
    }),
    defineField({
      name: 'title',
      title: 'Название услуги',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание (необязательно)',
      type: 'localeText',
    }),
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
      title: 'Порядок (число)',
      type: 'number',
      description: 'Чем меньше — тем выше в списке. Например: 10, 20, 30...',
    }),
  ],
  orderings: [
    {
      title: 'По категории',
      name: 'categoryAsc',
      by: [{field: 'category', direction: 'asc'}, {field: 'order', direction: 'asc'}],
    },
    {
      title: 'По порядку',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title.ru', subtitle: 'category', media: 'image'},
    prepare({title, subtitle, media}) {
      const labels = {
        injectable: 'Инъекционная',
        hardware: 'Аппаратная',
        therapeutic: 'Терапевтическая',
        laser: 'Лазерная',
      }
      return {title, subtitle: labels[subtitle] || subtitle, media}
    },
  },
})
