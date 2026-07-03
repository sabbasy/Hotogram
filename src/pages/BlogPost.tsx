import React from "react";
import SEO from "../components/SEO";
import { BLOG_POSTS } from "./BlogList";

interface BlogPostProps {
  slug: string;
  onNavigate: (page: string, hash?: string) => void;
}

export default function BlogPost({ slug, onNavigate }: BlogPostProps) {
  // Find the post metadata
  const postMeta = BLOG_POSTS.find((p) => p.slug === slug);

  // Return to listing if slug is invalid
  if (!postMeta) {
    return (
      <div className="px-6 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-primary">Post Not Found</h1>
        <button 
          onClick={() => onNavigate("blog-list")}
          className="mt-4 text-primary-mid font-semibold hover:underline"
        >
          Return to resources
        </button>
      </div>
    );
  }

  // Content map for the articles (realistic copy matching direct tone)
  const articleContent: Record<string, React.ReactNode> = {
    "qr-ordering-restaurants-india": (
      <>
        <p>
          Indian casual dining is undergoing a silent shift. Long waits for waiters to deliver menus, write down orders, and process payments are being replaced by instant table QR code scans. Here is how these systems operate behind the scenes.
        </p>

        <h2>1. The Scan-to-Open Trigger</h2>
        <p>
          Each table in the establishment gets a unique QR code. When a customer scans this code with their smartphone camera, the browser detects the table ID embedded in the URL. There is no app to download or account registration needed. The menu loads in under a second.
        </p>

        <h2>2. Dynamic Digital Menus</h2>
        <p>
          Unlike a static PDF menu, digital QR menus are interactive:
        </p>
        <ul>
          <li><strong>Real-time availability:</strong> Out-of-stock items can be toggled off instantly by the manager.</li>
          <li><strong>Customizers:</strong> Customers select spice levels, add extra cheese, or make drinks large with simple checkboxes.</li>
          <li><strong>Allergen filters:</strong> Clear tags show vegetarian, vegan, gluten-free, or nut warnings.</li>
        </ul>

        <h2>3. Kitchen Order Ticket (KOT) Routing</h2>
        <p>
          Once items are added to the cart, the customer clicks "Place Order." The order is instantly sent to the kitchen. It can be printed directly to a traditional thermal kitchen printer or displayed on a Kitchen Display System (KDS) tablet. This cuts out the 5 to 10 minutes usually lost while a waiter carries a handwritten ticket to the kitchen.
        </p>

        <h2>4. Instant Localized Checkout</h2>
        <p>
          When finished, the customer requests the bill on the same browser screen and pays using UPI (GPay, PhonePe, Paytm) or card. The receipt is generated instantly, and the system alerts the staff that the table is cleared.
        </p>
      </>
    ),

    "commission-vs-qr-ordering-costs": (
      <>
        <p>
          If you run a food business in India, you already know the pain of checking your weekly settlement statements. Major food delivery networks take a massive cut of your sales. While that might make sense for bringing you new delivery customers, paying it for guests sitting at your tables is bad business.
        </p>

        <h2>The Reality of Delivery Commissions</h2>
        <p>
          Delivery platforms charge between 18% to 25% commission per order. On a bill of ₹1,000, that is ₹200 to ₹250 gone instantly. If you serve 50 tables a day with this average bill, your monthly dine-in commission bill can exceed ₹3,00,000.
        </p>

        <h2>The Flat SaaS Alternative</h2>
        <p>
          A SaaS platform like Hotogram works on a flat monthly or annual fee. You pay the same flat subscription whether you process 10 orders or 10,000 orders.
        </p>

        <div className="my-8 overflow-x-auto rounded-xl border border-primary/10 bg-bg/50">
          <table className="min-w-full divide-y divide-primary/10">
            <thead className="bg-primary/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">Metric</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">Aggregator App (Dine-in)</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-primary">Hotogram QR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm font-semibold text-primary">Commission Rate</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">18% – 25% per order</td>
                <td className="px-6 py-4 text-sm text-emerald-700 font-bold">0% (Zero)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-semibold text-primary">Monthly Cost (on ₹5L sales)</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">₹90,000 – ₹1,25,000</td>
                <td className="px-6 py-4 text-sm text-emerald-700 font-bold">Flat Subscription</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-semibold text-primary">Customer Data Ownership</td>
                <td className="px-6 py-4 text-sm text-text-secondary">None (Locked by platform)</td>
                <td className="px-6 py-4 text-sm text-emerald-700 font-bold">100% Yours</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Protecting Your Dine-in Profit</h2>
        <p>
          Aggregators argue they bring you customers. But for guests sitting in your seats, reading your menus, and drinking your water, you already did the work to get them in the door. Paying an aggregator for dine-in transactions is giving away margin for no return.
        </p>
      </>
    ),

    "best-qr-ordering-apps-2026": (
      <>
        <p>
          In 2026, QR code ordering is a necessity for fast-paced dining spots. With dozens of options in the Indian market, restaurant owners must look past flashy marketing pitches and evaluate software based on real kitchen requirements.
        </p>

        <h2>Key Factors to Evaluate</h2>
        <ul>
          <li><strong>Browser speed:</strong> If your menu takes more than 3 seconds to load on a patchy 4G connection, customers will give up and call a waiter.</li>
          <li><strong>Payment reliability:</strong> Quick, integrated UPI flows are vital. Failed transactions mean lost money and angry guests.</li>
          <li><strong>Menu editing interface:</strong> You need to be able to disable an out-of-stock item in three taps on your phone.</li>
        </ul>

        <h2>Comparing Subscription vs. Commission Models</h2>
        <p>
          Avoid QR providers that charge a "small transaction fee" (like 1% or 2% on bills). As your sales scale, these fees add up to significant numbers. Choose flat subscription platforms that keep your operational expenses predictable.
        </p>

        <h2>Why Hotogram Stands Out</h2>
        <p>
          Hotogram is engineered strictly for speed and zero commissions. We don't try to be a social network or delivery aggregator. We provide a direct, reliable digital pipe between your tables and your kitchen.
        </p>
      </>
    ),

    "kashmir-restaurants-digital-no-app": (
      <>
        <p>
          Valleys and tourist spots present unique challenges for food business owners. Running a restaurant or cafe in Kashmir means dealing with seasonal crowd spikes, varying internet speeds, and the high cost of building custom software.
        </p>

        <h2>The App Trap</h2>
        <p>
          Many cafe owners think going digital means paying an agency ₹50,000 or more to build a custom Android/iOS app. This is usually a mistake. Customers will not download a 50MB app just to order a kahwa and a kebab. Apps are expensive to build, slow to update, and create unnecessary friction.
        </p>

        <h2>The Browser-Based QR Solution</h2>
        <p>
          Web-based QR ordering solves this. Because the menu is a lightweight website rather than an app, it loads even on low-speed connections. The user gets a responsive ordering experience without any installations.
        </p>

        <h2>Adapting to Payment Realities</h2>
        <p>
          While UPI is dominant, network drops can cause digital payment failures. Hotogram supports hybrid options—customers can order via QR but select "Pay at Counter" (via cash or card) at checkout, keeping the kitchen running smoothly even when internet gateways are slow.
        </p>
      </>
    )
  };

  return (
    <>
      <SEO 
        title={`${postMeta.title} | Hotogram Resources`}
        description={postMeta.excerpt}
        article={true}
      />

      <article className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          
          {/* Back button */}
          <button
            onClick={() => onNavigate("blog-list")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-mid hover:text-primary mb-8 cursor-pointer"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
            Back to resources
          </button>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
              <span>{postMeta.category}</span>
              <span className="h-1 w-1 rounded-full bg-primary/20"></span>
              <span>{postMeta.readTime}</span>
              <span className="h-1 w-1 rounded-full bg-primary/20"></span>
              <span className="text-text-secondary font-normal lowercase">{postMeta.date}</span>
            </div>

            <h1 className="font-heading text-3.5xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
              {postMeta.title}
            </h1>
          </header>

          {/* Stylized Article Hero Cover (Premium solid border placeholder) */}
          <div className="mb-12 border border-primary/10 rounded-2xl bg-primary/5 h-64 md:h-96 flex items-center justify-center text-center p-6">
            <div className="max-w-md">
              <svg className="w-12 h-12 text-primary-mid/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-heading text-sm font-semibold text-primary">Article Visual: {postMeta.title}</h3>
              <p className="text-xs text-text-secondary mt-1">[Placeholder image to be replaced by a clean restaurant workflow graphic or real setup photo]</p>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-primary max-w-none text-base text-text-secondary leading-relaxed space-y-6 
            prose-headings:font-heading prose-headings:font-bold prose-headings:text-primary prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:pt-6 prose-h2:pb-2
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-strong:text-primary">
            {articleContent[slug]}
          </div>

          {/* Footer waitlist card */}
          <div className="mt-16 rounded-3xl border border-primary/10 bg-surface p-6 md:p-10 text-center">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-primary mb-2">
              Bypass delivery app cuts on your dine-in tables
            </h3>
            <p className="text-text-secondary text-sm max-w-lg mx-auto mb-6">
              Establish zero-commission QR menu ordering at your restaurant with Hotogram. Setup takes under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => onNavigate("home", "#waitlist")}
                className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow hover:bg-accent/90 transition-all cursor-pointer"
              >
                Join waitlist
              </button>
              <button
                onClick={() => onNavigate("home", "#demo")}
                className="rounded-xl border border-primary/20 bg-transparent px-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 transition-all cursor-pointer"
              >
                Book a demo
              </button>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
