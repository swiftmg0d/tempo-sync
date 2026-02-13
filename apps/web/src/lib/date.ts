import { formatDistance } from 'date-fns/formatDistance';

export function formatDateDistance(date: Date) {
	const distance = formatDistance(date, new Date(), {
		addSuffix: true
	});

	const regex = new RegExp('about |over |almost |less than ', 'g');

	return distance.replace(regex, '');
}
