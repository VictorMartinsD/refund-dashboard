const THEME_KEY = "template-base-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return LIGHT_THEME;
  }

  return window.matchMedia(DARK_SCHEME_QUERY).matches ? DARK_THEME : LIGHT_THEME;
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.warn("Could not persist theme preference:", error);
  }
}

export function initTheme() {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (error) {
    console.warn("Could not read theme preference:", error);
  }

  applyTheme(savedTheme || getPreferredTheme());
}

export function toggleTheme() {
  const nextTheme = document.documentElement.dataset.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  applyTheme(nextTheme);
}
