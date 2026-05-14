/**
 * Storage helpers for persisted local data.
 */
const EXPENSES_KEY = "template-base-expenses";

/**
 * Load stored expenses from localStorage.
 * @returns {Array<object>} Stored expenses list or an empty array when unavailable
 */
export function loadExpenses() {
  try {
    const storedExpenses = localStorage.getItem(EXPENSES_KEY);

    if (!storedExpenses) return [];

    const parsedExpenses = JSON.parse(storedExpenses);
    return Array.isArray(parsedExpenses) ? parsedExpenses : [];
  } catch (error) {
    console.warn("Could not load saved expenses:", error);
    return [];
  }
}

/**
 * Persist expenses to localStorage.
 * @param {Array<object>} expenses - Expenses collection to store
 */
export function saveExpenses(expenses) {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.warn("Could not persist expenses:", error);
  }
}
