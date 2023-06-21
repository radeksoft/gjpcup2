import React, { useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import type { Player, Team } from '../types';
import { useGameLogic } from '../logic';

const teamPointsInlineStyle: React.CSSProperties = {
    borderBottomStyle: 'hidden',
};

type TeamProps = {
    team: Team,
};

const AMOGUS = '\u0d9e';

export const TeamView: React.FC<TeamProps> = props => {
    const { players } = useGameLogic();

    const {
        team,
    } = props;

    const members = useMemo(() => {
        return players.filter(player => player.team === team.id);
    }, [players, team.id]);

    const totalGoals = useMemo(() => {
        return members.map(m => m.goals.length).reduce((prev, curr) => prev + curr, 0);
    }, [members]);

    const membersShown = useMemo(() => {
        const amogus = members.find(m => m.name === AMOGUS);
        if (amogus && amogus.goals.length > 0) {
            return [
                ...members.filter(m => m.name !== AMOGUS).sort((a, b) => b.goals.length - a.goals.length),
                amogus,
            ];
        } else {
            return members.filter(m => m.name !== AMOGUS).sort((a, b) => b.goals.length - a.goals.length);
        }
    }, [members]);

    return (
        <Card className={team.teachers ? 'border border-warning border-4 my-3' : 'my-3'}>
            <Card.Header as="h5">{team.name}</Card.Header>
            <Card.Body className='pb-0'>
                <Table>
                    <tbody>
                        {membersShown.map((member, idx) => (
                            <PlayerRow player={member} last={idx === membersShown.length-1} key={member.id}/>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={teamPointsInlineStyle}>
                            <td className='w-75'><b>Góly týmu:</b></td>
                            <td className='w-25'><b>{totalGoals}</b></td>
                        </tr>
                        <tr style={teamPointsInlineStyle}>
                            <td className='w-75'><b>Body týmu:</b></td>
                            <td className='w-25'><b>{team.points}</b></td>
                        </tr>
                    </tfoot>
                </Table>
            </Card.Body>
        </Card>
    );
};

type PlayerRowProps = {
    player: Player,
    last: boolean,
};

const PlayerRow: React.FC<PlayerRowProps> = props => {
    const { player, last } = props;

    return (
        <tr style={last ? { borderBottomColor: 'black' } : undefined}>
            <td className='w-75'>{player.name}</td>
            <td className='w-25'>{player.goals.length}</td>
        </tr>
    );
};
