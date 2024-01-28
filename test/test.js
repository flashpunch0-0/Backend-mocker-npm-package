// /test.js file to run the package

const BackendMocker = require("backend-mocker-npm-package");
const mongoConnectionString = "mongodb://localhost:27017/mydatabase";
const backendMocker = new BackendMocker(mongoConnectionString);
backendMocker.startServer();
