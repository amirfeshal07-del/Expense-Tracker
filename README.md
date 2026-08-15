# 💰 Expense Tracker

A simple, beginner-friendly Expense Tracker web app built as a college mini project. Add, edit, delete, and filter your daily expenses — all data is saved locally in your browser, no database required.

## 📋 Features

- **Dashboard** — see your total expenses, number of transactions, highest expense, and this month's spending at a glance
- **Add Expense** — record amount, category, description, and date
- **Edit Expense** — update any expense using the same form
- **Delete Expense** — remove an expense with a confirmation prompt
- **Filters** — filter by category, by month, or search by description (with a "Clear Filters" option)
- **Persistent Storage** — expenses are saved in the browser's `localStorage`, so they remain after a page refresh
- **Responsive Design** — works on desktop, tablet, and mobile

## 🛠️ Technologies Used

**Frontend:**
- React.js (with Vite)
- HTML5 & CSS3
- JavaScript (ES6+)
- Browser `localStorage`

**Backend:**
- Node.js
- Express.js
- CORS

> Note: The backend does **not** store expense data. It only serves a simple API (`GET /` and `GET /api/categories`) to demonstrate basic backend setup. All expense data lives in the browser.

## 📁 Folder Structure

```
expense-tracker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── FilterBar.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Installation & Running

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd expense-tracker
```

### 2. Run the backend
```bash
cd backend
npm install
node server.js
```
The backend runs at **http://localhost:5000**

### 3. Run the frontend
Open a **new terminal window**:
```bash
cd frontend
npm install
npm run dev
```
The frontend runs at **http://localhost:5173**

Open `http://localhost:5173` in your browser to use the app.

## 💾 How localStorage Works

Whenever you add, edit, or delete an expense, the entire updated list of expenses is saved to the browser using:

```js
localStorage.setItem("expenses", JSON.stringify(expenses));
```

When the app loads, it reads back the saved data using:

```js
localStorage.getItem("expenses");
```

This means your data stays in your browser even after closing the tab or refreshing the page. It is **not** sent to any server or database — it's fully client-side.

## 📸 Screenshots

*(Add screenshots of your dashboard, add-expense form, and expense list here once the app is running.)*

## 🔮 Future Improvements

- Add charts/graphs to visualize spending by category
- Export expenses to CSV or PDF
- Add multi-currency support
- Add dark mode
- Move data storage to a real database with user accounts

## 📄 License

This project is for educational purposes.
