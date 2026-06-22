import {defineType, defineField} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Текст (RU/EN)',
  type: 'object',
  fields: [
    defineField({name: 'ru', title: 'Русский', type: 'string'}),
    defineField({name: 'en', title: 'English', type: 'string'}),
  ],
})