USE SuShiX
GO

CREATE PROCEDURE sp_GetRevenueStatistics
    @period NVARCHAR(10) -- Accepted values: '30days', '12months', '10years'
AS
BEGIN
    SET NOCOUNT ON;

    -- Declare variables to store the grouping level and the start date for the selected period
    DECLARE @groupLevel NVARCHAR(10);
    DECLARE @startDate DATE;
    DECLARE @endDate DATE;

    -- Determine the grouping level and start date based on the selected period
    IF @period = '30days'
    BEGIN
        SET @groupLevel = 'DAY';
        SET @startDate = DATEADD(DAY, -30, GETDATE());
        SET @endDate = GETDATE();
    END
    ELSE IF @period = '12months'
    BEGIN
        SET @groupLevel = 'MONTH';
        SET @startDate = DATEADD(MONTH, -12, GETDATE());
        SET @endDate = GETDATE();
    END
    ELSE IF @period = '10years'
    BEGIN
        SET @groupLevel = 'YEAR';
        SET @startDate = DATEADD(YEAR, -10, GETDATE());
        SET @endDate = GETDATE();
    END
    ELSE
    BEGIN
        RAISERROR('Invalid period. Allowed values: 30days, 12months, 10years.', 16, 1);
        RETURN;
    END

    -- Create a temp table to store all the dates for the selected period
    CREATE TABLE #DateRange (DateValue NVARCHAR(10));
    DECLARE @date DATE = @startDate;

    -- Insert the date range into the temp table
    IF @groupLevel = 'DAY'
    BEGIN
        WHILE @date <= @endDate
        BEGIN
            INSERT INTO #DateRange (DateValue) 
            VALUES (CONVERT(CHAR(10), @date, 120)); -- YYYY-MM-DD
            SET @date = DATEADD(DAY, 1, @date);
        END
    END
    ELSE IF @groupLevel = 'MONTH'
    BEGIN
        WHILE @date <= @endDate
        BEGIN
            INSERT INTO #DateRange (DateValue) 
            VALUES (CONVERT(CHAR(7), @date, 120)); -- YYYY-MM
            SET @date = DATEADD(MONTH, 1, @date);
        END
    END
    ELSE IF @groupLevel = 'YEAR'
    BEGIN
        WHILE @date <= @endDate
        BEGIN
            INSERT INTO #DateRange (DateValue) 
            VALUES (CONVERT(CHAR(4), @date, 120)); -- YYYY
            SET @date = DATEADD(YEAR, 1, @date);
        END
    END

    -- Query to select statistics based on the period
    ;WITH DateGrouped AS (
        SELECT
            -- Precompute the grouped date based on the selected period
            CASE 
                WHEN @groupLevel = 'DAY' THEN CONVERT(CHAR(10), P.NgayLap, 120)  -- YYYY-MM-DD
                WHEN @groupLevel = 'MONTH' THEN CONVERT(CHAR(7), P.NgayLap, 120)  -- YYYY-MM
                WHEN @groupLevel = 'YEAR' THEN CONVERT(CHAR(4), P.NgayLap, 120)   -- YYYY
            END AS GroupedDate,
            H.TongTien,
            H.SoTienGiam,
            P.LoaiPhieu
        FROM
            PHIEUDATMON P 
            INNER JOIN HOADONTHANHTOAN H ON P.MaPhieu = H.MaPhieu
        WHERE
            P.NgayLap >= @startDate AND P.NgayLap <= @endDate
    )
    -- Now, LEFT JOIN the temp table with the query result to ensure all dates are present
    SELECT 
        D.DateValue AS [date],
        COALESCE(SUM(TongTien - SoTienGiam), 0) AS totalRevenue,
        COALESCE(SUM(CASE WHEN LoaiPhieu = 'DB' THEN 1 ELSE 0 END), 0) AS atTableOrders,
        COALESCE(SUM(CASE WHEN LoaiPhieu = 'GH' THEN 1 ELSE 0 END), 0) AS deliveryOrders,
        COALESCE(COUNT(*), 0) AS totalOrders
    FROM 
        #DateRange D
    LEFT JOIN DateGrouped S ON D.DateValue = S.GroupedDate
    GROUP BY 
        D.DateValue
    ORDER BY 
        D.DateValue;

    -- Clean up: drop the temp table
    DROP TABLE #DateRange;
END

-- DISH stats
CREATE PROCEDURE sp_GetDishStatistics
    @period NVARCHAR(10) -- Accepted values: '30days', '12months', '10years'
AS
BEGIN
    SET NOCOUNT ON;

    -- Determine the date range
    DECLARE @startDate DATE = NULL;
    DECLARE @endDate DATE = GETDATE(); -- Current date

    IF @period = '30days'
    BEGIN
        SET @startDate = DATEADD(DAY, -30, @endDate);
    END
    ELSE IF @period = '12months'
    BEGIN
        SET @startDate = DATEADD(YEAR, -1, @endDate);
    END
    ELSE IF @period = '10years'
    BEGIN
        SET @startDate = DATEADD(YEAR, -10, @endDate);
    END
    ELSE
    BEGIN
        RAISERROR('Invalid period. Allowed values: 30days, 12months, 10years.', 16, 1);
        RETURN;
    END

    SELECT TOP 10
        M.TenMon AS name,
        M.GiaHienTai AS price,
        SUM(PD.SoLuong) AS sold,
        SUM(PD.SoLuong * PD.Gia) AS revenue
    FROM PHIEUDATMON p
    INNER JOIN PHIEUDATMON_MON PD ON (p.NgayLap BETWEEN @startDate AND @endDate) AND p.MaPhieu = PD.MaPhieu
    INNER JOIN MON M ON PD.MaMon = M.MaMon
    GROUP BY M.TenMon, M.GiaHienTai
    ORDER BY Revenue DESC;
END;

EXEC sp_GetDishStatistics '10years'


--- NHANVIEN Stats

CREATE PROCEDURE sp_GetEmployeeStatistics
    @period VARCHAR(20)
AS
BEGIN
    DECLARE @startDate DATE;

    -- Determine the start date based on the selected range
    IF @period = '30days'
    BEGIN
        SET @startDate = DATEADD(DAY, -30, GETDATE());
    END
    ELSE IF @period = '12months'
    BEGIN
        SET @startDate = DATEADD(MONTH, -12, GETDATE());
    END
    ELSE IF @period = '10years'
    BEGIN
        SET @startDate = DATEADD(YEAR, -10, GETDATE());
    END

    -- Query to calculate employee statistics (total orders, total revenue)
    SELECT TOP 10
        n.MaNhanVien AS employeeId, 
        n.HoTen AS employeeName,
        COUNT(pdm.MaPhieu) AS totalOrders,  -- Number of orders handled by the employee
        SUM(h.TongTien) AS totalRevenue   -- Total revenue generated by the employee
    FROM
        PHIEUDATBAN pdb
		JOIN PHIEUDATMON pdm ON pdm.NgayLap>= @startDate AND pdb.MaPhieuDatBan = pdm.MaPhieu
        JOIN HOADONTHANHTOAN h ON pdm.MaPhieu = h.MaPhieu
        JOIN NHANVIEN n ON pdb.MaNVDatBan = n.MaNhanVien  -- Assuming employee responsible for the order
    GROUP BY
        n.MaNhanVien, n.HoTen
    ORDER BY
        totalRevenue DESC;
END;

EXEC sp_GetEmployeeStatistics '10years'