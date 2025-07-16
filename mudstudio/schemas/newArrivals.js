export default {
  title: "New Arrivals",
  name: "newArrival",
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
