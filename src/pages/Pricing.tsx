import React, { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { CONFIG } from "../config";
import { submitToGoogleSheets } from "../utils/forms";

interface PricingProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    restaurant: "",
    phone: "",
    city: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const openModal = (planName: string) => {
    setSelectedPlan(planName);
    setSubmitSuccess(false);
    setFormData({
      name: "",
      restaurant: "",
      phone: "",
      city: "",
      message: ""
    });
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setSubmitSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.restaurant) return;

    setIsSubmitting(true);

    try {
      await submitToGoogleSheets({
        formType: `Pricing Inquiry - ${selectedPlan || "General"}`,
        name: formData.name,
        restaurant: formData.restaurant,
        phone: formData.phone,
        city: formData.city,
        message: formData.message || `Interested in the ${selectedPlan} tier`
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Pricing inquiry error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <span className="font-heading text-3xl font-bold text-primary">Free</span>
                  <span className="text-sm text-text-secondary">/ forever</span>
                </div>
                <div className="text-xs text-text-secondary font-medium mb-6">No credit card required</div>
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
              <a href={CONFIG.appUrl} className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer block">
                Start Free
              </a>
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
              <button 
                onClick={() => openModal("Growth")} 
                className="w-full rounded-xl bg-accent py-3 text-center text-sm font-bold text-white shadow-md hover:bg-accent/90 transition-all cursor-pointer block"
              >
                Get Growth
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
              <button 
                onClick={() => openModal("Pro")} 
                className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer block"
              >
                Get Pro
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
              <button 
                onClick={() => openModal("Enterprise")} 
                className="w-full rounded-xl border border-primary/20 bg-transparent py-3 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer block"
              >
                Get Enterprise
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

      {/* Plan Inquiry Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={closeModal} aria-hidden="true" />

          {/* Modal Card */}
          <div className="relative w-full max-w-lg bg-bg border border-primary/15 rounded-[2rem] p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitSuccess ? (
              <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-4">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">Request Received!</h3>
                <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed mb-6">
                  Thank you for your interest in the <strong className="text-primary">{selectedPlan} Plan</strong>. Our team will contact you on your mobile number shortly to assist with activation.
                </p>
                <button
                  onClick={closeModal}
                  className="rounded-xl bg-accent px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-accent/90 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent mb-2">
                    {selectedPlan} Plan Inquiry
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    Get started with {selectedPlan}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Fill in your details below and our team will get back to you immediately to set up your restaurant.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label htmlFor="name" className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Shariq"
                      className="w-full rounded-xl border border-primary/15 bg-surface/50 px-4 py-2.5 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="restaurant" className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1">
                      Restaurant Name *
                    </label>
                    <input
                      type="text"
                      id="restaurant"
                      name="restaurant"
                      required
                      value={formData.restaurant}
                      onChange={handleChange}
                      placeholder="e.g. Mughal Darbar"
                      className="w-full rounded-xl border border-primary/15 bg-surface/50 px-4 py-2.5 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 7006442889"
                        className="w-full rounded-xl border border-primary/15 bg-surface/50 px-4 py-2.5 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Srinagar"
                        className="w-full rounded-xl border border-primary/15 bg-surface/50 px-4 py-2.5 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-1">
                      Notes / Questions (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Number of tables, outlets, or custom needs..."
                      className="w-full rounded-xl border border-primary/15 bg-surface/50 px-4 py-2.5 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.restaurant}
                    className="w-full rounded-xl bg-accent py-3 text-center text-sm font-bold text-white shadow-md hover:bg-accent/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      `Submit ${selectedPlan} Inquiry`
                    )}
                  </button>

                  <a
                    href={`${CONFIG.whatsappUrl}?text=${encodeURIComponent(`Hi, I'm interested in the ${selectedPlan} plan for my restaurant.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-xl border border-emerald-600/30 bg-emerald-600/10 py-2.5 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.53 1.975 14.063.953 11.453.953c-5.447 0-9.875 4.369-9.879 9.8-.002 2.018.528 3.99 1.533 5.729L2.122 21.9l5.6-1.454zM18.15 14.8c-.33-.164-1.953-.964-2.253-1.074-.3-.109-.519-.164-.738.164-.219.329-.85 1.074-1.041 1.293-.192.219-.384.246-.715.082-1.193-.596-1.956-.984-2.738-1.66-.607-.525-1.015-1.173-1.133-1.373-.119-.2-.013-.308.086-.407.089-.089.195-.228.293-.342.097-.114.129-.192.195-.32.066-.129.033-.242-.017-.342-.05-.099-.441-1.066-.605-1.46-.16-.388-.321-.335-.441-.341-.113-.005-.244-.006-.375-.006-.13 0-.342.049-.52.247-.179.197-.682.666-.682 1.623 0 .957.697 1.882.795 2.013.097.13 1.373 2.1 3.328 2.946.465.2.827.321 1.11.412.469.149.896.128 1.233.078.376-.056 1.953-.798 2.228-1.57.275-.771.275-1.431.193-1.57-.083-.14-.303-.223-.633-.387z"/>
                    </svg>
                    Or Chat Directly on WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

