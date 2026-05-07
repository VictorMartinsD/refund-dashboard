/*
  AUTOR: Victor Martins
  DESCRICAO: Ponto de entrada principal da aplicação.
*/

import "./css/index.css";
import { initTheme } from "./features/theme/theme.js";

document.documentElement.classList.add("ready");

function initApp() {
  initTheme();

  // Descomente para usar o alternador de tema:
  // import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle.js";
  // document.body.appendChild(ThemeToggle());
}

initApp();
