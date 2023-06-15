import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { useGameLogic } from '../logic';
import {Game, Team} from '../types';

type FutureMatchesProps = {
    limit?: number,
};

export const FutureMatches: React.FC<FutureMatchesProps> = props => {
    const {
        limit,
    } = props;

    const {
        games,
        gameState,
    } = useGameLogic();

    const upcomingGames = useMemo(() => {
        if (limit) {
            const upGames = games.filter(g => g.no > gameState.currentGameNo).slice(0, limit);
            return upGames;
        } else {
            const upGames = games.filter(g => g.no > gameState.currentGameNo);
            return upGames;
        }
    }, [games, gameState, limit]);

    return (
        <Card className='text-center mb-4'>
            <Card.Header>Nadcházející zápasy</Card.Header>
            <Card.Body>
                {upcomingGames.map((game, index) => (
                    <>
                        <FutureMatch game={game} />
                        {index !== upcomingGames.length - 1 && <hr/>}
                    </>
                ))}
            </Card.Body>
        </Card>
    );
};

type FutureMatchProps = {
    game: Game,
};

const FutureMatch: React.FC<FutureMatchProps> = props => {
    const {
        game,
    } = props;

    const {
        gameState,
        nextGameStart,
        getTeamsByGame,
    } = useGameLogic();

    const { team1, team2 } = useMemo(() => {
        return getTeamsByGame(game);
    }, [game, getTeamsByGame]);

    const gameStartFormatted = useMemo(() => {
        const diff = game.no - gameState.currentGameNo;
        const cloned = new Date(nextGameStart);
        cloned.setMinutes(cloned.getMinutes() + diff * gameState.gameDuration);
        const formatted = cloned.toLocaleTimeString('cs-cz', { hour: 'numeric', minute: '2-digit' });
        return formatted;
    }, [game, gameState, nextGameStart]);

    if (!team1 || !team2)
        return (<p>loading</p>);

    return (
        <Card.Text><strong>{team1.name}</strong> - <strong>{team2.name}</strong> asi v {gameStartFormatted}</Card.Text>
    );
};
