import { Button, VimeoEmbed } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue-50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Specialized{" "}
                <span className="text-brand-blue-600">CRM++</span> for Window &
                Door Contractors
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                bpmPro is a Salesforce-native solution designed specifically for
                window and door contractors. Streamline your sales, manage
                projects, and grow your business with tools built for your
                industry.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/book-a-demo">
                  <Button variant="accent" size="lg">
                    Book a Demo
                  </Button>
                </Link>
                <Link href="/savings">
                  <Button variant="outline" size="lg">
                    Calculate Your Savings
                  </Button>
                </Link>
              </div>
            </div>
            {/* Hero Image */}
            <div className="relative">
              <Image
                src="/images/hero/Multi-Device-MockUp-Wide-Format.png"
                alt="bpmPro on multiple devices - desktop, tablet, and mobile"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Sound Familiar?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Window contractors face unique challenges. We built bpmPro to
              solve them.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-background p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-100 text-brand-orange-600">
                  {point.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Run Your Business
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From first contact to final installation, bpmPro manages your
              entire workflow.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue-600">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/bpmpro-features">
              <Button variant="primary">View All Features</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Success Video */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-brand-orange-100 px-3 py-1 text-sm font-medium text-brand-orange-700 mb-4">
                Customer Success Story
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                80% Reduction in Admin Time
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See how Hurricane Window and Screen transformed their operations with bpmPro. President Mohammad Aljamal shares how they overcame the challenges of managing a growing business.
              </p>
              <div className="mt-6">
                <blockquote className="border-l-4 border-brand-orange-500 pl-4 italic text-muted-foreground">
                  "bpmPro boosted our performance and slashed administrative time by 80%."
                </blockquote>
                <div className="mt-4">
                  <div className="font-semibold text-foreground">Mohammad Aljamal</div>
                  <div className="text-sm text-muted-foreground">President, Hurricane Window and Screen</div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/customer-success-stories">
                  <Button variant="primary">See More Success Stories</Button>
                </Link>
              </div>
            </div>
            <div>
              <VimeoEmbed videoId="842923160" title="Hurricane Window and Screen Success Story" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to streamline your business?
              </h2>
              <p className="mt-2 text-brand-blue-100">
                See how much time and money you could save with bpmPro.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/savings">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-brand-blue-600 hover:bg-brand-blue-50"
                >
                  Calculate Savings
                </Button>
              </Link>
              <Link href="/book-a-demo">
                <Button
                  variant="accent"
                  size="lg"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const painPoints = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Wasting Time on Manual Tasks",
    description: "Spreadsheets, paperwork, and duplicate data entry eating up your day.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Lost Quotes & Proposals",
    description: "Can't find that quote from last month? Your team using different formats?",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Cash Flow Problems",
    description: "Late payments, missed deposits, and unclear project financials.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Scheduling Chaos",
    description: "Double-booked installations, missed appointments, unhappy customers.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "No Visibility into Performance",
    description: "How are your salespeople really doing? Which jobs are profitable?",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Growing Pains",
    description: "Your current tools worked when you were small, but now they're holding you back.",
  },
];

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Sales Documents",
    description: "Create professional quotes and proposals in minutes.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Projects Board",
    description: "Track every project from sale to installation.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Payments & Stripe",
    description: "Accept payments and track cash flow easily.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Reports & Dashboards",
    description: "Real-time insights into your business performance.",
  },
];
