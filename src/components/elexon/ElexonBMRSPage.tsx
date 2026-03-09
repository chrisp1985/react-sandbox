import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Typography, Card, CardContent, Box } from '@mui/material';
import { fetchUnitData } from '../../api/elexonclient';
import type { ChartData } from '../../api/elexonclient';
import { Title } from '../common/Title';

const ElexonBMRSPage = () => {

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [units, setUnits] = useState<string[]>([]);

  useEffect(() => {
    fetchUnitData()
      .then(({ chartRows, units }) => {
        setChartData(chartRows);
        setUnits(units);
      })
      .catch(() => {
        console.log('Failed to fetch data');
      });
  }, []);

  const unitColors = units.map((_, idx) => `hsl(${(idx * 47) % 360},70%,60%)`);

  return (
    <>
      <Title text="Elexon BMRS Data Visualization" />
          <Box sx={{ maxWidth: '80%', mx: 'auto', mt: 0, p: 0 }}>
            <Card sx={{ maxWidth: '100%', mx: 'auto', mt: 6, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <p>Using ReCharts, these charts pull data from the Elexon BMRS API.</p>
                <p>The bar chart shows the contribution of each unit to the total accepted volume for each settlement period. The area chart shows the same data but as a proportion of the total, giving a live dispatch curve feel.</p>
                <p>Data is fetched in real time, so results may vary based on API response and availability.</p>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: '100%', mx: 'auto', mt: 4, backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
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
            <Card sx={{ maxWidth: '100%', mx: 'auto', mt: 6, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
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
      </Box>
    </>
  );
};

export default ElexonBMRSPage;
