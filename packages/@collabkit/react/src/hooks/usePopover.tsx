import { useApp } from '../hooks/useApp';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { Target } from '@collabkit/core';
import { useStoreKeyMatches } from './useSubscribeStoreKey';
import equals from 'fast-deep-equal';

export function usePopover(props: {
  target: Target;
  targetMatchFn?: (target: Target | null | undefined) => boolean;
}) {
  const { target, targetMatchFn = (target) => equals(target, props.target) } = props;
  const { store, events } = useApp();
  const contentVisible = useStoreKeyMatches(store, 'viewingId', targetMatchFn);
  const previewVisible = useStoreKeyMatches(store, 'previewingId', targetMatchFn);

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
