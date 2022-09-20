import { NotifiedUntilId } from '../../types';

export function isValidNotifiedUntilId(data: unknown): data is NotifiedUntilId {
  return typeof data === 'string' || data === undefined;
}
