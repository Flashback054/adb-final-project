const database = require("../database/database");

// TAIKHOAN SCHEMA:
// CREATE TABLE [dbo].[TAIKHOAN](
// 	[MaTaiKhoan] [int] IDENTITY(1,1) NOT NULL,
// 	[TenDangNhap] [nvarchar](50) NOT NULL,
// 	[MatKhau] [nvarchar](255) NOT NULL,
// 	[LoaiTaiKhoan] [nvarchar](10) NOT NULL,
// 	[MaNguoiDung] [int] NOT NULL
// )

const TAIKHOAN = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM TAIKHOAN`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM TAIKHOAN WHERE MaTaiKhoan = @id`;
		return result.recordset[0];
	},
	getByTenDangNhap: async function (username) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("username", username)
			.query`SELECT * FROM TAIKHOAN WHERE TenDangNhap = @username`;
		return result.recordset[0];
	},
	create: async function (newTAIKHOAN) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("TenDangNhap", newTAIKHOAN.TenDangNhap)
			.input("MatKhau", newTAIKHOAN.MatKhau)
			.input("LoaiTaiKhoan", newTAIKHOAN.LoaiTaiKhoan)
			.input("MaNguoiDung", newTAIKHOAN.MaNguoiDung)
			.query`INSERT INTO TAIKHOAN (TenDangNhap, MatKhau, LoaiTaiKhoan, MaNguoiDung) OUTPUT inserted.* VALUES (@TenDangNhap, @MatKhau, @LoaiTaiKhoan, @MaNguoiDung)`;
		return result.recordset[0];
	},
	update: async function (id, TAIKHOAN) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.input("TenDangNhap", TAIKHOAN.TenDangNhap)
			.input("MatKhau", TAIKHOAN.MatKhau)
			.input("LoaiTaiKhoan", TAIKHOAN.LoaiTaiKhoan)
			.input("MaNguoiDung", TAIKHOAN.MaNguoiDung)
			.query`UPDATE TAIKHOAN SET TenDangNhap = @TenDangNhap, MatKhau = @MatKhau, LoaiTaiKhoan = @LoaiTaiKhoan, MaNguoiDung = @MaNguoiDung WHERE MaTaiKhoan = @id`;
		return this.getById(id);
	},

	delete: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`DELETE FROM TAIKHOAN WHERE MaTaiKhoan = @id`;
		return result.recordset[0];
	},
};

module.exports = TAIKHOAN;
