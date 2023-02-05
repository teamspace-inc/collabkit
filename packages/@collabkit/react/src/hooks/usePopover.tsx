import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { Target } from '@collabkit/core';
import isEqual from 'fast-deep-equal';

export function usePopover(props: { target: Target | null }) {
  const { target } = props;
  const { store, events } = useApp();
  const { viewingId, previewingId } = useSnapshot(store);

  const contentVisible = isEqual(viewingId, target);
  const previewVisible = isEqual(previewingId, target);

  const onContentChange = useCallbackRef((open: boolean) => {
    if (target) {
      events.onPopoverContentChange({ target, open });
    }
  });
  const onPreviewChange = useCallbackRef((open: boolean) => {
    if (target) {
      events.onPopoverPreviewChange({ target, open });
    }
  });
  const showContent = useCallbackRef(() => {
    if (target) {
      events.onPopoverContentChange({ target, open: true });
    }
  });
  const hideContent = useCallbackRef(() => {
    if (target) {
      events.onPopoverContentChange({ target, open: false });
    }
  });
  const showPreview = useCallbackRef(() => {
    if (target) {
      events.onPopoverPreviewChange({ target, open: true });
    }
  });
  const hidePreview = useCallbackRef(() => {
    if (target) {
      events.onPopoverPreviewChange({ target, open: false });
    }
  });

  return {
    contentVisible,
    previewVisible,
    onContentChange,
    onPreviewChange,
    showContent,
    hideContent,
    showPreview,
    hidePreview,
  };
}
