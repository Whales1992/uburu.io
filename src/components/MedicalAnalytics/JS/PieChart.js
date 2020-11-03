import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 600 },
  // { name: 'Group C', value: 300 },
  // { name: 'Group D', value: 200 },
];

const COLORS = ['#D1DADD', '#242424'];

const PieChartRight = () => {
  return (
    <ResponsiveContainer width="100%" height={327}>
      <PieChart>
        <Pie
          data={data}
          // cx={200}
          // cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartRight;
