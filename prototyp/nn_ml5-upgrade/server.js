const express = require("express")
const app = express()

app.use(express.static("public"))

app.get("/", function(req, res){

})

app.listen(3000, function(){
    console.log("server is listening")
})