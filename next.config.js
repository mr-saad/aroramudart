/**
 * @type {import('next').Config}
 */
module.exports = {
  images: {
    qualities: [30],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  devIndicators: false,
}
