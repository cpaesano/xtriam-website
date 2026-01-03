import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, and news for window and door contractors. Learn how to grow your business with bpmPro.",
};

// TODO: Replace with actual blog posts from MDX files
const blogPosts = [
  {
    slug: "why-building-on-platforms-like-salesforce-is-a-game-changer-for-small-businesses",
    title: "Why Building on Platforms Like Salesforce is a Game-Changer for Small Businesses",
    excerpt: "Discover how leveraging enterprise platforms can give your small business a competitive edge without enterprise-level costs.",
    date: "June 5, 2024",
    category: "Technology",
  },
  {
    slug: "leveraging-ai-for-small-business-success-the-xtriam-story",
    title: "Leveraging AI for Small Business Success: The xTriam Story",
    excerpt: "How xTriam uses artificial intelligence to help window contractors work smarter, not harder.",
    date: "January 8, 2024",
    category: "Innovation",
  },
  {
    slug: "the-ideal-territory-manager-navigating-challenges-in-window-manufacturing",
    title: "The Ideal Territory Manager: Navigating Challenges in Window Manufacturing",
    excerpt: "Key strategies for territory managers in the window manufacturing industry.",
    date: "October 6, 2023",
    category: "Sales",
  },
  {
    slug: "the-power-of-meetings-streamlining-operations-for-window-dealers",
    title: "The Power of Meetings: Streamlining Operations for Window Dealers",
    excerpt: "How effective meeting practices can transform your window dealership operations.",
    date: "September 7, 2023",
    category: "Operations",
  },
  {
    slug: "crafting-the-perfect-first-impression-navigating-the-initial-sales-interaction",
    title: "Crafting the Perfect First Impression: Navigating the Initial Sales Interaction",
    excerpt: "Tips for making a lasting impression during your first customer interaction.",
    date: "August 2023",
    category: "Sales",
  },
  {
    slug: "job-supervision-the-not-so-secret-key",
    title: "Job Supervision: The Not So Secret Key",
    excerpt: "Why effective job supervision is crucial for window installation success.",
    date: "July 2023",
    category: "Operations",
  },
  {
    slug: "making-informed-decisions-with-bpmpro-real-time-warehouse-insights",
    title: "Making Informed Decisions with bpmPro: Real-Time Warehouse Insights",
    excerpt: "How real-time data helps window contractors make better inventory decisions.",
    date: "June 5, 2023",
    category: "Technology",
  },
  {
    slug: "streamlining-sales-processes-automation-for-window-dealers",
    title: "Streamlining Sales Processes: Automation for Window Dealers",
    excerpt: "Discover how automation can transform your sales process and boost productivity.",
    date: "April 3, 2023",
    category: "Sales",
  },
];

export default function BlogPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Insights, tips, and industry news for window and door contractors.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-blue-200"
              >
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-medium text-brand-blue-700">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground group-hover:text-brand-blue-600 transition-colors">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={`/post/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-brand-blue-600 hover:text-brand-blue-700"
                >
                  Read more
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-12 flex justify-center gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Stay Updated
            </h2>
            <p className="mt-4 text-muted-foreground">
              Follow us on social media for the latest tips and industry news.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://youtube.com/@xtriam/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-blue-600 transition-colors"
              >
                YouTube
              </a>
              <a
                href="https://instagram.com/xtriam.windows.crm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-blue-600 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@bpmpro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-blue-600 transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
