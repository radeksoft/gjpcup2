import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import {Game, Player, Team} from '../../types';
import { useGameLogic } from '../../logic';
import { useAdminLogic } from '../../admin-logic';

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

    const userInputRef = useRef<HTMLSelectElement | null>();

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
        console.log({userInputRef});

        if (!userInputRef.current)
            return;

        const selectedPlayerId = userInputRef.current.value;
        const player = members.find(mem => mem.id === selectedPlayerId);
        // const player = members.find(mem => mem.id === selectedPlayerId);

        if (!player) {
            console.log('player not found wtf', selectedPlayerId);
            return;
        }

        console.log({game, team, player, minute, side});
        await newGoal(game, team, player, minute, side);
    };

    return (
        <Stack gap={1}>
            <InputGroup>
                <Button variant="outline-secondary" onClick={() => setMinute(minute - 1)}>-</Button>
                <InputGroup.Text className="flex-fill">{minute}. min</InputGroup.Text>
                <Button variant="outline-secondary" onClick={() => setMinute(minute + 1)}>+</Button>
            </InputGroup>
            {members.length ? (
                <select ref={ref => userInputRef.current = ref} style={{height: 50}}>
                    {members.map(mem => (
                        <option key={mem.id!} value={mem.id!}>{mem.name}</option>
                    ))}
                </select>
            ) : (
                <p>loading</p>
            )}
            <Button onClick={() => addGoal()}>Add Goal</Button>
        </Stack>
    );
};
