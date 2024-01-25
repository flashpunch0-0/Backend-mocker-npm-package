// models/book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedDate: Date,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
