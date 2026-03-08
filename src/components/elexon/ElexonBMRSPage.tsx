import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Typography, Card, CardContent } from '@mui/material';
import { fetchUnitData } from '../../api/elexonclient';
import type { ChartData } from '../../api/elexonclient';

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

  const unitColors = units.map((_, idx) => `hsl(${(idx * 47) % 360},70%,60%)`);

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Elexon BMRS Acceptances</h1>
      {chartDate && (
        <Typography variant="h6" gutterBottom>Settlement Date: {chartDate}</Typography>
      )}
      {/* Bar Chart */}
      <Card sx={{ maxWidth: '80%', mx: 'auto', mt: 4, backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="period"
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis label={{ value: 'Contribution', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 16 } }} />
              <Tooltip />
              {/* <Legend /> */}
              {units.map((unit, idx) => (
                <Bar key={unit} dataKey={unit} stackId="a" fill={unitColors[idx]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cool Stacked Area Chart */}
      <Card sx={{ maxWidth: '80%', mx: 'auto', mt: 6, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Live Dispatch Curve
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} stackOffset="expand">
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              {units.map((unit, idx) => (
                <Area
                  key={unit}
                  type="monotone"
                  dataKey={unit}
                  stackId="1"
                  fill={unitColors[idx]}
                  stroke={unitColors[idx]}
                  fillOpacity={0.7}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>      
    </div>
  );
};

export default ElexonBMRSPage;
