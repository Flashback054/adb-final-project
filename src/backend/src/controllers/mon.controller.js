const MON = require("../models/mon.model");

exports.getAll = async (req, res, next) => {
	const { search } = req.query;
	if (search) {
		const mons = await MON.searchByTenMon(search);
		res.status(200).json({
			status: "success",
			data: mons,
		});
		return;
	}

	const mons = await MON.getAll();
	res.status(200).json({
		status: "success",
		data: mons,
	});
};

exports.getById = async (req, res, next) => {
	const { id } = req.params;
	const mon = await MON.getById(id);
	res.status(200).json({
		status: "success",
		data: mon,
	});
};

exports.create = async (req, res, next) => {
	const newMON = req.body;
	const mon = await MON.create(newMON);
	res.status(201).json({
		status: "success",
		data: mon,
	});
};

exports.update = async (req, res, next) => {
	const { id } = req.params;
	const newMON = req.body;
	const mon = await MON.update(id, newMON);
	res.status(200).json({
		status: "success",
		data: mon,
	});
};

exports.delete = async (req, res, next) => {
	const { id } = req.params;
	await MON.delete(id);
	res.status(204).json();
};
