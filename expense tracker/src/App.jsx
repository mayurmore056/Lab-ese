import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses"));
    if (saved) setExpenses(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!text || !amount) return;

    const newExpense = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);
    setText("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <h3>Total: ₹{total.toFixed(2)}</h3>

      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addExpense}>Add</button>
      </div>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            <span>
              {exp.text} - ₹{exp.amount}
            </span>
            <button onClick={() => deleteExpense(exp.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
