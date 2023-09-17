// Create web server
// Run: node comments.js
// Test: curl http://localhost:3000/comments
// Test: curl http://localhost:3000/comments/1
// Test: curl -X POST -d "body=foo" http://localhost:3000/comments
// Test: curl -X PUT -d "body=foo" http://localhost:3000/comments/1
// Test: curl -X DELETE http://localhost:3000/comments/1

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');

var comments = [
  {id: 1, body: 'foo'},
  {id: 2, body: 'bar'},
  {id: 3, body: 'baz'}
];

var commentNextId = 4;

app.use(bodyParser.urlencoded({extended: true}));

// Show all comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Show one comment
app.get('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params.id);
  var comment = _.find(comments, {id: commentId});
  res.json(comment);
});

// Create a new comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comment.id = commentNextId++;
  comments.push(comment);
  res.json(comment);
});

// Update an existing comment
app.put('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params.id);
  var commentUpdates = req.body;
  var comment = _.find(comments, {id: commentId});
  _.assign(comment, commentUpdates);
  res.json(comment);
});

// Delete an existing comment
app.delete('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params.id);
  var comment = _.find(comments, {id: commentId});
  _.remove(comments, {id: commentId});
  res.json(comment);
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});