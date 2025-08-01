/**
 * @type {import('next').Config}
 */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
  devIndicators: false,
}
