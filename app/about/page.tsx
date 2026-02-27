import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About xTriam",
  description:
    "xTriam is a software company that builds products for contractors — from Salesforce-native CRM to AI-powered invoicing.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About <span className="text-brand-blue-600">xTriam</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Software Built for Contractors
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                xTriam builds software that helps contractors run their
                businesses. We started in the window and door industry, where we
                saw firsthand how much time gets lost to manual processes,
                disconnected tools, and paperwork that never ends.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                That experience shaped everything we build. Today we serve
                contractors across the trades — from enterprise CRM to
                AI-powered invoicing — with products designed for how
                contractors actually work: in the field, on the go, and under
                pressure to get things done.
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 p-8">
              <h3 className="text-xl font-semibold text-foreground">
                What Sets Us Apart
              </h3>
              <ul className="mt-6 space-y-4">
                {differentiators.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-shrink-0 text-brand-orange-500"
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
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Approach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We build products that solve real problems for contractors —
              intuitive, multi-device, and ready for the field.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-100 text-2xl font-bold text-brand-blue-600">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Products
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Two products, one mission: help contractors spend less time on
              admin and more time on the work that pays.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* bpmPro Card */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-blue-600 to-brand-blue-800 p-8 lg:p-10">
              <div className="text-white">
                <div className="mb-2">
                  <Image
                    src="/images/logo/bpmpro-logo.png"
                    alt="bpmPro"
                    width={180}
                    height={55}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-brand-blue-200">
                  Salesforce-Native CRM for Window & Door Contractors
                </p>
                <p className="mt-4 text-brand-blue-100">
                  The all-in-one platform that manages the entire customer
                  journey — from lead capture to final payment. Built on
                  Salesforce for enterprise-grade reliability.
                </p>
                <ul className="mt-6 space-y-3">
                  {bpmProFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
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
                      <span className="text-brand-blue-50">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-6">
                  <div>
                    <div className="text-3xl font-bold">25+</div>
                    <div className="text-sm text-brand-blue-200">
                      Active Client Organizations
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/bpmpro">
                    <Button variant="accent" size="lg">
                      Learn More About <strong>bpmPro</strong>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* InvoiceTicket Card */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 lg:p-10">
              <div className="text-white">
                <div className="mb-2">
                  <Image
                    src="/images/logo/invoiceticket-logo-white.png"
                    alt="InvoiceTicket"
                    width={280}
                    height={55}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-emerald-200">
                  AI-Powered Invoicing for Small Contractors
                </p>
                <p className="mt-4 text-emerald-100">
                  Create and send professional invoices in seconds — by voice,
                  text, or photo. Built for contractors who work from the field,
                  not behind a desk.
                </p>
                <ul className="mt-6 space-y-3">
                  {invoiceTicketFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-emerald-300"
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
                      <span className="text-emerald-50">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-6">
                  <div>
                    <div className="text-3xl font-bold">Free</div>
                    <div className="text-sm text-emerald-200">
                      No Credit Card Required
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <a
                    href="https://invoiceticket.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="accent"
                      size="lg"
                    >
                      Try InvoiceTicket Free
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Ready to transform your business?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Explore our products and find the right fit for your contracting
                business.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/book-a-demo">
                <Button variant="accent" size="lg">
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

const differentiators = [
  "Founded by contractors, built for contractors",
  "Deep expertise in the window and door industry",
  "Products designed for the field, not just the office",
  "Focus on small and medium-sized businesses",
  "AI-first approach to everyday business tasks",
];

const approach = [
  {
    title: "Understand",
    description:
      "We study how contractors actually work — in the field, in the office, and everywhere in between.",
  },
  {
    title: "Build",
    description:
      "We design products that fit the workflow, not the other way around.",
  },
  {
    title: "Deploy",
    description:
      "We get you up and running quickly with hands-on onboarding and setup.",
  },
  {
    title: "Support",
    description:
      "We provide ongoing training and support so your team gets the most out of every tool.",
  },
];

const bpmProFeatures = [
  "Lead generation management",
  "Sales and estimating functionality",
  "Order management",
  "Customer communications platform",
  "Project tracking and management",
  "Reporting and analytics",
];

const invoiceTicketFeatures = [
  "Voice and text invoice creation",
  "Bilingual support (English & Spanish)",
  "Receipt and document scanning",
  "Online payments via Stripe",
  "Professional PDF invoices",
  "Works from any phone or tablet",
];
