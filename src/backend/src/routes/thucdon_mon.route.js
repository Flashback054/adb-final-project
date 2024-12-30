const thucdonMonController = require("../controllers/thucdon_mon.controller");
const express = require("express");

const router = express.Router();

router.get("/", thucdonMonController.getAll);
router.get("/:MaThucDon/:MaMon", thucdonMonController.getById);
router.post("/", thucdonMonController.addMonToThucDon);
// router.post("/", thucdonMonController.create);
router.put("/:MaThucDon/:MaMon", thucdonMonController.update);
router.patch("/:MaThucDon/:MaMon", thucdonMonController.updateMonStatuses);
router.delete("/:MaThucDon/:MaMon", thucdonMonController.delete);

router.get("/:MaThucDon", thucdonMonController.getAllByMaThucDon);

module.exports = router;
