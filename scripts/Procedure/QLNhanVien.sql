-- QLNhanVien
USE SuShiX
GO

--Thêm nhân viên mới 
CREATE PROCEDURE SP_ThemNhanVien
    @HoTen NVARCHAR(255),
    @NgaySinh DATE,
    @GioiTinh NVARCHAR(10),
    @Luong DECIMAL(18, 2),
    @NgayVaoLam DATE,
    @SDT NVARCHAR(15),
    @Duong NVARCHAR(255),
    @Phuong NVARCHAR(255),
    @Quan NVARCHAR(255),
    @ThanhPho NVARCHAR(255),
    @MaBoPhan INT
AS
BEGIN
    INSERT INTO NHANVIEN (HoTen, NgaySinh, GioiTinh, Luong, NgayVaoLam, SDT, Duong, Phuong, Quan, ThanhPho, MaBoPhan)
    VALUES (@HoTen, @NgaySinh, @GioiTinh, @Luong, @NgayVaoLam, @SDT, @Duong, @Phuong, @Quan, @ThanhPho, @MaBoPhan);
END;
GO


--Cập nhật thông tin nhân viên
CREATE PROCEDURE SP_CapNhatNhanVien
    @MaNhanVien INT,
    @HoTen NVARCHAR(255),
    @Luong DECIMAL(18, 2),
    @NgayNghiViec DATE NULL
AS
BEGIN
    UPDATE NHANVIEN
    SET 
        HoTen = @HoTen,
        Luong = @Luong,
        NgayNghiViec = @NgayNghiViec
    WHERE MaNhanVien = @MaNhanVien;
END;
GO


--Xóa thông tin nhân viên
CREATE PROCEDURE SP_XoaNhanVien
    @MaNhanVien INT
AS
BEGIN
    DELETE FROM NHANVIEN WHERE MaNhanVien = @MaNhanVien;
END;
GO


--Tìm kiếm nhân viên
CREATE PROCEDURE SP_TimKiemNhanVien
    @TuKhoa NVARCHAR(255)
AS
BEGIN
    SELECT * 
    FROM NHANVIEN
    WHERE HoTen LIKE '%' + @TuKhoa + '%'
       OR SDT LIKE '%' + @TuKhoa + '%';
END;
GO

--Phân công nhân viên
CREATE PROCEDURE SP_PhanCongNhanVien
    @MaNhanVien INT,
    @MaBoPhan INT
AS
BEGIN
    UPDATE NHANVIEN
    SET MaBoPhan = @MaBoPhan
    WHERE MaNhanVien = @MaNhanVien;
END;
GO

--Tính lương
CREATE PROCEDURE SP_TinhLuongNhanVien
    @MaNhanVien INT,
    @SoGioLam INT,
    @HeSoLuong DECIMAL(18, 2)
AS
BEGIN
    DECLARE @Luong DECIMAL(18, 2);
    SET @Luong = @SoGioLam * @HeSoLuong;

    UPDATE NHANVIEN
    SET Luong = @Luong
    WHERE MaNhanVien = @MaNhanVien;
END;
GO
