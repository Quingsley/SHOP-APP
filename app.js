const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

app.use(async (request, response, next) => {
  try {
    const user = await User.findByPk(1);
    request.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404page);

async function main() {
  Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
  User.hasMany(Product);
  User.hasOne(Cart);
  Cart.belongsTo(User);
  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });
  Order.belongsTo(User);
  User.hasMany(Order);
  Order.belongsToMany(Product, { through: OrderItem });
  try {
    const result = await sequelize.sync();
    if (result) {
      const user = await User.findByPk(1);
      if (!user) {
        const res = await User.create({
          username: "Jerome",
          email: "test@test.com",
        });

        if (res) {
          app.listen(3000, () =>
            console.log("Sever running at http://localhost:3000")
          );
        }
      } else {
        if (user) {
          const cartRes = await user.createCart();
          if (cartRes) {
            app.listen(3000, () =>
              console.log("Sever running at http://localhost:3000")
            );
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

main();
