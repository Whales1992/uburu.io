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
    name: '13 - 17',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '18 - 24',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '25 - 34',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '35 - 44',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '45 - 54',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '55 - 64',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '65 +',
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
        <XAxis type="number" hide={true} tickCount={7} strokeOpacity={0} />

        <YAxis
          type="category"
          dataKey="name"
          strokeOpacity={0}
          style={{
            fontFamily: 'Sarala',
            fontStyle: 'normal',
            fontSize: '12px',
            lineHeight: '21px',
            textAlign: 'center',
            color: '#343A40',
          }}
        />

        <Bar dataKey="uv">
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              // fill={index === activeIndex ? '#82ca9d' : '#8884d8'}
              fill={COLORS[index]}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgeCarChart;
