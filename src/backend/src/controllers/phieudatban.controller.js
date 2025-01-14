const PHIEUDATBAN = require("../models/phieudatban.model");
const PHIEUDATMON = require("../models/phieudatmon.model");

const convertJsDate = require("../utils/convertJsDate");

exports.getAll = async function (req, res) {
  const results = await PHIEUDATBAN.getAll();
  res.status(200).json({
    status: "success",
    data: results,
  });
};

exports.getById = async function (req, res) {
  const { id } = req.params;
  const result = await PHIEUDATBAN.getById(id);
  res.status(200).json({
    status: "success",
    data: result,
  });
};

exports.getAllByKhachHang = async function (req, res) {
  const { id } = req.params;
  const results = await PHIEUDATBAN.getAllByMaKhachHang(id);
  res.status(200).json({
    status: "success",
    data: results,
  });
};

exports.getAllByChiNhanh = async function (req, res) {
	const { id } = req.params;
	const page = req.query.page || 1;
	const limit = req.query.limit || 30;

	const results = await PHIEUDATBAN.getAllByMaChiNhanh(id, page, limit);
	res.status(200).json({
		status: "success",
		data: results,
	});
};

exports.create = async function (req, res) {
  let {
    MaChiNhanh,
    MaKhachHang,
    LoaiPhieu,
    SoBan,
    SoLuongKhach,
    NgayDat,
    GioDen,
    GhiChu,
    LoaiPhieuDatBan,
    MaNVDatBan,
  } = req.body;

  if (!LoaiPhieu) {
    LoaiPhieu = "DB";
  }
  if (!LoaiPhieuDatBan) {
    LoaiPhieuDatBan = "TT";
  }

  const newPhieuDatMon = {
    NgayLap: NgayDat,
    LoaiPhieu,
    MaChiNhanh,
    MaKhachHang,
  };

  const phieuDatMonResult = await PHIEUDATMON.create(newPhieuDatMon);
  const newPhieuDatBan = await PHIEUDATBAN.create({
    MaPhieuDatBan: phieuDatMonResult.MaPhieu,
    SoBan,
    SoLuongKhach,
    NgayDat,
    GioDen: GioDen ? convertJsDate.jsdateToSqlTime(GioDen) : null,
    GhiChu,
    LoaiPhieuDatBan,
    MaNVDatBan,
  });

  res.status(201).json({
    status: "success",
    data: newPhieuDatBan,
  });
};

exports.checkTaiKhoanDatBan = async function (req, res, next) {
  const loaiTaiKhoan = req.taiKhoan.LoaiTaiKhoan;
  if (loaiTaiKhoan === "KH") {
    req.body.MaKhachHang = req.taiKhoan.MaNguoiDung;
    req.query.MaKhachHang = req.taiKhoan.MaNguoiDung;
    next();
    return;
  } else if (loaiTaiKhoan === "NV") {
    req.body.MaNVDatBan = req.taiKhoan.MaNguoiDung;
    next();
    return;
  }

  next();
};
