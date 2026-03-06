import { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { fetchEpisodes } from "../../api/rickmortyclient";
import { Typography } from '@mui/material';

export const RandMRest = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisodes().then((eps) => {
      setEpisodes(eps);
      setLoading(false);
    });
  }, []);

  const characterCounts = episodes.map((ep) => ep.characters.length);
  const episodeIndices = episodes.map((_, idx) => idx + 1);
  const episodeLabels = episodes.map((ep, idx) => `${idx + 1}: ${ep.name}`);

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Rick and Morty REST API</h1>
      <Typography variant="body1" gutterBottom>This is the Rick and Morty Rest page.</Typography>
      {loading ? (
        <Typography variant="body1" gutterBottom>Loading chart...</Typography>
      ) : (
        <>
          <LineChart
            xAxis={[{
              data: episodeIndices,
              label: 'Episode',
              valueFormatter: (value: number, context: { location?: string }): string => {
                // Always return a string for both tick and tooltip
                if (context && context.location === 'tooltip') {
                  const idx = value - 1;
                  return episodeLabels[idx] ? String(episodeLabels[idx]) : String(value);
                }
                // For axis ticks, just show the number as string
                return String(value);
              },
            }]}
            yAxis={[{ min: 0, label: 'Characters' }]}
            series={[{ data: characterCounts, label: 'Characters per Episode' }]}
            height={400}
          />
        </>
      )}
    </div>
  );
};