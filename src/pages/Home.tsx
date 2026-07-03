import { useState, useEffect, useRef } from "react";
import { CONFIG } from "../config";
import SEO from "../components/SEO";
import FAQAccordion from "../components/FAQAccordion";
import type { FAQItem } from "../components/FAQAccordion";
import InteractiveSimulator from "../components/InteractiveSimulator";
import TiltCard from "../components/TiltCard";
import ScrollReveal from "../components/ScrollReveal";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  // Scroll-linked Horizontal Slider logic for How it works
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollHorizontalProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start start", "end end"]
  });
  
  // Transform scroll progress into individual card positions (stacking card deck)
  const card1Scale = useTransform(scrollHorizontalProgress, [0.15, 0.3], [1, 0.95]);
  const card1Opacity = useTransform(scrollHorizontalProgress, [0.15, 0.3], [1, 0.3]);

  const card2X = useTransform(scrollHorizontalProgress, [0.1, 0.35], ["100vw", "0vw"]);
  const card2Scale = useTransform(scrollHorizontalProgress, [0.45, 0.6], [1, 0.95]);
  const card2Opacity = useTransform(scrollHorizontalProgress, [0.45, 0.6], [1, 0.3]);

  const card3X = useTransform(scrollHorizontalProgress, [0.4, 0.65], ["100vw", "0vw"]);
  const card3Scale = useTransform(scrollHorizontalProgress, [0.75, 0.9], [1, 0.95]);
  const card3Opacity = useTransform(scrollHorizontalProgress, [0.75, 0.9], [1, 0.3]);

  const card4X = useTransform(scrollHorizontalProgress, [0.7, 0.95], ["100vw", "0vw"]);

  const springCard1Scale = useSpring(card1Scale, { stiffness: 90, damping: 25 });
  const springCard1Opacity = useSpring(card1Opacity, { stiffness: 90, damping: 25 });

  const springCard2X = useSpring(card2X, { stiffness: 90, damping: 25 });
  const springCard2Scale = useSpring(card2Scale, { stiffness: 90, damping: 25 });
  const springCard2Opacity = useSpring(card2Opacity, { stiffness: 90, damping: 25 });

  const springCard3X = useSpring(card3X, { stiffness: 90, damping: 25 });
  const springCard3Scale = useSpring(card3Scale, { stiffness: 90, damping: 25 });
  const springCard3Opacity = useSpring(card3Opacity, { stiffness: 90, damping: 25 });

  const springCard4X = useSpring(card4X, { stiffness: 90, damping: 25 });

  // 3D Perspective Scroll tilt logic for Why Hotogram
  const whySectionRef = useRef<HTMLDivElement>(null);

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

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-tech-grid">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-mid/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary-mid mb-8 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            Launching {CONFIG.expectedLaunch} — Private Beta Active
          </div>
          
          <h1 className="font-heading text-4.5xl sm:text-6xl font-bold tracking-tight text-primary leading-tight max-w-4xl mx-auto">
            Skip the Wait. <span className="text-primary-mid">Scan, Order, Eat.</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Zero-commission QR table ordering for Indian restaurants and cafes. No customer app download. Orders sent straight to your kitchen.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate("home", "#waitlist")}
              className="w-full sm:w-auto rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all hover:-translate-y-0.5 text-center cursor-pointer"
            >
              Join early access
            </button>
            <button 
              onClick={() => onNavigate("home", "#how-it-works")}
              className="w-full sm:w-auto rounded-xl border-2 border-primary/20 bg-transparent px-8 py-4 text-base font-bold text-primary hover:bg-primary/5 transition-all hover:border-primary-mid/40 text-center cursor-pointer"
            >
              Learn how it works
            </button>
          </div>

          {/* Live Tech Simulator widget */}
          <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
            <InteractiveSimulator />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-surface py-20 px-6 border-y border-primary/10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-primary">
              Aggregator commissions are draining your profits.
            </h2>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              Indian restaurants pay up to 25% on delivery platforms for customers who are already sitting inside their establishments. Adding to that, forcing customers to download an app just to place a dine-in order creates friction that ruins their dining experience.
            </p>
            <div className="mt-8 text-primary-mid font-semibold">
              Hotogram keeps your dine-in ordering commission-free, fast, and completely yours.
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* How It Works Section (Stacked card deck that slides in one step at a time linked to scroll) */}
      <section id="how-it-works" ref={horizontalScrollRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-screen py-16 flex flex-col justify-center overflow-hidden bg-tech-grid/20">
          
          {/* Header */}
          <div className="mx-auto w-full max-w-5xl px-6 mb-8 flex-shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Process Flow</span>
            <h2 className="font-heading text-3.5xl md:text-5xl font-bold tracking-tight text-primary mt-2">
              The 4-Step Table Ordering Journey
            </h2>
            <p className="mt-2 text-text-secondary text-sm md:text-base max-w-xl">
              How Hotogram connects your guest tables directly to your kitchen. Scroll down to see the steps.
            </p>
            
            {/* Dynamic Scroll Progress Bar */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[10px] font-mono text-text-secondary">FLOW PROGRESS</span>
              <div className="w-32 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary-mid" 
                  style={{ width: useTransform(scrollHorizontalProgress, [0, 0.95], ["0%", "100%"]) }}
                />
              </div>
            </div>
          </div>

          {/* Stacking Cards Container */}
          <div className="relative mx-auto w-full max-w-5xl px-6 h-[560px] xs:h-[580px] md:h-[420px] flex-grow max-h-[560px] xs:max-h-[580px] md:max-h-[420px]">
            
            {/* Card 1 */}
            <motion.div 
              style={{
                scale: springCard1Scale,
                opacity: springCard1Opacity,
                zIndex: 10
              }}
              className="absolute inset-x-6 top-0 bottom-0 flex flex-col md:flex-row bg-surface border border-primary/10 rounded-3xl shadow-neon overflow-hidden"
            >
              <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary-mid font-bold text-base">
                      1
                    </span>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Step One</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Scan QR Code</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Diners sit at their table and scan a high-quality QR stand using their default camera app. No downloads, sign-ups, or app store friction.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-text-secondary border-t border-primary/5 pt-3">
                  STATUS: WAITING TO SCAN • TABLE_04
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-3 md:p-6 bg-primary/5 flex items-center justify-center border-t md:border-t-0 md:border-l border-primary/10">
                <div className="w-full max-w-[180px] xs:max-w-[220px] md:max-w-[280px] aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-sm">
                  <img 
                    src="/images/scan_qr_mockup.png" 
                    alt="Diner scanning table QR code mockup" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              style={{
                x: springCard2X,
                scale: springCard2Scale,
                opacity: springCard2Opacity,
                zIndex: 20
              }}
              className="absolute inset-x-6 top-0 bottom-0 flex flex-col md:flex-row bg-surface border border-primary/10 rounded-3xl shadow-neon overflow-hidden"
            >
              <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary-mid font-bold text-base">
                      2
                    </span>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Step Two</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Browse & Add to Cart</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    A fast digital menu loads immediately. Guests browse categories, customize toppings, select quantity counts, and add items to their checkout cart.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-text-secondary border-t border-primary/5 pt-3">
                  MENU: SYNCED LIVE • DINE-IN CARTS
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-3 md:p-6 bg-primary/5 flex items-center justify-center border-t md:border-t-0 md:border-l border-primary/10">
                <div className="w-full max-w-[180px] xs:max-w-[220px] md:max-w-[280px] aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-sm">
                  <img 
                    src="/images/digital_menu_mockup.png" 
                    alt="Digital menu ordering and checkout mockup" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              style={{
                x: springCard3X,
                scale: springCard3Scale,
                opacity: springCard3Opacity,
                zIndex: 30
              }}
              className="absolute inset-x-6 top-0 bottom-0 flex flex-col md:flex-row bg-surface border border-primary/10 rounded-3xl shadow-neon overflow-hidden"
            >
              <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary-mid font-bold text-base">
                      3
                    </span>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Step Three</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Order directly to Kitchen</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Placing order triggers an instant Kitchen Ticket (KOT). It routes to the chef's KDS tablet screen or prints directly on POS ticket registers.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-text-secondary border-t border-primary/5 pt-3">
                  ROUTING: LOCAL NETWORK • KOT_PRINTER_01
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-3 md:p-6 bg-primary/5 flex items-center justify-center border-t md:border-t-0 md:border-l border-primary/10">
                <div className="w-full max-w-[180px] xs:max-w-[220px] md:max-w-[280px] aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-sm">
                  <img 
                    src="/images/kitchen_kds_mockup.png" 
                    alt="Kitchen display system active orders mockup" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              style={{
                x: springCard4X,
                zIndex: 40
              }}
              className="absolute inset-x-6 top-0 bottom-0 flex flex-col md:flex-row bg-surface border border-primary/10 rounded-3xl shadow-neon overflow-hidden"
            >
              <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary-mid font-bold text-base">
                      4
                    </span>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Step Four</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-3">Pay & Get Served</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    When food is prepared, KDS alerts staff. Diners receive status notifications on their phone, complete UPI payments, and get digital receipts.
                  </p>
                </div>
                <div className="text-[11px] font-mono text-text-secondary border-t border-primary/5 pt-3">
                  CHECKOUT: SECURE GATEWAY • SETTLED_DIRECT
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-3 md:p-6 bg-primary/5 flex items-center justify-center border-t md:border-t-0 md:border-l border-primary/10">
                <div className="w-full max-w-[180px] xs:max-w-[220px] md:max-w-[280px] aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-sm">
                  <img 
                    src="/images/payment_receipt_mockup.png" 
                    alt="Digital payment success and checkout mockup" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-surface/50 border-t border-primary/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3.5xl font-bold tracking-tight text-primary">
              Built for your workflow
            </h2>
            <p className="mt-4 text-text-secondary max-w-xl mx-auto">
              Hotogram adapts to your business model to drive ordering speed and lower staff burden.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-primary/5 p-1 border border-primary/10">
              <button
                onClick={() => setActiveTab("restaurants")}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "restaurants"
                    ? "bg-primary-mid text-white shadow"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                Restaurants
              </button>
              <button
                onClick={() => setActiveTab("cafes")}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "cafes"
                    ? "bg-primary-mid text-white shadow"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                Cafes
              </button>
              <button
                onClick={() => setActiveTab("retail")}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "retail"
                    ? "bg-primary-mid text-white shadow"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                Hotels & Salons
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mx-auto max-w-4xl bg-surface p-5 md:p-12 rounded-3xl border border-primary/10 shadow-sm transition-all duration-300">
            {activeTab === "restaurants" && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Dine-in Excellence</div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-4">Restaurants</h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-6">
                    Streamline your table ordering operations. Diners scan and place custom orders directly to the kitchen display. Staff focus on serving food hot instead of taking down pencil tickets.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-primary font-medium">
                      <svg className="w-5 h-5 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Instant kitchen ticket generation
                    </li>
                    <li className="flex items-center gap-3 text-sm text-primary font-medium">
                      <svg className="w-5 h-5 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Direct-to-table delivery tracking
                    </li>
                  </ul>
                </div>
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-[320px] md:max-w-[360px] aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 shadow-sm">
                    <img 
                      src="/images/usecase_restaurants.png" 
                      alt="Digital menu preview mockup for restaurants" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cafes" && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">High Turnover Speed</div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-4">Cafes & Bakeries</h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-6">
                    Eliminate long morning counter queues. Customers order their custom flat whites and croissants directly from their cozy corner tables and track preparation status live.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-primary font-medium">
                      <svg className="w-5 h-5 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Split-second UPI checkouts
                    </li>
                    <li className="flex items-center gap-3 text-sm text-primary font-medium">
                      <svg className="w-5 h-5 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Built-in digital stamp card loyalty hooks
                    </li>
                  </ul>
                </div>
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-[320px] md:max-w-[360px] aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 shadow-sm">
                    <img 
                      src="/images/usecase_cafes.png" 
                      alt="Express coffee ordering cart mockup for cafes" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "retail" && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Catalog & Services</div>
                  <h3 className="font-heading text-2xl font-bold text-primary mb-4">Hotels & Salons</h3>
                  <p className="text-text-secondary text-base leading-relaxed mb-6">
                    Deliver orders directly to hotel rooms or salon chairs. Let guests browse room service catalogs or select premium salon treatments by scanning a localized QR code.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-primary font-medium">
                      <svg className="w-5 h-5 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Location-tied ordering (room numbers/stations)
                    </li>
                    <li className="flex items-center gap-3 text-sm text-primary font-medium">
                      <svg className="w-5 h-5 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Digital services catalog browsing
                    </li>
                  </ul>
                </div>
                <div className="w-full flex justify-center">
                  <div className="w-full max-w-[320px] md:max-w-[360px] aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-primary/5 shadow-sm">
                    <img 
                      src="/images/usecase_hotels.png" 
                      alt="Room service digital catalog mockup for hotels and salon treatments" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Hotogram Section (Comparison-style grid with 3D scroll entrance) */}
      <section id="why-hotogram" ref={whySectionRef} style={{ perspective: "1000px" }} className="py-24 px-6 bg-surface border-t border-primary/10">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3.5xl font-bold tracking-tight text-primary">
                Why restaurants are ditching traditional aggregator networks
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <ScrollReveal delay={0} duration={600}>
              <TiltCard className="h-full">
                <div className="p-6 md:p-8 rounded-3xl bg-bg/40 border border-primary/5 h-full flex flex-col justify-between">
                  <div>
                    <div className="relative overflow-hidden rounded-2xl bg-primary/5 aspect-square mb-5 border border-primary/10 shadow-sm">
                      <img 
                        src="/images/story_zero_commission.png" 
                        alt="Zero commission transactions saving money" 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary mb-3">Zero Commission</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Save lakhs in aggregator cuts. You only pay a predictable flat subscription. Every single transaction rupee goes straight into your bank.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Value 2 */}
            <ScrollReveal delay={100} duration={600}>
              <TiltCard className="h-full">
                <div className="p-6 md:p-8 rounded-3xl bg-bg/40 border border-primary/5 h-full flex flex-col justify-between">
                  <div>
                    <div className="relative overflow-hidden rounded-2xl bg-primary/5 aspect-square mb-5 border border-primary/10 shadow-sm">
                      <img 
                        src="/images/story_zero_downloads.png" 
                        alt="Customer scanning QR code instantly in browser" 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary mb-3">Zero App Downloads</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Aggregators force app installs to capture users. Hotogram opens directly inside the mobile browser for zero friction dine-in service.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Value 3 */}
            <ScrollReveal delay={200} duration={600}>
              <TiltCard className="h-full">
                <div className="p-6 md:p-8 rounded-3xl bg-bg/40 border border-primary/5 h-full flex flex-col justify-between">
                  <div>
                    <div className="relative overflow-hidden rounded-2xl bg-primary/5 aspect-square mb-5 border border-primary/10 shadow-sm">
                      <img 
                        src="/images/story_fast_setup.png" 
                        alt="Setup menu and QR stand layout in 10 minutes" 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary mb-3">Setup in 10 Minutes</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Upload your menu, download your unique generated QR codes, print and stick. No complicated POS hardware setup required.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Value 4 */}
            <ScrollReveal delay={300} duration={600}>
              <TiltCard className="h-full">
                <div className="p-6 md:p-8 rounded-3xl bg-bg/40 border border-primary/5 h-full flex flex-col justify-between">
                  <div>
                    <div className="relative overflow-hidden rounded-2xl bg-primary/5 aspect-square mb-5 border border-primary/10 shadow-sm">
                      <img 
                        src="/images/story_data_ownership.png" 
                        alt="Merchant owning guest contacts data ledger" 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-primary mb-3">You Own Your Data</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Access your customer names, emails, and phone numbers directly. Re-engage them for festive deals without paying ads fees.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Founder Note Section */}
      <section className="py-20 px-6 bg-primary-mid text-white dark:bg-surface dark:text-primary border-y dark:border-primary/10">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <div className="w-full max-w-[200px] md:max-w-[240px] aspect-square rounded-2xl overflow-hidden border-2 border-white/20 dark:border-primary-mid mb-4 shadow-sm bg-white/10 flex items-center justify-center">
                  <img 
                    src="/images/founder.png" 
                    alt="S Abbasy" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="font-bold text-white dark:text-primary text-base">S Abbasy</div>
                  <div className="text-xs text-teal-200 dark:text-primary-mid mb-4">Founder, Hotogram</div>
                  
                  {/* Social links */}
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <a href="https://in.linkedin.com/in/sabbasy" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors animate-pulse-slow" aria-label="LinkedIn">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="https://twitter.com/sabbasy_" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors" aria-label="Twitter">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/sabbasy/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors" aria-label="Instagram">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://sabbasy.in/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors" aria-label="Website">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex flex-col items-center md:items-start mt-6 md:mt-0">
                <h2 className="font-heading text-2.5xl font-bold text-white dark:text-primary mb-6">Why we built Hotogram</h2>
                <blockquote className="space-y-4 text-base text-teal-100/90 dark:text-text-secondary leading-relaxed italic mb-8">
                  <p>
                    "Running and working with local businesses in Kashmir, I saw firsthand how hard-earned restaurant margins were slipping away to aggregator giants. Up to 25% commission is painful enough on delivery, but paying that on dine-in guests sits wrong."
                  </p>
                  <p>
                    "We built Hotogram to return ownership back to the merchant. Local food businesses shouldn't have to choose between going digital and staying profitable. With a simple QR scan, your kitchen gets orders immediately, and your profits stay with you. That is our promise."
                  </p>
                </blockquote>
                
                {/* Redirection CTA to full journey article */}
                <a 
                  href="https://sabbasy.in/blog/building-hotogram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-accent/90 hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
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
          <div className="mt-6 inline-flex items-center gap-2.5 bg-primary-mid/5 border border-primary-mid/20 rounded-xl px-5 py-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></span>
            <span className="font-heading text-sm font-semibold text-primary">
              <strong className="text-primary-mid">{waitlistCount}</strong> businesses already on the list
            </span>
          </div>

          {/* Form */}
          <div className="mt-10 max-w-md mx-auto">
            {submitSuccess ? (
              <div className="rounded-2xl bg-primary-mid/10 border border-primary-mid/30 p-8 text-center animate-fade-in">
                <svg className="w-12 h-12 text-primary-mid mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-heading text-lg font-bold text-primary">You are on the list!</h3>
                <p className="text-sm text-text-secondary mt-2">
                  Thank you for joining. We will reach out with early beta credentials soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="tel"
                    required
                    placeholder="Mobile number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-primary/20 bg-surface px-5 py-4 text-primary placeholder-text-secondary/60 focus:border-primary-mid focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Business email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-primary/20 bg-surface px-5 py-4 text-primary placeholder-text-secondary/60 focus:border-primary-mid focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !phone}
                  className="w-full rounded-xl bg-accent px-6 py-4 font-bold text-white transition-colors hover:bg-accent/90 disabled:opacity-70 cursor-pointer text-center"
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
