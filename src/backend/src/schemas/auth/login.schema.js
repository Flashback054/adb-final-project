const zod = require("zod");

module.exports = zod.object({
	body: zod.object({
		TenDangNhap: zod.string({
			required_error: "Tên đăng nhập không được để trống",
		}),
		MatKhau: zod.string({
			required_error: "Mật khẩu không được để trống",
		}),
	}),
});
