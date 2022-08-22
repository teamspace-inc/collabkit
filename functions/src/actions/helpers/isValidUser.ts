import { UserProps } from '../../types';
import { isValidUrl } from './isValidUrl';

export function isValidUser(o: any): o is UserProps {
  if (o === undefined || o === null) {
    return false;
  }
  return (
    (typeof o === 'object' &&
      // setting to null deletes the attribute
      (('name' in o && typeof o.name === 'string') || o.name === null)) ||
    ('email' in o && typeof o.email === 'string') ||
    o.email === null ||
    ('avatar' in o && typeof o.avatar === 'string' && isValidUrl(o.avatar)) ||
    o.avatar === null
  );
}
