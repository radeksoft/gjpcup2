import { useEffect, useMemo } from 'react';
import { useAppContent } from 'pocketbase-react/src';
import type { Game, GameState, Goal, News, Player, Team } from './types';

export const useGameLogic = () => {
    // add new ones to `subs` in the `useEffect` below!
    const gameMisc = useAppContent<GameState>('misc', true);
    const players = useAppContent<Player>('players', true);
    const games = useAppContent<Game>('games', true);
    const teams = useAppContent<Team>('teams', true);
    const goals = useAppContent<Goal>('goals', true);
    const news = useAppContent<News>('news', true);

    // there's only one (we hope)
    const gameState = gameMisc.records[0];

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

    const nextGameStart = useMemo(() => {
        const { currentGameStart, matchStarted, gameDuration } = gameState;

        if (!matchStarted || !currentGameStart) {
            const firstGameStart = new Date(2023, 5, 15, 8, 0);
            return firstGameStart;
        }

        const cloned = new Date(currentGameStart);
        cloned.setMinutes(cloned.getMinutes() + gameDuration);
        return cloned;
    }, [gameState])

    const getGameByTeams = (team1: Team, team2: Team) => {
        return games.records.find(game => (
            (game.team1 == team1.id || game.team1 == team2.id) &&
            (game.team2 == team1.id || game.team2 == team2.id)
        ));
    };

    const getTeamsByGame = (game: Game) => {
        const team1 = teams.records.find(t => t.id === game.team1);
        const team2 = teams.records.find(t => t.id === game.team2);
        return { team1, team2 };
    }

    return {
        gameState,
        currentGame,
        nextGameStart,

        players: players.records,
        games: games.records,
        teams: teams.records,
        goals: goals.records,
        news: news.records,

        playersActions: players.actions,
        gamesActions: games.actions,
        teamsActions: teams.actions,
        goalsActions: goals.actions,
        gameMiscActions: gameMisc.actions,

        getGameByTeams,
        getTeamsByGame,
    };
};

export const PAGE_STYLE: React.CSSProperties = {
    width: '100%',
    maxWidth: 800,
};
