const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const zod = require("zod");
const { fromZodError } = require("zod-validation-error");

// // Import utils
// const convertToReadableMetadata = require("./utils/convertToReadableMetadata");

const authRouter = require("./routes/auth.route");
const monRouter = require("./routes/mon.route");
const thucdonMonRouter = require("./routes/thucdon_mon.route");
const phieuDatMonRouter = require("./routes/phieudatmon.route");
const phieuDatBanRouter = require("./routes/phieudatban.route");
const statisticRouter = require("./routes/statistic.route");

const app = express();

// Trust proxy
app.enable("trust proxy");

// CORS;
const allowOrigins = [
	process.env.FRONTEND_URL,
	"http://localhost:5173",
	"http://localhost:4173",
];
app.use(
	cors({
		credentials: true,
		origin: "*",
	})
);
// Implement CORS on all OPTIONS request
// Browser send OPTIONS req on preflight phase (before non-simple req like PUT,PATCH,DELETE,...)
// -> inorder to verify that the non-simple req is safe to perform
// -> we must set CORS on response
app.options("*", cors());

//////// IMPORTANT : helmet should be used in every Express app
// Security HTTP headers
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: {
			policy: "cross-origin",
		},
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["*"],
				scriptSrc: [
					"* data: 'unsafe-eval' 'unsafe-inline' blob: https://sandbox.vnpayment.vn",
				],
				connectSrc: ["*", "https://sandbox.vnpayment.vn"],
				frameSrc: ["*", "https://sandbox.vnpayment.vn"],
				navigateTo: ["*"],
			},
		},
	})
);

// Data sanitization against XSS
// replace malicious HTML code : ex : <div id='error-code'></div> -> &lt;div id='error-code'&gt;...
app.use(xss());

// compress all the response text (ex: JSON or HTML)
app.use(compression());

// Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Set static files
app.use(express.static(`${__dirname}/public`));

// // Routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mon", monRouter);
app.use("/api/v1/thucdon", thucdonMonRouter);
app.use("/api/v1/phieudatmon", phieuDatMonRouter);
app.use("/api/v1/phieudatban", phieuDatBanRouter);
app.use("/api/v1/statistics", statisticRouter);

// app.use("/api/v1/statistics", statisticRouter);

// Error handler
app.use((err, req, res, next) => {
	// Check if erro is zod's error
	if (err instanceof zod.ZodError) {
		const validationErrors = fromZodError(err, {
			prefix: "Lỗi dữ liệu",
			includePath: false,
			unionSeparator: ", hoặc",
		});

		return res.status(400).json({
			status: "fail",
			message: validationErrors.message,
			reasonPhrase: "INVALID_ARGUMENTS",
			metadata: convertToReadableMetadata(validationErrors.details),
		});
	}

	// Check if error is AppError (custom error)
	if (err.isOperational) {
		return res.status(err.statusCode || 500).json({
			status: err.status,
			message: err.message,
			reasonPhrase: err.reasonPhrase,
			metadata: err.metadata,
		});
	} else {
		console.log(err);
		return res.status(500).json({
			status: "error",
			message: "Có lỗi xảy ra. Xin hãy liên hệ với admin.",
			reasonPhrase: "INTERNAL_SERVER_ERROR",
		});
	}
});

module.exports = app;
