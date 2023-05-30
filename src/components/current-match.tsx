import React, { useMemo } from 'react';
import { useGameLogic } from '../logic';
import Card from 'react-bootstrap/Card';
// import { Container, Card, Table } from 'react-bootstrap';
// import {Team} from '../types';
// import {GoalRow} from './goal-row';

export const CurrentMatch: React.FC = () => {
    const { currentGame: { game, team1, team2 } } = useGameLogic();

    if (!game || !team1 || !team2) {
        return (
            <p>we got no game, preparing</p>
        )
    }

    return (
        <Card>
            <Card.Header>Aktuální západ</Card.Header>
            <Card.Body>
                <p>current match no: {game?.no}</p>
                <p>between {team1?.name} and {team2?.name}</p>
            </Card.Body>
        </Card>
    );
};
