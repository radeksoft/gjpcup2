import fs from 'fs';
import assert from 'assert';

import PocketBase from 'pocketbase';
import 'dotenv/config';

import { parseTeamsPlayers } from './filldb/parse';
import { addMembersToTeams, createEmptyTeams } from './filldb/teams';
import { createPlayers } from './filldb/players';
import { createGames, createTeachersGame } from './filldb/games';

const { POCKETBASE_ENDPOINT, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } = process.env;
assert(POCKETBASE_ENDPOINT, 'missing env var POCKETBASE_ENDPOINT');
assert(POCKETBASE_ADMIN_EMAIL, 'missing env var POCKETBASE_ADMIN_EMAIL');
assert(POCKETBASE_ADMIN_PASSWORD, 'missing env var POCKETBASE_ADMIN_PASSWORD');

const csv = fs.readFileSync('./tymy.csv', 'utf8');
const teams = parseTeamsPlayers(csv);

const pb = new PocketBase(POCKETBASE_ENDPOINT);
await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

const emptyTeams = await createEmptyTeams(teams, pb);
console.log({emptyTeams});

const updatedTeams = await createPlayers(emptyTeams, pb);
console.log({updatedTeams});

await addMembersToTeams(updatedTeams, pb);

const studentTeams = emptyTeams.filter(t => !t.teachers);

const nextNo = await createGames(studentTeams, pb);

const teachersTeam = emptyTeams.find(t => t.teachers);
assert(teachersTeam);
await createTeachersGame(teachersTeam, nextNo, pb);
