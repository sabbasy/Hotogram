import React, { useState } from "react";
import { CONFIG } from "../config";
import ScrollReveal from "../components/ScrollReveal";
import { submitToGoogleSheets } from "../utils/forms";

interface ContactProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    restaurant: "",
    phone: "",
    city: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
        formType: "Contact Inquiry",
        name: formData.name,
        restaurant: formData.restaurant,
        phone: formData.phone,
        city: formData.city,
        message: formData.message
      });
      
      setSubmitSuccess(true);
      setFormData({
        name: "",
        restaurant: "",
        phone: "",
        city: "",
        message: ""
      });
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
              Get in Touch
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Have questions about QR compatibility, printer routing, or setup schedules? Ask us anything.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {/* Contact Details Column */}
          <div className="md:col-span-1 space-y-6 flex flex-col justify-between">
            <ScrollReveal delay={100}>
              <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary mb-4">Direct Channels</h3>
                  <div className="space-y-5">
                    {/* WhatsApp */}
                    <a 
                      href={CONFIG.whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-start gap-4 group cursor-pointer"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                        <svg className="h-5.5 w-5.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.53 1.975 14.063.953 11.453.953c-5.447 0-9.875 4.369-9.879 9.8-.002 2.018.528 3.99 1.533 5.729L2.122 21.9l5.6-1.454zM18.15 14.8c-.33-.164-1.953-.964-2.253-1.074-.3-.109-.519-.164-.738.164-.219.329-.85 1.074-1.041 1.293-.192.219-.384.246-.715.082-1.193-.596-1.956-.984-2.738-1.66-.607-.525-1.015-1.173-1.133-1.373-.119-.2-.013-.308.086-.407.089-.089.195-.228.293-.342.097-.114.129-.192.195-.32.066-.129.033-.242-.017-.342-.05-.099-.441-1.066-.605-1.46-.16-.388-.321-.335-.441-.341-.113-.005-.244-.006-.375-.006-.13 0-.342.049-.52.247-.179.197-.682.666-.682 1.623 0 .957.697 1.882.795 2.013.097.13 1.373 2.1 3.328 2.946.465.2.827.321 1.11.412.469.149.896.128 1.233.078.376-.056 1.953-.798 2.228-1.57.275-.771.275-1.431.193-1.57-.083-.14-.303-.223-.633-.387z"/></svg>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-primary">WhatsApp Support</div>
                        <div className="text-xs text-text-secondary mt-0.5">{CONFIG.whatsappNumber}</div>
                      </div>
                    </a>
                    
                    {/* Email */}
                    <a 
                      href={`mailto:${CONFIG.contactEmail}`} 
                      className="flex items-start gap-4 group cursor-pointer"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                        <svg className="h-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-primary">Inquiries & Support</div>
                        <div className="text-xs text-text-secondary mt-0.5">{CONFIG.contactEmail}</div>
                      </div>
                    </a>
                  </div>
                </div>
                
                <div className="text-xs text-text-secondary/70 border-t border-primary/5 pt-4">
                  Response latency: &lt; 2 hours during restaurant service hours (9 AM - 11 PM IST).
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Column */}
          <div className="md:col-span-2">
            <ScrollReveal delay={200}>
              <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 md:p-8 shadow-sm">
                {submitSuccess ? (
                  <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-300">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-6">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-primary mb-3">Message Sent!</h3>
                    <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed mb-6">
                      Thank you for reaching out. A Hotogram setup expert will contact you on your mobile number shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="rounded-xl border border-primary/20 bg-transparent px-6 py-2.5 text-xs font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-heading text-xl font-bold text-primary mb-2">Send a Message</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Your Name *</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Shariq"
                          className="w-full rounded-xl border border-primary/15 bg-bg/50 px-4 py-3 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="restaurant" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Restaurant Name *</label>
                        <input 
                          type="text" 
                          id="restaurant" 
                          name="restaurant" 
                          required
                          value={formData.restaurant}
                          onChange={handleChange}
                          placeholder="e.g. Mughal Darbar"
                          className="w-full rounded-xl border border-primary/15 bg-bg/50 px-4 py-3 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Mobile Phone *</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 7006442889"
                          className="w-full rounded-xl border border-primary/15 bg-bg/50 px-4 py-3 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">City / Location</label>
                        <input 
                          type="text" 
                          id="city" 
                          name="city" 
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Srinagar"
                          className="w-full rounded-xl border border-primary/15 bg-bg/50 px-4 py-3 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Your Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your tables setup, POS system, or any specific questions..."
                        className="w-full rounded-xl border border-primary/15 bg-bg/50 px-4 py-3 text-sm text-primary placeholder-text-secondary/50 focus:border-primary-mid focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting || !formData.name || !formData.phone || !formData.restaurant}
                      className="w-full rounded-xl bg-accent py-3 text-center text-sm font-bold text-white shadow-md hover:bg-accent/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Setup Request"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
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
