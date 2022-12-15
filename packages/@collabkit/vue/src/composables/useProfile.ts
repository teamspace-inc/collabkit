import { inject } from 'vue';
import { ProfileKey, type ProfileContextValue } from '../constants';

export function useProfile(): ProfileContextValue {
  const value = inject<ProfileContextValue>(ProfileKey);
  if (value == null) {
    throw new Error('Profile context not found.');
  }
  return value;
}
