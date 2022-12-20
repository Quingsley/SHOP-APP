const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/edit-product", {
    docTitle: "Add-Product",
    path: "/add-product",
    editing: false,
  });
};

exports.postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const description = request.body.description;
  const imageUrl = request.body.imageUrl;
  const price = request.body.price;
  const product = new Product(null, title, description, imageUrl, price);
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

exports.getEditProduct = (request, response, next) => {
  let editMode = request.query.edit;
  const prodId = request.params.productId;
  if (!editMode) {
    return response.redirect("/");
  }

  editMode = editMode === "true";
  Product.findByid(prodId, (product) => {
    if (!product) {
      response.redirect("/");
    }
    response.render("admin/edit-product", {
      docTitle: "Edit Product 📝",
      path: "/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (request, response, next) => {
  const prodId = request.body.productId.trim();
  const updatedTitle = request.body.title.trim();
  const updatedImageUrl = request.body.imageUrl.trim();
  const updatedPrice = request.body.price.trim();
  const updatedDesc = request.body.description.trim();

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedDesc,
    updatedImageUrl,
    updatedPrice
  );

  updatedProduct.save();

  response.redirect("/admin/products");
};

exports.postDeleteProduct = (request, response, next) => {
  const prodId = request.body.productId;
  Product.delete(prodId);

  response.redirect("/admin/products");
};
