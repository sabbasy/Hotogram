import { useState } from "react";
import { useTheme } from "./ThemeContext";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, hash?: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLinkClick = (hash: string) => {
    setMobileMenuOpen(false);
    onNavigate("home", hash);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/5 bg-bg/70 backdrop-blur-xl transition-all duration-300 shadow-sm shadow-primary/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo left */}
        <button 
          onClick={() => handleLinkClick("")}
          className="group flex items-center gap-2.5 text-left cursor-pointer"
        >
          {/* Custom SVG Icon: 3x3 dot grid in rounded square (evoking QR code) */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/5 p-1.5 transition-colors group-hover:bg-primary/10">
            <svg 
              className="h-full w-full" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Row 1 */}
              <circle cx="5" cy="5" r="2.5" className="fill-primary-mid" />
              <circle cx="19" cy="5" r="2.5" className="fill-primary-mid" />
              {/* Row 2 */}
              <circle cx="5" cy="12" r="2.5" className="fill-primary-mid" />
              <circle cx="12" cy="12" r="2.5" className="fill-primary-mid" />
              <circle cx="19" cy="12" r="2.5" className="fill-primary-mid" />
              {/* Row 3 */}
              <circle cx="5" cy="19" r="2.5" className="fill-primary-mid" />
              <circle cx="19" cy="19" r="2.5" className="fill-accent" /> {/* Coral accent dot */}
            </svg>
          </div>
          <span className="font-heading text-2xl font-semibold tracking-tight text-primary">
            hotogram<span className="text-accent">.</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button 
            onClick={() => handleLinkClick("#how-it-works")}
            className="text-sm font-medium text-text-secondary transition-all duration-200 hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            How it works
          </button>
          <button 
            onClick={() => handleLinkClick("#use-cases")}
            className="text-sm font-medium text-text-secondary transition-all duration-200 hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            Use cases
          </button>
          <button 
            onClick={() => handleLinkClick("#faq")}
            className="text-sm font-medium text-text-secondary transition-all duration-200 hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            FAQ
          </button>
          <button 
            onClick={() => onNavigate("blog-list")}
            className={`text-sm transition-all duration-200 hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg cursor-pointer ${
              currentPage.startsWith("blog") ? "text-primary font-semibold" : "text-text-secondary font-medium"
            }`}
          >
            Resources
          </button>
          <button 
            onClick={() => onNavigate("pricing")}
            className={`text-sm transition-all duration-200 hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg cursor-pointer ${
              currentPage === "pricing" ? "text-primary font-semibold" : "text-text-secondary font-medium"
            }`}
          >
            Pricing
          </button>
          <button 
            onClick={() => onNavigate("about")}
            className={`text-sm transition-all duration-200 hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg cursor-pointer ${
              currentPage === "about" ? "text-primary font-semibold" : "text-text-secondary font-medium"
            }`}
          >
            About Us
          </button>
          <button 
            onClick={() => onNavigate("contact")}
            className={`text-sm transition-all duration-200 hover:text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg cursor-pointer ${
              currentPage === "contact" ? "text-primary font-semibold" : "text-text-secondary font-medium"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Desktop CTA & Theme Toggle Right */}
        <div className="hidden md:flex items-center gap-6">
          {/* Light/Dark Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              // Sun Icon for Dark mode (toggles to light)
              <svg className="h-5 w-5 animate-spin-slow text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 6.364A9 9 0 1111.01 3v2.022a7 7 0 106.968 6.968H20z" />
              </svg>
            ) : (
              // Moon Icon for Light mode (toggles to dark)
              <svg className="h-5 w-5 text-primary-mid" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button 
            onClick={() => handleLinkClick("#waitlist")}
            className="rounded-full bg-primary-mid px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-mid/20 transition-all hover:bg-primary hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Join early access
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-primary md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-primary/10 bg-bg px-6 py-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-primary/5 pb-3 mb-3">
            <span className="text-xs font-semibold text-text-secondary">Interface Theme</span>
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
            >
              {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            <button 
              onClick={() => handleLinkClick("#how-it-works")}
              className="text-left py-2 text-base font-medium text-text-secondary hover:text-primary"
            >
              How it works
            </button>
            <button 
              onClick={() => handleLinkClick("#use-cases")}
              className="text-left py-2 text-base font-medium text-text-secondary hover:text-primary"
            >
              Use cases
            </button>
            <button 
              onClick={() => handleLinkClick("#faq")}
              className="text-left py-2 text-base font-medium text-text-secondary hover:text-primary"
            >
              FAQ
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("blog-list");
              }}
              className={`text-left py-2 text-base font-medium hover:text-primary ${
                currentPage.startsWith("blog") ? "text-primary font-bold" : "text-text-secondary"
              }`}
            >
              Resources
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("pricing");
              }}
              className={`text-left py-2 text-base font-medium hover:text-primary ${
                currentPage === "pricing" ? "text-primary font-bold" : "text-text-secondary"
              }`}
            >
              Pricing
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("about");
              }}
              className={`text-left py-2 text-base font-medium hover:text-primary ${
                currentPage === "about" ? "text-primary font-bold" : "text-text-secondary"
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate("contact");
              }}
              className={`text-left py-2 text-base font-medium hover:text-primary ${
                currentPage === "contact" ? "text-primary font-bold" : "text-text-secondary"
              }`}
            >
              Contact
            </button>
            <button 
              onClick={() => handleLinkClick("#waitlist")}
              className="mt-2 w-full rounded-lg bg-accent py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent/90"
            >
              Join early access
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
