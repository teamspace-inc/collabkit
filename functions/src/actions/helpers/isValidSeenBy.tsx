import { SeenBy } from '../types';
import { isValidSeenByUser } from './isValidSeenByUser';

export function isValidSeenBy(data: any): data is SeenBy {
  if (typeof data !== 'object') {
    return false;
  }

  const userIdsValid = Object.keys(data).every((userId) => typeof userId === 'string');
  const userIdsHaveSeenUntilIds = Object.values(data).every((seenByUser) =>
    isValidSeenByUser(seenByUser)
  );
  return userIdsValid && userIdsHaveSeenUntilIds;
}
