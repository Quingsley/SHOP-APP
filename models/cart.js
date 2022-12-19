const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    // fetch previous cart
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        let cart = { products: [], totalPrice: 0 };
        cart = JSON.parse(fileContent);
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
      }
    });
  }
};
