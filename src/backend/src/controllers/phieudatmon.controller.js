const PHIEUDATMON = require("../models/phieudatmon.model");
const PHIEUDATMON_MON = require("../models/phieudatmon_mon.model");

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

exports.getAllByKhachHang = async function (req, res) {
	const { id } = req.params;
	const results = await PHIEUDATMON.getAllByMaKhachHang(id);
	res.status(200).json({
		status: "success",
		data: results,
	});
};

exports.datMon = async function (req, res) {
	const { MaPhieu, Mon } = req.body;

	// Mon is an array of objects of (MaMon, SoLuong, Gia)
	const phieuDatMonMon = Mon.map((mon) => {
		return {
			MaPhieu,
			MaMon: mon.MaMon,
			SoLuong: mon.SoLuong,
			Gia: mon.Gia,
		};
	});

	const results = await PHIEUDATMON_MON.createMany(phieuDatMonMon);
	res.status(201).json({
		status: "success",
		data: results,
	});
};
