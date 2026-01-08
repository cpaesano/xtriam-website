---
title: "Accounts, Contacts, Projects & Sales Documents"
keywords:
  - account
  - accounts
  - contact
  - contacts
  - project
  - projects
  - sales document
  - sales documents
  - salesdoc
  - lead
  - leads
  - new lead
  - quickstart
  - create account
  - create contact
  - create project
  - business internal role
  - client
  - vendor
  - homeowner
category: "sales"
---

Accounts, Contacts, Projects & Sales Documents

This guide covers how to create and manage the core records in bpmPro: Accounts, Contacts, Projects, and Sales Documents.

Data Model Overview:

bpmPro uses a hierarchical data structure:
- Account: The top-level record (homeowner, contractor, vendor, etc.)
- Contacts: People associated with the account
- Projects: Jobs/opportunities linked to the account
- Sales Documents: Proposals, contracts, and change orders linked to projects

An Account can have multiple Contacts and multiple Projects. Each Project can have multiple Sales Documents.

---

Creating Accounts

Accounts are categorized into 8 Business Internal Roles:
1. Client - Your customers (homeowners or businesses)
2. Homeowner Association - HOAs that may need approval
3. Labor Subcontractor - Installation crews
4. Municipality - Cities/counties for permits
5. Other - Miscellaneous accounts
6. Owning Company - Your own company (Window Dealer)
7. Product Vendor - Window/door manufacturers
8. Professional Services - Engineers, architects, etc.

How to Create an Account:

Step 1: Navigate to Accounts
- From the Home Page, click on the Accounts tab in the top toolbar

Step 2: Click New Account
- Click the dropdown arrow next to Accounts
- Select "New Account"

Step 3: Fill in Account Details
Required fields:
- Account Name: Customer or company name
- Business Internal Role: Select from the dropdown (e.g., Client, Product Vendor)
- Billing Email Address: Primary email for invoices

Optional but recommended:
- Phone number
- Billing Address
- Shipping Address
- Website

Step 4: Save
- Click "Save" to create the account
- Or "Save & New" to create another account immediately

---

Creating Contacts

Contacts are people associated with an Account. There are several ways to create contacts.

Approach 1: Create Contact from an Account Record

Step 1: Find the Account
- Type the account name in the global Search box
- Select the Account from the search results

Step 2: Go to Contacts Tab
- Inside the Account record, click on the "Contacts" tab in the Account Workspace

Step 3: Click New
- Click the "New" button in the Contacts section

Step 4: Fill in Contact Details
Required fields:
- Last Name

Recommended fields:
- First Name
- Phone
- Mobile
- Email
- Title
- Category (Property Owner, etc.)

Important for Employee Contacts:
If creating a contact for your own company employees:
- Select the Internal Company Role (Sales and Estimating, Operations, Management, etc.)
- Check the "Company Role Active" checkbox

This makes the employee appear in dropdowns for Sales Person, Project Manager, and other assignments.

Internal Company Roles include:
- Accounting
- Administration
- Engineering
- IT Support
- Legal and Compliance
- Management
- Marketing
- Operations
- Permitting
- Sales and Estimating

---

Entering New Leads (Creating Projects)

There are two approaches to create new leads/projects:

Approach 1: Manual 3-Step Process

Step 1: Create the Account
- Follow the "Creating Accounts" steps above

Step 2: Create the Contact
- Follow the "Creating Contacts" steps above

Step 3: Create the Project
- From the Account record, click "New Project" button
- Fill in project details (address, sales person, etc.)

Approach 2: QuickStart New Lead Creation (Recommended)

This automated flow creates Account, Contact, and Project in one step.

Step 1: Go to Leads Tab
- Click on the "Leads" tab in the navigation

Step 2: Fill in the QuickStart Form
Contact Information:
- First Name
- Last Name
- Mobile Number
- Email Address
- Is Lead a Contractor? (Yes/No)

Billing and Project Address:
- Billing Street Address
- Billing City
- Billing State
- Billing Zip Code
- Is Project Address the same as Billing Address? (Yes/No)

Step 3: Click Next
- Review the information entered

Step 4: Enter Project Details
Optional fields:
- Sales Person
- Project Manager
- Lead Source (Company Truck, Referral, etc.)
- Service Type (Product + Installation, etc.)
- Relationship (New Client, Repeat Client)
- Construction Type (Retrofit - Residential, etc.)

Step 5: Create Sales Document (Optional)
- Check "Create Sales Document" if you want to create a proposal immediately
- Enter a Sales Document Name (e.g., "John Smith Proposal")

Step 6: Click Next
- The system creates: Account, Contact, Project, and optionally a Sales Document

Step 7: Access Your Records
- Click the "Projects" or "Sales Documents" icons to view the newly created records

---

Sales Documents

Sales Documents are proposals, contracts, or change orders linked to a Project.

Types of Sales Documents:
- Proposal: Initial quote for the customer
- Contract: Signed agreement
- Change Order: Modifications after contract signing

Sales Document Structure:
Each Sales Document contains:
- Product & Labor Items: Windows, doors, and installation labor
- Specialty Items: Additional items like permits, engineering, etc.

Creating a Sales Document:

Step 1: Open the Project
- Navigate to the Project record

Step 2: Go to Sales Documents
- Click on the "Sales Documents" related list

Step 3: Click New
- Fill in Sales Document details

Step 4: Add Items
- Add Product & Labor Items from the catalog
- Add Specialty Items as needed

Multiple Sales Documents:
You can create multiple Sales Documents per Project for:
- Different product options (standard paint vs. premium)
- Different scopes (windows only, doors only)
- Different pricing scenarios

---

Related Records on Projects

Projects can have many related records:
- Sales Documents: Proposals and contracts
- Payments: Customer payments
- Work Assignments: Scheduled work (measurements, installations)
- Building Permits: Permit tracking
- Product Orders: Orders to manufacturers
- Sales Commissions: Rep commissions
- Labor Charges: Installer payments
- Material Charges: Additional materials
- Cases: Support tickets

---

Common Issues:

"Cannot Create Contact":
- Make sure you have an Account first
- Contacts must be linked to an Account

"Employee Not Showing in Dropdowns":
- Check that Internal Company Role is set
- Check that Company Role Active is checked

"Duplicate Account Warning":
- bpmPro checks for potential duplicates
- Review the warning and proceed if it's a new account

Tips:
- Always search for existing accounts before creating new ones
- Use the QuickStart flow for faster lead entry
- Fill in as much information as possible for better reporting
- Keep Business Internal Roles consistent for accurate filtering
