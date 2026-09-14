import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Proxies /api/* through the Next.js server to the real backend, so the
    // backend's URL never appears in the browser (not in the JS bundle, not
    // in Network tab requests — only this server-to-server hop knows it).
    const backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
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
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**', // Real Spotify episode cover art
      },
    ],
    domains:['localhost'],
  }
};

export default nextConfig;
