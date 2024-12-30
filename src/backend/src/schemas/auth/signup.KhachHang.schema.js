const zod = require("zod");

// TenDangNhap,
// 		MatKhau,
// 		HoTen,
// 		Email,
// 		SDT,
// 		GioiTinh,
// 		CCCD,
// 		Duong,
// 		Phuong,
// 		Quan,
// 		ThanhPho,

module.exports = zod.object({
	body: zod.object({
		TenDangNhap: zod
			.string({
				required_error: "Tên đăng nhập không được để trống",
			})
			.min(6, { message: "Tên đăng nhập phải có ít nhất 6 ký tự" }),
		MatKhau: zod
			.string({
				required_error: "Mật khẩu không được để trống",
			})
			.min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
		HoTen: zod.string({
			required_error: "Họ tên không được để trống",
		}),
		Email: zod
			.string({
				required_error: "Email không được để trống",
			})
			.email({ message: "Email không hợp lệ" }),
		SDT: zod
			.string({
				required_error: "Số điện thoại không được để trống",
			})
			.min(10, { message: "Số điện thoại phải có ít nhất 10 ký tự" }),
		GioiTinh: zod.string({
			required_error: "Giới tính không được để trống",
		}),
		CCCD: zod
			.string({
				required_error: "CCCD không được để trống",
			})
			.length(12, { message: "CCCD phải có 12 ký tự" }),
		Duong: zod.string({
			required_error: "Đường không được để trống",
		}),
		Phuong: zod.string({
			required_error: "Phường không được để trống",
		}),
		Quan: zod.string({
			required_error: "Quận không được để trống",
		}),
		ThanhPho: zod.string({
			required_error: "Thành phố không được để trống",
		}),
	}),
});
