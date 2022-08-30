import { Workspace } from '../../types';
import { isValidWorkspaceProfiles } from './isValidWorkspaceProfiles';

export function isValidWorkspace(data: any): data is Workspace {
  if (typeof data !== 'object') {
    return false;
  }

  const profilesValid = 'profiles' in data ? isValidWorkspaceProfiles(data.profiles) : true;
  const nameValid = 'name' in data ? typeof data.name === 'string' : true;

  return profilesValid && nameValid;
}
