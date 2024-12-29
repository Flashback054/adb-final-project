const sql = require("mssql/msnodesqlv8");

// Database configuration
const dbConfig = {
  user: "sa",
  password: "123",
  database: "SuShiX",
  server: "localhost\\MSSQLSERVERNEW", // Tên instance (hoặc localhost nếu default)
  driver: "msnodesqlv8",
  options: {
    trustServerCertificate: true,
    // Không dùng trustedConnection khi dùng SQL Auth
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
