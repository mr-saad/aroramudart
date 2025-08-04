export default {
  type: 'document',
  name: 'headerMedia',
  title: 'Homepage Media',
  liveEdit: true,
  fields: [
    {
      title: 'Image/Video',
      type: 'file',
      accept: ['video/mp4', 'video/gif'],
      name: 'file',
    },
  ],
}
