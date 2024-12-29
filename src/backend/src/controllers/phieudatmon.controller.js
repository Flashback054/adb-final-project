const PHIEUDATMON = require("../models/phieudatmon.model");

exports.getAll = async function (req, res) {
	const results = await PHIEUDATMON.getAll();
	res.status(200).json({
		status: "success",
		data: results,
	});
};

exports.getById = async function (req, res) {
	const { id } = req.params;
	const result = await PHIEUDATMON.getById(id);
	res.status(200).json({
		status: "success",
		data: result,
	});
};
