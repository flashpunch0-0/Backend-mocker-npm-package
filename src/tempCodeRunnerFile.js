const express = require("express");
const bodyParser = require("body-parser");
// const jsonServer = require("json-server");
const faker = require("faker");
const config = require("./config");

const app = express();
const port = config.port;

app.use(bodyParser.json());

if (config.enableCors) {
  // Enable Cross-Origin Resource Sharing (CORS)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
}

app.get("/api/users", (req, res) => {
  const users = Array.from({ length: 5 }, () => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
  }));

  setTimeout(() => {
    res.json({ users });
  }, config.delay);
});

// // Use json-server for additional dynamic routes
// const jsonServerRouter = jsonServer.router("db.json"); // Use a JSON file as a data source
// app.use("/api", jsonServerRouter);

// Start the server
app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});
