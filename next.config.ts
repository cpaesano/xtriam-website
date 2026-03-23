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
      {
        source: "/tutorials",
        destination: "/support/tutorials",
        permanent: true,
      },
      {
        source: "/tutorials/:slug",
        destination: "/support/tutorials/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles rewrites run BEFORE Next.js pages, so static HTML takes priority
      beforeFiles: [
        { source: "/", destination: "/static/index.html" },
        { source: "/bpmpro", destination: "/static/bpmpro.html" },
        { source: "/bpmpro-features", destination: "/static/bpmpro-features.html" },
        { source: "/about", destination: "/static/about.html" },
        { source: "/customer-success-stories", destination: "/static/customer-success-stories.html" },
        { source: "/video-library", destination: "/static/video-library.html" },
        // /blog now served by Next.js app/(marketing)/blog/page.tsx
        { source: "/privacy-policy", destination: "/static/privacy-policy.html" },
        { source: "/terms-and-conditions", destination: "/static/terms-and-conditions.html" },
        { source: "/payment-processing-with-stripe-integration", destination: "/static/payment-processing-with-stripe-integration.html" },
        { source: "/automation", destination: "/static/automation.html" },
        { source: "/window-and-door-industry", destination: "/static/window-and-door-industry.html" },
        { source: "/bpmpro-crm/business-process-automation-for-window-contractors", destination: "/static/bpmpro-crm-business-process-automation.html" },
        { source: "/bpmpro-crm/eliminate-manual-processes", destination: "/static/bpmpro-crm-eliminate-manual-processes.html" },
        { source: "/bpmpro-crm/quickly-import-your-es-windows-quotes", destination: "/static/bpmpro-crm-es-windows-quotes.html" },
        { source: "/bpmpro-crm/salesforce-for-window-contractors", destination: "/static/bpmpro-crm-salesforce-for-window-contractors.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
