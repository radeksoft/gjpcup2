import { useGameLogic } from "./logic";
import { Game, Goal, Player, ReferenceTo, Team } from "./types";

export const useAdminLogic = () => {
    const {
        gameState,
        currentGame,

        games,
        goals,
        players,
        teams,

        gamesActions,
        goalsActions,
        playersActions,
        teamsActions,
        gameMiscActions,
    } = useGameLogic();

    const startMatchFromStart = () => {
        gameMiscActions.update(gameState.id!, {
            matchStarted: true,
            currentGameNo: 0,
        });
    };

    const startMatchFromNo = (no: number) => {
        gameMiscActions.update(gameState.id!, {
            matchStarted: true,
            currentGameNo: no,
        });
    };

    const startGameNo = (no: number) => {
        gameMiscActions.update(gameState.id!, {
            currentGameNo: no,
        });
    };

    const newGoal = async (game: Game, team: Team, player: Player, minute: number, side: 1 | 2) => {
        const theGoal = await (goalsActions.create({
            game: game.id,
            team: team.id,
            player: player.id,
            minute,
            side,
        } as Partial<Goal>) as Promise<void | Goal | undefined>);
        if (!theGoal || !theGoal.id)
            return;

        console.log({theGoal});
        let gameObjChange: Partial<Game> = { };

        if (side === 1) {
            gameObjChange = {
                goals: [...game.goals, theGoal.id],
                goals1: game.goals1 + 1,
            };
        } else if (side === 2) {
            gameObjChange = {
                goals: [...game.goals, theGoal.id],
                goals2: game.goals2 + 1,
            };
        }

        gamesActions.update(game.id, gameObjChange);
        playersActions.update(player.id, { goals: [...player.goals, theGoal.id] } as Partial<Player>);
    };

    const savePoints = (team1: Team, team2: Team, newPoints1: number, newPoints2: number) => {
        teamsActions.update(team1.id, { points: team1.points + newPoints1 } as Partial<Team>);
        teamsActions.update(team2.id, { points: team2.points + newPoints2 } as Partial<Team>);
    };

    return {
        startMatchFromStart,
        startMatchFromNo,
        startGameNo,
        newGoal,
        savePoints,
    };
};