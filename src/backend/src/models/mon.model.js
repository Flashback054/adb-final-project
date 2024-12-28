const database = require("../database/database");

//Above is sample, now create MON model with the following schema:
// CREATE TABLE [dbo].[MON](
// 	[MaMon] [int] IDENTITY(1,1) NOT NULL,
// 	[TenMon] [nvarchar](255) NOT NULL,
// 	[GiaHienTai] [decimal](18, 2) NOT NULL,
// 	[DanhMuc] [nvarchar](100) NOT NULL,
// 	[HinhAnh] [varchar](255) NULL,
// 	[MoTa] [nvarchar](1000) NULL
// )

const MON = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM MON`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM MON WHERE MaMon = @id`;
		return result.recordset[0];
	},
	create: async function (newMON) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("TenMon", newMON.TenMon)
			.input("GiaHienTai", newMON.GiaHienTai)
			.input("DanhMuc", newMON.DanhMuc)
			.input("HinhAnh", newMON.HinhAnh)
			.input("MoTa", newMON.MoTa)
			.query`INSERT INTO MON (TenMon, GiaHienTai, DanhMuc, HinhAnh, MoTa) OUTPUT inserted.* VALUES (@TenMon, @GiaHienTai, @DanhMuc, @HinhAnh, @MoTa)`;
		return result.recordset[0];
	},
	update: async function (id, newMON) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.input("TenMon", newMON.TenMon)
			.input("GiaHienTai", newMON.GiaHienTai)
			.input("DanhMuc", newMON.DanhMuc)
			.input("HinhAnh", newMON.HinhAnh)
			.input("MoTa", newMON.MoTa)
			.query`UPDATE MON SET TenMon = @TenMon, GiaHienTai = @GiaHienTai, DanhMuc = @DanhMuc, HinhAnh = @HinhAnh, MoTa = @MoTa WHERE MaMon = @id RETURNING *`;
		return result.recordset[0];
	},
	delete: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`DELETE FROM MON WHERE MaMon = @id`;
		return result.rowsAffected;
	},

	searchByTenMon: async function (tenMon) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("tenMon", tenMon)
			.query`SELECT * FROM MON WHERE TenMon LIKE '%'+@tenMon+'%'`;
		return result.recordsets;
	},
};

module.exports = MON;
