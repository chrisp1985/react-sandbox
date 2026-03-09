import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { fetchEpisodes } from "../../api/rickmortyclient";
import { Card, CardContent, Box } from '@mui/material';
import { Title } from "../common/Title";
import { type Episode } from "./Episode";
import { CharactersPerSeason } from "./CharactersPerSeason";
import { CharactersPerEpisode } from "./CharactersPerEpisode";
import { EpisodesPerSeason } from "./EpisodesPerSeason";

export const RandMRest = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisodes().then((eps) => {
      setEpisodes(eps);
      setLoading(false);
    });
  }, []);

  return (
    <>
    <Title text="Rick and Morty Rest API Visualization" />
    <Box sx={{ maxWidth: '80%', mx: 'auto', mt: 4, p: 0 }}>
                  <Card sx={{ maxWidth: '100%', mx: 'auto', mt: 6, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
      <p style={{ textAlign: 'left' }}>This is the Rick and Morty Rest page. It fetches episode data from the Rick and Morty API and visualizes the number of characters in each episode using a line chart. The x-axis shows the episode number and name (in tooltips), while the y-axis shows the count of characters appearing in that episode.</p>
      <p style={{ textAlign: 'left' }}>Data is fetched in real time, so results may vary based on API response and availability. Additional charts show the average number of characters per episode by season, and the total number of episodes per season.</p>
      <p style={{ textAlign: 'left' }}>This page aims to use MUI XCharts to present the data. MUI XCharts can be found <a href="https://mui.com/x/react-charts">here</a> and can be used to show charts in many different ways.</p>
      </CardContent>
      </Card>
      {loading ? (<p>Loading chart...</p> ) 
      : (
        <>
          <CharactersPerEpisode episodes={episodes} />
          <EpisodesPerSeason episodes={episodes} />
          <CharactersPerSeason episodes={episodes} />
        </>
      )}
      </Box>
      </>
  );
};