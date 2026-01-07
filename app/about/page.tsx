import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About xTriam",
  description:
    "xTriam is a technology consulting firm focused on improving profitability for window and door businesses through process optimization and operational streamlining.",
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
              Profitability Through Process Automation
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
                xTriam is a technology consulting firm focused on improving
                profitability for small and medium-sized businesses through
                process optimization and operational streamlining.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                We specifically serve manufacturers, dealers, and suppliers in
                the windows and doors industry, combining in-depth industry
                expertise with hands-on software development to create digital
                business transformations.
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
              We design user-friendly, intuitive web-based, multi-device
              solutions that transform how you do business.
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

      {/* bpmPro Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-brand-blue-600 to-brand-blue-800 p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="text-white">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Our Flagship Product: <strong>bpmPro</strong>
                </h2>
                <p className="mt-4 text-brand-blue-100">
                  <strong>bpmPro</strong> is our Salesforce-native business process management
                  platform designed specifically for window and door
                  professionals.
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
                <div className="mt-8">
                  <Link href="/bpmpro">
                    <Button
                      variant="accent"
                      size="lg"
                    >
                      Learn More About <strong>bpmPro</strong>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-xl bg-white/10 p-8 text-center backdrop-blur">
                  <div className="text-5xl font-bold text-white">25+</div>
                  <div className="mt-2 text-brand-blue-200">
                    Active Client Organizations
                  </div>
                  <div className="mt-6 text-5xl font-bold text-white">
                    Florida
                  </div>
                  <div className="mt-2 text-brand-blue-200">
                    Focused on Window & Door Industry
                  </div>
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
                Let's discuss how xTriam can help streamline your operations.
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
  "Deep expertise in the window and door industry",
  "Hands-on software development experience",
  "Focus on small and medium-sized businesses",
  "User-friendly, intuitive solutions",
  "Built on the trusted Salesforce platform",
];

const approach = [
  {
    title: "Understand",
    description: "We learn your business processes and identify pain points.",
  },
  {
    title: "Design",
    description: "We create solutions tailored to your specific needs.",
  },
  {
    title: "Implement",
    description: "We deploy and configure bpmPro for your organization.",
  },
  {
    title: "Support",
    description: "We provide ongoing training and support for your team.",
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
