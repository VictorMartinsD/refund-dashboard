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
