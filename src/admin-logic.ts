import { useGameLogic } from "./logic";
import { Game, GameState, Goal, Player, ReferenceTo, Team } from "./types";

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

    const startMatchFromStart = async () => {
        await gameMiscActions.update(gameState.id as ReferenceTo<GameState>, {
            matchStarted: true,
            currentGameNo: 0,
            currentGameStart: new Date(),
        });
    };

    const startMatchFromNo = async (no: number) => {
        await gameMiscActions.update(gameState.id as ReferenceTo<GameState>, {
            matchStarted: true,
            currentGameNo: no,
            currentGameStart: new Date(),
        });
    };

    const startGameNo = async (no: number) => {
        await gameMiscActions.update(gameState.id as ReferenceTo<GameState>, {
            currentGameNo: no,
            currentGameStart: new Date(),
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

        await Promise.all([
            gamesActions.update(game.id as ReferenceTo<Game>, gameObjChange),
            playersActions.update(player.id as ReferenceTo<Player>, { goals: [...player.goals, theGoal.id] } as Partial<Player>),
        ]);
    };

    const savePoints = async (team1: Team, team2: Team, newPoints1: number, newPoints2: number) => {
        await Promise.all([
            teamsActions.update(team1.id as ReferenceTo<Player>, { points: team1.points + newPoints1 } as Partial<Team>),
            teamsActions.update(team2.id as ReferenceTo<Player>, { points: team2.points + newPoints2 } as Partial<Team>),
        ]);
    };

    const finishGame = async (game: Game) => {
        await gamesActions.update(game.id as ReferenceTo<Game>, { finished: true } as Partial<Game>);
    };

    return {
        startMatchFromStart,
        startMatchFromNo,
        startGameNo,
        newGoal,
        savePoints,
        finishGame,
    };
};
