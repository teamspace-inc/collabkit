import type { PendingPin, Pin, PinDeleteButton, PinTarget, WithID } from '@collabkit/core';

import {
  autoUpdate,
  FloatingNode,
  offset,
  useFloating,
  useFloatingNodeId,
} from '@floating-ui/react';

import React, { forwardRef, useCallback, useContext, useEffect, useMemo } from 'react';

import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';
import { TargetContext } from './Target';
import { useApp } from '../hooks/useApp';
import { useTarget } from '../hooks/useTarget';
import { Menu, MenuItem } from './Menu';
import { PopoverContent, PopoverPreview, PopoverRoot, PopoverTrigger } from './Popover';
import { ProfileAvatar, ProfileProvider } from './Profile';
import {
  CommentActions,
  CommentBody,
  CommentCreatorName,
  CommentReactionsListAddEmojiButton,
  CommentHeader,
  CommentMarkdown,
  CommentMenu,
  CommentReactions,
  CommentReactionsList,
  CommentRoot,
  CommentSeeAllRepliesButton,
  CommentTimestamp,
} from './Comment';
import * as styles from '../theme/components/Pin.css';
import { usePopover } from '../hooks/usePopover';
import { useUserContext } from '../hooks/useUserContext';
import { PinIconSVG } from './PinIcon';
import { ThreadContext } from '../hooks/useThreadContext';
import { CommentList } from './CommentList';
import {
  Composer,
  ComposerEditor,
  ComposerInput,
  ComposerPlaceholder,
  ComposerRoot,
} from './composer/Composer';
import { Root } from './Root';
import has from 'has';
import { vars } from '../theme/theme/index.css';
import { useStoreKeyMatches } from '../hooks/useSubscribeStoreKey';

