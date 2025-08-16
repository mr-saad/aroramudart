export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      type: 'reference',
      to: [{type: 'offer'}],
      name: 'offer',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'instock',
      title: 'InStock',
      type: 'number',
    },
    {
      name: 'discount',
      title: 'Discount ₹',
      type: 'number',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'model',
      title: '3D Model',
      type: 'file',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],
}
