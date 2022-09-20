import { Profile } from '../../types';

export function isValidProfile(data: unknown): data is Profile {
  return (
    typeof data === 'object' &&
    data !== null &&
    ('name' in data || 'avatar' in data || 'email' in data || 'color' in data)
  );
}
