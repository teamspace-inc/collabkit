import { actions } from '@collabkit/client';
import { useEffect } from 'react';
import { useStore } from '../hooks/useStore';

export function useSidebarDefaultOpen(props: { defaultOpen?: boolean }) {
  const { defaultOpen } = props;
  const store = useStore();
  useEffect(() => {
    if (defaultOpen) {
      actions.showSidebar(store);
    }
  }, [store, defaultOpen]);
}
