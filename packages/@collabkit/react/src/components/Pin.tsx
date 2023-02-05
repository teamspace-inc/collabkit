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
import * as styles from '../theme/components/Commentable.css';
import Comment from './Comment';
import { usePopover } from '../hooks/usePopover';

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
    const { x, y, ...pinTarget } = pin;
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
          userId={pin.createdById}
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
  userId: string;
  pin?: WithID<Pin>;
};

export const PinMarker = forwardRef<HTMLDivElement, PinMarkerProps>(function PinMarker(props, ref) {
  const { isSelected, userId, pin, pointerEvents } = props;
  const { events } = useApp();
  const target = useTarget();

  if (userId == null) {
    return null;
  }
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      events.onPointerDown(e, { target });
    },
    [events, target]
  );

  const popoverProps = usePopover({ target });

  return (
    <Profile.Provider profileId={userId}>
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
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2288 37.4788L30.8539 27.8536C33.7325 24.9751 35.3496 21.0709 35.3496 17C35.3496 12.9291 33.7325 9.02492 30.8539 6.14635L30.8539 6.14633C29.4286 4.72101 27.7365 3.59038 25.8742 2.819C24.0119 2.04762 22.0159 1.6506 20.0002 1.6506C17.9845 1.6506 15.9885 2.04762 14.1263 2.819C12.264 3.59038 10.5719 4.72101 9.14656 6.14633L9.14654 6.14636C7.72122 7.57168 6.59059 9.26378 5.81921 11.126C5.04783 12.9883 4.65081 14.9843 4.65081 17C4.65081 19.0157 5.04783 21.0117 5.81921 22.8739C6.59059 24.7362 7.72122 26.4283 9.14654 27.8536L18.7717 37.4788C19.0975 37.8046 19.5394 37.9877 20.0002 37.9877C20.461 37.9877 20.903 37.8046 21.2288 37.4788Z"
                      fill={isSelected ? vars.color.attentionBlue : vars.color.background}
                      stroke={isSelected ? vars.color.attentionBlue : vars.color.textPrimary}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className={styles.pinAvatar}>
                    <Profile.Avatar />
                  </div>
                </div>
              </Popover.Trigger>
              <Popover.Preview>
                {pin && (
                  <div>
                    <Thread.Provider threadId={pin?.threadId}>
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
                )}
              </Popover.Preview>
            </Popover.Root>
          </div>
        </PinMenu>
      </div>
    </Profile.Provider>
  );
});
