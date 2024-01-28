//

const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const Counter = require("./models/counter");

class backendMocker {
  constructor(mongoConnectionString) {
    this.app = express();
    this.port = 3000;

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
    this.app.use(express.json());
    // Use bookRoutes
    this.app.use(bookRoutes);
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

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const bookRoutes = require("./routes/bookRoutes");
// const Counter = require("./models/counter");

// class backendMocker {
//   constructor(mongoConnectionString, customSchema) {
//     this.app = express();
//     this.port = 3000;

//     // Use express.json() instead of bodyParser.json()
//     this.app.use(express.json());

//     // Connect to MongoDB with the provided connection string
//     mongoose.connect(mongoConnectionString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     mongoose.connection.once("open", () => {
//       console.log("Connected to MongoDB");
//     });

//     // Initialize counter
//     this.initializeCounter(customSchema);

//     // Log requests to the console
//     this.app.use((req, res, next) => {
//       console.log(`${req.method} ${req.url}`);
//       next();
//     });
//     // this.app.use(express.json());
//     this.app.use(express.raw({ type: "application/json" }));

//     // Use bookRoutes
//     this.app.use(bookRoutes);
//   }

//   initializeCounter(customSchema) {
//     Counter.findOne({ _id: "bookId" }).then((counter) => {
//       if (!counter) {
//         const bookSchema = new mongoose.Schema(customSchema, {
//           versionKey: false, // Disable the __v field
//           // toJSON: { virtuals: true, getters: true, setters: true },
//           // id: false, // Exclude the _id field
//         });

//         this.Book = mongoose.model("Book", bookSchema);
//         // Counter.create({ _id: "bookId", sequence_value: 0 });
//         // = mongoose.model("Book", bookSchema);
//         Counter.create({ _id: "bookId", sequence_value: 1 });
//       }
//     });
//   }

//   startServer() {
//     this.app.listen(this.port, () => {
//       console.log(`Server is running on port ${this.port}`);
//     });
//   }
// }

// module.exports = backendMocker;
// // module.exports = Book;
