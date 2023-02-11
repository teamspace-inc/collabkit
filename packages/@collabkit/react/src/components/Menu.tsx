import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
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
  FloatingFocusManager,
  FloatingContext,
  ElementProps,
  ReferenceType,
} from '@floating-ui/react';
import { ThemeWrapper } from './ThemeWrapper';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { menu, menuItem } from '../theme/components/Menu.css';
import { MenuTarget, Target } from '@collabkit/core';
import { useStoreKeyMatches } from '../hooks/useSubscribeStoreKey';

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
  label?: string;
  trigger?: React.ReactNode;
  nested?: boolean;
  items?: React.ReactNode;
  onItemClick: (e: React.MouseEvent, id: ItemType) => void;
  className?: string;
  children?: React.ReactNode;
  context?: Target;
  event?: 'contextmenu' | 'click';
}

function useContextMenu<T extends ReferenceType>(context: FloatingContext<T>): ElementProps {
  return useMemo(
    () => ({
      reference: {
        onContextMenu(event) {
          event.preventDefault();
          context.onOpenChange(true);
        },
      },
    }),
    []
  );
}

type MenuFn = <ItemType>(props: Props<ItemType>) => React.ReactElement;

export const Menu = React.memo(function Menu(props) {
  const {
    className,
    children,
    items,
    onItemClick,
    context: rootTarget,
    event = 'click',
    ...otherProps
  } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [allowHover, setAllowHover] = useState(false);

  const listItemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const listContentRef = useRef(
    Children.map(items, (child) => (isValidElement(child) ? child.props.label : null)) as Array<
      string | null
    >
  );

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();

  const { events, store } = useApp();
  const { menuId } = useSnapshot(store);
  const targetMatch = useCallback(
    (target: Target | null) => {
      return target?.type === 'menu' && target.nodeId === nodeId && target.parentId === parentId;
    },
    [menuId, nodeId, parentId]
  );
  const open = useStoreKeyMatches(store, 'menuId', targetMatch);

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
    strategy: 'fixed',
    middleware: [offset({ mainAxis: 4, alignmentAxis: 0 }), flip(), shift()],
    placement: 'bottom-end',
    nodeId,
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    event === 'click'
      ? useClick(context, {
          toggle: true,
          event: 'mousedown',
          ignoreMouse: false,
        })
      : useContextMenu(context),
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
      if (refs.reference.current) {
        (refs.reference.current as HTMLElement).focus();
      }
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

  if (!Children.only(props.children)) {
    throw new Error('Menu must have exactly one child as trigger');
  }

  const trigger = Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...getReferenceProps({
          ...otherProps,
          ref: reference,
          onClick(event: React.MouseEvent) {
            event.stopPropagation();
            (event.currentTarget as HTMLButtonElement).focus();
          },
        }),
      });
    }
    return child;
  });

  return (
    <FloatingNode id={nodeId}>
      {trigger}
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
                {Children.map(items, (child, index) => {
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
}) as MenuFn;
