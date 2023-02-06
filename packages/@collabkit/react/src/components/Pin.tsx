import type { Pin, PinDeleteButton, PinTarget, WithID } from '@collabkit/core';

import {
  autoUpdate,
  FloatingNode,
  offset,
  useFloating,
  useFloatingNodeId,
} from '@floating-ui/react-dom-interactions';

import React, { forwardRef, useCallback, useContext, useEffect, useMemo } from 'react';

import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';
import { TargetContext } from './Target';
import { useApp } from '../hooks/useApp';
import { useTarget } from '../hooks/useTarget';
import { previewRoot } from '../theme/components/PopoverThread.css';
import { vars } from '../theme/theme/index.css';
import { Menu, MenuItem } from './Menu';
import { Popover } from './Popover';
import { Thread } from './Thread';
import Profile from './Profile';
import Comment from './Comment';
import * as styles from '../theme/components/Commentable.css';
import { usePopover } from '../hooks/usePopover';
import { useUserContext } from '../hooks/useUserContext';
import { PinIcon } from './PinIcon';

export function SavedPin({
  pin,
  isSelected,
}: {
  isSelected: boolean;
  pin: WithID<Pin> & { objectId: string };
}) {
  const store = useStore();
  const { reference, floating, strategy, x, y } = useFloating({
    placement: 'top-start',
    middleware: [
      offset(({ rects }) => ({
        crossAxis: rects.reference.width * pin.x,
        mainAxis: -(rects.reference.height * pin.y + rects.floating.height),
      })),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { commentables } = useSnapshot(store);

  useEffect(() => {
    const commentable = store.commentables[pin.objectId];
    if (commentable) {
      reference(commentable.element);
    }
  });

  const target: PinTarget = useMemo(() => {
    const { x, y, createdById, ...pinTarget } = pin;
    return {
      type: 'pin',
      ...pinTarget,
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

export const PinCursor = forwardRef<HTMLDivElement, { isSelected: boolean }>(function PinCursor(
  props,
  ref
) {
  const userId = useUserContext();
  return (
    <Profile.Provider profileId={userId}>
      <div
        className={`collabkit ${styles.pin({ pointerEvents: 'none' })}`}
        data-testid="collabkit-pin-marker"
        ref={ref}
      >
        <PinIcon isSelected={props.isSelected} />
        <div className={styles.pinAvatar}>
          <Profile.Avatar />
        </div>
      </div>
    </Profile.Provider>
  );
});

export const PinMarker = forwardRef<HTMLDivElement, PinMarkerProps>(function PinMarker(props, ref) {
  const { isSelected, pin, pointerEvents } = props;
  const { events } = useApp();
  const target = useTarget();

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => events.onPointerDown(e, { target }),
    [events, target]
  );

  const popoverProps = usePopover({ target });

  return pin ? (
    <Profile.Provider profileId={pin.createdById}>
      <div
        className={`collabkit ${styles.pin({ pointerEvents, isSelected })}`}
        ref={ref}
        style={props.style}
        onPointerDown={onPointerDown}
        data-testid="collabkit-pin-marker"
      >
        <PinMenu>
          <div>
            <Popover.Root
              {...popoverProps}
              dismissOnClickOutside={true}
              shouldFlipToKeepInView={true}
              defaultOpen={false}
            >
              <Popover.Trigger>
                <div>
                  <PinIcon isSelected={isSelected} />
                  <div className={styles.pinAvatar}>
                    <Profile.Avatar />
                  </div>
                </div>
              </Popover.Trigger>
              <Popover.Preview>
                <div>
                  <Thread.Provider threadId={pin.threadId}>
                    <Comment.Root
                      commentId={pin.eventId}
                      className={previewRoot}
                      style={{ padding: `${vars.space[3]} ${vars.space[3]}`, maxWidth: 180 }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Comment.Header>
                          <Comment.CreatorName />
                          <Comment.Timestamp />
                        </Comment.Header>
                        <Comment.Body>
                          <Comment.Markdown />
                        </Comment.Body>
                        <Comment.Reactions />
                      </div>
                    </Comment.Root>
                  </Thread.Provider>
                </div>
              </Popover.Preview>
            </Popover.Root>
          </div>
        </PinMenu>
      </div>
    </Profile.Provider>
  ) : null;
});
