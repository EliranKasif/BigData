var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', express.static(__dirname + '/'));


app.listen(8080);
console.log('Server running at http://localhost:8080/');


app.post('/', function(req, res) {
console.log(req.body.mysearch);
var queryNum = parseInt(req.body.mysearch, 10);
MongoClient.connect(url, function(err, db) {
  if (err) 
	return err;
  var dbo = db.db("NetflixMovies");
  var query = {};
  if(isNumeric(queryNum)){
	query["Year"] = queryNum;
	}
  else{
	query["Name"] = req.body.mysearch;
	}
  dbo.collection("movies").find(query).toArray(function(err,result){
	if (err) 
		throw err;
	
	res.render('index2', { result: result });
  	console.log(result[0]);
	db.close();
	});

});
	
});

function isNumeric(num){
  return !isNaN(num)
}

