export default {
  name: "product",
  title: "Products",
  type: "document",
  liveEdit: true,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          {
            title: "Traditional Designs",
            value: "Traditional Designs",
          },
          {
            title: "Classic Designs",
            value: "Classic Designs",
          },
          {
            title: "Mirror Designs",
            value: "Mirror Designs",
          },
          {
            title: "Islamic Designs",
            value: "Islamic Designs",
          },
          {
            title: "Kutchi Work Designs",
            value: "Kutchi Work Designs",
          },
          {
            title: "Printed Clocks",
            value: "Printed Clocks",
          },
          {
            title: "Mudwork Clocks",
            value: "Mudwork Clocks",
          },
        ],
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "stock",
      title: "InStock",
      type: "number",
    },
    {
      name: "discount",
      title: "Discount ₹",
      type: "number",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
}
