import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "This Week in Windows",
  description:
    "Weekly industry news and updates for window and door professionals in Florida.",
};

// TODO: Replace with actual content from MDX files
const editions = [
  {
    slug: "june-13-2025-windows-news",
    title: "This Week in Windows - June 13, 2025",
    date: "June 13, 2025",
    excerpt: "Hurricane season preparations, new product launches, and industry updates for Florida window contractors.",
  },
  {
    slug: "june-06-2025-windows-news",
    title: "This Week in Windows - June 6, 2025",
    date: "June 6, 2025",
    excerpt: "Market trends, regulatory updates, and tips for window dealers this week.",
  },
  {
    slug: "may-30-2025-windows-news",
    title: "This Week in Windows - May 30, 2025",
    date: "May 30, 2025",
    excerpt: "Memorial Day weekend wrap-up and what it means for the window industry.",
  },
  {
    slug: "may-23-2025-windows-news",
    title: "This Week in Windows - May 23, 2025",
    date: "May 23, 2025",
    excerpt: "New energy efficiency standards and their impact on window contractors.",
  },
  {
    slug: "may-16-2025-windows-news",
    title: "This Week in Windows - May 16, 2025",
    date: "May 16, 2025",
    excerpt: "Supply chain updates and installation best practices for the summer season.",
  },
];

export default function ThisWeekInWindowsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-orange-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              This Week in Windows
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Weekly industry news and updates for window and door professionals
              in Florida.
            </p>
          </div>
        </div>
      </section>

      {/* Editions List */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="space-y-6">
            {editions.map((edition, index) => (
              <article
                key={index}
                className="group rounded-xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-orange-200"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{edition.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-foreground group-hover:text-brand-orange-600 transition-colors">
                  <Link href={`/this-week-in-windows/${edition.slug}`}>
                    {edition.title}
                  </Link>
                </h2>
                <p className="mt-2 text-muted-foreground">{edition.excerpt}</p>
                <Link
                  href={`/this-week-in-windows/${edition.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-brand-orange-600 hover:text-brand-orange-700"
                >
                  Read edition
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

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-brand-orange-500 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Never Miss an Edition
            </h2>
            <p className="mt-4 text-white/90">
              Follow us on social media to get the latest industry news
              delivered to your feed.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="https://youtube.com/@xtriam/videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="bg-white text-brand-orange-600 hover:bg-brand-orange-50"
                >
                  YouTube
                </Button>
              </a>
              <a
                href="https://instagram.com/xtriam.windows.crm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="bg-white text-brand-orange-600 hover:bg-brand-orange-50"
                >
                  Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
