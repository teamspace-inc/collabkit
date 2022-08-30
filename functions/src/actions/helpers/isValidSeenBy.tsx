import { SeenBy } from '../../types';
import { isValidSeenByUser } from './isValidSeenByUser';

export function isValidSeenBy(data: any): data is SeenBy {
  if (typeof data === 'undefined') {
    return false;
  }
  if (typeof data !== 'object') {
    return false;
  }
  if (data === null) {
    return false;
  }

  const userIdsValid = Object.keys(data).every((userId) => typeof userId === 'string');
  const userIdsHaveSeenUntilIds = Object.values(data).every((seenByUser) =>
    isValidSeenByUser(seenByUser)
  );
  return userIdsValid && userIdsHaveSeenUntilIds;
}
