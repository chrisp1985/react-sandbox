import { type Episode } from "./Episode";
import { BarChart } from "@mui/x-charts/BarChart";

const charId = (url: string) => url.split('/').pop()!;

export const UniqueCharactersPerSeason = ({ episodes }: { episodes: Episode[] }) => {
  const seasonChars: Record<string, Set<string>> = {};
  episodes.forEach((ep) => {
    const season = ep.episode.slice(1, 3);
    if (!seasonChars[season]) seasonChars[season] = new Set();
    ep.characters.forEach((url) => seasonChars[season].add(charId(url)));
  });

  // Determine each character's debut season (seasons iterated in order)
  const charDebut: Record<string, string> = {};
  Object.keys(seasonChars).sort().forEach((season) => {
    seasonChars[season].forEach((id) => {
      if (!charDebut[id]) charDebut[id] = season;
    });
  });

  const newPerSeason: Record<string, number> = {};
  Object.values(charDebut).forEach((season) => {
    newPerSeason[season] = (newPerSeason[season] ?? 0) + 1;
  });

  const seasons = Object.keys(seasonChars).sort();
  const seasonLabels = seasons.map((s) => `Season ${parseInt(s)}`);
  const uniqueCounts = seasons.map((s) => seasonChars[s].size);
  const newCounts = seasons.map((s) => newPerSeason[s] ?? 0);

  return (
    <>
      <h3>Unique vs New Characters per Season</h3>
      <BarChart
        xAxis={[{ scaleType: "band", data: seasonLabels }]}
        series={[
          { data: uniqueCounts, label: "Unique characters seen", color: "#42a5f5" },
          { data: newCounts, label: "New debuts", color: "#ff7043" },
        ]}
        height={300}
      />
    </>
  );
};
