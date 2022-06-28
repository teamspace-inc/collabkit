import { Target } from '../constants';

export function targetEqual(a: Target | null, b: Target | null) {
  return (
    a !== null &&
    b !== null &&
    a.threadId === b.threadId &&
    a.type === b.type &&
    a.workspaceId === b.workspaceId &&
    a.type === 'comment' &&
    b.type === 'comment' &&
    a.eventId === b.eventId
  );
}
