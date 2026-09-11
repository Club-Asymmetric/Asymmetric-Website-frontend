import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // WARNING: disables ESLint blocking the build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: allows production builds even if there are type errors
    ignoreBuildErrors: true,
  },
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ass-dummy-backend.onrender.com',
        pathname: '/images/**', // Allow all paths under /images/
      },
    ],
    domains:['localhost'],
  }
};

export default nextConfig;
