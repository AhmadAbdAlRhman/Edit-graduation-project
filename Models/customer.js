const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs"); 
const sequelize = require("../config/database");
const Customer = sequelize.define(
  "customer",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    second_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    telephone: {
      type: Sequelize.STRING(100),
      allowNull: true,
      unique: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    resToken: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    },
    resetTokenExpiration: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "customers",
    timestamps: false, // if you don't have timestamp fields
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        console.log("Ahmad");
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);
Customer.prototype.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
}
module.exports = Customer;