const FIELD_LABELS = {
  fullName: "your full name",
  phone: "your phone number",
  city: "your city",
  quarter: "your neighborhood (quarter)",
  landmark: "a landmark",
  name: "your name",
  email: "your email address",
  password: "your password",
  amount: "the order total",
  items: "at least one item in your cart",
  _id: "item details",
  quantity: "item quantity",
  price: "item price",
  orderId: "order reference",
  userId: "user account",
};

function formatValidationError(error) {
  const detail = error.details?.[0];
  if (!detail) {
    return "Something went wrong. Please check your details and try again.";
  }

  const fieldPath = detail.path.join(".");
  const fieldLabel = FIELD_LABELS[detail.path.at(-1)] || fieldPath.replace(/\./g, " ");

  switch (detail.type) {
    case "any.required":
    case "string.empty":
      return `Please enter ${fieldLabel}.`;

    case "string.min":
      return `${fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)} is too short.`;

    case "string.max":
      return `${fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)} is too long.`;

    case "string.email":
      return "Please enter a valid email address.";

    case "string.pattern.base":
      if (fieldPath.includes("phone")) {
        return "Please enter a valid Cameroon phone number (e.g. 677 123 456).";
      }
      return `Please check ${fieldLabel} and try again.`;

    case "number.positive":
    case "number.base":
      return "Please enter a valid amount.";

    case "array.min":
      return "Your cart is empty. Add items before placing an order.";

    case "object.unknown":
      return "Some information could not be processed. Please refresh the page and try again.";

    case "any.only":
      return `Please choose a valid option for ${fieldLabel}.`;

    default:
      if (detail.message?.includes("is not allowed")) {
        return "Some information could not be processed. Please refresh the page and try again.";
      }
      return detail.message?.replace(/"/g, "") || "Please check your details and try again.";
  }
}

module.exports = { formatValidationError };
