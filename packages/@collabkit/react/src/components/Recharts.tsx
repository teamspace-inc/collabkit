import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import {
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
// import { mergeRefs } from 'react-merge-refs';
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

import * as styles from '../styles/components/Recharts.css';

function CollabKitRechartsChart(props: any) {
  // console.log('CollabKitRecharts');
  // if (props.activeCoordinate) {
  //   const { x, y } = props.activeCoordinate;
  //   return <circle cx={x} cy={y} r={10} onClick={() => console.log('click!!')} />;
  // }
  // const {offset} = props
  // const gridProps =      {
  //   key: element.key || 'grid',
  //   x: Number.isFinite(props.x) ? props.x : offset.left,
  //   y: Number.isFinite(props.y) ? props.y : offset.top,
  //   width: Number.isFinite(props.width) ? props.width : offset.width,
  //   height: Number.isFinite(props.height) ? props.height : offset.height,
  //   xAxis,
  //   yAxis,
  //   offset,
  //   chartWidth: width,
  //   chartHeight: height,
  //   verticalCoordinatesGenerator: props.verticalCoordinatesGenerator || this.verticalCoordinatesGenerator,
  //   horizontalCoordinatesGenerator: props.horizontalCoordinatesGenerator || this.horizontalCoordinatesGenerator,
  // }
  // console.log(props);
  return null;
}

// function Grid() {
//   const { fillOpacity, x, y, width, height } = this.props;

//   return (
//     <rect
//       x={x}
//       y={y}
//       width={width}
//       height={height}
//       stroke="none"
//       fill={fill}
//       fillOpacity={fillOpacity}
//       className="recharts-cartesian-grid-bg"
//     />
// }

type MenuHandle = { onContextMenu: (e: React.MouseEvent) => void };

function CollabKitRechartsRoot(props: { children: ReactNode }) {
  const menuRef = useRef<MenuHandle>();
  return (
    <div
      style={{ display: 'contents', position: 'relative' }}
      onContextMenu={(e) => {
        if (menuRef.current) {
          menuRef.current.onContextMenu(e);
        }
      }}
    >
      {props.children}
      <Menu ref={menuRef}>
        <MenuItem label="Add Comment" onClick={() => console.log('add comment')} />
      </Menu>
    </div>
  );
}

export default {
  Root: CollabKitRechartsRoot,
  Chart: CollabKitRechartsChart,
};

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

interface Props {
  label?: string;
  nested?: boolean;
}

export const Menu = forwardRef<any, Props & React.HTMLProps<HTMLButtonElement>>(
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
