import React, { useMemo } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { Player, Team } from '../types';
import { useGameLogic } from '../logic';

const teamPointsInlineStyle: React.CSSProperties = {
    borderBottomStyle: 'hidden',
};

type TeamProps = {
    team: Team,
};

export const TeamView: React.FC<TeamProps> = props => {
    const { players } = useGameLogic();

    const {
        team,
    } = props;

    const members = useMemo(() => {
        const array =  players.filter(player => player.team === team.id).sort((a, b) => a.goals.length - b.goals.length);
        return new Set(array);
    }, [players, team.id]);

    return (
        <Card className='my-3'>
            <Card.Header as="h5">{team.name}</Card.Header>
            <Card.Body className='pb-0'>
                <Table>
                    <tbody>
                        {[...members.values()].map((member, idx) => (
                            <PlayerRow player={member} last={idx === members.size-1} key={member.id}/>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={teamPointsInlineStyle}>
                            <td><b>Body týmu:</b></td>
                            <td><b>{team.points}</b></td>
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
            <td>{player.name}</td>
            <td>{player.goals.length}</td>
        </tr>
    );
};
