import React, { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import { GoalRow } from '../../components/goal-row';

import { useGameLogic, PAGE_STYLE } from '../../logic';
import { useAdminLogic } from '../../admin-logic';
import { AdminGoalInput } from '../../components/admin/goal-input';

const vsInlineStyle: React.CSSProperties = {
    marginTop: 'auto',
    marginBottom: 'auto',
};

export const AdminHomePage: React.FC = () => {
    const {
        teams,
        games,
        gameState,
        currentGame,
        // startNextGame,
        // prevGame,
        // startMatch,
    } = useGameLogic();

    const {
        startMatchFromStart,
        startMatchFromNo,
        startGameNo,
        savePoints,
        finishGame,
    } = useAdminLogic();

    const [showGameNo, setShowGameNo] = useState(gameState.currentGameNo);

    const [shownGame, team1, team2] = useMemo(() => {
        const FUCK = [undefined, undefined, undefined];

        const foundGame = games.find(g => g.no === showGameNo);
        if (!foundGame)
            return FUCK;

        const foundTeam1 = teams.find(t => t.id === foundGame.team1);
        const foundTeam2 = teams.find(t => t.id === foundGame.team2);
        if (!foundTeam1 || !foundTeam2)
            return FUCK;

        return [foundGame, foundTeam1, foundTeam2];
    }, [games, teams, showGameNo]);

    const [newPoints1, newPoints2] = useMemo(() => {
        const g1 = shownGame?.goals1;
        const g2 = shownGame?.goals2;

        // can't use classic !g1, because it's a number, !0 is true and would get classified as invalid
        if (typeof g1 !== 'number' || typeof g2 !== 'number')
            return [0, 0];

        if (g1 === g2)
            return [1, 1];

        if (g1 > g2)
            return [3, 0];

        if (g1 < g2)
            return [0, 3];

        return [0, 0];
    }, [shownGame]);

    const teamsSorted = useMemo(() => {
        return teams.sort((a, b) => a.no - b.no);
    }, [teams]);

    const showNextGame = () => {
        setShowGameNo(prev => prev + 1);
    };

    const showPrevGame = () => {
        setShowGameNo(prev => prev - 1);
    };

    const startCurrentGame = async () => {
        await startGameNo(showGameNo);
    };

    const saveStartNext = async () => {
        if (!team1 || !team2 || !currentGame.game)
            return;
        await savePoints(team1, team2, newPoints1, newPoints2);
        await finishGame(currentGame.game);
        await startGameNo(showGameNo + 1);
        showNextGame();
    }

    return (
        <div style={PAGE_STYLE} className="mt-3">
            {!gameState.matchStarted && (
                <div>
                    <Button variant="success" onClick={() => { startMatchFromStart(); setShowGameNo(0); }}>START MATCH 0</Button>
                    <Button variant="success" onClick={() => startMatchFromNo(showGameNo)}>START MATCH {showGameNo}</Button>
                </div>
            )}
            <Stack direction="horizontal" className="px-2 mb-4">
                <Button disabled={showGameNo === 0} onClick={() => showPrevGame()}>Show Prev</Button>
                {showGameNo !== gameState.currentGameNo && (
                    <Button variant="success" onClick={() => startCurrentGame()}>Start Game</Button>
                )}
                <Stack direction="vertical">
                    <Button onClick={() => showNextGame()} className="ms-auto">Show Next</Button>
                    <Button variant="success" onClick={() => saveStartNext()} className="ms-auto">Save & Start Next</Button>
                </Stack>
            </Stack>
            {shownGame && team1 && team2 && (
                <Card className='text-center mb-4'>
                    <Card.Header>{shownGame.no + 1}. z 45</Card.Header>
                    <Card.Body className='d-flex flex-row justify-content-around'>
                        <div className='d-flex flex-column'>
                            <Card.Text className='h1'>{team1.name}</Card.Text>
                            <Card.Text className='display-1'><strong>{shownGame.goals1}</strong></Card.Text>
                            <Card.Text className='h4'>+{newPoints1} b.</Card.Text>
                        </div>

                        <Card.Text style={vsInlineStyle}>vs</Card.Text>

                        <div className='d-flex flex-column'>
                            <Card.Text className='h1'>{team2.name}</Card.Text>
                            <Card.Text className='display-1'><strong>{shownGame.goals2}</strong></Card.Text>
                            <Card.Text className='h4'>+{newPoints2} b.</Card.Text>
                        </div>
                    </Card.Body>
                    <Table bordered style={{ tableLayout: 'fixed' }}>
                        <tbody>
                            {shownGame.goals.map(goalId => (
                                <GoalRow goalId={goalId} key={goalId} />
                            ))}
                            <tr>
                                <td>
                                    <AdminGoalInput game={shownGame} team={team1} side={1} />
                                </td>
                                <td>
                                    <AdminGoalInput game={shownGame} team={team2} side={2} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            )}
        </div>
    );
};
            // <FutureMatches limit={4} />
