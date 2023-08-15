import assert from 'assert';
import 'dotenv/config';
import PocketBase from 'pocketbase';
import type { Game, GameState, Goal, News, Player, Team } from '../src/types';
import { confirm } from './util';

const { POCKETBASE_ENDPOINT, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } = process.env;
assert(POCKETBASE_ENDPOINT, 'missing env var POCKETBASE_ENDPOINT');
assert(POCKETBASE_ADMIN_EMAIL, 'missing env var POCKETBASE_ADMIN_EMAIL');
assert(POCKETBASE_ADMIN_PASSWORD, 'missing env var POCKETBASE_ADMIN_PASSWORD');

console.log(`Do you really want to reset the db at ${POCKETBASE_ENDPOINT}?`)
console.warn('This will delete data!');
console.log('Confirm with y<Enter>')
if (!await confirm())
    process.exit(1);

const TEACHERS_TEAM_ID = '2578hwt3ngdwr3b';

const pb = new PocketBase(POCKETBASE_ENDPOINT);
await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

const gamesColl = pb.collection('games');
const games = await gamesColl.getFullList<Game>();

for (const game of games) {
    if (game.team1 == TEACHERS_TEAM_ID || game.team2 === TEACHERS_TEAM_ID) {
        console.log('clearing teachers game', game.id);
        await gamesColl.update(game.id!, {
            finished: false,
            team2: null,
            goals1: 0,
            goals2: 0,
            goals: [],
        });
    } else {
        console.log('clearing game', game.id);
        await gamesColl.update(game.id!, {
            finished: false,
            goals1: 0,
            goals2: 0,
            goals: [],
        });
    }
}
console.log('========  GAMES CLEARED  ========');
console.log();


const goalsColl = pb.collection('goals');
const goals = await goalsColl.getFullList<Goal>();

for (const goal of goals) {
    console.log('removing goal', goal.id);
    await goalsColl.delete(goal.id!);
}
console.log('========  GOALS REMOVED  ========');
console.log();


const miscColl = pb.collection('misc');
const misc = await miscColl.getFullList<GameState>();
const gameState = misc[0];

console.log('resetting gameState');
await miscColl.update(gameState.id!, {
    currentGameNo: 0,
    matchStarted: false,
    gameDuration: 8,
    currentGameStart: null,
    revealTeachers: false,
});
console.log('========  GAME STATE RESET  ========');
console.log();



const playersColl = pb.collection('players');
const players = await playersColl.getFullList<Player>();

for (const player of players) {
    console.log('clearing player', player.id, player.name);
    await playersColl.update(player.id!, {
        goals: [],
    });
}
console.log('========  PLAYERS CLEARED  ========');
console.log();



const teamsColl = pb.collection('teams');
const teams = await teamsColl.getFullList<Team>();

for (const team of teams) {
    console.log('clearing team', team.id, team.name);
    await teamsColl.update(team.id!, {
        points: 0,
    });
}
console.log('========  TEAMS CLEARED  ========');
console.log();



const newsColl = pb.collection('news');
const news = await newsColl.getFullList<News>();

for (const n of news) {
    console.log('removing news', n.id);
    await newsColl.delete(n.id!);
}
console.log('========  NEWS REMOVED  ========');
console.log();


console.log('DONE');
process.exit(0);
