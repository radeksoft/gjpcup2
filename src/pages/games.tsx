import React from 'react';
import { FinishedMatches } from '../components/finished-matches';
import { FutureMatches } from '../components/future-matches';

export const GamesPage: React.FC = () => {
    return (
        <div>
            <FinishedMatches />
            <FutureMatches />
        </div>
    );
};
