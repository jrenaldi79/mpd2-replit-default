/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  compiler: {
    removeConsole: false,
  },
}

module.exports = nextConfig
