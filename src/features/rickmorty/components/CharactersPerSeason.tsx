import { type Episode } from "./Episode";
import { LineChart } from "@mui/x-charts/LineChart";

export const CharactersPerSeason = ({ episodes }: { episodes: Episode[] }) => {
  const seasonStats = episodes.reduce(
    (acc, ep) => {
      const season = ep.episode.slice(1, 3);
      if (!acc[season]) acc[season] = { total: 0, count: 0, min: Infinity, max: -Infinity };
      const n = ep.characters.length;
      acc[season].total += n;
      acc[season].count += 1;
      acc[season].min = Math.min(acc[season].min, n);
      acc[season].max = Math.max(acc[season].max, n);
      return acc;
    },
    {} as Record<string, { total: number; count: number; min: number; max: number }>,
  );

  const seasons = Object.keys(seasonStats).sort();
  const seasonLabels = seasons.map((s) => `Season ${parseInt(s)}`);
  const avgCharacters = seasons.map((s) =>
    parseFloat((seasonStats[s].total / seasonStats[s].count).toFixed(1))
  );
  const minCharacters = seasons.map((s) => seasonStats[s].min);
  const maxCharacters = seasons.map((s) => seasonStats[s].max);

  return (
    <>
      <h3>Characters per Episode by Season — Average, Min & Max</h3>
      <LineChart
        xAxis={[{ scaleType: "point", data: seasonLabels }]}
        series={[
          { data: maxCharacters, label: "Max", showMark: true, color: "#ef5350" },
          { data: avgCharacters, label: "Average", showMark: true, color: "#42a5f5" },
          { data: minCharacters, label: "Min", showMark: true, color: "#66bb6a" },
        ]}
        height={300}
      />
    </>
  );
};
