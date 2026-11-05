import { getPlayers, deletePlayer } from '../../api/players';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const PlayersList = () => {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({ 
        mutationFn: deletePlayer, 
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['players'],
            });
        },
    });

    const {
        data,
        isPending,
        isError,
        error,
        } = useQuery({
        queryKey: ['players'],
        queryFn: getPlayers,
        retry: false,
    });    

    if (isPending) {
        return <p>Loading players...</p>;
    }

    if (isError) {
        return (
            <>
                <p>Error: {error.message}</p>
                <p>HINT: Check that the NestJS server is running.</p>
            </>
        );
    }

    if (data.data.length === 0) {
        return <p>No players found.</p>;
    }    

    return (
        <>
        {deleteMutation.isError && <p>Error: {deleteMutation.error.message}</p>}
        <ul>
        {data.data.map((player) => (
            <li key={player.playerNo}>
                {player.name} : {player.club} : {player.rating}
                <button
                    disabled={deleteMutation.isPending}
                    onClick={() => void deleteMutation.mutate(player.playerNo)}
                >
                    {deleteMutation.isPending &&
                    deleteMutation.variables === player.playerNo
                        ? "Deleting..."
                        : "Delete"}
                </button>
            </li>
        ))}
        </ul>
        </>
    );
};