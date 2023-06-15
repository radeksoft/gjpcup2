import React, { useMemo, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import type { Game, Player, ReferenceTo, Team } from '../../types';
import { useGameLogic } from '../../logic';
import { useAdminLogic } from '../../admin-logic';
import { ButtonGroup } from 'react-bootstrap';

type AdminGoalInputProps = {
    game: Game,
    team: Team,
    side: 1 | 2,
};

export const AdminGoalInput: React.FC<AdminGoalInputProps> = props => {
    const {
        game,
        team,
        side,
    } = props;

    const [minute, setMinute] = useState(1);
    const [playerId, setPlayerId] = useState<ReferenceTo<Player>>();

    const {
        players,
    } = useGameLogic();

    const {
        newGoal,
    } = useAdminLogic();

    const members = useMemo(() => {
        return players.filter(player => team.members.find(memberId => memberId === player.id));
    }, [players, team]);

    const addGoal = async () => {
        if (!playerId) {
            console.error('you stupid');
            return;
        }

        const player = members.find(m => m.id === playerId);
        if (!player) {
            console.error('no player by id', playerId, members);
            return;
        }

        console.log({game, team, player, minute, side});
        await newGoal(game, team, player, minute, side);
    };

    return (
        <Stack gap={1}>
            <ButtonGroup>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <Button key={n} onClick={() => setMinute(n)} variant={n === minute ? 'primary' : 'secondary'}>{n}</Button>
                ))}
            </ButtonGroup>
            <Stack>
            {members.map(mem => (
                <Button
                    key={mem.id}
                    className='m-0 p-1'
                    onClick={() => setPlayerId(mem.id)}
                    variant={mem.id === playerId ? 'primary' : 'secondary'}
                >
                    {mem.name}
                </Button>
            ))}
            </Stack>
            <Button onClick={() => addGoal()}>Add Goal</Button>
        </Stack>
    );
};
