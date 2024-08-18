const express = require("express");
const router = express.Router();
const path = require("path");
const authentication = require("../controller/authentication/auth");
router.post("/Register", authentication.Register);
router.post("/Login", authentication.Login);
module.exports = router;
