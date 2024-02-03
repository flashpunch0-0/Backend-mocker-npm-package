const express = require("express");
const mongoose = require("mongoose");
const { Client } = require("pg");
const bookRoutes = require("./routes/bookRoutes");
const bookRoutes2 = require("./routes/bookRoutes2");
const Counter = require("./models/counter");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
class backendMocker {
  constructor(
    mongoConnectionString,
    postgresConnectionString,
    customSchema,
    port = 3000
  ) {
    this.app = express();
    this.port = port;

    this.app.use(express.json());
    this.app.use(cors());

    if (mongoConnectionString) {
      // Connect to MongoDB
      mongoose.connect(mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      mongoose.connection.once("open", () => {
        console.log("Connected to MongoDB");
      });

      // Initialize counter for MongoDB
      this.initializeMongoCounter();

      // Use MongoDB-specific book routes
      const Book = customSchema
        ? mongoose.model("Book", customSchema)
        : require("./models/book");
      this.app.use(bookRoutes(Book));
    } else if (postgresConnectionString) {
      // Connect to PostgreSQL
      // this.client = new Client({
      //   connectionString: postgresConnectionString,
      // });
      // this.client.connect();

      this.sequelize = new Sequelize(postgresConnectionString);
      this.Book = this.sequelize.define("Book", customSchema);
      // Sync models with database
      this.sequelize.sync();

      this.app.use(bookRoutes2(this.Book));

      // Use PostgreSQL-specific book routes
      // this.app.use(bookRoutes2(this.client));
    } else {
      throw new Error("No valid database connection string provided");
    }

    // Log requests to the console
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
  }

  async initializeMongoCounter() {
    const counter = await Counter.findOne({ _id: "bookId" });
    if (!counter) {
      await Counter.create({ _id: "bookId", sequence_value: 0 });
    }
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = backendMocker;
