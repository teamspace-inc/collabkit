import { Commentable } from '@collabkit/react';
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
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  ScatterChart,
  Scatter,
  ZAxis
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

const dataBarChart = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300
  }
];

const dataLineChart = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
];

const dataComposedChart = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
];

const data01 = [
  {
    "x": 100,
    "y": 200,
    "z": 200
  },
  {
    "x": 120,
    "y": 100,
    "z": 260
  },
  {
    "x": 170,
    "y": 300,
    "z": 400
  },
  {
    "x": 140,
    "y": 250,
    "z": 280
  },
  {
    "x": 150,
    "y": 400,
    "z": 500
  },
  {
    "x": 110,
    "y": 280,
    "z": 200
  }
];
const data02 = [
  {
    "x": 200,
    "y": 260,
    "z": 240
  },
  {
    "x": 240,
    "y": 290,
    "z": 220
  },
  {
    "x": 190,
    "y": 290,
    "z": 250
  },
  {
    "x": 198,
    "y": 250,
    "z": 210
  },
  {
    "x": 180,
    "y": 280,
    "z": 260
  },
  {
    "x": 210,
    "y": 220,
    "z": 230
  }
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
    <>
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

      <Commentable.Container objectId="dashboard-bar-chart">
        <ResponsiveContainer width="100%" height={430}>
          <LineChart data={dataLineChart}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            <Customized component={<Commentable.Chart />} />
          </LineChart>
        </ResponsiveContainer>
      </Commentable.Container>

      <Commentable.Container objectId="dashboard-line-chart">
        <ResponsiveContainer width="100%" height={430}>
          <BarChart width={730} height={250} data={dataBarChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
            <Customized component={<Commentable.Chart />} />
          </BarChart>
        </ResponsiveContainer>
      </Commentable.Container>

      <Commentable.Container objectId="dashboard-composed-chart">
        <ResponsiveContainer width="100%" height={430}>
          <ComposedChart width={730} height={250} data={dataComposedChart}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Customized component={<Commentable.Chart />} />
          </ComposedChart>
        </ResponsiveContainer>
      </Commentable.Container>
      <Commentable.Container objectId="dashboard-scatter-chart">
        <ResponsiveContainer width="100%" height={430}>
          <ScatterChart
            width={730}
            height={250}
            margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="stature" unit="cm" />
            <YAxis dataKey="y" type="number" name="weight" unit="kg" />
            <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" unit="km" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="A school" data={data01} fill="#8884d8" />
            <Scatter name="B school" data={data02} fill="#82ca9d" />
            <Customized component={<Commentable.Chart />} />
          </ScatterChart>
        </ResponsiveContainer>
      </Commentable.Container>
    </>
  );
}