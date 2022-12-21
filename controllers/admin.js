const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (request, response, next) => {
  response.render("admin/edit-product", {
    docTitle: "Add-Product",
    path: "/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (request, response, next) => {
  const title = request.body.title;
  const description = request.body.description;
  const imageUrl = request.body.imageUrl;
  const price = request.body.price;

  try {
    const result = await request.user.createProduct({
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    });
    if (result) {
      response.redirect("/admin/products");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.getProducts = async (request, response, next) => {
  try {
    const products = await request.user.getProducts();
    response.render("admin/products", {
      prods: products,
      docTitle: "Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = async (request, response, next) => {
  let editMode = request.query.edit;
  const prodId = request.params.productId;
  if (!editMode) {
    return response.redirect("/");
  }

  editMode = editMode === "true";
  try {
    const products = await request.user.getProducts({ where: { id: prodId } });
    if (!products) {
      response.redirect("/");
    }
    response.render("admin/edit-product", {
      docTitle: "Edit Product 📝",
      path: "/edit-product",
      editing: editMode,
      product: products[0],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = async (request, response, next) => {
  const prodId = request.body.productId.trim();
  const updatedTitle = request.body.title.trim();
  const updatedImageUrl = request.body.imageUrl.trim();
  const updatedPrice = request.body.price.trim();
  const updatedDesc = request.body.description.trim();
  try {
    const currentProduct = await Product.findByPk(prodId);
    currentProduct.title = updatedTitle;
    currentProduct.description = updatedDesc;
    currentProduct.price = updatedPrice;
    currentProduct, (imageUrl = updatedImageUrl);
    const res = await currentProduct.save();
    if (res) {
      response.redirect("/admin/products");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (request, response, next) => {
  const prodId = request.body.productId;
  try {
    const currentProduct = await Product.findByPk(prodId);
    const result = await currentProduct.destroy();

    if (result) {
      response.redirect("/admin/products");
    }
  } catch (error) {
    console.log(error);
  }
};
