/**
 * Clamp a numeric value between minimum and maximum bounds.
 * @param {number} value - The value to clamp
 * @param {number} min - The minimum bound (inclusive)
 * @param {number} max - The maximum bound (inclusive)
 * @returns {number} The clamped value
 * @example
 * clamp(150, 0, 100) // returns 100
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Generate a unique identifier with optional prefix and timestamp.
 * @param {string} [prefix="id"] - Optional prefix for the ID
 * @returns {string} A unique ID string formatted as "prefix-timestamp-random"
 * @example
 * generateId("user") // returns "user-1716121320000-a7b2c9"
 */
export const generateId = (prefix = "id") => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Escape HTML special characters to prevent XSS attacks during dynamic rendering.
 * @param {string} value - The string to escape
 * @returns {string} The escaped string safe for HTML rendering
 * @example
 * escapeHTML("<script>alert('xss')</script>") // returns "&lt;script&gt;alert('xss')&lt;/script&gt;"
 */
export const escapeHTML = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
