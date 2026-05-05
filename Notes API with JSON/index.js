const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "notes.json";

/* 🔹 Helper: read notes */
const getNotes = () => {
  const data = fs.readFileSync(FILE, "utf8");
  return JSON.parse(data);
};

/* 🔹 Helper: write notes */
const saveNotes = (notes) => {
  fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
};

/* ✅ GET all notes */
app.get("/notes", (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

/* ✅ GET note by id */
app.get("/notes/:id", (req, res) => {
  const notes = getNotes();
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
});

/* ✅ POST create note */
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content required",
    });
  }

  const notes = getNotes();

  const newNote = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  saveNotes(notes);

  res.status(201).json({
    message: "Note created",
    note: newNote,
  });
});

/* ✅ DELETE note */
app.delete("/notes/:id", (req, res) => {
  const notes = getNotes();

  const filtered = notes.filter((n) => n.id !== parseInt(req.params.id));

  if (notes.length === filtered.length) {
    return res.status(404).json({ message: "Note not found" });
  }

  saveNotes(filtered);

  res.json({ message: "Note deleted" });
});

/* 🚀 Server */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
