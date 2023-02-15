import type { Pin, PinDeleteButton, PinTarget, WithID } from '@collabkit/core';

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
import { vars } from '../theme/theme/index.css';
import { Menu, MenuItem } from './Menu';
import { PopoverContent, PopoverPreview, PopoverRoot, PopoverTrigger } from './Popover';
import { ProfileAvatar, ProfileProvider } from './Profile';
import {
  CommentBody,
  CommentCreatorName,
  CommentHeader,
  CommentMarkdown,
  CommentReactions,
  CommentRoot,
  CommentTimestamp,
} from './Comment';
import * as styles from '../theme/components/Pin.css';
import { usePopover } from '../hooks/usePopover';
import { useUserContext } from '../hooks/useUserContext';
import { PinIcon } from './PinIcon';
import { ThreadContext } from '../hooks/useThreadContext';
import { CommentList } from './CommentList';
import { Composer } from './composer/Composer';

function SavedPin({
  pin,
  isSelected,
}: {
  isSelected: boolean;
  pin: WithID<Pin> & { objectId: string };
}) {
  const store = useStore();
  const { update, reference, floating, strategy, x, y } = useFloating({
    placement: 'top-start',
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
    const unproxedPinTarget = JSON.parse(JSON.stringify(pinTarget));
    return {
      type: 'pin',
      ...unproxedPinTarget,
    };
  }, [pin.id, pin.objectId, pin.eventId, pin.workspaceId, pin.threadId]);

  const id = useFloatingNodeId();

  if (!commentables[pin.objectId]) {
    return null;
  }

  return (
    <TargetContext.Provider value={target}>
      <FloatingNode id={id}>
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
            pin: target,
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
  pin: WithID<Pin>;
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
        <PinIcon isSelected={props.isSelected} />
        <div className={styles.pinAvatar}>
          <ProfileAvatar />
        </div>
      </div>
    </ProfileProvider>
  );
});

function PinPreview({ pin }: { pin: Pin }) {
  return (
    <ThreadContext.Provider value={pin.threadId}>
      <CommentRoot commentId={pin.eventId} className={styles.pinPreview}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <CommentHeader>
            <CommentCreatorName />
            <CommentTimestamp />
          </CommentHeader>
          <CommentBody>
            <CommentMarkdown />
          </CommentBody>
          <CommentReactions />
        </div>
      </CommentRoot>
    </ThreadContext.Provider>
  );
}

function PinThread({ pin }: { pin: Pin }) {
  return (
    <ThreadContext.Provider value={pin.threadId}>
      Content
      <CommentList />
      <Composer />
    </ThreadContext.Provider>
  );
}

const PinMarker = forwardRef<HTMLDivElement, PinMarkerProps>(function PinMarker(props, ref) {
  const { isSelected, pin, pointerEvents } = props;
  const { events } = useApp();
  const target = useTarget();

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => events.onPointerDown(e, { target }),
    [events, target]
  );

  const popoverProps = usePopover({ target });

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
              <div>
                <PinIcon isSelected={isSelected} />
                <div className={styles.pinAvatar}>
                  <ProfileAvatar />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverPreview>
              <PinPreview pin={pin} />
            </PopoverPreview>
            <PopoverContent>
              <PinThread pin={pin} />
            </PopoverContent>
          </PopoverRoot>
        </div>
        {/* </PinMenu> */}
      </div>
    </ProfileProvider>
  ) : null;
});

export { SavedPin, PinMarker, PinCursor };
