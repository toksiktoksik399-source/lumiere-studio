import {defineType, defineField} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Специалист',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Имя', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Должность', type: 'localeString'}),
    defineField({name: 'experience', title: 'Стаж / опыт', type: 'localeString', description: 'Например: Стаж 13 лет'}),
    defineField({name: 'photo', title: 'Фото', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', title: 'Порядок', type: 'number'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role.ru', media: 'photo'},
  },
})