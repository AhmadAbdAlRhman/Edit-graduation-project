const sequelize = require("../config/database");
require("./customer"),
require("./notifications"),
require("./order"),
require("./product_images"),
require("./product"),
require("./store"),
require("./bank");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync all models
    await sequelize.sync(); // force: true will drop the table if it already exists
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
