import { useEffect, useMemo } from 'react';
import { useAppContent } from 'pocketbase-react';
import { Game, GameState, Player, Team } from './types';

export const useGameLogic = () => {
    const gameMisc = useAppContent<GameState>('misc', true);
    const players = useAppContent<Player>('players', true);
    const games = useAppContent<Game>('games', true);
    const teams = useAppContent<Team>('teams', true);

    console.log({games, players, teams});

    // there's only one (we hope)
    const gameState = gameMisc.records[0];

    const currentGame = useMemo(() => {
        const game = games.records?.find(g => g.id === gameState.currentGame);
        const team1 = teams.records?.find(t => t.id === game?.team1);
        const team2 = teams.records?.find(t => t.id === game?.team2);

        return {
            game,
            team1,
            team2,
        };
    }, [games.records, gameState.currentGame, teams.records]);

    useEffect(() => {
        const subs = [gameMisc, players];

        subs.forEach(sub => sub.actions.subscribe());

        return () => {
            subs.forEach(sub => sub.actions.unsubscribe());
        };
    }, []);

    return {
        gameState,
        currentGame,
        players: players.records,
    };
};
