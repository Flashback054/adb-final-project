-- TRIGGERS --

-- Cap nhat loai the cua THETHANHVIEN khi DiemChiTieu thay doi
CREATE TRIGGER trg_UpdateMembershipType
ON THETHANHVIEN
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Update LoaiThe and NgayDatLoaiThe based on DiemChiTieu
    UPDATE T
    SET 
        LoaiThe = 
            CASE 
                WHEN I.DiemChiTieu >= 100 THEN 'Gold'
                WHEN I.DiemChiTieu >= 50 THEN 'Silver'
                ELSE 'Membership'
            END,
        NgayDatLoaiThe = 
            CASE 
                WHEN 
                    (T.LoaiThe = 'Silver' AND I.DiemChiTieu >= 100) -- Upgrade from Silver to Gold
                    OR (T.LoaiThe = 'Membership' AND I.DiemChiTieu >= 50) -- Upgrade from Membership to Silver
                    THEN GETDATE()
                ELSE T.NgayDatLoaiThe -- Retain the original date if no upgrade
            END
    FROM THETHANHVIEN T
    JOIN INSERTED I ON T.MaTheThanhVien = I.MaTheThanhVien;
END;
GO

-- Kiem tra NHANVIEN cung 1 BOPHAN thi cung 1 muc Luong
CREATE TRIGGER trg_EnsureSameSalaryInDepartment
ON NHANVIEN
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    -- Check for salary consistency within the same department
    IF EXISTS (
        SELECT 1
        FROM NHANVIEN N
        INNER JOIN (
            SELECT MaBoPhan, COUNT(DISTINCT Luong) AS SalaryCount
            FROM NHANVIEN
            GROUP BY MaBoPhan
            HAVING COUNT(DISTINCT Luong) > 1 -- More than one distinct salary in the same department
        ) InconsistentSalaries ON N.MaBoPhan = InconsistentSalaries.MaBoPhan
    )
    BEGIN
        -- Raise an error if inconsistent salaries are found
        RAISERROR ('Salary must be consistent within the same department (MaBoPhan).', 16, 1);
        ROLLBACK TRANSACTION;
    END
END;
GO
