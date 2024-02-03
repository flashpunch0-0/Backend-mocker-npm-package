// const express = require("express");
// const router = express.Router();
// const { Client } = require("pg");

// // Create a function to handle book routes without the Book model parameter
// const bookRoutes = (client) => {
//   // Create
//   router.post("/new", async (req, res) => {
//     try {
//       const { body } = req;
//       const columnNames = Object.keys(body).join(", ");
//       const columnValues = Object.values(body)
//         .map((value) => `'${value}'`)
//         .join(", ");

//       // Insert data into the PostgreSQL database
//       const query = {
//         text: `INSERT INTO public.students (${columnNames}) VALUES (${columnValues}) RETURNING *`,
//       };
//       const result = await client.query(query);

//       res.status(201).send(result.rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ error: error.message || "Bad Request" });
//     }
//   });

//   // Read
//   router.get("/get", async (req, res) => {
//     try {
//       const query = {
//         text: "SELECT * FROM public.students",
//       };
//       const result = await client.query(query);

//       res.status(200).send(result.rows);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Internal Server Error" });
//     }
//   });

//   // Update
//   router.patch("/update/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { body } = req;

//       let updateValues = "";
//       for (const key in body) {
//         updateValues += `${key} = '${body[key]}', `;
//       }
//       updateValues = updateValues.slice(0, -2);

//       const query = {
//         text: `UPDATE public.students SET ${updateValues} WHERE id = ${id} RETURNING *`,
//       };
//       const result = await client.query(query);

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "Book not found" });
//       }

//       res.status(200).send(result.rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(400).send(error);
//     }
//   });

//   // Delete
//   router.delete("/delete/:id", async (req, res) => {
//     try {
//       const { _id } = req.params;

//       const query = {
//         text: `DELETE FROM public.students WHERE id = ${_id} RETURNING *`,
//       };
//       const result = await client.query(query);

//       if (result.rows.length === 0) {
//         return res.status(404).json({ error: "Book not found" });
//       }

//       res.status(200).send(result.rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send(error);
//     }
//   });

//   return router;
// };

// module.exports = bookRoutes;

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
