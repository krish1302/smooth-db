# smooth database connection library

### create .env file and paste the Database configuration inside your project directory

```.env
# Database configuration
DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=root 
DB_NAME=demo_db 
DB_PORT=3306 
```

### create index.js file and paste the below commands and check the database connection

```js
// import smooth db
const db = require('smooth-db') 

// check the connection setup 
db.connection(val => console.log(val))

// get operation 
db.act("SELECT * FROM `demo_table` WHERE ?", [data], val => console.log(val))

// insert operation 
db.act("INSERT INTO `demo_table` SET ?", [data],  val => console.log(val))

// update operation 
db.act("UPDATE `demo_table` SET ? WHERE id = ?", [data1, data2], val => console.log(val))

// delete operation 
db.act("DELETE FROM `demo_table` WHERE id = ?", [data], val => console.log(val))
```