import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, and news for contractors. Grow your business with software built for the trades.",
};

// TODO: Replace with actual blog posts from MDX files
const blogPosts = [
  {
    slug: "xtriam-launches-invoiceticket",
    title: "xTriam Launches InvoiceTicket: AI-Powered Invoicing for Contractors",
    excerpt: "xTriam introduces its second product — an AI-first invoicing app built for small contractors who work from the field, not behind a desk.",
    date: "February 2026",
    category: "News",
    image: "/images/blog/invoiceticket-voice-input.png",
  },
  {
    slug: "from-quote-to-completion-how-software-is-changing-the-remodeling-business",
    title: "From Quote to Completion: How Software is Changing the Remodeling Business",
    excerpt: "The remodeling and in-home services industry has transformed dramatically. Here's how contractors are using software to manage every stage of the customer journey.",
    date: "December 2025",
    category: "Technology",
    image: "/images/blog/quote-to-completion.png",
  },
  {
    slug: "why-excel-and-quickbooks-arent-enough-for-growing-contractors",
    title: "Why Excel and QuickBooks Aren't Enough for Growing Contractors",
    excerpt: "Excel and QuickBooks got you started, but they weren't built for running a trade business. Here's why more contractors are looking for something better.",
    date: "July 2025",
    category: "Technology",
    image: "/images/blog/excel-quickbooks-not-enough.jpg",
  },
  {
    slug: "the-hidden-cost-of-running-your-business-on-disconnected-tools",
    title: "The Hidden Cost of Running Your Business on Disconnected Tools",
    excerpt: "Your software looks cheap on paper. But disconnected tools are costing you more than you think—in time, mistakes, and missed opportunities.",
    date: "March 2025",
    category: "Technology",
    image: "/images/blog/hidden-cost-disconnected-tools.jpg",
  },
  {
    slug: "why-building-on-platforms-like-salesforce-is-a-game-changer-for-small-businesses",
    title: "Why Building on Platforms Like Salesforce is a Game-Changer for Small Businesses",
    excerpt: "Discover how leveraging enterprise platforms can give your small business a competitive edge without enterprise-level costs.",
    date: "June 5, 2024",
    category: "Technology",
    image: "/images/blog/salesforce-platform.jpg",
  },
  {
    slug: "leveraging-ai-for-small-business-success-the-xtriam-story",
    title: "Leveraging AI for Small Business Success: The xTriam Story",
    excerpt: "How xTriam uses artificial intelligence to help window contractors work smarter, not harder.",
    date: "January 8, 2024",
    category: "Innovation",
    image: "/images/blog/a-small-business.png",
  },
  {
    slug: "the-ideal-territory-manager-navigating-challenges-in-window-manufacturing",
    title: "The Ideal Territory Manager: Navigating Challenges in Window Manufacturing",
    excerpt: "Key strategies for territory managers in the window manufacturing industry.",
    date: "October 6, 2023",
    category: "Sales",
    image: "/images/blog/terrority-Manager.jpg",
  },
  {
    slug: "the-power-of-meetings-streamlining-operations-for-window-dealers",
    title: "The Power of Meetings: Streamlining Operations for Window Dealers",
    excerpt: "How effective meeting practices can transform your window dealership operations.",
    date: "September 7, 2023",
    category: "Operations",
    image: "/images/blog/power-of-meetings.png",
  },
  {
    slug: "crafting-the-perfect-first-impression-navigating-the-initial-sales-interaction",
    title: "Crafting the Perfect First Impression: Navigating the Initial Sales Interaction",
    excerpt: "Tips for making a lasting impression during your first customer interaction.",
    date: "August 2023",
    category: "Sales",
    image: "/images/blog/first-impression.jpg",
  },
  {
    slug: "job-supervision-the-not-so-secret-key",
    title: "Job Supervision: The Not So Secret Key",
    excerpt: "Why effective job supervision is crucial for window installation success.",
    date: "July 2023",
    category: "Operations",
    image: "/images/blog/job-supervision.jpg",
  },
  {
    slug: "making-informed-decisions-with-bpmpro-real-time-warehouse-insights",
    title: "Making Informed Decisions with bpmPro: Real-Time Warehouse Insights",
    excerpt: "How real-time data helps window contractors make better inventory decisions.",
    date: "June 5, 2023",
    category: "Technology",
    image: "/images/blog/warehouse-insights.jpeg",
  },
  {
    slug: "streamlining-sales-processes-automation-for-window-dealers",
    title: "Streamlining Sales Processes: Automation for Window Dealers",
    excerpt: "Discover how automation can transform your sales process and boost productivity.",
    date: "April 3, 2023",
    category: "Sales",
    image: "/images/blog/sales-automation.jpg",
  },
  {
    slug: "monitoring-key-performance-indicators-at-small-and-medium-sized-businesses",
    title: "Monitoring Key Performance Indicators at Small and Medium-sized Businesses",
    excerpt: "While KPI monitoring is vital for business success, SMBs face distinct obstacles in implementing this practice consistently.",
    date: "December 5, 2022",
    category: "Technology",
    image: "/images/blog/monitor-key-performance.jpg",
  },
  {
    slug: "some-insights-about-business-process-management-bpm",
    title: "Some Insights about Business Process Management (BPM)",
    excerpt: "Business process management represents a discipline dedicated to enhancing organizational performance through process optimization and automation.",
    date: "November 8, 2022",
    category: "Technology",
    image: "/images/blog/business-process-management-insights.jpg",
  },
  {
    slug: "key-points-about-streamlining-business-operations-for-window-contractors",
    title: "Key Points about Streamlining Business Operations for Window Contractors",
    excerpt: "Streamlining business operations can help window contractors improve efficiency, reduce costs, and gain valuable business insights.",
    date: "October 10, 2022",
    category: "Operations",
    image: "/images/blog/streamlining-business-processes.jpg",
  },
  {
    slug: "price-increases-in-the-window-and-door-industry-in-florida",
    title: "Price Increases in the Window and Door Industry in Florida",
    excerpt: "Discussing significant price escalations affecting Florida's window and door manufacturing sector with a 40 to 58% total price spike.",
    date: "July 4, 2022",
    category: "Industry",
    image: "/images/blog/price-increases-in-window-business-florida.jpg",
  },
  {
    slug: "xtriam-has-launched-bpmpro",
    title: "xTriam has launched bpmPro",
    excerpt: "xTriam announced the release of bpmPro, a business process management software that runs on the world-leading Salesforce Platform.",
    date: "June 27, 2022",
    category: "News",
    image: "/images/blog/xtriam-launched-bpmPro.jpg",
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
              Insights, tips, and industry news for contractors.
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
                className="group rounded-xl border border-border bg-background shadow-sm transition-all hover:shadow-md hover:border-brand-blue-200 overflow-hidden"
              >
                {post.image && (
                  <Link href={`/post/${post.slug}`} className="block">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-6">
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
                </div>
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
