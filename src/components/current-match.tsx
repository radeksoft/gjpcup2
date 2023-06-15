import React, { useMemo } from 'react';
import { useGameLogic } from '../logic';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { GoalRow } from './goal-row';

const vsInlineStyle: React.CSSProperties = {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 20,
};

export const CurrentMatch: React.FC = () => {
    const { currentGame: { game, team1, team2 }, gameState: { matchStarted } } = useGameLogic();

    if (!matchStarted) {
        return (
            <p>za chvíli začínáme! TODO: show just following games</p>
        )
    }


    if (!game || !team1 || !team2) {
        return (
            <p>we got no game, preparing</p>
        )
    }

    return (
        <Card className='text-center mb-4'>
            <Card.Header>Probíhající zápas ({game.no + 1}. z 45)</Card.Header>
            <Card.Body className='d-flex flex-row justify-content-around' style={{marginBottom: -10}}>
                <div className='d-flex flex-column flex-grow-1'>
                    <Card.Text style={{fontSize: 30}}>{team1.name}</Card.Text>
                    <Card.Text style={{fontSize: 80, fontWeight: 600, marginTop: -25}} >{game.goals1}</Card.Text>
                </div>

                <Card.Text style={vsInlineStyle}>vs</Card.Text>

                <div className='d-flex flex-column flex-grow-1'>
                    <Card.Text style={{fontSize: 30}}>{team2.name}</Card.Text>
                    <Card.Text style={{fontSize: 80, fontWeight: 600, marginTop: -25}} >{game.goals2}</Card.Text>
                </div>
            </Card.Body>
            {!!game.goals.length && (
                <Table bordered style={{tableLayout: 'fixed', marginBottom: 0, marginRight: 0}}>
                    <tbody>
                        {game.goals.map(goal => (
                            <GoalRow goalId={goal} key={goal} />
                        ))}
                    </tbody>
                </Table>
            )}
        </Card>
    );
};
