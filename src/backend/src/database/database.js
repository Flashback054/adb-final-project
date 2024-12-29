const sql = require("mssql");

// Database configuration
const dbConfig = {
	user: "sa",
	password: "@Flashback054",
	server: "172.22.240.1", // e.g., 'localhost' or '127.0.0.1'
	database: "SuShiX",
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		trustServerCertificate: true, // Use if not using a CA-signed certificate
	},
};

// Initialize a single connection pool
const poolPromise = new sql.ConnectionPool(dbConfig)
	.connect()
	.then((pool) => {
		return pool;
	})
	.catch((err) => {
		console.error("Database connection failed:", err);
		process.exit(1); // Exit on error
	});

module.exports = { sql, poolPromise };
