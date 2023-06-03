import React, { useMemo } from 'react';
import { TeamView } from '../components/team-view';
import { useGameLogic } from '../logic';

export const TeamsPage: React.FC = () => {
    const {
        teams,
    } = useGameLogic();

    const teamsSorted = useMemo(() => {
        return teams.sort((a, b) => a.no - b.no);
    }, [teams]);

    if (!teamsSorted || teamsSorted.length === 0)
        return (<p>loading</p>);

    return (
        <div>
            {teamsSorted.map(team => (
                <TeamView team={team} key={team.name}/>
            ))}
        </div>
    );
};
