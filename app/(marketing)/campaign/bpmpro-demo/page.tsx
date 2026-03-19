import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { YouTubeFacade } from "@/components/ui/YouTubeFacade";

export const metadata: Metadata = {
  title:
    "Complete Business Management for Window & Door Contractors | bpmPro by xTriam",
  description:
    "bpmPro is the CRM built by a window contractor, for window contractors. Quoting, project management, ES Windows integration, scheduling, and payments — all in one platform. Book a free demo.",
  robots: { index: false, follow: false },
};

const UTM =
  "?utm_source=email&utm_medium=sendgrid&utm_campaign=bpmpro-2026-q1&utm_content=landing-page";

export default function BpmProDemoPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center rounded-full bg-brand-orange-100 px-4 py-1.5 text-sm font-medium text-brand-orange-700">
                Built for Window & Door Contractors
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Run Your Entire Business{" "}
                <span className="text-brand-blue-600">From One Platform</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                <strong>bpmPro</strong> handles quoting, project management,
                scheduling, vendor coordination, and payments — built
                specifically for window and door professionals by someone
                who&apos;s been in the industry since 2003.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href={`/book-a-demo${UTM}`}>
                  <Button variant="accent" size="lg">
                    Book a Free Demo
                  </Button>
                </Link>
                <Link href={`/savings${UTM}`}>
                  <Button variant="outline" size="lg">
                    Calculate Your Savings
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <picture>
                <source
                  srcSet="/images/hero/Multi-Device-MockUp-Wide-Format-480.webp 480w, /images/hero/Multi-Device-MockUp-Wide-Format-800.webp 800w, /images/hero/Multi-Device-MockUp-Wide-Format-1200.webp 1200w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/webp"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/Multi-Device-MockUp-Wide-Format-1200.webp"
                  alt="bpmPro on multiple devices - desktop, tablet, and mobile"
                  width={1200}
                  height={639}
                  className="w-full h-auto"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The Numbers Speak for Themselves
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Window and door companies using <strong>bpmPro</strong> see
              measurable savings from day one.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {roiScenarios.map((scenario, index) => (
              <div
                key={index}
                className={`rounded-xl border p-8 text-center shadow-sm ${
                  index === 1
                    ? "border-brand-orange-300 bg-brand-orange-50 ring-2 ring-brand-orange-200"
                    : "border-border bg-background"
                }`}
              >
                {index === 1 && (
                  <div className="mb-4 inline-flex items-center rounded-full bg-brand-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    Most Common
                  </div>
                )}
                <div className="text-sm font-medium text-muted-foreground">
                  {scenario.label}
                </div>
                <div className="mt-2 text-4xl font-bold text-brand-orange-500">
                  ${scenario.savings.toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  saved per month
                </div>
                <div className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                  That&apos;s{" "}
                  <span className="font-semibold text-foreground">
                    ${(scenario.savings * 12).toLocaleString()}/year
                  </span>{" "}
                  back in your pocket
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href={`/savings${UTM}`}>
              <Button variant="outline">
                Calculate Your Exact Savings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need — Nothing You Don&apos;t
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every feature exists because a real window contractor needed it in
              their real business.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-background p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                  {cap.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Window & Door Pros
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-8 text-center shadow-sm border border-border"
              >
                <div className="text-4xl font-bold text-brand-orange-500">
                  {point.metric}
                </div>
                <div className="mt-2 font-semibold text-foreground">
                  {point.label}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 mx-auto max-w-2xl">
            <div className="rounded-xl bg-muted/50 p-8">
              <blockquote className="border-l-4 border-brand-orange-500 pl-4 italic text-muted-foreground">
                &ldquo;<strong>bpmPro</strong> has made quoting so much faster.
                What used to take hours now takes minutes.&rdquo;
              </blockquote>
              <div className="mt-4">
                <div className="font-semibold text-foreground">
                  Nour Aljamal
                </div>
                <div className="text-sm text-muted-foreground">
                  Sales Representative, Hurricane Window & Screen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* InvoiceTicket Spotlight */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                Also From xTriam
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                We Also Built InvoiceTicket
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Need to send an invoice from the field? InvoiceTicket lets you
                create professional invoices by voice, text, or photo — in
                seconds. Free to start, no credit card required.
              </p>
              <p className="mt-4 text-muted-foreground">
                It&apos;s proof that we don&apos;t just build one product and
                stop. We&apos;re actively building tools for the trades — and
                we&apos;re just getting started.
              </p>
              <div className="mt-6">
                <a
                  href={`https://invoiceticket.com${UTM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    Try InvoiceTicket Free
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[320px]">
                <YouTubeFacade
                  videoId="fIEb-DhxZFE"
                  title="InvoiceTicket - Voice to Invoice in Seconds"
                  className="!aspect-[9/16]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Build Section */}
      <section className="bg-brand-blue-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Have a Pain Point We Haven&apos;t Covered?
            </h2>
            <p className="mt-6 text-lg text-brand-blue-200">
              We&apos;ve been building software for window and door
              professionals since 2003. If your business has a process problem,
              we can build a solution — not a generic tool that almost works, but
              something designed for how you actually operate.
            </p>
            <p className="mt-4 text-brand-blue-300">
              Tell us what&apos;s slowing you down. We&apos;ll tell you if we
              can fix it.
            </p>
            <div className="mt-10">
              <Link href={`/contact${UTM}`}>
                <Button
                  variant="accent"
                  size="lg"
                >
                  Tell Us What You Need
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-orange-500 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to see <strong>bpmPro</strong> in action?
              </h2>
              <p className="mt-2 text-lg text-white/90">
                20 minutes on Zoom. No pressure, no hard sell — just a straight
                demo from one industry person to another.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/book-a-demo${UTM}`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-brand-orange-600 hover:bg-brand-orange-50"
                >
                  Book a Free Demo
                </Button>
              </Link>
              <a href="mailto:cpaesano@xtriam.com">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Email Carlos Directly
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const roiScenarios = [
  { label: "2-Rep Shop", savings: 2868 },
  { label: "4-Rep Company", savings: 5970 },
  { label: "6-Rep Operation", savings: 9073 },
];

const proofPoints = [
  {
    metric: "Since 2003",
    label: "In the Industry",
    description:
      "Founded by a former installer who ran his own window business.",
  },
  {
    metric: "25+",
    label: "Active Client Orgs",
    description:
      "Window and door companies across Florida and beyond.",
  },
  {
    metric: "$150M+",
    label: "Revenue Managed",
    description: "Through bpmPro across all subscriber organizations.",
  },
  {
    metric: "75%",
    label: "Faster Quoting",
    description:
      "What used to take hours now takes minutes with bpmPro.",
  },
];

const capabilities = [
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
    title: "Professional Quoting",
    description:
      "Create window and door proposals with industry-specific line items, sizes, types, and installation details. 75% faster than manual quoting.",
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
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    title: "Project Management",
    description:
      "Visual drag-and-drop Projects Board tracks every job from quote to final inspection. Nothing falls through the cracks.",
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
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    ),
    title: "ES Windows Import",
    description:
      "Import ES Windows quotes directly into bpmPro with one click. No more double entry between your quoting tool and your CRM.",
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
    title: "Scheduling & Coordination",
    description:
      "Schedule installations, manage crews, and coordinate with customers — all from one place. No more double-bookings.",
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
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Vendor Management",
    description:
      "Track purchase orders, vendor communications, and material deliveries. Know exactly where every order stands.",
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
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Payments via Stripe",
    description:
      "Accept payments, track deposits, and manage cash flow. Integrated Stripe processing means you get paid faster.",
  },
];
