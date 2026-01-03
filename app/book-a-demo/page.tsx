"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { Calendar, Clock, Video, CheckCircle } from "lucide-react";

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              Schedule a personalized demo and see how bpmPro can transform your
              window and door business.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Benefits + Form */}
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
                exactly how bpmPro can solve your specific challenges.
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

            {/* Form */}
            <div className="rounded-xl border border-border bg-background p-6 shadow-sm lg:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    Demo Requested!
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    We'll reach out within 24 hours to schedule your
                    personalized demo.
                  </p>
                  <div className="mt-6">
                    <Link href="/">
                      <Button variant="outline">Back to Home</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-foreground">
                    Request Your Demo
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Fill out the form and we'll schedule a time that works for
                    you.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-foreground"
                        >
                          Company *
                        </label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-1"
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-foreground"
                        >
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1"
                          placeholder="(555) 555-5555"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="employees"
                        className="block text-sm font-medium text-foreground"
                      >
                        Number of Employees
                      </label>
                      <select
                        id="employees"
                        name="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        className="mt-1 flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="1-5">1-5 employees</option>
                        <option value="6-10">6-10 employees</option>
                        <option value="11-25">11-25 employees</option>
                        <option value="26-50">26-50 employees</option>
                        <option value="50+">50+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground"
                      >
                        What are you looking to solve?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 flex w-full rounded-lg border border-border bg-background px-3 py-2 text-base transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:border-transparent"
                        placeholder="Tell us about your current challenges..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Request Demo"}
                    </Button>
                  </form>
                </>
              )}
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
    title: "Flexible Scheduling",
    description:
      "We'll find a time that works for you, Monday through Friday, 9 AM to 6 PM EST.",
  },
];
