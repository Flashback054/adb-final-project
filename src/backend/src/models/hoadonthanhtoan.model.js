const database = require("../database/database");

// CREATE TABLE [dbo].[HOADONTHANHTOAN](
// 	[MaHoaDon] [int] IDENTITY(1,1) NOT NULL,
// 	[TongTien] [decimal](18, 2) NOT NULL,
// 	[SoTienGiam] [decimal](18, 2) NOT NULL,
// 	[MaTheThanhVien] [int] NULL,
// 	[MaPhieu] [int] NOT NULL,

const HOADONTHANHTOAN = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM HOADONTHANHTOAN`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM HOADONTHANHTOAN WHERE MaHoaDon = @id`;
		return result.recordset[0];
	},
	create: async function (newHOADONTHANHTOAN) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("TongTien", newHOADONTHANHTOAN.TongTien)
			.input("SoTienGiam", newHOADONTHANHTOAN.SoTienGiam)
			.input("MaTheThanhVien", newHOADONTHANHTOAN.MaTheThanhVien)
			.input("MaPhieu", newHOADONTHANHTOAN.MaPhieu)
			.query`INSERT INTO HOADONTHANHTOAN (TongTien, SoTienGiam, MaTheThanhVien, MaPhieu) OUTPUT inserted.* VALUES (@TongTien, @SoTienGiam, @MaTheThanhVien, @MaPhieu)`;
		return result.recordset[0];
	},
	update: async function (id, newHOADONTHANHTOAN) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.input("TongTien", newHOADONTHANHTOAN.TongTien)
			.input("SoTienGiam", newHOADONTHANHTOAN.SoTienGiam)
			.input("MaTheThanhVien", newHOADONTHANHTOAN.MaTheThanhVien)
			.input("MaPhieu", newHOADONTHANHTOAN.MaPhieu)
			.query`UPDATE HOADONTHANHTOAN SET TongTien = @TongTien, SoTienGiam = @SoTienGiam, MaTheThanhVien = @MaTheThanhVien, MaPhieu = @MaPhieu WHERE MaHoaDon = @id RETURNING *`;
		return result.recordset[0];
	},
	delete: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`DELETE FROM HOADONTHANHTOAN WHERE MaHoaDon = @id`;
		return result.rowsAffected;
	},
};

module.exports = HOADONTHANHTOAN;
