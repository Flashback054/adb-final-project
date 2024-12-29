const database = require("../database/database");

const Statistic = {
	getRevenueStatistic: async function (period) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("period", period)
			.query`EXEC sp_GetRevenueStatistics @period = ${period}`;
		return result.recordset;
	},

	getDishStatistic: async function (period) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("period", period)
			.query`EXEC sp_GetDishStatistics @period = ${period}`;
		return result.recordset;
	},

	getEmployeeStatistic: async function (period) {
		const pool = await database.poolPromise;
		const result = await pool.request().input("period", period)
			.query`EXEC sp_GetEmployeeStatistics @period = ${period}`;
		return result.recordset;
	},
};

module.exports = Statistic;
