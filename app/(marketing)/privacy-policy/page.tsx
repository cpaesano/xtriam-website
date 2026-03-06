import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "xTriam Privacy Policy - How we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: January 2026
        </p>

        <div className="mt-12 prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, request a demo, fill out a form, or contact us
            for support.
          </p>
          <p>This information may include:</p>
          <ul>
            <li>Name and contact information (email, phone, address)</li>
            <li>Company name and job title</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Communications you send to us</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Professional advisors (lawyers, accountants)</li>
            <li>Law enforcement when required by law</li>
            <li>Other parties with your consent</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information. Our platform is built on
            Salesforce, which maintains industry-leading security certifications
            including SOC 2 Type II compliance.
          </p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Request data portability</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar technologies to collect information about
            your browsing activities. You can manage cookie preferences through
            your browser settings.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these external sites.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not
            knowingly collect personal information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, please contact us:
          </p>
          <ul>
            <li>Email: sales@xtriam.com</li>
            <li>Phone: (305) 204-9694</li>
            <li>Address: 5966 S Dixie Hwy Ste 300, South Miami, FL 33143</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
