const FRIENDLY_MESSAGES = {
  VALIDATION_ERROR: null,
  NETWORK_ERROR: "Could not reach the server. Check your internet connection and try again.",
  AUTH_ERROR: "Please sign in to continue.",
  SERVER_ERROR: "Something went wrong on our end. Please try again in a moment.",
};

export function parseApiError(message, fallback = "Something went wrong. Please try again.") {
  if (!message || typeof message !== "string") return fallback;

  const cleaned = message
    .replace(/"/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/is not allowed/gi, "could not be processed")
    .trim();

  if (cleaned.includes("is not allowed") || cleaned.includes("could not be processed")) {
    return "Some information could not be processed. Please refresh the page and try again.";
  }

  if (cleaned.toLowerCase().includes("network") || cleaned.toLowerCase().includes("fetch")) {
    return FRIENDLY_MESSAGES.NETWORK_ERROR;
  }

  if (cleaned.toLowerCase().includes("authorized") || cleaned.toLowerCase().includes("sign in")) {
    return FRIENDLY_MESSAGES.AUTH_ERROR;
  }

  if (
    cleaned.includes("Please enter") ||
    cleaned.includes("Please select") ||
    cleaned.includes("Please check") ||
    cleaned.includes("Your cart is empty") ||
    cleaned.includes("valid Cameroon phone") ||
    cleaned.includes("valid email")
  ) {
    return cleaned;
  }

  if (cleaned.length > 120 || cleaned.includes(".") && cleaned.includes("_")) {
    return fallback;
  }

  return cleaned || fallback;
}

export function normalizeCameroonPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("237") && digits.length === 12) return digits;
  if (digits.length === 9) return `237${digits}`;
  return digits;
}

export function formatDeliveryAddress(address) {
  if (!address) return { name: "—", lines: [] };

  if (address.fullName || address.quarter) {
    const lines = [];
    if (address.quarter) {
      const location = address.landmark
        ? `${address.quarter} (${address.landmark})`
        : address.quarter;
      lines.push(location);
    }
    if (address.city) lines.push(address.city);
    if (address.phone) lines.push(`Tel: ${address.phone}`);
    return { name: address.fullName || "Customer", lines };
  }

  const name = [address.firstName, address.lastName].filter(Boolean).join(" ") || "Customer";
  const lines = [
    address.street,
    [address.city, address.state, address.zipCode].filter(Boolean).join(", "),
    address.country,
    address.phone ? `Tel: ${address.phone}` : null,
  ].filter(Boolean);

  return { name, lines };
}
