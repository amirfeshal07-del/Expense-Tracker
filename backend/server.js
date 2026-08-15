// server.js
// A very simple Express backend for the Expense Tracker project.
// NOTE: This backend does NOT store any expenses.
// All expense data is saved in the browser's localStorage on the frontend.
// This server only exists to demonstrate basic Node.js + Express knowledge.

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Allow the React frontend (running on a different port) to talk to this server
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Expense Tracker API is running." });
});

// A simple extra route just to show a second endpoint exists.
// It returns the list of allowed expense categories.
app.get("/api/categories", (req, res) => {
  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Education",
    "Entertainment",
    "Other",
  ];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Expense Tracker backend running at http://localhost:${PORT}`);
});
