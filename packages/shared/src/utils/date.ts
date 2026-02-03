import { formatDistance } from 'date-fns';

export function formatDateDistance(date: Date) {
  const distance = formatDistance(date, new Date(), {
    addSuffix: true,
  });

  const regex = new RegExp('about |over |almost |less than ', 'g');

  return distance.replace(regex, '');
}

export function incrementDateBySeconds(seconds: number, date: Date = new Date()) {
  date.setUTCSeconds(date.getSeconds() + seconds);

  return date;
}
