// const date = new Date(); // Current date and time

// // Format as SQL Server TIME string (hh:mm:ss.sss)
// const sqlTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

exports.jsdateToSqlTime = function (date) {
	if (!(date instanceof Date)) {
		// If the input is not a Date object, create a new Date object from the input
		date = new Date(date);
	}

	// Extract time components
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");
	const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

	// Format as SQL Server TIME string (hh:mm:ss.sss)
	return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

exports.jsdateToSqlDate = function (date) {
	if (!(date instanceof Date)) {
		// If the input is not a Date object, create a new Date object from the input
		date = new Date(date);
	}

	// Extract date components
	const year = date.getFullYear().toString().padStart(4, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");

	// Format as SQL Server DATE string (yyyy-mm-dd)
	return `${year}-${month}-${day}`;
};
