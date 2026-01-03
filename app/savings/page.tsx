"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";

export default function SavingsPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    leadsPerWeek: 25,
    quotesPerLead: 3,
    conversionRate: 30,
    ordersPerContract: 2,
    salesReps: 3,
    hourlyRate: 18,
  });
  const [results, setResults] = useState<null | {
    monthlyHours: number;
    monthlySavings: number;
    breakdown: { label: string; hours: number }[];
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const calculateSavings = () => {
    // Simplified calculation logic
    const weeklyDeals = formData.leadsPerWeek * (formData.conversionRate / 100);
    const monthlyDeals = weeklyDeals * 4;

    // Hours saved per activity (estimated)
    const breakdown = [
      { label: "Engaging clients", hours: Math.round(monthlyDeals * 0.5) },
      { label: "Closing deals", hours: Math.round(monthlyDeals * 0.75) },
      { label: "Managing projects", hours: Math.round(monthlyDeals * 1.2) },
      { label: "Delivering service", hours: Math.round(monthlyDeals * 0.8) },
      { label: "Closing projects", hours: Math.round(monthlyDeals * 0.4) },
      { label: "Admin and accounting", hours: Math.round(monthlyDeals * 1.5) },
    ];

    const monthlyHours = breakdown.reduce((sum, item) => sum + item.hours, 0);
    const monthlySavings = monthlyHours * formData.hourlyRate * formData.salesReps;

    setResults({
      monthlyHours,
      monthlySavings,
      breakdown,
    });
    setStep(3);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-orange-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Calculate Your{" "}
              <span className="text-brand-orange-500">Additional Cash Flow</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              See how much time and money bpmPro can save your window and door
              business.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                    step >= s
                      ? "bg-brand-orange-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 w-16 ${
                      step > s ? "bg-brand-orange-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-background p-6 shadow-sm lg:p-8">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Step 1: Sales and Order Volume
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Tell us about your typical sales activity.
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Leads per week
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="range"
                        name="leadsPerWeek"
                        min="10"
                        max="100"
                        value={formData.leadsPerWeek}
                        onChange={handleChange}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-semibold text-foreground">
                        {formData.leadsPerWeek}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Quotes per lead
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="range"
                        name="quotesPerLead"
                        min="1"
                        max="12"
                        value={formData.quotesPerLead}
                        onChange={handleChange}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-semibold text-foreground">
                        {formData.quotesPerLead}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Sales conversion rate
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="range"
                        name="conversionRate"
                        min="10"
                        max="70"
                        step="5"
                        value={formData.conversionRate}
                        onChange={handleChange}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-semibold text-foreground">
                        {formData.conversionRate}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Purchase orders per contract
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="range"
                        name="ordersPerContract"
                        min="1"
                        max="12"
                        value={formData.ordersPerContract}
                        onChange={handleChange}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-semibold text-foreground">
                        {formData.ordersPerContract}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full"
                    onClick={() => setStep(2)}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Step 2: Current Staff Details
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Tell us about your team.
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Number of sales representatives
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="range"
                        name="salesReps"
                        min="1"
                        max="25"
                        value={formData.salesReps}
                        onChange={handleChange}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-semibold text-foreground">
                        {formData.salesReps}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground">
                      Average hourly salary rate ($)
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <input
                        type="range"
                        name="hourlyRate"
                        min="13"
                        max="50"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-semibold text-foreground">
                        ${formData.hourlyRate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="accent"
                    size="lg"
                    className="flex-1"
                    onClick={calculateSavings}
                  >
                    Calculate Savings
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && results && (
              <div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    Your Estimated Monthly Savings
                  </h2>
                  <div className="mt-6">
                    <div className="text-5xl font-bold text-brand-orange-500">
                      ${results.monthlySavings.toLocaleString()}
                    </div>
                    <p className="mt-2 text-muted-foreground">per month</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-brand-blue-600">
                      {results.monthlyHours} hours
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      of productivity gained monthly
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-foreground">
                    Hours saved by activity:
                  </h3>
                  <div className="mt-4 space-y-3">
                    {results.breakdown.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.label}
                            </span>
                            <span className="font-medium text-foreground">
                              {item.hours} hrs
                            </span>
                          </div>
                          <div className="mt-1 h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-brand-blue-500"
                              style={{
                                width: `${(item.hours / results.monthlyHours) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => {
                      setStep(1);
                      setResults(null);
                    }}
                  >
                    Recalculate
                  </Button>
                  <Link href="/book-a-demo" className="flex-1">
                    <Button variant="accent" size="lg" className="w-full">
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Profitability Through Process Automation
            </h2>
            <p className="mt-4 text-brand-blue-100">
              See how bpmPro can transform your window and door business. Our
              team will show you exactly how these savings apply to your
              operation.
            </p>
            <div className="mt-8">
              <Link href="/book-a-demo">
                <Button
                  variant="accent"
                  size="lg"
                >
                  Schedule Your Free Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
