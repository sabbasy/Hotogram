import ScrollReveal from "../components/ScrollReveal";

interface TermsProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function Terms({ onNavigate }: TermsProps) {
  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="font-heading text-3.5xl font-bold tracking-tight text-primary mb-4">
              Terms of Service
            </h1>
            <p className="text-xs text-text-secondary">
              Last Updated: July 3, 2026
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 md:p-10 shadow-sm space-y-8 text-text-secondary text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">1. Agreement to Terms</h2>
              <p>
                By accessing hotogram.com and the Hotogram software platform (app.hotogram.com), you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">2. Service Description & Subscriptions</h2>
              <p>
                Hotogram is a SaaS Restaurant Operating System providing digital QR menu ordering, kitchen display systems, customer CRM, and related software tools.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Subscription tiers are billed on a recurring monthly or annual basis as specified in your selected plan.</li>
                <li>Hotogram charges 0% commission on table orders processed through the platform. Payment processing or gateway fees (if applicable) are governed by the merchant's respective gateway provider.</li>
                <li>You are responsible for maintaining the confidentiality of your merchant login credentials.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">3. Use of Content & Trademarks</h2>
              <p>
                All elements, layouts, interactive simulation widgets, WebGL background scripts, and texts displayed on hotogram.com are the copyright property of Hotogram. You may not duplicate, copy, or scrape the assets or frontend code without express written consent from the founder, S Abbasy.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">4. Limitation of Liability</h2>
              <p>
                We provide the website and software services on an "as-is" and "as-available" basis. To the maximum extent permitted by law, Hotogram shall not be liable for any indirect or consequential business disruptions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">5. Modification of Service</h2>
              <p>
                We reserve the right to modify features, pricing tiers, and website contents with reasonable advance notice where required.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">6. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and interpreted in accordance with the laws of India. Any disputes arising out of the website use shall be subject to the exclusive jurisdiction of the courts in Srinagar, Jammu & Kashmir, India.
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
