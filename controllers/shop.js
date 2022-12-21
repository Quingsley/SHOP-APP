const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (request, response, next) => {
  try {
    const products = await Product.findAll();
    if (products) {
      response.render("shop/product-list", {
        prods: products,
        docTitle: "All Products",
        path: "/products",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = async (request, response, next) => {
  try {
    const products = await Product.findAll();
    if (products) {
      response.render("shop/index", {
        products: products,
        docTitle: "SHOP 🏪",
        path: "/",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = (request, response, next) => {
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
};
exports.postCart = (request, response, next) => {
  const productId = request.body.productId;
  Product.findByid(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  response.redirect("/cart");
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

exports.getProductsDetail = async (request, response, next) => {
  const prodId = request.params.productId;
  try {
    const product = await Product.findByPk(prodId);
    response.render("shop/product-detail", {
      docTitle: product.dataValues.title,
      path: "/products",
      product: product.dataValues,
    });
  } catch (error) {
    console.log(error);
  }
};
