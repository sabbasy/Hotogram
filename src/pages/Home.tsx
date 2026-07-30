import { useState, useEffect, useRef } from "react";
import { CONFIG } from "../config";
import SEO from "../components/SEO";
import FAQAccordion from "../components/FAQAccordion";
import type { FAQItem } from "../components/FAQAccordion";
import InteractiveSimulator from "../components/InteractiveSimulator";
import ScrollReveal from "../components/ScrollReveal";
import { submitToGoogleSheets } from "../utils/forms";

export default function Home({ onNavigate }: { onNavigate: (page: string, hash?: string) => void }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(CONFIG.initialWaitlistCount);
  const [activeTab, setActiveTab] = useState<"restaurants" | "cafes" | "retail">("restaurants");
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  
  const calendlyRef = useRef<HTMLDivElement>(null);

  // Removed unused scroll logic for old How It works section

  // Initialize waitlist counter from localStorage if available
  useEffect(() => {
    const savedCount = localStorage.getItem("hotogram_waitlist_count");
    const hasJoined = localStorage.getItem("hotogram_joined_waitlist");
    
    if (savedCount) {
      setWaitlistCount(parseInt(savedCount, 10));
    } else {
      localStorage.setItem("hotogram_waitlist_count", CONFIG.initialWaitlistCount.toString());
    }

    if (hasJoined === "true") {
      setSubmitSuccess(true);
    }
  }, []);

  // Dynamically load Calendly script when Calendly section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !calendlyLoaded) {
          const script = document.createElement("script");
          script.src = "https://assets.calendly.com/assets/external/widget.js";
          script.async = true;
          document.body.appendChild(script);
          setCalendlyLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (calendlyRef.current) {
      observer.observe(calendlyRef.current);
    }

    return () => {
      if (calendlyRef.current) {
        observer.unobserve(calendlyRef.current);
      }
    };
  }, [calendlyLoaded]);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsSubmitting(true);
    
    try {
      // Post details to Google Sheets
      await submitToGoogleSheets({
        formType: "General Waitlist",
        phone: phone,
        email: email || undefined
      });
      
      // Update states
      const newCount = waitlistCount + 1;
      setWaitlistCount(newCount);
      localStorage.setItem("hotogram_waitlist_count", newCount.toString());
      localStorage.setItem("hotogram_joined_waitlist", "true");
      setSubmitSuccess(true);
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("Waitlist error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is there really no commission?",
      answer: "Yes. Hotogram is a SaaS platform. You pay a flat monthly subscription. Zero commission on orders, zero middleman cuts. Every rupee your customers pay goes directly to your own bank account."
    },
    {
      question: "Do customers need to download an app?",
      answer: "No app download is required. Customers scan the QR code placed on their table using their phone's camera. The menu opens instantly in their browser as a fast, responsive web app where they can order and pay."
    },
    {
      question: "What hardware/setup do I need?",
      answer: "You do not need any special hardware or proprietary terminals. Hotogram works on any smartphone, tablet, or laptop you already own. We generate high-quality QR codes for your tables, which you print and stick. Setup takes less than 10 minutes."
    },
    {
      question: "When is it launching?",
      answer: `We are currently in a private beta testing phase with select partners. We are launching public access in ${CONFIG.expectedLaunch}. Joining the early access list locks in early-bird subscription rates.`
    },
    {
      question: "Is my customer data secure?",
      answer: "Absolutely. Unlike aggregator platforms, we do not lock or sell your customer data. You own 100% of your transaction history, customer emails, and phone numbers, allowing you to run direct loyalty campaigns."
    }
  ];

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Hotogram — Zero-Commission QR Code Ordering for Indian Restaurants"
        description="Eliminate Zomato & Swiggy commission fees. Customers scan a QR code at their table, browse your menu, place orders to your kitchen, and pay directly on their phone."
        schema={faqSchema}
      />

      {/* Premium Product-First Hero Section */}
      <section className="relative px-6 pt-16 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-bg">
        {/* Premium Tech Grid Background (from Brand Guidelines) */}
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing Neon Shadow (from Brand Guidelines) */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 dark:bg-primary-mid/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none z-0 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px] translate-y-1/4 translate-x-1/4 pointer-events-none z-0"></div>

        <div className="mx-auto max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col items-start text-left animate-fade-in-up">
            <div
              
              
              
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-surface/50 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-text-secondary mb-8 shadow-sm dark:border-primary/20">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Launching {CONFIG.expectedLaunch} — Private Beta Active
              </div>
            </div>
            
            <h1 
              
              
              
              className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.05] max-w-2xl"
            >
              Own Your Restaurant.<br />
              <span className="text-primary-mid">The AI-Ready OS.</span>
            </h1>
            
            <p 
              
              
              
              className="mt-6 text-xl text-text-secondary max-w-xl font-medium leading-relaxed"
            >
              Start with seamless QR code table ordering, and expand to direct online orders, customer CRM, and kitchen analytics. All from one unified platform. <strong className="text-primary">Zero commissions.</strong>
            </p>

            <div 
              
              
              
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => onNavigate("home", "#waitlist")}
                className="w-full sm:w-auto rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_4px_20px_rgba(216,90,48,0.2)] hover:shadow-[0_8px_30px_rgba(216,90,48,0.3)] dark:shadow-[0_4px_20px_rgba(226,106,64,0.3)] dark:hover:shadow-[0_8px_30px_rgba(226,106,64,0.4)] transition-all hover:-translate-y-0.5 text-center cursor-pointer"
              >
                Join early access
              </button>
              <button 
                onClick={() => onNavigate("home", "#how-it-works")}
                className="w-full sm:w-auto rounded-full border border-primary/10 bg-surface/50 backdrop-blur-sm px-8 py-4 text-base font-semibold text-primary hover:bg-primary/5 transition-all text-center cursor-pointer dark:border-primary/20"
              >
                Learn how it works
              </button>
            </div>
          </div>

          {/* Right Column: Live Tech Simulator widget */}
          <div 
            
            
            
            className="w-full relative z-10 lg:pl-8 mt-16 lg:mt-0"
          >
            <InteractiveSimulator />
          </div>
          
        </div>
      </section>

      {/* Problem Section (Editorial Typography Layout) */}
      <section className="bg-bg py-16 md:py-24 px-6 relative overflow-hidden">
        {/* Subtle center glow */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary-mid/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
        <ScrollReveal duration={1000} yOffset={40} className="relative z-10">
          <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
            <svg className="w-8 h-8 text-accent mb-8 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
              Hotogram is not a food delivery marketplace.
            </h2>
            <p className="mt-8 text-xl md:text-2xl text-text-secondary leading-relaxed font-medium">
              We provide the software infrastructure that enables independent restaurants and cafés to digitize operations. Take complete control over your customer data, your brand, and your revenue.
            </p>
            <div className="mt-10 px-6 py-2 rounded-full border border-primary/10 bg-primary/5 text-primary-mid font-semibold text-sm inline-block">
              The digital operating system built for modern hospitality.
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* How It Works Section (Premium Storytelling Layout) */}
      <section id="how-it-works" className="py-16 md:py-24 bg-surface relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary-mid/10 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none z-0"></div>
        
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">Process Flow</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary">
              The 4-Step Table Ordering Journey
            </h2>
            <p className="mt-4 text-text-secondary text-lg">
              How Hotogram connects your guest tables directly to your kitchen.
            </p>
          </div>

          <div className="space-y-20 md:space-y-24">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <ScrollReveal duration={1000} className="order-2 md:order-1">
                <div className="bg-primary/5 rounded-3xl p-8 aspect-square flex items-center justify-center border border-primary/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary-mid/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img src="/images/scan_qr_mockup.png" alt="Scan QR Mockup" className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
              </ScrollReveal>
              <ScrollReveal duration={1000} delay={200} className="order-1 md:order-2">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary-mid font-bold text-xl border border-primary/10">1</span>
                    <span className="text-sm font-bold text-accent uppercase tracking-widest">Step One</span>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-primary mb-4">Scan QR Code</h3>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    Diners sit at their table and scan a high-quality QR stand using their default camera app. No downloads, sign-ups, or app store friction.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-primary/10 shadow-sm text-xs font-mono text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-mid"></span>
                    STATUS: WAITING TO SCAN • TABLE_04
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <ScrollReveal duration={1000} delay={200} className="order-1 md:order-1">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary-mid font-bold text-xl border border-primary/10">2</span>
                    <span className="text-sm font-bold text-accent uppercase tracking-widest">Step Two</span>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-primary mb-4">Browse & Add to Cart</h3>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    A fast digital menu loads immediately. Guests browse categories, customize toppings, select quantity counts, and add items to their checkout cart.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-primary/10 shadow-sm text-xs font-mono text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-mid"></span>
                    MENU: SYNCED LIVE • DINE-IN CARTS
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal duration={1000} className="order-2 md:order-2">
                <div className="bg-primary/5 rounded-3xl p-8 aspect-square flex items-center justify-center border border-primary/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary-mid/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img src="/images/digital_menu_mockup.png" alt="Digital Menu Mockup" className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
              </ScrollReveal>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <ScrollReveal duration={1000} className="order-2 md:order-1">
                <div className="bg-primary/5 rounded-3xl p-8 aspect-square flex items-center justify-center border border-primary/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary-mid/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img src="/images/kitchen_kds_mockup.png" alt="Kitchen KDS Mockup" className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
              </ScrollReveal>
              <ScrollReveal duration={1000} delay={200} className="order-1 md:order-2">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary-mid font-bold text-xl border border-primary/10">3</span>
                    <span className="text-sm font-bold text-accent uppercase tracking-widest">Step Three</span>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-primary mb-4">Order directly to Kitchen</h3>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    Placing order triggers an instant Kitchen Ticket (KOT). It routes to the chef's KDS tablet screen or prints directly on POS ticket registers.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-primary/10 shadow-sm text-xs font-mono text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-mid"></span>
                    ROUTING: LOCAL NETWORK • KOT_PRINTER_01
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Step 4 */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <ScrollReveal duration={1000} delay={200} className="order-1 md:order-1">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary-mid font-bold text-xl border border-primary/10">4</span>
                    <span className="text-sm font-bold text-accent uppercase tracking-widest">Step Four</span>
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-primary mb-4">Pay & Get Served</h3>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    When food is prepared, KDS alerts staff. Diners receive status notifications on their phone, complete UPI payments, and get digital receipts.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-primary/10 shadow-sm text-xs font-mono text-text-secondary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-mid"></span>
                    CHECKOUT: SECURE GATEWAY • SETTLED_DIRECT
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal duration={1000} className="order-2 md:order-2">
                <div className="bg-primary/5 rounded-3xl p-8 aspect-square flex items-center justify-center border border-primary/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary-mid/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img src="/images/payment_receipt_mockup.png" alt="Payment Mockup" className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 md:py-28 bg-bg border-t border-primary/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center mb-20">
            <ScrollReveal>
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary">
                Built for your workflow
              </h2>
              <p className="mt-6 text-xl text-text-secondary max-w-2xl mx-auto font-medium">
                Hotogram adapts to your business model to drive ordering speed and lower staff burden.
              </p>
            </ScrollReveal>
          </div>

          {/* Premium Interactive Tabs (Linear Style) */}
          <div className="flex justify-center mb-16">
            <ScrollReveal delay={100}>
              <div className="inline-flex relative rounded-full bg-surface/50 border border-primary/10 p-1.5 backdrop-blur-md shadow-sm">
                <button
                  onClick={() => setActiveTab("restaurants")}
                  className={`relative z-10 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === "restaurants" ? "text-white" : "text-text-secondary hover:text-primary"
                  }`}
                >
                  Restaurants
                  {activeTab === "restaurants" && (
                    <div  className="absolute inset-0 bg-primary-mid rounded-full -z-10 shadow-md shadow-primary-mid/20"  />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("cafes")}
                  className={`relative z-10 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === "cafes" ? "text-white" : "text-text-secondary hover:text-primary"
                  }`}
                >
                  Cafes
                  {activeTab === "cafes" && (
                    <div  className="absolute inset-0 bg-primary-mid rounded-full -z-10 shadow-md shadow-primary-mid/20"  />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("retail")}
                  className={`relative z-10 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeTab === "retail" ? "text-white" : "text-text-secondary hover:text-primary"
                  }`}
                >
                  Hotels & Salons
                  {activeTab === "retail" && (
                    <div  className="absolute inset-0 bg-primary-mid rounded-full -z-10 shadow-md shadow-primary-mid/20"  />
                  )}
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Tab Content */}
          <div className="mx-auto max-w-5xl relative min-h-[400px]">
            {activeTab === "restaurants" && (
              <div 
                
                
                
                
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Dine-in Excellence</div>
                  <h3 className="font-heading text-4xl font-bold text-primary mb-6">Restaurants</h3>
                  <p className="text-text-secondary text-lg leading-relaxed mb-8">
                    Streamline your table ordering operations. Diners scan and place custom orders directly to the kitchen display. Staff focus on serving food hot instead of taking down pencil tickets.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-base text-primary font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary-mid">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      Instant kitchen ticket generation
                    </li>
                    <li className="flex items-center gap-4 text-base text-primary font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary-mid">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      Direct-to-table delivery tracking
                    </li>
                  </ul>
                </div>
                <div className="w-full flex justify-end">
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-[2rem] border border-primary/10 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-primary-mid/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    <img src="/images/usecase_restaurants.png" alt="Digital menu preview mockup for restaurants" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cafes" && (
              <div 
                
                
                
                
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4">High Turnover Speed</div>
                  <h3 className="font-heading text-4xl font-bold text-primary mb-6">Cafes & Bakeries</h3>
                  <p className="text-text-secondary text-lg leading-relaxed mb-8">
                    Eliminate long morning counter queues. Customers order their custom flat whites and croissants directly from their cozy corner tables and track preparation status live.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-base text-primary font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary-mid">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      Split-second UPI checkouts
                    </li>
                    <li className="flex items-center gap-4 text-base text-primary font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary-mid">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      Built-in digital stamp card loyalty hooks
                    </li>
                  </ul>
                </div>
                <div className="w-full flex justify-end">
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-[2rem] border border-primary/10 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-primary-mid/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    <img src="/images/usecase_cafes.png" alt="Express coffee ordering cart mockup for cafes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "retail" && (
              <div 
                
                
                
                
                className="grid md:grid-cols-2 gap-16 items-center"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-accent mb-4">Catalog & Services</div>
                  <h3 className="font-heading text-4xl font-bold text-primary mb-6">Hotels & Salons</h3>
                  <p className="text-text-secondary text-lg leading-relaxed mb-8">
                    Deliver orders directly to hotel rooms or salon chairs. Let guests browse room service catalogs or select premium salon treatments by scanning a localized QR code.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-base text-primary font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary-mid">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      Location-tied ordering (room numbers/stations)
                    </li>
                    <li className="flex items-center gap-4 text-base text-primary font-medium">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary-mid">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      Digital services catalog browsing
                    </li>
                  </ul>
                </div>
                <div className="w-full flex justify-end">
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-[2rem] border border-primary/10 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-primary-mid/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                    <img src="/images/usecase_hotels.png" alt="Room service digital catalog mockup for hotels and salon treatments" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Hotogram Section (Asymmetric Bento Box Layout) */}
      <section id="why-hotogram" className="py-32 px-6 bg-surface">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary">
                Why restaurants are ditching traditional aggregator networks
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
            {/* Value 1 (Large - spans 2 cols) */}
            <ScrollReveal duration={800} className="md:col-span-2">
              <div className="relative overflow-hidden rounded-[2rem] bg-bg border border-primary/5 h-full group p-10 flex flex-col justify-end">
                <div className="relative z-10 max-w-md">
                  <h3 className="font-heading text-3xl font-bold text-primary mb-4">Zero Commission</h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    Save lakhs in aggregator cuts. You only pay a predictable flat subscription. Every single transaction rupee goes straight into your bank.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Value 2 (Small - spans 1 col) */}
            <ScrollReveal duration={800} delay={150}>
              <div className="relative overflow-hidden rounded-[2rem] bg-primary/5 border border-primary/10 h-full p-8 flex flex-col justify-between group">
                <div className="w-16 h-16 rounded-2xl bg-primary-mid/10 flex items-center justify-center mb-6 border border-primary-mid/20">
                  <svg className="w-8 h-8 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Zero App Downloads</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Aggregators force app installs. Hotogram opens instantly in the browser.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Value 3 (Small - spans 1 col) */}
            <ScrollReveal duration={800}>
              <div className="relative overflow-hidden rounded-[2rem] bg-surface shadow-lg border border-primary/5 h-full p-8 flex flex-col justify-between group">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 border border-accent/20">
                  <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Setup in 10 Minutes</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Upload your menu, print QR codes, and stick. No complex hardware required.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Value 4 (Large - spans 2 cols) */}
            <ScrollReveal duration={800} delay={150} className="md:col-span-2">
              <div className="relative overflow-hidden rounded-[2rem] bg-bg border border-primary/5 h-full group p-10 flex flex-col justify-center">
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                 <div className="relative z-10 max-w-md">
                  <h3 className="font-heading text-3xl font-bold text-primary mb-4">You Own Your Data</h3>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    Access your customer names, emails, and phone numbers directly. Re-engage them for festive deals without paying ads fees.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founder Note Section */}
      <section className="py-24 px-6 bg-primary-mid text-white dark:bg-surface dark:text-primary">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl bg-black/10 dark:bg-primary-mid/5 rounded-[2.5rem] p-8 md:p-12 border border-white/10 dark:border-primary-mid/20">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <div className="w-full max-w-[200px] md:max-w-[240px] aspect-square rounded-full overflow-hidden border-[6px] border-white/20 dark:border-primary-mid/30 mb-6 shadow-2xl flex items-center justify-center">
                  <img 
                    src="/images/founder.png" 
                    alt="S Abbasy" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-center md:text-left w-full pl-2">
                  <div className="font-heading font-bold text-white dark:text-primary text-xl">S Abbasy</div>
                  <div className="text-sm font-semibold text-teal-200 dark:text-primary-mid mb-6 uppercase tracking-wider">Founder, Hotogram</div>
                  
                  {/* Social links */}
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <a href="https://in.linkedin.com/in/sabbasy" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors hover:scale-110" aria-label="LinkedIn">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://twitter.com/sabbasy_" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors hover:scale-110" aria-label="Twitter">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/sabbasy/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors hover:scale-110" aria-label="Instagram">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://sabbasy.in/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors hover:scale-110" aria-label="Website">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex flex-col items-center md:items-start">
                <h2 className="font-heading text-4xl font-bold text-white dark:text-primary mb-8">Why we built Hotogram</h2>
                <div className="space-y-6 text-xl text-teal-50 dark:text-text-secondary leading-relaxed font-medium">
                  <p>
                    "Running local businesses in Kashmir, I saw firsthand how hard-earned restaurant margins were slipping away to aggregator giants. Up to 25% commission is painful enough on delivery, but paying that on dine-in guests sits wrong."
                  </p>
                  <p>
                    "We built Hotogram to return ownership back to the merchant. Local food businesses shouldn't have to choose between going digital and staying profitable. With a simple QR scan, your kitchen gets orders immediately, and your profits stay with you. That is our promise."
                  </p>
                </div>
                
                {/* Redirection CTA */}
                <a 
                  href="https://sabbasy.in/blog/building-hotogram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-primary-mid shadow-lg hover:bg-white/90 hover:scale-105 transition-all cursor-pointer dark:bg-primary-mid dark:text-white"
                >
                  Read our full journey story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Waitlist / Email Capture Section */}
      <section id="waitlist" className="py-24 px-6 bg-bg">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3.5xl font-bold text-primary tracking-tight">
            Stop losing margin to aggregators.
          </h2>
          
          <p className="mt-4 text-text-secondary text-base max-w-lg mx-auto">
            Lock in early-bird rates. Join our waitlist today to be notified when public beta starts.
          </p>

          {/* Waitlist Live Counter */}
          <div className="mt-8 inline-flex items-center gap-3 bg-surface border border-primary-mid/20 shadow-sm rounded-full px-6 py-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            <span className="font-sans text-sm font-medium text-text-secondary">
              <strong className="text-primary-mid font-bold text-base">{waitlistCount}</strong> businesses on the list
            </span>
          </div>

          {/* Form */}
          <div className="mt-12 max-w-lg mx-auto">
            {submitSuccess ? (
              <div   className="rounded-[2rem] bg-primary-mid/5 border border-primary-mid/20 p-10 text-center shadow-lg">
                <svg className="w-16 h-16 text-primary-mid mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-heading text-2xl font-bold text-primary">You are on the list!</h3>
                <p className="text-base text-text-secondary mt-3">
                  Thank you for joining. We will reach out with early beta credentials soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-5 bg-surface/50 p-6 md:p-8 rounded-[2.5rem] border border-primary/10 shadow-xl backdrop-blur-sm">
                <div className="flex flex-col gap-4">
                  <input
                    type="tel"
                    required
                    placeholder="Mobile number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-full border border-primary/10 bg-bg px-6 py-4 text-primary placeholder-text-secondary/60 focus:border-primary-mid focus:ring-4 focus:ring-primary-mid/10 focus:outline-none transition-all shadow-inner"
                  />
                  <input
                    type="email"
                    placeholder="Business email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-primary/10 bg-bg px-6 py-4 text-primary placeholder-text-secondary/60 focus:border-primary-mid focus:ring-4 focus:ring-primary-mid/10 focus:outline-none transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !phone}
                  className="w-full rounded-full bg-primary-mid px-6 py-4 font-bold text-white transition-all hover:bg-primary hover:shadow-lg disabled:opacity-70 cursor-pointer text-center"
                >
                  {isSubmitting ? "Joining..." : "Get early access"}
                </button>
                <p className="text-xs text-text-secondary text-center">
                  We value your privacy. Phone number is required for verification.
                </p>
              </form>
            )}
          </div>

          {/* Divider */}
          <div className="my-10 flex items-center justify-center text-xs text-text-secondary uppercase tracking-wider font-semibold">
            <span className="w-16 border-t border-primary/10 mr-4"></span>
            Or chat with us
            <span className="w-16 border-t border-primary/10 ml-4"></span>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex justify-center">
            <a
              href={CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:bg-emerald-700 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.004 2C6.51 2 2.014 6.5 2 12a10 10 0 001.393 5.081L2 22l5.076-1.333A9.927 9.927 0 0012.004 22c5.495 0 9.992-4.5 9.996-10 0-2.667-1.04-5.174-2.93-7.062C17.18 3.05 14.67 2 12.004 2zM18.15 15.65c-.27-.134-1.583-.78-1.826-.87-.243-.087-.42-.13-.598.135-.178.266-.69.87-.845 1.05-.156.178-.311.2-.58.066a7.312 7.312 0 01-2.158-1.332 8.063 8.063 0 01-1.493-1.859c-.156-.266-.017-.41.118-.544.12-.121.27-.312.4-.467.135-.156.179-.266.27-.442.088-.178.043-.333-.023-.467-.066-.134-.597-1.442-.818-1.97-.215-.52-.47-.45-.6-.457-.123-.006-.266-.008-.41-.008a.792.792 0 00-.573.267c-.198.217-.753.737-.753 1.797 0 1.06.775 2.083.882 2.23.109.15 1.523 2.327 3.69 3.26.516.222.919.355 1.233.454.518.165.99.14 1.36.086.415-.062 1.582-.647 1.805-1.27.222-.625.222-1.162.156-1.272-.066-.109-.244-.173-.514-.308z" clipRule="evenodd" />
              </svg>
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Calendly Demo Section is disabled for now as requested */}
      {/* 
      <section id="demo" ref={calendlyRef} className="py-24 px-6 border-t border-primary/10 bg-surface">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3.5xl font-bold tracking-tight text-primary">
              Book a 15-Minute Consultation
            </h2>
            <p className="mt-4 text-text-secondary max-w-xl mx-auto">
              See a live dashboard demo and find out how QR ordering fits your current kitchen setup.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-lg min-h-[630px] bg-bg/5 flex items-center justify-center">
            {calendlyLoaded ? (
              <div 
                className="calendly-inline-widget w-full h-[630px]" 
                data-url={CONFIG.calendlyUrl}
              ></div>
            ) : (
              <div className="text-center p-8">
                <svg className="w-12 h-12 text-primary-mid animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                </svg>
                <p className="text-sm text-text-secondary">Loading demo calendar widget...</p>
              </div>
            )}
          </div>
        </div>
      </section>
      */}

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-bg/50 border-t border-primary/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3.5xl font-bold tracking-tight text-primary">
              Frequently Asked Questions
            </h2>
          </div>

          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </>
  );
}


