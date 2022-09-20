import { SeenByUser } from '../../types';
import has from 'has';

export function isValidSeenByUser(data: unknown): data is SeenByUser | null {
  if (data === null) {
    return true;
  }

  if (typeof data !== 'object') {
    return false;
  }

  const userIdValid = has(data, 'seenUntilId') && typeof data.seenUntilId === 'string';
  const seenAtValid = has(data, 'seenAt') && typeof data.seenAt === 'number';

  return userIdValid && seenAtValid;
}
