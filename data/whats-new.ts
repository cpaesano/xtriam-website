export type FeatureType = "new" | "improvement" | "fix";

export interface Feature {
  title: string;
  type: FeatureType;
  summary: string;
  details: string[];
  tutorialSlug?: string;
  /** If true, this feature is hidden from the customer-facing page */
  internal?: boolean;
}

export interface MonthRelease {
  month: string; // e.g. "March 2026"
  versions?: string; // e.g. "v7.66 – v7.68"
  features: Feature[];
}

export const releases: MonthRelease[] = [
  // ─────────────────────────────────────────────
  // APRIL 2026
  // ─────────────────────────────────────────────
  {
    month: "April 2026",
    versions: "v7.69 – v7.80",
    features: [
      {
        title: "Quick Start Lead Wizard",
        type: "new",
        summary:
          "Complete rebuild from a Salesforce Flow to a Lightning Web Component. 5-step wizard with duplicate detection, team calendar with appointment scheduling, .ics calendar invites, and lead pipeline sidebar with sales rep load chart.",
        details: [
          "Duplicate detection highlights matching Accounts/Contacts by name, email, or phone",
          "Team Calendar with Day/Week/Month views, color-coded employees, individual focus mode",
          "Appointment confirmation email with .ics attachment (Apple Calendar, Google, Outlook)",
          "Lead Pipeline panel shows Unquoted count with per-rep bar chart — click to assign",
          '"Send Notification to Sales Person" sends HTML email and saves it to Project activity timeline',
        ],
      },
      {
        title: "E-Signature & Document Sharing",
        type: "new",
        summary:
          "Send Sales Documents for electronic signature via email with a secure web link. Customers can view product details, payment terms, and sign directly from their phone or computer.",
        details: [
          '"View & Sign" email with company logo and document summary',
          "Product illustrations with dimensions on the public view",
          "Signature capture with SHA-256 audit trail",
          "Collapsible Terms & Conditions section",
          "Sales rep contact card on every shared document",
        ],
      },
      {
        title: "Stage Integration Emails",
        type: "new",
        summary:
          "Automatically send project data to external systems when a stage is passed. Connect bpmPro to your automation workflows, AI platforms, Zapier, Make, or any system that can receive email.",
        details: [
          "Fires automatically when any stage is marked \"Passed\" — no user action required",
          "Also fires when a new Lead is created (first stage auto-passes)",
          "JSON payload with project, contact, address, sales document, and payment terms data",
          "Configure different email addresses per stage (comma-separated)",
          "Works with any automation platform that can receive email",
        ],
      },
      {
        title: "Company Logo Uploader",
        type: "new",
        summary:
          "Upload your company logo directly from Company Settings. Logo appears in email headers, document sharing, and the customer-facing signature page.",
        details: [],
      },
      {
        title: "Sales Hub User Filter",
        type: "new",
        summary:
          "Filter the Sales Hub dashboard by sales rep. View your own pipeline, all reps, or select an individual rep to see their sales documents.",
        details: [
          "Dropdown: My SalesDocs / All Sales Reps / individual rep names",
          "Dynamic section titles show whose pipeline you are viewing",
          "Compact Quick Sales Doc wizard with Project Manager field",
        ],
      },
      {
        title: 'Sales Stage Rename: "Prospecting" to "Unquoted"',
        type: "improvement",
        summary:
          'Renamed the first sales stage from "Prospecting" to "Unquoted" across all screens, reports, and workflows. Better reflects that a new project has not yet been quoted.',
        details: [],
      },
      {
        title: "A3 Edit Items Improvements",
        type: "improvement",
        summary:
          "Vendor discounts, $0 price overrides, responsive layout for tablets, and empty state design when no items exist.",
        details: [
          "Vendor Discount: enter discount as dollar amount or percentage with bidirectional sync",
          "$0 Price Override: include items at no charge for bundled or promotional pricing",
          "Responsive layout optimized for iPad and narrow screens",
          'Empty state with prominent "add items" button when document has no line items',
          "Negative markup values are now rejected",
        ],
      },
      {
        title: "Financial Summary Fees Hint",
        type: "improvement",
        summary:
          'The Contract & Billing card now shows "Includes $X in fees" when the invoiced amount exceeds the contracted amount due to permit fees or transaction fees.',
        details: [],
      },
      {
        title: "Send Wizard Simplified",
        type: "improvement",
        summary:
          'Streamlined from 4 steps to 3 (removed Preview PDF step). Dynamic button labels match document type ("Send Proposal", "Send Contract"). Email content toggles with live preview.',
        details: [],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MARCH 2026
  // ─────────────────────────────────────────────
  {
    month: "March 2026",
    versions: "v7.66 – v7.68",
    features: [
      {
        title: "Vendor Discount System",
        type: "new",
        summary:
          "Manage supplier discounts on product pricing directly in the A3 Edit Items console with bidirectional percentage/dollar sync.",
        details: [
          "Enter a discount as a percentage or dollar amount — both stay in sync bidirectionally",
          "Product prices derive from the adjusted cost multiplied by the markup",
          "CostBasis as single source of truth — FS and SO prices derive from the same adjusted cost basis",
          "Override the calculated price with a custom amount; a warning modal appears if the override is below the adjusted cost",
          "Price override input displays with comma formatting for readability",
          "Vendor discount percentage is the source of truth — dollar amount recalculated from percentage on save",
        ],
      },
      {
        title: "Sales Hub Dashboard",
        type: "new",
        summary:
          "Centralized dashboard for sales pipeline management with bar charts, quick create, and daily sales operations.",
        details: [
          "Pipeline bar chart: visual breakdown by status (Unquoted, Being Quoted, Quoted, Booked)",
          "Quick Create modal: create new Projects and Sales Documents from the dashboard",
          "Active Sales Documents list with filters",
          "Recently Worked section for quick access",
          "Quick Stats for at-a-glance metrics",
          "Default salesperson filter for the logged-in user",
        ],
      },
      {
        title: "Clone Plus Redesign",
        type: "new",
        summary:
          "Complete rebuild of Clone Plus from a Flow to a Lightning Web Component with same-account and cross-account cloning.",
        details: [
          "Clone to same account: duplicate a sales document within the same project",
          "Clone to different account: copy a sales document to a different client's project",
          "Modern modal interface replaces the legacy flow",
        ],
      },
      {
        title: "Credits System (formerly Write-Offs)",
        type: "new",
        summary:
          'Renamed "Write-Offs" to "Credits" across the entire application for clearer financial terminology.',
        details: [
          "Invoice-level credits: apply credit amounts directly to invoices",
          "Payment Console integration: credits properly reflected in balance calculations",
          "Updated navigation and scroll behavior for the credit workflow",
        ],
      },
      {
        title: "A3 Edit Items — UI & Calculation Improvements",
        type: "improvement",
        summary:
          "Margin display, cancel confirmation, scroll position preservation, and grid layout optimization.",
        details: [
          "Margin % calculation: properly displays product margin percentage for each line item",
          "Cancel confirmation modal prevents accidental loss of unsaved changes",
          "Page remembers your scroll position after saving",
          "Redesigned save indicator for better visibility",
          "Even column distribution across all four detail rows",
        ],
      },
      {
        title: "Installation Ticket Report Improvements",
        type: "improvement",
        summary:
          "Styled notes sections, new installation notes field, and print-optimized styling.",
        details: [
          "Sales Document Notes in amber callout box; Installation Notes in blue callout box",
          "New dedicated installation notes field (separate from sales notes)",
          "Optimized for clean black-and-white printing",
          "Cleaner table header styling without sort arrows",
        ],
      },
      {
        title: "Building Materials Report Fix",
        type: "fix",
        summary:
          "Wood buck materials and flashing now only included when their checkboxes are checked on the line item.",
        details: [
          "Conditional material aggregation based on checkbox state",
          "Material quantities now display with comma formatting",
          'Simplified header: renamed "Category/Material Name" to "Material"',
        ],
      },
      {
        title: "Payment Console & Projects Board Fixes",
        type: "fix",
        summary:
          "Fixed balance calculation for credits, eliminated rounding issues, and fixed project filter bugs.",
        details: [
          "Balance calculation now reflects invoice-level credits",
          "Eliminated rounding discrepancies when splitting payments across invoices",
          '"All" filter now correctly shows projects for all users',
          "Stage column alignment and coloring fixed on Projects Board",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // FEBRUARY 2026
  // ─────────────────────────────────────────────
  {
    month: "February 2026",
    versions: "v7.64 – v7.65",
    features: [
      {
        title: "Sales Hub Phase 2 & 3",
        type: "new",
        summary:
          "Expanded the Sales Hub from a basic dashboard to a full pipeline management tool with advanced filters and bar charts.",
        details: [
          "Phase 2: Active Sales Documents list, pipeline visualization, Quick Create, Recently Worked, Quick Stats",
          "Phase 3: Advanced filters, pipeline bar chart, Quick Create redesign, default salesperson from user mapping",
        ],
      },
      {
        title: "Close Deal Wizard — Document Type Conversion",
        type: "new",
        summary:
          "Convert between document types during close deal, with a supersede picker and shared CSS.",
        details: [
          "Document type conversion during the close deal process",
          "Supersede picker: select which document a new version supersedes, with automatic status updates",
          "Unified styling across wizard steps",
        ],
      },
      {
        title: "Platform License Compatibility Fix",
        type: "fix",
        internal: true,
        summary:
          'Changed all 95 Apex classes to "without sharing" to prevent silent data access failures for Salesforce Platform license users.',
        details: [
          '"with sharing" classes caused SOQL queries to return 0 rows for Platform users',
          "Led to $0 commission calculations and other silent failures",
          "All 95 classes updated in one release",
        ],
      },
      {
        title: "Project Stage Improvements",
        type: "improvement",
        summary:
          "Auto-save stage changes, default sales person from user mapping, and stage refresh fix.",
        details: [
          "Stage status changes in the Project Stage Viewer now save automatically",
          "Projects auto-populate the sales person based on user mapping",
          "Projects Board properly refreshes after stage changes",
        ],
      },
      {
        title: "Invoice System Enhancements",
        type: "improvement",
        summary:
          "Overpayment blocking, void/reverse payments, lock indicators, deposit request labels, and more.",
        details: [
          "System blocks overpayment instead of silently capping",
          "Reverse bounced or incorrect payments with full audit trail",
          "Visual lock icons on finalized invoices and payments",
          "Project Invoices can be labeled as Deposit Requests",
          "Permit fee payments routed through SDI for accurate rollups",
          "Payments grouped by date and reference for cleaner display",
          "Streamlined Quick Pay header for payment application",
          "Invoice line items refresh automatically after fee changes",
        ],
      },
      {
        title: "Project Financials Dashboard Redesign",
        type: "improvement",
        summary:
          "Added empty state, corrected markup percentage, and fixed county tax in GP dashboard charts.",
        details: [
          "Helpful empty state when no financial data exists",
          "Corrected markup percentage display",
          "Fixed county tax pricing in GP dashboard charts",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // JANUARY 2026
  // ─────────────────────────────────────────────
  {
    month: "January 2026",
    features: [
      {
        title: "Project Invoice System",
        type: "new",
        summary:
          "Comprehensive invoicing system built directly into bpmPro — payment console, invoice details, invoice manager, and amount selection modal.",
        details: [
          "Visual invoice cards with real-time payment entry and payment history",
          "Live balance tracking with color-coded indicators (red for due, green for paid)",
          "Inline editing of invoice fields — no popup modal required",
          "Create invoices from Sales Documents with configurable amounts",
          "Credit memo support for customer credits",
          "Payment terms quick select: Upon Agreement, Upon Delivery, Upon Completion",
          "Smart amount calculation based on selected percentage or remaining balance",
          "Intelligent invoice naming based on payment terms",
          "Sales Document percentage display below each invoice amount",
        ],
      },
      {
        title: "Permit Fee Invoice Manager",
        type: "new",
        summary:
          "View all permit fees for a project with billable/invoiced indicators and one-click linking to Sales Documents.",
        details: [
          "All permit fees view with billable and invoiced checkbox indicators",
          "Clickable permit fee names link directly to the record",
          "Sales Document linking modal for Building Permits lacking SD links",
          'Smart selection filtering with "Action Required" messages',
        ],
      },
      {
        title: "bpmPro Schedule/Calendar",
        type: "new",
        summary:
          "Calendar view for product arrivals, inspections, and permit deadlines with smart filtering and information-rich event cards.",
        details: [
          "Three data sources: Product Orders, Inspections, Building Permits",
          "Flexible date views: Ship Date, Customer Ship Date, Order Date, First Check-In Date",
          "Month, Week List, and Day List views",
          "Salesperson and status filters with one-click clear",
          '"Arrives in X Days" countdown on product order cards',
          "Inspection cards with orange badge and municipality details",
          "Preferences saved automatically between sessions",
        ],
      },
      {
        title: "Sales Documents Board",
        type: "new",
        summary:
          "Kanban-style pipeline management with drag-and-drop, column totals, and Close Deal Wizard integration.",
        details: [
          "Drag-and-drop status management between columns",
          "Aggregate column totals for each status",
          "Close Deal Wizard integration for seamless quote-to-sold transition",
          "Terminal drop zones for Sold and Lost statuses",
          "Lost modal captures reasons when marking documents as lost",
          "Real-time search and salesperson filtering",
        ],
      },
      {
        title: "Close Deal Wizard — Enhanced Checklist",
        type: "new",
        summary:
          "Three-state checklist system (Yes/No/N/A) with configurable sections, work assignment items, and admin configuration.",
        details: [
          "Yes / No / N/A options for each checklist item with visual feedback (green/orange/gray)",
          "Group items by section with All Complete and Reset buttons",
          "Checklist-only items vs work assignment items (auto-create follow-up WAs)",
          "WA badge shows which items will create Work Assignments if left pending",
          "Admin configuration in Company Settings for labels, sections, and work type linking",
        ],
      },
      {
        title: "Stripe Payment Integration",
        type: "new",
        summary:
          "Accept credit card payments directly through bpmPro with secure Stripe checkout links and automatic webhook updates.",
        details: [
          "Generate secure Stripe checkout links for customers",
          "Automatic payment status updates via webhook",
          "Company Settings configuration for Stripe Connected Account",
          "Payment timeline with visual audit trail",
          "Auto-refresh when non-Stripe payments are posted via Payment Console",
        ],
      },
      {
        title: "Warehouse Log Automation",
        type: "new",
        summary:
          "One-click activity logging for Check-In/Check-Out with automatic order status updates — zero manual status work.",
        details: [
          "Log Check-In and Check-Out activities directly from Product Order records",
          "Mark activities as Complete or Partial for accurate inventory tracking",
          "Handled By dropdown pre-loaded with employee contacts",
          "Has Issues flag for discrepancies or damage",
          "Check-In Complete → Arrived Complete, Check-In with Issues → Arrived with Issues",
          "Check-Out Complete + Fulfilled → Fulfilled (with smart fulfillment prompt)",
          "Complete audit trail for every warehouse activity",
        ],
      },
      {
        title: "Project Financials Dashboard Redesign",
        type: "new",
        summary:
          "Waterfall billing view, profitability analysis, cost variance cards, and estimated vs actual cost breakdown charts.",
        details: [
          "Two-column waterfall layout: Contract & Billing (left) vs Payments & Balance (right)",
          "Color-coded results: green for paid, amber for balance, red for credit",
          "Revenue breakdown: Contract Amount + Change Orders + Service Contracts = Total Revenue",
          "Gross profit with margin and markup percentages",
          "Category variance cards for Products, Labor, and Permit Fees",
          "Stacked bar visualization: Estimated, Actual, and Variance bars",
          "Lost project banner with data preservation",
          "Product reorders indicator in cost breakdown",
        ],
      },
      {
        title: "Finalize Project Wizard",
        type: "new",
        summary:
          "Streamlined project finalization with financial review, invoice summary, building permits section, and unfinalize option.",
        details: [
          "Smart eligibility check before finalization",
          "All workflow stages automatically marked as Passed",
          "Financial summary: Total Invoiced, Total Paid, Balance Due",
          "Invoices list with paid/unpaid status indicators",
          "Project timeline with editable completion date and duration calculation",
          "Building permits and inspection overview with warning counts",
          "Clickable navigation to permits, inspections, and invoices",
          "Unfinalize option for administrators",
        ],
      },
      {
        title: "Additional January Improvements",
        type: "improvement",
        summary:
          "Create Account from Contact quick action, commission CSV export, ChatterFeed enhancements, and Product Order Console redesign.",
        details: [
          "Create Account from Contact with one click (auto-links the Contact)",
          "Commission Payout Manager CSV export for accounting systems",
          "ChatterFeed reply on demand, timeline layout, improved mobile responsiveness",
          "Product Order Console: single Edit button, split Project & SD sections, inline SD linking, NTO Info button",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // NOVEMBER 2025
  // ─────────────────────────────────────────────
  {
    month: "November 2025",
    versions: "v7.06 – v7.19",
    features: [
      {
        title: "Projects Board — Complete Overhaul",
        type: "new",
        summary:
          "Visual pipeline management with real-time stage tracking, smart filtering, historical intelligence, and traffic light dashboard.",
        details: [
          "Color-coded visual pipeline with time-in-stage calculations",
          "Toggle between detailed and compact views",
          "Filter by status, stage, sales rep, and custom criteria",
          '"Lost at Stage" and "Highest Passed Stage" fields for post-mortem analysis',
          "Traffic light dashboard with customizable thresholds",
          "Optimized loading for hundreds of projects",
        ],
      },
      {
        title: "Project Stage Management System",
        type: "new",
        summary:
          "Forward-only stage progression, duration tracking, bottleneck analysis, stage downgrade protection, and inactive stages.",
        details: [
          "Forward-only stage movement ensures data integrity",
          "Automatic duration tracking (hours and days) per stage",
          "Bottleneck analysis: identify which stages consistently take longer",
          "Downgrade protection with clear warnings about data that will be cleared",
          "Inactive stages for scope reduction without losing history",
          "Drag-and-drop stage reordering",
        ],
      },
      {
        title: "Team Assignment & Notification System",
        type: "new",
        summary:
          "Assign team members to stages with automated email notifications and external customer alerts.",
        details: [
          "Stage-specific team assignments with project-specific overrides",
          "Automated internal email notifications when projects enter assigned stages",
          "External customer notifications for up to two configurable milestone stages",
          "Professional HTML email templates",
          "Automatic stage progression when current stage is complete",
        ],
      },
      {
        title: "CPI Add-On Product Catalog",
        type: "new",
        summary:
          "Pre-configured add-on packages that can be quickly added to any sales document with one click.",
        details: [
          "Add-on catalog with pre-configured product packages",
          "One-click auto-add for complete add-on packages",
          "Flexible configuration for custom add-on packages",
          "Seamless integration with existing CPI system",
        ],
      },
      {
        title: "Confidential Item Pricing Distribution",
        type: "improvement",
        summary:
          "Refactored proportional distribution of confidential costs across visible line items with 33-decimal precision.",
        details: [
          "Confidential items proportionally distributed across all visible line items",
          "Cross-category support: labor-based confidential items work with product-only views",
          "33-decimal precision for accurate pricing on large orders",
          "Clear warning when printing proposals with confidential items",
          "Sales tax calculated correctly on actual taxable base",
        ],
      },
      {
        title: "Enhanced PDF Generation",
        type: "improvement",
        summary:
          "Improved footer layout, product vendor images, image height control, and company logo improvements.",
        details: [
          "Cleaner footer layout on customer-facing documents",
          "Removed internal accounting details from customer documents",
          "Product vendor images from catalogs displayed in PDFs",
          "Image height control prevents overflow for consistent formatting",
        ],
      },
      {
        title: "Performance & Architecture",
        type: "improvement",
        internal: true,
        summary:
          "SOQL optimization, bulk operation protection, migrated Flows to Apex, and API version updates.",
        details: [
          "SOQL limit protection for hundreds of records simultaneously",
          "Trigger optimization reduces processing time for bulk updates",
          "Migrated complex Flows and Process Builders to Apex for reliability",
          "API version updates (v62, v63, v64)",
          "Comprehensive test class coverage",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // OCTOBER 2025
  // ─────────────────────────────────────────────
  {
    month: "October 2025",
    versions: "v6.52 – v6.98",
    features: [
      {
        title: "Commission Payout Manager",
        type: "new",
        summary:
          "Complete commission management with payout tracking, chargeback support, and CSV export for accounting.",
        details: [
          "Payout tracking with visibility into calculations and status",
          "Chargeback support for returns and cancellations",
          "Adjusted commissionable cost tracking",
          "Negative commission handling from chargebacks",
          "Submitted payout filtering for items requiring attention",
          "CSV export for integration with external payroll",
        ],
      },
      {
        title: "Email Wizard for Sales Documents",
        type: "new",
        summary:
          "Interactive email composer with smart templates, PDF preview, and rich text formatting — replaces the legacy Send PDF button.",
        details: [
          "Create professional emails directly within bpmPro",
          "Pre-populated recipient info with customizable subject lines",
          "PDF preview before sending",
          "Rich text editor with fonts, colors, and styles",
          "Multiple recipients with TO, CC, BCC support",
        ],
      },
      {
        title: "Recycle Bin",
        type: "new",
        summary:
          "Soft delete functionality with audit trail and easy recovery for accidentally deleted records.",
        details: [
          "Records can be recovered if deleted accidentally",
          "Audit trail of what was deleted and when",
          "Simple process to restore deleted records",
        ],
      },
      {
        title: "Visual Product Previews & A3 Edit Items",
        type: "improvement",
        summary:
          "Hover image previews, drag-and-drop item reordering, keyboard shortcuts, and rearrange mode.",
        details: [
          "Hover over items to view product images",
          "Product images visible while editing line items",
          "Drag & drop to rearrange items in sales documents",
          "Enter and Cancel keyboard shortcuts for faster data entry",
          "Excluded labor cloning preserves labor exclusion settings",
        ],
      },
      {
        title: "Advanced Pricing Controls",
        type: "improvement",
        summary:
          "Decimal precision for markups, enhanced price override modal, cost lock, copy from previous, and mass markup updates.",
        details: [
          "Enter markup and margin values with decimal places for exact pricing",
          "Enhanced price override modal with improved controls and validation",
          "Cost lock feature preserves historical cost data for auditing",
          "Copy from Previous: duplicate pricing settings from prior documents",
          "Mass markup updates across multiple items",
        ],
      },
      {
        title: "Mobile & UI Improvements",
        type: "improvement",
        summary:
          "Compact view toggle, scrolling navigation bar, and status toggle buttons.",
        details: [
          "Compact view toggle for detailed vs minimal views",
          "Refresh buttons and top/bottom navigation",
          "Project Tree Navigator for visual record navigation",
          "Record Trail to track and return to previous records",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // SEPTEMBER 2025
  // ─────────────────────────────────────────────
  {
    month: "September 2025",
    versions: "v6.27 – v6.43",
    features: [
      {
        title: "Tax Flexibility & Reporting",
        type: "improvement",
        summary:
          "Non-taxable designation, enhanced tax reports, county tax proration, sales tax adjustments, and CSV export.",
        details: [
          "Non-taxable option for special pricing scenarios",
          "Sales Tax Treatment as a required field",
          "Enhanced reporting with better visibility by jurisdiction",
          "County tax proration for Washington State support",
          "Manual tax adjustment fields and CSV tax report export",
        ],
      },
      {
        title: "Sales Document Accounting Console",
        type: "new",
        summary:
          "Centralized financial management for quotes and invoices — accounting overview, credit memos, and payment application.",
        details: [
          "See all financial aspects of a sales document in one place",
          "Create and manage invoices directly from sales documents",
          "Credit memo support for returns and credits",
          "Apply payments with real-time balance updates",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // AUGUST 2025
  // ─────────────────────────────────────────────
  {
    month: "August 2025",
    versions: "v6.05 – v6.26",
    features: [
      {
        title: "Confidential Item Pricing Distribution",
        type: "new",
        summary:
          "Proportional distribution of confidential costs across visible line items, migrated from Flows to Apex.",
        details: [
          "Confidential items proportionally distributed across all visible line items",
          "Cross-category support: labor-based confidential items work with product-only views",
          "Sales tax calculated correctly on actual taxable base",
        ],
      },
      {
        title: "Dealer Item Manager",
        type: "new",
        summary:
          "Dedicated interface for managing your product catalog with enhanced lookup, filtering, and history tracking.",
        details: [
          "Brand new dedicated interface for product database management",
          "Improved search with keyword filtering",
          "Optional criteria filtering",
          "History tracking for dealer items",
          "Dedicated Dealer Item application",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // JULY 2025
  // ─────────────────────────────────────────────
  {
    month: "July 2025",
    versions: "v5.87 – v5.96",
    features: [
      {
        title: "Dealer Item Manager — Dedicated Page",
        type: "new",
        summary:
          "New Dealer Item Manager page with keyword search, filters, and Credit Memo improvements.",
        details: [
          "Dealer Item Lookup with filters",
          "Credit Memo improvements",
          "Command Center navigation improvements",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // JUNE 2025
  // ─────────────────────────────────────────────
  {
    month: "June 2025",
    versions: "v5.50 – v5.76",
    features: [
      {
        title: "Supply-Only Mode",
        type: "new",
        summary:
          "Sales Documents can now be configured for supply-only (no labor) with automatic adjustment of pricing, PDF output, and accounting calculations.",
        details: [
          "Toggle supply-only mode per Sales Document",
          "PDF and accounting automatically exclude labor line items",
          "Scope of Work filters items based on supply-only setting",
        ],
      },
      {
        title: "SalesDoc Product/Labor Breakdown",
        type: "new",
        summary:
          "Visual category breakdown on Sales Document pages showing product vs labor cost distribution.",
        details: [
          "Product and labor cost breakdown displayed on SalesDoc page",
          "Category-level visibility into pricing composition",
        ],
      },
      {
        title: "Cloned Item Markups",
        type: "improvement",
        summary:
          "Cloned line items now preserve their original markup settings instead of resetting to defaults.",
        details: [
          "Cloned items retain source markup values",
          "Eliminates manual re-entry after cloning",
        ],
      },
      {
        title: "Installer Summary & Sales Team Display",
        type: "improvement",
        summary:
          "Installer summary view on Sales Documents and sales team member display for better project visibility.",
        details: [
          "Installer summary visible on Sales Documents",
          "Sales team members displayed on SalesDoc pages",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MAY 2025
  // ─────────────────────────────────────────────
  {
    month: "May 2025",
    versions: "v5.02 – v5.49",
    features: [
      {
        title: "Lead & Prospect Management",
        type: "new",
        summary:
          "QuickStart lead creation, prospect object for early-stage opportunities, and multi-contact management.",
        details: [
          "Streamlined lead creation with essential information",
          "Prospect object for tracking early-stage opportunities",
          "Dedicated prospect record page",
          "Referring party tracking in lead creation",
          "Multi-Contact interface for managing multiple contacts per account",
        ],
      },
      {
        title: "Project Tree Navigator & Record Trail",
        type: "new",
        summary:
          "Visual navigation tree for project records and breadcrumb trail to track and return to previously viewed records.",
        details: [
          "Project Tree Navigator for visual record hierarchy",
          "Record Trail to track and return to previous records",
          "SalesDoc Navigator for quick access across documents",
        ],
      },
      {
        title: "SalesDoc Clauses",
        type: "new",
        summary:
          "Configurable terms and clauses on Sales Documents with optional shading and company-level defaults.",
        details: [
          "Add clauses and terms directly to Sales Documents",
          "Optional shading for visual emphasis via Company Settings",
          "Clause ordering with decimal index positioning",
        ],
      },
      {
        title: "Mobile & UI Improvements",
        type: "improvement",
        summary:
          "Account, Contact, and Project pages redesigned for Salesforce Mobile.",
        details: [
          "Account, Contact, and Project pages redesigned for Salesforce Mobile",
          "Optimized layouts for field work on phones and tablets",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // APRIL 2025
  // ─────────────────────────────────────────────
  {
    month: "April 2025",
    versions: "v4.22 – v4.70",
    features: [
      {
        title: "Invoice Payment Module",
        type: "new",
        summary:
          "Record and track payments against invoices with refund support, payment history, and dedicated record pages.",
        details: [
          "Invoice Payment object with dedicated record page and tab",
          "Refund support for invoice payments",
          "Payment history linked to Sales Document Invoices",
        ],
      },
      {
        title: "QuickBooks Invoice Integration",
        type: "new",
        summary:
          "Send multiple Sales Document Invoices to QuickBooks with configurable charge categories.",
        details: [
          "Send multiple SalesDoc Invoices to QuickBooks in one action",
          "Configurable invoice charge categories",
          "Automatic sync between bpmPro and QuickBooks",
        ],
      },
      {
        title: "CPI Integration with Sales Documents",
        type: "new",
        summary:
          "CPI product lists integrated directly into Sales Documents, visible in the Accounting Package and PDF output.",
        details: [
          "CPI product list displayed on Sales Document pages",
          "CPI data included in Accounting Package and PDF",
          "Add CPI products from the SalesDoc record page",
        ],
      },
      {
        title: "Convert to Sold with Deal Sheets",
        type: "new",
        summary:
          "Converting a project to Sold now automatically creates Deal Sheets and initializes Project Stages.",
        details: [
          "Deal Sheets auto-created during Convert to Sold",
          "Project Stages initialized automatically for new sold projects",
          "IsWon status tracked on Project Assignments and Sales Documents",
        ],
      },
      {
        title: "Payout Console & Margin Input",
        type: "improvement",
        summary:
          "Editable price fields in the Payout Console and a new Margin % input for line item pricing.",
        details: [
          "Editable price fields in the Payout Console",
          "Margin % input field for precise pricing control",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // MARCH 2025
  // ─────────────────────────────────────────────
  {
    month: "March 2025",
    versions: "v4.02 – v4.18",
    features: [
      {
        title: "CPI Add-On Functionality",
        type: "new",
        summary:
          "Custom Product Integration (CPI) add-on system for attaching supplementary products to sales documents.",
        details: [
          "Add-on product functionality for CPI items",
          "External ID support for vendor catalog integration",
          "Pass-through items excluded from effective markup calculations",
        ],
      },
      {
        title: "Line Item & Effective Markups",
        type: "new",
        summary:
          "Per-line-item markup controls with effective markup calculations based on commissionable cost.",
        details: [
          "Individual markup values per line item",
          "Effective markup calculated from commissionable cost",
          "Default markup applied when importing items via CSV",
        ],
      },
      {
        title: "Days Unquoted Tracking",
        type: "new",
        summary:
          "Automatic tracking of how long a project has been in Unquoted status for pipeline visibility.",
        details: [
          "Days Unquoted field on Projects",
          "Current Stage logic updated to always reflect Highest Passed stage",
        ],
      },
      {
        title: "Work Assignment Notifications",
        type: "improvement",
        summary:
          "Fixed and improved automated notifications when Work Assignments are created or updated.",
        details: [
          "Reliable notification delivery for Work Assignments",
          "Project Contact Role enhancements",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // JANUARY 2025
  // ─────────────────────────────────────────────
  {
    month: "January 2025",
    versions: "v2.15 – v2.22",
    features: [
      {
        title: "Projects Board Enhancements",
        type: "improvement",
        summary:
          "Color-coded project status indicators, record counters, and horizontal scrolling for the Projects Board.",
        details: [
          "Color-coded status indicators for at-a-glance pipeline health",
          "Record counters per status column",
          "Horizontal scrolling for wide pipeline views",
          "Lowest Pending Status tracking",
        ],
      },
      {
        title: "QuickBooks Integration",
        type: "new",
        summary:
          "Sync projects and invoices with QuickBooks for streamlined accounting workflows.",
        details: [
          "QuickBooks package management and sync",
          "Project record page integration with QuickBooks data",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // DECEMBER 2024
  // ─────────────────────────────────────────────
  {
    month: "December 2024",
    features: [
      {
        title: "Close Deal Wizard",
        type: "new",
        summary:
          'Modern wizard interface for converting quotes to sold projects, replacing the legacy "Convert to Sold" flow.',
        details: [
          "Step-by-step wizard guides users through deal closing",
          "Work type selection with configurable required steps",
          "Built-in validations ensure all required info is captured",
          "Flexible admin configuration for work types and required fields",
          "Full audit trail of who closed the deal and when",
        ],
      },
      {
        title: "Command Center Redesign",
        type: "new",
        summary:
          "Home page rebuilt as a custom LWC with real-time search, 15 organized sections, collapsible tiles, and role-based visibility.",
        details: [
          "Real-time search instantly filters across all tiles",
          "15 organized sections with alphabetical sorting",
          "Collapsible sections — expand/collapse individually or all at once",
          "Role-based visibility: tiles hidden if user lacks object access",
          "Record counts on each tile at a glance",
          "Replaced legacy home page component for improved reliability",
        ],
      },
      {
        title: "Sales Phase vs Production Phase Stages",
        type: "new",
        summary:
          "Project stages now classified as Sales Phase or Production Phase with visual indicators and phase-based filtering.",
        details: [
          "Stage Type classification: Sales Phase or Production Phase",
          "Visual phase indicators for pre-sale and post-sale stages",
          "Phase-based filtering on the Projects Board",
          "Improved reporting on sales cycle vs production cycle timing",
          "Configuration warning banner when Stage Types not yet set up",
        ],
      },
      {
        title: "Product Order Console",
        type: "new",
        summary:
          "Centralized management for product orders with inline editing, deposit tracking, and vendor integration.",
        details: [
          "View and manage all product orders in one place",
          "Inline editing without opening records",
          "Booked SalesDoc Deposit Report for tracking deposits",
          "Visual status indicators for order lifecycle",
          "Seamless connection to vendor ordering workflows",
        ],
      },
      {
        title: "Chatter Feed Component",
        type: "new",
        summary:
          "Project-level Chatter feed for team communication with @mentions and activity history.",
        details: [
          "Chatter feed directly on project records",
          "@Mentions support for tagging team members",
          "Complete conversation history preserved",
        ],
      },
      {
        title: "Additional December Improvements",
        type: "improvement",
        summary:
          'Project Stage Viewer UI cleanup, streamlined calculations, and "Unquoted" status replaces "Open".',
        details: [
          "Project Stage Viewer: cleaner UI, better visual hierarchy",
          "Streamlined stage calculations for improved accuracy",
          'Status renamed: "Open" is now "Unquoted" for clarity',
          "Projects Board performance improvements for large data sets",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // PREMIUM ADD-ON
  // ─────────────────────────────────────────────
  {
    month: "Premium Add-On",
    features: [
      {
        title: "Service Ticket Module",
        type: "new",
        summary:
          "Complete post-installation service management — service tickets, automated notifications, printable work orders, and full project integration.",
        details: [
          "Service ticket creation linked to existing projects and customers",
          "Automated team assignment and notification system for service operations",
          "Professional PDF output for field technicians",
          "Complete service history tracking per project and customer",
          "Purpose-built for window and door warranty and repair work",
          "Available as a premium add-on to your bpmPro subscription",
        ],
      },
    ],
  },
];
