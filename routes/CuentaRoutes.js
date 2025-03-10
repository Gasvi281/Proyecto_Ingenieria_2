const express = require("express");
const router = express.Router();
const CuentaController = require("../controller/CuentaController");

router.get("/", CuentaController.getCuentaById); //id?
router.post("/CreateAccount", CuentaController.addCuenta);

router.put("/", CuentaController.updateCuenta); //id?
router.post("/", CuentaController.deleteCuenta);

module.exports = router;