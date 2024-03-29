import React, { cloneElement, isValidElement, useCallback, useEffect, useMemo } from 'react';

import {
  autoUpdate,
  flip,
  FloatingContext,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  offset,
  Placement,
  ReferenceType,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useHover,
  useInteractions,
  VirtualElement,
} from '@floating-ui/react';
import { FloatingFocusManager } from './FloatingFocusManager';

import { mergeRefs } from 'react-merge-refs';
import { ThemeWrapper } from './ThemeWrapper';
import { vars } from '../theme/theme/index.css';

export type PopoverTriggerProps =
  | {
      children: React.ReactNode;
    }
  | {
      trigger: React.MutableRefObject<HTMLElement | null>;
    };

function PopoverTrigger(props: PopoverTriggerProps) {
  const { getProps, ref } = usePopoverContext();

  const hasTrigger = 'trigger' in props && props.trigger;

  useEffect(() => {
    if (hasTrigger && props.trigger.current) {
      ref(props.trigger.current);
    }
  }, [hasTrigger]);

  return hasTrigger
    ? null
    : 'children' in props && isValidElement(props.children)
    ? cloneElement(props.children, getProps(props.children.props))
    : null;
}

function PopoverPreview(props: { children: React.ReactNode }) {
  const { context, previewContext, open, preview, setOpen, getPreviewFloatingProps } =
    usePopoverContext();

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    },
    [setOpen]
  );

  return !context.open && previewContext.open ? (
    <div
      ref={previewContext.floating}
      style={{
        position: previewContext.strategy,
        top: previewContext.y ?? 0,
        left: previewContext.x ?? 0,
        outline: 'none',
        opacity: 0,
      }}
      {...getPreviewFloatingProps({
        onClick,
      })}
    >
      {preview && !open ? <div onClick={onClick}>{props.children}</div> : null}
    </div>
  ) : null;
}

export type PopoverContentProps = {
  children: React.ReactNode;
  lockScroll?: boolean;
};

function PopoverContent(props: PopoverContentProps) {
  const { context, open, getFloatingProps } = usePopoverContext();

  return context.open ? (
    <FloatingOverlay
      lockScroll={props.lockScroll}
      style={{
        zIndex: vars.zIndex.floating,
      }}
    >
      <FloatingFocusManager context={context}>
        <ThemeWrapper>
          <div
            ref={context.floating}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              outline: 'none',
              opacity: 0,
              zIndex: vars.zIndex.floating,
            }}
            data-testid="collabkit-popover-content"
            {...getFloatingProps({})}
          >
            {open ? props.children : null}
          </div>
        </ThemeWrapper>
      </FloatingFocusManager>
    </FloatingOverlay>
  ) : null;
}

type PopoverContextValue = {
  previewContext: FloatingContext<ReferenceType>;
  context: FloatingContext<ReferenceType>;
  getProps: (userProps: any) => Record<string, unknown>;
  open: boolean;
  preview: boolean;
  setOpen: (open: boolean) => void;
  ref: (instance: Element | VirtualElement | null) => void;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  getPreviewFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  update: () => void;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export function usePopoverContext() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopoverContext must be used within a Popover');
  }
  return context;
}

type RootProps = {
  children: React.ReactNode;
  previewVisible: boolean;
  contentVisible: boolean;
  onContentChange: (open: boolean) => void;
  onPreviewChange: (preview: boolean) => void;
  placement?: Placement;
} & AdvancedPopoverProps;

export type AdvancedPopoverProps = {
  // optional
  dismissOnClickOutside?: boolean;
  shouldFlipToKeepInView?: boolean;
};

