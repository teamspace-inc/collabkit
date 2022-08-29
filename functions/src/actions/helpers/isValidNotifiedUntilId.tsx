import { NotifiedUntilId } from '../../types';

export function isValidNotifiedUntilId(data: any): data is NotifiedUntilId {
  return typeof data === 'string' || data === undefined;
}
