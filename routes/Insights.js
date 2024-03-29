const express = require('express')
const router = express.Router()
const Expense = require('../models/expense.js')

router.get('/', async (req, res) => {
  const userExpense = await Expense.findOne({ user: req.user.id }).populate('user');
  const expenses = userExpense.expense;
  let selectedYear = req.query.year ? parseInt(req.query.year) : 2023;
  monthlyExpenses = new Array(12).fill(0);
  for (const expense of expenses) {
    const expenseYear = expense.date.getFullYear();
    if (expenseYear === selectedYear) {
      var expenseMonth = expense.date.getMonth();
      monthlyExpenses[expenseMonth] += expense.Amount;
    }
  }
  var selectedMonth = req.query.month? req.query.month : "2023-06"; 

  var categoryTotals = {};

  for (const expense of expenses) {
    var expenseMonth = expense.date.toISOString().substr(0, 7); // Get the month in "YYYY-MM" format

    if (expenseMonth !== selectedMonth) {
      continue;
    }

    var category = expense.category;
    var amount = expense.Amount;

    if (category in categoryTotals) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  }
  console.log(categoryTotals,monthlyExpenses);
res.render('insights', { user: req.user.username, monthly: monthlyExpenses, year: selectedYear,categoryTotals,selectedMonth});
});

router.post('/month', async (req, res) => {
  let selectedYear = req.body.year ? parseInt(req.body.year) : 2023;
  res.redirect("/" + req.user.username + "/insights?year=" + selectedYear);
});

router.post('/piechart', async (req, res) => {
  let selectedMonth = req.body.month ? req.body.month : "2023-06";
  console.log(selectedMonth);
  res.redirect(`/${req.user.username}/insights?month=${selectedMonth}`);
});


module.exports = router
