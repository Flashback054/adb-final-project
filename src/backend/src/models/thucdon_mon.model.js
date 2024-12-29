const database = require("../database/database");

// CREATE TABLE [dbo].[THUCDON_MON](
// 	[MaThucDon] [int] NOT NULL,
// 	[MaMon] [int] NOT NULL,
// 	[CoPhucVuKhong] [bit] NOT NULL,
// 	[CoGiaoHangKhong] [bit] NOT NULL,

const THUCDON_MON = {
  getAll: async function () {
    const pool = await database.poolPromise;
    const result = await pool.request()
      .query`SELECT MaThucDon, MON.* FROM THUCDON_MON JOIN MON ON THUCDON_MON.MaMon = MON.MaMon`;
    return result.recordset;
  },
  getAllByMaThucDon: async function (MaThucDon) {
    const pool = await database.poolPromise;
    const result = await pool.request().input("MaThucDon", MaThucDon)
      .query`SELECT MaThucDon, MON.* FROM THUCDON_MON JOIN MON ON THUCDON_MON.MaMon = MON.MaMon WHERE MaThucDon = @MaThucDon`;
    return result.recordset;
  },
  getById: async function (MaThucDon, MaMon) {
    const pool = await database.poolPromise;
    const result = await pool
      .request()
      .input("MaThucDon", MaThucDon)
      .input("MaMon", MaMon)
      .query`SELECT MaThucDon, MON.* FROM THUCDON_MON JOIN MON ON THUCDON_MON.MaMon = MON.MaMon WHERE MaThucDon = @MaThucDon AND THUCDON_MON.MaMon = @MaMon`;
    return result.recordset[0];
  },
  create: async function (newTHUCDON_MON) {
    const pool = await database.poolPromise;
    const result = await pool
      .request()
      .input("MaThucDon", newTHUCDON_MON.MaThucDon)
      .input("MaMon", newTHUCDON_MON.MaMon)
      .input("CoPhucVuKhong", newTHUCDON_MON.CoPhucVuKhong)
      .input("CoGiaoHangKhong", newTHUCDON_MON.CoGiaoHangKhong)
      .query`INSERT INTO THUCDON_MON (MaThucDon, MaMon, CoPhucVuKhong, CoGiaoHangKhong) OUTPUT inserted.* VALUES (@MaThucDon, @MaMon, @CoPhucVuKhong, @CoGiaoHangKhong)`;
    return result.recordset[0];
  },
  update: async function (MaThucDon, MaMon, newTHUCDON_MON) {
    const pool = await database.poolPromise;
    const result = await pool
      .request()
      .input("MaThucDon", MaThucDon)
      .input("MaMon", MaMon)
      .input("CoPhucVuKhong", newTHUCDON_MON.CoPhucVuKhong)
      .input("CoGiaoHangKhong", newTHUCDON_MON.CoGiaoHangKhong)
      .query`UPDATE THUCDON_MON SET CoPhucVuKhong = @CoPhucVuKhong, CoGiaoHangKhong = @CoGiaoHangKhong WHERE MaThucDon = @MaThucDon AND MaMon = @MaMon`;
    return result.rowsAffected;
  },
  delete: async function (MaThucDon, MaMon) {
    const pool = await database.poolPromise;
    const result = await pool
      .request()
      .input("MaThucDon", MaThucDon)
      .input("MaMon", MaMon)
      .query`DELETE FROM THUCDON_MON WHERE MaThucDon = @MaThucDon AND MaMon = @MaMon`;
    return result.rowsAffected;
  },

  updateMonStatuses: async function (
    MaThucDon,
    MaMon,
    CoPhucVuKhong,
    CoGiaoHangKhong
  ) {
    const pool = await database.poolPromise;
    const result = await pool
      .request()
      .input("MaThucDon", MaThucDon)
      .input("MaMon", MaMon)
      .input("CoPhucVuKhong", CoPhucVuKhong)
      .input("CoGiaoHangKhong", CoGiaoHangKhong)
      .query`UPDATE THUCDON_MON SET CoPhucVuKhong = @CoPhucVuKhong, CoGiaoHangKhong = @CoGiaoHangKhong WHERE MaThucDon = @MaThucDon AND MaMon = @MaMon`;

    const result2 = await pool
      .request()
      .input("MaThucDon", MaThucDon)
      .input("MaMon", MaMon)
      .query`SELECT * FROM THUCDON_MON WHERE MaThucDon = @MaThucDon AND MaMon = @MaMon`;
    return result2.recordset[0];
  },

  addMonToThucDon: async function (MaThucDon, MaMon) {
    const pool = await database.poolPromise;
    const result = await pool
      .request()
      .input("MaThucDon", MaThucDon)
      .input("MaMon", MaMon)
      .query`INSERT INTO THUCDON_MON (MaThucDon, MaMon, CoPhucVuKhong, CoGiaoHangKhong) OUTPUT inserted.* VALUES (@MaThucDon, @MaMon, 1, 1)`;
    return result.recordset[0];
  },

  getMonsNotInThucDon: async function (MaThucDon) {
    const pool = await database.poolPromise;
    const result = await pool.request().input("MaThucDon", MaThucDon)
      .query`SELECT * FROM MON WHERE MaMon NOT IN (SELECT MaMon FROM THUCDON_MON WHERE MaThucDon = @MaThucDon)`;
    return result.recordset;
  },
};

module.exports = THUCDON_MON;
