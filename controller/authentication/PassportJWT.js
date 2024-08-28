const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const Customer = require("../../Models/customer");
const { jwtSecret } = require('../../config/JWT');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { jwtDecode } = require("jwt-decode");
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    async (payload, done) => {
      try {
        await Customer.findByPk(payload.sub).then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports.Register = async (req, res, next) => {
  try {
    const { first_name, second_name, email, password, telephone, address } =
      req.body;
    let customer = await Customer.findOne({ where: { email } });
    if (customer) {
      return res.status(404).json({ message: "This email is existed" });
    }
    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newCustomer = await Customer.create({
      first_name,
      second_name,
      email,
      password: hashedPassword,
      telephone,
      address,
    });
    res.status(201).send("User created");
  } catch (error) {
    next(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (customer && (await bcrypt.compare(password, customer.password))) {
      const token = jwt.sign({ sub: customer.id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json("This customer is not found");
    }
  } catch (error) {
    next(error);
  }
};
