import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

// TODO: Replace with actual MDX content loading
const blogPosts: Record<string, {
  title: string;
  date: string;
  category: string;
  image: string;
  content: string;
}> = {
  "why-building-on-platforms-like-salesforce-is-a-game-changer-for-small-businesses": {
    title: "Why Building on Platforms Like Salesforce is a Game-Changer for Small Businesses",
    date: "June 5, 2024",
    category: "Technology",
    image: "/images/blog/salesforce-platform.jpg",
    content: `
      <p>In today's competitive business landscape, small businesses need every advantage they can get. One of the most powerful advantages available is building your business software on established enterprise platforms like Salesforce.</p>

      <h2>The Platform Advantage</h2>
      <p>When you build on a platform like Salesforce, you're not starting from scratch. You're leveraging billions of dollars of investment in security, reliability, and features that would be impossible for a small company to build on its own.</p>

      <h2>Enterprise Security Without Enterprise Costs</h2>
      <p>Salesforce maintains SOC 2 Type II compliance, GDPR compliance, and numerous other security certifications. As a bpmPro customer, you automatically benefit from this enterprise-grade security without paying enterprise prices.</p>

      <h2>Reliability You Can Count On</h2>
      <p>With a 99.9% uptime guarantee and automatic backups, your business data is always available and protected. No more worrying about server maintenance or data loss.</p>

      <h2>Integration Ecosystem</h2>
      <p>The Salesforce AppExchange offers thousands of integrations with other business tools. Need to connect to your accounting software? There's probably already an integration available.</p>

      <h2>Conclusion</h2>
      <p>For window and door contractors looking to modernize their operations, choosing a platform-based solution like bpmPro means getting enterprise capabilities at a fraction of the cost of building custom software.</p>
    `,
  },
  "leveraging-ai-for-small-business-success-the-xtriam-story": {
    title: "Leveraging AI for Small Business Success: The xTriam Story",
    date: "January 8, 2024",
    category: "Innovation",
    image: "/images/blog/a-small-business.png",
    content: `
      <p>Artificial intelligence isn't just for big tech companies anymore. At xTriam, we're using AI to help small window and door contractors compete more effectively.</p>

      <h2>AI-Powered Support</h2>
      <p>Our AI assistant can answer common questions about bpmPro instantly, 24/7. This means our customers get help when they need it, even outside business hours.</p>

      <h2>Smarter Workflows</h2>
      <p>AI helps identify patterns in your business data, suggesting optimizations you might not have noticed. From quote timing to inventory management, intelligent insights drive better decisions.</p>

      <h2>The Human Touch</h2>
      <p>While AI handles routine questions and data analysis, our human team focuses on what matters most: understanding your unique business challenges and building solutions that work for you.</p>
    `,
  },
  "the-ideal-territory-manager-navigating-challenges-in-window-manufacturing": {
    title: "The Ideal Territory Manager: Navigating Challenges in Window Manufacturing",
    date: "October 6, 2023",
    category: "Sales",
    image: "/images/blog/terrority-Manager.jpg",
    content: `
      <p>Territory managers in the window manufacturing industry face unique challenges that require a specific set of skills and strategies to overcome.</p>

      <h2>Understanding Your Territory</h2>
      <p>The first step to success is deeply understanding your territory - the contractors, the competition, and the unique needs of your market.</p>

      <h2>Building Strong Relationships</h2>
      <p>In window manufacturing, relationships are everything. The best territory managers invest time in building genuine connections with their dealers and contractors.</p>

      <h2>Leveraging Technology</h2>
      <p>Modern territory managers use CRM tools like bpmPro to stay organized, track leads, and ensure no opportunity falls through the cracks.</p>
    `,
  },
  "the-power-of-meetings-streamlining-operations-for-window-dealers": {
    title: "The Power of Meetings: Streamlining Operations for Window Dealers",
    date: "September 7, 2023",
    category: "Operations",
    image: "/images/blog/power-of-meetings.png",
    content: `
      <p>Effective meetings can transform your window dealership operations, improving communication and driving better business outcomes.</p>

      <h2>The Cost of Poor Meetings</h2>
      <p>Unproductive meetings waste time and resources. Understanding what makes meetings effective is crucial for operational efficiency.</p>

      <h2>Best Practices for Dealer Meetings</h2>
      <p>Set clear agendas, keep meetings focused, and always end with actionable next steps. These simple practices can dramatically improve meeting outcomes.</p>

      <h2>Tracking Meeting Outcomes</h2>
      <p>Use your CRM to track decisions made in meetings and ensure follow-through on action items.</p>
    `,
  },
  "crafting-the-perfect-first-impression-navigating-the-initial-sales-interaction": {
    title: "Crafting the Perfect First Impression: Navigating the Initial Sales Interaction",
    date: "August 2023",
    category: "Sales",
    image: "/images/blog/first-impression.jpg",
    content: `
      <p>The initial sales interaction sets the tone for your entire relationship with a potential customer. Making it count is essential.</p>

      <h2>Preparation is Key</h2>
      <p>Before meeting with a prospect, research their business and understand their potential needs. This preparation shows professionalism and respect.</p>

      <h2>Active Listening</h2>
      <p>The best salespeople listen more than they talk. Understanding your customer's challenges is the first step to providing valuable solutions.</p>

      <h2>Following Up</h2>
      <p>A great first impression means nothing without proper follow-up. Use your CRM to track interactions and ensure timely communication.</p>
    `,
  },
  "job-supervision-the-not-so-secret-key": {
    title: "Job Supervision: The Not So Secret Key",
    date: "July 2023",
    category: "Operations",
    image: "/images/blog/job-supervision.jpg",
    content: `
      <p>Effective job supervision is crucial for window installation success. It's the difference between satisfied customers and costly callbacks.</p>

      <h2>Setting Clear Expectations</h2>
      <p>Before any installation begins, ensure your team understands exactly what needs to be done and the quality standards expected.</p>

      <h2>On-Site Management</h2>
      <p>Regular check-ins during installation help catch issues early before they become expensive problems.</p>

      <h2>Documentation</h2>
      <p>Proper documentation of each job protects your business and provides valuable data for improving future operations.</p>
    `,
  },
  "making-informed-decisions-with-bpmpro-real-time-warehouse-insights": {
    title: "Making Informed Decisions with bpmPro: Real-Time Warehouse Insights",
    date: "June 5, 2023",
    category: "Technology",
    image: "/images/blog/warehouse-insights.jpeg",
    content: `
      <p>Real-time data helps window contractors make better inventory decisions, reducing waste and improving customer satisfaction.</p>

      <h2>The Challenge of Inventory Management</h2>
      <p>Window contractors deal with complex inventory - different sizes, styles, and special orders. Managing this effectively requires good data.</p>

      <h2>Real-Time Visibility</h2>
      <p>bpmPro provides real-time visibility into your warehouse, so you always know what's in stock and what needs to be ordered.</p>

      <h2>Data-Driven Decisions</h2>
      <p>With accurate inventory data, you can make better purchasing decisions, reduce carrying costs, and ensure you have what customers need.</p>
    `,
  },
  "streamlining-sales-processes-automation-for-window-dealers": {
    title: "Streamlining Sales Processes: Automation for Window Dealers",
    date: "April 3, 2023",
    category: "Sales",
    image: "/images/blog/sales-automation.jpg",
    content: `
      <p>Automation can transform your sales process and boost productivity, allowing your team to focus on what matters most - closing deals.</p>

      <h2>Identifying Automation Opportunities</h2>
      <p>Look for repetitive tasks in your sales process that take time but don't require human judgment. These are prime candidates for automation.</p>

      <h2>Quote Generation</h2>
      <p>Automated quote generation saves hours of manual work while ensuring accuracy and consistency.</p>

      <h2>Follow-Up Automation</h2>
      <p>Never let a lead go cold again. Automated follow-up reminders and emails keep your pipeline moving.</p>
    `,
  },
  "monitoring-key-performance-indicators-at-small-and-medium-sized-businesses": {
    title: "Monitoring Key Performance Indicators at Small and Medium-sized Businesses",
    date: "December 5, 2022",
    category: "Technology",
    image: "/images/blog/monitor-key-performance.jpg",
    content: `
      <p>While KPI monitoring is vital for business success, SMBs face distinct obstacles in implementing this practice consistently.</p>

      <h2>Key Challenges</h2>
      <p><strong>Resource Constraints:</strong> SMBs struggle with limited staffing and budgets, making it difficult to allocate personnel and tools for regular KPI analysis.</p>
      <p><strong>Knowledge Gaps:</strong> Many smaller enterprises lack dedicated analytics teams, which hampers their ability to accurately interpret performance data.</p>
      <p><strong>Operational Demands:</strong> Daily business activities often take precedence, leaving SMBs stretched thin while juggling customer leads, managing sales, and maintaining cash flow.</p>

      <h2>Recommended Solutions</h2>
      <ul>
        <li>Invest in analytical software to streamline reporting</li>
        <li>Obtain external consulting assistance for data interpretation</li>
        <li>Establish consistent monitoring routines</li>
      </ul>

      <h2>How bpmPro Helps</h2>
      <p>bpmPro helps business leaders uncover and keep track of key performance metrics in real-time, enabling them to run their businesses more effectively.</p>
    `,
  },
  "some-insights-about-business-process-management-bpm": {
    title: "Some Insights about Business Process Management (BPM)",
    date: "November 8, 2022",
    category: "Technology",
    image: "/images/blog/business-process-management-insights.jpg",
    content: `
      <p>Business process management represents a discipline dedicated to enhancing organizational performance through process optimization and automation.</p>

      <h2>Key Developments Shaping BPM</h2>

      <h3>1. Low-code BPM</h3>
      <p>Low-code platforms enable business users to create and modify workflows without extensive programming expertise, accelerating digital transformation efforts.</p>

      <h3>2. Cloud-based BPM</h3>
      <p>Cloud solutions provide scalability and flexibility. xTriam specifically builds bpmPro on Salesforce's platform for contracting services.</p>

      <h3>3. Process Mining</h3>
      <p>Data-driven analysis techniques extract information from transaction logs and databases to identify bottlenecks.</p>

      <h3>4. Robotic Process Automation</h3>
      <p>Software robots handle repetitive tasks, improving efficiency while freeing employees for strategic work.</p>

      <h3>5. Intelligent Automation</h3>
      <p>Combining RPA with AI technologies like machine learning enables automation of complex decision-making processes.</p>

      <h3>6. Workflow Rules</h3>
      <p>Modern solutions offer customizable logic that controls work progression tailored to specific business needs.</p>

      <h3>7. BPM and Compliance</h3>
      <p>Automated compliance checks help organizations meet evolving regulatory standards while reducing non-compliance risks.</p>

      <p>Embracing these innovations delivers operational efficiency gains and improved customer experiences.</p>
    `,
  },
  "key-points-about-streamlining-business-operations-for-window-contractors": {
    title: "Key Points about Streamlining Business Operations for Window Contractors",
    date: "October 10, 2022",
    category: "Operations",
    image: "/images/blog/streamlining-business-processes.jpg",
    content: `
      <p>Streamlining business operations can help window contractors improve their efficiency, reduce costs, improve the customer experience, and gain valuable business insights.</p>

      <h2>Four Key Benefits</h2>

      <h3>1. Increased Efficiency</h3>
      <p>By removing unnecessary steps, contractors complete projects faster, saving time and resources.</p>

      <h3>2. Cost Savings</h3>
      <p>Efficiency directly reduces expenses through fewer errors in ordering and labor management, eliminating redundant tasks, and better resource allocation, which ultimately improves profitability.</p>

      <h3>3. Improved Customer Experience</h3>
      <p>Faster response times and accurate information increase satisfaction. Staff access to information across departments, both in the office and in the field, is key, especially given the dynamic nature of window contracting.</p>

      <h3>4. Better Business Insights</h3>
      <p>Data collection enables tracking of key performance indicators (KPIs) to support decision-making. Contractors need systems to effectively monitor these metrics in real-time.</p>

      <h2>The Solution</h2>
      <p>bpmPro, built on Salesforce.com, enables contractors to achieve these four benefits consistently.</p>
    `,
  },
  "price-increases-in-the-window-and-door-industry-in-florida": {
    title: "Price Increases in the Window and Door Industry in Florida",
    date: "July 4, 2022",
    category: "Industry",
    image: "/images/blog/price-increases-in-window-business-florida.jpg",
    content: `
      <p>Significant price escalations have affected Florida's window and door manufacturing sector. From January 1, 2021 through May 30, 2022, manufacturers implemented four rounds of price increases, resulting in a cumulative jump of 40 to 58% total price spike.</p>

      <h2>Market Drivers</h2>
      <p>These increases are attributed to pandemic-related factors—consumer spending shifted toward home improvement during lockdowns, while global supply chain disruptions reduced material availability.</p>

      <h2>Florida-Specific Context</h2>
      <p>Hurricane protection requirements make impact-resistant windows and doors essential in Florida. These specialty products typically cost double traditional alternatives, making the price surge particularly impactful for coastal residents.</p>

      <h2>Navigating the Challenge</h2>
      <p>Window and door manufacturers need tools to navigate industry challenges through process automation and improved profitability. bpmPro helps businesses adapt to these market pressures.</p>
    `,
  },
  "xtriam-has-launched-bpmpro": {
    title: "xTriam has launched bpmPro",
    date: "June 27, 2022",
    category: "News",
    image: "/images/blog/xtriam-launched-bpmPro.jpg",
    content: `
      <p>xTriam has announced the release of bpmPro, a business process management software that runs on the world-leading Salesforce Platform. The platform targets window dealers specifically.</p>

      <h2>Transforming Manual Operations</h2>
      <p>The software's core function involves transforming manual operations into automated workflows. bpmPro empowers window dealers with the functionality to deliver a successful customer journey by converting processes into a digital, streamlined user experience that can be effectively enforced and monitored.</p>

      <h2>Complete Business Lifecycle</h2>
      <p>The solution covers the complete business lifecycle, enabling dealers to manage operations spanning initial client engagement through order management, service delivery, and post-sales support.</p>

      <h2>Get Started</h2>
      <p>Contact xTriam to book a demo and learn how bpmPro can improve your business profitability.</p>
    `,
  },
  "from-quote-to-completion-how-software-is-changing-the-remodeling-business": {
    title: "From Quote to Completion: How Software is Changing the Remodeling Business",
    date: "December 2025",
    category: "Technology",
    image: "/images/blog/quote-to-completion.png",
    content: `
      <p>The remodeling and in-home services industry looks dramatically different than it did just five years ago. Homeowners expect instant quotes, real-time project updates, and seamless payment options. Contractors who deliver on these expectations are winning more jobs and building stronger reputations. Those who don't are losing business to competitors who do.</p>
      <br/>

      <p>The difference? Software that manages the entire customer journey—from the first inquiry to the final walkthrough.</p>
      <br/>

      <h2><strong>The Old Way vs. The New Way</strong></h2>

      <p>Traditional contractors juggle spreadsheets, paper contracts, sticky notes, and a dozen different apps that don't talk to each other. A lead comes in by phone, gets written on a notepad, maybe makes it into a spreadsheet, and then sits there until someone remembers to follow up. Quotes are created in Word documents, emailed back and forth, and version control becomes a nightmare.</p>
      <br/>

      <p>Modern contractors use integrated systems where a lead automatically enters the pipeline, triggers a follow-up sequence, and moves through defined stages. The quote is generated from a product catalog with current pricing, sent electronically for signature, and converted into a project the moment the customer approves.</p>
      <br/>

      <h2><strong>Stage 1: Lead Capture and Follow-Up</strong></h2>

      <p>Speed matters. Studies consistently show that responding to a lead within five minutes dramatically increases conversion rates. Yet most contractors take hours or even days to respond.</p>
      <br/>

      <p>With the right software, leads from your website, phone calls, and referrals all flow into one system. Automated responses acknowledge the inquiry immediately while your sales team gets notified to make personal contact. No lead falls through the cracks because the system tracks every interaction.</p>
      <br/>

      <h2><strong>Stage 2: The In-Home Consultation</strong></h2>

      <p>When your sales rep arrives at the customer's home, they have everything they need on a tablet or phone: the customer's contact history, notes from the initial call, and a product catalog with real-time pricing. They can build a quote on the spot, show options, and capture the signature before leaving.</p>
      <br/>

      <p>This isn't just convenient—it's expected. Homeowners are accustomed to instant transactions in every other area of their lives. A contractor who says "I'll email you a quote in a few days" loses to one who closes on the spot.</p>
      <br/>

      <h2><strong>Stage 3: Order Management and Scheduling</strong></h2>

      <p>Once a deal closes, the real work begins. Materials need to be ordered, crews need to be scheduled, and the customer needs to know what's happening. Integrated software turns a signed contract into purchase orders automatically, checks inventory, and slots the job into your production calendar.</p>
      <br/>

      <p>Customers receive updates without your office staff making phone calls. They know when materials arrive, when installation is scheduled, and who will be showing up at their door.</p>
      <br/>

      <h2><strong>Stage 4: Installation and Field Communication</strong></h2>

      <p>Your installation crews need access to job details, product specifications, and customer preferences—without calling the office ten times a day. Mobile access to project information eliminates miscommunication and ensures the work matches what was sold.</p>
      <br/>

      <p>Field teams can document their work with photos, note any issues that arise, and capture customer sign-off on completion. Everything is logged in one system, creating a complete project history.</p>
      <br/>

      <h2><strong>Stage 5: Payment and Follow-Up</strong></h2>

      <p>Collecting payment shouldn't require chasing customers with invoices. Modern payment processing integrates directly with your project management system. Customers can pay deposits, progress payments, and final balances electronically. Your accounting sees the payment immediately, and the project record updates automatically.</p>
      <br/>

      <p>After the job is complete, automated follow-up requests reviews from satisfied customers and schedules future maintenance reminders. One project becomes the foundation for a long-term customer relationship.</p>
      <br/>

      <h2><strong>The Competitive Advantage</strong></h2>

      <p>Contractors who adopt integrated software aren't just more organized—they're more profitable. They close more deals because they respond faster and quote on the spot. They complete more jobs because scheduling is optimized and communication is clear. They collect payments faster because the process is frictionless.</p>
      <br/>

      <p>Most importantly, they deliver a better customer experience. In an industry where referrals drive growth, that experience translates directly into new business.</p>
      <br/>

      <h2><strong>Making the Transition</strong></h2>

      <p>The biggest obstacle isn't technology—it's change management. Contractors worry about the learning curve, the cost, and whether their team will actually use the system. The key is choosing software designed specifically for your industry, with workflows that match how you actually operate.</p>
      <br/>

      <p>Generic business software forces you to adapt your processes to the tool. Industry-specific solutions like bpmPro are built around the quote-to-completion workflow that remodeling and in-home service contractors follow every day.</p>
      <br/>

      <p>The contractors who thrive in 2026 and beyond will be those who treat software as essential infrastructure, not an optional upgrade. The transformation of in-home services is already here. The only question is whether you're leading it or catching up.</p>
    `,
  },
};

// Generate static params for known blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: `${post.title} - xTriam Blog`,
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Post Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            This blog post could not be found.
          </p>
          <Link href="/blog" className="mt-6 inline-block">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <span className="rounded-full bg-brand-blue-100 px-3 py-1 text-xs font-medium text-brand-blue-700">
              {post.category}
            </span>
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Hero Image */}
      {post.image && (
        <section className="pb-8">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <article
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-brand-blue-600 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-foreground">
            Ready to transform your business?
          </h2>
          <p className="mt-2 text-muted-foreground">
            See how <strong>bpmPro</strong> can help your window and door business grow.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/book-a-demo">
              <Button variant="accent">Book a Demo</Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline">More Articles</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
