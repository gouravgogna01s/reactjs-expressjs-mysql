var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var totalrows = [{}];

var connection = mysql.createConnection({
  host : "localhost",
    user : "root",
    password : "",
    database : "myapp"
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});


router.get('/', function(req, res, next) {
  var quer1 = "SELECT * FROM users";
  connection.query(quer1, function(err, rows) {
    if (err) {
      console.log(err);  
    }
  console.log(rows);
  totalrows = rows
  res.json(totalrows);
  });
}); 

router.post('/insertData', function(req, res) {
  console.log('A flag was inserted...');
  console.log(req.body);
  connection.query("INSERT INTO users(username) VALUES('" + req.body.user + "')", function (err, results, fields) {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});

router.delete('/deleteData', function(req, res) {
  console.log('A flag was deleted...');
  console.log(req.body);
  connection.query("DELETE FROM users WHERE id = ('" + req.body.delId + "')", function (err, results, fields) {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});

router.post('/edit', function(req, res, next) {
    console.log('A flag was Edited...');
    connection.query("UPDATE users SET username = ('" + req.body.uname + "') WHERE id = ('" + req.body.delId + "')", function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

module.exports = router;
