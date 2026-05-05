import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch users list
  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Fetch selected user details
  const fetchUserDetails = (username) => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setSelectedUser(username);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>GitHub User Directory</h2>

      <div className="grid">
        {users.map((user) => (
          <div
            key={user.id}
            className="card"
            onClick={() => fetchUserDetails(user.login)}
          >
            <img src={user.avatar_url} alt="avatar" />
            <p>{user.login}</p>
          </div>
        ))}
      </div>

      {/* Details Panel */}
      {loading && <h3>Loading...</h3>}

      {details && !loading && (
        <div className="details">
          <img src={details.avatar_url} alt="avatar" />
          <h3>{details.name || details.login}</h3>
          <p>{details.bio}</p>

          <p>
            <b>Followers:</b> {details.followers}
          </p>
          <p>
            <b>Following:</b> {details.following}
          </p>
          <p>
            <b>Repos:</b> {details.public_repos}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
