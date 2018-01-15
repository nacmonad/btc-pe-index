var fs = require('fs');
var express = require('express');

var app = express();
var port = 8080;

var MongoClient = require('mongodb').MongoClient;
var url = require('../config').DB_ENDPOINT;
var fetcherService = require('./fetcherService').fetcherService;

//CONNECT TO CLOUD DB
MongoClient.connect(url, function(err, client) {
  // Get an additional db
  const db = client.db('crypto');
  // Start data fetching
  fetcherService(db);
  //HTML SERVER
  app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/../build/index.html')
  });
  //API ENDPOINT
  app.get('/data', (req, res)=>{
    res.setHeader('Content-Type','application/json')
    //db.collection('market-cap').find({})
    res.send(fs.readFileSync(__dirname+'/../data/data.json', 'utf8'));
  })


});


//SERVER

app.listen(port, () => {
  console.log("Listening on port : " + port)
});
