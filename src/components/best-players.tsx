import React, { useState, useEffect, useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import {useGameLogic} from '../logic';
import { Player } from '../types';

export const BestPlayers: React.FC = () => {
    const {
        players,
    } = useGameLogic();

    const bestPlayers = useMemo(() => {
        const playersFiltered = players.filter(p => p.goals.length > 0);
        const playersSorted = playersFiltered.sort((a, b) => a.goals.length - b.goals.length);
        const playersReversed = playersSorted.reverse();
        const playersSliced = playersReversed.slice(0, 5);
        return playersSliced;
    }, [players]);

    if (!bestPlayers.length)
        return (<></>);

    return (
        <Card className='text-center mb-4'>
            <Card.Header>Nejlepší hráči</Card.Header>
            <Card.Body className='d-flex flex-row justify-content-around py-2'>
                <Table className='best-players-table mb-0'>
                    <tbody>
                        {bestPlayers.map(player => (
                            <BestPlayerRow key={player.id} player={player} />
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

type BestPlayerRowProps = {
    player: Player,
};

const GOALS_CASES = ['gólů', 'gól', 'góly', 'góly', 'góly', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů', 'gólů']

const BestPlayerRow: React.FC<BestPlayerRowProps> = props => {
    const {
        player,
    } = props;

    const {
        teams,
    } = useGameLogic();

    const team = useMemo(() => {
        return teams.find(t => t.id === player.team);
    }, [teams, player]);

    if (!team)
        return (<></>);

    return (
        <tr>
            <td>{player.name} ({team.name})</td>
            <td>{player.goals.length} {GOALS_CASES[player.goals.length]}</td>
        </tr>
    );
};
