# smooth-db

`smooth-db` is a Node.js module that provides a simple interface for connecting to and querying a MySQL database using the mysql2 module and the Express framework. With Smooth DB, you can easily create and execute SELECT, INSERT, UPDATE, and DELETE queries from your Node.js application, and handle the results with ease.

## Installation

You can install the `smooth-db` module using npm:

```
npm install smooth-db
```

## setup

create .env file and paste the Database configuration inside your project directory

```
// Define the database connection details as environment variables
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'password';
process.env.DB_NAME = 'my_database';
process.env.DB_PORT = 3306;
```

## Usage

- Here's an example of how to use the `smooth-db` module in an Express.js application without callback:

```javascript
const express = require('express');
const app = express();
app.use(expres.json());
const smoothDb = require('smooth-db');



// Establish a database connection
smoothDb.connection((err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
    } else {
        console.log('Database connection established');
    }
});

// Define routes for performing CRUD operations on a "users" table
app.get('/users', (req, res) => {
    smoothDb.find('users', res);
});

app.get('/users/:id', (req, res) => {
    smoothDb.findOne('users', req.params.id, res);
});

app.post('/users', (req, res) => {
    const user = { name: req.body.name, email: req.body.email };
    smoothDb.insertOne('users', user, res);
});

app.put('/users/:id', (req, res) => {
    const user = { name: req.body.name, email: req.body.email };
    smoothDb.updateOne('users', req.params.id, user, res);
});

app.delete('/users/:id', (req, res) => {
    smoothDb.deleteOne('users', req.params.id, res);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
```

- Here's an example of how to use the `smooth-db` module in an Express.js application with callback:

```javascript
const express = require('express');
const app = express();
app.use(expres.json());
const smoothDb = require('smooth-db');

// connect to database
smoothDb.connection((err) => {
  if (err) {
    console.error('Unable to connect to database:', err);
    process.exit(1);
  } else {
    console.log('Connected to database');
  }
});

// retrieve all users
app.get('/users', (req, res) => {
  smoothDb.find('users', res, (result) => {
    res.status(200).json(result);
  });
});

// retrieve a single user by ID
app.get('/users/:id', (req, res) => {
  smoothDb.findOne('users', req.params.id, res, (result) => {
    res.status(200).json(result);
  });
});

// create a new user
app.post('/users', (req, res) => {
  smoothDb.insertOne('users', req.body, res, (result) => {
    res.status(201).json(result);
  });
});

// update an existing user
app.put('/users/:id', (req, res) => {
  smoothDb.updateOne('users', req.params.id, req.body, res, (result) => {
    res.status(200).json(result);
  });
});

// delete a user
app.delete('/users/:id', (req, res) => {
  smoothDb.deleteOne('users', req.params.id, res, (result) => {
    res.status(200).json(result);
  });
});


// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
```

## API

Here's a summary of the functions exported by the `smooth-db` module:

- `connection(res)`: A function that establishes a connection to the database and sends a response indicating whether the connection was successful or not.

- `act(query, data, res, callback)`: A generic function that takes a SQL query, data to be inserted/updated, a response object, and an optional callback function. It executes the query and sends an appropriate response based on the result.

- `find(tableName, res, callback)`: A function that selects all rows from a table and sends them in the response.

- `findOne(tableName, id, res, callback)`: A function that selects a single row from a table based on its ID and sends it in the response.

- `insertOne(tableName, data, res, callback)`: A function that inserts a single row into a table and sends a success message in the response.

- `updateOne(tableName, id, data, res, callback)`: A function that updates a single row in a table based on its ID and sends a success message in the response.

- `deleteOne(tableName, id, data, res, callback)`: A function that deletes a single row in a table based on its ID and sends a success message in the response.