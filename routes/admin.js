const express = require("express");
const path = require("path");

const adminProductsController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminProductsController.getAddProduct);

router.post("/add-product", adminProductsController.postAddProduct);

router.get("/products", adminProductsController.getProducts);

module.exports = router;
