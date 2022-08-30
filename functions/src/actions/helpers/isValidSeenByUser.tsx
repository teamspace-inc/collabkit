import { SeenByUser } from '../../types';

export function isValidSeenByUser(data: any): data is SeenByUser {
  return (
    typeof data === 'object' &&
    data !== null &&
    'seenUntilId' in data &&
    'seenAt' in data &&
    typeof data.seenUntilId === 'string' &&
    typeof data.seenAt === 'number'
  );
}
