import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Import ES Windows Quotes into bpmPro | Window Contractor CRM",
  description:
    "Import your ES Windows quotes directly into bpmPro — no manual re-entry. Product specs, pricing, and configurations transfer automatically into your CRM.",
};

export default function ESWindowsImportPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-20 lg:py-28">
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
              Quickly Import Your{" "}
              <span className="text-brand-blue-600">ES Windows Quotes</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Already using ES Windows for quoting? Import your quotes directly
              into <strong>bpmPro</strong> and manage your entire workflow in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/book-a-demo">
                <Button variant="accent" size="lg">
                  Learn More
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contractors Struggle with Manual Quote Entry */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Why Contractors Struggle with Manual Quote Entry
            </h2>
            <p className="mt-4 text-muted-foreground">
              Re-typing quotes from ES Windows into another system wastes hours
              every week and introduces costly mistakes.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 text-center shadow-sm border border-border"
              >
                <div className="text-3xl font-bold text-brand-blue-600">
                  {point.value}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">
                  {point.label}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-muted-foreground">
              Importing ES Windows quotes is simple and straightforward.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-600 text-2xl font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-4 text-muted-foreground">{step.description}</p>
                <ul className="mt-4 space-y-2 text-left">
                  {step.bullets.map((bullet, i) => (
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

      {/* What Gets Imported */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              What Gets Imported
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every detail from your ES Windows quote transfers into bpmPro
              automatically — no manual re-entry required.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {importedData.map((item, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 text-center shadow-sm border border-border"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Benefits of Integration
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 shadow-sm border border-border"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange-100 text-brand-orange-600">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
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

      {/* Works Alongside Your Other Tools */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Works Alongside Your Other Tools
            </h2>
            <p className="mt-4 text-muted-foreground">
              bpmPro connects with the tools window contractors already use,
              keeping your data in sync across your entire workflow.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 text-center shadow-sm border border-border"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                  {integration.icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {integration.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Results from Real Contractors */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Real Results from Real Contractors
              </h2>
              <p className="mt-6 text-muted-foreground">
                bpmPro was created by a team that has been in the home services,
                construction, and real estate industry since 2003. We built the
                ES Windows integration because our customers asked for it — and
                the time savings speak for themselves.
              </p>
              <blockquote className="mt-8 border-l-4 border-brand-blue-600 pl-4">
                <p className="text-foreground italic">
                  &ldquo;We used to spend over an hour re-entering ES Windows
                  quotes into our system. With bpmPro, it takes seconds. That
                  alone saves us 60 hours a month.&rdquo;
                </p>
                <footer className="mt-3 text-sm text-muted-foreground">
                  — Anthony Infante, TISW Corp
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
            <div className="rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-blue-700 p-8 text-white">
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
      <section className="bg-brand-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to streamline your ES Windows workflow?
          </h2>
          <p className="mt-4 text-brand-blue-100">
            Contact us to learn more about ES Windows integration with <strong>bpmPro</strong>.
          </p>
          <div className="mt-8">
            <Link href="/book-a-demo">
              <Button variant="accent" size="lg">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const painPoints = [
  {
    value: "45 min",
    label: "Per Quote Re-entered",
    detail: "Typing specs from ES Windows into another system by hand",
  },
  {
    value: "12%",
    label: "Quotes With Transcription Errors",
    detail: "Wrong sizes, quantities, or pricing from manual data entry",
  },
  {
    value: "3–4 hrs",
    label: "Lost Daily",
    detail: "For teams handling 5+ quotes per day across systems",
  },
  {
    value: "2x",
    label: "Slower Close Rate",
    detail: "Delays from manual handoffs between quoting and CRM",
  },
];

const steps = [
  {
    title: "Export from ES Windows",
    description: "Export your quotes from ES Windows in the supported format.",
    bullets: [
      "Create or open your quote in ES Windows",
      "Use File → Export to save as CSV or Excel",
      "All product specs, quantities, and pricing are included",
    ],
  },
  {
    title: "Import into bpmPro",
    description: "Use our import tool to bring your quotes into bpmPro.",
    bullets: [
      "Open the Opportunity or Quote record in bpmPro",
      "Click \"Import ES Windows Quote\" and select your file",
      "Preview imported line items before confirming",
    ],
  },
  {
    title: "Manage & Track",
    description: "Track orders, payments, and installations all in one place.",
    bullets: [
      "Quotes flow into your sales pipeline automatically",
      "Track through order, scheduling, and installation stages",
      "Generate invoices and collect payments without re-entering data",
    ],
  },
];

const importedData = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Product Names",
    description: "Window and door specs with full model details",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
    title: "Quantities",
    description: "Unit counts for each line item",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Unit Prices",
    description: "Per-unit pricing from your ES Windows config",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Total Amounts",
    description: "Calculated line item totals",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Configurations",
    description: "Custom specs like sizes, glass types, and frame colors",
  },
];

const benefits = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Save Time",
    description: "No manual re-entry of quote data.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Reduce Errors",
    description: "Eliminate data entry mistakes.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Faster Workflow",
    description: "Quote to order in less time.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Better Reporting",
    description: "All data in one system.",
  },
];

const integrations = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    name: "ES Windows",
    description: "Import quotes directly",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    name: "Mr. Glass",
    description: "Product imagery and manufacturer data",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    name: "Stripe",
    description: "Accept payments via payment links",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    name: "QuickBooks",
    description: "Sync invoices and payments to accounting",
  },
];

const verifiedResults = [
  {
    stat: "75%",
    label: "Time savings in quoting",
    source: "Nour Aljamal — Hurricane Window & Screen",
  },
  {
    stat: "60 hrs",
    label: "Saved monthly on quoting",
    source: "Anthony Infante — TISW Corp",
  },
  {
    stat: "80%",
    label: "Reduction in admin time",
    source: "Mohammad Aljamal — Hurricane Window & Screen",
  },
  {
    stat: "50%",
    label: "Increase in net profits",
    source: "Hisham Aljamal — Hurricane Window & Screen",
  },
];
