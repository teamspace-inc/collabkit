import { Event } from '../../types';

function isValidMentions(data: any): data is { [userId: string]: boolean } {
  if (typeof data === undefined) {
    return false;
  }

  if (typeof data !== 'object') {
    return false;
  }

  if (data === null) {
    return false;
  }

  return Object.values(data).every((value) => typeof value === 'boolean');
}

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
    ['message', 'reaction', 'adminMessage', 'system', 'delete', 'edit'].includes(data.type);
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
  const mentionsValid = 'mentions' in data ? isValidMentions(data.mentions) : true;

  return (
    typeValid &&
    bodyValid &&
    systemValid &&
    createdAtValid &&
    createdByIdValid &&
    parentIdValid &&
    mentionsValid &&
    (data.type === 'reaction' ? typeof data.parentId === 'string' : true)
  );
}
