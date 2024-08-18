const Customer = require("../../Models/customer");
const passport = require("passport");

module.exports.Register = async (req, res, next) => {
  try {
    const { first_name, second_name, email, password, telephone, address } = req.body;    
    let customer = await Customer.findOne({where:{email}});
    if (customer){
        return res.status(404).json({ message: "This email is existed" });
    }
    const newCustomer = await Customer.create({
      first_name,
      second_name,
      email,
      password,
      telephone,
      address,
    });
    req.logIn(newCustomer, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Register Successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: "Error signing up", details: error });
  }
};
module.exports.Login = (req , res , next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: "Login failed", info });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "Login successful", user });
      });
    })(req, res, next);
}