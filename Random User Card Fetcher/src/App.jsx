import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api");
      const data = await res.json();
      setUser(data.results[0]);
    } catch (err) {
      console.error("Error fetching user");
    }
    setLoading(false);
  };

  // Load first user
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      <h2>Random User Card</h2>

      {loading && <div className="spinner"></div>}

      {!loading && user && (
        <div className="card">
          <img src={user.picture.large} alt="user" />

          <h3>
            {user.name.first} {user.name.last}
          </h3>

          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>
            Location: {user.location.city}, {user.location.country}
          </p>
        </div>
      )}

      <button onClick={fetchUser}>Fetch New User</button>
    </div>
  );
}

export default App;
