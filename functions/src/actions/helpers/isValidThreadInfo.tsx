import { ThreadInfo } from '../../types';

export function isValidThreadInfo(data: any): data is ThreadInfo {
  if (typeof data !== 'object') {
    return false;
  }

  if (data === null) {
    return false;
  }

  return (
    'url' in data &&
    typeof data.url === 'string' &&
    ('name' in data ? typeof data.name === 'string' : true)
  );
}
