
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

//delete request

app.delete('/:id', (req, res) => {
  console.log(` Deleted item with id: ${req.params.id}`)
  res.status(200).json({ msg: `Deleted item with id: ${req.params.id}` });
});









