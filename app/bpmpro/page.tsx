import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Meet bpmPro - Business Process Management for Window Pros",
  description:
    "bpmPro is an all-in-one business process management platform designed specifically for window and door professionals. Digitize operations, manage customer journeys, and automate workflows.",
};

export default function BpmProPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The Business Process Management Software{" "}
              <span className="text-brand-blue-600">For Window Pros</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              <strong>bpmPro</strong> is your all-in-one solution to digitize operations, manage
              the customer journey from lead to payment, generate proposals
              quickly, and automate routine communications.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/book-a-demo">
                <Button variant="accent" size="lg">
                  Book a Demo
                </Button>
              </Link>
              <Link href="/bpmpro-features">
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Window Contractors Choose <strong>bpmPro</strong>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Eight powerful advantages that transform how you run your business
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="relative rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built on Salesforce Section */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built on Salesforce
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                <strong>bpmPro</strong> is a Salesforce-native managed package, which means you
                get the reliability, security, and scalability of the world's #1
                CRM platform.
              </p>
              <ul className="mt-8 space-y-4">
                {salesforceFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-brand-blue-600"
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
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-brand-blue-500 to-brand-blue-700 p-8 text-white">
              <h3 className="text-2xl font-bold">Enterprise-Grade Security</h3>
              <p className="mt-4 text-brand-blue-100">
                Your data is protected by Salesforce's industry-leading security
                infrastructure, including SOC 2 Type II compliance, encryption
                at rest and in transit, and regular security audits.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="mt-1 text-sm text-brand-blue-200">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">25+</div>
                  <div className="mt-1 text-sm text-brand-blue-200">
                    Active Clients
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-orange-500 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to see <strong>bpmPro</strong> in action?
              </h2>
              <p className="mt-2 text-white/90">
                Schedule a personalized demo and see how <strong>bpmPro</strong> can transform
                your business.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/savings">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-brand-orange-600 hover:bg-brand-orange-50"
                >
                  Calculate Savings
                </Button>
              </Link>
              <Link href="/book-a-demo">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-brand-blue-600 hover:bg-brand-blue-700"
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

const benefits = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Cash Flow Recovery",
    description: "Increase profitability through enhanced productivity and streamlined operations.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Competitive Edge",
    description: "Data-driven insights, real-time KPIs, and comprehensive reporting at your fingertips.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Business Growth",
    description: "Boost productivity across lead management, sales, and project execution.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Workflow Optimization",
    description: "Automate quotes, orders, inventory tracking, and project management.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Process Automation",
    description: "Handle routine tasks and communications, freeing your team for strategic work.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Customer Experience",
    description: "Track interactions and deliver timely updates throughout the customer lifecycle.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Scalability",
    description: "Adapts to businesses from small dealerships to large enterprises.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Control & Efficiency",
    description: "Centralize automation capabilities to drive productivity gains.",
  },
];

const salesforceFeatures = [
  "Cloud-based access from any device, anywhere",
  "Automatic updates and maintenance",
  "Seamless integration with other Salesforce apps",
  "Robust reporting and analytics",
  "Multi-user collaboration in real-time",
  "Mobile app for iOS and Android",
];
