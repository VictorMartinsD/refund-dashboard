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

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");

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

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const svgNS = "http://www.w3.org/2000/svg";

    const expenseIcon = document.createElementNS(svgNS, "svg");
    expenseIcon.classList.add("expense-icon");
    expenseIcon.setAttribute("role", "img");
    expenseIcon.setAttribute("aria-label", newExpense.category_name);

    const useEl = document.createElementNS(svgNS, "use");
    useEl.setAttribute("href", `./src/assets/img/icons.svg#icon-${newExpense.category_id}`);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    expenseInfo.append(expenseName, expenseCategory);
    expenseIcon.appendChild(useEl);
    expenseItem.append(expenseIcon, expenseInfo);
    expenseList.append(expenseItem);
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.error(error);
  }
}
