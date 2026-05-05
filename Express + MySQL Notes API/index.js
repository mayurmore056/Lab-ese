const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

/* 🔌 MySQL Connection */
// crate db in mysql 
/*CREATE DATABASE contactdb;

USE contactdb;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100)
);
*/
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // change if needed
  database: "contactdb",
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
   GET /contacts
========================= */
app.get("/contacts", (req, res) => {
  const sql = "SELECT * FROM contacts";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

/* =========================
   POST /contacts
========================= */
app.post("/contacts", (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({
      message: "Name, phone, and email required",
    });
  }

  const sql = "INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)";

  db.query(sql, [name, phone, email], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Contact added successfully",
      contactId: result.insertId,
    });
  });
});

/* =========================
   DELETE /contacts/:id
========================= */
app.delete("/contacts/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM contacts WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.json({
      message: "Contact deleted successfully",
    });
  });
});

/* 🚀 Start server */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
