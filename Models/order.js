const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const product = require("./product");
const customer = require("./customer");
const Order = sequelize.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: customer,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    purchase: {
      type: Sequelize.BIGINT,
      allowNull: true,
      defaultValue: 0,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      unique: true,
    },
    productId: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false,
      references: {
        model: product,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    Paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isRating: {
      type: Sequelize.TINYINT,
      defaultValue: false,
    },
  },
  {
    tableName: "orders",
    timestamps: false, // if you don't have timestamp fields
  }
);

module.exports = Order;
