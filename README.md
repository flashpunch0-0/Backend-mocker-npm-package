---

# Welcome to Backend Mocker NPM Package 🚀
Package link NPM - https://www.npmjs.com/package/backend-mocker-npm-package

![Backend Mocker](https://i.imgur.com/wHluThx.png)

Hey there, fellow developer! Are you tired of spending hours setting up your backend infrastructure every time you start a new project? Say hello to **Backend Mocker** - your ultimate companion for rapid backend development!

## 🌟 Additional Features in Version 2.0:
- **Support for PostgreSQL**: Now you can choose between MongoDB and PostgreSQL for your backend database.
- **Dynamic Table Name**: Define your own table name for PostgreSQL schemas, giving you more flexibility in database management.
- **Custom Port**: Set a custom port to run your backend server on, providing greater control over your development environment.
- **Improved Error Handling**: Enhanced error messages to guide you through troubleshooting and debugging, ensuring a smoother development experience.

## 🌟 Features :
- **Easy Setup**: Get your CRUD API up and running in the blink of an eye.
- **Customizable Schema**: Shape your data just the way you want it. No more rigid structures!
- **Automatic ID Generation**: Sit back and relax while we handle the IDs for you.
- **Robust Error Handling**: Friendly error messages to guide you through the dark tunnels of debugging.
- **Built-in Counters**: Counting made simple. Manage your data effortlessly.
- **Custom Port**: Create a custom port to run the backend on. If not specified, the port will be automatically set to 3000.

## Installation Made Easy 🛠️

```bash
npm install backend-mocker-npm-package
```

## Quick Setup in Seconds ⏱️

After downloading the package, create a .js file:

\*- **If using MongoDB:**
```javascript
// Code snippet for MongoDB setup
const BackendMocker = require("backend-mocker-npm-package");

// before pasting below line  install mongoose from your terminal(in project directory) by typing  npm install mongoose
const mongoose = require("mongoose");
const tableName = "name-it-as-you-want";

// Below is schema designed for mongodb

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

// set a custom port , optional
const customPort = 4000;

const mongoConnectionString = "your-mongo-db-string";

const back = new BackendMocker(
  mongoConnectionString,
  null,
  customSchema,
  tableName,
  customPort
);
back.startServer();


```

\*- **If using PostgreSQL:**
```javascript
// Code snippet for PostgreSQL setup
const BackendMocker = require("backend-mocker-npm-package");

// before pasting below line make sure you install sequelize by typing   npm install sequelize  in terminal in your project directory
const { DataTypes } = require("sequelize");

const tableName = "name-it-as-you-want";

// define as you want
const customSchema = {
  name: DataTypes.STRING,
  RollNo: DataTypes.STRING,
  Age: DataTypes.STRING,
  Course: DataTypes.STRING,
  Date: DataTypes.DATE,
  PhoneNo: DataTypes.STRING,
};

const customPort = 4000;

const postgresConnectionString =
  "postgresql://usernme:password@localhost:port/database";

const back = new BackendMocker(
  null,
  postgresConnectionString,
  customSchema,
  tableName,
  customPort
);
back.startServer();

//  now your backend is ready just click start

```

## API Endpoints 📡

- **GET /get**: Retrieve all data.
- **POST /new**: Create new data.
- **PATCH /update/:id**: Update data by ID.
- **DELETE /delete/:id**: Delete data by ID.

## 💡 No Schema? Just Want to Test API for Frontend!

If no schema is provided, the app will create a default schema. 

```javascript
// Code snippet for default schema setup
const book = {
  title: String,
  author: String,
  publishedDate: Date,
};
this will be automatically created if you donot provide a schema
```

With Backend Mocker, you're not just building a backend - you're unleashing your creativity and powering your projects to new heights!

## 🚀 Ready to Launch?

Dive into the world of rapid backend development with Backend Mocker and watch your projects soar!

Got it! Here's the revised "Let's Connect" section:

## 🌐 Let's Connect!

Connect with me through:

- **Email:** kratikbohra5@gmail.com
- **LinkedIn:** [Kratik Bohra](https://www.linkedin.com/in/kratik-bohra-11a39a195/)

Feel free to reach out for any questions, ideas, or just to chat! Contributions are welcome. Happy coding! 🎉

---
