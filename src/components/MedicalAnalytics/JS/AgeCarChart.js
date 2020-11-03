import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const COLORS = [
  '#242424',
  '#242424',
  '#D1DADD',
  '#D1DADD',
  '#242424',
  '#D1DADD',
  '#D1DADD',
];

const AgeCarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={327}>
      <BarChart layout="vertical" data={data}>
        <XAxis
          type="number"
          hide={false}
          tickCount={7}
          strokeOpacity={0}
          style={{
            fontFamily: 'Nunito Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '12px',
            lineHeight: '9px',
            textAlign: 'center',
            color: 'rgba(43, 48, 52, 0.4)',
          }}
        />

        <YAxis
          type="category"
          dataKey="name"
          strokeOpacity={0}
          width={120}
          style={{
            fontFamily: 'Sarala',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '17px',
            textAlign: 'center',
            color: '#343A40',
          }}
        />

        {/* {COLORS.map((entry, index) => ( */}
        <Bar dataKey="uv" fill="#8884d8" />
        {/* // <Bar */}
        {/* //   key={`cell-${index}`}
          //   // dataKey="uv"
          //   fill={COLORS[index % COLORS.length]}
          // />
        // ))} */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgeCarChart;
