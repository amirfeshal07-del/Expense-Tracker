import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FilterBar from "./components/FilterBar";

// The key we use to store expenses in localStorage
const STORAGE_KEY = "expenses";

function App() {
  // All expenses are stored in this array
  const [expenses, setExpenses] = useState([]);

  // If we are editing an expense, we keep it here.
  // If it's null, that means we are adding a NEW expense.
  const [editingExpense, setEditingExpense] = useState(null);

  // Filter values
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  // ---- Load expenses from localStorage when the app first opens ----
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setExpenses(JSON.parse(savedData));
    }
  }, []);

  // ---- Every time "expenses" changes, save it to localStorage ----
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  // ---- CREATE: add a new expense ----
  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(), // simple unique id using the current timestamp
      ...expenseData,
    };
    setExpenses([newExpense, ...expenses]);
  };

  // ---- UPDATE: save changes to an existing expense ----
  const updateExpense = (updatedExpense) => {
    const updatedList = expenses.map((exp) =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    setExpenses(updatedList);
    setEditingExpense(null); // exit edit mode
  };

  // ---- DELETE: remove an expense by id ----
  const deleteExpense = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (confirmDelete) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  // Called when the user clicks "Edit" on an expense
  const startEdit = (expense) => {
    setEditingExpense(expense);
  };

  // Called when the user cancels editing
  const cancelEdit = () => {
    setEditingExpense(null);
  };

  // ---- FILTERING LOGIC ----
  // We calculate the filtered list every render based on the filter values.
  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory =
      categoryFilter === "All" || exp.category === categoryFilter;

    const matchesMonth =
      monthFilter === "All" || exp.date.slice(0, 7) === monthFilter; // "YYYY-MM"

    const matchesSearch = exp.description
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesMonth && matchesSearch;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>💰 Expense Tracker</h1>
        <p>Track your daily expenses simply and clearly</p>
      </header>

      <main className="container">
        <Dashboard expenses={expenses} />

        <ExpenseForm
          addExpense={addExpense}
          updateExpense={updateExpense}
          editingExpense={editingExpense}
          cancelEdit={cancelEdit}
        />

        <FilterBar
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          monthFilter={monthFilter}
          setMonthFilter={setMonthFilter}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onEdit={startEdit}
        />
      </main>
    </div>
  );
}

export default App;
