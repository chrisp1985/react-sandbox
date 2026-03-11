import { type Episode } from "./Episode";
import { Card, CardContent } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export const CharactersPerSeason = ({ episodes }: { episodes: Episode[] }) => {
  const episodesPerSeason = episodes.reduce(
    (acc, ep) => {
      const season = ep.episode.slice(1, 3);

      acc[season] = (acc[season] || 0) + 1;

      return acc;
    },
    {} as Record<string, number>,
  );

  const seasonLabels = Object.keys(episodesPerSeason).map(
    (s) => `Season ${parseInt(s)}`,
  );
  const seasonStats = episodes.reduce(
    (acc, ep) => {
      const season = ep.episode.slice(1, 3);

      if (!acc[season]) {
        acc[season] = { total: 0, episodes: 0 };
      }

      acc[season].total += ep.characters.length;
      acc[season].episodes += 1;

      return acc;
    },
    {} as Record<string, { total: number; episodes: number }>,
  );

  const avgCharacters = Object.values(seasonStats).map(
    (s) => s.total / s.episodes,
  );

  return (
    <>
      <h3>Average Characters per Episode by Season</h3>
      <LineChart
        xAxis={[{ scaleType: "point", data: seasonLabels }]}
        series={[
          {
            data: avgCharacters,
            label: "Average Characters",
            showMark: true,
          },
        ]}
        height={300}
      />
    </>
  );
};
