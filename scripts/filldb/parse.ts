import assert from 'assert';
import { parse } from 'path';

export type ParsedTeam = {
    name: string,
    members: string[],
    teachers: boolean,
};

export const parseTeamsPlayers = (csv: string): ParsedTeam[] => {
    const parsedTeams: ParsedTeam[] = [];
    const lines = csv.split('\r\n');
    console.log({lines});

    const teamsTokens = lines[0].split(',').map(t => t.trim());
    assert(teamsTokens[0] === 'Týmy', 'table must start with Týmy on A1');

    for (let i = 1; i < teamsTokens.length; i++) {
        const name = teamsTokens[i];
        if (!name)
            continue;
        const isTeachers = name === 'Učitelé';
        parsedTeams.push({
            name,
            members: [],
            teachers: isTeachers,
        });
    }

    console.log({parsedTeams});

    for (let i = 1; true; i++) {
        const lineTokens = lines[i]?.split(',').map(t => t.trim());
        if (!lineTokens)
            break;
        console.log({lineTokens});

        for (let playerIndex = 1, teamIndex = 0; playerIndex < lineTokens.length; playerIndex++, teamIndex++) {
            const team = parsedTeams[teamIndex];
            if (team.teachers)
                playerIndex++;
            const player = lineTokens[playerIndex];
            console.log({player, playerIndex, teamIndex});
            if (!player)
                continue;
            team.members.push(player);
        }
    }

    return parsedTeams;
};
