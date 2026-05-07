// Exemplo mínimo de validator
export function isEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
