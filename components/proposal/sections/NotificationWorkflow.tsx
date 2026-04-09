"use client";

import { SectionReveal } from "../SectionReveal";
import { ShoppingCart, Zap, Mail, Smartphone, User } from "lucide-react";

const steps = [
  { icon: ShoppingCart, label: "Order placed", color: "bg-brand-blue-600" },
  { icon: Zap, label: "Trigger fires", color: "bg-brand-orange-500" },
  { icon: Mail, label: "Email sent", color: "bg-brand-blue-600" },
  { icon: Smartphone, label: "SMS sent", color: "bg-brand-blue-600" },
  { icon: User, label: "Team notified", color: "bg-green-600" },
];

const dealerNotifications = [
  "Order received & under review",
  "Order approved & in production",
  "Production stage updates",
  "Order shipped / container assigned",
  "ETA updates",
  "Order arrived / ready for delivery",
];

const internalNotifications = [
  "New order submitted by dealer",
  "Order assigned to production stage",
  "Custom triggers per workflow",
  "Escalation alerts (overdue orders)",
];

export function NotificationWorkflow() {
  return (
    <SectionReveal>
      <div className="bg-muted/50 border border-border rounded-2xl p-6 sm:p-8 my-6">
        <h4 className="text-center text-base font-medium text-muted-foreground mb-8">
          Notification System &mdash; Email + SMS Automation
        </h4>

        {/* Pipeline */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-4 shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${step.color} flex items-center justify-center`}>
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-sm text-muted-foreground text-center max-w-[80px]">
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-6 sm:w-10 h-px bg-border shrink-0 -mt-6" />
              )}
            </div>
          ))}
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-blue-600" /> Dealer Notifications
            </h5>
            <ul className="space-y-2">
              {dealerNotifications.map((n) => (
                <li key={n} className="text-base text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 mt-1.5 shrink-0" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-orange-500" /> Internal Team Notifications
            </h5>
            <ul className="space-y-2">
              {internalNotifications.map((n) => (
                <li key={n} className="text-base text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 mt-1.5 shrink-0" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
