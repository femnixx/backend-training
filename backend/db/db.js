let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_training"
});

let sql = "CREATE TABLE users (name VARCHAR(255), email VARCHAR(255))";

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Database created!")
    });
});