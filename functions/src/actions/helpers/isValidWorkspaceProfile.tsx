export function isValidWorkspaceProfile(data: unknown): data is boolean {
  return data == null || data === true || data === false;
}
