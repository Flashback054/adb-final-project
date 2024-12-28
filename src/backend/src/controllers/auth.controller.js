const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");
const { createAccessToken, signToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const KHACHHANG = require("../models/khachhang.model");
const TAIKHOAN = require("../models/taikhoan.model");
const NHANVIEN = require("../models/nhanvien.model");

exports.signupKH = async (req, res, next) => {
	const {
		TenDangNhap,
		MatKhau,
		HoTen,
		Email,
		SDT,
		GioiTinh,
		CCCD,
		Duong,
		Phuong,
		Quan,
		ThanhPho,
	} = req.body;

	// 1) Check if TenDangNhap already exists
	const taiKhoan = await TAIKHOAN.getByTenDangNhap(TenDangNhap);
	if (taiKhoan) {
		throw new AppError(400, "INVALID_ARGUMENTS", "Tên đăng nhập đã tồn tại.", {
			TenDangNhap,
		});
	}

	// 2.1 Check if KhachHang existed but doesn't have TaiKhoan yet: Check if Email or CCCD already exists
	let khachHang = await KHACHHANG.getByEmail(Email);
	if (!khachHang) {
		// 2.2) Create new KHACHHANG
		const newKHACHHANG = {
			Email,
			HoTen,
			SDT,
			GioiTinh,
			CCCD,
			Duong,
			Phuong,
			Quan,
			ThanhPho,
		};
		khachHang = await KHACHHANG.create(newKHACHHANG);
	}

	// 3) Create new TAIKHOAN
	// Hash password
	const hashedPassword = await bcrypt.hash(MatKhau, 12);
	const newTaiKhoan = await TAIKHOAN.create({
		TenDangNhap,
		MatKhau: hashedPassword,
		LoaiTaiKhoan: "KH",
		MaNguoiDung: khachHang.MaKhachHang,
	});

	const { accessToken, accessTokenOptions } = createAccessToken(
		newTaiKhoan.MaTaiKhoan,
		req
	);

	res.cookie("accessToken", accessToken, accessTokenOptions);

	res.status(201).json({
		status: "success",
		accessToken: accessToken,
	});
};

exports.signupNV = async (req, res, next) => {
	const {
		TenDangNhap,
		MatKhau,
		HoTen,
		NgaySinh,
		GioiTinh,
		Luong,
		NgayVaoLam,
		NgayNghiViec,
		SDT,
		Duong,
		Phuong,
		Quan,
		ThanhPho,
		MaBoPhan,
	} = req.body;

	// 1) Check if TenDangNhap already exists
	const taiKhoan = await TAIKHOAN.getByTenDangNhap(TenDangNhap);
	if (taiKhoan) {
		throw new AppError(400, "INVALID_ARGUMENTS", "Tên đăng nhập đã tồn tại.", {
			TenDangNhap,
		});
	}

	// 2.1 Check if NhanVien existed but doesn't have TaiKhoan yet: Check if SDT already exists
	let nhanVien = await NHANVIEN.getBySDT(SDT);
	if (!nhanVien) {
		// 2.2) Create new NHANVIEN
		const newNHANVIEN = {
			HoTen,
			NgaySinh,
			GioiTinh,
			Luong,
			NgayVaoLam,
			NgayNghiViec,
			SDT,
			Duong,
			Phuong,
			Quan,
			ThanhPho,
			MaBoPhan,
		};

		nhanVien = await NHANVIEN.create(newNHANVIEN);
	}

	// 3) Create new TAIKHOAN
	// Hash password
	const hashedPassword = await bcrypt.hash(MatKhau, 12);
	const newTaiKhoan = await TAIKHOAN.create({
		TenDangNhap,
		MatKhau: hashedPassword,
		LoaiTaiKhoan: "NV",
		MaNguoiDung: nhanVien.MaNhanVien,
	});

	const { accessToken, accessTokenOptions } = createAccessToken(
		newTaiKhoan.MaTaiKhoan,
		req
	);

	res.cookie("accessToken", accessToken, accessTokenOptions);

	res.status(201).json({
		status: "success",
		accessToken: accessToken,
	});
};

exports.login = async (req, res, next) => {
	const { TenDangNhap, MatKhau } = req.body;

	// 2) Check if taiKhoan exists && password is correct
	const taiKhoan = await TAIKHOAN.getByTenDangNhap(TenDangNhap);

	if (!taiKhoan || !(await bcrypt.compare(MatKhau, taiKhoan.MatKhau))) {
		throw new AppError(
			401,
			"INVALID_CREDENTIALS",
			"Sai tên đăng nhập hoặc mật khẩu."
		);
	}

	// 3) If everything ok, send tokens to client
	const { accessToken, accessTokenOptions } = createAccessToken(
		taiKhoan.MaTaiKhoan,
		req
	);

	res.cookie("accessToken", accessToken, accessTokenOptions);

	res.status(200).json({
		status: "success",
		accessToken,
	});
};

exports.logout = (req, res, next) => {
	res.cookie("accessToken", "", {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
	// 1) Getting tokens
	let accessToken;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		accessToken = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.accessToken) {
		accessToken = req.cookies.accessToken;
	}

	// If there is no accessToken and no refreshToken, throw error
	if (!accessToken) {
		throw new AppError(
			401,
			"SESSION_EXPIRED",
			"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại."
		);
	}

	// 2) Verify Tokens
	let decoded;

	if (accessToken) {
		// 2.1) Verify accessToken
		try {
			decoded = await verifyToken(accessToken, process.env.ACCESS_SECRET);
			console.log({ decoded });
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				throw new AppError(
					401,
					"SESSION_EXPIRED",
					"Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại."
				);
			} else {
				throw err;
			}
		}
	}

	// Check if decode is undefined
	if (!decoded) {
		throw new AppError(
			401,
			"INVALID_TOKENS",
			"Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại."
		);
	}

	// 3) Check if user still exists
	const currentTaiKhoan = await TAIKHOAN.getById(decoded.MaTaiKhoan);
	if (!currentTaiKhoan)
		throw new AppError(404, "NOT_FOUND", "Tài khoản không tồn tại.");

	// GRANT ACCESS TO PROTECTED ROUTE
	req.taiKhoan = currentTaiKhoan;

	return next();
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// Admin have access to all routes
		if (req.taiKhoan.LoaiTaiKhoan === "ADMIN") return next();

		// roles ['admin', 'cashier', 'staff', 'customer']
		if (!roles.includes(req.taiKhoan.LoaiTaiKhoan)) {
			throw new AppError(
				403,
				"ACCESS_DENIED",
				"Người dùng không có quyền truy cập vào tài nguyên này."
			);
		}

		next();
	};
};

async function verifyToken(token, tokenSecret) {
	try {
		decoded = await promisify(jwt.verify)(token, tokenSecret);

		return decoded;
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) {
			throw err;
		} else if (
			err instanceof jwt.JsonWebTokenError ||
			err instanceof jwt.NotBeforeError
		) {
			throw new AppError(
				401,
				"INVALID_TOKENS",
				"Phiên đăng nhập có vấn đề. Vui lòng đăng nhập lại."
			);
		} else {
			throw err;
		}
	}
}

function isChangedPasswordAfter(passwordChangedAt, JWTTimestamp) {
	// Password has been changed after user being created
	if (passwordChangedAt) {
		const passwordChangeTime = parseInt(passwordChangedAt.getTime() / 1000, 10);
		return JWTTimestamp < passwordChangeTime;
	}

	// False: token was issued before password change time
	return false;
}
