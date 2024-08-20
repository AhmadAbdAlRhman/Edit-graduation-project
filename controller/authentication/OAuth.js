const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Customer = require('../../Models/customer');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_REDIRECT_URL,
      scope: ['email' , 'profile'],
    },
    async (token, tokenSecret, profile, done) => {
      try {
        //Check if user already exists
        let user = await Customer.findOne({ where: { googleId: profile.id } });
        if (user) {
          return done(null, user);
        } else {
          user = await Customer.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });
          return done(null, user);
        }
      } catch (err) {
        return done(err, null);
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
    done(err, null);
  }
});

module.exports = passport;