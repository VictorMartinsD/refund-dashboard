/**
 * Validate if a string is a valid email format.
 * @param {string} email - The email string to validate
 * @returns {boolean} True if email matches basic RFC pattern, false otherwise
 * @example
 * isEmail("user@example.com") // returns true
 * isEmail("invalid-email") // returns false
 */
export function isEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

/**
 * Check if a string value is not empty after trimming whitespace.
 * @param {string} value - The string to validate
 * @returns {boolean} True if the string is non-empty, false otherwise
 * @example
 * isNotEmpty("food") // returns true
 * isNotEmpty("") // returns false
 * isNotEmpty("  ") // returns false
 */
export function isNotEmpty(value) {
  return value && value.trim().length > 0;
}

/**
 * Validate if an amount is a positive number.
 * @param {number} amount - The amount value to validate
 * @returns {boolean} True if amount is positive and not zero, false otherwise
 * @example
 * isValidAmount(150.50) // returns true
 * isValidAmount(-50) // returns false
 * isValidAmount(0) // returns false
 */
export function isValidAmount(amount) {
  const parsedAmount = parseFloat(amount);
  return !isNaN(parsedAmount) && parsedAmount > 0;
}
