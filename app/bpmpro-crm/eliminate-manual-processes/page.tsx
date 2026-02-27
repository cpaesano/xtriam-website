import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Eliminate Manual Processes | bpmPro for Window Contractors",
  description:
    "Stop wasting time on spreadsheets and paperwork. bpmPro digitizes your window contracting business — from quotes and orders to invoicing and commissions.",
};

export default function EliminateManualProcessesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-orange-50 to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/logo/bpmpro-logo-transparent.png"
                alt="bpmPro"
                width={295}
                height={90}
                className="h-16 w-auto sm:h-20"
                priority
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Eliminate <span className="text-brand-orange-500">Manual Processes</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Spreadsheets, paper forms, and duplicate data entry are holding
              your business back. <strong>bpmPro</strong> digitizes everything so you can work
              smarter.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/book-a-demo">
                <Button variant="accent" size="lg">
                  See How It Works
                </Button>
              </Link>
              <Link href="/bpmpro-features">
                <Button variant="outline" size="lg">
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Hidden Cost of Manual Processes */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              The Hidden Cost of Manual Processes
            </h2>
            <p className="mt-4 text-muted-foreground">
              Most window contractors don&apos;t realize how much time and money
              manual workflows are costing them every month.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hiddenCosts.map((cost, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 text-center shadow-sm border border-border"
              >
                <div className="text-3xl font-bold text-brand-orange-500">
                  {cost.value}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">
                  {cost.label}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {cost.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Manual Chaos to Digital Clarity */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              From Manual Chaos to Digital Clarity
            </h2>
          </div>
          <div className="space-y-8">
            {transformations.map((item, index) => (
              <div
                key={index}
                className="grid gap-6 lg:grid-cols-2 items-center p-6 rounded-xl border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-red-600 font-medium">Before</div>
                    <div className="text-foreground">{item.before}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-green-600 font-medium">After <strong>bpmPro</strong></div>
                    <div className="text-foreground">{item.after}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How bpmPro Eliminates Manual Work */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              How bpmPro Eliminates Manual Work
            </h2>
            <p className="mt-4 text-muted-foreground">
              Six core capabilities that replace spreadsheets, whiteboards, and
              paper-based workflows with a single connected platform.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {eliminationAreas.map((area, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 shadow-sm border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange-100 text-brand-orange-600">
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
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Built for Window Contractors, by Window Contractors */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Built for Window Contractors, by Window Contractors
              </h2>
              <p className="mt-6 text-muted-foreground">
                bpmPro was created by a team that has been in the home services,
                construction, and real estate industry since 2003. We understand
                the daily challenges of running a window and door contracting
                business because we&apos;ve lived them firsthand.
              </p>
              <blockquote className="mt-8 border-l-4 border-brand-orange-500 pl-4">
                <p className="text-foreground italic">
                  &ldquo;bpmPro reduced our administrative workload by 80%. What
                  used to take our team hours of manual data entry now happens
                  automatically.&rdquo;
                </p>
                <footer className="mt-3 text-sm text-muted-foreground">
                  — Mohammad Aljamal, President, Hurricane Window &amp; Screen
                </footer>
              </blockquote>
              <div className="mt-8">
                <Link href="/customer-success-stories">
                  <Button variant="outline">
                    Read More Success Stories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 p-8 text-white">
              <h3 className="text-xl font-bold">Verified Results</h3>
              <p className="mt-2 text-sm text-white/80">
                Real numbers from real window contractors using bpmPro
              </p>
              <div className="mt-8 space-y-6">
                {verifiedResults.map((result, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl font-bold">{result.stat}</div>
                    <div>
                      <div className="text-sm font-medium">{result.label}</div>
                      <div className="text-xs text-white/70">{result.source}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-orange-500 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to go digital?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            See how much time you&apos;ll save by eliminating manual processes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
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
      </section>
    </div>
  );
}

const hiddenCosts = [
  {
    value: "15+ hrs",
    label: "Lost Per Week",
    detail: "Duplicate data entry across spreadsheets and systems",
  },
  {
    value: "23%",
    label: "Quotes With Errors",
    detail: "Manual calculations leading to pricing mistakes",
  },
  {
    value: "$4,800",
    label: "Monthly Cost",
    detail: "Admin inefficiency for a 10-person contracting team",
  },
  {
    value: "3–5 days",
    label: "Handoff Delays",
    detail: "Whiteboard-based tracking slowing project transitions",
  },
];

const transformations = [
  {
    before: "Quotes in Excel spreadsheets with inconsistent formatting",
    after: "Professional proposals generated in minutes with your branding",
  },
  {
    before: "Order tracking on whiteboards and sticky notes",
    after: "Real-time project visibility in your Projects Board",
  },
  {
    before: "Manual data entry into multiple systems",
    after: "Single source of truth with automatic sync",
  },
  {
    before: "Paper inspection reports and permits",
    after: "Digital documentation with photo uploads and reminders",
  },
  {
    before: "Commission calculations in spreadsheets",
    after: "Automatic commission tracking based on your rules",
  },
];

const eliminationAreas = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Automated Quote Generation",
    description:
      "Generate branded PDF proposals with automated pricing, tax calculations, and price anchoring — no more copying formulas in Excel.",
    bullets: [
      "Automatic pricing with tax and discount calculations",
      "Professional branded PDFs sent directly to customers",
      "Clone and modify previous quotes in seconds",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "Digital Project Tracking",
    description:
      "Replace whiteboards and sticky notes with the Projects Board — a visual, color-coded dashboard that tracks every job from sale to installation.",
    bullets: [
      "Drag-and-drop Projects Board with color-coded stages",
      "Traffic light dashboard for at-a-glance status",
      "Automatic notifications when projects change stage",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "One-Click Order Processing",
    description:
      "The Close Deal Wizard moves a signed quote to a production order in a single click — no re-entering data, no missed steps.",
    bullets: [
      "Close Deal Wizard automates the quote-to-order handoff",
      "Automatic stage progression and status updates",
      "Full audit trail from quote to completed installation",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Paperless Documentation",
    description:
      "Upload site photos, permits, and inspection reports directly to each project record. Everything is stored in the cloud and accessible from any device.",
    bullets: [
      "Photo uploads tied to specific project records",
      "Permit and inspection tracking with reminders",
      "Cloud storage accessible from office or field",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Automated Invoicing & Payments",
    description:
      "Send Stripe-powered payment links, track invoices, apply credits, and automatically record payments — no more chasing checks or manually updating spreadsheets.",
    bullets: [
      "Stripe-powered payment links sent via email or text",
      "Automatic payment recording and invoice tracking",
      "Credit management and partial payment support",
    ],
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Commission & Reporting Automation",
    description:
      "Set up rule-based commission structures and let bpmPro calculate payouts automatically. The Command Center dashboard gives you real-time KPIs at a glance.",
    bullets: [
      "Rule-based commission calculations with chargeback support",
      "Command Center dashboard with real-time business KPIs",
      "Customizable reports for sales, revenue, and pipeline",
    ],
  },
];

const verifiedResults = [
  {
    stat: "80%",
    label: "Reduction in admin time",
    source: "Mohammad Aljamal — Hurricane Window & Screen",
  },
  {
    stat: "75%",
    label: "Time savings in quoting",
    source: "Nour Aljamal — Hurricane Window & Screen",
  },
  {
    stat: "50%",
    label: "Increase in net profits",
    source: "Hisham Aljamal — Hurricane Window & Screen",
  },
  {
    stat: "60 hrs",
    label: "Saved monthly on quoting",
    source: "Anthony Infante — TISW Corp",
  },
];
