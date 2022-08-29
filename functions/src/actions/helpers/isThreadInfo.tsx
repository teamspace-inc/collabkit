import { ThreadInfo } from '../../types';

export function isThreadInfo(data: any): data is ThreadInfo {
  return typeof data === 'object' &&
    'url' in data &&
    'url' in data &&
    typeof data.url === 'string' &&
    'name' in data
    ? typeof data.name === 'string'
    : true;
}
