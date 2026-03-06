"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CHART_COLORS = [
  "#027eda", // brand blue
  "#ff9f00", // brand orange
  "#10b981", // green
  "#8b5cf6", // purple
  "#f43f5e", // pink
  "#06b6d4", // cyan
];

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
              See how much time and money <strong>bpmPro</strong> can save your window and door
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
                {/* Summary Cards */}
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground">
                    Your Estimated Monthly Savings
                  </h2>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-brand-orange-50 p-4">
                      <div className="text-3xl font-bold text-brand-orange-500 sm:text-4xl">
                        ${results.monthlySavings.toLocaleString()}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">per month</p>
                    </div>
                    <div className="rounded-lg bg-brand-blue-50 p-4">
                      <div className="text-3xl font-bold text-brand-blue-600 sm:text-4xl">
                        {results.monthlyHours} hrs
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">productivity gained</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-border p-3">
                      <div className="text-xl font-bold text-foreground">
                        ${(results.monthlySavings * 3).toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Quarterly</p>
                    </div>
                    <div className="rounded-lg border border-border p-3">
                      <div className="text-xl font-bold text-foreground">
                        ${(results.monthlySavings * 12).toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Annually</p>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="mt-8">
                  <h3 className="font-semibold text-foreground text-center mb-6">
                    Hours Saved by Activity
                  </h3>

                  {/* Donut Chart */}
                  <div className="flex justify-center">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={results.breakdown}
                          dataKey="hours"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          label={({ percent }) =>
                            `${((percent ?? 0) * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {results.breakdown.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} hours`, 'Hours Saved']}
                        />
                        <Legend
                          layout="horizontal"
                          align="center"
                          verticalAlign="bottom"
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div className="mt-8">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={results.breakdown}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <XAxis type="number" unit=" hrs" />
                        <YAxis
                          dataKey="label"
                          type="category"
                          width={90}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(value) => [`${value} hours`, 'Hours Saved']}
                        />
                        <Bar
                          dataKey="hours"
                          radius={[0, 4, 4, 0]}
                        >
                          {results.breakdown.map((_, index) => (
                            <Cell
                              key={`bar-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Action Buttons */}
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
              See how <strong>bpmPro</strong> can transform your window and door business. Our
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
