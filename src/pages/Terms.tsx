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
                By accessing hotogram.com and registering for our waitlist or early bird programs, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not submit registration details.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">2. Pre-Launch Disclosures & Booking</h2>
              <p>
                Hotogram is currently in a pre-launch phase. By signing up to the waitlist or reservation grid:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>You acknowledge that this does not constitute a binding legal contract for services.</li>
                <li>Waitlist reservations are complimentary and establish priority positioning for launch remote configurations.</li>
                <li>Early-bird pricing promotions (such as ₹699/month flat pro subscription lock-ins) will be honored for registered waitlist accounts upon product launch, subject to subscription activation.</li>
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
                We provide the website and pre-launch information on an "as-is" basis. We make no representations or warranties regarding website uptime, launch delivery timelines, or exact hardware POS integrations. To the maximum extent permitted by law, Hotogram shall not be liable for any direct or indirect business disruptions arising from waitlist signups or scheduling.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-primary mb-3">5. Modification of Service</h2>
              <p>
                We reserve the right to modify launch estimates, promotional pricing values, and website contents at any time without prior notifications.
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
