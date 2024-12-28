const database = require("../database/database");

// CREATE TABLE [dbo].[PHIEUDATBAN](
// 	[MaPhieuDatBan] [int] NOT NULL,
// 	[SoBan] [int] NOT NULL,
// 	[SoLuongKhach] [int] NULL,
// 	[NgayDat] [date] NULL,
// 	[GioDen] [time](7) NULL,
// 	[GhiChu] [nvarchar](255) NULL,
// 	[LoaiPhieuDatBan] [nvarchar](2) NOT NULL,
// 	[MaNVDatBan] [int] NULL,

const PHIEUDATBAN = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM PHIEUDATBAN`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM PHIEUDATBAN WHERE MaPhieuDatBan = @id`;
		return result.recordset[0];
	},
	create: async function (newPHIEUDATBAN) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("MaPhieuDatBan", newPHIEUDATBAN.MaPhieuDatBan)
			.input("SoBan", newPHIEUDATBAN.SoBan)
			.input("SoLuongKhach", newPHIEUDATBAN.SoLuongKhach)
			.input("NgayDat", newPHIEUDATBAN.NgayDat)
			.input("GioDen", newPHIEUDATBAN.GioDen)
			.input("GhiChu", newPHIEUDATBAN.GhiChu)
			.input("LoaiPhieuDatBan", newPHIEUDATBAN.LoaiPhieuDatBan)
			.input("MaNVDatBan", newPHIEUDATBAN.MaNVDatBan)
			.query`INSERT INTO PHIEUDATBAN (MaPhieuDatBan, SoBan, SoLuongKhach, NgayDat, GioDen, GhiChu, LoaiPhieuDatBan, MaNVDatBan) OUTPUT inserted.* VALUES (@MaPhieuDatBan, @SoBan, @SoLuongKhach, @NgayDat, @GioDen, @GhiChu, @LoaiPhieuDatBan, @MaNVDatBan)`;
		return result.recordset[0];
	},
	update: async function (id, newPHIEUDATBAN) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.input("MaPhieuDatBan", newPHIEUDATBAN.MaPhieuDatBan)
			.input("SoBan", newPHIEUDATBAN.SoBan)
			.input("SoLuongKhach", newPHIEUDATBAN.SoLuongKhach)
			.input("NgayDat", newPHIEUDATBAN.NgayDat)
			.input("GioDen", newPHIEUDATBAN.GioDen)
			.input("GhiChu", newPHIEUDATBAN.GhiChu)
			.input("LoaiPhieuDatBan", newPHIEUDATBAN.LoaiPhieuDatBan)
			.input("MaNVDatBan", newPHIEUDATBAN.MaNVDatBan)
			.query`UPDATE PHIEUDATBAN SET MaPhieuDatBan = @MaPhieuDatBan, SoBan = @SoBan, SoLuongKhach = @SoLuongKhach, NgayDat = @NgayDat, GioDen = @GioDen, GhiChu = @GhiChu, LoaiPhieuDatBan = @LoaiPhieuDatBan, MaNVDatBan = @MaNVDatBan WHERE MaPhieuDatBan = @id RETURNING *`;
		return result.recordset[0];
	},
	delete: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`DELETE FROM PHIEUDATBAN WHERE MaPhieuDatBan = @id`;
		return result.rowsAffected;
	},
};

module.exports = PHIEUDATBAN;
