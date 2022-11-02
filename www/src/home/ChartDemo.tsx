import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
} from 'recharts';
import { ThemeProvider } from '@collabkit/react';
import { light, vars } from '../styles/Theme.css';
import { AcmeLogo, Container, Heading, HeadingRow, UI } from './DemoUI';
import {
  CategoricalChartProps,
  CategoricalChartState,
} from 'recharts/types/chart/generateCategoricalChart';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
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

import * as styles from './ChartDemo.css';

const data = [
  {
    name: 'Jan',
    Projected: 40_000,
    Current: 22_000,
  },
  {
    name: 'Feb',
    Projected: 35_000,
    Current: 20_000,
  },
  {
    name: 'Mar',
    Projected: 40_000,
    Current: 28_500,
  },
  {
    name: 'Apr',
    Projected: 31_500,
    Current: 22_000,
  },
  {
    name: 'May',
    Projected: 36_750,
    Current: 26_500,
  },
  {
    name: 'Jun',
    Projected: 42_000,
    Current: 31_000,
  },
  {
    name: 'Jul',
    Projected: 40_500,
    Current: 25_000,
  },
  {
    name: 'Aug',
    Projected: 27_500,
    Current: 32_500,
  },
  {
    name: 'Sep',
    Projected: 34_750,
    Current: 40_000,
  },
  {
    name: 'Oct',
    Projected: 40_000,
    Current: 34_000,
  },
  {
    name: 'Nov',
    Projected: 28_000,
    Current: 29_000,
  },
  {
    name: 'Dec',
    Projected: 35_000,
    Current: 43_000,
  },
];

const currencyFormat = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function ChartDemo() {
  return (
    <ThemeProvider theme="light">
      <UI>
        <div>
          <AcmeLogo />
        </div>
        <Container>
          <HeadingRow>
            <Heading size="small">Earnings</Heading>
          </HeadingRow>
          <CollabKitRechartsContainer>
            <ResponsiveContainer width="100%" height={430}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor={vars.color.indigo} />
                    <stop offset="1" stopColor="#4DA0F9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor={vars.color.pink} />
                    <stop offset="1" stopColor="#D560A5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <Legend
                  align="right"
                  verticalAlign="top"
                  height={30}
                  iconType="circle"
                  iconSize={12}
                  formatter={(text) => (
                    <span style={{ paddingLeft: 4, color: vars.color.textContrastHigh }}>
                      {text}
                    </span>
                  )}
                />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => currencyFormat.format(value)}
                  ticks={[0, 10_000, 20_000, 30_000, 40_000, 50_000]}
                  tickLine={{ stroke: '#EAEFF4' }}
                  domain={[0, 50_000]}
                />
                <Tooltip />
                <Area
                  dataKey="Projected"
                  stroke={vars.color.indigo}
                  strokeWidth={2}
                  fill="url(#colorProjected)"
                  fillOpacity={0.3}
                />
                <Area
                  dataKey="Current"
                  stroke={vars.color.pink}
                  strokeWidth={2}
                  fill="url(#colorCurrent)"
                  fillOpacity={0.3}
                />
                <Customized component={CollabKitRecharts as any} />
              </AreaChart>
            </ResponsiveContainer>
          </CollabKitRechartsContainer>
        </Container>
      </UI>
    </ThemeProvider>
  );
}

function CollabKitRecharts(props: CategoricalChartProps & CategoricalChartState) {
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
  console.log(props);
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

function CollabKitRechartsContainer(props: { children: ReactNode }) {
  const menuRef = useRef<MenuHandle>();
  return (
    <div
      className={light}
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
