const express = require("express");
const router = express.Router();

// Create a function to handle book routes with the Sequelize model
const bookRoutes2 = (Book) => {
  // Create
  router.post("/new", async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).send(book);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message || "Bad Request" });
    }
  });

  // Read
  router.get("/get", async (req, res) => {
    try {
      const books = await Book.findAll();
      res.status(200).send(books);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  // Update
  router.patch("/update/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [numOfAffectedRows, updatedBook] = await Book.update(req.body, {
        where: { id },
        returning: true,
      });
      if (numOfAffectedRows === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).send(updatedBook[0]);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });

  // Delete
  router.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const numOfDeletedRows = await Book.destroy({ where: { id } });
      if (numOfDeletedRows === 0) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = bookRoutes2;
