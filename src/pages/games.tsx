import React from 'react';
import { FinishedMatches } from '../components/finished-matches';
import { FutureMatches } from '../components/future-matches';
import { CurrentMatch } from '../components/current-match';

export const GamesPage: React.FC = () => {
    return (
        <div>
            <FinishedMatches />
            <CurrentMatch bigTitle />
            <FutureMatches />
        </div>
    );
};
