import { Profile } from '../../types';
import has from 'has';

export function isValidProfile(data: unknown): data is Profile {
  return (
    typeof data === 'object' &&
    data !== null &&
    (has(data, 'name') || has(data, 'email') || has(data, 'avatar') || has(data, 'color'))
  );
}
