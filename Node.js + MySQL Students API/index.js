const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// 🔌 MySQL Connection

// create db in mysql
// CREATE DATABASE school;

// USE school;

// CREATE TABLE students (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100),
//   email VARCHAR(100)
// );
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // change if needed
  database: "school",
});

// Connect DB
db.connect((err) => {
  if (err) {
    console.log("DB Connection failed:", err);
    return;
  }
  console.log("Connected to MySQL ✅");
});

// =======================
// GET all students
// =======================
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});

// =======================
// POST student
// =======================
app.post("/students", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO students (name, email) VALUES (?, ?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Student added",
      id: result.insertId,
    });
  });
});

// =======================
// UPDATE email
// =======================
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const { email } = req.body;

  const sql = "UPDATE students SET email = ? WHERE id = ?";

  db.query(sql, [email, id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Email updated" });
  });
});

// =======================
// DELETE student
// =======================
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted" });
  });
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
