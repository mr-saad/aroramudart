export default {
  title: 'Product Sections',
  name: 'section',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Section Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Section Products',
      name: 'prods',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    },
  ],
}
