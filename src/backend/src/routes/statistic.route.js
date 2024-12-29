const express = require("express");
const statisticController = require("../controllers/statistic.controller");

const router = express.Router();

router.get("/revenue", statisticController.getRevenueStatistic);
router.get("/dish", statisticController.getDishStatistic);
router.get("/employee", statisticController.getEmployeeStatistic);

module.exports = router;
