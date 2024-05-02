var express = require('express');
var app = express();

app.use(express.static(__dirname + '/style')) //css
app.use(express.static(__dirname + '/views'))
 
app.set('view engine', 'ejs');
 

// index page
app.get('/', function(req, res) {
  res.render('index');
});

 
app.listen(8080);
console.log('Server is listening on port 8080');