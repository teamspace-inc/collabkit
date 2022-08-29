import { Workspace } from '../../types';

export function isValidWorkspace(data: any): data is Workspace {
  if (typeof data !== 'object') {
    return false;
  }

  const profilesValid =
    'profiles' in data &&
    Object.keys(data.profiles).every((userId) => typeof userId === 'string') &&
    Object.values(data.profiles).every((value) => value === true);

  const nameValid = 'name' in data ? typeof data.name === 'string' : true;

  return profilesValid && nameValid;
}
