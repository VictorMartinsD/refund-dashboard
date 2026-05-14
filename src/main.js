import "./css/index.css";
import { initTheme } from "./features/theme/theme.js";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle.js";

document.documentElement.classList.add("ready");

const SVG_NS = "http://www.w3.org/2000/svg";
const ICONS_SPRITE = "./src/assets/img/icons.svg";
const MAX_AMOUNT_DIGITS = 13;
const EXPENSES_KEY = "template-base-expenses";

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2");
const expensesQuantity = document.querySelector("aside header p span");
let expenses = loadExpenses();

function initApp() {
  initTheme();

  try {
    document.body.appendChild(ThemeToggle());
  } catch (error) {
    console.warn("ThemeToggle failed to mount:", error);
  }
}

initApp();

renderExpenses(expenses);
updateTotals();

amount.oninput = () => {
  const digits = amount.value.replace(/\D/g, "").slice(0, MAX_AMOUNT_DIGITS);
  const value = Number(digits) / 100;

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

  expenses = [...expenses, newExpense];
  saveExpenses();
  expenseAdd(newExpense);
};

function loadExpenses() {
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

function saveExpenses() {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.warn("Could not persist expenses:", error);
  }
}

function renderExpenses(expenseItems) {
  expenseList.innerHTML = "";

  expenseItems.forEach((expenseItem) => {
    expenseList.append(renderExpense(expenseItem));
  });
}

function expenseAdd(newExpense) {
  expenseList.append(renderExpense(newExpense));

  formClear();
  updateTotals();
}

function renderExpense(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");
    expenseItem.dataset.expenseId = newExpense.id;

    const expenseIcon = document.createElementNS(SVG_NS, "svg");
    expenseIcon.classList.add("expense-icon");
    expenseIcon.setAttribute("role", "img");
    expenseIcon.setAttribute("aria-label", newExpense.category_name);

    const useEl = document.createElementNS(SVG_NS, "use");
    useEl.setAttribute("href", `${ICONS_SPRITE}#icon-${newExpense.category_id}`);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    const expenseAmountSymbol = document.createElement("small");
    expenseAmountSymbol.textContent = "R$";
    expenseAmount.append(expenseAmountSymbol, newExpense.amount.toUpperCase().replace("R$", ""));

    const removeIcon = document.createElementNS(SVG_NS, "svg");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("role", "img");
    removeIcon.setAttribute("aria-label", "Remover despesa");

    const removeIconEl = document.createElementNS(SVG_NS, "use");
    removeIconEl.setAttribute("href", `${ICONS_SPRITE}#icon-remove`);

    removeIcon.appendChild(removeIconEl);
    expenseInfo.append(expenseName, expenseCategory);
    expenseIcon.appendChild(useEl);
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    return expenseItem;
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.error(error);

    return document.createElement("li");
  }
}

function updateTotals() {
  try {
    const items = expenseList.children;

    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

    let total = 0;

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");
      value = parseFloat(value);

      if (isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não é um número.");
      }

      total += Number(value);
    }

    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    expensesTotal.innerHTML = "";
    expensesTotal.append(symbolBRL, document.createTextNode(total));
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.error(error);
  }
}

expenseList.addEventListener("click", (event) => {
  const removeIcon = event.target.closest(".remove-icon");

  if (!removeIcon) return;

  const item = removeIcon.closest(".expense");
  if (!item) return;

  expenses = expenses.filter((expenseItem) => String(expenseItem.id) !== item.dataset.expenseId);
  saveExpenses();
  item.remove();
  updateTotals();
});

function formClear() {
  expense.value = "";
  category.value = "";
  amount.value = "";

  expense.focus();
}
