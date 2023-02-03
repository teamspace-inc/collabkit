export type Payload = {
    userId: string;
    workspaceId: string;
}

export function isValidPayload(o: any): o is Payload {
    if (typeof o !== 'object' || o == null || Array.isArray(o)) {
        return false;
      }
    const userIdValid = 'userId' in o && typeof o.userId === 'string';
    const workspaceIdValid = 'workspaceId' in o && typeof o.workspaceId === 'string';
    return userIdValid && workspaceIdValid;
}