import { type Episode } from "./Episode";
import { Card, CardContent } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export const EpisodesPerSeason = ({ episodes }: { episodes: Episode[] }) => {
    const episodesPerSeason = episodes.reduce((acc, ep) => {
    const season = ep.episode.slice(1, 3);

    acc[season] = (acc[season] || 0) + 1;

    return acc;
    }, {} as Record<string, number>);

    const seasonLabels = Object.keys(episodesPerSeason).map(s => `Season ${parseInt(s)}`);
    const seasonCounts = Object.values(episodesPerSeason);

    return(
        <>
        <h3>Episodes per Season</h3> 
        <BarChart
            xAxis={[{ scaleType: "band", data: seasonLabels }]}
            series={[{ data: seasonCounts, label: "Episodes" }]}
            height={300}/>
        </>
    )
};