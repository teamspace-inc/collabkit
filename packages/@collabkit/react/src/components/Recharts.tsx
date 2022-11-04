import React, {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useRole,
  useDismiss,
  useFloating,
  FloatingFocusManager,
  useInteractions,
  useListNavigation,
  useTypeahead,
  FloatingOverlay,
} from '@floating-ui/react-dom-interactions';
import { actions } from '@collabkit/client';
import { nanoid } from 'nanoid';
import { useSnapshot } from 'valtio';

import { useApp } from '../hooks/useApp';
import { ThreadMeta } from '@collabkit/core';
import { useUserContext } from '../hooks/useUserContext';
import { PopoverTrigger, usePopoverThread } from './PopoverTrigger';
import * as styles from '../styles/components/Recharts.css';

type CursorInfo = {
  objectId: string | null;
  xValue: number | null;
  yValue: number | null;
};

const ChartContext = createContext((info: CursorInfo) => {});

function CollabKitRechartsRoot(props: { children: ReactNode }) {
  const menuRef = useRef<MenuHandle>();
  const [cursorInfo, setCursorInfo] = useState<CursorInfo>({
    objectId: null,
    xValue: null,
    yValue: null,
  });
  const { workspaceId } = useUserContext();
  const { store } = useApp();

  const onAddComment = useCallback(() => {
    const threadId = nanoid();
    if (cursorInfo.objectId != null) {
      actions.saveThreadInfo(store, {
        info: {
          meta: {
            cellId: cursorInfo.objectId,
            objectId: cursorInfo.objectId,
            xValue: cursorInfo.xValue,
            yValue: cursorInfo.yValue,
          },
        },
        workspaceId,
        threadId,
        isOpen: true,
      });
      actions.viewThread(store, {
        target: { type: 'thread', threadId, workspaceId },
        isPreview: false,
      });
    }
  }, [cursorInfo.objectId, cursorInfo.xValue, cursorInfo.yValue, workspaceId]);

  return (
    <div
      style={{ display: 'contents', position: 'relative' }}
      onContextMenu={(e) => {
        if (menuRef.current) {
          menuRef.current.onContextMenu(e);
        }
      }}
    >
      <ChartContext.Provider value={setCursorInfo}>{props.children}</ChartContext.Provider>

      <Menu ref={menuRef}>
        <MenuItem label="Add Comment" onClick={onAddComment} />
      </Menu>
    </div>
  );
}

function CollabKitRechartsChart(props: any) {
  const yAxisId = Object.keys(props.yAxisMap)[0];
  const yAxis = props.yAxisMap[yAxisId];

  let xValue: number | null = null;
  let yValue: number | null = null;
  let objectId: string | null = null;
  if (props.activeTooltipIndex != null && props.activeTooltipIndex != -1) {
    const entry = props.data[props.activeTooltipIndex];
    objectId = props.getObjectId(entry);
    yValue = yAxis.scale.invert(props.activeCoordinate.y);
    xValue = props.tooltipTicks[props.activeTooltipIndex]?.value;
  }
  const setPageInfo = useContext(ChartContext);
  useEffect(() => {
    setPageInfo({ objectId, xValue, yValue });
  }, [objectId, xValue, yValue]);

  const objectIds = new Set(props.data.map((entry: any) => props.getObjectId(entry)));

  const { store } = useApp();
  const { workspaceId, workspaces } = useSnapshot(store);
  const openThreads = workspaceId ? workspaces[workspaceId]?.openThreads : {};

  const threads = [];
  for (const [threadId, { meta }] of Object.entries(openThreads)) {
    if (meta.cellId && (meta as any).yValue != null && objectIds.has(meta.cellId)) {
      threads.push({ threadId, meta });
    }
  }
  return (
    <>
      {threads.map(({ threadId, meta }, i) => {
        const objectId = meta.cellId;
        if (objectId) {
          const index = props.data.findIndex((entry: any) => props.getObjectId(entry) === objectId);
          const entry = props.tooltipTicks.find((tick: any) => tick && tick.index === index);
          const x = entry.coordinate;
          const y = yAxis.scale(meta.yValue);
          return (
            <Pin key={`${objectId}-${i}`} x={x} y={y} objectId={objectId} threadId={threadId} />
          );
        }
        return null;
      })}
    </>
  );
}

function Pin({ x, y, objectId }: { x: number; y: number; objectId: string; threadId: string }) {
  const { context, setPopoverState } = usePopoverThread({ cellId: objectId });
  return (
    <PopoverTrigger context={context}>
      <circle cx={x} cy={y} r={12} onClick={() => setPopoverState('open')} />
    </PopoverTrigger>
  );
}

export default {
  Root: CollabKitRechartsRoot,
  Chart: CollabKitRechartsChart,
};

type MenuHandle = { onContextMenu: (e: React.MouseEvent) => void };

export const MenuItem = forwardRef<
  HTMLButtonElement,
  { label: string } & ComponentPropsWithoutRef<'button'>
>(({ label, ...props }, ref) => {
  return (
    <button {...props} ref={ref} role="menuitem">
      {label}
    </button>
  );
});

interface MenuProps {
  label?: string;
  nested?: boolean;
}

export const Menu = forwardRef<any, MenuProps & React.HTMLProps<HTMLButtonElement>>(
  ({ children }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
    const listContentRef = useRef(
      Children.map(children, (child) =>
        isValidElement(child) ? child.props.label : null
      ) as Array<string | null>
    );

    const { x, y, reference, floating, strategy, refs, update, context } = useFloating({
      open,
      onOpenChange: setOpen,
      middleware: [offset({ mainAxis: 5, alignmentAxis: 4 }), flip(), shift()],
      placement: 'right-start',
    });

    const { getFloatingProps, getItemProps } = useInteractions([
      useRole(context, { role: 'menu' }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        onNavigate: setActiveIndex,
        focusItemOnOpen: false,
      }),
      useTypeahead(context, {
        enabled: open,
        listRef: listContentRef,
        onMatch: setActiveIndex,
        activeIndex,
      }),
    ]);

    useEffect(() => {
      if (open && refs.reference.current && refs.floating.current) {
        return autoUpdate(refs.reference.current, refs.floating.current, update);
      }
    }, [open, update, refs.reference, refs.floating]);

    useImperativeHandle(ref, () => ({
      onContextMenu(e: MouseEvent) {
        e.preventDefault();
        reference({
          getBoundingClientRect() {
            return {
              x: e.clientX,
              y: e.clientY,
              width: 0,
              height: 0,
              top: e.clientY,
              right: e.clientX,
              bottom: e.clientY,
              left: e.clientX,
            };
          },
        });
        setOpen(true);
      },
    }));

    useLayoutEffect(() => {
      if (open) {
        refs.floating.current?.focus();
      }
    }, [open, refs.floating]);

    return (
      <FloatingPortal>
        {open && (
          <FloatingOverlay lockScroll>
            <FloatingFocusManager context={context} preventTabbing>
              <div
                {...getFloatingProps({
                  className: styles.contextMenu,
                  ref: floating,
                  onClick: () => setOpen(false),
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                })}
              >
                {Children.map(
                  children,
                  (child, index) =>
                    isValidElement(child) &&
                    cloneElement(
                      child,
                      getItemProps({
                        tabIndex: -1,
                        role: 'menuitem',
                        className: styles.contextMenuItem,
                        ref(node: HTMLButtonElement) {
                          listItemsRef.current[index] = node;
                        },
                        onClick: (e) => {
                          child.props.onClick?.(e);
                        },
                      })
                    )
                )}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    );
  }
);
