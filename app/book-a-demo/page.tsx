import { Metadata } from "next";
import { CalendlyEmbed } from "@/components/ui";
import { Calendar, Clock, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Demo | bpmPro",
  description:
    "Schedule a personalized demo of bpmPro and see how it can transform your window and door business.",
  openGraph: {
    title: "Book a Demo | See bpmPro for Window Pros",
    description:
      "Schedule a personalized demo of bpmPro and see how it can transform your window and door business.",
    url: "https://xtriam.com/book-a-demo",
  },
  twitter: {
    title: "Book a Demo | See bpmPro for Window Pros",
    description:
      "Schedule a personalized demo of bpmPro and see how it can transform your window and door business.",
  },
};

export default function BookDemoPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-orange-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Experience the Power of{" "}
              <span className="text-brand-orange-500">bpmPro</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Schedule a personalized demo and see how <strong>bpmPro</strong> can transform your
              window and door business.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Benefits + Calendly */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                What to Expect
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our demos are personalized to your business. We'll show you
                exactly how <strong>bpmPro</strong> can solve your specific challenges.
              </p>

              <div className="mt-8 space-y-6">
                {demoFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl bg-muted/50 p-6">
                <h3 className="font-semibold text-foreground">
                  Prefer to talk first?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Call us at{" "}
                  <a
                    href="tel:305-204-9694"
                    className="text-brand-blue-600 hover:underline"
                  >
                    (305) 204-9694
                  </a>{" "}
                  or email{" "}
                  <a
                    href="mailto:sales@xtriam.com"
                    className="text-brand-blue-600 hover:underline"
                  >
                    sales@xtriam.com
                  </a>
                </p>
              </div>
            </div>

            {/* Calendly Embed */}
            <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
              <CalendlyEmbed
                url="https://calendly.com/cpaesano/bpmpro-increase-profits-demo"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const demoFeatures = [
  {
    icon: <Video className="h-5 w-5" />,
    title: "Live Video Demo",
    description:
      "Join us on Google Meet for a live walkthrough of bpmPro tailored to your business.",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "30-45 Minutes",
    description:
      "We respect your time. Our demos are focused and efficient, covering what matters most to you.",
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    title: "Pick a Time That Works",
    description:
      "Choose from available slots that fit your schedule. Book instantly with Calendly.",
  },
];
