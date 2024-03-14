
const {connection} = require('./database/connection');
const express = require("express");
const cors = require("cors");

console.log('Start app');

connection();

//Create node server

const app = express();
const port = 3900;
//Configure cors
app.use(cors());

//Convert body to js object

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

//Create routes
const articleRoute = require("./routes/articleRoute");

app.use("/api",articleRoute);
app.get("/testing",(req,res) =>{
  console.log("Endpoint");  
  return res.status(200).send({
    "hola": "1"
  });
});
//Create server and listen

app.listen( port, () => {
  console.log("Server running on: " + port);
});

