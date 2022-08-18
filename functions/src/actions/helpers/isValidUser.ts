import { UserProps } from '../../types';

export function isValidUser(o: any): o is UserProps {
  return (
    (o !== null &&
      typeof o === 'object' &&
      // setting to null deletes the attribute
      (('name' in o && typeof o.name === 'string') || o.name === null)) ||
    ('email' in o && typeof o.email === 'string') ||
    o.email === null ||
    ('avatar' in o && typeof o.avatar === 'string') ||
    o.avatar === null ||
    o === null
  );
}
