import React, { forwardRef } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { previewRoot } from '../styles/components/PopoverThread.css';
import CommentList from './CommentList';
import { Handle, PopoverThreadProps } from './PopoverThread';
import { Scrollable } from './ScrollArea';
import { ThemeWrapper } from './ThemeWrapper';
import { ThreadProvider } from './Thread';

export const PreviewThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { store } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isEmpty, messageEvents } = useThread({
    ...props,
    store,
    workspaceId,
  });

  const event = messageEvents?.[0];
  const profile = event && profiles[event?.createdById];

  if (!workspaceId || !userId || !event || !profile || isEmpty) {
    return null;
  }

  return (
    <ThreadProvider {...props}>
      <ThemeWrapper>
        <div className={previewRoot} data-collabkit-internal="true" style={props.style} ref={ref}>
          <Scrollable maxHeight={props.maxAvailableSize?.height ?? 'unset'}>
            <CommentList />
          </Scrollable>
        </div>
      </ThemeWrapper>
    </ThreadProvider>
  );
});
