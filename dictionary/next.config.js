/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    X_API_KEY: process.env.X_API_KEY,
  },
};

module.exports = nextConfig;
