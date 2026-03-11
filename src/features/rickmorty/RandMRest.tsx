import { useEffect, useState } from "react";
import { fetchEpisodes } from "./api/rickmortyclient";
import { Title } from "../../components/ui/Title";
import { type Episode } from "./components/Episode";
import { CharactersPerSeason } from "./components/CharactersPerSeason";
import { CharactersPerEpisode } from "./components/CharactersPerEpisode";
import { EpisodesPerSeason } from "./components/EpisodesPerSeason";
import { CustomCard } from "../../components/ui/CustomCard";
import { Panel } from "../../components/ui/Panel";

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
    <Panel colour = "primary">
      <CustomCard>
        <p style={{ textAlign: 'left' }}>This is the Rick and Morty Rest page. It fetches episode data from the Rick and Morty API and visualizes the number of characters in each episode using a line chart. The x-axis shows the episode number and name (in tooltips), while the y-axis shows the count of characters appearing in that episode.</p>
        <p style={{ textAlign: 'left' }}>Data is fetched in real time, so results may vary based on API response and availability. Additional charts show the average number of characters per episode by season, and the total number of episodes per season.</p>
        <p style={{ textAlign: 'left' }}>This page aims to use MUI XCharts to present the data. MUI XCharts can be found <a href="https://mui.com/x/react-charts">here</a> and can be used to show charts in many different ways.</p>
      </CustomCard>
      </Panel>
      
      {loading ? (<p>Loading chart...</p> ) 
      : (
        <>
          <Panel colour = "secondary"><CustomCard><CharactersPerEpisode episodes={episodes} /></CustomCard></Panel>
          <Panel colour = "primary"><CustomCard><EpisodesPerSeason episodes={episodes} /></CustomCard></Panel>
          <Panel colour = "secondary"><CustomCard><CharactersPerSeason episodes={episodes} /></CustomCard></Panel>
        </>
      )}
      
      </>
  );
};