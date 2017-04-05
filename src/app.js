'use strict';

var express = require('express');

// copies express to app so that we can extend and manipulate it
var app = express();

// '/' refers to the root directory aka home page
app.get('/', function(request, response){
	response.send('<h1>I love Treehouse!</h1>');
});

// get app to listen to port 3000
app.listen(3000);