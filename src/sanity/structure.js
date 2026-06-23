import {CogIcon, SparklesIcon, TagIcon, UsersIcon, StarIcon} from '@sanity/icons'

export const structure = (S) =>
  S.list()
    .title('Контент сайта')
    .items([
      S.listItem()
        .title('⚙️  Настройки сайта')
        .icon(CogIcon)
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Настройки сайта'),
        ),
      S.divider(),
      S.documentTypeListItem('topProcedure')
        .title('⭐  ТОП-процедуры')
        .icon(SparklesIcon),
      S.documentTypeListItem('service')
        .title('📋  Все услуги')
        .icon(TagIcon),
      S.documentTypeListItem('teamMember')
        .title('👩‍⚕️  Команда')
        .icon(UsersIcon),
      S.documentTypeListItem('testimonial')
        .title('💬  Отзывы')
        .icon(StarIcon),
    ])
