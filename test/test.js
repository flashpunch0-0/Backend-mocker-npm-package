const BackendMocker = require("C://RepositoryProjects/backend-mocker/Backend-mocker-npm-package");
const mongoose = require("mongoose");
const { DataTypes } = require("sequelize");
const tableName = "laudehogaya";
const customSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    name: String,
    RollNo: String,
    Age: String,
    Course: String,
    Date: Date,
    PhoneNo: Number,
  },
  {
    versionKey: false, //disablethe __v field
  }
);

//  below to implement postgressql
const custoSchema = {
  name: DataTypes.STRING,
  RollNo: DataTypes.STRING,
  Age: DataTypes.STRING,
  Course: DataTypes.STRING,
  Date: DataTypes.DATE,
  PhoneNo: DataTypes.STRING,
};

const customPort = 4000;
const mongoConnectionString = "mongodb://localhost:27017/annu";
const postgresConnectionString =
  "postgresql://postgres:Postgressql@71@localhost:5432/backend-mocker-npm";
// const backend = new BackendMocker("mongodb://localhost:27017/fuck");
const back = new BackendMocker(
  // mongoConnectionString,
  null,
  postgresConnectionString,
  custoSchema,
  tableName,
  customPort
);
back.startServer();
