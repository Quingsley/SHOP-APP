const express = require("express");
const path = require("path");

const shopProductsController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopProductsController.getIndex);
router.get(
  "/product-detail/:productId",
  shopProductsController.getProductsDetail
);
router.get("/cart", shopProductsController.getCart);
router.post("/cart", shopProductsController.postCart);
router.get("/orders", shopProductsController.getOrders);
router.get("/products", shopProductsController.getProducts);
router.get("/checkout", shopProductsController.getCheckout);

module.exports = router;