function PopoverRoot(props: RootProps) {
  const parentId = useFloatingParentNodeId();

  const { placement, children, previewVisible, contentVisible, onContentChange, onPreviewChange } =
    props;
  const nodeId = useFloatingNodeId();
  const dismissOnClickOutside = props.dismissOnClickOutside ?? true;
  const shouldFlipToKeepInView = props.shouldFlipToKeepInView ?? true;

  const { reference: previewReference, context: previewContext } = useFloating({
    placement: placement ?? 'right-start',
    open: previewVisible,
    whileElementsMounted: autoUpdate,
    onOpenChange: onPreviewChange,
    nodeId,
    middleware: [
      offset(4),
      ...(shouldFlipToKeepInView
        ? [
            flip({
              padding: 24,
              fallbackAxisSideDirection: 'start',
              crossAxis: false,
              fallbackPlacements: ['left-start', 'left-end'],
            }),
          ]
        : []),
      size({
        padding: 12,
        apply({ availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${window.innerHeight * 0.88}px`,
            opacity: 1,
          });
        },
      }),
      shift({
        padding: 24,
      }),
    ],
  });

  const { reference, context, update } = useFloating({
    placement: placement ?? 'right-start',
    open: contentVisible,
    whileElementsMounted: autoUpdate,
    onOpenChange: onContentChange,
    nodeId,
    middleware: [
      offset(4),
      ...(shouldFlipToKeepInView
        ? [
            flip({
              padding: 24,
              fallbackAxisSideDirection: 'start',
              crossAxis: false,
              fallbackPlacements: ['left-start', 'left-end'],
            }),
          ]
        : []),
      size({
        padding: 12,
        apply({ availableWidth, elements }) {
          const maxHeight = Math.round(window.innerHeight * 0.88);
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${maxHeight}px`,
            opacity: 1,
          });
        },
      }),
      shift({
        padding: 24,
      }),
    ],
  });

  const { getReferenceProps: getPreviewReferenceProps, getFloatingProps: getPreviewFloatingProps } =
    useInteractions([
      useHover(previewContext, {
        enabled: !contentVisible,
        handleClose: safePolygon(),
      }),
      useDismiss(previewContext, {
        enabled: dismissOnClickOutside ?? true,
      }),
    ]);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, {}),
    useDismiss(context, {
      escapeKey: false,
      enabled: dismissOnClickOutside ?? true,
    }),
  ]);

  const ref = useMemo(
    () => mergeRefs([previewReference, reference]),
    [previewReference, reference]
  );

  const getProps = (userProps: any) =>
    getPreviewReferenceProps(
      getReferenceProps({
        ref,
        ...userProps,
      })
    );

  const popoverContext = useMemo(
    () => ({
      previewContext,
      context,
      getProps,
      open: contentVisible,
      preview: previewVisible,
      setOpen: onContentChange,
      ref,
      getPreviewFloatingProps,
      getFloatingProps,
      update,
    }),
    [previewContext, context, getProps, contentVisible, previewVisible, ref]
  );

  return (
    <FloatingNode id={nodeId}>
      <PopoverContext.Provider value={popoverContext}>{children}</PopoverContext.Provider>
    </FloatingNode>
  );
}

function PopoverPortal({ children }: { children?: React.ReactNode }) {
  return <FloatingPortal id="collabkit-floating-root">{children}</FloatingPortal>;
}

export { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverPreview, PopoverContent };

// Example usage;

// export default function App() {
//   const ref = React.useRef(null);
//   const [open, setOpen] = React.useState(false);
//   const [preview, setPreview] = React.useState(false);

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
//         <div className="trigger" ref={ref}>
//           Element
//         </div>
//         <Popover trigger={ref} />
//         <Popover>
//           <div className="trigger">Element</div>
//         </Popover>
//         <Popover.Root
//           open={open}
//           preview={preview}
//           onOpenChange={setOpen}
//           onPreviewChange={setPreview}
//         >
//           <Popover.Trigger>
//             <div className="trigger">Element</div>
//           </Popover.Trigger>
//           <Popover.Preview>
//             <div style={{ width: '200px', height: '200px', background: 'red' }}>
//               <h1>custom preview</h1>
//             </div>
//           </Popover.Preview>
//           <Popover.Content>
//             <div style={{ width: '200px', height: '200px', background: 'blue' }}>
//               <h1>custom content</h1>
//             </div>
//           </Popover.Content>
//         </Popover.Root>
//       </div>
//     </div>
//   );
// }
