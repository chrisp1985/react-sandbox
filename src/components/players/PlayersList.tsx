import { useState, useEffect } from 'react';
import type { Player } from '../../api/players';
import { getPlayers } from '../../api/players';

export const PlayersList = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    async function loadPlayers() {
        try {
            const result = await getPlayers();
            setPlayers(result.data);
        }
        catch (err: unknown) {
        const message =
            err instanceof Error
            ? err.message
            : "Unable to load players";

            setError(message);
        }
        finally {
            setLoading(false);
        }
    }

    void loadPlayers();
    }, []);

    if (loading) {
        return <p>Loading players...</p>;
    }

    if (error) {
        return (
            <>
                <p>Error: {error}</p>
                <p>HINT: Check that the NestJS server is running.</p>
            </>
        );
    }

    if (players.length === 0) {
        return <p>No players found.</p>;
    }    

    return (
        <ul>
        {players.map((player) => (
            <li key={player.playerNo}>
                {player.name} : {player.club} : {player.rating}
            </li>
        ))}
        </ul>
    );
};