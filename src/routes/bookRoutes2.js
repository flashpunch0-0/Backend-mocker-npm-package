const express = require("express");
const router = express.Router();

// Create a function to handle book routes with the Sequelize model
const bookRoutes2 = (Book) => {
  // Create
  router.post("/new", async (req, res) => {
    try {
      const newdata = await Book.create(req.body);
      res.status(201).send(newdata);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message || "Bad Request" });
    }
  });

  // Read
  router.get("/get", async (req, res) => {
    try {
      const rows = await Book.findAll();
      res.status(200).send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  router.get("/get/:id", async (req, res) => {
    try {
      const row = await Book.findByPk(req.params.id);
      res.status(200).send(row);
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
        return res.status(404).json({ error: "data to update not found" });
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
        return res.status(404).json({ error: "data to delete not found" });
      }
      res.status(200).json({ message: "data  deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

  return router;
};

module.exports = bookRoutes2;
