//

const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const Counter = require("./models/counter");

class backendMocker {
  constructor(mongoConnectionString, customSchema, port = 3000) {
    this.app = express();
    this.port = port;

    // Use express.json() instead of bodyParser.json()
    this.app.use(express.json());

    // Connect to MongoDB with the provided connection string
    mongoose.connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB");
    });

    // Initialize counter
    this.initializeCounter();

    // Log requests to the console
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
    const Book = customSchema
      ? mongoose.model("Book", customSchema)
      : require("./models/book");
    // Use bookRoutes
    this.app.use(bookRoutes(Book));
  }

  initializeCounter() {
    Counter.findOne({ _id: "bookId" }).then((counter) => {
      if (!counter) {
        return Counter.create({ _id: "bookId", sequence_value: 0 });
      }
    });
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = backendMocker;
