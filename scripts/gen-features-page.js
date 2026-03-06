// Generates static-pages/bpmpro-features.html from template + data
const fs = require("fs");
const path = require("path");

// Read template (index.html) and extract head/header/footer
const template = fs.readFileSync(
  path.join(__dirname, "../static-pages/index.html"),
  "utf-8"
);

// Extract header (from <header to </header>)
const headerMatch = template.match(
  /( {2}<!-- Header -->[\s\S]*?<\/header>)/
);
const header = headerMatch[1];

// Extract footer + GA
const footerMatch = template.match(
  /( {2}<!-- Footer -->[\s\S]*?<\/footer>[\s\S]*?<\/script>)/
);
const footer = footerMatch[1];

const checkSvg = `<svg class="h-4 w-4 mt-0.5 text-brand-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
const checkBlueSvg = `<svg class="h-5 w-5 mt-0.5 text-brand-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
const checkOrangeSvg = `<svg class="h-5 w-5 mt-0.5 text-brand-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;

const heroFeatures = [
  {
    icon: `<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>`,
    title: "Projects Board",
    description: "Your command center for project oversight with visual pipeline management.",
    highlights: ["Visual pipeline with color-coded stages", "Traffic light dashboard for project health", "Real-time stage tracking & time calculations", "Smart filtering by status, stage, sales rep"],
    isNew: false,
  },
  {
    icon: `<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
    title: "Close Deal Wizard",
    description: "Modern wizard interface guides users through the complete deal closing process.",
    highlights: ["Step-by-step guided workflow", "Configurable work types", "Built-in validations", "Full audit trail"],
    isNew: true,
  },
  {
    icon: `<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
    title: "Email Wizard",
    description: "Send professional proposals directly from bpmPro with PDF preview.",
    highlights: ["Interactive email composer", "Smart templates with auto-fill", "PDF preview before sending", "Rich text formatting"],
    isNew: true,
  },
  {
    icon: `<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
    title: "Commission Payout Manager",
    description: "Complete visibility into commission calculations, payouts, and chargebacks.",
    highlights: ["Payout tracking & status", "Chargeback support", "Adjusted commissionable cost", "Commission console for approvals"],
    isNew: true,
  },
  {
    icon: `<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`,
    title: "Team Notifications",
    description: "Automated internal and external notifications throughout the project lifecycle.",
    highlights: ["Stage-specific team assignments", "Automated customer alerts", "Professional HTML email templates", "Dual-stage notification support"],
    isNew: true,
  },
  {
    icon: `<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`,
    title: "Stripe Payments",
    description: "Accept payments and track cash flow with integrated Stripe processing.",
    highlights: ["Payment links via email/text", "All major cards accepted", "Automatic payment recording", "Real-time reporting"],
    isNew: false,
  },
];

