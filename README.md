# Smooth DB

Smooth DB is a Node.js module that provides a simple interface for connecting to and querying a MySQL database using the mysql2 module and the Express framework. With Smooth DB, you can easily create and execute SELECT, INSERT, UPDATE, and DELETE queries from your Node.js application, and handle the results with ease.

## Installation

To install Smooth DB, simply run the following command in your Node.js project:

```
npm install smooth-db
```

##  setup

create .env file and paste the Database configuration inside your project directory

```
# Database configuration
DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=root 
DB_NAME=demo_db 
DB_PORT=3306 
```

## Usage

To use Smooth DB in your Node.js application, follow these steps:

- Import the module into your code:

```
const smoothdb = require('smooth-db');
```

- smooth-db exports two functions: connection and act.

### connection(res)
The connection function establishes a connection to a MySQL database using environment variables defined in a .env file. It takes an HTTP response object as its only parameter. If an error occurs during the connection process, it sends a 500 HTTP status code and the error message to the client. If the connection is successful, it sends a 200 HTTP status code and the message "database connected" to the client.

- Example usage:

```
app.get('/connect', (req, res) => {
  smoothdb.connection(res);
});
```

### act(query, data, res, callback)

The `act` function takes four parameters: a SQL query string, an array of values to be inserted into the query, an HTTP response object, and an optional callback function. It executes the SQL query using the `connection` object established in the connection function, and sends the results or an error message to the client depending on the outcome of the query.


If the query is successful, the `act` function extracts the first word from the query string and converts it to uppercase to determine the type of SQL query (e.g. SELECT, INSERT, UPDATE, DELETE). It then sends an HTTP status code and a response body to the client depending on the SQL query type and the contents of the `responseCodes` and `message` objects defined at the top of the file.

If the `callback` parameter is provided and is a function, the act function calls the callback function with the response body instead of sending it directly to the client. This allows for more flexibility in how the response is handled.

### Example express application with callback parameter

```
const express = require('express');
const smoothdb = require('smooth-db');

const app = express();
app.use(express.json())

// Establish database connection
app.get('/connect', (req, res) => {
  smoothdb.connection(res);
});

// Retrieve all records
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  smoothdb.act(query, [], res);
});

// Retrieve a single record by ID
app.get('/items/:id', (req, res) => {
  const query = 'SELECT * FROM items WHERE id = ?';
  const data = [req.params.id];
  smoothdb.act(query, data, res);
});

// Create a new record
app.post('/items', (req, res) => {
  const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
  const data = [req.body.name, req.body.description];
  smoothdb.act(query, data, res, (result) => {
    res.status(201).json({ message: 'Item created successfully', item: result });
  });
});

// Update an existing record
app.put('/items/:id', (req, res) => {
  const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  const data = [req.body.name, req.body.description, req.params.id];
  smoothdb.act(query, data, res, () => {
    res.status(200).json({ message: 'Item updated successfully' });
  });
});

// Delete a record
app.delete('/items/:id', (req, res) => {
  const query = 'DELETE FROM items WHERE id = ?';
  const data = [req.params.id];
  smoothdb.act(query, data, res, () => {
    res.status(200).json({ message: 'Item deleted successfully' });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

### Example for express application without callback

```
const express = require('express');
const smoothdb = require('smooth-db');

const app = express();
app.use(express.json())

// Establish database connection
app.get('/connect', (req, res) => {
  smoothdb.connection(res);
});

// Retrieve all records
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  smoothdb.act(query, [], res);
});

// Retrieve a single record by ID
app.get('/items/:id', (req, res) => {
  const query = 'SELECT * FROM items WHERE id = ?';
  const data = [req.params.id];
  smoothdb.act(query, data, res);
});

// Create a new record
app.post('/items', (req, res) => {
  const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
  const data = [req.body.name, req.body.description];
  smoothdb.act(query, data, res);
});

// Update an existing record
app.put('/items/:id', (req, res) => {
  const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  const data = [req.body.name, req.body.description, req.params.id];
  smoothdb.act(query, data, res);
});

// Delete a record
app.delete('/items/:id', (req, res) => {
  const query = 'DELETE FROM items WHERE id = ?';
  const data = [req.params.id];
  smoothdb.act(query, data, res);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```