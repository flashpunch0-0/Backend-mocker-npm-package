// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
// const Book = require("../models/book");
const Book = require("../models/book");

// Create
router.post("/books", async (req, res) => {
  try {
    const book = new Model(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
