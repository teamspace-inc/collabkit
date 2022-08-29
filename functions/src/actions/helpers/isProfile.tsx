import { Profile } from '../../types';

export function isProfile(data: any): data is Profile {
  return (
    typeof data === 'object' &&
    ('name' in data || 'avatar' in data || 'email' in data || 'color' in data)
  );
}
