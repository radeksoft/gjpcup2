import React, { useMemo } from 'react';
import { TeamView } from '../components/team-view';
import { PAGE_STYLE, useGameLogic } from '../logic';

export const TeamsPage: React.FC = () => {
    const {
        teams,
        gameState,
    } = useGameLogic();

    const teamsShown = useMemo(() => {
        if (!gameState.revealTeachers) {
            const withoutTeachers = teams.filter(t => !t.teachers);
            return withoutTeachers.sort((a, b) => a.no - b.no);
        } else {
            return teams.sort((a, b) => a.no - b.no);
        }
    }, [teams, gameState]);

    if (!teamsShown || teamsShown.length === 0)
        return (<p>loading</p>);

    return (
        <div style={{width: '100%', maxWidth: 600}}>
            {teamsShown.map(team => (
                <TeamView team={team} key={team.name}/>
            ))}
        </div>
    );
};
