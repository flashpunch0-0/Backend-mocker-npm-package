const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("../config");

const app = express();
const port = config.port;

app.use(bodyParser.json());

if (config.enableCors) {
  // Enable Cross-Origin Resource Sharing (CORS)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
}

// MongoDB connection
mongoose.connect(config.mongoDBConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a User model
const UserModel = mongoose.model("User", userSchema);

// Simulate dynamic data for users
const generateRandomUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
});

const generateRandomUsers = (count) =>
  Array.from({ length: count }, generateRandomUser);

// CRUD API for users
app.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});
