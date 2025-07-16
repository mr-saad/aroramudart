export default {
  type: "document",
  name: "spotOffer",
  title: "Spotlight Offer",
  liveEdit: true,
  fields: [
    {
      type: "reference",
      to: [{ type: "offer" }],
      name: "spotOffer",
      title: "Spotlight Offer",
    },
  ],
}
