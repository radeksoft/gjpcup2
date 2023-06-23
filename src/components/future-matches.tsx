import React, { useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import { useGameLogic } from '../logic';
import type { Game } from '../types';

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
        // we want to show the first game when match not started

        let gamesToShow: Game[] = [];

        if (!gameState.revealTeachers) {
            gamesToShow = games.slice(0, -1);
        } else {
            gamesToShow = games;
        }

        const offset = gameState.matchStarted ? 0 : 1;

        if (limit) {
            return gamesToShow.filter(g => g.no+offset > gameState.currentGameNo).sort((a, b) => a.no - b.no).slice(0, limit);
        } else {
            return gamesToShow.filter(g => g.no+offset > gameState.currentGameNo).sort((a, b) => a.no - b.no);
        }
    }, [games, gameState, limit]);

    return (
        <Card className='text-center mb-4'>
            <Card.Header>Nadcházející zápasy</Card.Header>
            <Card.Body className='py-1'>
                {upcomingGames.length ? upcomingGames.map((game, index) => (
                    <>
                        <FutureMatch game={game} />
                        {index !== upcomingGames.length - 1 && <hr className='my-0' />}
                    </>
                )) : (
                    <p className='mt-3 fs-5'>vyhlášení :)</p>
                )}
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
        const diff = game.no - gameState.currentGameNo - 1;
        const cloned = new Date(nextGameStart);
        cloned.setMinutes(cloned.getMinutes() + diff * gameState.gameDuration);
        const formatted = cloned.toLocaleTimeString('cs-cz', { hour: 'numeric', minute: '2-digit' });
        return formatted;
    }, [game, gameState, nextGameStart]);


    // if (!team1 || !team2)
    //     return null;
        // return (<p>loading</p>);

    if (gameState.revealTeachers && (team1?.teachers || team2?.teachers)) {
        if (!team1)
            return null;

        if (!team2) {
            return (
                <Card.Text className='bg-warning bg-opacity-25 py-3 mb-3 rounded-bottom'>
                    <strong>{team1.name}</strong> - <strong>vítězové</strong> asi v {gameStartFormatted}
                </Card.Text>
            )
        }
        return (
            <Card.Text className='bg-warning bg-opacity-25 py-3 mb-3 rounded-bottom'>
                <strong>{team1.name}</strong> - <strong>{team2.name}</strong> asi v {gameStartFormatted}
            </Card.Text>
        );
    }

    if (!team1 || !team2)
        return null;

    return (
        <Card.Text className='my-3'><strong>{team1.name}</strong> - <strong>{team2.name}</strong> asi v {gameStartFormatted}</Card.Text>
    );
};
