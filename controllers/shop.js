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
  gettingCart();
};
exports.postCart = (request, response, next) => {
  const productId = request.body.productId;
  Product.findByid(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  gettingCart();
};

exports.deleteCartProduct = (request, response, next) => {
  const productId = request.body.productId;
  Product.findByid(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
  });

  response.redirect("/cart");
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

function gettingCart() {
  Cart.getCart((cart) => {
    // Fetch all products
    Product.fetchAll((products) => {
      // Array to store cart products
      const cartProducts = [];

      // Iterate over all products
      for (let product of products) {
        // Find the corresponding product in the cart
        const cartProduct = cart.products.find(
          (prod) => prod.id === product.id
        );
        // If the product is in the cart, add it to the array
        if (cartProduct) {
          cartProducts.push({
            productData: product,
            quantity: cartProduct.quantity,
          });
        }
      }

      // Render the cart template, passing in the cart products
      response.render("shop/cart", {
        docTitle: "Your Cart 🛒",
        path: "/cart",
        cart: cartProducts,
      });
    });
  });
}
