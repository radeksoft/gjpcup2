import assert from 'assert';
import PocketBase from 'pocketbase';
import 'dotenv/config';
import type { Game, GameState, Goal, News, Player, Team } from '../src/types';

import { confirm } from './util';

const { POCKETBASE_ENDPOINT, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } = process.env;
assert(POCKETBASE_ENDPOINT, 'missing env var POCKETBASE_ENDPOINT');
assert(POCKETBASE_ADMIN_EMAIL, 'missing env var POCKETBASE_ADMIN_EMAIL');
assert(POCKETBASE_ADMIN_PASSWORD, 'missing env var POCKETBASE_ADMIN_PASSWORD');

console.log(`Do you really want to purge the db at ${POCKETBASE_ENDPOINT}?`)
console.warn('This will delete all elements from all tables!');
console.log('Confirm with y<Enter>')
if (!await confirm())
    process.exit(1);

const pb = new PocketBase(POCKETBASE_ENDPOINT);
await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

const gamesColl = pb.collection('games');
const games = await gamesColl.getFullList<Game>();
for (const game of games) {
    console.log('deleting game', game.id);
    await gamesColl.delete(game.id!);
}
console.log('========  GAMES DELETED  ========');
console.log();

const goalsColl = pb.collection('goals');
const goals = await goalsColl.getFullList<Goal>();
for (const goal of goals) {
    console.log('deleting goal', goal.id);
    await goalsColl.delete(goal.id!);
}
console.log('========  GOALS DELETED  ========');
console.log();

const newsColl = pb.collection('news');
const news = await newsColl.getFullList<News>();

for (const n of news) {
    console.log('deleting news', n.id);
    await newsColl.delete(n.id!);
}
console.log('========  NEWS DELETED  ========');
console.log();

const playersColl = pb.collection('players');
const players = await playersColl.getFullList<Player>();
for (const player of players) {
    console.log('deleting player', player.id, player.name);
    await playersColl.delete(player.id!);
}
console.log('========  PLAYERS DELETED  ========');
console.log();

const teamsColl = pb.collection('teams');
const teams = await teamsColl.getFullList<Team>();
for (const team of teams) {
    console.log('deleting team', team.id, team.name);
    await teamsColl.delete(team.id!);
}
console.log('========  TEAMS DELETED  ========');
console.log();

console.log('DONE');
process.exit(0);
