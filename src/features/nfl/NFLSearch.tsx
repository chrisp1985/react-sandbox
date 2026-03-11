import { useState } from "react";
import { getPlayersByAvailable } from "./api/nflClient";
import { NFLList } from "./NFLList";
import { Card, CardContent, Box } from '@mui/material';
import { Title } from "../../components/ui/Title";
import { nflContent } from "./nflContent";
import { Panel } from "../../components/ui/Panel";
import { CustomCard } from "../../components/ui/CustomCard";

export const NFLSearch = () => {
  const [apiKey, setApiKey] = useState("");
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPlayersByAvailable(apiKey);
      setPlayers(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch players");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text={nflContent.title} />
      <Panel colour = "primary">
        <CustomCard>
            <p style={{ textAlign: 'left' }}>{nflContent.line1}</p>
            <p style={{ textAlign: 'left' }}>{nflContent.line2}</p>
            <p style={{ textAlign: 'left' }}>{nflContent.line3}</p>
            <p style={{ textAlign: 'left' }}>{nflContent.line4}</p>
        </CustomCard>
      </Panel>
      <Panel colour = "secondary">
        <CustomCard>
            <p>Get your API Key from <a href="https://sportsdata.io/developers/api-documentation/nfl" target="_blank" rel="noopener noreferrer">SportsData.io NFL API Documentation</a></p>
            <input type="text"  placeholder="Enter API Key" value={apiKey} onChange={e => setApiKey(e.target.value)} style={{ width: 300, padding: 8, marginRight: 8, backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: 4 }}/>
            <button onClick={handleFetch} disabled={!apiKey || loading} style={{ padding: 8 }}>
              {loading ? "Loading..." : "Fetch Players"}
            </button>
            <h3>{players.length > 0 ? "Players Fetched!" : "Click button to fetch players."}</h3>
            {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
          <NFLList players={players} />
        </CustomCard>
      </Panel>
    </>
  );
};