const {config} = require("dotenv");
config();
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());
let connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT,
    database :  process.env.RDS_DB_NAME,
});

connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
    connection.query('CREATE DATABASE IF NOT EXISTS main;');
    connection.query('USE main;');
    connection.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
});

app.post('/users', (req, res) => {
    if (req.query.username && req.query.email && req.query.age) {
        console.log('Request Post received');
            connection.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
                if (fields) console.log(fields);
                res.sendStatus(201);
            });
    } else {
        res.sendStatus(400);
        console.log('Missing a parameter');
    }
});

app.get('/users', (req, res) => {
    console.log('Request Get received');
        connection.query(`SELECT * FROM main.users`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
});
app.get('/closeConnection', (req, res) => {
    connection.end((error) => {
        if (error) {
            console.error('Error closing MySQL connection:', error);
            return res.send('Error closing MySQL connection');
        }
        return res.send('MySQL connection closed.');
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
