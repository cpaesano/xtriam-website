import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Payment Processing with Stripe Integration",
  description:
    "Accept payments seamlessly with bpmPro's built-in Stripe integration. Process deposits, progress payments, and final invoices directly in your CRM.",
};

export default function StripeIntegrationPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-blue-100 px-4 py-1.5 text-sm font-medium text-brand-blue-700 mb-6">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Secure Payments
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Payment Processing with{" "}
                <span className="text-brand-blue-600">Stripe Integration</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Get paid faster with <strong>bpmPro</strong>'s seamless Stripe integration.
                Accept credit cards, send payment links, and track every
                transaction—all without leaving your CRM.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <Link href="/book-a-demo">
                  <Button variant="accent" size="lg">
                    See It in Action
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl bg-white p-8 shadow-xl border border-border">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-muted-foreground">
                    Payment Request
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Secure
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Project</span>
                    <span className="font-medium">Johnson Residence</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Invoice #</span>
                    <span className="font-medium">INV-2024-0847</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-muted-foreground">Amount Due</span>
                    <span className="text-2xl font-bold text-brand-blue-600">
                      $4,250.00
                    </span>
                  </div>
                  <button className="w-full bg-brand-blue-600 text-white py-3 rounded-lg font-medium hover:bg-brand-blue-700 transition-colors">
                    Pay with Card
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Secured by Stripe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Payments Made Simple
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to collect payments from your customers.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Types */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Flexible Payment Options
            </h2>
            <p className="mt-4 text-muted-foreground">
              Collect payments at every stage of your projects.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {paymentTypes.map((type, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-8 shadow-sm border border-border text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange-100 text-brand-orange-600 text-2xl font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {type.title}
                </h3>
                <p className="mt-4 text-muted-foreground">{type.description}</p>
                <div className="mt-4 text-sm text-brand-blue-600 font-medium">
                  {type.typical}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Why Contractors Love Our Payment System
              </h2>
              <div className="mt-8 space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-blue-800 p-8 text-white">
              <h3 className="text-xl font-semibold">Average Results</h3>
              <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold">3x</div>
                  <div className="mt-2 text-brand-blue-200">
                    Faster payment collection
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold">50%</div>
                  <div className="mt-2 text-brand-blue-200">
                    Reduction in late payments
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold">$0</div>
                  <div className="mt-2 text-brand-blue-200">
                    Setup or monthly fees
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold">24/7</div>
                  <div className="mt-2 text-brand-blue-200">
                    Customers can pay anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Enterprise-Grade Security
            </h2>
            <p className="mt-4 text-muted-foreground">
              Stripe is trusted by millions of businesses worldwide. Your
              customers' payment information is always secure with PCI-DSS Level
              1 compliance—the highest level of certification.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="h-5 w-5 text-green-600"
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
                PCI-DSS Level 1
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="h-5 w-5 text-green-600"
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
                256-bit Encryption
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="h-5 w-5 text-green-600"
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
                Fraud Protection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to get paid faster?
          </h2>
          <p className="mt-4 text-brand-blue-100">
            See how Stripe integration can improve your cash flow.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/book-a-demo">
              <Button variant="accent" size="lg">
                Schedule a Demo
              </Button>
            </Link>
            <Link href="/savings">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-brand-blue-600 hover:bg-brand-blue-50"
              >
                Calculate Savings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: (
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
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    title: "Payment Links",
    description:
      "Send customers a secure link via email or text. They can pay in seconds from any device.",
  },
  {
    icon: (
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
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    title: "All Major Cards",
    description:
      "Accept Visa, Mastercard, American Express, Discover, and more. No extra setup required.",
  },
  {
    icon: (
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Automatic Recording",
    description:
      "Every payment is automatically logged in bpmPro. No manual reconciliation needed.",
  },
  {
    icon: (
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
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Payment Reminders",
    description:
      "Automatically send payment reminders for outstanding balances. Stop chasing payments.",
  },
  {
    icon: (
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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Real-time Reporting",
    description:
      "See payment status, track deposits, and generate reports all in one dashboard.",
  },
  {
    icon: (
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
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Mobile Friendly",
    description:
      "Customers can pay from their phone, tablet, or computer. Works everywhere.",
  },
];

const paymentTypes = [
  {
    title: "Deposits",
    description:
      "Secure the job with upfront deposits. Customers receive a payment link immediately after signing.",
    typical: "Typically 30-50% of project",
  },
  {
    title: "Progress Payments",
    description:
      "Collect payments at key milestones like material delivery or installation start.",
    typical: "Split remaining balance",
  },
  {
    title: "Final Payment",
    description:
      "Collect final payment upon project completion. Send link before your crew leaves the site.",
    typical: "Remaining balance",
  },
];

const benefits = [
  {
    title: "No More Chasing Checks",
    description:
      "Customers can pay instantly online. No more waiting for checks in the mail or trips to the bank.",
  },
  {
    title: "Faster Cash Flow",
    description:
      "Funds typically arrive in your bank account within 2 business days. Some same-day payouts available.",
  },
  {
    title: "Professional Image",
    description:
      "Branded payment pages show customers you run a modern, professional operation.",
  },
  {
    title: "Automatic Reconciliation",
    description:
      "Payments sync directly to your project records. Your books are always up to date.",
  },
];
