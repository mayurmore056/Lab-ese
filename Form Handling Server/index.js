const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// GET → serve form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

// POST → handle form
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  let errors = [];

  // Validation
  if (!name || !email || !message) {
    errors.push("All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  // If errors exist
  if (errors.length > 0) {
    return res.json({
      success: false,
      errors,
    });
  }

  // Success
  res.json({
    success: true,
    data: { name, email, message },
  });
});

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
