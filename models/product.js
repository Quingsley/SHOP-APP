const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const rootDir = require("../utils/path");

// products = [];
const p = path.join(rootDir, "data", "products.json");

const getProductFromFile = (callBack) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callBack([]);
    }
    return callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, description, imageUrl, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id == this.id
        );

        let updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) =>
          console.log(err)
        );
      } else {
        const randomId = Math.floor(Math.random() * 1000) + 1;
        this.id = randomId.toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
      }
    });
  }

  static delete(id) {
    if (!id) {
      return;
    }
    getProductFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const existingProductIndex = products.findIndex((prod) => prod.id === id);
      const updatedProductList = [...products];
      updatedProductList.splice(existingProductIndex, 1);
      fs.writeFile(p, JSON.stringify(updatedProductList), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
        console.log(err);
      });
    });
  }

  static findByid(id, cb) {
    getProductFromFile((product) => {
      const currentProduct = product.find((p) => p.id === id);

      return cb(currentProduct);
    });
  }

  static fetchAll(callBack) {
    getProductFromFile(callBack);
  }
};
