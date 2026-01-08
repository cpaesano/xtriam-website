/**
 * bpmPro Knowledge Base for AI Support Agent
 *
 * This file contains structured knowledge about bpmPro features and functionality.
 * The AI agent uses keyword matching to find relevant sections and include them
 * in its context when responding to user questions.
 *
 * HOW TO ADD NEW TOPICS:
 * 1. Create a new entry in KNOWLEDGE_BASE
 * 2. Add relevant keywords (lowercase) that users might use
 * 3. Write comprehensive content in markdown format
 * 4. Export the topic in the KNOWLEDGE_BASE object
 *
 * CONTENT GUIDELINES:
 * - Be specific and actionable
 * - Include step-by-step instructions where applicable
 * - Document common errors and their solutions
 * - Keep language simple and clear
 */

export interface KnowledgeTopic {
  keywords: string[];
  title: string;
  content: string;
}

export const KNOWLEDGE_BASE: Record<string, KnowledgeTopic> = {
  // ============================================
  // QUOTES & PROPOSALS
  // ============================================
  quotes: {
    keywords: [
      "quote",
      "quotes",
      "proposal",
      "proposals",
      "pricing",
      "estimate",
      "bid",
      "create quote",
      "new quote",
      "pdf",
      "send quote",
      "quote template",
    ],
    title: "Quotes & Proposals",
    content: `
## Quotes & Proposals

### Overview
The Quotes module in bpmPro allows you to create professional proposals for window and door projects. Quotes include product line items, pricing, discounts, and can be converted to PDF for customer delivery.

### How to Create a New Quote

1. **Navigate to the Account or Opportunity**
   - Search for the customer in the global search
   - Or find them in the Accounts tab

2. **Click "New Quote"**
   - Located in the Quotes related list
   - Or use the Quick Action button

3. **Fill in Quote Details**
   - Quote Name: Auto-generated or custom
   - Close Date: When you expect to close
   - Contact: Primary contact for this quote
   - Description: Optional project notes

4. **Add Products**
   - Click "Add Products" button
   - Select from Product Catalog
   - Enter quantity and any overrides
   - Products pull pricing from Price Book

5. **Apply Discounts (Optional)**
   - Line item discounts: Edit each line
   - Quote-level discount: Use Discount field

6. **Generate PDF**
   - Click "Generate PDF" button
   - PDF uses your company's template
   - Includes logo, terms, line items

7. **Send to Customer**
   - Click "Email Quote" to send directly
   - Or download PDF and send manually

### Quote Statuses
- **Draft**: Being created/edited
- **Sent**: Delivered to customer
- **Accepted**: Customer approved (triggers next steps)
- **Rejected**: Customer declined

### Common Issues

**"Missing Price" Error**
- The product doesn't have a price in the active Price Book
- Solution: Go to Product record → Price Books → Add entry

**"Cannot Edit Quote"**
- Quote is locked after being Accepted
- Solution: Clone the quote to create a new editable version

**PDF Not Generating**
- Check that all required fields are filled
- Ensure PDF template is active
- Try refreshing the page and trying again

### Tips
- Use Quote Templates for common project types
- Preview PDF before sending to catch errors
- Add photos from the opportunity for visual proposals
`,
  },

  // ============================================
  // PROJECTS BOARD
  // ============================================
  projects: {
    keywords: [
      "project",
      "projects",
      "board",
      "kanban",
      "installation",
      "schedule",
      "scheduling",
      "job",
      "jobs",
      "project board",
      "projects board",
      "drag",
      "move project",
      "project status",
    ],
    title: "Projects Board",
    content: `
## Projects Board

### Overview
The Projects Board provides a visual Kanban-style view of all active jobs. Drag and drop projects between columns to update their status as they progress through your workflow.

### Accessing the Projects Board
- Click "Projects Board" tab in the navigation
- Or use the App Launcher → Projects Board

### Understanding the Columns

| Column | Meaning |
|--------|---------|
| **Lead** | New opportunity, not yet sold |
| **Sold** | Contract signed, preparing order |
| **Ordered** | Products ordered from manufacturer |
| **Scheduled** | Installation date set |
| **In Progress** | Installation underway |
| **Completed** | Job finished |

### Moving Projects
1. Click and hold a project card
2. Drag to the appropriate column
3. Release to update status
4. Status change is saved automatically

### Project Card Information
Each card displays:
- Customer name
- Project address
- Current status
- Next action needed
- Total project value

### Filtering Projects
- Use the filter bar at the top
- Filter by: Salesperson, Date Range, Value
- Save favorite filters for quick access

### Tips
- Check the board daily for action items
- Use colors to identify project types
- Click a card to open full project details
`,
  },

  // ============================================
  // CLOSE DEAL WIZARD
  // ============================================
  closeDeal: {
    keywords: [
      "close deal",
      "close",
      "deal",
      "wizard",
      "contract",
      "signing",
      "signature",
      "won",
      "win",
      "accept",
      "accepted",
      "close deal wizard",
    ],
    title: "Close Deal Wizard",
    content: `
## Close Deal Wizard

### Overview
The Close Deal Wizard streamlines the process of converting an accepted quote into an active project. It guides you through collecting signatures, deposits, and creating the project record.

### When to Use
Use the Close Deal Wizard when:
- Customer has verbally accepted the quote
- You're ready to collect signature and deposit
- You need to create a project from the opportunity

### Step-by-Step Process

1. **Open the Quote**
   - Navigate to the accepted quote
   - Click "Close Deal" button

2. **Review Quote Details**
   - Verify pricing and products
   - Confirm all information is correct

3. **Collect Signature**
   - Customer signs on tablet/device
   - Or upload signed document
   - E-signature is legally binding

4. **Collect Deposit**
   - Enter deposit amount (usually 50%)
   - Process payment via Stripe
   - Or record check/cash payment

5. **Create Project**
   - Project record is auto-created
   - Linked to quote and account
   - Appears on Projects Board

6. **Send Confirmation**
   - Email confirmation to customer
   - Includes receipt and next steps

### Tips
- Have the customer present for signatures
- Process deposit immediately
- Verify contact info before sending confirmation
`,
  },

  // ============================================
  // PAYMENTS & STRIPE
  // ============================================
  payments: {
    keywords: [
      "payment",
      "payments",
      "stripe",
      "pay",
      "invoice",
      "deposit",
      "balance",
      "credit card",
      "charge",
      "collect",
      "refund",
      "payment link",
    ],
    title: "Payments & Stripe Integration",
    content: `
## Payments & Stripe Integration

### Overview
bpmPro integrates with Stripe to accept credit card payments directly from customers. You can collect deposits, progress payments, and final balances.

### Collecting a Payment

1. **From a Project Record**
   - Open the project
   - Click "Request Payment" button

2. **Set Payment Details**
   - Enter amount
   - Add description (e.g., "50% Deposit")
   - Select payment type

3. **Send Payment Link**
   - Customer receives email with secure link
   - They enter card details on Stripe-hosted page
   - You're notified when payment completes

### Payment Types
- **Deposit**: Initial payment (usually 50%)
- **Progress**: Mid-project payment
- **Final**: Balance due at completion
- **Custom**: Any other amount

### Viewing Payment History
- Go to Project → Payments related list
- See all payments with status
- Download receipts as needed

### Processing Refunds
1. Open the payment record
2. Click "Issue Refund"
3. Enter refund amount (full or partial)
4. Confirm refund
5. Customer receives refund to original card

### Common Issues

**Payment Failed**
- Card declined: Ask customer for different card
- Expired card: Request updated info
- Insufficient funds: Customer needs to resolve with bank

**Customer Didn't Receive Link**
- Check spam folder
- Verify email address
- Resend payment link

### Tips
- Send payment links immediately after signing
- Follow up on unpaid invoices within 48 hours
- Keep Stripe account credentials secure
`,
  },

  // ============================================
  // COMMISSIONS
  // ============================================
  commissions: {
    keywords: [
      "commission",
      "commissions",
      "payout",
      "pay out",
      "sales rep",
      "rep",
      "earnings",
      "calculate",
      "percentage",
      "split",
    ],
    title: "Commission Payout Manager",
    content: `
## Commission Payout Manager

### Overview
The Commission Payout Manager automatically calculates and tracks sales commissions based on your company's commission structure.

### How Commissions Are Calculated
- Based on the sold project value
- Uses commission rules set by admin
- Can vary by product type, salesperson, or tier

### Viewing Your Commissions
1. Click "My Commissions" tab
2. See pending and paid commissions
3. Filter by date range or status

### Commission Statuses
- **Pending**: Calculated but not yet paid
- **Approved**: Approved for payout
- **Paid**: Commission has been paid

### For Managers: Running Payouts
1. Go to Commission Manager
2. Review pending commissions
3. Select commissions to pay
4. Click "Process Payout"
5. Mark as paid after issuing checks

### Commission Splits
If multiple salespeople are on a deal:
- Each rep's percentage is set on the opportunity
- Commissions are automatically split
- Each rep sees their portion

### Tips
- Check commissions weekly
- Report discrepancies to your manager
- Keep track of commission statements
`,
  },

  // ============================================
  // REPORTS & DASHBOARDS
  // ============================================
  reports: {
    keywords: [
      "report",
      "reports",
      "dashboard",
      "dashboards",
      "analytics",
      "metrics",
      "kpi",
      "performance",
      "sales report",
      "pipeline",
    ],
    title: "Reports & Dashboards",
    content: `
## Reports & Dashboards

### Overview
bpmPro includes pre-built reports and dashboards to track your business performance. Monitor sales, projects, and key metrics in real-time.

### Accessing Reports
- Click "Reports" tab in navigation
- Use App Launcher → Reports
- Or access from Dashboard charts

### Key Reports Available

**Sales Reports**
- Sales Pipeline: Opportunities by stage
- Won/Lost Analysis: Conversion rates
- Sales by Rep: Individual performance
- Revenue Forecast: Expected revenue

**Project Reports**
- Active Projects: All in-progress jobs
- Project Timeline: Scheduling overview
- Completion Rate: Jobs finished on time

**Financial Reports**
- Revenue by Month: Monthly trends
- Payments Collected: Payment tracking
- Outstanding Balances: Unpaid invoices

### Using Dashboards
1. Click "Dashboards" tab
2. Select a dashboard (e.g., Sales Manager)
3. View charts and metrics
4. Click any chart to drill into details

### Creating Custom Reports
1. Go to Reports → New Report
2. Select report type (Opportunities, Projects, etc.)
3. Add filters and columns
4. Run and save the report

### Scheduling Reports
1. Open the report
2. Click "Subscribe"
3. Set frequency (daily, weekly, monthly)
4. Reports are emailed automatically

### Tips
- Check dashboards daily
- Set up subscriptions for key reports
- Share reports with your team
`,
  },

  // ============================================
  // PRODUCTS & CATALOG
  // ============================================
  products: {
    keywords: [
      "product",
      "products",
      "catalog",
      "price",
      "prices",
      "price book",
      "pricing",
      "add product",
      "window",
      "door",
      "item",
      "line item",
    ],
    title: "Product Catalog",
    content: `
## Product Catalog

### Overview
The Product Catalog contains all windows, doors, and accessories you sell. Products have standard pricing that can be customized per quote.

### Finding Products
1. Go to Products tab
2. Search by name or code
3. Or browse by category

### Product Information
Each product includes:
- Name and Description
- Product Code/SKU
- Standard Price
- Category
- Active/Inactive status

### Adding Products to Quotes
1. Open a quote
2. Click "Add Products"
3. Search or browse catalog
4. Select products
5. Enter quantity
6. Adjust price if needed

### Price Books
- Standard Price Book: Default pricing
- Custom Price Books: Special pricing for specific customers
- Volume Pricing: Discounts for large orders

### For Admins: Managing Products
1. Go to Products tab
2. Click "New Product"
3. Enter details and save
4. Add to Price Book with pricing

### Tips
- Keep product names consistent
- Deactivate discontinued items (don't delete)
- Review pricing quarterly
`,
  },

  // ============================================
  // ES WINDOWS IMPORT
  // ============================================
  esWindows: {
    keywords: [
      "es windows",
      "es",
      "import",
      "upload",
      "csv",
      "excel",
      "integration",
      "manufacturer",
      "order",
    ],
    title: "ES Windows Integration",
    content: `
## ES Windows Integration

### Overview
bpmPro can import quotes directly from ES Windows software, saving you from manual data entry. This feature pulls product specs and pricing from your ES Windows quotes.

### How to Import

1. **Export from ES Windows**
   - In ES Windows, export quote as CSV/Excel
   - Save file to your computer

2. **Import to bpmPro**
   - Open the Opportunity/Quote
   - Click "Import ES Windows Quote"
   - Select your file
   - Click "Upload"

3. **Review Import**
   - Preview imported products
   - Verify quantities and specs
   - Make any adjustments
   - Click "Confirm Import"

### What Gets Imported
- Product names and specs
- Quantities
- Unit prices
- Total amounts
- Custom configurations

### Common Issues

**Import Failed**
- Check file format (CSV or Excel only)
- Ensure file isn't corrupted
- Try exporting again from ES Windows

**Products Not Matching**
- Product codes must match catalog
- Check for typos in ES Windows
- May need to map products manually

### Tips
- Use consistent product codes in ES Windows
- Review imports before accepting
- Contact support for mapping issues
`,
  },

  // ============================================
  // EMAIL & NOTIFICATIONS
  // ============================================
  email: {
    keywords: [
      "email",
      "emails",
      "notification",
      "notifications",
      "template",
      "send email",
      "email wizard",
      "alert",
      "alerts",
      "reminder",
    ],
    title: "Email Wizard & Notifications",
    content: `
## Email Wizard & Notifications

### Overview
bpmPro includes email templates and automated notifications to keep customers and team members informed throughout the sales and installation process.

### Using Email Templates

1. **From a Record**
   - Open Account, Contact, or Project
   - Click "Send Email" button

2. **Select Template**
   - Choose from pre-built templates
   - Or compose custom email

3. **Personalize**
   - Merge fields auto-fill customer info
   - Add custom message if needed
   - Attach documents

4. **Send**
   - Preview before sending
   - Click "Send"
   - Email is logged in activity history

### Available Templates
- Quote Follow-up
- Deposit Request
- Installation Scheduled
- Installation Complete
- Thank You / Review Request

### Team Notifications
Automatic alerts sent to team members:
- New lead assigned
- Quote approved
- Payment received
- Project status change

### Managing Notifications
1. Go to Setup → Notifications
2. Enable/disable notification types
3. Set preferred delivery (email, in-app)

### Tips
- Personalize templates with your voice
- Follow up within 24 hours
- Use email tracking to see opens
`,
  },

  // ============================================
  // MOBILE ACCESS
  // ============================================
  mobile: {
    keywords: [
      "mobile",
      "phone",
      "app",
      "salesforce app",
      "ios",
      "android",
      "tablet",
      "field",
      "on the go",
      "offline",
    ],
    title: "Mobile Access",
    content: `
## Mobile Access

### Overview
Access bpmPro from your mobile device using the Salesforce Mobile App. View records, update projects, and stay connected while in the field.

### Getting the App

**iOS (iPhone/iPad)**
1. Open App Store
2. Search "Salesforce"
3. Download and install
4. Log in with your bpmPro credentials

**Android**
1. Open Google Play Store
2. Search "Salesforce"
3. Download and install
4. Log in with your bpmPro credentials

### What You Can Do on Mobile
- View and edit accounts/contacts
- Check project status
- Update opportunities
- View dashboards
- Take photos and attach to records
- Get push notifications

### Offline Mode
- Download records for offline access
- Changes sync when back online
- Available for key objects

### Tips
- Enable push notifications
- Download important records before site visits
- Use voice-to-text for notes
- Take photos and attach to projects
`,
  },

  // ============================================
  // COMMON ERRORS & TROUBLESHOOTING
  // ============================================
  errors: {
    keywords: [
      "error",
      "problem",
      "issue",
      "not working",
      "broken",
      "help",
      "fix",
      "troubleshoot",
      "can't",
      "cannot",
      "won't",
      "failed",
      "stuck",
    ],
    title: "Common Errors & Troubleshooting",
    content: `
## Common Errors & Troubleshooting

### Login Issues

**"Invalid Username or Password"**
- Check for typos
- Verify caps lock is off
- Try "Forgot Password" if unsure

**"Account Locked"**
- Too many failed attempts
- Contact your admin to unlock
- Or wait 30 minutes

### Quote Errors

**"Missing Required Fields"**
- Check for red asterisks on required fields
- Common: Contact, Close Date, Account

**"Cannot Generate PDF"**
- All products must have prices
- Template must be active
- Try clearing cache and retrying

### Project Errors

**"Cannot Move Project"**
- Check permissions
- Project may be locked
- Contact manager for assistance

### Payment Errors

**"Payment Failed"**
- Card was declined
- Ask customer for different card
- Check card hasn't expired

### General Troubleshooting Steps

1. **Refresh the Page**
   - Many issues resolve with a refresh
   - Use Ctrl+F5 / Cmd+Shift+R for hard refresh

2. **Clear Browser Cache**
   - Go to browser settings
   - Clear cache and cookies
   - Log in again

3. **Try Different Browser**
   - Chrome recommended
   - Firefox and Safari also supported
   - Internet Explorer NOT supported

4. **Check Internet Connection**
   - Ensure stable connection
   - Try a different network

5. **Contact Support**
   - If issue persists, create a ticket
   - Include error message and steps to reproduce
`,
  },

  // ============================================
  // ACCOUNT SETUP & ONBOARDING
  // ============================================
  setup: {
    keywords: [
      "setup",
      "onboarding",
      "new user",
      "getting started",
      "first time",
      "how to start",
      "begin",
      "account setup",
      "profile",
    ],
    title: "Account Setup & Getting Started",
    content: `
## Getting Started with bpmPro

### Welcome to bpmPro!
This guide helps new users get set up and familiar with the system.

### First-Time Login

1. **Check Your Email**
   - Look for welcome email from xTriam
   - Contains your username and temporary password

2. **Log In**
   - Go to login.salesforce.com
   - Enter username and temporary password
   - You'll be prompted to change password

3. **Set New Password**
   - Create a strong password
   - Must include: uppercase, lowercase, number, symbol
   - Save password securely

### Setting Up Your Profile

1. **Click Your Profile Icon** (top right)
2. **Edit Profile**
   - Add your photo
   - Update contact info
   - Set timezone and locale

3. **Email Signature**
   - Go to Settings → Email
   - Create your signature
   - Include name, title, phone

### Navigating bpmPro

- **Tabs**: Main navigation at top
- **App Launcher**: Access all apps (waffle icon)
- **Search**: Global search bar
- **Home**: Dashboard and tasks

### Key Areas to Explore

1. **Accounts**: Customer companies
2. **Contacts**: People at those companies
3. **Opportunities**: Potential deals
4. **Quotes**: Proposals with pricing
5. **Projects**: Active jobs

### Need Help?
- Use the AI Chat in Customer Portal
- Create a support ticket
- Call (305) 204-9694
`,
  },

  // ============================================
  // PERMISSIONS & ACCESS
  // ============================================
  permissions: {
    keywords: [
      "permission",
      "permissions",
      "access",
      "role",
      "profile",
      "can't see",
      "not visible",
      "restricted",
      "admin",
    ],
    title: "Permissions & Access",
    content: `
## Permissions & Access

### Understanding Roles
bpmPro has different user roles with varying access levels:

| Role | Access Level |
|------|--------------|
| **Sales Rep** | Own accounts, quotes, projects |
| **Sales Manager** | Team's accounts, reports, approvals |
| **Admin** | Full system access, configuration |
| **Executive** | View all, dashboards, reports |

### What You Can See
Your access depends on:
- Your assigned role/profile
- Record ownership
- Sharing rules set by admin

### Common Access Issues

**"Insufficient Privileges"**
- You don't have access to this feature
- Contact your manager or admin
- May need role upgrade

**"Record Not Found"**
- Record may not be shared with you
- Ask the owner to share it
- Or contact admin

**Can't Edit a Record**
- Record may be locked
- You may have read-only access
- Check if it's owned by someone else

### Requesting Access
1. Identify what you need access to
2. Contact your manager with request
3. Manager contacts admin
4. Admin updates your profile/permissions

### For Admins
Access is managed through:
- Profiles: Base permissions
- Permission Sets: Additional permissions
- Sharing Rules: Record visibility
- Role Hierarchy: Data access by role
`,
  },
};

/**
 * Find relevant knowledge topics based on user message
 * Returns combined content from all matching topics
 */
export function getRelevantKnowledge(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  const relevantTopics: KnowledgeTopic[] = [];

  // Find all topics that match keywords in the user message
  for (const topic of Object.values(KNOWLEDGE_BASE)) {
    const matchScore = topic.keywords.filter((kw) =>
      lowerMessage.includes(kw)
    ).length;

    if (matchScore > 0) {
      relevantTopics.push({ ...topic, matchScore } as KnowledgeTopic & {
        matchScore: number;
      });
    }
  }

  // Sort by match score (most relevant first) and take top 3
  const sortedTopics = relevantTopics
    .sort(
      (a, b) =>
        ((b as KnowledgeTopic & { matchScore: number }).matchScore || 0) -
        ((a as KnowledgeTopic & { matchScore: number }).matchScore || 0)
    )
    .slice(0, 3);

  if (sortedTopics.length === 0) {
    return "";
  }

  return sortedTopics.map((topic) => topic.content).join("\n\n---\n\n");
}

/**
 * Get list of all available topics (for debugging/admin)
 */
export function getAvailableTopics(): string[] {
  return Object.values(KNOWLEDGE_BASE).map((topic) => topic.title);
}
