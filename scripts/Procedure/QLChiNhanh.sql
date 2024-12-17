-- QLChiNhanh
USE SuShiX
GO
--Thêm chi nhánh mới 
CREATE PROCEDURE SP_ThemChiNhanh
    @TenChiNhanh NVARCHAR(255),
    @DiaChi NVARCHAR(255),
    @GioMoCua TIME,
    @GioDongCua TIME,
    @BaiXeMay BIT,
    @BaiOTo BIT,
    @MaNVQuanLy INT
AS
BEGIN
    INSERT INTO CHINHANH (TenChiNhanh, DiaChi, GioMoCua, GioDongCua, BaiXeMay, BaiOTo, MaNVQuanLy)
    VALUES (@TenChiNhanh, @DiaChi, @GioMoCua, @GioDongCua, @BaiXeMay, @BaiOTo, @MaNVQuanLy);
END;
GO

--Cập nhật thông tin
CREATE PROCEDURE SP_CapNhatChiNhanh
    @MaChiNhanh INT,
    @TenChiNhanh NVARCHAR(255),
    @DiaChi NVARCHAR(255),
    @GioMoCua TIME,
    @GioDongCua TIME,
    @BaiXeMay BIT,
    @BaiOTo BIT
AS
BEGIN
    UPDATE CHINHANH
    SET 
        TenChiNhanh = @TenChiNhanh,
        DiaChi = @DiaChi,
        GioMoCua = @GioMoCua,
        GioDongCua = @GioDongCua,
        BaiXeMay = @BaiXeMay,
        BaiOTo = @BaiOTo
    WHERE MaChiNhanh = @MaChiNhanh;
END;
GO

--Xóa chi nhánh
CREATE PROCEDURE SP_XoaChiNhanh
    @MaChiNhanh INT
AS
BEGIN
    DELETE FROM CHINHANH WHERE MaChiNhanh = @MaChiNhanh;
END;
GO


--Tìm kiếm thông tin chi nhánh
CREATE PROCEDURE SP_TimKiemChiNhanh
    @TuKhoa NVARCHAR(255)
AS
BEGIN
    SELECT * 
    FROM CHINHANH
    WHERE TenChiNhanh LIKE '%' + @TuKhoa + '%'
       OR DiaChi LIKE '%' + @TuKhoa + '%';
END;
GO


--Thống kê hoạt động của chi nhánh
--CREATE PROCEDURE SP_ThongKeDoanhThuChiNhanh
--AS
--BEGIN
--    SELECT 
--        cn.TenChiNhanh,
--        COUNT(pd.MaPhieu) AS SoLuongGiaoDich,
--        SUM(pd.TongTien) AS TongDoanhThu
--    FROM 
--        CHINHANH cn
--    LEFT JOIN 
--        PHIEUDATMON pd ON cn.MaChiNhanh = pd.MaChiNhanh
--    GROUP BY 
--        cn.TenChiNhanh;
--END;
--GO

