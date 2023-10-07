const mysql = require("mysql");
require('dotenv').config(); // Cargar variables de entorno

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

console.log("Conexión a la base de datos🌝");

module.exports ={
    db
}