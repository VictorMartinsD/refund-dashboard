/**
 * Format a date to Brazilian locale (pt-BR) string representation.
 * @param {Date|string|number} date - The date to format (Date object, ISO string, or timestamp)
 * @returns {string} The formatted date string in "dd/mm/yyyy" format
 * @example
 * formatDate(new Date("2024-05-19")) // returns "19/05/2024"
 * formatDate("2024-05-19T00:00:00Z") // returns "19/05/2024"
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString("pt-BR");
}
