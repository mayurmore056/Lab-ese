const express = require("express");
const app = express();

app.use(express.json());

// 📚 In-memory data
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho" },
];

let nextId = 4;

// ✅ GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// ✅ GET single book
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// ✅ POST add book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author required" });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added",
    book: newBook,
  });
});

// ✅ PUT update book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json({
    message: "Book updated",
    book,
  });
});

// ✅ DELETE book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deleted = books.splice(index, 1);

  res.json({
    message: "Book deleted",
    book: deleted[0],
  });
});

// 🚀 Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
