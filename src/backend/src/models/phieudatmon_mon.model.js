const database = require("../database/database");
// CREATE TABLE [dbo].[PHIEUDATMON](
// 	[MaPhieu] [int] IDENTITY(1,1) NOT NULL,
// 	[NgayLap] [date] NOT NULL,
// 	[LoaiPhieu] [nvarchar](2) NOT NULL,
// 	[MaChiNhanh] [int] NOT NULL,
// 	[MaKhachHang] [int] NULL,

const PHIEUDATMON = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM PHIEUDATMON`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM PHIEUDATMON WHERE MaPhieu = @id`;
		return result.recordset[0];
	},
	create: async function (newPHIEUDATMON) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("NgayLap", newPHIEUDATMON.NgayLap)
			.input("LoaiPhieu", newPHIEUDATMON.LoaiPhieu)
			.input("MaChiNhanh", newPHIEUDATMON.MaChiNhanh)
			.input("MaKhachHang", newPHIEUDATMON.MaKhachHang)
			.query`INSERT INTO PHIEUDATMON (NgayLap, LoaiPhieu, MaChiNhanh, MaKhachHang) OUTPUT inserted.* VALUES (@NgayLap, @LoaiPhieu, @MaChiNhanh, @MaKhachHang)`;
		return result.recordset[0];
	},
	createMany: async function (newPHIEUDATMON) {},

	update: async function (id, newPHIEUDATMON) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.input("NgayLap", newPHIEUDATMON.NgayLap)
			.input("LoaiPhieu", newPHIEUDATMON.LoaiPhieu)
			.input("MaChiNhanh", newPHIEUDATMON.MaChiNhanh)
			.input("MaKhachHang", newPHIEUDATMON.MaKhachHang)
			.query`UPDATE PHIEUDATMON SET NgayLap = @NgayLap, LoaiPhieu = @LoaiPhieu, MaChiNhanh = @MaChiNhanh, MaKhachHang = @MaKhachHang WHERE MaPhieu = @id RETURNING *`;
		return result.recordset[0];
	},
	delete: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`DELETE FROM PHIEUDATMON WHERE MaPhieu = @id`;
		return result.rowsAffected;
	},
};

module.exports = PHIEUDATMON;
