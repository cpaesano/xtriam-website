"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubscriberFAQsPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter FAQs based on search query
  const filteredSections = faqSections
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.questions.length > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Frequently Asked Questions
        </h1>
        <p className="mt-1 text-muted-foreground">
          Find answers to common questions about using <strong>bpmPro</strong>
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
        />
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {filteredSections.length === 0 ? (
          <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground">
              No FAQs found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-brand-blue-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">{section.icon}</span>
                {section.title}
              </h2>
              <div className="space-y-3">
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
                        <div className="px-4 pb-4 border-t border-border pt-4">
                          <div className="text-muted-foreground prose prose-sm max-w-none">
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Still need help */}
      <div className="rounded-xl border border-brand-blue-200 bg-brand-blue-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-brand-blue-900">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="mt-1 text-sm text-brand-blue-700">
              Our AI assistant can help answer your questions instantly, or you
              can create a support ticket for personalized help.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/support/chat"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-blue-600 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Chat with AI
              </Link>
              <Link
                href="/support/tickets/new"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-blue-300 bg-white px-4 py-2 text-sm font-medium text-brand-blue-700 hover:bg-brand-blue-50 transition-colors"
              >
                Create Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const faqSections = [
  {
    title: "Getting Started",
    icon: "🚀",
    questions: [
      {
        question: "How do I log into bpmPro?",
        answer:
          "Go to login.salesforce.com and enter your username and password provided by xTriam. For mobile access, download the Salesforce Mobile App from the App Store or Google Play and log in with the same credentials.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Forgot Your Password?' on the Salesforce login page and enter your username. You'll receive an email with a link to reset your password. If you don't receive the email, check your spam folder or contact support.",
      },
      {
        question: "How do I navigate the bpmPro interface?",
        answer:
          "Use the App Launcher (grid icon in the top-left) to access different areas: Leads, Accounts, Contacts, Opportunities, Projects, and Reports. The navigation bar at the top shows your recently viewed items. Use the search bar to quickly find any record.",
      },
      {
        question: "How do I customize my home page?",
        answer:
          "Click the gear icon in the top-right corner and select 'Edit Page' to customize your dashboard. You can add, remove, or rearrange components like charts, recent records, and tasks to match your workflow.",
      },
      {
        question: "Where can I find my assigned tasks?",
        answer:
          "Your tasks appear on your Home page in the 'My Tasks' component. You can also access all tasks by clicking on 'Tasks' in the navigation bar or using the App Launcher to go to the Tasks list view.",
      },
    ],
  },
  {
    title: "Quoting & Proposals",
    icon: "📝",
    questions: [
      {
        question: "How do I create a new quote?",
        answer:
          "Navigate to the Opportunity record and click 'New Quote' in the Quotes related list. Select the products/windows, enter quantities, and the system will automatically calculate pricing based on your configured rates and labor costs.",
      },
      {
        question: "How do I add products to a quote?",
        answer:
          "In the Quote record, go to the 'Quote Line Items' section and click 'Add Products'. Search for products by name or series, select the items, and enter quantities. Labor and installation costs are calculated automatically based on your pricing rules.",
      },
      {
        question: "How do I import quotes from ES Windows?",
        answer:
          "Use the 'Import ES Quote' button on the Opportunity. Upload the ES Windows export file (.csv or .xlsx) and bpmPro will automatically map the products, sizes, and quantities to create quote line items.",
      },
      {
        question: "How do I generate a proposal PDF?",
        answer:
          "On the Quote record, click the 'Generate Proposal' button. Select your template, review the preview, and click 'Generate'. The PDF will be saved to the Files section and can be emailed directly to the customer.",
      },
      {
        question: "How do I email a proposal to a customer?",
        answer:
          "After generating the proposal, click 'Email Proposal' on the Quote record. The system will pre-populate the email with the customer's address, attach the PDF, and use your email template. Review and click Send.",
      },
      {
        question: "How do I apply discounts to a quote?",
        answer:
          "On the Quote record, you can apply a percentage discount at the quote level or adjust individual line item prices. Use the 'Discount %' field for percentage discounts or edit the 'Unit Price' on specific line items.",
      },
      {
        question: "How do I clone an existing quote?",
        answer:
          "Open the Quote you want to copy and click 'Clone'. This creates a new Quote with all the same line items and settings, which you can then modify for the new opportunity or revision.",
      },
    ],
  },
  {
    title: "Sales Documents",
    icon: "📄",
    questions: [
      {
        question: "What are Sales Documents?",
        answer:
          "Sales Documents are the quotes, proposals, and contracts generated for your customers. They are linked to Projects and contain all pricing, product details, and terms. Sales Documents can include different types of line items: Labor & Product items, Specialty items, and Configure Price items (premium feature).",
      },
      {
        question: "How do I create a Sales Document?",
        answer:
          "Navigate to the Project record and click 'New Sales Document' in the Sales Documents related list. Select the document type (Quote, Proposal, or Contract), add your line items, and save. You can then generate a PDF for the customer.",
      },
      {
        question: "What are Labor & Product line items?",
        answer:
          "Labor & Product items are the standard line items that include window/door products along with their associated labor costs. When you add a product, the system automatically calculates labor based on your configured rates and the product specifications.",
      },
      {
        question: "What are Specialty line items?",
        answer:
          "Specialty items are for non-standard charges that don't fit into the regular product catalog. Examples include custom trim work, unusual installation requirements, permits, or any other miscellaneous charges specific to a job.",
      },
      {
        question: "What are Configure Price items?",
        answer:
          "Configure Price items (CPQ) allow you to build complex product configurations with dynamic pricing. This premium feature enables custom sizing, option selections, and automatic price calculations based on your pricing rules. Contact xTriam to enable this feature.",
      },
      {
        question: "How do I add line items to a Sales Document?",
        answer:
          "Open the Sales Document and go to the Line Items section. Click 'Add Items' and choose the type: Product (for standard products), Specialty (for custom charges), or Configure (for CPQ items if enabled). Fill in the details and save.",
      },
      {
        question: "How do I edit line item pricing?",
        answer:
          "Click on any line item to edit its details. You can adjust quantity, unit price, discount percentage, or override the calculated total. Changes are reflected in the document total automatically.",
      },
      {
        question: "How do I reorder line items?",
        answer:
          "In the Line Items section, use the drag handles to reorder items, or edit the 'Sort Order' field on each line item. The order you set is how items appear on the generated PDF.",
      },
      {
        question: "How do I generate a PDF of the Sales Document?",
        answer:
          "On the Sales Document record, click 'Generate PDF'. Select your template (if multiple are available), preview the document, and click Generate. The PDF is saved to the Files section.",
      },
      {
        question: "How do I email a Sales Document to a customer?",
        answer:
          "After generating the PDF, click 'Email Document' on the Sales Document. The system pre-fills the customer's email, attaches the PDF, and uses your email template. Review and send.",
      },
      {
        question: "Can I have multiple Sales Documents per Project?",
        answer:
          "Yes, a Project can have multiple Sales Documents. This is useful for revisions, change orders, or breaking a large job into phases. Each document maintains its own line items and totals.",
      },
      {
        question: "How do I mark a Sales Document as accepted?",
        answer:
          "When a customer accepts, update the Status field to 'Accepted'. You can also capture e-signatures if enabled. Accepted documents can trigger automated workflows like order creation.",
      },
    ],
  },
  {
    title: "Project Management",
    icon: "📋",
    questions: [
      {
        question: "How do I convert a won opportunity to a project?",
        answer:
          "When you mark an Opportunity as 'Closed Won', bpmPro automatically creates a Project record linked to that opportunity. The project inherits customer information, products, and quote details.",
      },
      {
        question: "How do I use the Projects Board?",
        answer:
          "Access the Projects Board from the App Launcher or navigation. Projects are displayed as cards organized by status columns (New, In Progress, Scheduled, Completed). Drag cards between columns to update status, or click a card to view details.",
      },
      {
        question: "How do I update project status?",
        answer:
          "Open the Project record and change the 'Status' picklist field, or drag the project card on the Projects Board. Status changes are logged in the Activity History and can trigger automated notifications.",
      },
      {
        question: "How do I add notes to a project?",
        answer:
          "On the Project record, use the 'Notes' field for internal notes, or use the Chatter feed to post updates that team members can see. You can also attach files and photos to the project record.",
      },
      {
        question: "How do I track project materials and orders?",
        answer:
          "Use the 'Product Orders' related list on the Project to track material orders. Each order shows supplier, products, quantities, order date, and delivery status. Update the status as materials are ordered and received.",
      },
      {
        question: "How do I view all my projects?",
        answer:
          "Go to the Projects tab and select a list view from the dropdown. Common views include 'My Projects', 'All Open Projects', and 'Projects by Status'. You can also create custom list views with specific filters.",
      },
    ],
  },
  {
    title: "Installation Scheduling",
    icon: "📅",
    questions: [
      {
        question: "How do I schedule an installation?",
        answer:
          "On the Project record, click 'Schedule Installation' and select the date, time, and crew. The system checks crew availability and shows conflicts. Once scheduled, the customer automatically receives a confirmation email.",
      },
      {
        question: "How do I view the installation calendar?",
        answer:
          "Access the Installation Calendar from the App Launcher. The calendar shows all scheduled installations color-coded by crew. Click on any event to view details or drag to reschedule.",
      },
      {
        question: "How do I reschedule an installation?",
        answer:
          "Open the Project or click the calendar event and select 'Reschedule'. Choose a new date/time and save. The customer will automatically receive an updated confirmation email with the new schedule.",
      },
      {
        question: "How do I assign crews to installations?",
        answer:
          "When scheduling, select the crew from the 'Assigned Crew' dropdown. You can view crew workload on the calendar to balance assignments. Crews are set up in the Crew management section under Setup.",
      },
      {
        question: "How do I send installation reminders to customers?",
        answer:
          "Automatic reminders are sent 48 hours and 24 hours before scheduled installations. You can also manually send a reminder by clicking 'Send Reminder' on the Project record.",
      },
    ],
  },
  {
    title: "Payments & Invoicing",
    icon: "💳",
    questions: [
      {
        question: "How do I collect a deposit?",
        answer:
          "On the Opportunity or Project, click 'Collect Payment' and enter the deposit amount. Choose the payment method (credit card, check, or cash). For credit cards, the Stripe integration processes the payment securely.",
      },
      {
        question: "How do I process a credit card payment?",
        answer:
          "Click 'Collect Payment', select 'Credit Card', and enter the amount. You can enter card details manually or use a saved card on file. Payments are processed through Stripe and recorded automatically.",
      },
      {
        question: "How do I generate an invoice?",
        answer:
          "On the Project or Opportunity, click 'Generate Invoice'. Select the items to include, review the amounts, and generate. The invoice PDF is saved to Files and can be emailed to the customer.",
      },
      {
        question: "How do I record a check or cash payment?",
        answer:
          "Click 'Collect Payment', select 'Check' or 'Cash', enter the amount and reference number (check number for checks). The payment is recorded in the Payments related list.",
      },
      {
        question: "How do I view payment history?",
        answer:
          "On the Account, Opportunity, or Project record, view the 'Payments' related list to see all transactions. You can also run payment reports from the Reports tab for broader analysis.",
      },
      {
        question: "How do I issue a refund?",
        answer:
          "Contact xTriam support to process refunds. Refunds require verification and are processed through the original payment method. Stripe refunds are processed within 5-10 business days.",
      },
    ],
  },
  {
    title: "Mobile App",
    icon: "📱",
    questions: [
      {
        question: "How do I access bpmPro on my phone?",
        answer:
          "Download the 'Salesforce' app from the App Store (iOS) or Google Play (Android). Log in with your bpmPro credentials. The mobile app provides access to leads, accounts, projects, and more.",
      },
      {
        question: "How do I log activities from the field?",
        answer:
          "Open any record in the mobile app and tap 'Log a Call' or 'New Task'. You can add notes, set follow-up dates, and attach photos directly from your phone's camera.",
      },
      {
        question: "How do I take and attach photos to a project?",
        answer:
          "Open the Project in the mobile app, tap the Files section, and select 'Upload'. Choose 'Take Photo' to use your camera or 'Photo Library' to select existing photos. Photos are automatically synced.",
      },
      {
        question: "Can I create quotes on mobile?",
        answer:
          "Basic quote creation is available on mobile, but for complex quotes with multiple products, we recommend using the desktop version. Mobile is best for viewing quotes and collecting signatures.",
      },
      {
        question: "How do I get directions to a job site?",
        answer:
          "On the Account or Project record, tap the address to open it in your phone's Maps app. You can also use the 'Get Directions' button if available on the record.",
      },
    ],
  },
  {
    title: "Integrations",
    icon: "🔗",
    questions: [
      {
        question: "How does the ES Windows integration work?",
        answer:
          "Export your quote from ES Windows as a CSV or Excel file. In bpmPro, go to the Opportunity and click 'Import ES Quote'. Upload the file and bpmPro maps the products, sizes, and pricing automatically.",
      },
      {
        question: "How do I connect to QuickBooks?",
        answer:
          "QuickBooks integration is set up during implementation. Once connected, invoices and payments sync automatically. Contact support if you need to reconnect or troubleshoot the integration.",
      },
      {
        question: "How do I sync contacts with my email?",
        answer:
          "bpmPro integrates with Gmail and Outlook through Salesforce Inbox. Enable the integration in your personal settings to sync emails, calendar events, and contacts.",
      },
      {
        question: "How does the Stripe integration work?",
        answer:
          "Stripe is pre-configured for payment processing. When you click 'Collect Payment' and select credit card, the payment is processed through your connected Stripe account. Funds are deposited per your Stripe settings.",
      },
      {
        question: "Can I integrate with other manufacturer software?",
        answer:
          "We're continuously adding integrations. Contact xTriam support to discuss your specific manufacturer software needs and we can evaluate custom integration options.",
      },
    ],
  },
  {
    title: "Reports & Dashboards",
    icon: "📊",
    questions: [
      {
        question: "How do I run a report?",
        answer:
          "Go to the Reports tab and browse available reports by folder. Click on a report to run it. Use filters to narrow results by date, status, or other criteria. You can export reports to Excel for further analysis.",
      },
      {
        question: "How do I view my sales dashboard?",
        answer:
          "Access Dashboards from the App Launcher. Select the dashboard you want to view (Sales, Projects, etc.). Dashboards update automatically but you can click 'Refresh' for the latest data.",
      },
      {
        question: "How do I create a custom report?",
        answer:
          "Click 'New Report' in the Reports tab, select a report type (Opportunities, Projects, etc.), and use the report builder to add fields, filters, and groupings. Save to your personal folder or a shared folder.",
      },
      {
        question: "How do I schedule a report to be emailed?",
        answer:
          "Open the report and click 'Subscribe'. Choose the frequency (daily, weekly, monthly), recipients, and conditions. Reports are emailed as Excel attachments on your schedule.",
      },
      {
        question: "What standard reports are available?",
        answer:
          "bpmPro includes reports for: Sales Pipeline, Won/Lost Analysis, Project Status, Installation Schedule, Payment Summary, Lead Conversion, and more. Find them organized by folder in the Reports tab.",
      },
    ],
  },
];
