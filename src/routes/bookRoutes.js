// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
// const Book = require("../models/book");
const Book = require("../models/book");
const Counter = require("../models/counter");

// Create
router.post("/books/new", async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    // autoincrement id in mongodb
    const counter = await Counter.findOneAndUpdate(
      { _id: "bookId" },
      { $inc: { sequence_value: 1 } },
      { new: true }
    );
    const nextBookId = counter.sequence_value;
    //
    const { title, author, publishedDate } = req.body;
    const formattedDate = new Date(publishedDate).toISOString().split("T")[0];
    // console.log("Request Body:", req);
    // const book = new Book(req.body);
    const book = new Book({
      _id: nextBookId, // Use the auto-incremented ID
      title,
      author,
      publishedDate,
    });
    await book.save();
    // res.status(201).send(book);
    // const responseBook = book.toObject();
    // delete responseBook._id;

    res.status(201).send(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || "Bad Request" });
  }
});

// get books
// Read
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Update
router.patch("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete
router.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
