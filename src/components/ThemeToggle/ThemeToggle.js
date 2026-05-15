import "./ThemeToggle.css";
import spriteUrl from "./icons.svg";
import { toggleTheme } from "../../features/theme/theme.js";

const SVG_SPRITE_ID = "theme-icons-sprite";
const SVG_NS = "http://www.w3.org/2000/svg";
const LIGHT_ICON = "#icon-moon";
const DARK_ICON = "#icon-sun";
const TOOLTIP_LIGHT = "Ativar modo claro";
const TOOLTIP_DARK = "Ativar modo escuro";

async function ensureSprite() {
  if (document.getElementById(SVG_SPRITE_ID)) return;

  try {
    const resp = await fetch(spriteUrl);
    const text = await resp.text();
    const div = document.createElement("div");
    div.id = SVG_SPRITE_ID;
    div.style.display = "none";
    div.innerHTML = text;
    document.body.appendChild(div);
  } catch (error) {
    console.warn("Could not load theme icon sprite:", error);
  }
}

function createIcon(useRef) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.classList.add("theme-icon");
  svg.setAttribute("aria-hidden", "true");

  const useEl = document.createElementNS(SVG_NS, "use");
  useEl.setAttribute("href", useRef);
  svg.appendChild(useEl);
  return svg;
}

function updateButtonState(button) {
  const theme = document.documentElement.dataset.theme || "light";
  button.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  button.setAttribute("aria-pressed", isDark ? "true" : "false");
  const tooltip = isDark ? TOOLTIP_LIGHT : TOOLTIP_DARK;
  button.setAttribute("data-tooltip", tooltip);
  button.setAttribute("aria-label", tooltip);

  const svg = button.querySelector(".theme-icon");
  if (svg) {
    const use = svg.querySelector("use");
    if (use) {
      if (isDark) {
        use.setAttribute("href", DARK_ICON);
        svg.style.color = "#FBBF24";
      } else {
        use.setAttribute("href", LIGHT_ICON);
        svg.style.color = "#374151";
      }
    }
  }
}

function alignWithLogo(wrapper) {
  const logo = document.querySelector(".logo");
  if (!logo) return;

  const logoRect = logo.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  const desiredTop = window.scrollY + logoRect.top + logoRect.height / 2 - wrapperRect.height / 2;
  wrapper.style.top = `${Math.max(8, desiredTop)}px`;
}

export function ThemeToggle() {
  const wrapper = document.createElement("div");
  wrapper.className = "theme-toggle-wrapper";

  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.type = "button";
  button.setAttribute("role", "switch");

  const icon = createIcon("#icon-lightbulb");
  button.appendChild(icon);

  button.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });

  button.addEventListener("click", async () => {
    toggleTheme();
    updateButtonState(button);
    button.blur();
  });

  const observer = new MutationObserver(() => updateButtonState(button));
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  ensureSprite().finally(() => updateButtonState(button));

  wrapper.appendChild(button);

  const handleResize = () => alignWithLogo(wrapper);

  setTimeout(() => alignWithLogo(wrapper), 50);
  window.addEventListener("resize", handleResize);

  wrapper.cleanup = () => {
    window.removeEventListener("resize", handleResize);
    observer.disconnect();
  };

  return wrapper;
}
