const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

products = [];
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
  title;
  constructor(title, description, imageUrl, price) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }

  save() {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    this.id = randomId.toString();
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
    });
  }

  static findByid(id, cb) {
    getProductFromFile((product) => {
      // console.log(id);
      // console.log(product);
      const currentProduct = product.find((p) => p.id === id);
      // console.log(currentProduct);
      return cb(currentProduct);
    });
  }

  static fetchAll(callBack) {
    getProductFromFile(callBack);
  }
};
