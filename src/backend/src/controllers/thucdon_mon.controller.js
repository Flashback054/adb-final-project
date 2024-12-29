const THUCDON_MON = require("../models/thucdon_mon.model");

exports.getAll = async function (req, res) {
	const results = await THUCDON_MON.getAll();
	res.status(200).json({
		status: "success",
		data: results,
	});
};

exports.getAllByMaThucDon = async function (req, res) {
	const { exclude } = req.query;
	const { MaThucDon } = req.params;

	if (exclude) {
		const results = await THUCDON_MON.getMonsNotInThucDon(MaThucDon);
		res.status(200).json({
			status: "success",
			data: results,
		});
		return;
	}

	const results = await THUCDON_MON.getAllByMaThucDon(MaThucDon);
	res.status(200).json({
		status: "success",
		data: results,
	});
};

exports.getById = async function (req, res) {
	const { MaThucDon, MaMon } = req.params;
	const result = await THUCDON_MON.getById(MaThucDon, MaMon);
	res.status(200).json({
		status: "success",
		data: result,
	});
};

exports.create = async function (req, res) {
	const newTHUCDON_MON = req.body;
	const result = await THUCDON_MON.create(newTHUCDON_MON);
	res.status(201).json({
		status: "success",
		data: result,
	});
};

exports.update = async function (req, res) {
	const { MaThucDon, MaMon } = req.params;
	const newTHUCDON_MON = req.body;
	const result = await THUCDON_MON.update(MaThucDon, MaMon, newTHUCDON_MON);
	console.log({ result });
	res.status(200).json({
		status: "success",
		data: result,
	});
};

exports.delete = async function (req, res) {
	const { MaThucDon, MaMon } = req.params;
	await THUCDON_MON.delete(MaThucDon, MaMon);
	res.status(204).json();
};

exports.updateMonStatuses = async function (req, res) {
	const { MaThucDon, MaMon } = req.params;
	const { CoPhucVuKhong, CoGiaoHangKhong } = req.body;
	const result = await THUCDON_MON.updateMonStatuses(
		MaThucDon,
		MaMon,
		CoPhucVuKhong,
		CoGiaoHangKhong
	);
	res.status(200).json({
		status: "success",
		data: result,
	});
};

exports.addMonToThucDon = async function (req, res) {
	const { MaThucDon, MaMon } = req.body;

	// Check if MaThucDon, MaMon existed
	const thucdon = await THUCDON_MON.getById(MaThucDon, MaMon);
	if (thucdon) {
		res.status(400).json({
			status: "fail",
			message: "Thực đơn đã chứa món ăn này",
		});
		return;
	}

	const result = await THUCDON_MON.addMonToThucDon(MaThucDon, MaMon);
	res.status(200).json({
		status: "success",
		data: result,
	});
};
