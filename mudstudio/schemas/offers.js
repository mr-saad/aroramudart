export default {
  type: 'document',
  name: 'offer',
  title: 'Offers',
  liveEdit: true,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      type: 'string',
      name: 'desc',
      title: 'Description',
    },
  ],
}
