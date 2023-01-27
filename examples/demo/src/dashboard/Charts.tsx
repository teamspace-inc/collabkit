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
import { CollabKitRecharts, Commentable } from '@collabkit/react';

type EarningsEntry = { date: string; earnings: { actual: number; current: number } };

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

export function Charts() {
  return (
    <CollabKitRecharts.Root>
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
            dot={(props) => {
              return (
                <Commentable.Dot
                  objectId={`${props.dataKey}-${props.payload.date}-${props.value[1]}`}
                  {...props}
                />
              );
            }}
          />
          <Area
            name="Current"
            dataKey="earnings.current"
            stroke={colors.pink}
            strokeWidth={2}
            fill="url(#colorCurrent)"
            fillOpacity={0.3}
            dot={(props) => {
              return (
                <Commentable.Dot
                  objectId={`${props.dataKey}-${props.payload.date}-${props.value[1]}`}
                  {...props}
                />
              );
            }}
          />
          <Customized
            component={
              <CollabKitRecharts.Chart
                getObjectId={(item: EarningsEntry, dataKey: string) => `acme/earnings/${item.date}`}
              />
            }
          />
        </AreaChart>
      </ResponsiveContainer>
    </CollabKitRecharts.Root>
  );
}
