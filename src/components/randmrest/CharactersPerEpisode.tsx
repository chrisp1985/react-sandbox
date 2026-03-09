import { Card, CardContent } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { type Episode } from "./Episode";

export const CharactersPerEpisode = ({ episodes }: { episodes: Episode[] }) => {
 
    const characterCounts = episodes.map((ep) => ep.characters.length);
    const episodeIndices = episodes.map((_, idx) => idx + 1);
    const episodeLabels = episodes.map((ep, idx) => `${idx + 1}: ${ep.name}`);    

    return(
        <Card sx={{ maxWidth: '100%', mx: 'auto', mt: 6, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
                <LineChart
                    xAxis={[{
                    data: episodeIndices,
                    label: 'Episode',
                    valueFormatter: (value: number, context: { location?: string }): string => {
                        if (context && context.location === 'tooltip') {
                        const idx = value - 1;
                        return episodeLabels[idx] ? String(episodeLabels[idx]) : String(value);
                        }
                        return String(value);
                    },
                    }]}
                    yAxis={[{ min: 0, label: 'Characters' }]}
                    series={[{ data: characterCounts, label: 'Characters per Episode', curve: "monotoneX", showMark: false}]}
                    height={400}
                />
            </CardContent>
        </Card>
)};
  