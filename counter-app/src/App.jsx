import { useState } from "react";
import "./App.css";

function App() {
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);

  const total = c1 + c2 + c3;

  return (
    <div className="container">
      <h2>Triple Counter App</h2>

      <Counter title="Counter 1" value={c1} setValue={setC1} />
      <Counter title="Counter 2" value={c2} setValue={setC2} />
      <Counter title="Counter 3" value={c3} setValue={setC3} />

      <h3>Grand Total: {total}</h3>
    </div>
  );
}

/* Reusable Counter Component */
function Counter({ title, value, setValue }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>

      <div className="buttons">
        <button onClick={() => setValue(value + 1)}>+</button>
        <button onClick={() => setValue(value - 1)}>-</button>
        <button onClick={() => setValue(0)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
