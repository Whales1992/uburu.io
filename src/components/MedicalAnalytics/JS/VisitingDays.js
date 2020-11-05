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
    name: 'MON',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'TUES',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'WED',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'THUR',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'FRI',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'SAT',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'SUN',
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

const VisitingDays = () => {
  console.log(
    window.innerWidth,
    document.documentElement.clientWidth,
    '<<<<<===='
  );
  const myWidth = window.innerWidth < 726 ? 100 : 50;
  return (
    <ResponsiveContainer width={`${myWidth}%`} height={127}>
      <BarChart data={data}>
        <XAxis
          type="category"
          dataKey="name"
          strokeOpacity={0}
          style={{
            fontFamily: 'Sarala',
            fontStyle: 'normal',
            fontSize: '10px',
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
        ;
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VisitingDays;
