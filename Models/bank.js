const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const store = require("./store");
const Customer = require("./customer");

const Bank = sequelize.define(
  "bank",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Cemail: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: Customer,
        key: "email",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    Semail: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: store,
        key: "email",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    token: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "bank",
    timestamps: false, // if you don't have timestamp fields
  }
);

module.exports = Bank;
