
const express = require('express');
require('dotenv').config();
const app = express();

const port =process.env.PORT;

app.listen(port,() => console.log(`listening on port ${port}`));

















/*

// Middleware to validate user token

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Token is required.' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
};


















// Middleware to parse JSON request bodies

app.use(express.json());

// Middleware to log incoming requests  

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware to handle CORS (Cross-Origin Resource Sharing)   

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});
// Middleware to validate the request body

app.use((req, res, next) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }

  next();
});*/