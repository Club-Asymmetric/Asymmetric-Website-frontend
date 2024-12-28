import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mm86ln1b-3001.inc1.devtunnels.ms',
        pathname: '/images/**', // Allow all paths under /images/
      },
    ],
    domains:['localhost'],
  }
};

export default nextConfig;
