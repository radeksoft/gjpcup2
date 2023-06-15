import React, { useMemo } from 'react';
import { Card } from 'react-bootstrap';
import { useGameLogic } from '../logic';
import { Team } from '../types';

export const NextMatch: React.FC = () => {
    const {
        games,
        gameState,
        currentGame,
    } = useGameLogic();

    const upcomingGame = useMemo(() => {
        const game = games.find(g => g.no === gameState.currentGameNo + 1);

        if (!game)
            return;

        return game;
    }, [games, gameState]);

    const nextStartFormatted = useMemo(() => {
        const { currentGameStart, matchStarted, gameDuration } = gameState;

        if (!matchStarted) {
            const firstGameStart = new Date(2023, 5, 15, 8, 0);
            const formatted = firstGameStart.toLocaleTimeString('cs-cz', { hour: 'numeric', minute: '2-digit' });
            return formatted;
        }

        if (!currentGameStart)
            return;

        const cloned = new Date(currentGameStart);
        cloned.setMinutes(cloned.getMinutes() + gameDuration);
        const formatted = cloned.toLocaleTimeString('cs-cz', { hour: 'numeric', minute: '2-digit' });
        return formatted;
    }, [gameState]);

    if (!upcomingGame || !gameState || !currentGame.team1 || !currentGame.team2 || !nextStartFormatted)
        return (<></>);

    // if (!gameState.matchStarted) {
    //     return (
    //         <Card className='text-center mb-4'>
    //             <Card.Header className='text-muted'>Nadcházející zápas</Card.Header>
    //             <Card.Body className='d-flex flex-row justify-content-around'>
    //                 <Card.Text><strong>{currentGame.team1.name}</strong> - <strong>{currentGame.team2.name}</strong>, připravte se!</Card.Text>
    //             </Card.Body>
    //         </Card>
    //     );
    // }

    // if (gameState.exhibition)
    //     return (<></>);

    if (gameState.currentGameNo == 44) {
        return (
            <Card className='text-center mb-4'>
                <Card.Header className='text-muted'>Nadcházející zápas</Card.Header>
                <Card.Body className='d-flex flex-row justify-content-around'>
                    <Card.Text><strong>Exhibice: výherci - učitelé</strong></Card.Text>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card className='text-center mb-4'>
            <Card.Header className='text-muted'>Nadcházející zápas</Card.Header>
            <Card.Body className='d-flex flex-row justify-content-around'>
                <Card.Text><strong>{currentGame.team1.name}</strong> - <strong>{currentGame.team2.name}</strong> asi v {nextStartFormatted}</Card.Text>
            </Card.Body>
        </Card>
    );
};
