import {defineType, defineField} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Описание (RU/EN)',
  type: 'object',
  fields: [
    defineField({name: 'ru', title: 'Русский', type: 'text', rows: 4}),
    defineField({name: 'en', title: 'English', type: 'text', rows: 4}),
  ],
})