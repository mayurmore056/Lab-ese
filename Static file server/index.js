const express = require("express");
const path = require("path");

const app = express();

/* ✅ Middleware: Response Time */
app.use((req, res, next) => {
  const start = Date.now();

  const originalEnd = res.end;

  res.end = function (...args) {
    const duration = Date.now() - start;
    res.setHeader("X-Response-Time", `${duration}ms`);
    originalEnd.apply(this, args);
  };

  next();
});

/* ✅ Serve static files */
app.use(express.static(path.join(__dirname, "public")));

/* ✅ Routes */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

/* 🚀 Server */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
