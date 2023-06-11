import type PocketBase from 'pocketbase';
import { TeamWithRef } from './teams';

/**
 * @returns the next games.no to be used for createTeachersGame
 */
export const createGames = async (studentTeams: TeamWithRef[], pb: PocketBase) => {
    const gamesColl = pb.collection('games');
    let no = 0;

    for (let i = 0; i < studentTeams.length; i++) {
        const team1 = studentTeams[i];
        for (let j = i+1; j < studentTeams.length; j++) {
            const team2 = studentTeams[j];
            await gamesColl.create({
                team1: team1.dbRef,
                team2: team2.dbRef,
                no,
                finished: false,
            });
            no++;
        }
    }

    return no;
};

export const createTeachersGame = async (teachersTeam: TeamWithRef, no: number, pb: PocketBase) => {
    const gamesColl = pb.collection('games');
    await gamesColl.create({
        team1: teachersTeam.dbRef,
        no,
        finished: false,
    });
};
