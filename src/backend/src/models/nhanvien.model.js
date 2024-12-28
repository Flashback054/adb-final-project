const database = require("../database/database");

// NHANVIEN SCHEMA:
// CREATE TABLE [dbo].[NHANVIEN](
// 	[MaNhanVien] [int] IDENTITY(1,1) NOT NULL,
// 	[HoTen] [nvarchar](255) NOT NULL,
// 	[NgaySinh] [date] NOT NULL,
// 	[GioiTinh] [nvarchar](10) NOT NULL,
// 	[Luong] [decimal](18, 2) NOT NULL,
// 	[NgayVaoLam] [date] NOT NULL,
// 	[NgayNghiViec] [date] NULL,
// 	[SDT] [varchar](15) NOT NULL,
// 	[Duong] [nvarchar](100) NOT NULL,
// 	[Phuong] [nvarchar](50) NOT NULL,
// 	[Quan] [nvarchar](50) NOT NULL,
// 	[ThanhPho] [nvarchar](50) NOT NULL,
// 	[MaBoPhan] [int] NOT NULL
// )

const NHANVIEN = {
	getAll: async function () {
		const pool = await database.poolPromise;
		const result = await pool.request().query`SELECT * FROM NHANVIEN`;
		return result.recordset;
	},
	getById: async function (id) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("id", id)
			.query`SELECT * FROM NHANVIEN WHERE MaNhanVien = @id`;
		return result.recordset[0];
	},
	getBySDT: async function (sdt) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("sdt", sdt)
			.query`SELECT * FROM NHANVIEN WHERE SDT = @sdt`;
		return result.recordset[0];
	},
	create: async function (newNHANVIEN) {
		const pool = await database.poolPromise;
		const result = await pool
			.request()
			.input("HoTen", newNHANVIEN.HoTen)
			.input("NgaySinh", newNHANVIEN.NgaySinh)
			.input("GioiTinh", newNHANVIEN.GioiTinh)
			.input("Luong", newNHANVIEN.Luong)
			.input("NgayVaoLam", newNHANVIEN.NgayVaoLam)
			.input("NgayNghiViec", newNHANVIEN.NgayNghiViec)
			.input("SDT", newNHANVIEN.SDT)
			.input("Duong", newNHANVIEN.Duong)
			.input("Phuong", newNHANVIEN.Phuong)
			.input("Quan", newNHANVIEN.Quan)
			.input("ThanhPho", newNHANVIEN.ThanhPho)
			.input("MaBoPhan", newNHANVIEN.MaBoPhan)
			.query`INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, Luong, NgayVaoLam, NgayNghiViec, SDT, Duong, Phuong, Quan, ThanhPho, MaBoPhan) OUTPUT inserted.* VALUES (@HoTen, @NgaySinh, @GioiTinh, @Luong,
      @NgayVaoLam, @NgayNghiViec, @SDT, @Duong, @Phuong, @Quan, @ThanhPho, @MaBoPhan)`;
		return result.recordset[0];
	},
};

module.exports = NHANVIEN;
