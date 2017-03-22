import moment from 'moment';

export function defaultPublishDateTime() {
	const now = new moment();
	return now.hour(19).startOf('hour').format();
}

export function convertTimestampToUTC(timestamp) {
	return timestamp && moment.utc(timestamp).format();
}
