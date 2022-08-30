import { WorkspaceProfiles } from '../../types';

export function isValidWorkspaceProfiles(data: any): data is WorkspaceProfiles {
  if (typeof data !== 'object') {
    return false;
  }

  const profilesValid =
    Object.keys(data).every((userId) => typeof userId === 'string') &&
    Object.values(data).every((value) => value === true);

  return profilesValid;
}
