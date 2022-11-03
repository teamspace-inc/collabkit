import React, { forwardRef } from 'react';
import { ThreadInfo } from '@collabkit/core';
import CommentList from './CommentList';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { useSnapshot } from 'valtio';
import { Scrollable } from './ScrollArea';
import Composer from './composer/Composer';
import Profile from './Profile';
import * as styles from '../styles/components/PopoverThread.css';
import { ThemeWrapper } from './ThemeWrapper';
// import { useComposer } from '../hooks/useComposer';
// import { ButtonGroup } from './ButtonGroup';
import { ThreadProvider } from './Thread';

export type PopoverThreadProps = {
  threadId: string;
  info?: ThreadInfo;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  maxAvailableSize?: { width: number; height: number } | null;
  hideComposer?: boolean;
  formatTimestamp?: (timestamp: number) => string;
}; // make this an extension of ThreadProps

export type Handle = HTMLDivElement | null;

export const PopoverThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  // const { threadId } = props;

  const { store } = useApp();
  const { workspaceId, profiles, userId } = useSnapshot(store);

  const { isEmpty } = useThread({
    ...props,
    store,
    workspaceId,
  });

  // const { isEnabled, onPointerDown } = useComposer({ workspaceId, threadId });

  const profile = userId ? profiles[userId] : null;

  if (!workspaceId || !userId) {
    return null;
  }

  return (
    <ThreadProvider {...props}>
      <ThemeWrapper>
        <div className={styles.root} data-collabkit-internal="true" style={props.style} ref={ref}>
          <Scrollable maxHeight={props.maxAvailableSize?.height ?? 'unset'}>
            {isEmpty &&
              (profile ? (
                <div
                  style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <Profile.Provider profileId={userId}>
                    <Profile.Avatar />
                    <Profile.Name />
                  </Profile.Provider>
                </div>
              ) : null)}
            <CommentList />
            {props.hideComposer ? null : <Composer />}
          </Scrollable>
        </div>
      </ThemeWrapper>
    </ThreadProvider>
  );
});

/* <Composer.Root className={styles.composerRoot} autoFocus={props.autoFocus ?? true}>
    <Composer.Editor
      contentEditable={<Composer.ContentEditable />}
      placeholder={
        <Composer.Placeholder>
          {isEmpty ? 'Add a comment' : 'Reply to this comment'}
        </Composer.Placeholder>
      }
    />
  </Composer.Root> */
/* <ButtonGroup
    onCancel={(e) =>
      events.onPointerDown(e, {
        target: {
          type: 'closeThreadButton',
          threadId,
          workspaceId,
        },
      })
    }
    onConfirm={onPointerDown}
    confirmButtonEnabled={isEnabled}
    confirmButtonText={'Comment'}
  /> */
