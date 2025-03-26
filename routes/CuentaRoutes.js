const express = require("express");
const router = express.Router();
const CuentaController = require("../controllers/CuentaController");

router.get("/:id", CuentaController.getCuentaById); //id?
router.post("/CreateAccount", CuentaController.addCuenta);

router.put("/:id", CuentaController.updateCuenta); //id?
router.put("/cambiarEstado/:id", CuentaController.desactivarCuenta);

router.post("/:id/pref", CuentaController.agregarPreferencia);
router.put("/:id/pref", CuentaController.eliminarPreferencia);

router.post("/:id/imp", CuentaController.agregarImpedimento);
router.put("/:id/imp", CuentaController.eliminarImpedimento);

module.exports = router;