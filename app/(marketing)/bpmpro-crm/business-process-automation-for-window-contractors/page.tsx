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

      {/* How bpmPro Automates Your Business */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              How bpmPro Automates Your Business
            </h2>
            <p className="mt-4 text-muted-foreground">
              From first contact to final payment, bpmPro handles every step of
              your window contracting workflow.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {automationAreas.map((area, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 shadow-sm border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                    {area.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {area.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {area.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {area.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built on Salesforce */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Built on Salesforce
            </h2>
            <p className="mt-4 text-muted-foreground">
              bpmPro runs on the world&apos;s #1 CRM platform, giving you
              enterprise-grade reliability, security, and scalability without
              enterprise complexity.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-brand-blue-600">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
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

const automationAreas = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Lead Capture & Follow-Up",
    description:
      "Automatically create leads from web forms, assign them to sales reps, and schedule follow-up reminders so no opportunity falls through the cracks.",
    bullets: [
      "Web-to-lead capture with automatic assignment",
      "Scheduled follow-up tasks and reminders",
      "Lead status tracking through your sales pipeline",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Quoting & Proposals",
    description:
      "Generate professional PDF proposals with automated pricing calculations, tax handling, and price anchoring. Clone previous quotes to save time.",
    bullets: [
      "Automated pricing with tax and discount calculations",
      "Professional branded PDF proposals",
      "Clone and modify previous quotes in seconds",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Order Processing",
    description:
      "Move from signed proposal to production order with the Close Deal Wizard. Automated stage progression tracks every project through your pipeline.",
    bullets: [
      "One-click Close Deal Wizard",
      "Automatic stage progression and status updates",
      "Full audit trail from quote to completion",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "Scheduling & Project Tracking",
    description:
      "Visual Projects Board with color-coded stages, traffic light dashboard, and automatic notifications when projects move between stages.",
    bullets: [
      "Drag-and-drop Projects Board",
      "Color-coded traffic light status indicators",
      "Automatic notifications on stage changes",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Invoicing & Payments",
    description:
      "Send payment links via Stripe, track invoices, apply credits, and automatically record payments. Integrated with QuickBooks for accounting sync.",
    bullets: [
      "Stripe-powered payment links",
      "Automatic payment recording and invoice tracking",
      "QuickBooks integration for accounting sync",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Reporting & Commissions",
    description:
      "Command Center dashboard, sales commission tracking with chargeback support, and customizable KPIs so you always know where your business stands.",
    bullets: [
      "Command Center dashboard with real-time KPIs",
      "Automated commission calculations with chargeback support",
      "Customizable reports and performance tracking",
    ],
  },
];

const stats = [
  { value: "50+", label: "Features" },
  { value: "99.9%", label: "Uptime" },
  { value: "25+", label: "Active Clients" },
  { value: "Mobile", label: "Ready" },
];
