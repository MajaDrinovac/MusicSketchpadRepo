var express = require('express');
const http = require('http')
const path = require('path')
var bodyParser = require('body-parser')



var app = express();


//damit man die JSON Files die mitgegeben werden lesen kann
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });



//message - testen ob der serer funktioniert
app.get('/message', function(req,res){
    res.send('Server works!');
})

app.get("/findAllUsers", function(req, res){
    let users = [
        {"username": "Maja", "email": "maja.drino@gmail.com", "password":"secret"}
    ]

    //TODO: Find users in DB

    res.send(users)
})


//register
app.post('/createUser', function (req, res) {
    console.log(req.body)
    let user = req.body

    //TODO: create new user in DB 

    res.send('Got the user');
  });

//login
app.post('/login', function(req, res){
    let username = req.body.username
    
    //TODO: Find in DB

    res.send("User "+ req.body.username +" exists")
})

//Server is listening on port 3000
app.listen(3000, function (){
    console.log('Server listening on port 3000')
})