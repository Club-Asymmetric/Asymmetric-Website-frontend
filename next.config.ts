import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
