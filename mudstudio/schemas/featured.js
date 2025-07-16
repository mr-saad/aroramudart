export default {
  title: "Featured Products",
  name: "featured",
  type: "document",
  liveEdit: true,
  fields: [
    {
      title: "Products",
      name: "products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    },
  ],
}
