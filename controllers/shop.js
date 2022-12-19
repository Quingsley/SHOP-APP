const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop/index", {
      products: products,
      docTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (request, response, next) => {
  response.render("shop/cart", {
    docTitle: "Your Cart 🛒",
    path: "/cart",
  });
};

exports.postCart = (request, response, next) => {
  const productId = request.body.productId;

  console.log(productId);

  Product.findByid(productId, (product) => {
    console.log(product);
    Cart.addProduct(productId, product.price);
  });
  response.render("shop/cart", { docTitle: "Your Cart 🛒", path: "/cart" });
};

exports.getOrders = (request, response, next) => {
  response.render("shop/orders", {
    docTitle: "Orders",
    path: "/orders",
  });
};

exports.getCheckout = (request, response, next) => {
  response.render("shop/checkout", {
    docTitle: "Your Checkout",
    path: "/checkout",
  });
};

exports.getProductsDetail = (request, response, next) => {
  const prodId = request.params.productId;
  Product.findByid(prodId, (product) => {
    response.render("shop/product-detail", {
      docTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};
