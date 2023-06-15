import assert from 'assert';
import 'dotenv/config';
import PocketBase from 'pocketbase';
import type { Game, GameState, Goal, News, Player, Team } from '../src/types';

const { POCKETBASE_ENDPOINT, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } = process.env;
assert(POCKETBASE_ENDPOINT, 'missing env var POCKETBASE_ENDPOINT');
assert(POCKETBASE_ADMIN_EMAIL, 'missing env var POCKETBASE_ADMIN_EMAIL');
assert(POCKETBASE_ADMIN_PASSWORD, 'missing env var POCKETBASE_ADMIN_PASSWORD');

const transformTeam = (team: Team, allGames: Game[]) => {
    const { id, no, name, points } = team;
    return { id, no, name, points, games: completedGames(team, allGames) };
};

const completedGames = (team: Team, allGames: Game[]) => {
    let res = 0;
    for (const game of allGames) {
        if (!game.finished)
            continue;

        if (game.team1 === team.id || game.team2 === team.id)
            res += 1;
    }

    return res >= 9 ? 'DONE' : res;
};

const TEACHERS_TEAM_ID = 'pg7a6r910fvfhlq';

const pb = new PocketBase(POCKETBASE_ENDPOINT);
await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

const teamsColl = pb.collection('teams');
const teams = await teamsColl.getFullList<Team>();

const gamesColl = pb.collection('games');
const games = await gamesColl.getFullList<Game>();

const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

console.table(sortedTeams.map(t => transformTeam(t, games)));
