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
  


