const database = require("../database/database");
// KHACHHANG SCHEMA:
// CREATE TABLE [dbo].[KHACHHANG](
// 	[MaKhachHang] [int] IDENTITY(1,1) NOT NULL,
// 	[HoTen] [nvarchar](255) NOT NULL,
// 	[SDT] [varchar](15) NOT NULL,
// 	[Email] [nvarchar](255) NOT NULL,
// 	[GioiTinh] [nvarchar](10) NOT NULL,
// 	[CCCD] [nvarchar](12) NULL,
// 	[Duong] [nvarchar](100) NULL,
// 	[Phuong] [nvarchar](50) NULL,
// 	[Quan] [nvarchar](50) NULL,
// 	[ThanhPho] [nvarchar](50) NULL
// )

const KHACHHANG = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM KHACHHANG`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM KHACHHANG WHERE MaKhachHang = @id`;
		return result.recordset[0];
	},
	getByEmail: async function (email) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("email", email)
			.query`SELECT * FROM KHACHHANG WHERE Email = @email`;
		return result.recordset[0];
	},
	create: async function (newKHACHHANG) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("HoTen", newKHACHHANG.HoTen)
			.input("SDT", newKHACHHANG.SDT)
			.input("Email", newKHACHHANG.Email)
			.input("GioiTinh", newKHACHHANG.GioiTinh)
			.input("CCCD", newKHACHHANG.CCCD)
			.input("Duong", newKHACHHANG.Duong)
			.input("Phuong", newKHACHHANG.Phuong)
			.input("Quan", newKHACHHANG.Quan)
			.input("ThanhPho", newKHACHHANG.ThanhPho)
			.query`INSERT INTO KHACHHANG (HoTen, SDT, Email, GioiTinh, CCCD, Duong, Phuong, Quan, ThanhPho) OUTPUT inserted.* VALUES (@HoTen, @SDT, @Email, @GioiTinh, @CCCD, @Duong, @Phuong, @Quan, @ThanhPho)`;
		return result.recordset[0];
	},
	update: async function (id, KHACHHANG) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.input("HoTen", KHACHHANG.HoTen)
			.input("SDT", KHACHHANG.SDT)
			.input("Email", KHACHHANG.Email)
			.input("GioiTinh", KHACHHANG.GioiTinh)
			.input("CCCD", KHACHHANG.CCCD)
			.input("Duong", KHACHHANG.Duong)
			.input("Phuong", KHACHHANG.Phuong)
			.input("Quan", KHACHHANG.Quan)
			.input("ThanhPho", KHACHHANG.ThanhPho)
			.query`UPDATE KHACHHANG SET HoTen = @HoTen, SDT = @SDT, Email = @Email, GioiTinh = @GioiTinh, CCCD = @CCCD, Duong = @Duong, Phuong = @Phuong, Quan = @Quan, ThanhPho = @ThanhPho WHERE MaKhachHang = @id RETURNING *`;
		return result.recordset[0];
	},

	delete: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`DELETE FROM KHACHHANG WHERE MaKhachHang = @id`;
		return result;
	},
};

module.exports = KHACHHANG;
