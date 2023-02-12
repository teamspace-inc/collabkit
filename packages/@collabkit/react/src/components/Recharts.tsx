import React, {
  ComponentPropsWithoutRef,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { actions } from '@collabkit/client';
import { nanoid } from 'nanoid';
import { useSnapshot } from 'valtio';
import PopoverThread from './PopoverThread';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { useWorkspaceContext } from '../hooks/useWorkspaceContext';
import { useStore } from '../hooks/useStore';

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
  const workspaceId = useWorkspaceContext();
  const store = useStore();

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
      actions.viewContent(store, {
        target: { type: 'thread', threadId, workspaceId },
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

  const store = useStore();
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
  const { showThread } = usePopoverThread({ objectId });
  return (
    <PopoverThread objectId={objectId}>
      <circle cx={x} cy={y} r={12} onClick={() => showThread()} />
    </PopoverThread>
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
