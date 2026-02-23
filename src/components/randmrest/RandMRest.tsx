import { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { fetchEpisodes } from "./fetchEpisodes";

export const RandMRest = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisodes().then((eps) => {
      setEpisodes(eps);
      setLoading(false);
    });
  }, []);

  // Prepare chart data
  console.log('Episodes:', episodes);
  const episodeCodes = episodes.map((ep) => ep.episode);
  const characterCounts = episodes.map((ep) => ep.characters.length);
  const episodeNames = episodes.map((ep) => ep.name);
  const episodeIndices = episodes.map((_, idx) => idx + 1);

  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Rick and Morty REST API</h1>
      <p>This is the Rick and Morty Rest page.</p>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <>
          <LineChart
            xAxis={[{ data: episodeIndices, label: 'Episode Number', tickInterval: 1 }]}
            series={[{ data: characterCounts, label: 'Characters per Episode' }]}
            height={400}
          />
        </>
      )}
    </div>
  );
};