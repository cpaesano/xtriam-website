import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Get help with bpmPro. Browse our knowledge base, watch tutorials, or chat with our AI assistant for instant answers.",
};

export default function HelpPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How can we help?
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Find answers in our knowledge base, watch video tutorials, or get
              instant help from our AI assistant.
            </p>
            {/* Search Bar */}
            <div className="mt-8 relative">
              <div className="flex items-center rounded-xl border border-border bg-background shadow-sm overflow-hidden">
                <div className="pl-4">
                  <svg
                    className="h-5 w-5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="flex-1 px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none bg-transparent"
                />
                <button className="px-6 py-4 bg-brand-blue-600 text-white font-medium hover:bg-brand-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/video-library"
              className="flex items-center gap-4 rounded-xl border border-border p-6 hover:border-brand-blue-300 hover:bg-brand-blue-50/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Watch Tutorials
                </h3>
                <p className="text-sm text-muted-foreground">
                  Video guides for common tasks
                </p>
              </div>
            </Link>
            <Link
              href="/faqs"
              className="flex items-center gap-4 rounded-xl border border-border p-6 hover:border-brand-blue-300 hover:bg-brand-blue-50/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-orange-100 text-brand-orange-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Browse FAQs</h3>
                <p className="text-sm text-muted-foreground">
                  Answers to common questions
                </p>
              </div>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-4 rounded-xl border border-border p-6 hover:border-brand-blue-300 hover:bg-brand-blue-50/50 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Contact Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help from our team
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge Base Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Browse by Topic
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={index}
                className="rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a
                        href="#"
                        className="text-sm text-brand-blue-600 hover:underline"
                      >
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-blue-600 hover:underline"
                >
                  View all articles
                  <svg
                    className="h-4 w-4"
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
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Popular Articles
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {popularArticles.map((article, index) => (
              <a
                key={index}
                href="#"
                className="flex items-start gap-4 rounded-xl bg-background border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600 text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground hover:text-brand-blue-600">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {article.description}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {article.readTime}
                    </span>
                    <span className="bg-muted px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Promo */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-brand-blue-600 to-brand-blue-800 p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium mb-4">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  AI-Powered
                </div>
                <h2 className="text-3xl font-bold">Get Instant Answers</h2>
                <p className="mt-4 text-brand-blue-100">
                  Our AI assistant is trained on the entire bpmPro knowledge
                  base. Ask any question and get accurate, helpful answers
                  instantly—24/7.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-brand-blue-100">
                    <svg
                      className="h-5 w-5 text-brand-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Trained on all bpmPro documentation
                  </li>
                  <li className="flex items-center gap-2 text-brand-blue-100">
                    <svg
                      className="h-5 w-5 text-brand-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Available around the clock
                  </li>
                  <li className="flex items-center gap-2 text-brand-blue-100">
                    <svg
                      className="h-5 w-5 text-brand-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Escalates to human support when needed
                  </li>
                </ul>
                <div className="mt-8">
                  <Button
                    variant="accent"
                    size="lg"
                    className="bg-brand-orange-500 hover:bg-brand-orange-600"
                  >
                    Chat with AI Assistant
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-xl bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue-600">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        bpmPro Assistant
                      </div>
                      <div className="text-xs text-green-600">Online</div>
                    </div>
                  </div>
                  <div className="space-y-4 py-4">
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue-600 text-xs font-bold">
                        AI
                      </div>
                      <div className="rounded-xl bg-muted/50 px-4 py-2 text-sm">
                        Hi! I'm here to help you with bpmPro. What would you
                        like to know?
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="rounded-xl bg-brand-blue-600 text-white px-4 py-2 text-sm">
                        How do I set up payment reminders?
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue-600 text-xs font-bold">
                        AI
                      </div>
                      <div className="rounded-xl bg-muted/50 px-4 py-2 text-sm">
                        Great question! To set up payment reminders in bpmPro...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Still need help?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our support team is here for you. Reach out and we'll get back to
            you as soon as possible.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Support
              </Button>
            </Link>
            <a href="tel:+13052049694">
              <Button variant="outline" size="lg">
                Call (305) 204-9694
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Getting Started",
    description: "Learn the basics of bpmPro and set up your account.",
    articles: [
      "Creating your first project",
      "Setting up your company profile",
      "Importing existing data",
    ],
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        />
      </svg>
    ),
    title: "Projects Board",
    description: "Manage projects from lead to completion.",
    articles: [
      "Understanding project stages",
      "Moving projects through the pipeline",
      "Adding notes and attachments",
    ],
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Quotes & Proposals",
    description: "Create and manage customer quotes.",
    articles: [
      "Creating a new quote",
      "Adding products to quotes",
      "Sending proposals to customers",
    ],
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Payments & Invoicing",
    description: "Track payments and manage billing.",
    articles: [
      "Setting up Stripe integration",
      "Sending payment requests",
      "Recording manual payments",
    ],
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Scheduling",
    description: "Schedule installations and manage crews.",
    articles: [
      "Scheduling an installation",
      "Managing crew assignments",
      "Handling reschedules",
    ],
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Reports & Analytics",
    description: "Track performance and generate reports.",
    articles: [
      "Understanding dashboard metrics",
      "Generating sales reports",
      "Commission tracking",
    ],
  },
];

const popularArticles = [
  {
    title: "How to Create Your First Project in bpmPro",
    description:
      "Step-by-step guide to creating and managing your first project from lead to completion.",
    readTime: "5 min read",
    category: "Getting Started",
  },
  {
    title: "Setting Up Stripe Payment Integration",
    description:
      "Connect your Stripe account to start accepting online payments from customers.",
    readTime: "3 min read",
    category: "Payments",
  },
  {
    title: "Understanding the Projects Board",
    description:
      "Learn how to use the Projects Board to visualize your pipeline and track project progress.",
    readTime: "7 min read",
    category: "Projects",
  },
  {
    title: "Importing Quotes from ES Windows",
    description:
      "How to import your existing ES Windows quotes into bpmPro for seamless management.",
    readTime: "4 min read",
    category: "Integration",
  },
  {
    title: "Managing Your Sales Team and Commissions",
    description:
      "Set up commission structures and track sales performance for your team.",
    readTime: "6 min read",
    category: "Sales",
  },
  {
    title: "Scheduling Installations and Managing Crews",
    description:
      "Best practices for scheduling jobs and assigning installation crews.",
    readTime: "5 min read",
    category: "Scheduling",
  },
];
