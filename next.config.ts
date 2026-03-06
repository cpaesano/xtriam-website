import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/business-case-calculator",
        destination: "/savings",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/bpmpro",
        permanent: true,
      },
      {
        source: "/temp",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles rewrites run BEFORE Next.js pages, so static HTML takes priority
      beforeFiles: [
        { source: "/", destination: "/static/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
