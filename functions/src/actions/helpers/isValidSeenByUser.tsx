import { SeenByUser } from '../../types';
import has from 'has';

export function isValidSeenByUser(data: any): data is SeenByUser | null {
  if (data === null) {
    return true;
  }

  if (typeof data !== 'object') {
    return false;
  }

  const userIdValid = has(data, 'seenUntilId') && typeof data.seenUntilId === 'string';
  const seenAtValid = has(data, 'seenAtValid') && typeof data.seenAtValid === 'number';

  return userIdValid && seenAtValid;
}
