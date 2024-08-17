const express = require("express");
require("dotenv").config();
const app = express();
require("./Models/models");
const port = process.env.PORT; 

app.listen(port,()=>{
    console.log(`Server running at http://localhost:port`);
})