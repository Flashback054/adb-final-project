const MonController = require("../controllers/mon.controller");
const AuthController = require("../controllers/auth.controller");
const express = require("express");

const router = express.Router();

router.get("/", MonController.getAll);
router.get("/:id", MonController.getById);

router.use(AuthController.protect, AuthController.restrictTo("NV"));
router.post("/", MonController.create);
router.put("/:id", MonController.update);
router.delete("/:id", MonController.delete);

module.exports = router;
