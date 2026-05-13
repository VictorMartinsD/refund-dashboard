/**
 * Parse a fetch response and throw a structured error when the request fails.
 * @param {Response} response - The fetch response object
 * @returns {Promise<unknown>} Parsed JSON response body
 * @throws {Error} When the response is not successful
 */
async function parseResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * Small API wrapper with basic error handling for GET and POST requests.
 */
export const api = {
  /**
   * Perform a GET request.
   * @param {string} url - Request URL
   * @returns {Promise<unknown>} Parsed JSON response
   */
  async get(url) {
    try {
      const response = await fetch(url);
      return await parseResponse(response);
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },

  /**
   * Perform a POST request with JSON payload.
   * @param {string} url - Request URL
   * @param {unknown} data - Payload to be sent as JSON
   * @returns {Promise<unknown>} Parsed JSON response
   */
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      return await parseResponse(response);
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  },
};
