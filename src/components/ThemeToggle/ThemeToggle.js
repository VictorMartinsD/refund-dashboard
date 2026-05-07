import "./ThemeToggle.css";
import { toggleTheme } from "../../features/theme/theme.js";

export function ThemeToggle() {
  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.type = "button";
  button.textContent = "Alternar tema";
  button.addEventListener("click", toggleTheme);
  return button;
}
