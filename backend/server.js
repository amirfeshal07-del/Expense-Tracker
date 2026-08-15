// server.js
// Express backend for the Expense Tracker project.
// Expenses are now stored in a JSON file (data/expenses.json) instead of the browser.

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Path to our "database" file
const DATA_FILE = path.join(__dirname, "data", "expenses.json");

app.use(cors());
app.use(express.json()); // lets us read JSON from the request body

// ---------- Helper functions to read/write the JSON file ----------

// Reads all expenses from the JSON file and returns them as an array
function readExpenses() {
  const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(fileContent);
}

// Writes the given array of expenses back into the JSON file
function writeExpenses(expenses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// ---------- Routes ----------

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running." });
});

// GET all expenses
app.get("/api/expenses", (req, res) => {
  const expenses = readExpenses();
  res.json(expenses);
});

// POST a new expense
app.post("/api/expenses", (req, res) => {
  const expenses = readExpenses();

  const newExpense = {
    id: Date.now(), // simple unique id
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    date: req.body.date,
  };

  expenses.unshift(newExpense); // add to the beginning of the list
  writeExpenses(expenses);

  res.status(201).json(newExpense);
});

// PUT (update) an existing expense by id
app.put("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const id = Number(req.params.id);

  const index = expenses.findIndex((exp) => exp.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Expense not found." });
  }

  // Update the expense, but keep its original id
  expenses[index] = {
    id,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    date: req.body.date,
  };

  writeExpenses(expenses);
  res.json(expenses[index]);
});

// DELETE an expense by id
app.delete("/api/expenses/:id", (req, res) => {
  const expenses = readExpenses();
  const id = Number(req.params.id);

  const updatedExpenses = expenses.filter((exp) => exp.id !== id);

  if (updatedExpenses.length === expenses.length) {
    return res.status(404).json({ message: "Expense not found." });
  }

  writeExpenses(updatedExpenses);
  res.json({ message: "Expense deleted." });
});

app.listen(PORT, () => {
  console.log(`Expense Tracker backend running at http://localhost:${PORT}`);
});
