'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

// copies express to app so that we can extend and manipulate it
var app = express();

// '/' refers to the root directory aka home page
app.get('/', function(request, response){
	response.send('<h1>I love to Treehouse!</h1>');
});

// route to blog with optional parameter
app.get('/blog/:title?', function(request, response){
	var title = request.params.title;
	// if title params not defined, go to default blog page
	if(title === undefined){
		// set header to 503 unavailable of search engine bots, but still renders for client
		response.status(503);
		response.send('<h2>Page is under construction :)</h2>');
	} else {
		// if params defined go to that page with the property from the post.json
		var post = posts[title];
		response.send(post);
	}
});

// get app to listen to port 3000
app.listen(3000, function(){
	console.log('The front end server is running on port 3000!');
});