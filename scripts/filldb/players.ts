import type PocketBase from 'pocketbase';
import { ParsedTeam } from "./parse";
import { Player, ReferenceTo } from '../../src/types';
import { TeamWithRef } from './teams';

export type TeamWithRefWithMemberRefs = TeamWithRef & {
    memberRefs: ReferenceTo<Player>[],
};

export const createPlayers = async (parsedTeams: TeamWithRef[], pb: PocketBase) => {
    const updatedTeams: TeamWithRefWithMemberRefs[] = [];
    const playersColl = pb.collection('players');

    for (let i = 0; i < parsedTeams.length; i++) {
        const team = parsedTeams[i];
        const insertedRefs: ReferenceTo<Player>[] = [];
        for (const memberName of team.members) {
            const inserted = await playersColl.create({
                name: memberName,
                goals: [],
                team: team.dbRef,
            });
            insertedRefs.push(inserted.id);
        }
        updatedTeams.push({
            ...team,
            memberRefs: insertedRefs,
        });
    }

    return updatedTeams;
};
