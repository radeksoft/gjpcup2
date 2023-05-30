import React, { useEffect } from 'react';
import { useAppContent } from 'pocketbase-react';
import { CurrentMatch } from '../components/current-match';
import { useGameLogic } from '../logic';

export const HomePage: React.FC = () => {
    return (
        <div>
            <CurrentMatch />
        </div>
    );
};
