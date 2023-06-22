import type PocketBase from 'pocketbase';
import { TeamWithRef } from './teams';

/**
 * @returns the next games.no to be used for createTeachersGame
 */
export const createGames = async (studentTeams: TeamWithRef[], rozpisy: string[], pb: PocketBase) => {
    const gamesColl = pb.collection('games');

    for (let i = 0; i < studentTeams.length; i++) {
        const team1 = studentTeams[i];
        for (let j = i+1; j < studentTeams.length; j++) {
            const team2 = studentTeams[j];
            const no = rozpisy.findIndex(match => match === `${team1.name} : ${team2.name}` || match === `${team2.name} : ${team1.name}`)
            const match = rozpisy[no];

            let currentTeam1: TeamWithRef;
            let currentTeam2: TeamWithRef;

            if (match === `${team1.name} : ${team2.name}`) {
                // correct order
                currentTeam1 = team1;
                currentTeam2 = team2;
            } else {
                currentTeam1 = team2;
                currentTeam2 = team1;
            }

            console.log(team1.name, team2.name, no);
            await gamesColl.create({
                team1: currentTeam1.dbRef,
                team2: currentTeam2.dbRef,
                no,
                finished: false,
            });
        }
    }

    return studentTeams.length * (studentTeams.length-1) / 2;
};

export const createTeachersGame = async (teachersTeam: TeamWithRef, no: number, pb: PocketBase) => {
    const gamesColl = pb.collection('games');
    await gamesColl.create({
        team1: teachersTeam.dbRef,
        no,
        finished: false,
    });
};
