-- PROC FOR KHACHANG
-- KH1: Đặt bàn
USE [SuShiX]
GO

CREATE PROCEDURE [dbo].[DatBan]
	@MaPhieu INT,
	@NgayLap DATE,
	@LoaiPhieu NVARCHAR(2),
	@MaChiNhanh INT,
	@MaKhachHang INT,
	@SoBan INT,
	@SoLuongKhach INT,
	@NgayDat DATE,
    @GioDen TIME(7),
	@GhiChu NVARCHAR(255),
    @LoaiPhieuDatBan NVARCHAR(2),
    @MaNVDatBan INT
AS
BEGIN
	IF @NgayLap IS NULL
	BEGIN
		SET @NgayLap = GETDATE()
	END
	INSERT INTO [dbo].[PHIEUDATMON]
	(
            [NgayLap], [LoaiPhieu], [MaChiNhanh], [MaKhachHang]
        )
    VALUES
        (
            @NgayLap, @LoaiPhieu, @MaChiNhanh, @MaKhachHang
        );
	SET @MaPhieu = SCOPE_IDENTITY();
	INSERT INTO [dbo].[PHIEUDATBAN]
    (
        [MaPhieuDatBan], [SoBan], [SoLuongKhach], [NgayDat], [GioDen], [GhiChu], [LoaiPhieuDatBan], [MaNVDatBan]
    )
    VALUES
    (
        @MaPhieu, @SoBan, @SoLuongKhach, @NgayDat, @GioDen, @GhiChu, @LoaiPhieuDatBan, @MaNVDatBan
    );
END;

EXEC [dbo].[DatBan]
    @MaPhieu = null,                            -- Tham số @MaPhieu (trong trường hợp này bạn có thể truyền số cụ thể)
    @NgayLap = '2010-06-02',                  -- Tham số @NgayLap (ngày lập phiếu)
    @LoaiPhieu = N'DB',                       -- Tham số @LoaiPhieu (loại phiếu)
    @MaChiNhanh = 8,                          -- Tham số @MaChiNhanh (mã chi nhánh)
    @MaKhachHang = 818,                       -- Tham số @MaKhachHang (mã khách hàng)
    @SoBan = 5,                               -- Tham số @SoBan (số bàn)
    @SoLuongKhach = 10,                       -- Tham số @SoLuongKhach (số lượng khách)
    @NgayDat = '2024-12-17',                  -- Tham số @NgayDat (ngày đặt)
    @GioDen = '18:00:00',                     -- Tham số @GioDen (giờ đến)
    @GhiChu = N'Yêu cầu thêm ghế',           -- Tham số @GhiChu (ghi chú)
    @LoaiPhieuDatBan = N'TT',                 -- Tham số @LoaiPhieuDatBan (loại phiếu đặt bàn)
    @MaNVDatBan = 1                           -- Tham số @MaNVDatBan (mã nhân viên đặt bàn)
;

-- KH2: GIAO HANG
USE [SuShiX]
GO

CREATE PROCEDURE [dbo].[GIAOHANG]
	@MaPhieu INT,
	@NgayLap DATE,
	@LoaiPhieu NVARCHAR(2),
	@MaChiNhanh INT,
	@MaKhachHang INT,
	@DiaChiGiaoHang NVARCHAR(255)
AS
BEGIN
	IF @NgayLap IS NULL
	BEGIN
		SET @NgayLap = GETDATE()
	END
	INSERT INTO [dbo].[PHIEUDATMON]
	(
            [NgayLap], [LoaiPhieu], [MaChiNhanh], [MaKhachHang]
        )
    VALUES
        (
            @NgayLap, @LoaiPhieu, @MaChiNhanh, @MaKhachHang
        );
	SET @MaPhieu = SCOPE_IDENTITY();
	INSERT INTO [dbo].[PHIEUDATMONGIAOHANG]
    (
        [MaPhieuGiaoHang], [DiaChiGiaoHang]
    )
    VALUES
    (
        @MaPhieu, @DiaChiGiaoHang
    );
END;


EXEC [dbo].[GIAOHANG]
    @MaPhieu = null,                            -- Tham số @MaPhieu (trong trường hợp này bạn có thể truyền số cụ thể)
    @NgayLap = '2010-06-02',                  -- Tham số @NgayLap (ngày lập phiếu)
    @LoaiPhieu = N'GH',                       -- Tham số @LoaiPhieu (loại phiếu)
    @MaChiNhanh = 2,                          -- Tham số @MaChiNhanh (mã chi nhánh)
    @MaKhachHang = 1,                       -- Tham số @MaKhachHang (mã khách hàng)
    @DiaChiGiaoHang = N'Hoang Van Thu'                           -- Tham số @MaNVDatBan (mã nhân viên đặt bàn)
;
-- KH3: Đánh giá dịch vụ
CREATE PROCEDURE [dbo].[InsertCustomerFeedback]
    @MaHoaDon INT,              -- The invoice ID associated with the feedback
    @DiemPhucVu INT,            -- Rating for service quality
    @DiemChatLuongMonAn INT,    -- Rating for food quality
    @DiemGiaCa INT,             -- Rating for price
    @DiemViTriChiNhanh INT,     -- Rating for branch location
    @DiemKhongGian INT,         -- Rating for ambiance
    @BinhLuan NVARCHAR(1000),   -- Customer comments
    @LoaiDGDV VARCHAR(2),       -- Type of feedback (e.g., 'D' for dining, 'T' for takeaway)
    @ThoiDiemTruyCap DATETIME,  -- Time of feedback submission
    @ThoiGianTruyCap INT        -- Duration spent by customer (in minutes)
