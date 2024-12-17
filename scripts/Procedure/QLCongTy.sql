DROP PROCEDURE IF EXISTS sp_ThonKeDoanhThuTheoChiNhanh;

CREATE PROCEDURE sp_ThonKeDoanhThuTheoChiNhanh
    @StartDate DATE, -- Ngày bắt đầu, mặc định NULL
    @EndDate DATE,    -- Ngày kết thúc, mặc định NULL
	@MaChiNhanh INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CN.TenChiNhanh,
        SUM(HD.TongTien - HD.SoTienGiam) AS TotalRevenue
    FROM 
        HOADONTHANHTOAN HD
        JOIN PHIEUDATMON PD ON HD.MaPhieu = PD.MaPhieu
        JOIN CHINHANH CN ON CN.MaChiNhanh = PD.MaChiNhanh
    WHERE 
        PD.NgayLap BETWEEN @StartDate AND @EndDate
		AND (@MaChiNhanh IS NULL OR CN.MaChiNhanh = @MaChiNhanh)
    GROUP BY
        CN.TenChiNhanh
    ORDER BY
        CN.TenChiNhanh;
END;
GO
Exec sp_ThonKeDoanhThuTheoChiNhanh  @StartDate = '2015-01-01', @EndDate = '2017-06-02', @MaChiNhanh = 1;


DROP PROCEDURE IF EXISTS sp_ThonKeDoanhThuTheoTungMon;
CREATE PROCEDURE sp_ThonKeDoanhThuTheoTungMon
    @StartDate DATE, -- Ngày bắt đầu
    @EndDate DATE    -- Ngày kết thúc
AS
BEGIN
    SET NOCOUNT ON;

    -- Step 1: Create a temporary table to store results
    CREATE TABLE #DoanhThuMon (
        MaMon INT,
        TenMon NVARCHAR(255),
        SoLuongBan INT,
        DoanhThu DECIMAL(18, 2)
    );

    -- Step 2: Calculate total quantity sold and revenue for each dish
    INSERT INTO #DoanhThuMon (MaMon, TenMon, SoLuongBan, DoanhThu)
    SELECT 
        M.MaMon,
        M.TenMon,
        SUM(PDM_MON.SoLuong) AS SoLuongBan,
        SUM(PDM_MON.SoLuong * PDM_MON.Gia) AS DoanhThu
    FROM 
        PHIEUDATMON PDM
        JOIN PHIEUDATMON_MON PDM_MON ON PDM.MaPhieu = PDM_MON.MaPhieu
        JOIN MON M ON PDM_MON.MaMon = M.MaMon
    WHERE 
        PDM.NgayLap BETWEEN @StartDate AND @EndDate
    GROUP BY 
        M.MaMon, M.TenMon;

    -- Step 3: Determine the best-selling and least-selling dishes
    SELECT TOP 1 
        'Top-Selling Dish' AS MoTa,
        MaMon,
        TenMon,
        SoLuongBan,
        DoanhThu
    FROM #DoanhThuMon
    ORDER BY SoLuongBan DESC;

    SELECT TOP 1 
        'Least-Selling Dish' AS MoTa,
        MaMon,
        TenMon,
        SoLuongBan,
        DoanhThu
    FROM #DoanhThuMon
    ORDER BY SoLuongBan ASC;

    -- Step 4: Return all revenue statistics
    SELECT 
        MaMon,
        TenMon,
        SoLuongBan,
        DoanhThu
    FROM #DoanhThuMon
    ORDER BY DoanhThu DESC;

    -- Step 5: Drop the temporary table
    DROP TABLE #DoanhThuMon;
END;
GO
EXEC sp_ThonKeDoanhThuTheoTungMon @StartDate = '2020-01-01', @EndDate = '2024-12-01';

DROP PROCEDURE IF EXISTS sp_ChuyenNhanSuGiuaChiNhanh;

CREATE PROCEDURE sp_ChuyenNhanSuGiuaChiNhanh
    @MaNhanVien INT,
    @MaBoPhanMoi INT,
    @NgayBatDau DATE
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Kết thúc lịch sử làm việc hiện tại của nhân viên
        UPDATE LICHSULAMVIEC
        SET NgayKetThuc = CAST(GETDATE() AS DATE)
        WHERE MaNhanVien = @MaNhanVien AND NgayKetThuc IS NULL;

        -- Thêm lịch sử làm việc mới cho nhân viên
        INSERT INTO LICHSULAMVIEC (MaBoPhan, MaNhanVien, NgayBatDau)
        VALUES (@MaBoPhanMoi, @MaNhanVien, @NgayBatDau);

        -- Cập nhật bộ phận mới trong bảng NHANVIEN
        UPDATE NHANVIEN
        SET MaBoPhan = @MaBoPhanMoi
        WHERE MaNhanVien = @MaNhanVien;

        PRINT 'Chuyển nhân sự thành công.';
    END TRY
    BEGIN CATCH
        PRINT 'Lỗi xảy ra: ' + ERROR_MESSAGE();
    END CATCH
END;
GO
EXEC sp_ChuyenNhanSuGiuaChiNhanh @MaNhanVien = 1, @MaBoPhanMoi = 39, @NgayBatDau = '2024-06-18';
