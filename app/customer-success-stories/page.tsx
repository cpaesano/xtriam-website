import { Metadata } from "next";
import Link from "next/link";
import { Button, VimeoEmbed } from "@/components/ui";
import { Quote, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Success Stories",
  description:
    "See how window and door contractors are growing their businesses with bpmPro. Real results from real customers.",
};

export default function SuccessStoriesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Customer Success Stories
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              See how window and door contractors are transforming their
              businesses with bpmPro.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-brand-blue-600">
                  {stat.value}
                </div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hear From Our Customers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch how bpmPro has transformed these window and door businesses.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-background overflow-hidden shadow-sm"
              >
                <VimeoEmbed videoId={video.vimeoId} title={video.title} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">
                    {video.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-medium text-foreground">{video.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{video.role}</span>
                  </div>
                  <div className="text-brand-blue-600 font-medium">
                    {video.company}
                  </div>
                  <p className="mt-3 text-muted-foreground">
                    {video.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-orange-100 px-3 py-1 text-sm font-medium text-brand-orange-700">
                    {video.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Testimonials */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-background p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange-100 text-brand-orange-500">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="mt-4 text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </div>
                  <div className="text-sm text-brand-blue-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Real Results
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our customers see measurable improvements across their operations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="rounded-xl bg-background p-8 text-center shadow-sm border border-border"
              >
                <div className="text-4xl font-bold text-brand-orange-500">
                  {result.metric}
                </div>
                <div className="mt-2 font-semibold text-foreground">
                  {result.label}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Write Your Success Story?
            </h2>
            <p className="mt-4 text-brand-blue-100">
              Join other window and door contractors who have transformed their
              businesses with bpmPro.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/savings">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-brand-blue-600 hover:bg-brand-blue-50"
                >
                  Calculate Your Savings
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

const videoTestimonials = [
  {
    vimeoId: "842923160",
    title: "Boost Staff Performance",
    name: "Mohammad Aljamal",
    role: "President",
    company: "Hurricane Window and Screen",
    description:
      "Mohammad faced challenges in managing business operations as the company grew. bpmPro helped them overcome these challenges.",
    result: "80% reduction in administrative time",
  },
  {
    vimeoId: "843072856",
    title: "Streamline Operations",
    name: "Michele Diaz",
    role: "President",
    company: "Palm Aluminum & Glass",
    description:
      "Michele dedicated five to six years to finding the right software to assist with their window business operations. bpmPro delivered with a highly user-friendly interface.",
    result: "Streamlined entire operations",
  },
];

const stats = [
  { value: "12+", label: "Active Clients" },
  { value: "1000+", label: "Projects Managed" },
  { value: "50%", label: "Time Saved" },
  { value: "99.9%", label: "Uptime" },
];

const testimonials = [
  {
    quote:
      "bpmPro has completely transformed how we manage our window installation business. What used to take hours now takes minutes.",
    name: "Window Professional",
    title: "Owner",
    company: "Florida Window Contractor",
  },
  {
    quote:
      "The Projects Board gives us complete visibility into every job. No more guessing where things stand.",
    name: "Sales Manager",
    title: "Sales Director",
    company: "South Florida Dealer",
  },
  {
    quote:
      "Our quoting process is now standardized and professional. Customers notice the difference.",
    name: "Business Owner",
    title: "President",
    company: "Miami Window Company",
  },
  {
    quote:
      "The Salesforce platform gives us confidence that our data is secure and always available.",
    name: "Operations Manager",
    title: "COO",
    company: "Florida Doors & Windows",
  },
  {
    quote:
      "We've reduced administrative time by over 50%. That's real money back in our pocket.",
    name: "Office Manager",
    title: "Office Administrator",
    company: "Window Solutions FL",
  },
  {
    quote:
      "The xTriam team's support is outstanding. They really understand our industry.",
    name: "Company Executive",
    title: "CEO",
    company: "Hurricane Windows Inc",
  },
];

const results = [
  {
    metric: "50%",
    label: "Reduction in Admin Time",
    description: "Less time on paperwork means more time selling and installing.",
  },
  {
    metric: "2x",
    label: "Faster Quote Generation",
    description: "Create professional proposals in half the time.",
  },
  {
    metric: "30%",
    label: "Improved Cash Flow",
    description: "Better tracking means faster payments and fewer surprises.",
  },
];
