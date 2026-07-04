import ScrollReveal from "../components/ScrollReveal";

interface PricingProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
              Transparent, Scalable Pricing
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              No hidden fees, no commission percentages. Choose the Restaurant OS tier that fits your growth stage.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards Grid */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-20">
            
            {/* Starter Plan */}
            <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">Starter</h3>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed h-10">
                  Perfect for small cafes starting their digital journey.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-3xl font-bold text-primary">₹499</span>
                  <span className="text-sm text-text-secondary">/mo</span>
                </div>
                <div className="text-xs text-text-secondary font-medium mb-6">Billed annually</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Digital QR Menu
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Basic QR Ordering
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    1 Outlet
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Basic Analytics
                  </li>
                </ul>
              </div>
              <button onClick={() => onNavigate("home", "#waitlist")} className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer">
                Join Waitlist
              </button>
            </div>

            {/* Growth Plan */}
            <div className="relative rounded-3xl border-2 border-accent bg-surface/80 p-6 flex flex-col justify-between shadow-neon">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">
                Most Popular
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">Growth</h3>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed h-10">
                  Everything you need to own your digital presence.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-3xl font-bold text-primary">₹1,499</span>
                  <span className="text-sm text-text-secondary">/mo</span>
                </div>
                <div className="text-xs text-text-secondary font-medium mb-6">Billed annually</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Everything in Starter
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Direct Online Ordering
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Restaurant Website Builder
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Customer CRM & Loyalty
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Advanced Analytics
                  </li>
                </ul>
              </div>
              <button onClick={() => onNavigate("home", "#waitlist")} className="w-full rounded-xl bg-accent py-3 text-center text-sm font-bold text-white shadow-md hover:bg-accent/90 transition-all cursor-pointer">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">Pro</h3>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed h-10">
                  Advanced operations for scaling multi-outlet restaurants.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-3xl font-bold text-primary">₹3,999</span>
                  <span className="text-sm text-text-secondary">/mo</span>
                </div>
                <div className="text-xs text-text-secondary font-medium mb-6">Billed annually</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Everything in Growth
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Multi-outlet Support
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Kitchen Management (KDS)
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Staff Management
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    API Access
                  </li>
                </ul>
              </div>
              <button onClick={() => onNavigate("home", "#waitlist")} className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer">
                Join Waitlist
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary mb-2">Enterprise</h3>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed h-10">
                  Custom integrations for multi-location hospitality brands.
                </p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-3xl font-bold text-primary">Custom</span>
                </div>
                <div className="text-xs text-text-secondary font-medium mb-6">Volume scaling rates</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Unlimited Outlets
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    White-label App
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Custom POS Integrations
                  </li>
                  <li className="flex items-center gap-3 text-xs text-text-secondary">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    SLA & Premium Support
                  </li>
                </ul>
              </div>
              <button onClick={() => onNavigate("contact")} className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer">
                Contact Sales
              </button>
            </div>
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
