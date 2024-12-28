const database = require("../database/database");

// CREATE TABLE [dbo].[CHINHANH](
// 	[MaChiNhanh] [int] IDENTITY(1,1) NOT NULL,
// 	[TenChiNhanh] [nvarchar](255) NOT NULL,
// 	[DiaChi] [nvarchar](255) NOT NULL,
// 	[GioMoCua] [time](7) NOT NULL,
// 	[GioDongCua] [time](7) NOT NULL,
// 	[BaiXeMay] [bit] NOT NULL,
// 	[BaiOTo] [bit] NOT NULL,
// 	[MaNVQuanLy] [int] NULL,

const CHINHANH = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM CHINHANH`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM CHINHANH WHERE MaChiNhanh = @id`;
		return result.recordset[0];
	},
	create: async function (newCHINHANH) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("TenChiNhanh", newCHINHANH.TenChiNhanh)
			.input("DiaChi", newCHINHANH.DiaChi)
			.input("GioMoCua", newCHINHANH.GioMoCua)
			.input("GioDongCua", newCHINHANH.GioDongCua)
			.input("BaiXeMay", newCHINHANH.BaiXeMay)
			.input("BaiOTo", newCHINHANH.BaiOTo)
			.input("MaNVQuanLy", newCHINHANH.MaNVQuanLy)
			.query`INSERT INTO CHINHANH (TenChiNhanh, DiaChi, GioMoCua, GioDongCua, BaiXeMay, BaiOTo, MaNVQuanLy) OUTPUT inserted.* VALUES (@TenChiNhanh, @DiaChi, @GioMoCua, @GioDongCua, @BaiXeMay, @BaiOTo, @MaNVQuanLy)`;
		return result.recordset[0];
	},
	update: async function (id, newCHINHANH) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.input("TenChiNhanh", newCHINHANH.TenChiNhanh)
			.input("DiaChi", newCHINHANH.DiaChi)
			.input("GioMoCua", newCHINHANH.GioMoCua)
			.input("GioDongCua", newCHINHANH.GioDongCua)
			.input("BaiXeMay", newCHINHANH.BaiXeMay)
			.input("BaiOTo", newCHINHANH.BaiOTo)
			.input("MaNVQuanLy", newCHINHANH.MaNVQuanLy)
			.query`UPDATE CHINHANH SET TenChiNhanh = @TenChiNhanh, DiaChi = @DiaChi, GioMoCua = @GioMoCua, GioDongCua = @GioDongCua, BaiXeMay = @BaiXeMay, BaiOTo = @BaiOTo, MaNVQuanLy = @MaNVQuanLy WHERE MaChiNhanh = @id RETURNING *`;
		return result.recordset[0];
	},
	delete: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`DELETE FROM CHINHANH WHERE MaChiNhanh = @id`;
		return result.rowsAffected;
	},
};

module.exports = CHINHANH;
