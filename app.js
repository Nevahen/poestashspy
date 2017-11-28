/*
============================= SINGLE FILE MESS ========================
/////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//////////////////////////////////////
-----------------------------------------------------------------------
=======================================================================
*/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(__dirname));
var mysql = require('mysql');

// Database
var con = mysql.createConnection({
  host: "localhost",
  user: "poestashspy",
  password: "poestashspy",
  database: "poestashspy"
});

con.connect(function (error) {
  if (error) throw error;
  console.log("Connected to MySQL");
})

app.get('/stashView/*', function (req,res){
res.sendFile(__dirname + "/dist/index.html");
});

//Accounts 
app.get('/api/', function (req, res) {
  res.send("lol");
});

app.listen(8080, function () {
  console.log("Started api server");
});
app.use(express.static(__dirname + "/dist"));

app.get('/api/accounts', function (req, res) {

  if (req.query.search) {
    var sql = "select accountName From accounts where accountName LIKE "+con.escape(req.query.search + '%')+" LIMIT 10";
    console.log(sql);
  } else {
    var sql = "select accountName from accounts ORDER BY accountID DESC LIMIT 60;"
  }
  con.query(sql, function (error, result) {
    if (error) {
      res.status(500);
      res.send("Internal Error:");
      throw error;
    }
    result = String(JSON.stringify({
      accounts: result
    }));
    res.send(result);
  })

})

app.get('/api/accounts/:str/', function (req, res) {

  var sql = "SELECT stashID,stashName,stashType from stashes WHERE accountName = ?"
  sql = mysql.format(sql, req.params.str);

  con.query(sql, function (error, result) {

    if (result.length === 0) {
      res.status(404).send(JSON.stringify({
        error: "resource not found."
      }));
      return;
    }

    res.send(JSON.stringify({
      account: req.params.str,
      stashCount: result.length,
      stashes: result,

    }));
  });
});

app.get('/api/accounts/:str/stashes', function (req, res) {
  
    var sql = "SELECT stashID,stashName,stashType,league from stashes WHERE accountName = ?"
    sql = mysql.format(sql, req.params.str);
  
    con.query(sql, function (error, result) {
  
      if (result.length === 0) {
        res.status(404).send(JSON.stringify({
          error: "resource not found."
        }));
        return;
      }
  
      res.send(JSON.stringify({
        stashes: result,  
      }));
    });
  });

//Stashes
app.get('/api/stashes/', function (req, res) {
  // TODO NOTICE: Currently fetching only premium tabs
  var sql = "SELECT stashID,stashName,stashType,league from stashes WHERE stashType='PremiumStash' ORDER BY stashID DESC LIMIT 20";

  con.query(sql, function (error, result) {

    res.type('json');
    res.send(JSON.stringify({
      stashes: result
    }));
  });
});

app.get('/api/stashes/:id', function (req, res) {

  var sql = "SELECT stashID,stashName,stashType,itemData,league from stashes WHERE stashID = ?";
  sql = mysql.format(sql, req.params.id);

  con.query(sql, function (error, result) {
    if (error) {
      res.status(500);
      res.send("Internal Error");
      throw error;
    }

    if (result.length === 0) {
      res.status(404).send(JSON.stringify({
        error: "resource not found."
      }));
      return;
    }

    result[0].itemData = JSON.parse(result[0].itemData);

    res.type('json');
    res.send(JSON.stringify({
      itemData: result
    }));
  });
});

app.get('/*', function (req,res){
    res.sendFile(__dirname + "/dist/index.html");
});

app.use(function (req, res, next) {
  res.status(404);
  res.type('text').send("not found");

})