function SavedPin({
  pin,
  isSelected,
}: {
  isSelected: boolean;
  pin: WithID<Pin | PendingPin> & { objectId: string };
}) {
  const store = useStore();
  const nodeId = useFloatingNodeId();

  const { update, reference, floating, strategy, x, y } = useFloating({
    placement: 'top-start',
    nodeId,
    middleware: [
      offset(({ rects }) => ({
        crossAxis: rects.reference.width * pin.x,
        mainAxis: -(rects.reference.height * pin.y + rects.floating.height),
      })),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { dragPinObjectId } = useSnapshot(store);

  useEffect(() => {
    if (dragPinObjectId == pin.objectId) {
      store.dragPinUpdate.push(update);
    }
  }, [dragPinObjectId]);

  const { commentables } = useSnapshot(store);

  useEffect(() => {
    const commentable = store.commentables[pin.objectId];
    if (commentable) {
      reference(commentable.element);
    }
  });

  const target: PinTarget = useMemo(() => {
    const { x, y, createdById, ...pinTarget } = pin;
    const purePinTarget = structuredClone(pinTarget);
    return {
      type: 'pin',
      ...purePinTarget,
    };
  }, [pin.id, pin.objectId, pin.eventId, pin.workspaceId, pin.threadId]);

  if (!commentables[pin.objectId]) {
    return null;
  }

  return (
    <TargetContext.Provider value={target}>
      <FloatingNode id={nodeId}>
        <PinMarker
          isSelected={isSelected}
          pointerEvents="all"
          ref={floating}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
          pin={pin}
        />
      </FloatingNode>
    </TargetContext.Provider>
  );
}

function PinMenu(props: { className?: string; children: React.ReactNode }) {
  const { events } = useApp();
  const target = useContext(TargetContext);

  const onItemClick = useCallback(
    (e: React.MouseEvent) => {
      if (target?.type === 'pin') {
        events.onClick(e, {
          target: {
            type: 'pinDeleteButton',
            objectId: target.objectId,
            pinId: target.id,
            workspaceId: target.workspaceId,
            threadId: target.threadId,
            eventId: target.eventId,
          },
        });
      }
    },
    [events.onClick, target]
  );

  return (
    <Menu<PinDeleteButton>
      data-testid="collabkit-pin-menu"
      className={props.className}
      onItemClick={onItemClick}
      event="contextmenu"
      items={[
        <MenuItem
          label="Delete pin"
          targetType="pinDeleteButton"
          data-testid="collabkit-pin-menu-delete-button"
        />,
      ]}
    >
      {props.children}
    </Menu>
  );
}

type PinMarkerProps = {
  style?: React.CSSProperties;
  pointerEvents: 'all' | 'none';
  isSelected: boolean;
  pin: WithID<Pin | PendingPin>;
};

const PinCursor = forwardRef<HTMLDivElement, { isSelected: boolean }>(function PinCursor(
  props,
  ref
) {
  const userId = useUserContext();
  return (
    <ProfileProvider profileId={userId}>
      <div
        className={`collabkit ${styles.pin({ pointerEvents: 'none' })}`}
        data-testid="collabkit-pin-marker"
        ref={ref}
      >
        <PinIconSVG isSelected={props.isSelected} />
        <div className={styles.pinAvatar}>
          <ProfileAvatar />
        </div>
      </div>
    </ProfileProvider>
  );
});

function PinPreview({ pin }: { pin: Pin }) {
  return (
    <Root>
      <ThreadContext.Provider value={pin.threadId}>
        <div className={styles.pinPopover}>
          <CommentRoot commentId={pin.eventId} className={styles.pinPreview}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CommentHeader>
                <CommentCreatorName />
                <CommentTimestamp />
              </CommentHeader>
              <CommentBody>
                <CommentMarkdown />
              </CommentBody>
              <CommentReactions>
                <CommentReactionsList disabled={true} />
              </CommentReactions>
              <CommentSeeAllRepliesButton onClick={() => {}} />
            </div>
          </CommentRoot>
        </div>
      </ThreadContext.Provider>
    </Root>
  );
}

function PinThread({ pin }: { pin: Pin }) {
  return (
    <Root>
      <div className={styles.pinPopover}>
        <ThreadContext.Provider value={pin.threadId}>
          <CommentList />
          <Composer autoFocus={true} />
        </ThreadContext.Provider>
      </div>
    </Root>
  );
}

function PinNewThreadComposer({ pin }: { pin: Pin }) {
  return (
    <Root>
      <div className={styles.pinPopover}>
        <ThreadContext.Provider value={pin.threadId}>
          <ComposerRoot className="" isNewThread={true}>
            <ComposerEditor style={{ borderRadius: 12, padding: vars.space[1] }}>
              <ComposerInput
                autoFocus={true}
                placeholder={<ComposerPlaceholder>Add a comment</ComposerPlaceholder>}
              />
            </ComposerEditor>
          </ComposerRoot>
        </ThreadContext.Provider>
      </div>
    </Root>
  );
}

const PinMarker = forwardRef<HTMLDivElement, PinMarkerProps>(function PinMarker(props, ref) {
  const { isSelected, pin, pointerEvents } = props;
  const { events, store } = useApp();
  const target = useTarget();
  const isEditing = useStoreKeyMatches(store, 'editingId', (editingId) => {
    return editingId?.type === 'comment' && editingId.eventId === pin.eventId;
  });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => events.onPointerDown(e, { target }),
    [events, target]
  );

  const popoverProps = usePopover({
    target,
    targetMatchFn: (otherTarget) =>
      !!(otherTarget && otherTarget.type === 'pin' && otherTarget.id === pin.id),
  });

  // todo all check if the thread is empty here
  const isNewThread = !isEditing && has(pin, 'pending') && pin.pending;

  return pin ? (
    <ProfileProvider profileId={pin.createdById}>
      <div
        className={`collabkit ${styles.pin({ pointerEvents, isSelected })}`}
        ref={ref}
        style={props.style}
        onPointerDown={onPointerDown}
        data-testid="collabkit-pin-marker"
      >
        {/* <PinMenu> */}
        <div>
          <PopoverRoot {...popoverProps} dismissOnClickOutside={true} shouldFlipToKeepInView={true}>
            <PopoverTrigger>
              <div className={styles.pinIcon}>
                <PinIconSVG isSelected={isSelected} />
                <div className={styles.pinAvatar}>
                  <ProfileAvatar />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverPreview>{isNewThread ? null : <PinPreview pin={pin} />}</PopoverPreview>
            <PopoverContent>
              {isNewThread ? <PinNewThreadComposer pin={pin} /> : <PinThread pin={pin} />}
            </PopoverContent>
          </PopoverRoot>
        </div>
        {/* </PinMenu> */}
      </div>
    </ProfileProvider>
  ) : null;
});

export { SavedPin, PinMarker, PinCursor };
