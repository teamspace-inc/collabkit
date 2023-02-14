export function isValidWorkspaceProfile(data: unknown): data is boolean {
  return data === true || data === false;
}
