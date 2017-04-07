'use strict';

var express = require('express'),
	  blogPosts = require('./mock/posts.json');

//Convention states that we use arrays to iterate over a list aka array.
// So, we return turn the object into an array.
var blogPostsArray = Object.keys(blogPosts)
							.map(function(value){
							 	return blogPosts[value];
							});

// copies express to app so that we can configure, extend and manipulate it
var app = express();

// uses Express static method to serve files form public directory
// the first parameter changes the name so that you have to go to ../static/...
// instead of the root aka /..
// Also, .use() defines middleware for the app.
// Middleware is logic that tells Express how to handle a request
// in between the time a request is made by a client,
// but before it reaches it arrives at its route
// Middleware can be used to accompish any range of tasks
// from authentication, to 
app.use('/static', express.static(__dirname + '/public'));

// configures view engine to pug templating
app.set('view engine', 'pug');
// sets absolute path to find views aka templates to directory name/templates
// since we may start our process one level up from where the app.js is found.
app.set('views', __dirname + '/templates');

// '/' refers to the root directory aka home page
app.get('/', function(request, response){
	// render pug template, no need for extension since express was told it was pug above
	response.render('index');
});

// route to blog with optional parameter
app.get('/blog/:title?', function(request, response){
	var title = request.params.title;
	// if title params not defined, go to default blog page
	if(title === undefined){
		// set header to 503 unavailable of search engine bots, but still renders for client
		response.status(503);
		// injecting the blogPostsArray value into the blog.pug template, 
		// using the blogPostsList key as an alias
		// The 2nd parameter is an unnamed object that holds the value and alias to be injected
		response.render('blog', {blogPostsList: blogPostsArray});
	} else {
		// if params defined go to that page with the property from the post.json
		var blogPostTitle = blogPosts[title];
		if (blogPostTitle === undefined){
			// set header to 404 for file not found.
			response.status(404);
			response.send('<h2>Dang son</h2><h2>File Not Found 404 :(</h2>');
		} else {
			// injecting the values of posts.json into blogPostsTemplate.pug
			response.render('blogPostsTemplate', {theBlogPostTitle: blogPostTitle});
		}
	}
});

// get app to listen to port 3000
app.listen(3000, function(){
	console.log('The front end server is running on port 3000!');
});