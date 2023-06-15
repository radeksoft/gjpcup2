import React, { useEffect } from 'react';
import { CurrentMatch } from '../components/current-match';
import { useGameLogic } from '../logic';
import { NextMatch } from '../components/next-match';
import { FutureMatches } from '../components/future-matches';
import { BestPlayers } from '../components/best-players';
import { News } from '../components/news';

export const HomePage: React.FC = () => {
    return (
        <div>
            <CurrentMatch />
            <FutureMatches limit={6} />
            <BestPlayers />
            <News />
        </div>
    );
};
