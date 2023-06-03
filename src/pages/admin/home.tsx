import React from 'react';
import { useGameLogic } from '../../logic';
import Button from 'react-bootstrap/Button';

export const AdminHomePage: React.FC = () => {
    const { teams, addPlayer } = useGameLogic();

    return (
        <div>
            {teams.map(team => (
                <div>
                    <p>{team.name}</p>
                    <Button onClick={() => addPlayer({name: Math.random().toString(), team: team.id})}>ADD</Button>
                </div>
            ))}
        </div>
    );
};
