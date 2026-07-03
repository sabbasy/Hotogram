import { CONFIG } from "../config";

interface FooterProps {
  onNavigate: (page: string, hash?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-primary/10 bg-surface/50 py-16 text-primary">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          
          {/* Logo & Pitch */}
          <div className="md:col-span-2">
            <button 
              onClick={() => onNavigate("home", "")}
              className="flex items-center gap-2.5 text-left cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 p-1">
                <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="5" r="2.5" className="fill-primary-mid" />
                  <circle cx="19" cy="5" r="2.5" className="fill-primary-mid" />
                  <circle cx="5" cy="12" r="2.5" className="fill-primary-mid" />
                  <circle cx="12" cy="12" r="2.5" className="fill-primary-mid" />
                  <circle cx="19" cy="12" r="2.5" className="fill-primary-mid" />
                  <circle cx="5" cy="19" r="2.5" className="fill-primary-mid" />
                  <circle cx="19" cy="19" r="2.5" className="fill-accent" />
                </svg>
              </div>
              <span className="font-heading text-xl font-semibold tracking-tight text-primary">
                hotogram<span className="text-accent">.</span>
              </span>
            </button>
            <p className="mt-4 max-w-sm text-sm text-text-secondary">
              Zero-commission QR code ordering for Indian restaurants, cafes, and hotels. Speed up service, cut commission bills, and own your customer relationship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Product
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate("home", "#how-it-works")}
                  className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  How it works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("home", "#use-cases")}
                  className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Use cases
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("pricing")}
                  className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("home", "#faq")}
                  className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Company & Support
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate("about")}
                  className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("contact")}
                  className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate("blog-list")}
                  className="text-sm text-text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  Blog & Guides
                </button>
              </li>
              <li>
                <a 
                  href={`mailto:${CONFIG.contactEmail}`}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {CONFIG.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-primary/10"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <p className="text-xs text-text-secondary text-center sm:text-left">
              &copy; {new Date().getFullYear()} Hotogram. All rights reserved. Made in India.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate("privacy")}
                className="text-xs text-text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onNavigate("terms")}
                className="text-xs text-text-secondary hover:text-primary transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a 
              href={CONFIG.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href={CONFIG.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a 
              href={CONFIG.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text-secondary hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
