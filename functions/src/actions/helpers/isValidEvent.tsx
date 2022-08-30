import { Event } from '../../types';

export function isValidEvent(data: any): data is Event {
  if (typeof data === undefined) {
    return false;
  }

  if (typeof data !== 'object') {
    return false;
  }

  if (data === null) {
    return false;
  }

  const typeValid =
    'type' in data &&
    typeof data.type === 'string' &&
    ['message', 'reaction', 'adminMessage', 'system'].includes(data.type);
  const bodyValid = 'body' in data && typeof data.body === 'string';
  const systemValid =
    data.type === 'system'
      ? 'system' in data
        ? typeof data.system === 'string' && ['resolve', 'reopen'].includes(data.system)
        : true
      : true;
  const createdAtValid = 'createdAt' in data && typeof data.createdAt === 'number';
  const createdByIdValid = 'createdById' in data && typeof data.createdById === 'string';
  const parentIdValid = 'parentId' in data ? typeof data.parentId === 'string' : true;

  return (
    typeValid &&
    bodyValid &&
    systemValid &&
    createdAtValid &&
    createdByIdValid &&
    parentIdValid &&
    (data.type === 'reaction' ? typeof data.parentId === 'string' : true)
  );
}
