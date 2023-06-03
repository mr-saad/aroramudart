import sanity from "@sanity/client"

const dataset = process.env.NEXT_PUBLIC_dataset
const projectId = process.env.NEXT_PUBLIC_projectId
const apiVersion = process.env.NEXT_PUBLIC_apiVersion

export default sanity({
  dataset,
  useCdn: true,
  projectId,
  apiVersion,
})
