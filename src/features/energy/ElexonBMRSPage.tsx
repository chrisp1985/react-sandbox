import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Typography} from '@mui/material';
import { fetchUnitData } from './api/elexonclient';
import type { ChartData } from './api/elexonclient';
import { Title } from '../../components/ui/Title';
import { CustomCard } from '../../components/ui/CustomCard';
import { Panel } from '../../components/ui/Panel';

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
          <Panel colour = "primary"><CustomCard>
                <p>Using ReCharts, these charts pull data from the Elexon BMRS API.</p>
                <p>The bar chart shows the contribution of each unit to the total accepted volume for each settlement period. The area chart shows the same data but as a proportion of the total, giving a live dispatch curve feel.</p>
                <p>Data is fetched in real time, so results may vary based on API response and availability.</p>
            </CustomCard></Panel>
            <Panel colour = "secondary"><CustomCard>
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
            </CustomCard></Panel>

        {/* Cool Stacked Area Chart */}
            <Panel colour = "primary"><CustomCard>
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
              </CustomCard>
            </Panel>      
    </>
  );
};

export default ElexonBMRSPage;
