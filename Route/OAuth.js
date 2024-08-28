const express = require("express");
const router = express.Router();
const passport = require("passport");
// Google OAuth login route
router.get("/auth/google", passport.authenticate("google"), (_req, res) => {
  return res.status(200).json({ message: "Login OAuth Successfully" });
});

// Google OAuth callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (_req, res) => {
    // Successful authentication, redirect to dashboard or homepage
    return res.status(200).json({ message: "Register OAuth Successfully" });
  }
);
module.exports = router;
