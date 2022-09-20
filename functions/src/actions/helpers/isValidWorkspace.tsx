import has from 'has';
import { Workspace } from '../../types';
import { isValidWorkspaceProfiles } from './isValidWorkspaceProfiles';

export function isValidWorkspace(data: unknown): data is Workspace {
  if (typeof data !== 'object') {
    return false;
  }

  if (data === null) {
    return false;
  }

  const profilesValid = has(data, 'profiles') ? isValidWorkspaceProfiles(data.profiles) : true;
  const nameValid = has(data, 'name') ? typeof data.name === 'string' : true;

  return profilesValid && nameValid;
}
