import { type Episode } from "./Episode";
import { BarChart } from "@mui/x-charts/BarChart";

export const TopEpisodes = ({ episodes, n = 10 }: { episodes: Episode[]; n?: number }) => {
  const top = [...episodes]
    .sort((a, b) => b.characters.length - a.characters.length)
    .slice(0, n);

  const codes = top.map((ep) => ep.episode);
  const counts = top.map((ep) => ep.characters.length);
  const nameByCode = Object.fromEntries(top.map((ep) => [ep.episode, ep.name]));

  return (
    <>
      <h3>Top {n} Episodes by Character Count</h3>
      <BarChart
        layout="horizontal"
        yAxis={[{
          scaleType: "band",
          data: codes,
          tickLabelStyle: { fontSize: 11 },
          valueFormatter: (code: string, context) =>
            context.location === 'tooltip' ? `${code}: ${nameByCode[code]}` : code,
        }]}
        xAxis={[{ label: "Characters" }]}
        series={[{ data: counts, label: "Characters", color: "#ab47bc" }]}
        height={380}
        margin={{ left: 60 }}
      />
    </>
  );
};
