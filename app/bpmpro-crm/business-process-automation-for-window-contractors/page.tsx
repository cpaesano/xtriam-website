import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Business Process Automation for Window Contractors",
  description:
    "Automate your window contracting business with bpmPro. Streamline quotes, orders, scheduling, and payments in one platform.",
};

export default function BusinessProcessAutomationPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Business Process Automation for{" "}
              <span className="text-brand-blue-600">Window Contractors</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Stop wasting time on manual tasks. <strong>bpmPro</strong> automates your quotes,
              orders, scheduling, and payments so you can focus on growing your
              business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/book-a-demo">
                <Button variant="accent" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/savings">
                <Button variant="outline" size="lg">
                  Calculate Savings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-100 text-brand-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to automate your window business?
          </h2>
          <p className="mt-4 text-brand-blue-100">
            Join other Florida contractors who've transformed their operations
            with <strong>bpmPro</strong>.
          </p>
          <div className="mt-8">
            <Link href="/book-a-demo">
              <Button variant="accent" size="lg">
                Book Your Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const benefits = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Faster Quotes",
    description: "Generate professional proposals in minutes instead of hours with automated calculations.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Streamlined Workflows",
    description: "Automate repetitive tasks like order processing, scheduling, and customer follow-ups.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Better Cash Flow",
    description: "Track payments, send reminders, and get paid faster with integrated payment processing.",
  },
];
