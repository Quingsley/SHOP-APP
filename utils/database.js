const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mydatabase", "root", "*********,", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
