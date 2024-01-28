
# Backend Mocker NPM Package

## Description

Backend Mocker NPM Package is a simple and lightweight npm package for quickly setting up a CRUD API with MongoDB using Express and Mongoose. It provides easy-to-use endpoints for creating, reading, updating, and deleting data in your MongoDB database.

## Installation

To install the package, simply run:

```bash, cmd , any terminal in a directory of your choice
npm install backend-mocker-npm-package
```

## Usage

### Quick Start

To quickly set up a CRUD API with MongoDB, follow these steps:

1. Require the package in your Node.js application:

   ```javascript
   const BackendMocker = require("backend-mocker-npm-package");
   ```

2. Provide your MongoDB connection string or use the default (localhost):

   ```javascript
   const mongoConnectionString = "mongodb://localhost:27017/mydatabase";
   ```

3. Create an instance of `BackendMocker`:

   ```javascript
   const backendMocker = new BackendMocker(mongoConnectionString);
   ```

4. Start the server:

   ```javascript
   backendMocker.startServer();
   ```

### API Endpoints

The package provides the following endpoints:

- **GET /books**: Retrieve all books.
- **POST /books/new**: Create a new book.
  - Test JSON post data:
    ```json
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publishedDate": "1925-04-10"
    }
    ```

- **PATCH /books/:id**: Update a book by ID.
- **DELETE /books/:id**: Delete a book by ID.

Contributing
Contributions are welcome! Please contact me to if you have any idea which can make this project better.
