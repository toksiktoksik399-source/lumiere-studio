export const structure = (S) =>
  S.list()
    .title('Контент сайта')
    .items([
      S.listItem()
        .title('Настройки сайта')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('topProcedure').title('ТОП-процедуры'),
      S.documentTypeListItem('service').title('Услуги (категории)'),
      S.documentTypeListItem('teamMember').title('Команда'),
      S.documentTypeListItem('testimonial').title('Отзывы'),
    ])