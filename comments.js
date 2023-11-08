// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create web server
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route for getting comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route for posting comments
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

// Create route for receiving event
app.post('/events', (req, res) => {
  console.log('Event Received:', req.body.type);

  res.send({});
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});