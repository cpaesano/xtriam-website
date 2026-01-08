import { Metadata } from "next";
import Link from "next/link";
import { Button, VimeoEmbed, YouTubeEmbed } from "@/components/ui";
import { Quote, Play } from "lucide-react";
import { StatsSection } from "@/components/marketing/StatsSection";

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
              businesses with <strong>bpmPro</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Video Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hear From Our Customers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch how <strong>bpmPro</strong> has transformed these window and door businesses.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-background overflow-hidden shadow-sm"
              >
                {video.platform === "youtube" ? (
                  <YouTubeEmbed videoId={video.videoId} title={video.title} />
                ) : (
                  <VimeoEmbed videoId={video.videoId} title={video.title} />
                )}
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
              businesses with <strong>bpmPro</strong>.
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
    platform: "youtube",
    videoId: "FtWksXxC_tg",
    title: "Driving a 50% Increase in Net Profits",
    name: "Hisham Aljamal",
    role: "Founder",
    company: "Hurricane Window & Screen",
    description:
      "A window contractor since 1984, Hisham Aljamal shares how HWS is recapturing 50% of their net profit thanks to bpmPro. By streamlining daily operations, they're now achieving greater efficiency and profitability.",
    result: "50% increase in net profits",
  },
  {
    platform: "vimeo",
    videoId: "849143740",
    title: "Achieving 75% Time Savings in Quoting",
    name: "Nour Aljamal",
    role: "Sales Representative",
    company: "Hurricane Window & Screen",
    description:
      "Nour Aljamal shares how bpmPro has revolutionized her quoting process. The time she spends creating quotes is now just 25% of what it used to be, making it a key factor in her day-to-day efficiency.",
    result: "75% time savings in quoting",
  },
  {
    platform: "vimeo",
    videoId: "842923160",
    title: "Boost Staff Performance",
    name: "Mohammad Aljamal",
    role: "President",
    company: "Hurricane Window & Screen",
    description:
      "Mohammad faced challenges in managing business operations as the company grew. bpmPro helped them overcome these challenges.",
    result: "80% reduction in administrative time",
  },
  {
    platform: "vimeo",
    videoId: "843072856",
    title: "Streamline Operations",
    name: "Michele Diaz",
    role: "President",
    company: "Palm Aluminum & Glass",
    description:
      "Michele dedicated five to six years to finding the right software to assist with their window business operations. bpmPro delivered with a highly user-friendly interface.",
    result: "Streamlined entire operations",
  },
  {
    platform: "youtube",
    videoId: "9YQVSSx78aI",
    title: "Reducing Time Spent on Spreadsheets by 80%",
    name: "Mohammad Aljamal",
    role: "President",
    company: "Hurricane Window & Screen",
    description:
      "Since May 2022, bpmPro has slashed administrative tasks at Hurricane Window and Screen by 80%, boosting efficiency and enhancing performance.",
    result: "80% less time on spreadsheets",
  },
  {
    platform: "youtube",
    videoId: "fyaX4dWULW8",
    title: "Saving 60 Hours per Month When Quoting",
    name: "Anthony Infante",
    role: "Vice President",
    company: "TISW Corp",
    description:
      "bpmPro has revolutionized TISW Corp's operations, saving 60 hours per month on quoting.",
    result: "60 hours saved per month",
  },
  {
    platform: "youtube",
    videoId: "Y4RumW2mN8g",
    title: "Simplifying Project Management: An Easy-to-Use Solution",
    name: "Desiree Williams",
    role: "Installation Coordinator",
    company: "Hurricane Window & Screen",
    description:
      "Discover how bpmPro has transformed project management and task coordination for Hurricane Window and Screen. Desiree shares her experience with bpmPro, highlighting its ease of use and efficiency.",
    result: "Simplified project management",
  },
  {
    platform: "youtube",
    videoId: "8kZgQVvzJVA",
    title: "Effortless Proposal Delivery and Automated Pricing",
    name: "Stephen Demos",
    role: "Senior Sales Representative",
    company: "Palm Aluminum & Glass",
    description:
      "Discover how bpmPro has simplified proposal management and automated pricing, making the entire process effortless and efficient. With built-in email integration and automatic labor cost calculation, bpmPro delivers exceptional results.",
    result: "Automated pricing & proposals",
  },
  {
    platform: "youtube",
    videoId: "xZ02ioC-mxQ",
    title: "Fostering Better Team Communication",
    name: "Hisham Aljamal",
    role: "Founder",
    company: "Hurricane Window & Screen",
    description:
      "Learn how bpmPro provides a unified system that fosters better communication across teams, transforming individual efforts into a cohesive, profit-driving strategy for operations, sales, and administrative teams.",
    result: "Better team collaboration",
  },
  {
    platform: "youtube",
    videoId: "85sBR952yXk",
    title: "Driving Efficiency and Growth",
    name: "Michele Diaz",
    role: "President",
    company: "Palm Aluminum & Glass",
    description:
      "bpmPro has been key in boosting efficiency and fostering growth at Palm Aluminum & Glass by enhancing customer interactions and streamlining employee workflows.",
    result: "Efficiency & business growth",
  },
  {
    platform: "youtube",
    videoId: "8y2CKYxQsvg",
    title: "Improving Communications With Customers",
    name: "Mohammad Aljamal",
    role: "President",
    company: "Hurricane Window & Screen",
    description:
      "bpmPro has significantly enhanced customer relationship management at Hurricane Window and Screen, leading to clearer and more effective communication with clients.",
    result: "Better customer communication",
  },
  {
    platform: "youtube",
    videoId: "0sMHBl-HviI",
    title: "Streamlining Sales Processes",
    name: "Stephen Demos",
    role: "Senior Sales Representative",
    company: "Palm Aluminum & Glass",
    description:
      "bpmPro has streamlined sales at Palm Aluminum and Glass, making lead capture and proposal generation seamless and efficient.",
    result: "Streamlined sales processes",
  },
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
    metric: "80%",
    label: "Reduction in Admin Time",
    description: "Less time on spreadsheets means more time selling and installing.",
  },
  {
    metric: "75%",
    label: "Time Savings in Quoting",
    description: "Create professional proposals in a fraction of the time.",
  },
  {
    metric: "50%",
    label: "Increase in Net Profits",
    description: "Streamlined operations drive greater efficiency and profitability.",
  },
  {
    metric: "60 hrs",
    label: "Saved Monthly on Quoting",
    description: "Revolutionary time savings that transform business operations.",
  },
];
