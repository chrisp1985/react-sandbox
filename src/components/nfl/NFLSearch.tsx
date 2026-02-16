import { useState } from "react";
import { getPlayersByAvailable } from "../../api/nflClient";
import { NFLList } from "./NFLList";

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
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>NFL Player Search</h1>
      <input
        type="text"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        style={{ width: 300, padding: 8, marginRight: 8 }}
      />
      <button onClick={handleFetch} disabled={!apiKey || loading} style={{ padding: 8 }}>
        {loading ? "Loading..." : "Fetch Players"}
      </button>
      <h3>{players.length > 0 ? "Players Fetched!" : "Click button to fetch players."}</h3>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    <NFLList players={players} />
    </div>
  );
};