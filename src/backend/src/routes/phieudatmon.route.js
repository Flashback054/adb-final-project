const phieuDatMonController = require("../controllers/phieudatmon.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");

const router = express.Router();

router.get("/", phieuDatMonController.getAll);
router.get("/:id", phieuDatMonController.getById);

// router.post("/datmon", phieuDatMonController.create);

module.exports = router;