import React, { useMemo } from 'react';
import { Goal, ReferenceTo } from '../types';
import { useGameLogic } from '../logic';

type GoalRowProps = {
    goalId: ReferenceTo<Goal>,
    small?: true,
};

export const GoalRow: React.FC<GoalRowProps> = props => {
    const {
        goalId,
        small,
    } = props;

    const { goals, players } = useGameLogic();

    const goal = useMemo(() => {
        return goals.find(g => g.id === goalId);
    }, [goals, goalId])

    const player = useMemo(() => {
        if (!goal)
            return;
        return players.find(p => p.id === goal.player);
    }, [players, goal]);

    if (!goal || !player)
        return null;

    if (goal.side === 1) {
        return (
            <tr className="goal-row">
                <td className="table-active" style={small && {fontSize: 13, padding: 4}}>
                    <strong>{player.name}</strong>
                    <br />
                    {goal.minute}. minuta
                </td>
                <td className="table-light">
                </td>
            </tr>
        );
    } else if (goal.side === 2) {
        return (
            <tr className="goal-row">
                <td className="table-light">
                </td>
                <td className="table-active" style={small && {fontSize: 13, padding: 4, paddingRight: -1}}>
                    <strong>{player.name}</strong>
                    <br />
                    {goal.minute}. minuta
                </td>
            </tr>
        );
    }

    return null;
};
