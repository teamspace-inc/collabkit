import type { PendingPin, Pin, PinTarget, WithID } from '@collabkit/core';
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
  CommentReplyCountButton,
  CommentTimestamp,
} from './Comment';
import * as styles from '../theme/components/Pin.css';
import { usePopover } from '../hooks/usePopover';
import { ThreadContext, useThreadContext } from '../hooks/useThreadContext';
import { CommentList } from './CommentList';
import {
  Composer,
  ComposerEditor,
  ComposerInput,
  ComposerPlaceholder,
  ComposerRoot,
} from './composer/Composer';
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

type PinMarkerProps = {
  style?: React.CSSProperties;
  pointerEvents: 'all' | 'none';
  isSelected: boolean;
  pin: WithID<Pin | PendingPin>;
};

function PinThreadPreview({ pin }: { pin: Pin }) {
  const { events } = useApp();

  return (
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
              <CommentReplyCountButton onClick={() => {}} />
            </div>
          </CommentRoot>
        </div>
      </ThreadContext.Provider>
    </ThemeWrapper>
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
    <div onPointerDown={props.onPointerDown} ref={ref}>
      <PinIconSVG isSelected={props.isSelected} />
      <div className={styles.pinAvatar}>
        <ProfileAvatar />
      </div>
    </div>
  );
});

export function PinIconSVG({ isSelected }: { isSelected: boolean }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className={styles.pinIcon({ isSelected })}
        d="M3.23745 32.6988H16.8494C21.0529 32.6988 25.0843 31.029 28.0566 28.0566C31.029 25.0843 32.6988 21.0529 32.6988 16.8494V16.8494C32.6988 14.768 32.2888 12.707 31.4923 10.7841C30.6958 8.86116 29.5284 7.11393 28.0566 5.64218C26.5849 4.17043 24.8376 3.00297 22.9147 2.20646C20.9918 1.40996 18.9308 1 16.8494 1H16.8494C14.768 1 12.707 1.40996 10.7841 2.20646C8.86115 3.00297 7.11392 4.17042 5.64217 5.64217C4.17042 7.11392 3.00297 8.86114 2.20646 10.7841C1.40996 12.707 1 14.768 1 16.8494L1 30.4613C1 31.0548 1.23573 31.6239 1.65533 32.0435C2.07494 32.4631 2.64404 32.6988 3.23745 32.6988Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
