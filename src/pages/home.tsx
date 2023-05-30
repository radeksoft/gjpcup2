import React, { useEffect } from 'react';
import { useAppContent } from 'pocketbase-react';
import { CurrentMatch } from '../components/current-match';

export const HomePage: React.FC = () => {
    const { records: players, actions: { subscribe: playersSubscribe, unsubscribe: playersUnsub } } = useAppContent('players', true);

    // console.log(players);

    useEffect(() => {
        // console.log('subing');
        playersSubscribe();
        return () => {
            // console.log('ubsubing');
            playersUnsub();
        };
    }, []);

    return (
        <div>
            <CurrentMatch />
        </div>
    );
};
