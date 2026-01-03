import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft, Calendar } from "lucide-react";

// TODO: Replace with actual MDX content
const editions: Record<string, {
  title: string;
  date: string;
  content: string;
}> = {
  "june-13-2025-windows-news": {
    title: "This Week in Windows - June 13, 2025",
    date: "June 13, 2025",
    content: `
      <h2>Hurricane Season Preparations</h2>
      <p>With hurricane season officially underway, Florida window contractors are seeing increased demand for impact-resistant windows. Here's what you need to know to prepare your business.</p>

      <h2>New Product Launches</h2>
      <p>Several major manufacturers announced new product lines this week, including improved energy efficiency ratings and faster installation systems.</p>

      <h2>Industry Updates</h2>
      <p>The Florida Building Code Commission released updated guidelines for impact window installations. Make sure your team is up to date on the latest requirements.</p>

      <h2>Market Trends</h2>
      <p>Consumer demand for smart glass technology continues to grow. Consider adding this to your product offerings to stay competitive.</p>
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(editions).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const edition = editions[slug];

  if (!edition) {
    return { title: "Edition Not Found" };
  }

  return {
    title: edition.title,
    description: `${edition.title} - Industry news for window professionals`,
  };
}

export default async function EditionPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const edition = editions[slug];

  if (!edition) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Edition Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            This edition could not be found.
          </p>
          <Link href="/this-week-in-windows" className="mt-6 inline-block">
            <Button variant="primary">Back to This Week in Windows</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-orange-50 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/this-week-in-windows"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to This Week in Windows
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <span>{edition.date}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {edition.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <article
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-brand-orange-600"
            dangerouslySetInnerHTML={{ __html: edition.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-foreground">
            Streamline your window business with bpmPro
          </h2>
          <p className="mt-2 text-muted-foreground">
            See how other Florida contractors are growing with our CRM.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/book-a-demo">
              <Button variant="accent">Book a Demo</Button>
            </Link>
            <Link href="/this-week-in-windows">
              <Button variant="outline">More Editions</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
