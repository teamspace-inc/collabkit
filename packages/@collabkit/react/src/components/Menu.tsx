import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
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
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { IconButton } from './IconButton';
import { ThemeWrapper } from './ThemeWrapper';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { menu, menuItem } from '../theme/components/Menu.css';
import { MenuTarget, Target } from '@collabkit/core';

export const MenuItem = forwardRef<
  HTMLButtonElement,
  { label: string; disabled?: boolean; targetType: unknown; className?: string }
>(({ label, disabled, targetType, ...props }, ref) => {
  return (
    <button
      className={menuItem}
      key={label}
      {...props}
      ref={ref}
      role="menuitem"
      disabled={disabled}
    >
      {label}
    </button>
  );
});

interface Props<ItemType> {
  icon?: React.ReactNode;
  label?: string;
  nested?: boolean;
  children?: React.ReactNode;
  onItemClick: (e: React.MouseEvent, id: ItemType) => void;
  className?: string;
  context?: Target;
}

export function Menu<ItemType>({
  children,
  label,
  onItemClick,
  className,
  context: rootTarget,
  ...props
}: Props<ItemType>) {
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

  const { events, store } = useApp();
  const { menuId } = useSnapshot(store);

  const open = menuId?.type === 'menu' && menuId.nodeId === nodeId && menuId.parentId === parentId;

  const target: MenuTarget = { type: 'menu', nodeId, parentId, context: rootTarget };

  const onOpenChange = useCallback(
    (open: boolean) => {
      const fn = open ? events.onMenuOpen : events.onMenuClose;
      fn({ target });
    },
    [nodeId, parentId]
  );

  const { x, y, reference, floating, strategy, refs, context } = useFloating<HTMLButtonElement>({
    open,
    onOpenChange,
    middleware: [offset({ mainAxis: 4, alignmentAxis: 0 }), flip(), shift()],
    placement: 'bottom-end',
    nodeId,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context, {
      toggle: true,
      event: 'mousedown',
      ignoreMouse: false,
    }),
    useRole(context, { role: 'menu' }),
    useDismiss(context, { bubbles: false }),
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
      events.onMenuClose({ target });
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

    function onKeyDown(e: KeyboardEvent) {
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

  const { icon, ...otherProps } = props;

  return (
    <FloatingNode id={nodeId}>
      <IconButton
        active={open}
        {...getReferenceProps({
          ...otherProps,
          ref: reference,
          onClick(event: React.MouseEvent) {
            event.stopPropagation();
            (event.currentTarget as HTMLButtonElement).focus();
          },
        })}
      >
        {icon}
      </IconButton>
      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            // todo figure out if we actually need preventTabbing
            // preventTabbing
            modal={true}
            // Touch-based screen readers will be able to navigate back to the
            // reference and click it to dismiss the menu without clicking an item.
            // This acts as a touch-based `Esc` key. A visually-hidden dismiss button
            // is an alternative.
            order={['reference', 'content']}
          >
            <ThemeWrapper>
              <div
                {...getFloatingProps({
                  className: className ?? menu,
                  ref: floating,
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                  onKeyDown(event: React.KeyboardEvent) {
                    if (event.key === 'Tab') {
                      events.onMenuClose({ target });
                    }
                  },
                })}
              >
                {Children.map(children, (child, index) => {
                  const el =
                    isValidElement(child) &&
                    cloneElement(
                      child,
                      getItemProps({
                        role: 'menuitem',
                        key: `menu-item-${index}`,
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
                    );
                  return el;
                })}
              </div>
            </ThemeWrapper>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
}
