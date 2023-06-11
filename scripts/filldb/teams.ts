import type PocketBase from 'pocketbase';
import { ReferenceTo, Team } from "../../src/types";
import { ParsedTeam } from "./parse";
import { TeamWithRefWithMemberRefs } from './players';

export type TeamWithRef = ParsedTeam & {
    dbRef: ReferenceTo<Team>,
};

export const createEmptyTeams = async (parsedTeams: ParsedTeam[], pb: PocketBase) => {
    const insertedTeams: TeamWithRef[] = [];
    const teamsColl = pb.collection('teams');

    for (let i = 0; i < parsedTeams.length; i++) {
        const team = parsedTeams[i];

        const inserted = await teamsColl.create({
            name: team.name,
            no: i+1,
            points: 0,
            members: [],
            teachers: team.teachers,
        });

        insertedTeams.push({
            ...team,
            dbRef: inserted.id,
        });
    }

    return insertedTeams;
};

export const addMembersToTeams = async (teamsWithMemberRefs: TeamWithRefWithMemberRefs[], pb: PocketBase) => {
    const teamsColl = pb.collection('teams');

    for (let i = 0; i < teamsWithMemberRefs.length; i++) {
        const team = teamsWithMemberRefs[i];
        await teamsColl.update(team.dbRef, {
            members: team.memberRefs,
        });
    }
}
