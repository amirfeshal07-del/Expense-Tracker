// ExpenseList.jsx
// Displays the expenses in a table. Each row has Edit and Delete buttons.

function ExpenseList({ expenses, onDelete, onEdit }) {
  if (expenses.length === 0) {
    return (
      <section className="list-card">
        <h2>Expenses</h2>
        <p className="empty-text">No expenses found. Try adding one above.</p>
      </section>
    );
  }

  return (
    <section className="list-card">
      <h2>Expenses ({expenses.length})</h2>

      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td data-label="Description">{exp.description}</td>
                <td data-label="Category">
                  <span className="category-badge">{exp.category}</span>
                </td>
                <td data-label="Amount">₹{Number(exp.amount).toFixed(2)}</td>
                <td data-label="Date">{exp.date}</td>
                <td data-label="Actions">
                  <button className="btn-edit" onClick={() => onEdit(exp)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => onDelete(exp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpenseList;
