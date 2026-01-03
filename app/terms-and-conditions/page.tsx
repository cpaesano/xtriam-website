import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "xTriam Terms and Conditions - Terms of service for using our products and services.",
};

export default function TermsPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-muted-foreground">
          Last updated: January 2025
        </p>

        <div className="mt-12 prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using xTriam's services, including bpmPro, you agree
            to be bound by these Terms and Conditions. If you do not agree to
            these terms, please do not use our services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            xTriam provides bpmPro, a Salesforce-native business process
            management software designed for window and door contractors. Our
            services include software access, implementation support, training,
            and ongoing customer support.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To use our services, you must create an account and provide accurate
            information. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us of any unauthorized use</li>
          </ul>

          <h2>4. Subscription and Payment</h2>
          <p>
            bpmPro is offered on a subscription basis. Payment terms are
            established in your service agreement. Subscriptions automatically
            renew unless cancelled according to the terms of your agreement.
          </p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our services for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt our services</li>
            <li>Transmit viruses or malicious code</li>
            <li>Resell or redistribute our services without authorization</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            bpmPro and all related content, features, and functionality are
            owned by xTriam and are protected by copyright, trademark, and other
            intellectual property laws. You are granted a limited license to use
            our services for your business purposes only.
          </p>

          <h2>7. Data Ownership</h2>
          <p>
            You retain ownership of all data you input into bpmPro. We do not
            claim ownership of your business data. You grant us permission to
            use your data solely to provide and improve our services.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, xTriam shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages resulting from your use of our services.
          </p>

          <h2>9. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" without warranties of any kind,
            either express or implied. We do not guarantee that our services
            will be uninterrupted or error-free.
          </p>

          <h2>10. Termination</h2>
          <p>
            Either party may terminate the service agreement according to the
            terms specified in your subscription agreement. Upon termination,
            your access to bpmPro will be discontinued.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will
            notify users of significant changes via email or through our
            services. Continued use after changes constitutes acceptance.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Florida,
            without regard to conflict of law principles.
          </p>

          <h2>13. Contact Information</h2>
          <p>For questions about these terms, please contact us:</p>
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
