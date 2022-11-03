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
import { ThemeProvider, CollabKitRecharts } from '@collabkit/react';
import { light, vars } from '../styles/Theme.css';
import { AcmeLogo, Container, Heading, HeadingRow, UI } from './DemoUI';

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

const currencyFormat = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
});

export function ChartDemo() {
  return (
    <ThemeProvider theme="light">
      <div className={light}>
        <UI>
          <div>
            <AcmeLogo />
          </div>
          <Container>
            <HeadingRow>
              <Heading size="small">Earnings</Heading>
            </HeadingRow>
            <CollabKitRecharts.Root>
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
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => dateFormat.format(new Date(value))}
                  />
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
                    stroke={vars.color.indigo}
                    strokeWidth={2}
                    fill="url(#colorProjected)"
                    fillOpacity={0.3}
                  />
                  <Area
                    name="Current"
                    dataKey="earnings.current"
                    stroke={vars.color.pink}
                    strokeWidth={2}
                    fill="url(#colorCurrent)"
                    fillOpacity={0.3}
                  />
                  <Customized component={CollabKitRecharts.Chart} />
                </AreaChart>
              </ResponsiveContainer>
            </CollabKitRecharts.Root>
          </Container>
        </UI>
      </div>
    </ThemeProvider>
  );
}
