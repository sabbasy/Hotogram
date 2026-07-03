import ScrollReveal from "../components/ScrollReveal";

interface PricingProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
              Flat Subscription Pricing
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              No commission percentages, no setup tricks. Pay a predictable flat rate and keep 100% of your dine-in revenue.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
            {/* Early Bird Plan */}
            <div className="relative rounded-3xl border-2 border-accent bg-surface/80 p-6 md:p-8 flex flex-col justify-between shadow-neon">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                Pre-Launch Deal
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">Early Bird Pro</h3>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                  For pioneering restaurants who lock in lowest flat rate before launch.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-4xl font-bold text-primary">₹699</span>
                  <span className="text-sm text-text-secondary">/month</span>
                </div>
                <div className="text-xs text-accent font-semibold mb-6">Billed annually (Save 40% forever)</div>
                
                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    0% Commission on all orders
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Unlimited Dine-in tables
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Digital Menu & QR Stand PDF Builder
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Instant KDS and routing support
                  </li>
                  <li className="flex items-center gap-3 text-xs text-accent font-semibold">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Free remote configuration setup
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate("home", "#waitlist")}
                className="w-full rounded-xl bg-accent py-3 text-center text-sm font-bold text-white shadow-md hover:bg-accent/90 transition-all cursor-pointer"
              >
                Claim Early Bird Deal
              </button>
            </div>

            {/* Standard Plan */}
            <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">Standard Pro</h3>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                  Predictable flat rate subscription for single-location restaurants.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-4xl font-bold text-primary">₹999</span>
                  <span className="text-sm text-text-secondary">/month</span>
                </div>
                <div className="text-xs text-text-secondary font-medium mb-6">Billed annually (or ₹1,299/mo monthly)</div>

                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    0% Commission on all orders
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Unlimited Dine-in tables
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Digital Menu & QR Stand PDF Builder
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Instant KDS and routing support
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Customer analytics logs (CSV export)
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate("home", "#waitlist")}
                className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                Join the waitlist
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">Enterprise</h3>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                  Custom integrations for hotel chains, salons, and multi-outlet groups.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-3xl font-bold text-primary">Custom</span>
                </div>
                <div className="text-xs text-text-secondary font-medium mb-6">Volume scaling rates</div>

                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Multi-location master dashboard
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Dedicated room/station numbers tracking
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Custom domain branding (menu.yourhotel.com)
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    API access to legacy POS integrations
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Dedicated key account manager support
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigate("contact")}
                className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                Inquire Enterprise
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Comparison Table */}
        <ScrollReveal delay={200}>
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-primary mb-2">Compare the Math</h2>
            <p className="text-text-secondary text-sm">See how much you save on dine-in sales compared to aggregator networks.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-primary/10 bg-surface/50 mb-16 shadow-sm">
            <table className="min-w-full divide-y divide-primary/10">
              <thead className="bg-primary/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">Monthly Dine-in Sales</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">Aggregator App (18%-22% Cut)</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">Hotogram Standard</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-emerald-600">Your Monthly Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10 bg-surface/30">
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">₹2,00,000</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">₹36,000 – ₹44,000</td>
                  <td className="px-6 py-4 text-sm text-primary font-medium">₹999/mo flat</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-bold bg-emerald-500/5">~ ₹35,000 – ₹43,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">₹5,00,000</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">₹90,000 – ₹1,10,000</td>
                  <td className="px-6 py-4 text-sm text-primary font-medium">₹999/mo flat</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-bold bg-emerald-500/5">~ ₹89,000 – ₹1,09,000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">₹10,00,000</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-medium">₹1,80,000 – ₹2,20,000</td>
                  <td className="px-6 py-4 text-sm text-primary font-medium">₹999/mo flat</td>
                  <td className="px-6 py-4 text-sm text-emerald-700 font-bold bg-emerald-500/5">~ ₹1,79,000 – ₹2,19,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Back Link */}
        <div className="text-center pt-4">
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
