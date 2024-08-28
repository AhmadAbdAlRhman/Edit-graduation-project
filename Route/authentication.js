const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const authentication = require("../controller/authentication/auth");
const authentication2 = require("../controller/authentication/PassportJWT");



// router.post("/Register", authentication.Register);
router.post("/Register", authentication2.Register);
// router.post("/Login", authentication.Login);
router.post("/Login", authentication2.Login);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    res.send("This is a protected route");
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
