import { useOptionalUserContext } from './useOptionalUserContext';

export function useUserContext() {
  const userId = useOptionalUserContext();
  if (!userId) {
    throw new Error('UserContext not found');
  }
  return userId;
}
