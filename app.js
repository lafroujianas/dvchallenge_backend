/* 

Purpose of this file :
- Launch the server
- Handle the post request

*/

var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());


require("./routes/api_calls.js")(app)


var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
})




module.exports = app
