const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/ProductoController");

router.get("/:id", ProductoController.getProductoById);
router.post("/CreateProduct", ProductoController.addProducto);

module.exports=router;