import has from 'has';
import { UserProps } from '../../types';
import { isValidUrl } from './isValidUrl';

export function isValidUser(o: unknown): o is UserProps {
  if (typeof o !== 'object' || o == null || Array.isArray(o)) {
    return false;
  }
  const nameValid = !has(o, 'name') || o.name === null || typeof o.name === 'string';
  const emailValid = !has(o, 'email') || o.email === null || typeof o.email === 'string';
  const avatarValid = !has(o, 'avatar') || o.avatar === null || isValidUrl(o.avatar);
  return nameValid && emailValid && avatarValid;
}
