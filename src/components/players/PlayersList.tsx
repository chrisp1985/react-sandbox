import { useState, useEffect } from 'react';
import type { Player } from '../../api/players';
import { getPlayers, deletePlayer } from '../../api/players';

export const PlayersList = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function handleDelete(playerId:number) {
        setDeleteError(null);
        try {
            setDeletingId(playerId);
            await deletePlayer(playerId);
            setPlayers(current =>
                current.filter(player => player.playerNo !== playerId)
            );
        }
        catch (err: unknown) {
                const message =
                    err instanceof Error
                    ? err.message
                    : "Unable to delete player.";
                setDeleteError(message);
        }
        finally {
            setDeletingId(null);
        }
    }

    useEffect(() => {
        let ignore = false;

        async function loadPlayers() {
            try {
                const result = await getPlayers();
                if (!ignore) setPlayers(result.data);
            }
            catch (err: unknown) {
                const message =
                    err instanceof Error
                    ? err.message
                    : "Unable to load players";

                if (!ignore) setLoadError(message);
            }
            finally {
                if (!ignore) setLoading(false);
            }
        }

        void loadPlayers();

        return () => {
            ignore = true;
        };        
    }, []);

    if (loading) {
        return <p>Loading players...</p>;
    }

    if (loadError) {
        return (
            <>
                <p>Error: {loadError}</p>
                <p>HINT: Check that the NestJS server is running.</p>
            </>
        );
    }

    if (players.length === 0) {
        return <p>No players found.</p>;
    }    

    return (
        <>
        {deleteError && <p>Error: {deleteError}</p>}
        <ul>
        {players.map((player) => (
            <li key={player.playerNo}>
                {player.name} : {player.club} : {player.rating}
                <button
                    disabled={deletingId !== null}
                    onClick={() => void handleDelete(player.playerNo)}
                >
                    {deletingId === player.playerNo ? "Deleting..." : "Delete"}
                </button>
            </li>
        ))}
        </ul>
        </>
    );
};