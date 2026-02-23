import type { MetadataRoute } from "next";

const BASE_URL = "https://www.xtriam.com";

// Blog post slugs from app/post/[slug]/page.tsx
const blogSlugs = [
  "why-excel-and-quickbooks-arent-enough-for-growing-contractors",
  "the-hidden-cost-of-running-your-business-on-disconnected-tools",
  "why-building-on-platforms-like-salesforce-is-a-game-changer-for-small-businesses",
  "leveraging-ai-for-small-business-success-the-xtriam-story",
  "the-ideal-territory-manager-navigating-challenges-in-window-manufacturing",
  "the-power-of-meetings-streamlining-operations-for-window-dealers",
  "crafting-the-perfect-first-impression-navigating-the-initial-sales-interaction",
  "job-supervision-the-not-so-secret-key",
  "making-informed-decisions-with-bpmpro-real-time-warehouse-insights",
  "streamlining-sales-processes-automation-for-window-dealers",
  "monitoring-key-performance-indicators-at-small-and-medium-sized-businesses",
  "some-insights-about-business-process-management-bpm",
  "key-points-about-streamlining-business-operations-for-window-contractors",
  "price-increases-in-the-window-and-door-industry-in-florida",
  "xtriam-has-launched-bpmpro",
  "from-quote-to-completion-how-software-is-changing-the-remodeling-business",
];

// Newsletter edition slugs from app/this-week-in-windows/[slug]/page.tsx
const newsletterSlugs = [
  "june-13-2025-windows-news",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/bpmpro`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bpmpro-features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/savings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/customer-success-stories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/book-a-demo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/video-library`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/this-week-in-windows`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/payment-processing-with-stripe-integration`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/help`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const landingPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/bpmpro-crm/business-process-automation-for-window-contractors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bpmpro-crm/eliminate-manual-processes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bpmpro-crm/quickly-import-your-es-windows-quotes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/post/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const newsletters: MetadataRoute.Sitemap = newsletterSlugs.map((slug) => ({
    url: `${BASE_URL}/this-week-in-windows/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const tutorials: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tutorials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [
    ...staticPages,
    ...landingPages,
    ...blogPosts,
    ...newsletters,
    ...tutorials,
  ];
}
