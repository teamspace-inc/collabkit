import has from 'has';

export type Payload = {
    userId: string;
    workspaceId: string;
}

export function isValidPayload(o: unknown): o is Payload {
    if (typeof o !== 'object' || o == null || Array.isArray(o)) {
        return false;
      }
    const userIdValid = !has(o, 'userId') || o.userId === null || typeof o.userId === 'string';
    const workspaceIdValid = !has(o, 'workspaceId') || o.workspaceId === null || typeof o.workspaceId === 'string';
    return userIdValid && workspaceIdValid;
}