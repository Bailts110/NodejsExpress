const fs=require('fs');
const express = require('express');
require('dotenv').config();
const app = express();

const port =process.env.PORT;

app.listen(port,() => console.log(`listening on port ${port}`));


//get request

app.get('/', (req, res) => {
    fs.readFile("database.json", "utf8", (Error, data) => {
        if (Error) {
            res.status(400).json(Error);
        } else {
            res.status(200).json({ data: JSON.parse(data) });
        }
    });
});

//middleware
app.use(express.json());

//post request
app.post('/', (req, res) => {
 
    
    fs.readFile("database.json", "utf8", (Error, data) => {
        if (Error) return res.status(400).json(Error);
        
          const database = JSON.parse(data);
          
          const users = database["users"];

          const id = database["last_id"] + 1;

          const { name } = req.body;

          const { email } = req.body;
          
          users.push({ id, name,email });

          fs.writeFile("database.json",JSON.stringify({ users, last_id: id }),(Error) => {

              if (Error) 

                res.status(400).json(Error);

               else 
                res.status(201).json({ message: "user is added Successfully" });
              
            }
          );
        
      });
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







// put request

app.put("/:id", (req, res) => {

    const id = req.params.id;
    const { name } = req.body;
    const { email } = req.body;
    fs.readFile("database.json", "utf8", (Error, data) => {
      if (Error) res.status(400).json(Error);
      if (data) {
        const database = JSON.parse(data);

        const users = database["users"];

        const index =users.findIndex((e) => e.id == id)
        users[index].name = name;
        users[index].email = email;
  
        fs.writeFile("database.json",JSON.stringify({ users, last_id: database["last_id"] }),(Error) => {

            if (Error) {

              res.status(400).json( Error );

            } else {

              res.status(201).json({ message: "user has been modified" });

            }
          }
        );
      }
    });
  });
  
  // delete request
  app.delete("/:id", (req, res) => {

    const id = req.params.id;

    fs.readFile("database.json", "utf8", (Error, data) => {

      if (Error) res.status(400).json(Error);

      if (data) {

        const database = JSON.parse(data);

        let users = database["users"];

        users = users.filter((e) => e.id != id);
  
        fs.writeFile("database.json",JSON.stringify({ users, last_id: database["last_id"] }),(Error) => {

            if (Error) {

              res.status(400).json( Error );

            } 
            else {

                console.log(` Deleted item with id: ${req.params.id}`)

                res.status(200).json({ msg: `Deleted item with id: ${req.params.id}` });
            }
          }
        );
      }
    });
  });
  


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