// Dashboard.jsx
// Shows 4 simple summary cards based on the current list of expenses.

function Dashboard({ expenses }) {
  // Total of all expenses
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  // Number of transactions
  const count = expenses.length;

  // Highest single expense
  const highest =
    expenses.length > 0
      ? Math.max(...expenses.map((exp) => Number(exp.amount)))
      : 0;

  // Expenses for the current month (based on today's date)
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`; // "YYYY-MM"

  const currentMonthTotal = expenses
    .filter((exp) => exp.date.slice(0, 7) === currentMonth)
    .reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <section className="dashboard">
      <div className="card">
        <h3>Total Expenses</h3>
        <p className="card-value">₹{total.toFixed(2)}</p>
      </div>

      <div className="card">
        <h3>Transactions</h3>
        <p className="card-value">{count}</p>
      </div>

      <div className="card">
        <h3>Highest Expense</h3>
        <p className="card-value">₹{highest.toFixed(2)}</p>
      </div>

      <div className="card">
        <h3>This Month</h3>
        <p className="card-value">₹{currentMonthTotal.toFixed(2)}</p>
      </div>
    </section>
  );
}

export default Dashboard;
