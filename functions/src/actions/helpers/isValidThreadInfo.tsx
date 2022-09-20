import has from 'has';
import { ThreadInfo } from '../../types';

export function isValidThreadInfo(data: unknown): data is ThreadInfo {
  if (typeof data !== 'object') {
    return false;
  }

  if (data === null) {
    return false;
  }

  return (
    has(data, 'url') &&
    typeof data.url === 'string' &&
    (has(data, 'name') ? typeof data.name === 'string' : true)
  );
}
