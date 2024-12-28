const path = require("path");
const dotenv = require("dotenv");
const database = require("./database/database");

// Catch SYNC Exception (like using unknown variable,...)
process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! Shutting down server...");
	console.log(err.name, ": ", err.message);
	console.log("Stack: ", err.stack);
	process.exit(1);
});

dotenv.config({ path: path.join(__dirname, "..", ".env") });

let server;
database.poolPromise
	.then(async () => {
		const app = require("./app");
		const port = process.env.PORT || 3000;
		server = app.listen(port, () => {
			console.log(`App running on port ${port}...`);
		});
	})
	.catch((err) => {
		console.log("Database connection failed:", err);
		process.exit(1);
	});

// Catch ASYNC Rejection (like failed DB connection,...)
process.on("unhandledRejection", (err) => {
	console.log("UNHANDLE REJECTION! Shutting down server...");
	console.log(err.name, ": ", err.message);
	console.log("Stack:", err.stack);
	// Give server time to complete req currently being processed
	if (server)
		server.close(() => {
			// process.exit(0) : success, (1) : error
			process.exit(1);
		});
});
