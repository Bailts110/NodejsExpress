
const express = require('express');
require('dotenv').config();
const app = express();

const port =process.env.PORT;

app.listen(port,() => console.log(`listening on port ${port}`));


//get request

app.get('/', (req, res) => {
    
  res.status(200).json({ msg: 'Welcome Basilst' });
});


//middleware
app.use(express.json());

//post request

app.post('/', (req, res) => {
    console.log(req.body)
res.status(201).json( req.body);

}
)
//put request

app.put("/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    res.status(201).json({ id: req.params.id});

}
)

//delete request

app.delete('/:id', (req, res) => {
  console.log(` Deleted item with id: ${req.params.id}`)
  res.status(200).json({ msg: `Deleted item with id: ${req.params.id}` });
});



















// post request 
/*
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // here you should check if the username and password match with your database
  // and return a JWT token if they do

  // For the purpose of this example, let's assume that the username and password are correct
  if (username === 'admin' && password === 'password') {
    const payload = { username };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});


*/













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