import type { PendingPin, Pin, PinDeleteButton, PinTarget, WithID } from '@collabkit/core';

import {
  autoUpdate,
  FloatingNode,
  offset,
  useFloating,
  useFloatingNodeId,
} from '@floating-ui/react';

import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useSnapshot } from 'valtio';
import { useStore } from '../hooks/useStore';
import { TargetContext } from './Target';
import { useApp } from '../hooks/useApp';
import { useTarget } from '../hooks/useTarget';
import { Menu, MenuItem } from './Menu';
import { PopoverContent, PopoverPreview, PopoverRoot, PopoverTrigger } from './Popover';
import { ProfileAvatar, ProfileProvider } from './Profile';
import {
  CommentBody,
  CommentCreatorName,
  CommentHeader,
  CommentMarkdown,
  CommentReactions,
  CommentReactionsList,
  CommentRoot,
  CommentSeeAllRepliesButton,
  CommentTimestamp,
} from './Comment';
import * as styles from '../theme/components/Pin.css';
import { usePopover } from '../hooks/usePopover';
import { PinIconSVG } from './PinIcon';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
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
import { IconButton } from './IconButton';
import { CaretLeft, CaretRight, CheckCircle, X } from './icons';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { actions } from '@collabkit/client';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { Scrollable } from './Scrollable';
import { ThemeWrapper } from './ThemeWrapper';

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
    whileElementsMounted: (refEl, floatingEl, update) =>
      autoUpdate(refEl, floatingEl, update, {
        animationFrame: true,
      }),
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
    return {
      type: 'pin',
      ...pinTarget,
    };
  }, [pin.id, pin.objectId, pin.eventId, pin.workspaceId, pin.threadId]);

  useEffect(() => {
    if (typeof x === 'number' && typeof y === 'number') {
      const index = store.visiblePinPositions.findIndex((position) => position[0] === pin.id);
      if (index !== -1) {
        store.visiblePinPositions[index] = [pin.id, x, y];
      } else {
        store.visiblePinPositions.push([pin.id, x, y]);
      }
    }
    return () => {
      const index = store.visiblePinPositions.findIndex((position) => position[0] === pin.id);
      if (index !== -1) {
        store.visiblePinPositions.splice(index, 1);
      }
    };
  }, [x, y, pin.id]);

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

function PinThreadPreview({ pin }: { pin: Pin }) {
  const { events } = useApp();

  return (
    <Root>
      <ThemeWrapper>
        <ThreadContext.Provider value={pin.threadId}>
          <div
            className={styles.pinThread}
            onClick={(e) =>
              events.onClick(e, {
                target: {
                  type: 'pinThreadPreview',
                  threadId: pin.threadId,
                  workspaceId: pin.workspaceId,
                  objectId: pin.objectId,
                  eventId: pin.eventId,
                  id: pin.id,
                },
              })
            }
          >
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
      </ThemeWrapper>
    </Root>
  );
}

function useAdjacentPin(direction: 1 | -1 = 1) {
  // todo make this group pins by 'url'
  // so pins on another page are not considered
  const { visiblePinPositions, selectedId, pins } = useSnapshot(useStore());
  const sortedVisiblePinPositions = visiblePinPositions.slice().sort((a, b) => {
    if (a[2] === b[2]) {
      return a[2] - b[2];
    } else {
      return a[1] - b[1];
    }
  });

  const index =
    selectedId?.type === 'pin' || selectedId?.type === 'commentPin'
      ? sortedVisiblePinPositions.findIndex((position) => position[0] === selectedId.id)
      : -2;

  const nextId = sortedVisiblePinPositions[index + direction]?.[0];

  const next = pins.open.find((pin) => pin.id === nextId);

  return next;
}

function PinNextThreadIconButton() {
  const { events } = useApp();
  const next = useAdjacentPin(1);

  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton
          weight="regular"
          data-testid="collabkit-pin-next-thread-button"
          disabled={!next}
          onClick={(e) =>
            next
              ? events.onClick(e, {
                  target: {
                    type: 'pinNextThreadIconButton',
                    id: next.id,
                    objectId: next.objectId,
                    workspaceId: next.workspaceId,
                    threadId: next.threadId,
                    eventId: next.eventId,
                  },
                })
              : null
          }
        >
          <CaretRight />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Next</TooltipContent>
    </Tooltip>
  );
}

function PinPrevThreadIconButton() {
  const { events } = useApp();
  const prev = useAdjacentPin(-1);

  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton
          weight="regular"
          data-testid="collabkit-pin-prev-thread-button"
          disabled={!prev}
          onClick={(e) =>
            prev
              ? events.onClick(e, {
                  target: {
                    type: 'pinPrevThreadIconButton',
                    id: prev.id,
                    objectId: prev.objectId,
                    workspaceId: prev.workspaceId,
                    threadId: prev.threadId,
                    eventId: prev.eventId,
                  },
                })
              : null
          }
        >
          <CaretLeft />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Previous</TooltipContent>
    </Tooltip>
  );
}

function PinThreadResolveIconButton() {
  const { events } = useApp();
  const workspaceId = useWorkspaceContext();
  const threadId = useThreadContext();

  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton
          weight="regular"
          data-testid="collabkit-pin-resolve-thread-button"
          onClick={(e) =>
            events.onClick(e, {
              target: { type: 'pinThreadResolveIconButton', workspaceId, threadId },
            })
          }
        >
          <CheckCircle />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Resolve</TooltipContent>
    </Tooltip>
  );
}

