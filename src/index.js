const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/mockapi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
// Log requests to the console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(bookRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
