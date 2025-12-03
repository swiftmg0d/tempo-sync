export function incrementDateBySeconds(seconds: number, date: Date = new Date()) {
	date.setUTCSeconds(date.getSeconds() + seconds);

	return date;
}
