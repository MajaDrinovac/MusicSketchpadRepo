var express = require('express');
const http = require('http')
const path = require('path')
var bodyParser = require('body-parser')
const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/"
let dbo



var app = express();


//damit man die JSON Files die mitgegeben werden lesen kann
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//message - testen ob der serer funktioniert
app.get('/message', function (req, res) {
    res.send('Server works!');
})

app.get("/findAllUsers", function (req, res) {
    let users = [
        { "username": "Maja", "email": "maja.drino@gmail.com", "password": "secret" }
    ]

    //TODO: Find users in DB
    dbo.collection("users").find({}).toArray(function (err, res) {
        if (err) throw err;
        console.log(res)
    })


    res.send("cursor")
})


//register
app.post('/createUser', function (req, res) {
    console.log(req.body)
    let user = req.body
    let result = ""

    //TODO: create new user in DB 
    //let testuser = {benutzername: "Test2", email: "test@gmail.com", passwort: "test123"}
    dbo.collection("users").insertOne(user, function (err, res) {
        if (err) throw err;
        console.log("test passt: " + res)
        result = res.ops
        result = result[0].benutzername
    })
    res.send(result);
});

//find user
app.get('/findUser', function (req, res) {

});

  //login
app.post('/login', function(req, res){


    let email = req.body.email
    let password = req.body.password

    console.log("hallo")

    dbo.collection("users").find({email, password})(user, function(err, res){
        if(err) throw err;
        console.log("geht " +res)
        res.send("User "+ req.body.username +" exists")
    })
    
    console.log(res)

    //TODO: Find in DB

   
})

//nur zum testen
app.post("/delete", function (req, res) {
    let user = req.body
    let toDelete = { benutzername: "Test4" }
    dbo.collection("users").deleteOne(user, function (err, res) {
        if (err) throw err;
        console.log("1 deleted")
    })
    res.send("deleted")
})

//login
app.post('/login', function (req, res) {
    let username = req.body.username

    //TODO: Find in DB

    res.send("User " + req.body.username + " exists")
})

app.get("/deleteMel", function (req, res) {
    dbo.collection("melody").drop(function (err, delOk) {
        if (err) throw err;
        if (delOk) console.log("ok")
    })
res.send("deleted")
})

app.get("/findAllMelodies", function (req, res) {
    dbo.collection("melody").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
        console.log(result)
    })
})

app.post("/saveMelody", function (req, res) {
    let melody = req.body
    let result = ""
    dbo.collection("melody").insertOne(melody, function (err, res) {
        if (err) throw err;
        console.log("test passt: " + res)
        result = res.ops
        result = result[0]
    })
    //console.log(melody)

    res.send(result)
})

//Server is listening on port 3000
app.listen(3000, function () {
    console.log('Server listening on port 3000')
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        dbo = db.db("musicDemoDB")
        let cursor = dbo.collection("users").find()
        cursor.forEach(element => {
            console.log(element)
        });
    })
})