
import { CONTACT_CONFIG } from "../config/contactConfig";

export const submitQuoteRequest = async (formData) => {
  const apiUrl = CONTACT_CONFIG.quoteApiUrl;

  // Demo mode: backend API is not connected yet.
  if (!apiUrl) {
    console.info("Quote request demo data:", formData);

    return {
      success: true,
      demo: true,
      message: "Demo submission completed.",
    };
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Unable to submit your request. Please try again.");
  }

  return {
    success: true,
    demo: false,
    data: await response.json().catch(() => null),
  };
};
