import ScrollReveal from "../components/ScrollReveal";

interface PrivacyProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function Privacy({ onNavigate }: PrivacyProps) {
  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="font-heading text-3.5xl font-bold tracking-tight text-primary mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-text-secondary">
              Last Updated: July 3, 2026
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 md:p-10 shadow-sm space-y-8 text-text-secondary text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">1. Introduction</h2>
              <p>
                Welcome to Hotogram ("we," "our," or "us"). We operate hotogram.com and the Hotogram platform (app.hotogram.com), and are committed to protecting the privacy of our merchants, guests, and website visitors. This Privacy Policy describes how we collect, use, and safeguard personal information captured through our landing pages, merchant applications, and customer contact forms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">2. Information We Collect</h2>
              <p>
                We collect information directly when you register an account, configure a restaurant outlet, or submit support inquiries:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Your Name</li>
                <li>Your Mobile Phone Number</li>
                <li>Your Restaurant / Business Name</li>
                <li>Your City / Location</li>
                <li>Your Email Address</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">3. How We Use Your Data</h2>
              <p>
                We use the captured information strictly to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Provide, operate, and maintain your restaurant's digital ordering system.</li>
                <li>Assist you with onboarding, hardware setup, and customer support.</li>
                <li>Respond directly to contact messages and support inquiries.</li>
                <li>Ensure billing, account security, and service reliability.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">4. Direct-to-Merchant Data Ownership</h2>
              <p>
                Unlike delivery aggregator apps, Hotogram is designed on merchant data independence:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>No selling:</strong> We never sell, lease, or rent merchant or customer databases to third parties.</li>
                <li><strong>Merchant data control:</strong> Diner details collected when ordering at your tables belong 100% to the merchant (the restaurant owner). Hotogram stores this secure log strictly to execute transactions and dispatches.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">5. Data Retention & Security</h2>
              <p>
                We employ industry-standard administrative and electronic security measures to safeguard your personal details and business records against unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">6. Your Rights</h2>
              <p>
                You have the right to request deletion of your account record or contact details from our registers at any time. Simply send an email to <a href="mailto:hello@hotogram.com" className="text-primary-mid hover:underline font-medium">hello@hotogram.com</a> with the subject "Data Removal Request," and we will execute the deletion promptly.
              </p>
            </section>
          </div>
        </ScrollReveal>

        {/* Back Link */}
        <div className="text-center pt-8">
          <button 
            onClick={() => onNavigate("home")}
            className="rounded-xl border border-primary/20 bg-transparent px-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