function PinThreadCloseIconButton() {
  const { events } = useApp();
  return (
    <Tooltip>
      <TooltipTrigger>
        <IconButton
          weight="regular"
          data-testid="collabkit-pin-close-thread-button"
          onClick={(e) =>
            events.onClick(e, {
              target: { type: 'pinThreadCloseIconButton' },
            })
          }
        >
          <X />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent>Close</TooltipContent>
    </Tooltip>
  );
}

// clamps the height of a popover to the max available
// height as provided by the popover max size context.
// this is useful for popovers that have a scrollable
// but where we don't want them to take up too much
// vertical space all the time.
function usePopoverMaxHeight(ref: React.RefObject<HTMLDivElement>) {
  const [height, setHeight] = useState<React.CSSProperties['height']>('unset');
  const [opacity, setOpacity] = useState<React.CSSProperties['opacity']>(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const maxHeight = Math.round(window.innerHeight * 0.88);

    // first run
    const height = ref.current.getBoundingClientRect().height;
    if (height > maxHeight) {
      setHeight(maxHeight);
      setOpacity(1);
    } else {
      setOpacity(1);
    }

    // if more content is added and make the height
    // too large, then we need to apply the max height
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          // Firefox implements `contentBoxSize` as a single content rect, rather than an array
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;

          const maxHeight = Math.round(window.innerHeight * 0.88);
          const height = contentBoxSize.blockSize;
          if (height > maxHeight) {
            setHeight(maxHeight);
          }
        }
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { height, opacity };
}

function PinThread({ pin }: { pin: Pin }) {
  const store = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    actions.subscribeThread(store, pin);
  }, [store]);

  const { height, opacity } = usePopoverMaxHeight(ref);

  return (
    <div className={styles.pinThread} ref={ref} style={{ height, opacity }}>
      <ThreadContext.Provider value={pin.threadId}>
        <div
          style={{
            paddingTop: 6,
            fontSize: vars.text.base.fontSize,
            paddingBottom: 6,
            paddingLeft: 8,
            paddingRight: 8,
            display: 'flex',
            flex: 1,
            borderBottom: `1px solid ${vars.color.border}`,
          }}
        >
          <PinPrevThreadIconButton />
          <PinNextThreadIconButton />
          <PinThreadResolveIconButton />
          <div style={{ flex: 1 }} />
          <PinThreadCloseIconButton />
        </div>
        <Scrollable
          autoScroll="bottom"
          // // when there's not enough space (i.e. a pin
          // // is at the bottom of the screen) then we
          // // want to show a minimum height of 2 lines
          // // of comments.
          // maxHeight={COMMENT_MIN_HEIGHT * 2}
          // minHeight={COMMENT_MIN_HEIGHT * 2}
        >
          <div ref={listRef}>
            <CommentList />
          </div>
        </Scrollable>
        <Composer autoFocus={true} />
      </ThreadContext.Provider>
    </div>
  );
}

function PinNewThreadComposer({ pin }: { pin: Pin }) {
  return (
    <div className={styles.pinThread}>
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
  );
}

type PinIconProps = { onPointerDown: (e: React.PointerEvent) => void; isSelected: boolean };

const PinIcon = forwardRef<HTMLDivElement, PinIconProps>(function PinIcon(
  props: PinIconProps,
  ref
) {
  return (
    <div className={styles.pinIcon} onPointerDown={props.onPointerDown} ref={ref}>
      <PinIconSVG isSelected={props.isSelected} />
      <div className={styles.pinAvatar}>
        <ProfileAvatar />
      </div>
    </div>
  );
});

const PinMarker = forwardRef<HTMLDivElement, PinMarkerProps>(function PinMarker(props, ref) {
  const { isSelected, pin, pointerEvents } = props;
  const { events, store } = useApp();
  const { isFigmaStyle } = useSnapshot(store);
  const target = useTarget();
  const isEditing = useStoreKeyMatches(store, 'editingId', (editingId) => {
    return editingId?.type === 'comment' && editingId.eventId === pin.eventId;
  });

  const onClick = useCallback(
    (e: React.PointerEvent) => events.onClick(e, { target }),
    [events, target]
  );

  const popoverProps = usePopover({
    target,
    targetMatchFn: (otherTarget) =>
      !!(otherTarget && otherTarget.type === 'pin' && otherTarget.id === pin.id),
  });

  // todo all check if the thread is empty here
  const isNewThread = !isEditing && has(pin, 'pending') && pin.pending;

  const pinThreadPreview = isNewThread ? null : <PinThreadPreview pin={pin} />;

  const pinThreadContent = isNewThread ? (
    <PinNewThreadComposer pin={pin} />
  ) : (
    <PinThread pin={pin} />
  );

  return pin ? (
    <ProfileProvider profileId={pin.createdById}>
      <div
        className={`collabkit ${styles.pin({ pointerEvents, isSelected })}`}
        ref={ref}
        style={props.style}
        data-testid="collabkit-pin-marker"
      >
        {/* <PinMenu> */}
        <div>
          <PopoverRoot {...popoverProps} dismissOnClickOutside={true} shouldFlipToKeepInView={true}>
            <PopoverTrigger>
              <PinIcon onPointerDown={onClick} isSelected={isSelected} />
            </PopoverTrigger>
            <PopoverPreview>{pinThreadPreview}</PopoverPreview>
            <PopoverContent>{isFigmaStyle ? pinThreadContent : pinThreadPreview}</PopoverContent>
          </PopoverRoot>
        </div>
        {/* </PinMenu> */}
      </div>
    </ProfileProvider>
  ) : null;
});

export { SavedPin, PinMarker, PinIcon };
