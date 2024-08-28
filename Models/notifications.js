const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./product");
const Store = require("./store");
const Order = require("./order");

const Notifications = sequelize.define(
  "notifications",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StoreId: {
      type: Sequelize.INTEGER,
      references: {
        model: Store,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      allowedNull: true,
    },
    OrderId: {
      type: Sequelize.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      allowedNull: true,
    },
    customer_first: {
      type: Sequelize.STRING,
      allowedNull: true,
      unique: false,
    },
    customer_second: {
      type: Sequelize.STRING,
      allowedNull: true,
      unique: false,
    },
    product: {
      type: Sequelize.STRING,
      allowedNull: true,
      unique: false,
    },
    address: {
      type: Sequelize.STRING,
      allowedNull: true,
      unique: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowedNull: true,
      unique: false,
    },
    ProductId: {
      type: Sequelize.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      allowedNull: true,
    },
    count: {
      type: Sequelize.INTEGER,
      allowedNull: true,
    },
  },
  {
    tableName: "notificationsظ",
    timestamps: false, // if you don't have timestamp fields
  }
);
module.exports = Notifications;
