import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ThreeNeonGrid from "./components/ThreeNeonGrid";

interface RouteState {
  page: "home" | "blog-list" | "blog-post" | "about" | "pricing" | "contact" | "privacy" | "terms";
  slug?: string;
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#/resources/")) {
      return { page: "blog-post", slug: hash.replace("#/resources/", "") };
    }
    if (hash === "#/resources") {
      return { page: "blog-list" };
    }
    if (hash === "#/about") return { page: "about" };
    if (hash === "#/pricing") return { page: "pricing" };
    if (hash === "#/contact") return { page: "contact" };
    if (hash === "#/privacy") return { page: "privacy" };
    if (hash === "#/terms") return { page: "terms" };
    return { page: "home" };
  });

  // Handle browser navigation (back/forward keys)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/resources/")) {
        setRoute({ page: "blog-post", slug: hash.replace("#/resources/", "") });
      } else if (hash === "#/resources") {
        setRoute({ page: "blog-list" });
      } else if (hash === "#/about") {
        setRoute({ page: "about" });
      } else if (hash === "#/pricing") {
        setRoute({ page: "pricing" });
      } else if (hash === "#/contact") {
        setRoute({ page: "contact" });
      } else if (hash === "#/privacy") {
        setRoute({ page: "privacy" });
      } else if (hash === "#/terms") {
        setRoute({ page: "terms" });
      } else {
        setRoute({ page: "home" });
        
        // If there's an anchor section in the URL, scroll to it
        const anchorMatch = hash.match(/#([a-zA-Z0-9_-]+)$/);
        if (anchorMatch && anchorMatch[1] && !hash.startsWith("#/resources") && !hash.startsWith("#/about") && !hash.startsWith("#/pricing") && !hash.startsWith("#/contact") && !hash.startsWith("#/privacy") && !hash.startsWith("#/terms")) {
          setTimeout(() => {
            const element = document.getElementById(anchorMatch[1]);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    
    // If initial load has a section anchor, scroll to it
    const hash = window.location.hash;
    if (hash && !hash.startsWith("#/resources")) {
      const anchorMatch = hash.match(/#([a-zA-Z0-9_-]+)$/);
      if (anchorMatch && anchorMatch[1]) {
        setTimeout(() => {
          const element = document.getElementById(anchorMatch[1]);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 200);
      }
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Main custom navigation handler
  const handleNavigate = (pageName: string, hashAnchor?: string) => {
    let newHash = "#/";
    
    if (pageName === "blog-list") {
      newHash = "#/resources";
    } else if (pageName.startsWith("blog-post-")) {
      const slug = pageName.replace("blog-post-", "");
      newHash = `#/resources/${slug}`;
    } else if (pageName === "about") {
      newHash = "#/about";
    } else if (pageName === "pricing") {
      newHash = "#/pricing";
    } else if (pageName === "contact") {
      newHash = "#/contact";
    } else if (pageName === "privacy") {
      newHash = "#/privacy";
    } else if (pageName === "terms") {
      newHash = "#/terms";
    } else if (pageName === "home" && hashAnchor) {
      newHash = hashAnchor;
    }

    window.history.pushState(null, "", newHash);
    
    // Update internal state to trigger page render
    if (pageName === "blog-list") {
      setRoute({ page: "blog-list" });
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (pageName.startsWith("blog-post-")) {
      setRoute({ page: "blog-post", slug: pageName.replace("blog-post-", "") });
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (pageName === "about") {
      setRoute({ page: "about" });
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (pageName === "pricing") {
      setRoute({ page: "pricing" });
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (pageName === "contact") {
      setRoute({ page: "contact" });
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (pageName === "privacy") {
      setRoute({ page: "privacy" });
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (pageName === "terms") {
      setRoute({ page: "terms" });
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      setRoute({ page: "home" });
      if (hashAnchor) {
        // Allow time for Home page to render, then scroll to section
        setTimeout(() => {
          const id = hashAnchor.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Determine current page state representation for Navbar highlighting
  const currentNavState = route.page === "home" ? "home" : route.page;

  return (
    <div className="relative flex min-h-screen flex-col bg-bg transition-colors duration-300">
      {/* 3D WebGL background grid */}
      <ThreeNeonGrid />
      
      <Navbar currentPage={currentNavState} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {route.page === "home" && <Home onNavigate={handleNavigate} />}
        {route.page === "blog-list" && <BlogList onNavigate={handleNavigate} />}
        {route.page === "blog-post" && (
          <BlogPost slug={route.slug || ""} onNavigate={handleNavigate} />
        )}
        {route.page === "about" && <About onNavigate={handleNavigate} />}
        {route.page === "pricing" && <Pricing onNavigate={handleNavigate} />}
        {route.page === "contact" && <Contact onNavigate={handleNavigate} />}
        {route.page === "privacy" && <Privacy onNavigate={handleNavigate} />}
        {route.page === "terms" && <Terms onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
