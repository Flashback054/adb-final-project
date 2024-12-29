const express = require("express");
const phieuDatBanController = require("../controllers/phieudatban.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/:id", phieuDatBanController.getById);
router.get("/khachhang/:id", phieuDatBanController.getAllByKhachHang);
router.post(
  "/datban",
  authController.protect,
  phieuDatBanController.checkTaiKhoanDatBan,
  phieuDatBanController.create
);

module.exports = router;
