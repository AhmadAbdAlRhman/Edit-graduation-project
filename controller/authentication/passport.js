const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Customer = require("../../Models/customer"); // Adjust the path

module.exports = function (passport) {
  // Local Strategy for login
  passport.use(
    new LocalStrategy(
      { email: "email" },
      async (email, password, done) => {
        try {
          const user = await Customer.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize user to save to session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Customer.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
