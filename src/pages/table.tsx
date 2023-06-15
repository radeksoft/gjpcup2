import React, { useEffect, useMemo } from 'react';
import Table from "react-bootstrap/Table";
import type { Team } from '../types';
import { useGameLogic } from '../logic';

export const TablePage: React.FC = () => {
    const {
        games,
        teams,
        gameState,
    } = useGameLogic();

    useEffect(() => {
        console.log({games, teams});
    }, [games, teams]);

    const shownTeams = useMemo(() => {
        if (gameState.revealTeachers) {
            return teams;
        } else {
            return teams.filter(t => !t.teachers);
        }
    }, [teams, gameState]);

    return (
        <div style={{width: '100%', maxWidth: 120+11*90+1}}>
            <Table responsive striped bordered hover size='sm' style={{tableLayout: 'fixed'}}>
                <thead>
                    <tr>
                        <th style={{width: 120}}>levý : horní</th>
                        {shownTeams.map(team => (
                            <th style={{width: 90}} key={team.id ?? team.name}>{team.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {shownTeams.map(teamLeft => (
                        <tr key={teamLeft.id ?? teamLeft.name}>
                            <th>{teamLeft.name}</th>
                            {shownTeams.map(teamTop => (
                                <GameCell key={(teamLeft.id ?? teamLeft.name) + (teamTop.id ?? teamTop.name)} teamLeft={teamLeft} teamTop={teamTop} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

type GameCellProps = {
    teamLeft: Team,
    teamTop: Team,
};

const GameCell: React.FC<GameCellProps> = props => {
    const {
        teamLeft,
        teamTop,
    } = props;

    const {
        gameState,
        getGameByTeams,
    } = useGameLogic();

    const game = useMemo(() => {
        if (teamLeft.id === teamTop.id)
            return;

        const theGame = getGameByTeams(teamLeft, teamTop);
        return theGame;
    }, [teamLeft, teamTop, getGameByTeams]);

    const pointsLeft = useMemo(() => {
        if (!game)
            return 0;

        if (game.team1 == teamLeft.id)
            return game.goals1;
        else
            return game.goals2;
    }, [teamLeft, game]);

    const pointsTop = useMemo(() => {
        if (!game)
            return 0;

        if (game.team1 == teamTop.id)
            return game.goals1;
        else
            return game.goals2;
    }, [teamTop, game]);

    if (!game || !gameState)
        return (<td className='table-secondary'></td>);

    if (teamLeft.teachers || teamTop.teachers)
        return (<td className='table-warning'></td>)

    if (gameState.currentGameNo == game.no) {
        return (
            <td className="table-success">{pointsLeft} : {pointsTop}</td>
        );
    }

    return (
        <td>{pointsLeft} : {pointsTop}</td>
    );
};
