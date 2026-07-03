import ScrollReveal from "../components/ScrollReveal";

interface AboutProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
              Our Story
            </h1>
            <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              We build technology to return ownership, profits, and data back to independent merchants.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {/* Main Story Card */}
          <ScrollReveal delay={100}>
            <div className="rounded-3xl border border-primary/10 bg-surface/50 p-6 md:p-10 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Why Hotogram Exists
              </h2>
              <div className="space-y-6 text-text-secondary text-base leading-relaxed">
                <p>
                  Running local businesses in Kashmir, we watched hardworking restaurant owners fight a losing battle against food delivery aggregator giants. Up to 25% commissions on delivery orders were painful enough. But when aggregators began capturing dine-in tables, forcing apps on walk-in guests, it crossed a line.
                </p>
                <p>
                  Local food businesses shouldn't have to choose between going digital and staying profitable. Technology should empower merchants, not tax them.
                </p>
                <p>
                  We built <strong>Hotogram</strong> as a simple, powerful, flat-rate alternative. By scanning a QR code on a table, customers browse and order directly inside their browser—no downloads required. The ticket routes straight to your kitchen, and 100% of the sale goes directly to your bank account.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillars Grid */}
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-primary/5 bg-surface/30 p-6">
                <h3 className="font-heading text-lg font-bold text-primary mb-3">Zero Commission</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Aggregators tax your hard work. Hotogram runs on a predictable flat monthly subscription. Keep every single rupee.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/5 bg-surface/30 p-6">
                <h3 className="font-heading text-lg font-bold text-primary mb-3">Zero App Downloads</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Customers scan and order in seconds directly inside the browser. Zero sign-up friction, zero app store barriers.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/5 bg-surface/30 p-6">
                <h3 className="font-heading text-lg font-bold text-primary mb-3">Own Your Data</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Get direct access to guest contact names, emails, and phone logs. Build lasting relationships without intermediary walls.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Founder Bio Card */}
          <ScrollReveal delay={300}>
            <div className="rounded-3xl border border-primary/10 bg-primary-mid text-white dark:bg-surface dark:text-primary p-6 md:p-10 shadow-sm">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 flex flex-col items-center">
                  <div className="w-full max-w-[200px] aspect-square rounded-2xl overflow-hidden border-2 border-white/20 dark:border-primary-mid mb-4 shadow-md bg-white/10 flex items-center justify-center">
                    <img 
                      src="/images/founder.png" 
                      alt="S Abbasy" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-heading text-lg font-bold text-white dark:text-primary">S Abbasy</h4>
                    <p className="text-xs text-teal-200 dark:text-primary-mid mb-4">Founder, Hotogram</p>
                    
                    {/* Social links */}
                    <div className="flex justify-center gap-3">
                      <a href="https://in.linkedin.com/in/sabbasy" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white dark:text-primary/70 dark:hover:text-primary-mid transition-colors" aria-label="LinkedIn">
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
                
                <div className="md:col-span-2">
                  <h3 className="font-heading text-xl font-bold text-white dark:text-primary mb-4">
                    Founder's Statement
                  </h3>
                  <div className="space-y-4 text-sm text-teal-100/90 dark:text-text-secondary leading-relaxed">
                    <p>
                      "When you run a restaurant in Kashmir or anywhere in India, every single margin point counts. Aggregators charges of up to 25% eat the difference between running a healthy business and going under. Dine-in ordering doesn't need a platform intermediary. Our promise is simple: flat subscription pricing, direct payouts, and zero commission cuts."
                    </p>
                    <button 
                      onClick={() => onNavigate("contact")}
                      className="mt-4 rounded-xl bg-accent px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-accent/90 transition-all cursor-pointer"
                    >
                      Connect with S Abbasy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Call to Action back button */}
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
    </div>
  );
}
