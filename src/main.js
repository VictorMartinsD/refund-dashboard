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

const amount = document.getElementById("amount");

amount.oninput = () => {
  const value = Number(amount.value.replace(/\D/g, "")) / 100;

  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}
