const express = require("express");
const app = express();

app.use(express.json());

/* ✅ 1. LOGGER MIDDLEWARE */
const logger = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`${req.method} ${req.url} - ${time}`);
  next(); // important
};

app.use(logger); // apply globally

/* ✅ 2. AUTH MIDDLEWARE */
const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  if (token !== "12345") {
    return res.status(403).json({ message: "Invalid token." });
  }

  next();
};

/* 🌐 PUBLIC ROUTE */
app.get("/", (req, res) => {
  res.send("Public Route");
});

/* 🔒 PROTECTED ROUTE */
app.get("/dashboard", auth, (req, res) => {
  res.send("Welcome to Dashboard 🔐");
});

/* 🚀 SERVER */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
