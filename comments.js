// create web server
// load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// create web server
var app = express();

// configure body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// connect to database
mongoose.connect('mongodb://localhost:27017/mean', function(err) {
  if (err) {
    console.log('Failed connecting to MongoDB!');
  } else {
    console.log('Successfully connected to MongoDB!');
  }
});

// define schema
var CommentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// define model
var Comment = mongoose.model('Comment', CommentSchema);

// define routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/comments', function(req, res) {
  Comment.find({}, function(err, docs) {
    res.json(docs);
  });
});

app.post('/comments', function(req, res) {
  console.log(req.body);
  var comment = new Comment(req.body);
  comment.save(function(err, docs) {
    res.json(docs);
  });
});

app.delete('/comments/:id', function(req, res) {
  console.log(req.params.id);
  Comment.remove({_id: req.params.id}, function(err, docs) {
    res.json(docs);
  });
});

// start web server
app.listen(3000, function() {
  console.log('Server running at http://localhost:3000');
});


