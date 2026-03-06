import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';
import { fetchUnitData } from './fetchUnitData';
import type { ChartData } from './fetchUnitData';

const ElexonBMRSPage = () => {

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [chartDate, setChartDate] = useState<string>('');

  useEffect(() => {
    fetchUnitData()
      .then(({ chartRows, units, chartDate }) => {
        setChartData(chartRows);
        setUnits(units);
        setChartDate(chartDate);
      })
      .catch(() => {
        console.log('Failed to fetch data');
      });
  }, []);

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Elexon BMRS Acceptances</h1>
      {chartDate && (
        <Typography variant="h6" gutterBottom>Settlement Date: {chartDate}</Typography>
      )}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="period"
            textAnchor="end"
            height={80}
            interval={0}
            label={undefined}
          />
          <YAxis label={{ value: 'Contribution', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 16 } }} />
          <Tooltip />
          <Legend />
          {units.map((unit, idx) => (
            <Bar key={unit} dataKey={unit} stackId="a" fill={`hsl(${(idx * 47) % 360},70%,60%)`} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElexonBMRSPage;
