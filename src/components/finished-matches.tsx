import React, { useMemo } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useGameLogic } from '../logic';
import { Game } from '../types';
import { GoalRow } from './goal-row';

export const FinishedMatches: React.FC = () => {
    const {
        games,
        gameState,
    } = useGameLogic();

    const finishedGames = useMemo(() => {
        const filtered = games.filter(g => g.no < gameState.currentGameNo)
        return filtered;
    }, [games, gameState]);

    return (
        <div>
            <h3 className="text-center mb-3">Dohrané zápasy</h3>
            {finishedGames.map(game => (
                <GameView game={game} key={game.id} />
            ))}
        </div>
    );
};

type MatchProps = {
    game: Game,
};

const vsInlineStyle: React.CSSProperties = {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 20,
};


const GameView: React.FC<MatchProps> = props => {
    const {
        game,
    } = props;

    const { getTeamsByGame } = useGameLogic();

    const { team1, team2 } = useMemo(() => {
        return getTeamsByGame(game);
    }, [game, getTeamsByGame]);

    if (!team1 || !team2)
        return null;

    return (
        <Card className='text-center' style={{marginBottom: 32}}>
            <Card.Body className='d-flex flex-row justify-content-around' style={{marginBottom: -10}}>
                <div className='d-flex flex-column flex-grow-1'>
                    <Card.Text style={{fontSize: 25}}>{team1.name}</Card.Text>
                    <Card.Text style={{fontSize: 50, fontWeight: 600, marginTop: -25}} >{game.goals1}</Card.Text>
                </div>

                <Card.Text style={vsInlineStyle}>vs</Card.Text>

                <div className='d-flex flex-column flex-grow-1'>
                    <Card.Text style={{fontSize: 25}}>{team2.name}</Card.Text>
                    <Card.Text style={{fontSize: 50, fontWeight: 600, marginTop: -25}} >{game.goals2}</Card.Text>
                </div>
            </Card.Body>
            {!!game.goals.length && (
                <Table bordered style={{tableLayout: 'fixed', marginBottom: 0, marginRight: 0}}>
                    <tbody>
                        {game.goals.map(goalId => (
                            <GoalRow goalId={goalId} small={true} key={goalId} />
                        ))}
                    </tbody>
                </Table>
            )}
        </Card>
    );
};
