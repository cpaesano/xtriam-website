import { Metadata } from "next";
import Link from "next/link";
import { BlogGrid } from "./BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, and news for contractors. Grow your business with software built for the trades.",
};

// TODO: Replace with actual blog posts from MDX files
const blogPosts = [
  {
    slug: "best-sales-software-for-window-and-door-contractors",
    title: "Best Sales Software for Window and Door Contractors in 2026",
    excerpt: "Disconnected tools are slowing your sales process. Here's what to look for in window and door sales software — and an honest comparison of the major options in 2026.",
    date: "March 2026",
    category: "Technology",
    image: "/images/blog/sales-software-contractors.png",
  },
  {
    slug: "xtriam-launches-invoiceticket",
    title: "xTriam Launches InvoiceTicket: AI-Powered Invoicing for Contractors",
    excerpt: "xTriam introduces its second product — an AI-first invoicing app built for small contractors who work from the field, not behind a desk.",
    date: "February 2026",
    category: "News",
    image: "/images/blog/invoiceticket-voice-input.png",
  },
  {
    slug: "window-and-door-contractor-marketing-strategies",
    title: "Window and Door Contractor Marketing: 7 Strategies That Actually Work",
    excerpt: "Referrals got you started, but they won't get you to $5M. Here are seven marketing strategies that consistently produce results for window and door contractors — from Google Business Profile optimization to automated lead follow-up.",
    date: "March 2026",
    category: "Marketing",
    image: "/images/blog/contractor-marketing.png",
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
    title: "Job Supervision: The Not-So-Secret Key to Profitability in Window Contracting",
    excerpt: "The jobsite is where your plans face reality. Here's how effective supervision protects your margins.",
    date: "July 2023",
    category: "Operations",
    image: "/images/blog/job-supervision.jpg",
    imageAspect: "square" as const,
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
    imageAspect: "square" as const,
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

// Extract unique categories
const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogPage() {
  const featured = blogPosts[0];
  const remaining = blogPosts.slice(1);

  return (
    <div>
      {/* Hero + Featured Post */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Insights, tips, and industry news for window &amp; door contractors.
            </p>
          </div>

          {/* Featured Post */}
          <Link href={`/post/${featured.slug}`} className="group block">
            <article className="grid md:grid-cols-2 gap-6 rounded-xl border border-border bg-background shadow-sm overflow-hidden transition-all hover:shadow-lg hover:border-brand-blue-200">
              <div className="aspect-video md:aspect-auto overflow-hidden bg-muted">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 lg:p-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-brand-orange-100 px-3 py-1 text-xs font-semibold text-brand-orange-700">
                    Featured
                  </span>
                  <span className="rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-medium text-brand-blue-700">
                    {featured.category}
                  </span>
                  <span>{featured.date}</span>
                </div>
                <h2 className="mt-4 text-2xl lg:text-3xl font-bold text-foreground group-hover:text-brand-blue-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-muted-foreground text-base lg:text-lg">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-brand-blue-600 group-hover:text-brand-blue-700">
                  Read article
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* Category Filter + Posts Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <BlogGrid posts={remaining} categories={categories} />
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-brand-blue-600 py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to streamline your business?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              bpmPro is the most complete CRM built specifically for window and door contractors. See how it can work for you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/book-a-demo"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
              >
                Book a Free Demo
              </Link>
              <Link
                href="/savings"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Calculate Your Savings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Follow */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold text-foreground">
              Follow Us
            </h2>
            <div className="mt-4 flex justify-center gap-6">
              <a href="https://youtube.com/@xtriam/videos" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-blue-600 transition-colors font-medium">
                YouTube
              </a>
              <a href="https://instagram.com/xtriam.windows.crm" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-blue-600 transition-colors font-medium">
                Instagram
              </a>
              <a href="https://tiktok.com/@bpmpro" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-blue-600 transition-colors font-medium">
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
