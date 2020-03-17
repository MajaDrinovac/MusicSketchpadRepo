var express = require('express');
var bodyParser = require('body-parser')
var app = express();

//damit man die JSON Files die mitgegeben werden lesen kann
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//message - testen ob der serer funktioniert
app.get('/message', function(req,res){
    res.send('Hello World');
})


//post req
app.post('/p', function (req, res) {
    console.log(req.body)
    res.send('Got a POST request');
  });
  

//Server is listening on port 3000
app.listen(3000, function (){
    console.log('Server listening on port 3000!')
})