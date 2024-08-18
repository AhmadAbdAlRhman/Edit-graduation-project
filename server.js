const express = require('express');
const session = require('express-session'); 
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
require("./Models/models");
const port = process.env.PORT || 5000; 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const corsOption = {
  origin: ["http://localhost:5000", "http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(session({
    secret: 'Editing-Graduation-Project',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./controller/authentication/passport')(passport);
app.use(require('./Route/authentication'));
app.listen(port,()=>{
    console.log(`Server running at http://localhost:port`);
})