const incomeDisplay = document.querySelector('#incomeDisplay');
const expensesDisplay = document.querySelector('#expensesDisplay');

const budgetSign = document.querySelector('#budgetSign');
const currentBudget = document.querySelector('#currentBudget');
const incomes = document.querySelector('#income');
const expenses = document.querySelector('#expenses');
const percent = document.querySelector('#percent');

const budgetForm = document.querySelector('#budgetForm')
const signInput = budgetForm['sign'];
const descInput = budgetForm['desc'];
const budgetInput = budgetForm['budget'];

const budgetsIncome = JSON.parse(localStorage.getItem('listOfIncomes')) || [];
const budgetsExpense = JSON.parse(localStorage.getItem('listOfExpenses')) || [];


const addBudget = (sign, desc, budget) => {
  if (sign === "+") {
    budgetsIncome.push({
      sign,
      desc,
      budget
    });
    localStorage.setItem('listOfIncomes', JSON.stringify(budgetsIncome));
    location.reload();
  }
  else {
    budgetsExpense.push({
      sign,
      desc,
      budget
    });
    localStorage.setItem('listOfExpenses', JSON.stringify(budgetsExpense));
    location.reload();
  }
  return { sign, desc, budget }
};


const createBudgetElement = ({ sign, desc, budget }) => {
  //create elements
  const newTr = document.createElement('tr');
  const newTd1 = document.createElement('td');
  const newTd2 = document.createElement('td');

  //fill the content
  newTd1.innerText = desc;
  newTd2.innerText = sign + budget;

  //add to the DOM
  newTr.append(newTd1, newTd2);
  if (sign === '+') {
    incomeDisplay.appendChild(newTr);
  }
  else {
    expensesDisplay.appendChild(newTr);
  }
}

// Displaying incomes and expenses
let sumOfIncomes = 0;
let sumOfExpenses = 0;

incomes.innerText = sumOfIncomes > '0' ? `+${sumOfIncomes}` : sumOfIncomes;
expenses.innerText = sumOfExpenses > '0' ? `+${sumOfExpenses}` : sumOfExpenses;

budgetsIncome.forEach((element) => {
  sumOfIncomes += parseInt(element.budget);
  incomes.innerText = `+${sumOfIncomes}`;
  return sumOfIncomes;
});

budgetsExpense.forEach((element) => {
  sumOfExpenses += parseInt(element.budget);
  expenses.innerText = `-${sumOfExpenses}` || sumOfExpenses;
  return sumOfExpenses;
});

// calculate the percentage of expenses
if (incomes.innerText !== '0') {
  if (expenses.innerText !== '0') {
    percent.innerText = ((100 * sumOfExpenses) / sumOfIncomes).toFixed(0) + '%';
  }
  else {
    percent.innerText = '0%';
  }
}
else {
  if (expenses.innerText !== '0') {
    percent.innerText = 100 - (parseInt(expenses.innerText)) + '%';
  }
}

budgetSign.innerText = sumOfIncomes > sumOfExpenses ? '+' : '';
currentBudget.innerText = incomes.innerText ? `${sumOfIncomes - sumOfExpenses}` : '0';

budgetsIncome.forEach(createBudgetElement);
budgetsExpense.forEach(createBudgetElement);


budgetForm.onsubmit = (e) => {
  e.preventDefault();
  const newBudget = addBudget(
    signInput.value,
    descInput.value,
    budgetInput.value
  )
  createBudgetElement(newBudget);
  signInput.value = '+';
  descInput.value = '';
  budgetInput.value = '';
}