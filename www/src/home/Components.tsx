import React from 'react';
import { dark, vars } from '../styles/Theme.css';
import * as styles from '../styles/home/Demos.css';
import {
  PinCommentButton,
  Commentable,
  SidebarComments,
  Thread,
  ToggleSidebarCommentsButton,
  Channel,
} from '@collabkit/react';
import { card, componentTitle } from '../styles/home/Components.css';
import { Carousel } from '../Carousel';
import { Link } from 'wouter';
import { button, purpleBg } from '../styles/Website.css';
import { useWindowSize } from '../hooks/useWindowSize';
import { Component } from './Component';
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

const data = [
  {
    date: '2022-01',
    earnings: { projected: 40_000, current: 22_000 },
  },
  {
    date: '2022-02',
    earnings: { projected: 35_000, current: 20_000 },
  },
  {
    date: '2022-03',
    earnings: { projected: 40_000, current: 28_500 },
  },
  {
    date: '2022-04',
    earnings: { projected: 31_500, current: 22_000 },
  },
  {
    date: '2022-05',
    earnings: { projected: 36_750, current: 26_500 },
  },
  {
    date: '2022-06',
    earnings: { projected: 42_000, current: 31_000 },
  },
  {
    date: '2022-07',
    earnings: { projected: 40_500, current: 25_000 },
  },
  {
    date: '2022-08',
    earnings: { projected: 27_500, current: 32_500 },
  },
  {
    date: '2022-09',
    earnings: { projected: 34_750, current: 40_000 },
  },
  {
    date: '2022-10',
    earnings: { projected: 40_000, current: 34_000 },
  },
  {
    date: '2022-11',
    earnings: { projected: 28_000, current: 29_000 },
  },
  {
    date: '2022-12',
    earnings: { projected: 35_000, current: 43_000 },
  },
];
const colors = {
  text: '#222222',
  indigo: 'hsla(225, 70%, 59%, 1)',
  pink: 'hsla(325, 60%, 59%, 1)',
};

const currencyFormat = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
});

export type ComponentProps = {
  title: string;
  description: string;
  component: React.ReactNode;
};

export const KEYED_COMPONENTS: { [key: string]: ComponentProps } = {
  SidebarComments: {
    title: 'SidebarComments',
    description: 'Comments sidebar that accessible from anywhere in your app.',
    component: (
      <div
        style={{
          marginTop: '40px',
          overflow: 'hidden',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <SidebarComments
          defaultOpen
          style={{ width: 320, position: 'absolute', right: 0, top: 0, bottom: 0, height: '100%' }}
        />
      </div>
    ),
  },
  ToggleSidebarCommentsButton: {
    title: 'ToggleSidebarCommentsButton',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: <ToggleSidebarCommentsButton style={{}} />,
  },
  Commentable: {
    title: 'Commentable',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: (
      <Commentable.Container objectId="foo">
        <div style={{ width: '320', height: 320, backgroundColor: vars.color.aubergine }}></div>
      </Commentable.Container>
    ),
  },
  Thread: {
    title: 'Thread',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: (
      <div style={{ width: 256, height: 320 }}>
        <Thread
          style={{ width: 256, height: 320, borderRadius: 6 }}
          threadId="thread3"
          autoFocus={false}
        />
      </div>
    ),
  },
  AddCommentsButton: {
    title: 'PinCommentsButton',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: <PinCommentButton />,
  },
  Channel: {
    title: 'Channel',
    description: 'A comment thread that can be rendered anywhere in your app.',
    component: (
      <div style={{ position: 'absolute', inset: 0 }}>
        <Channel style={{ width: '100%', height: '100%' }} />
      </div>
    ),
  },
  Charts: {
    title: 'Charts',
    description: 'Chart integration demo',
    component: (
      <div style={{ width: "100%", height: "100%" , backgroundColor: "white"}}>
        <Commentable.Container objectId="dashboard-earnings-chart">
          <ResponsiveContainer width="100%" height={430}>
            <AreaChart
              data={data}
              margin={{
                left: 8,
              }}
            >
              <defs>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor={colors.indigo} />
                  <stop offset="1" stopColor="#4DA0F9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor={colors.pink} />
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
                formatter={(text) => <span style={{ paddingLeft: 4, color: colors.text }}>{text}</span>}
              />
              <XAxis dataKey="date" tickFormatter={(value) => dateFormat.format(new Date(value))} />
              <YAxis
                tickFormatter={(value) => currencyFormat.format(value)}
                ticks={[0, 10_000, 20_000, 30_000, 40_000, 50_000]}
                tickLine={{ stroke: '#EAEFF4' }}
                domain={[0, 50_000]}
              />
              <Tooltip />
              <Area
                name="Projected"
                dataKey="earnings.projected"
                stroke={colors.indigo}
                strokeWidth={2}
                fill="url(#colorProjected)"
                fillOpacity={0.3}
              />
              <Area
                name="Current"
                dataKey="earnings.current"
                stroke={colors.pink}
                strokeWidth={2}
                fill="url(#colorCurrent)"
                fillOpacity={0.3}
              />
              <Customized component={<Commentable.Chart />} />
            </AreaChart>
          </ResponsiveContainer>
        </Commentable.Container>
      </div>
    )
  }
};

export const COMPONENTS: ComponentProps[] = Object.values(KEYED_COMPONENTS);

export function Components() {
  const size = useWindowSize();

  return (
    // turns out you cant put the carousel in a container with]
    // display: flex, flex-direction: column, and overflow: hidden
    <>
      <section className={`${dark} ${purpleBg}`} style={{ paddingBottom: 40, paddingTop: 40 }}>
        <h1>React components</h1>
        <h3 className={styles.h3} style={{ marginBottom: 40 }}>
          Build your commenting system with ease
        </h3>
      </section>
      <div style={{ background: vars.color.aubergine }} className={dark}>
        <Carousel
          style={{
            // position so it's centered on the screen
            padding: `0px ${((size?.width ?? 0) - 1124) / 2}px`,
            gap: 40,
          }}
          slides={[
            <Component {...COMPONENTS[0]} />,
            <Component {...COMPONENTS[1]} />,
            <div
              className={card}
              style={{
                borderRadius: '24px',
                background: 'transparent',
                border: '1px solid #4A3A63',
                gap: '20px',
              }}
            >
              <h4 className={componentTitle}>See more components</h4>
              <Link href="/docs" className={button({ type: 'secondary', size: 'large' })}>
                Documentation
              </Link>
            </div>,
          ]}
        />
      </div>
      <div style={{ height: 80, background: vars.color.aubergine }} />
    </>
  );
}
