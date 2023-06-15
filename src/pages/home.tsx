import React, { useEffect } from 'react';
import { CurrentMatch } from '../components/current-match';
import { PAGE_STYLE, useGameLogic } from '../logic';
import { NextMatch } from '../components/next-match';
import { FutureMatches } from '../components/future-matches';
import { BestPlayers } from '../components/best-players';
import { News } from '../components/news';

export const HomePage: React.FC = () => {
    const { gameState: { matchStarted } } = useGameLogic();

    return (
        <div style={PAGE_STYLE}>
            {!matchStarted && (
                <p className='fs-3'>
                Vítejte na třetím ročníku legendárního futsálového turnaje GJP&nbsp;Cup. Udělejte si pohodlí, připravte se na hru a občerstvěte se v bufetu – za chvíli začínáme!
                </p>
            )}

            <CurrentMatch />
            <FutureMatches limit={6} />
            <BestPlayers />
            <News />
        </div>
    );
};
