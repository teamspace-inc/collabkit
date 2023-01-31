import has from 'has';

export type Payload = {
    userId: string;
    workspaceId: string;
}

export function isValidPayload(o: unknown): o is Payload {
    if (typeof o !== 'object' || o == null || Array.isArray(o)) {
        return false;
      }
    const userIdValid = !has(o, 'name') || o.name === null || typeof o.name === 'string';
    const workspaceIdValid = !has(o, 'email') || o.email === null || typeof o.email === 'string';
    return userIdValid && workspaceIdValid;
}