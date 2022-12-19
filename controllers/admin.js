const Product = require("../models/product");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/add-product", {
    docTitle: "Add-Product",
    path: "/add-product",
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const description = request.body.description;
  const imageUrl = request.body.imageUrl;
  const price = request.body.price;
  const product = new Product(title, description, imageUrl, price);
  product.save();
  response.redirect("/");
};
exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("admin/products", {
      prods: products,
      docTitle: "Products",
      path: "/admin/products",
    });
  });
};