const featureCategories = [
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
    title: "Project Management", subtitle: "Track every project from lead to completion",
    features: [
      { name: "Visual Pipeline Management", description: "Color-coded project stages" },
      { name: "Sales Phase vs Production Phase", isNew: true, description: "Clear phase separation" },
      { name: "Stage Duration Tracking", description: "Identify bottlenecks" },
      { name: "Traffic Light Dashboard", description: "Quick health indicators" },
      { name: "Automatic Stage Progression", description: "Smart workflow automation" },
      { name: "Stage Downgrade Protection", description: "Prevent accidental data loss" },
      { name: "Inactive Stages", description: "Soft delete for scope reduction" },
      { name: "Project Stage Viewer", description: "Enhanced visibility" },
      { name: "Time in Stage Calculations", description: "Real-time tracking" },
      { name: "Lost at Stage Tracking", description: "Post-mortem analysis" },
      { name: "Project Tree Navigator", description: "Visual record navigation" },
      { name: "Compact View Toggle", description: "Detailed or condensed views" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
    title: "Sales & Quoting", subtitle: "Win more business with professional proposals",
    features: [
      { name: "Close Deal Wizard", isNew: true, description: "Guided deal closing" },
      { name: "Email Wizard", isNew: true, description: "Send proposals directly" },
      { name: "Professional PDF Generation", description: "Branded documents" },
      { name: "Proposal Summary Field", description: "Executive summaries" },
      { name: "Price Anchoring Labels", description: "Strategic pricing presentation" },
      { name: "Clone Plus Flow", description: "Smart document cloning" },
      { name: "Sales Document Navigator", description: "Easy navigation" },
      { name: "QuickStart Lead Creation", description: "Fast lead capture" },
      { name: "Prospect Object", description: "Early-stage opportunity tracking" },
      { name: "Referring Party Tracking", description: "Track referral sources" },
      { name: "Multi-Contact Management", description: "Multiple contacts per account" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    title: "Pricing & Tax Management", subtitle: "Flexible pricing with precision controls",
    features: [
      { name: "Decimal Precision Pricing", description: "Exact markup/margin values" },
      { name: "Confidential Item Distribution", isNew: true, description: "Smart cost distribution" },
      { name: "Enhanced Price Override Modal", description: "Improved controls" },
      { name: "Cost Lock Feature", description: "Preserve historical costs" },
      { name: "Copy from Previous", description: "Duplicate pricing quickly" },
      { name: "Mass Markup Updates", description: "Bulk pricing changes" },
      { name: "Multi-Jurisdiction Tax", description: "County tax proration" },
      { name: "Tax Exempt Handling", description: "Proper exemption processing" },
      { name: "Non-Taxable Designation", description: "Special pricing scenarios" },
      { name: "CSV Tax Reports", description: "Export for accounting" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
    title: "Accounting & Commissions", subtitle: "Track finances and pay your team accurately",
    features: [
      { name: "Commission Payout Manager", isNew: true, description: "Complete payout tracking" },
      { name: "Sales Document Accounting Console", isNew: true, description: "Centralized financials" },
      { name: "Invoice Management", description: "Create and manage invoices" },
      { name: "Credit Memo Support", description: "Handle returns and credits" },
      { name: "Payment Application", description: "Real-time balance updates" },
      { name: "Job Costing Fields", description: "Actual vs estimated costs" },
      { name: "Backcharge Functionality", description: "Contractor backcharges" },
      { name: "Chargeback Support", description: "Commission adjustments" },
      { name: "Building Materials History", description: "Track cost changes" },
      { name: "Add-On Product Tracking", description: "Post-contract items" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`,
    title: "Product & Inventory", subtitle: "Manage your product catalog and orders",
    features: [
      { name: "Product Order Console", isNew: true, description: "Centralized order management" },
      { name: "Dealer Item Manager", description: "Product catalog management" },
      { name: "Visual Product Previews", description: "Hover to see images" },
      { name: "Drag & Drop Item Organization", description: "Intuitive reordering" },
      { name: "CPI Add-On Product Catalog", isNew: true, description: "Pre-configured packages" },
      { name: "Vendor Image Toggle", description: "Custom or vendor images" },
      { name: "Keyboard Shortcuts", description: "Faster data entry" },
      { name: "Excluded Labor Cloning", description: "Preserve settings when copying" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>`,
    title: "Industry Integrations", subtitle: "Connect with window & door vendor systems",
    features: [
      { name: "ES Windows Integration", description: "Import quotes directly" },
      { name: "Mr. Glass Integration", description: "Product imagery and data" },
      { name: "Air Master CSV Import", description: "Import product data" },
      { name: "Stripe Payment Processing", description: "Accept online payments" },
      { name: "QuickBooks Sync", description: "Accounting integration" },
      { name: "Salesforce Mobile App", description: "iOS and Android access" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`,
    title: "Communication & Notifications", subtitle: "Keep your team and customers informed",
    features: [
      { name: "External Customer Notifications", isNew: true, description: "Automated milestone alerts" },
      { name: "Team Assignment Notifications", description: "Auto-notify on stage entry" },
      { name: "Chatter Feed Component", isNew: true, description: "Project-level discussions" },
      { name: "Professional Email Templates", description: "Branded communications" },
      { name: "Dual-Stage Notifications", description: "Configure critical milestones" },
      { name: "@Mentions Support", description: "Tag team members" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
    title: "Reports & Analytics", subtitle: "Data-driven insights for better decisions",
    features: [
      { name: "Command Center Dashboard", isNew: true, description: "Real-time search & navigation" },
      { name: "Traffic Light Dashboard", description: "Visual health indicators" },
      { name: "Stage Duration Reports", description: "Bottleneck analysis" },
      { name: "Sales Commission Reports", description: "Detailed payout reporting" },
      { name: "Leads and Sales Reports", description: "Conversion tracking" },
      { name: "Project Count by Stage", description: "Pipeline visibility" },
      { name: "Customizable KPIs", description: "Industry-specific metrics" },
      { name: "Sales Rep Homepage", description: "Key metrics at a glance" },
    ],
  },
  {
    icon: `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`,
    title: "Compliance & Documentation", subtitle: "Stay compliant and organized",
    features: [
      { name: "Permitting Data Management", description: "Track permit expirations" },
      { name: "Building Inspection Tracking", description: "Schedule and record results" },
      { name: "Document Uploads", description: "Photos and attachments" },
      { name: "Recycle Bin", description: "Recover deleted records" },
      { name: "Audit Trail", description: "Track all changes" },
      { name: "Role-Based Permissions", description: "Control who sees what" },
    ],
  },
];

const serviceTicketFeatures = [
  "Complete service ticket management for post-installation work",
  "Automated team notifications for service operations",
  "Printable PDF service work orders",
  "Full service history linked to projects and customers",
  "Warranty and maintenance contract tracking",
];

const platformBenefits = [
  "Enterprise-grade security and compliance (SOC 2)",
  "99.9% uptime guarantee",
  "Automatic updates and maintenance",
  "Seamless integration with 3,000+ business tools",
  "Scalable from small teams to enterprise",
  "Mobile apps for iOS and Android",
];

const stats = [
  { value: "50+", label: "Features" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Cloud Access" },
  { value: "Mobile", label: "Ready" },
];

// Build hero features HTML
function renderHeroFeatures() {
  return heroFeatures.map(f => `
            <div class="relative group rounded-2xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-lg hover:border-brand-blue-300">
              ${f.isNew ? '<span class="absolute top-4 right-4 inline-flex items-center rounded-full bg-brand-orange-100 px-2.5 py-0.5 text-xs font-medium text-brand-orange-700">NEW</span>' : ''}
              <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue-100 text-brand-blue-600 group-hover:bg-brand-blue-600 group-hover:text-white transition-colors">
                ${f.icon}
              </div>
              <h3 class="mt-6 text-xl font-bold text-foreground">${f.title}</h3>
              <p class="mt-3 text-muted-foreground">${f.description}</p>
              <ul class="mt-4 space-y-2">
                ${f.highlights.map(h => `<li class="flex items-start gap-2 text-sm text-muted-foreground">${checkSvg} ${h}</li>`).join('\n                ')}
              </ul>
            </div>`).join('\n');
}

// Build feature categories HTML
function renderCategories() {
  return featureCategories.map((cat, i) => `
      <section class="${i % 2 === 0 ? 'bg-muted/30 py-16' : 'py-16'}">
        <div class="mx-auto max-w-7xl px-4 lg:px-8">
          <div class="flex items-center gap-4 mb-10">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue-600 text-white">
              ${cat.icon}
            </div>
            <div>
              <h2 class="text-2xl font-bold text-foreground">${cat.title}</h2>
              <p class="text-muted-foreground">${cat.subtitle}</p>
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            ${cat.features.map(f => `
            <div class="flex items-start gap-3 rounded-lg bg-background p-4 border border-border hover:border-brand-blue-200 transition-colors">
              ${checkBlueSvg}
              <div>
                <span class="font-medium text-foreground">${f.name}</span>
                ${f.isNew ? '<span class="ml-2 inline-flex items-center rounded bg-brand-orange-100 px-1.5 py-0.5 text-xs font-medium text-brand-orange-700">NEW</span>' : ''}
                ${f.description ? `<p class="mt-1 text-sm text-muted-foreground">${f.description}</p>` : ''}
              </div>
            </div>`).join('\n')}
          </div>
        </div>
      </section>`).join('\n');
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>bpmPro Features | 50+ Tools for Window &amp; Door Contractors</title>
  <meta name="description" content="Explore 50+ features built specifically for window and door contractors: Projects Board, Close Deal Wizard, Commission Manager, Email Wizard, Stripe Payments, and more." />
  <meta name="keywords" content="bpmPro features,window contractor CRM,door contractor software,Salesforce,project management,commission tracking" />
  <meta name="author" content="xTriam" />
  <link rel="canonical" href="https://www.xtriam.com/bpmpro-features" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content="xTriam" />
  <meta property="og:title" content="bpmPro Features | 50+ Tools for Window &amp; Door Contractors" />
  <meta property="og:description" content="Explore 50+ features built specifically for window and door contractors: Projects Board, Close Deal Wizard, Commission Manager, Email Wizard, Stripe Payments, and more." />
  <meta property="og:image" content="https://www.xtriam.com/images/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://www.xtriam.com/bpmpro-features" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="robots" content="index, follow" />
  <link rel="icon" href="/icon.png" />
  <link rel="apple-touch-icon" href="/apple-icon.png" />
  <link rel="preload" href="/static/fonts/geist-sans.woff2" as="font" type="font/woff2" crossorigin />
  <style>
    @font-face {
      font-family: 'Geist';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url('/static/fonts/geist-sans.woff2') format('woff2');
    }
    /* __INLINE_CSS__ */
  </style>
</head>
<body class="antialiased min-h-screen flex flex-col">

${header}

  <main class="flex-1">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-brand-blue-50 to-background py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <div class="inline-flex items-center gap-2 rounded-full bg-brand-orange-100 px-4 py-1.5 text-sm font-medium text-brand-orange-700 mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-orange-500"></span>
            </span>
            Updated for 2026
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            <span class="text-brand-blue-600">50+ Features</span> Built for Window &amp; Door Contractors
          </h1>
          <p class="mt-6 text-lg text-muted-foreground">
            From first lead to final payment, <strong>bpmPro</strong> manages your entire business. Purpose-built on Salesforce for the window and door industry.
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/book-a-demo" class="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:bg-brand-orange-600 transition-colors">See All Features</a>
            <a href="/savings" class="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-semibold text-foreground hover:bg-muted transition-colors">Calculate Savings</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Flagship Features -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground">Flagship Features</h2>
          <p class="mt-4 text-muted-foreground">The core capabilities that set <strong>bpmPro</strong> apart</p>
        </div>
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
${renderHeroFeatures()}
        </div>
      </div>
    </section>

    <!-- Feature Categories -->
${renderCategories()}

    <!-- Premium Add-on Section -->
    <section class="py-16 bg-gradient-to-b from-brand-blue-50 to-background">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="rounded-2xl border-2 border-brand-orange-300 bg-white p-8 lg:p-12">
          <div class="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <span class="inline-flex items-center rounded-full bg-brand-orange-100 px-3 py-1 text-sm font-medium text-brand-orange-700 mb-4">Premium Add-On</span>
              <h2 class="text-3xl font-bold text-foreground">Service Ticket Module</h2>
              <p class="mt-4 text-muted-foreground">
                Extend <strong>bpmPro</strong> beyond project sales into comprehensive post-installation service management. Perfect for warranty work, maintenance contracts, and repair services.
              </p>
              <ul class="mt-6 space-y-3">
                ${serviceTicketFeatures.map(f => `<li class="flex items-start gap-3">${checkOrangeSvg}<span class="text-muted-foreground">${f}</span></li>`).join('\n                ')}
              </ul>
              <div class="mt-8">
                <a href="/contact" class="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-brand-orange-600 transition-colors">Contact Sales for Pricing</a>
              </div>
            </div>
            <div class="bg-gradient-to-br from-brand-orange-100 to-brand-orange-50 rounded-xl p-8">
              <h3 class="font-semibold text-foreground mb-4">Ideal for businesses that:</h3>
              <ul class="space-y-3 text-muted-foreground">
                <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-brand-orange-500"></span> Offer warranty service and support</li>
                <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-brand-orange-500"></span> Have ongoing maintenance contracts</li>
                <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-brand-orange-500"></span> Manage post-installation customer care</li>
                <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-brand-orange-500"></span> Provide window and door repair services</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Built on Salesforce -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Built on Salesforce</h2>
            <p class="mt-4 text-lg text-muted-foreground">
              <strong>bpmPro</strong> leverages the world's #1 CRM platform, giving you enterprise-grade reliability with industry-specific functionality.
            </p>
            <ul class="mt-8 space-y-4">
              ${platformBenefits.map(b => `<li class="flex items-start gap-3"><svg class="mt-1 h-5 w-5 flex-shrink-0 text-brand-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span class="text-muted-foreground">${b}</span></li>`).join('\n              ')}
            </ul>
          </div>
          <div class="grid grid-cols-2 gap-6">
            ${stats.map(s => `<div class="rounded-xl bg-background p-6 text-center shadow-sm border border-border"><div class="text-3xl font-bold text-brand-blue-600">${s.value}</div><div class="mt-2 text-sm text-muted-foreground">${s.label}</div></div>`).join('\n            ')}
          </div>
        </div>
      </div>
    </section>

    <!-- Video Testimonial -->
    <section class="py-16 lg:py-24 bg-muted/30">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span class="inline-flex items-center rounded-full bg-brand-orange-100 px-3 py-1 text-sm font-medium text-brand-orange-700 mb-4">Customer Story</span>
            <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">A Big Game Changer</h2>
            <p class="mt-4 text-lg text-muted-foreground">
              Nour Aljamal, Sales Representative at Hurricane Window and Screen, shares how <strong>bpmPro</strong> has transformed their day-to-day operations.
            </p>
            <blockquote class="mt-6 border-l-4 border-brand-orange-500 pl-4 italic text-muted-foreground">
              "It's been a big game changer for us. The way we track projects, manage our sales pipeline, and communicate with customers has completely transformed."
            </blockquote>
            <div class="mt-6">
              <div class="font-semibold text-foreground">Nour Aljamal</div>
              <div class="text-sm text-muted-foreground">Sales Representative</div>
              <div class="text-sm text-brand-blue-600">Hurricane Window and Screen</div>
            </div>
          </div>
          <div class="rounded-xl overflow-hidden shadow-lg border border-border">
            <button onclick="this.outerHTML='<iframe src=\\'https://player.vimeo.com/video/849143740?autoplay=1&amp;title=0&amp;byline=0&amp;portrait=0\\' class=\\'absolute inset-0 h-full w-full\\' allow=\\'autoplay; fullscreen\\' allowfullscreen title=\\'A Big Game Changer\\'></iframe>'; this.parentElement.classList.add('relative','aspect-video');"
              class="relative aspect-video w-full overflow-hidden bg-gray-900 group cursor-pointer"
              aria-label="Play video: A Big Game Changer">
              <img src="https://vumbnail.com/849143740.jpg" alt="A Big Game Changer - Nour Aljamal" class="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-brand-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-brand-blue-700 group-hover:scale-110 transition-all">
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-brand-blue-600 py-16">
      <div class="mx-auto max-w-7xl px-4 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h2 class="text-2xl font-bold text-white sm:text-3xl">Ready to see 50+ features in action?</h2>
            <p class="mt-2 text-brand-blue-100">Schedule a demo and let us show you how <strong>bpmPro</strong> can transform your business.</p>
          </div>
          <div class="flex gap-4">
            <a href="/savings" class="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-blue-600 hover:bg-brand-blue-50 transition-colors">Calculate Savings</a>
            <a href="/book-a-demo" class="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:bg-brand-orange-600 transition-colors">Book a Demo</a>
          </div>
        </div>
      </div>
    </section>
  </main>

${footer}
</body>
</html>
`;

fs.writeFileSync(
  path.join(__dirname, "../static-pages/bpmpro-features.html"),
  html
);
console.log(
  `Generated bpmpro-features.html (${Math.round(html.length / 1024)}KB)`
);
