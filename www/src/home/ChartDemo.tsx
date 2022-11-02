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
import {
  CategoricalChartProps,
  CategoricalChartState,
} from 'recharts/types/chart/generateCategoricalChart';

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
