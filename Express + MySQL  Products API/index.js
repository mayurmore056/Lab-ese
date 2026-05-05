const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

/* 🔌 MySQL Connection */

// create database in the mysql 
//CREATE DATABASE notesdb;

// USE notesdb;

// CREATE TABLE notes (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   title VARCHAR(255),
//   content TEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // change if needed
  database: "notesdb",
});

/* Connect DB */
db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL ✅");
});

/* =========================
   GET /notes
========================= */
app.get("/notes", (req, res) => {
  const sql = "SELECT * FROM notes ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

/* =========================
   POST /notes
========================= */
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content required",
    });
  }

  const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";

  db.query(sql, [title, content], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Note added successfully",
      noteId: result.insertId,
    });
  });
});

/* 🚀 Start server */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
