"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about <strong>bpmPro</strong>. Can't find what you're
              looking for?{" "}
              <Link
                href="/contact"
                className="text-brand-blue-600 hover:underline"
              >
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => {
                  const itemId = `${sectionIndex}-${faqIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div
                      key={faqIndex}
                      className="rounded-lg border border-border bg-background overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our team is here to help. Reach out and we'll get back to you as
              soon as possible.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
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

const faqSections = [
  {
    title: "Software and Technical Setup",
    questions: [
      {
        question: "Is bpmPro a CRM?",
        answer:
          "bpmPro is a comprehensive solution combining CRM, quoting, project management, and automation features. It's built on Salesforce.com, the world's leading CRM platform, giving you enterprise-grade reliability with industry-specific functionality.",
      },
      {
        question: "Do I need to install it on my PC?",
        answer:
          "No installation required. bpmPro is a cloud-based software solution, which means you can access it through a web browser from any device with an internet connection. No downloads, no updates to manage.",
      },
      {
        question: "Can I access bpmPro on different devices?",
        answer:
          "Yes, bpmPro works across PCs, tablets, and mobile devices, allowing you to manage operations seamlessly, no matter where you are or what device you prefer. The Salesforce Mobile App is available for both iOS and Android.",
      },
      {
        question: "How do I set up bpmPro for my company users?",
        answer:
          "The xTriam implementation team handles all technical setup and user access configuration for you. We'll work with you to understand your team structure and set up appropriate access levels for each user.",
      },
      {
        question: "Can I customize user permissions and roles?",
        answer:
          "Yes, you can create different profiles with varying permissions for Management, Sales Reps, and Limited users. This ensures each team member has access to the features they need while protecting sensitive business data.",
      },
    ],
  },
  {
    title: "Importing and Managing Company Data",
    questions: [
      {
        question: "How can I import existing company contacts?",
        answer:
          "xTriam implementation staff assists with importing customers, vendors, and subcontractors into the centralized database. We'll help migrate your existing data so you can hit the ground running.",
      },
      {
        question: "What data validation measures exist during import?",
        answer:
          "The software employs data validation mechanisms during the import process to ensure the accuracy and reliability of your contact information. This helps prevent duplicate records and ensures data quality from day one.",
      },
      {
        question: "Can I load custom pricing data?",
        answer:
          "Absolutely. You can load labor rates, permit fees, and manufacturer/municipality lists customized to your business. This ensures your quotes are accurate and reflect your actual costs.",
      },
    ],
  },
  {
    title: "Subscription Plans: Professional vs. Enterprise",
    questions: [
      {
        question: "Is there a user limitation per plan?",
        answer:
          "No user limitations exist for either subscription level. You can add as many users as your business needs without worrying about per-user fees.",
      },
      {
        question: "Can we upgrade or switch plans?",
        answer:
          "Companies can switch between plans at any time as needs evolve. Whether you're growing and need more features, or want to adjust your plan, we make it easy to change.",
      },
      {
        question: "What are the software deliverables?",
        answer:
          "The package includes technical setup, user creation, contact importing, custom pricing, and customizable sales documents and email templates. Our team ensures you're fully operational before going live.",
      },
      {
        question: "How do I customize Sales Documents?",
        answer:
          "bpmPro allows you to modify proposals and contracts to reflect your brand and business preferences. You can customize layouts, add your logo, and adjust fields to match your workflow.",
      },
      {
        question: "Can I personalize Email Templates?",
        answer:
          "Yes, you can customize templates for Lead Assignment, Proposal Presentation, Product Order Updates, and Case Originations. This helps maintain consistent, professional communication with your customers.",
      },
    ],
  },
  {
    title: "Customer and Technical Support",
    questions: [
      {
        question: "What level of customer support is provided?",
        answer:
          "xTriam provides full customer and technical support from Monday through Friday, 8:00 AM to 6:00 PM EST. Our team is available via phone, email, and our support portal to help with any questions or issues.",
      },
    ],
  },
];
