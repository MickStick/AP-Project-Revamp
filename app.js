var express = require('express');
var route = require('./controller/routeController');
var app = express();
//var router = express.router();
var port = 4444;


app.set('--port', process.env.port || port);

route(app);

app.listen(process.env.port || port, function(){
    console.log("Server started and listening to port: " + app.set('--port'));
});