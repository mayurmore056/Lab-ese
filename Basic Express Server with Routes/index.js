const express = require("express");
const app = express();

app.use(express.json());

// Hardcoded users
let users = [
  { id: 1, name: "Rahul", email: "rahul@test.com" },
  { id: 2, name: "Amit", email: "amit@test.com" },
  { id: 3, name: "Sneha", email: "sneha@test.com" },
];

// ✅ GET /
app.get("/", (req, res) => {
  res.send("Welcome to Express Server 🚀");
});

// ✅ GET /about
app.get("/about", (req, res) => {
  res.json({
    appName: "User API",
    version: "1.0.0",
  });
});

// ✅ GET /users/:id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// ✅ POST /users
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
