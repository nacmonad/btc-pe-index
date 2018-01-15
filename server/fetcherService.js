var fs = require('fs');
var rp = require('request-promise');

exports.fetcherService = function(db) {
  //DATA UPDATE SERVICE
  //DATA SERVICE
  //market cap/data service
  var INTERVAL = 60*1000
  var LIMIT = 100
  var CONVERT = "USD"

  var options = {
      uri: 'https://api.coinmarketcap.com/v1/ticker/?convert='+CONVERT+'&limit='+LIMIT,
      timeout:INTERVAL-1000
  };

  var requestAndInsert = () =>{
    rp(options)
      .then(res=>JSON.parse(res))
      .then(data=>{
        //save data locally and to cloud instance
          try {
            fs.writeFile( __dirname + '/../data/data.json', JSON.stringify(data), function(err) {
                        if(!err) console.log('Price saved in price.json file');
                        else console.log(err);
                    });
            db.collection('marketcap').insert( { data:data, timestamp: new Date() }, function(err,doc) {
                      if(!err) {
                        console.log("write succeed")
                        console.log(doc)
                      } else {
                        console.log(err)
                      }
                    } );
          } catch (e) {
             console.log (e);
          };

        })
       .catch(function (err) {
           // Crawling failed...
           console.log("err making request")
       });
  }

  var interval = setInterval(()=>{
    requestAndInsert();
  }, INTERVAL);

  requestAndInsert();
}
