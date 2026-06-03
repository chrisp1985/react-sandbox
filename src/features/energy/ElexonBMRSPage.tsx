import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts';
import { Typography, CircularProgress, Box, useMediaQuery, useTheme } from '@mui/material';
import { fetchFullDayData } from './api/elexonclient';
import type { PeriodSummary, UnitActivity } from './api/elexonclient';
import { Title } from '../../components/ui/Title';
import { CustomCard } from '../../components/ui/CustomCard';
import { Panel } from '../../components/ui/Panel';

const ElexonBMRSPage = () => {
  const [periodSummaries, setPeriodSummaries] = useState<PeriodSummary[]>([]);
  const [unitActivities, setUnitActivities] = useState<UnitActivity[]>([]);
  const [settlementDate, setSettlementDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFullDayData()
      .then(({ periodSummaries, unitActivities, settlementDate }) => {
        setPeriodSummaries(periodSummaries);
        setUnitActivities(unitActivities);
        setSettlementDate(settlementDate);
      })
      .catch(() => console.log('Failed to fetch data'))
      .finally(() => setLoading(false));
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const top10Units = unitActivities.slice(0, 10);
  const xAxisInterval = isMobile ? 7 : 3;
  const periodChartMargin = { left: isMobile ? 5 : 15, right: 10, top: 5, bottom: 5 };
  const yAxisLabel = (label: string) =>
    isMobile ? undefined : { value: label, angle: -90, position: 'insideLeft' as const, style: { textAnchor: 'middle' as const } };

  return (
    <>
      <Title text="Elexon BMRS Data Visualisation" />

      <Panel colour="primary">
        <CustomCard>
          <p>
            Full-day balancing market data from the Elexon BMRS API. All 48 settlement periods
            (00:00–23:30) are fetched in parallel to show how National Grid ESO balanced supply
            and demand throughout the day.
          </p>
          {settlementDate && (
            <Typography variant="subtitle1" fontWeight="bold">
              Settlement date: {settlementDate}
            </Typography>
          )}
          {loading && (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <CircularProgress size={18} />
              <Typography variant="body2">Loading 48 settlement periods…</Typography>
            </Box>
          )}
        </CustomCard>
      </Panel>

      {/* Bid/Offer Prices by Period */}
      <Panel colour="secondary">
        <CustomCard>
          <Typography variant="h6" gutterBottom>
            Balancing Market Prices by Settlement Period
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Average offer price (what ESO paid for up-regulation, green) and average bid price (cost
            of down-regulation, red) per half-hour. Price spikes indicate periods where the system
            was tight and expensive to balance.
          </Typography>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={periodSummaries} margin={periodChartMargin}>
              <XAxis dataKey="period" interval={xAxisInterval} />
              <YAxis label={yAxisLabel('£/MWh')} />
              <Tooltip formatter={(v: number | undefined) => v != null ? `£${v.toFixed(2)}/MWh` : ''} />
              <Legend />
              <Line type="monotone" dataKey="avgOfferPrice" name="Avg Offer Price" stroke="#4caf50" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="avgBidPrice" name="Avg Bid Price" stroke="#f44336" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CustomCard>
      </Panel>

      {/* Acceptance Count by Period */}
      <Panel colour="primary">
        <CustomCard>
          <Typography variant="h6" gutterBottom>
            Balancing Activity by Settlement Period
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Number of acceptances issued by ESO in each half-hour period. Higher bars indicate
            periods requiring more frequent intervention to keep the system in balance.
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={periodSummaries} margin={periodChartMargin}>
              <XAxis dataKey="period" interval={xAxisInterval} />
              <YAxis label={yAxisLabel('Acceptances')} />
              <Tooltip formatter={(v: number | undefined) => [v ?? 0, 'Acceptances']} />
              <Bar dataKey="acceptanceCount" name="Acceptances" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </CustomCard>
      </Panel>

      {/* Active Units per Period */}
      <Panel colour="secondary">
        <CustomCard>
          <Typography variant="h6" gutterBottom>
            Market Participation — Active Units per Period
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Number of distinct BM units called on in each settlement period. Peaks show when ESO
            needed to draw on a broader range of resources.
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={periodSummaries} margin={periodChartMargin}>
              <XAxis dataKey="period" interval={xAxisInterval} />
              <YAxis label={yAxisLabel('Units')} />
              <Tooltip formatter={(v: number | undefined) => [v ?? 0, 'Active Units']} />
              <Line type="monotone" dataKey="activeUnits" name="Active Units" stroke="#9c27b0" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CustomCard>
      </Panel>

      {/* Top 10 Most Active Units */}
      <Panel colour="primary">
        <CustomCard>
          <Typography variant="h6" gutterBottom>
            Top 10 Most Active BM Units
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Units with the most acceptances across the full day — the most relied-upon resources in
            yesterday's balancing market.
          </Typography>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={top10Units} layout="vertical" margin={{ left: 5, right: 10, top: 5, bottom: 5 }}>
              <XAxis type="number" />
              <YAxis dataKey="unit" type="category" width={isMobile ? 72 : 90} tick={{ fontSize: isMobile ? 10 : 11 }} />
              <Tooltip formatter={(v: number | undefined) => [v ?? 0, 'Acceptances']} />
              <Bar dataKey="acceptanceCount" name="Acceptances" fill="#ff9800" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CustomCard>
      </Panel>
    </>
  );
};

export default ElexonBMRSPage;
