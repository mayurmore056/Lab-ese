const express = require("express");
const app = express();

/* =========================
   GET /
========================= */
app.get("/", (req, res) => {
  res.send("Hello World");
});

/* =========================
   GET /status
========================= */
app.get("/status", (req, res) => {
  res.json({
    status: "running",
    time: new Date().toISOString(),
  });
});

/* =========================
   GET /info
========================= */
app.get("/info", (req, res) => {
  res.json({
    name: "Your Name Here",
    prn: "YOUR_PRN_HERE",
  });
});

/* =========================
   SERVER START
========================= */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
