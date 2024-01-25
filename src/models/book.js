// models/book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    publishedDate: Date,
  },
  {
    versionKey: false, // Disable the __v field
    // toJSON: { virtuals: true, getters: true, setters: true },
    // id: false, // Exclude the _id field
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
