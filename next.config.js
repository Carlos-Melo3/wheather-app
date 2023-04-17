/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    ANOTHER_VARIABLE: process.env.ANOTHER_VARIABLE
  },
}

module.exports = nextConfig
