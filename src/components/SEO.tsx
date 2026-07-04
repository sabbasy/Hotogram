import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  schema?: Record<string, any> | Record<string, any>[];
  article?: boolean;
}

export default function SEO({ title, description, schema, article = false }: SEOProps) {
  useEffect(() => {
    // 1. Update document title
    document.title = title.includes("Hotogram") ? title : `${title} | Hotogram — Restaurant Operating System`;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Open Graph Meta Tags
    const ogTags = {
      "og:title": title,
      "og:description": description,
      "og:type": article ? "article" : "website",
      "og:image": "/og-image.jpg", // placeholder path
      "og:url": window.location.href,
      "og:site_name": "Hotogram",
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    // 4. Twitter Card Meta Tags
    const twitterTags = {
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": "/og-image.jpg",
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    });

    // 5. Schema JSON-LD Injection
    const existingSchemaScript = document.getElementById("seo-schema");
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement("script");
      script.id = "seo-schema";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup schemas when component unmounts
      const script = document.getElementById("seo-schema");
      if (script) {
        script.remove();
      }
    };
  }, [title, description, schema, article]);

  return null;
}