AS
BEGIN
    -- Set default value for ThoiDiemTruyCap if not provided
    IF @ThoiDiemTruyCap IS NULL
    BEGIN
        SET @ThoiDiemTruyCap = GETDATE();
    END

    -- Insert the customer feedback into the DANHGIADICHVU table
    INSERT INTO [dbo].[DANHGIADICHVU] 
        (
            [DiemPhucVu], 
            [DiemChatLuongMonAn], 
            [DiemGiaCa], 
            [DiemViTriChiNhanh], 
            [DiemKhongGian], 
            [BinhLuan], 
            [ThoiDiemTruyCap], 
            [ThoiGianTruyCap], 
            [LoaiDGDV], 
            [MaHoaDon]
        )
    VALUES
        (
            @DiemPhucVu,
            @DiemChatLuongMonAn,
            @DiemGiaCa,
            @DiemViTriChiNhanh,
            @DiemKhongGian,
            @BinhLuan,
            @ThoiDiemTruyCap,
            @ThoiGianTruyCap,
            @LoaiDGDV,
            @MaHoaDon
        );
END
GO

EXEC [dbo].[InsertCustomerFeedback]
    @MaHoaDon = 1,
    @DiemPhucVu = 5,
    @DiemChatLuongMonAn = 4,
    @DiemGiaCa = 3,
    @DiemViTriChiNhanh = 5,
    @DiemKhongGian = 4,
    @BinhLuan = N'Thức ăn rất ngon!',
    @LoaiDGDV = 'TT',
    @ThoiDiemTruyCap = null,  -- Truyền giá trị rõ ràng cho @ThoiDiemTruyCap
    @ThoiGianTruyCap = 30;

-- KH4: Xem thông tin thẻ khách hàng
CREATE PROCEDURE [dbo].[GetCustomerCardInfo]
    @MaKhachHang INT -- Input parameter: Customer ID
AS
BEGIN
    -- Select the customer card information based on the provided customer ID
    SELECT 
        t.MaTheThanhVien, 
        t.MaKhachHang, 
        t.NgayLap, 
        t.LoaiThe, 
        t.NgayDatLoaiThe, 
        t.DiemChiTieu, 
        t.MaNVLapThe,
        k.HoTen AS CustomerName, 
        k.SDT AS CustomerPhone, 
        k.Email AS CustomerEmail
    FROM 
        [dbo].[THETHANHVIEN] t
    INNER JOIN 
        [dbo].[KHACHHANG] k ON t.MaKhachHang = k.MaKhachHang
    WHERE 
        t.MaKhachHang = @MaKhachHang; -- Filter by the customer ID
END
EXEC [dbo].[GetCustomerCardInfo] @MaKhachHang = 1;
-- KH5: Xem tích lũy điểm thẻ thành viên
CREATE PROCEDURE [dbo].[XemTheThanhVien]
    @MaKhachHang INT
AS
BEGIN
    SELECT 
        t.MaTheThanhVien,
        t.MaKhachHang,
        t.NgayLap,
        t.LoaiThe,
        t.NgayDatLoaiThe,
        t.DiemChiTieu,
        t.MaNVLapThe
    FROM 
        dbo.THETHANHVIEN t
    WHERE 
        t.MaKhachHang = @MaKhachHang;
END
GO
EXEC [dbo].[XemTheThanhVien] @MaKhachHang = 1;  

-- KH7: Xem phiếu đặt món
CREATE PROCEDURE sp_XemChiTietPhieuDatMon
    @MaKhachHang INT = NULL, -- Tham số để lọc theo khách hàng (NULL để xem tất cả)
    @MaPhieu INT = NULL -- Tham số để lọc theo một phiếu cụ thể (NULL để xem tất cả)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        PDM.MaPhieu,
        PDM.NgayLap,
        PDM.LoaiPhieu,
        CN.TenChiNhanh,
        KH.HoTen AS TenKhachHang,
        M.TenMon,
        PDM_M.SoLuong,
        PDM_M.Gia,
        (PDM_M.SoLuong * PDM_M.Gia) AS ThanhTien
    FROM 
        PHIEUDATMON AS PDM
    INNER JOIN CHINHANH AS CN ON PDM.MaChiNhanh = CN.MaChiNhanh
    LEFT JOIN KHACHHANG AS KH ON PDM.MaKhachHang = KH.MaKhachHang
    INNER JOIN PHIEUDATMON_MON AS PDM_M ON PDM.MaPhieu = PDM_M.MaPhieu
    INNER JOIN MON AS M ON PDM_M.MaMon = M.MaMon
    WHERE 
        (@MaKhachHang IS NULL OR PDM.MaKhachHang = @MaKhachHang)
        AND (@MaPhieu IS NULL OR PDM.MaPhieu = @MaPhieu)
    ORDER BY 
        PDM.NgayLap DESC;
END;
GO
-- KH8: Xem thông tin khách hàng
CREATE PROCEDURE sp_XemThongTinKhachHang
	@MaKhachHang INT = null
AS
BEGIN
	SET NOCOUNT ON;

	IF @MaKhachHang IS NULL
	BEGIN
		SELECT
			MaKhachHang, 
            HoTen, 
            SDT, 
            Email, 
            GioiTinh, 
            CCCD, 
            Duong, 
            Phuong, 
            Quan, 
            ThanhPho
        FROM dbo.KHACHHANG;
	END
	ELSE
    BEGIN
        -- Lấy thông tin khách hàng theo MaKhachHang
        SELECT 
            MaKhachHang, 
            HoTen, 
            SDT, 
            Email, 
            GioiTinh, 
            CCCD, 
            Duong, 
            Phuong, 
            Quan, 
            ThanhPho
        FROM dbo.KHACHHANG
        WHERE MaKhachHang = @MaKhachHang;
    END
END;
