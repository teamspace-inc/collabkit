import { actions } from '@collabkit/client';
import { useEffect } from 'react';
import { useStore } from '../hooks/useStore';

export function useSidebarDefaultOpen(props: { defaultOpen?: any }) {
  const { defaultOpen } = props;
  const store = useStore();
  useEffect(() => {
    if (typeof defaultOpen !== 'undefined') {
      actions.showSidebar(store);
    }
  }, [store, defaultOpen]);
}
