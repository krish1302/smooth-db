const db = require('mysql2')
require('dotenv').config()

const conn = db.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

const connection = callback => {
    conn.connect(err=>{
        return err ? callback(err) : callback("database connected")
    })
}

const act = (sql, data, callback) => {
    conn.query(sql, data, (err, result) => {
        return err ? callback(err) : callback(result)
    })
}

module.exports = {connection, act}