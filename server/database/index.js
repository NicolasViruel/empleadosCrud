const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pichones1",
    database:"empleadoscrud"
});

console.log("Conexión a la base de datos🌝");

module.exports ={
    db
}