import {defineType, defineField} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Специалист',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Имя', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Должность (RU)', type: 'string', description: 'Например: Главный косметолог-дерматолог'}),
    defineField({name: 'experience', title: 'Стаж / опыт', type: 'string', description: 'Например: 12 лет опыта'}),
    defineField({name: 'spec', title: 'Специализация', type: 'string', description: 'Короткое перечисление через запятую'}),
    defineField({name: 'bio', title: 'Биография (2-3 предложения)', type: 'text', rows: 3}),
    defineField({name: 'photoUrl', title: 'Ссылка на фото (URL)', type: 'url', description: 'Вставьте прямую ссылку на фото (Unsplash, облако и т.д.)'}),
    defineField({name: 'photo', title: 'Или загрузить фото', type: 'image', options: {hotspot: true}}),
    defineField({name: 'order', title: 'Порядок отображения', type: 'number', description: 'Меньше = выше в списке (1, 2, 3...)'}),
  ],
  orderings: [{title: 'По порядку', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})
