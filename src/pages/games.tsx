import React from 'react';
import { FinishedMatches } from '../components/finished-matches';
import { FutureMatches } from '../components/future-matches';
import { CurrentMatch } from '../components/current-match';
import { PAGE_STYLE } from '../logic';

export const GamesPage: React.FC = () => {
    return (
        <div style={PAGE_STYLE}>
            <FinishedMatches />
            <CurrentMatch bigTitle />
            <FutureMatches />
        </div>
    );
};
