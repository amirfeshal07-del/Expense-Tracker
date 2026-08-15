import { useState, useEffect } from "react";

// The list of categories the user can pick from
const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Education",
  "Entertainment",
  "Other",
];

function ExpenseForm({ addExpense, updateExpense, editingExpense, cancelEdit }) {
  // Form field state
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Simple error message shown if validation fails
  const [error, setError] = useState("");

  // When "editingExpense" changes (user clicked Edit), fill the form with its data.
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDescription(editingExpense.description);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const resetForm = () => {
    setAmount("");
    setCategory("Food");
    setDescription("");
    setDate("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ---- Simple validation ----
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }
    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }
    if (!date) {
      setError("Please select a date.");
      return;
    }

    setError("");

    const expenseData = {
      amount: Number(amount),
      category,
      description: description.trim(),
      date,
    };

    if (editingExpense) {
      // We are updating an existing expense, so keep its original id
      updateExpense({ id: editingExpense.id, ...expenseData });
    } else {
      // We are adding a brand new expense
      addExpense(expenseData);
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    cancelEdit();
  };

  return (
    <section className="form-card">
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <label>Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 250"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-row">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Lunch with friends"
          />
        </div>

        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>

          {editingExpense && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default ExpenseForm;
