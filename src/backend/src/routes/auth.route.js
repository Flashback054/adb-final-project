const express = require("express");

const authController = require("../controllers/auth.controller");
// const userController = require("../controllers/user.controller");
const { validateRequest } = require("../middlewares/validateRequest");
const loginSchema = require("../schemas/auth/login.schema");
const signupKhachHangSchema = require("../schemas/auth/signup.KhachHang.schema");

const router = express.Router();

router.post(
	"/signup/khachhang",
	validateRequest(signupKhachHangSchema),
	authController.signupKH
);
router.post("/signup/nhanvien", authController.signupNV);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/logout", authController.logout);

router.get("/me", authController.protect, authController.getMe);

// router.use(authController.protect);
// router.get("/me", userController.getMe, userController.getUser);
// router.patch(
// 	"/me",
// 	userController.uploadUserPhoto,
// 	userController.resizeUserPhoto,
// 	userController.updateMe
// );
// router.delete("/me", authController.passwordConfirm, userController.deleteMe);

// router.patch(
// 	"/update-password",
// 	validateRequest(updatePasswordSchema),
// 	authController.updatePassword
// );

module.exports = router;
