import React, { cloneElement, isValidElement, useEffect, useMemo, useState } from 'react';

import {
  autoUpdate,
  flip,
  FloatingContext,
  FloatingFocusManager,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  offset,
  Placement,
  ReferenceType,
  safePolygon,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useHover,
  useInteractions,
  VirtualElement,
} from '@floating-ui/react';

import { mergeRefs } from 'react-merge-refs';
import { ThemeWrapper } from './ThemeWrapper';

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

  return !context.open && previewContext.open ? (
    <ThemeWrapper>
      <FloatingFocusManager context={previewContext}>
        <div
          ref={previewContext.floating}
          style={{
            position: previewContext.strategy,
            top: previewContext.y ?? 0,
            left: previewContext.x ?? 0,
            outline: 'none',
          }}
          {...getPreviewFloatingProps({
            onClick: () => setOpen(true),
          })}
        >
          {preview && !open ? <div onClick={() => setOpen(true)}>{props.children}</div> : null}
        </div>
      </FloatingFocusManager>
    </ThemeWrapper>
  ) : null;
}

export type PopoverContentProps = {
  children: React.ReactNode;
  lockScroll?: boolean;
};

function PopoverContent(props: PopoverContentProps) {
  const { context, open, getFloatingProps } = usePopoverContext();

  return context.open ? (
    <ThemeWrapper>
      <FloatingOverlay lockScroll={props.lockScroll}>
        <FloatingFocusManager context={context}>
          <div
            ref={context.floating}
            style={{
              position: context.strategy,
              top: context.y ?? 0,
              left: context.x ?? 0,
              outline: 'none',
            }}
            {...getFloatingProps({})}
          >
            {open ? props.children : null}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </ThemeWrapper>
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
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
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
      ...(shouldFlipToKeepInView ? [flip()] : []),
      size({
        padding: 12,
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
    ],
  });

  const { reference, context } = useFloating({
    placement: placement ?? 'right-start',
    open: contentVisible,
    whileElementsMounted: autoUpdate,
    onOpenChange: onContentChange,
    nodeId,
    middleware: [
      offset(4),
      ...(shouldFlipToKeepInView ? [flip()] : []),
      size({
        padding: 12,
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
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
    useClick(context, {
      // we want the preview to enable
      // showing the popover
      enabled: false,
    }),
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
    }),
    [
      previewContext,
      context,
      getProps,
      contentVisible,
      previewVisible,
      // onOpenChange,
      ref,
      // getPreviewFloatingProps,
      // getFloatingProps,
    ]
  );

  return (
    <FloatingNode id={nodeId}>
      <PopoverContext.Provider value={popoverContext}>{children}</PopoverContext.Provider>
    </FloatingNode>
  );
}

type PopoverProps = PopoverTriggerProps & {
  preview: React.ReactNode;
  content?: React.ReactNode;
} & AdvancedPopoverProps;

function PopoverPortal({
  children,
  root,
}: {
  children?: React.ReactNode;
  root?: HTMLElement | null | undefined;
}) {
  return (
    <FloatingPortal id="collabkit-floating-root">
      {children ?? <ThemeWrapper>{children}</ThemeWrapper>}
    </FloatingPortal>
  );
}

// function Popover(props: PopoverProps) {
//   const [open, setOpen] = useState(false);
//   const [preview, setPreview] = useState(false);

//   // advanced
//   const { dismissOnClickOutside, shouldFlipToKeepInView } = props;

//   return (
//     <PopoverRoot
//       contentVisible={open}
//       previewVisible={preview}
//       onContentChange={setOpen}
//       onPreviewChange={setPreview}
//       // advanced
//       dismissOnClickOutside={dismissOnClickOutside}
//       shouldFlipToKeepInView={shouldFlipToKeepInView}
//     >
//       {'children' in props ? (
//         <PopoverTrigger>{props.children}</PopoverTrigger>
//       ) : (
//         <PopoverTrigger trigger={props.trigger} />
//       )}
//       <PopoverPortal>
//         <PopoverPreview>{props.preview}</PopoverPreview>
//         {props.content && <PopoverContent>{props.content}</PopoverContent>}
//       </PopoverPortal>
//     </PopoverRoot>
//   );
// }

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
