import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Eliminate Manual Processes",
  description:
    "Stop wasting time on spreadsheets and paperwork. bpmPro digitizes your window contracting business.",
};

export default function EliminateManualProcessesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-orange-50 to-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
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

      {/* Problems & Solutions */}
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

      {/* CTA Section */}
      <section className="bg-brand-orange-500 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to go digital?
          </h2>
          <p className="mt-4 text-brand-orange-100">
            See how much time you'll save by eliminating manual processes.
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
