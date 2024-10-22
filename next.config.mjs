/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["glam.clickable.site"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
