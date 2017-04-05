'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

// copies express to app so that we can extend and manipulate it
var app = express();

// '/' refers to the root directory aka home page
app.get('/', function(request, response){
	response.send('<h1>I love Treehouse!</h1>');
});

app.get('/blog', function(request, response){
	response.send(posts);
});

// get app to listen to port 3000
app.listen(3000, function(){
	console.log('The front end server is running on port 3000!');
});