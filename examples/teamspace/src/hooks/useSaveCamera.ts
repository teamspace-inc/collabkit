import { useCallback, useEffect } from 'react';
import { SpaceStore } from 'state/constants';
import actions from '../state/actions';

export function useSaveCamera(space: SpaceStore, isLoading: boolean) {
  const handleBeforeUnload = useCallback(() => {
    actions.saveCamera(space);
  }, [space]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoading]);

  useEffect(() => {
    return () => {
      // Save camera before space is unmounted (e.g. navigating to another screen)
      actions.saveCamera(space);
    };
  }, [space]);
}
