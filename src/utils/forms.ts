import { CONFIG } from "../config";

interface FormPayload {
  formType: string;
  name?: string;
  phone: string;
  email?: string;
  restaurant?: string;
  city?: string;
  message?: string;
}

/**
 * Submits form data to the Google Apps Script Web App endpoint.
 * Fallbacks to simulation if no custom endpoint is configured.
 */
export async function submitToGoogleSheets(data: FormPayload): Promise<boolean> {
  const endpoint = CONFIG.waitlistApiEndpoint;
  
  // If endpoint is not set, or is the default placeholder, fallback to simulated success
  if (!endpoint || endpoint.includes("api.hotogram.com") || endpoint === "") {
    console.warn(
      "Google Sheets API endpoint is not set. Go to src/config.ts and set waitlistApiEndpoint to your Google Web App script URL."
    );
    // Mimic API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  try {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        params.append(key, val);
      }
    });

    // Google Apps Scripts redirect requests. Setting 'no-cors' mode allows 
    // the browser to post successfully across domains without CORS security blocks.
    await fetch(endpoint, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      mode: "no-cors"
    });

    return true;
  } catch (error) {
    console.error("Error submitting form data to Google Sheets:", error);
    return false;
  }
}
