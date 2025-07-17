export default {
  type: 'document',
  name: 'category',
  title: 'Category',
  liveEdit: true,
  fields: [
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}
