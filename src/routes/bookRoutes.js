const express = require("express");
const router = express.Router();
const Counter = require("../models/counter");

// Create a function to handle book routes with a parameter for the Book model
const bookRoutes = (Book) => {
  // Create
  router.post("/new", async (req, res) => {
    try {
      // Auto-increment ID
      const counter = await Counter.findOneAndUpdate(
        { _id: "bookId" },
        { $inc: { sequence_value: 1 } },
        { new: true }
      );
      const nextBookId = counter.sequence_value;
      const nextBookIdString = nextBookId.toString();
      // Create a new Book instance
      //   const book = new Book({ _id: nextBookIdString, ...req.body });
      const book = new Book({ _id: nextBookId, ...req.body });
      await book.save();

      res.status(201).send(book);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message || "Bad Request" });
    }
  });

  // Read
  router.get("/get", async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).send(books);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  // Update
  router.patch("/update/:id", async (req, res) => {
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
  router.delete("/delete/:id", async (req, res) => {
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

  return router;
};

module.exports = bookRoutes;
