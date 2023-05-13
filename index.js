const db = require('mysql2')
require('dotenv').config()

const conn = db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

const responseCodes = {
    SELECT: 200,
    INSERT: 201,
    UPDATE: 200,
    DELETE: 200
};

const message = {
    UPDATE: 'Updated successfully',
    DELETE: 'Deleted successfully'
};

const connection = res => {
    conn.connect(err => {
        err ? res.status(500).send(err) : res.status(200).send("database connected");
    });
};

const act = (query, data, res, callback) => {
    conn.query(query, data, (err, result) => {
        // Extract the first word from the query and convert it to uppercase to get the SQL type
        const sqlType = query.trim().split(' ')[0].toUpperCase();
        if (err) {
            return res.status(500).send(err);
        }
        let code = responseCodes[sqlType] || 400;
        let body = message[sqlType] || result;
        if (callback && typeof callback === 'function') {
            callback(body);
        } else {
            res.status(code).send(body);
        }
    })
};

module.exports = { connection, act }