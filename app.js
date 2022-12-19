const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404page);

app.listen(3000, () => console.log("Sever running at http://localhost:3000"));
