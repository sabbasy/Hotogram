import SEO from "../components/SEO";
import { CONFIG } from "../config";

export interface BlogPostItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export const BLOG_POSTS: BlogPostItem[] = [
  {
    slug: "qr-ordering-restaurants-india",
    title: "QR code ordering system for restaurants in India — how it works",
    excerpt: "Discover the step-by-step mechanics of contactless table ordering systems in India, how they link to printers/KOT systems, and why customers prefer them.",
    date: "June 28, 2026",
    readTime: "6 min read",
    category: "Guides"
  },
  {
    slug: "commission-vs-qr-ordering-costs",
    title: "Zomato and Swiggy commission vs QR ordering: what it actually costs you",
    excerpt: "A deep-dive cost analysis comparison. Calculate how much your restaurant loses to aggregator commission percentages versus a flat monthly SaaS subscription.",
    date: "June 15, 2026",
    readTime: "8 min read",
    category: "Analysis"
  },
  {
    slug: "best-qr-ordering-apps-2026",
    title: "Best QR ordering apps for small restaurants in 2026",
    excerpt: "An honest review comparing the top QR table ordering platforms in the Indian market, highlighting ease of setup, UPI support, fees, and performance.",
    date: "May 30, 2026",
    readTime: "5 min read",
    category: "Reviews"
  },
  {
    slug: "kashmir-restaurants-digital-no-app",
    title: "How Kashmir restaurants can go digital without an app",
    excerpt: "Practical tips for valley restaurant and cafe owners to introduce digital ordering, handle local connectivity hurdles, and bypass expensive app developers.",
    date: "May 10, 2026",
    readTime: "7 min read",
    category: "Case Studies"
  }
];

interface BlogListProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function BlogList({ onNavigate }: BlogListProps) {
  return (
    <>
      <SEO 
        title="Hotogram Resources — Grow Your Restaurant Profits"
        description="Read articles, guides, and comparison studies about QR code table ordering, UPI pay at table, and ways to eliminate heavy third-party commissions."
      />

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Resources & Insights
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Guides, case studies, and transparent advice to help Indian food businesses go digital and protect their profit margins.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.slug}
                className="group flex flex-col justify-between bg-surface border border-primary/10 rounded-2.5xl p-6 md:p-8 hover:border-primary-mid/20 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {post.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-primary/20"></span>
                    <span className="text-xs text-text-secondary">
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h2 className="font-heading text-xl font-bold text-primary group-hover:text-primary-mid transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs text-text-secondary/70">
                    {post.date}
                  </span>
                  
                  <button
                    onClick={() => onNavigate(`blog-post-${post.slug}`)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-mid group-hover:text-primary transition-colors cursor-pointer"
                  >
                    Read article
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 rounded-3xl bg-primary-mid text-white dark:bg-surface dark:text-primary border dark:border-primary/10 p-6 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white dark:text-primary mb-4">
              Ready to take control of your restaurant ordering?
            </h3>
            <p className="text-teal-100/90 dark:text-text-secondary text-sm md:text-base max-w-xl mx-auto mb-8">
              Start your zero-commission QR ordering system today. Setup takes under 10 minutes.
            </p>
            <a
              href={CONFIG.signupUrl}
              className="inline-block rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-accent/90 transition-colors cursor-pointer"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
