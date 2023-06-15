import React, { useEffect, useMemo } from 'react';
import Table from "react-bootstrap/Table";
import type { Team } from '../types';
import { useGameLogic } from '../logic';

export const TablePage: React.FC = () => {
    const {
        games,
        teams,
    } = useGameLogic();

    useEffect(() => {
        console.log({games, teams});
    }, [games, teams]);

    return (
        <Table responsive striped bordered hover size='sm' style={{tableLayout: 'fixed', width: 950}}>
            <thead>
                <tr>
                    <th style={{width: 120}}>levý : horní</th>
                    {teams.map(team => (
                        <th key={team.id ?? team.name}>{team.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {teams.map(teamLeft => (
                    <tr key={teamLeft.id ?? teamLeft.name}>
                        <th>{teamLeft.name}</th>
                        {teams.map(teamTop => (
                            <GameCell key={(teamLeft.id ?? teamLeft.name) + (teamTop.id ?? teamTop.name)} teamLeft={teamLeft} teamTop={teamTop} />
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
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
        // console.log({teamLeft, teamTop});
        // console.log('useMemo game');
        const theGame = getGameByTeams(teamLeft, teamTop);
        // console.log({theGame});
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
        return (<td>-</td>);

    if (gameState.currentGameNo == game.no) {
        return (
            <td className="table-success">{pointsLeft} : {pointsTop}</td>
        );
    }

    return (
        <td>{pointsLeft} : {pointsTop}</td>
    );
};
