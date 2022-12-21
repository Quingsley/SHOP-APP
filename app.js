const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404page);

async function main() {
  Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
  User.hasMany(Product);
  try {
    const result = await sequelize.sync();
    if (result) {
      app.listen(3000, () =>
        console.log("Sever running at http://localhost:3000")
      );
    }
  } catch (error) {
    console.log(error);
  }
}

main();
