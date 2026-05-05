import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Any");

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://v2.jokeapi.dev/joke/${category}?type=single`,
      );
      const data = await res.json();
      setJoke(data.joke);
    } catch (err) {
      setJoke("Failed to fetch joke.");
    }
    setLoading(false);
  };

  // Load initial joke
  useEffect(() => {
    fetchJoke();
  }, [category]);

  return (
    <div className="container">
      <h2>Random Joke Generator 😂</h2>

      {/* Category Dropdown */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Any">Any</option>
        <option value="Programming">Programming</option>
        <option value="Misc">Misc</option>
        <option value="Pun">Pun</option>
      </select>

      {/* Joke Card */}
      <div className="card">{loading ? <p>Loading...</p> : <p>{joke}</p>}</div>

      <button onClick={fetchJoke}>New Joke</button>
    </div>
  );
}

export default App;
