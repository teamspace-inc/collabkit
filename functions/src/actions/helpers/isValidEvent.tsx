import has from 'has';
import { Event } from '../../types';

function isValidMentions(data: unknown): data is { [userId: string]: boolean } {
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

export function isValidEvent(data: unknown): data is Event {
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
    has(data, 'type') &&
    typeof data.type === 'string' &&
    ['message', 'reaction', 'adminMessage', 'system', 'delete', 'edit'].includes(data.type);
  const bodyValid = has(data, 'body') && typeof data.body === 'string';
  const systemValid =
    has(data, 'type') && data.type === 'system'
      ? has(data, 'system')
        ? typeof data.system === 'string' && ['resolve', 'reopen'].includes(data.system)
        : true
      : true;
  const createdAtValid = has(data, 'createdAt') && typeof data.createdAt === 'number';
  const createdByIdValid = has(data, 'createdById') && typeof data.createdById === 'string';
  const parentIdValid = has(data, 'parentId') ? typeof data.parentId === 'string' : true;
  const mentionsValid = has(data, 'mentions') ? isValidMentions(data.mentions) : true;

  return (
    typeValid &&
    bodyValid &&
    systemValid &&
    createdAtValid &&
    createdByIdValid &&
    parentIdValid &&
    mentionsValid &&
    (data.type === 'reaction' ? has(data, 'parentId') && typeof data.parentId === 'string' : true)
  );
}
