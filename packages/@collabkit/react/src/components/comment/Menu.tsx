import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  FloatingNode,
  FloatingTree,
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { mergeRefs } from 'react-merge-refs';
import { StyledIconButton } from '../IconButton';
import { useApp } from '../../hooks/useApp';
import { MODAL_Z_INDEX } from '../PopoverThread';

export const MenuItem = forwardRef<
  HTMLButtonElement,
  { label: string; disabled?: boolean; targetType: unknown }
>(({ label, disabled, targetType, ...props }, ref) => {
  return (
    <button {...props} ref={ref} role="menuitem" disabled={disabled}>
      {label}
    </button>
  );
});

interface Props {
  icon?: React.ReactNode;
  label?: string;
  nested?: boolean;
  children?: React.ReactNode;
  onItemClick: (e: React.MouseEvent, id: string) => void;
}

export const MenuComponent = forwardRef<
  HTMLButtonElement,
  Props & React.HTMLProps<HTMLButtonElement>
>(({ children, label, onItemClick, ...props }, ref) => {
  const { theme } = useApp();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [allowHover, setAllowHover] = useState(false);

  const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const listContentRef = useRef(
    Children.map(children, (child) => (isValidElement(child) ? child.props.label : null)) as Array<
      string | null
    >
  );

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();

  const { x, y, reference, floating, strategy, refs, context } = useFloating<HTMLButtonElement>({
    open,
    onOpenChange: setOpen,
    middleware: [offset({ mainAxis: 4, alignmentAxis: 0 }), flip(), shift()],
    placement: 'bottom-end',
    nodeId,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, {
      toggle: true,
      pointerDown: true,
      ignoreMouse: false,
    }),
    useRole(context, { role: 'menu' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      nested: false,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      onMatch: open ? setActiveIndex : undefined,
      activeIndex,
    }),
  ]);

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  useEffect(() => {
    function onTreeClick() {
      setOpen(false);
      refs.reference.current?.focus();
    }

    tree?.events.on('click', onTreeClick);
    return () => {
      tree?.events.off('click', onTreeClick);
    };
  }, [parentId, tree, refs]);

  // Determine if "hover" logic can run based on the modality of input. This
  // prevents unwanted focus synchronization as menus open and close with
  // keyboard navigation and the cursor is resting on the menu.
  useEffect(() => {
    function onPointerMove() {
      setAllowHover(true);
    }

    function onKeyDown() {
      setAllowHover(false);
    }

    window.addEventListener('pointermove', onPointerMove, {
      once: true,
      capture: true,
    });
    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('pointermove', onPointerMove, {
        capture: true,
      });
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [allowHover]);

  const mergedReferenceRef = useMemo(() => mergeRefs([ref, reference]), [reference, ref]);

  return (
    <FloatingNode id={nodeId}>
      <StyledIconButton
        {...getReferenceProps({
          ...props,
          ref: mergedReferenceRef,
          onClick(event: React.MouseEvent) {
            event.stopPropagation();
            (event.currentTarget as HTMLButtonElement).focus();
          },
        })}
      >
        {props.icon}
      </StyledIconButton>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            preventTabbing
            modal={true}
            // Touch-based screen readers will be able to navigate back to the
            // reference and click it to dismiss the menu without clicking an item.
            // This acts as a touch-based `Esc` key. A visually-hidden dismiss button
            // is an alternative.
            order={['reference', 'content']}
          >
            <div
              {...getFloatingProps({
                className: theme.className,
                ref: floating,
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  background: 'white',
                  padding: '4px',
                  border: '1px solid #d7dce5',
                  borderRadius: 6,
                  boxShadow: '2px 4px 12px rgba(0, 0, 0, 0.1)',
                  outline: 0,
                  zIndex: MODAL_Z_INDEX + 1,
                },
                onKeyDown(event: React.KeyboardEvent) {
                  if (event.key === 'Tab') {
                    setOpen(false);
                  }
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
                      role: 'menuitem',
                      ref(node: HTMLButtonElement) {
                        listItemsRef.current[index] = node;
                      },
                      onClick(e: React.MouseEvent) {
                        onItemClick(e, child.props.targetType);
                        tree?.events.emit('click');
                      },
                      // By default `focusItemOnHover` uses `mousemove` to sync focus,
                      // but when a menu closes we want this to sync it on `enter`
                      // even if the cursor didn't move. NB: Safari does not sync in
                      // this case.
                      onPointerEnter() {
                        if (allowHover) {
                          setActiveIndex(index);
                        }
                      },
                    })
                  )
              )}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
});

export const Menu = forwardRef<HTMLButtonElement, Props & React.HTMLProps<HTMLButtonElement>>(
  (props, ref) => {
    // const parentId = useFloatingParentNodeId();

    // if (parentId == null) {
    //   return (
    //     <FloatingTree>
    //       <MenuComponent {...props} ref={ref} />
    //     </FloatingTree>
    //   );
    // }

    return <MenuComponent {...props} ref={ref} />;
  }
);
