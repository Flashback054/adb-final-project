const STATISTIC = require("../models/statistic.model");

exports.getRevenueStatistic = async function (req, res) {
  const { period } = req.query;
  console.log("period, ", period);
  console.log(period);
  if (
    !period ||
    (period !== "30days" && period !== "12months" && period !== "10years")
  ) {
    res.status(400).json({
      status: "fail",
      message:
        "Invalid period. Period must be one of 30days, 12months, 10years",
    });
    return;
  }

  const results = await STATISTIC.getRevenueStatistic(period);
  res.status(200).json({
    status: "success",
    data: results,
  });
};

exports.getDishStatistic = async function (req, res) {
  const { period } = req.query;
  if (
    !period ||
    (period !== "30days" && period !== "12months" && period !== "10years")
  ) {
    res.status(400).json({
      status: "fail",
      message:
        "Invalid period. Period must be one of 30days, 12months, 10years",
    });
    return;
  }

  const results = await STATISTIC.getDishStatistic(period);
  res.status(200).json({
    status: "success",
    data: results,
  });
};

exports.getEmployeeStatistic = async function (req, res) {
  const { period } = req.query;
  if (
    !period ||
    (period !== "30days" && period !== "12months" && period !== "10years")
  ) {
    res.status(400).json({
      status: "fail",
      message:
        "Invalid period. Period must be one of 30days, 12months, 10years",
    });
    return;
  }

  const results = await STATISTIC.getEmployeeStatistic(period);
  res.status(200).json({
    status: "success",
    data: results,
  });
};
