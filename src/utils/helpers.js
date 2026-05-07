/**
 * Limita um valor numerico entre minimo e maximo.
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Gera um ID simples para elementos de UI.
 */
export const generateId = (prefix = "id") => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Escapa caracteres HTML para uso em renderizacao dinamica.
 */
export const escapeHTML = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
