import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ThemeProvider } from '@collabkit/react';
import { light } from '../styles/Theme.css';
import { AcmeLogo, Container, DemoTip, Heading, HeadingRow, UI } from './DemoUI';

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
      <div className={light} style={{ display: 'contents' }}>
        <UI>
          <div>
            <AcmeLogo />
          </div>
          <Container>
            <HeadingRow>
              <Heading size="small">Earnings</Heading>
            </HeadingRow>
            <ResponsiveContainer width="100%" height={430}>
              <AreaChart data={data}>
                <CartesianGrid vertical={false} />
                <Legend align="right" verticalAlign="top" height={30} />
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
                  stroke="#5779DF"
                  fill="url(#colorProjected)"
                  fillOpacity={0.3}
                />
                <Area
                  dataKey="Current"
                  stroke="#D560A5"
                  fill="url(#colorCurrent)"
                  fillOpacity={0.3}
                />
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop stop-color="#5779DF" />
                    <stop offset="1" stopColor="#4DA0F9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop stop-color="#D560A5" />
                    <stop offset="1" stopColor="#D560A5" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </Container>
        </UI>
      </div>
    </ThemeProvider>
  );
}
