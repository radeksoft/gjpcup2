import { useEffect, useMemo } from 'react';
import { useAppContent } from 'pocketbase-react/src';
import { Game, GameState, Goal, Player, Team } from './types';

export const useGameLogic = () => {
    // add new ones to `subs` in the `useEffect` below!
    const gameMisc = useAppContent<GameState>('misc', true);
    const players = useAppContent<Player>('players', true);
    const games = useAppContent<Game>('games', true);
    const teams = useAppContent<Team>('teams', true);
    const goals = useAppContent<Goal>('goals', true);

    // console.log({games, players, teams});

    // there's only one (we hope)
    console.log({gameMisc});
    const gameState = gameMisc.records[0];
    // console.log({gameMisc, gameState});

    const currentGame = useMemo(() => {
        const game = games.records?.find(g => g.no === gameState.currentGameNo);
        const team1 = teams.records?.find(t => t.id === game?.team1);
        const team2 = teams.records?.find(t => t.id === game?.team2);

        return {
            game,
            team1,
            team2,
        };
    }, [games.records, gameState.currentGameNo, teams.records]);

    return {
        gameState,
        currentGame,

        players: players.records,
        games: games.records,
        teams: teams.records,
        goals: goals.records,

        addPlayer: players.actions.create,
    };
};
