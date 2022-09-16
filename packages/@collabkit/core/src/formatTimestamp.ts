import { format, formatDistanceStrict, isSameYear } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

const millisecondsInDay = 86_400_000;
const locale = {
  ...enUS,
  formatDistance: (token: string, count: number, options: any) => {
    if (token === 'xSeconds') return 'just now';
    if (token === 'xMinutes') return `${count}m`;
    if (token === 'xHours') return `${count}h`;
    return enUS.formatDistance!(token, count, options);
  },
};

/**
 * Given a date in the past and date now (both as UTC milliseconds since epoch),
 * returns a relative time as follows:
 *
 * 0s ... 60s  => just now
 * 60s ... 1h  => 1m
 * 1h ... 23h  => 1h
 * same year   => Sep 15
 * other       => Dec 31, 2021
 */
export function formatTimestamp(timestamp: number, now: number) {
  if (Math.abs(timestamp - now) < millisecondsInDay) {
    return formatDistanceStrict(timestamp, now, { locale, roundingMethod: 'floor' });
  }
  if (isSameYear(timestamp, now)) {
    return format(timestamp, 'MMM d');
  }
  return format(timestamp, 'MMM d, yyyy');
}
