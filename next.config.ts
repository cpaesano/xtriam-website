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
};

export default nextConfig;
