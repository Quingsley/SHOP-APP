const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    // fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //analysing the cart to find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };

        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        //Adding new product and increasing quantity
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return;
      let cart = { ...JSON.parse(fileContent) };

      const product = cart.products.find((prod) => prod.id === id);
      if (!product) return;
      const productQty = product.quantity;

      cart.products = cart.products.filter((prod) => prod.id !== id);
      cart.totalPrice = cart.totalPrice - price * productQty;

      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static getCart(callBack) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return callBack(null);
      return callBack(JSON.parse(fileContent));
    });
  }
};
