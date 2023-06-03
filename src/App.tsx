import React from 'react';
import { Pocketbase as PocketbaseProvider } from 'pocketbase-react/src';
import { Router } from './pages/_router';
import { AppHeader } from './components/app-header';
import './style.css';

import { useAppContent } from 'pocketbase-react/src';
import { Game, GameState, Goal, Player, Team } from './types';

const serverURL = "http://127.0.0.1:8090";
// these get automatically prefetched & subscribed to updates
const collections = ['games', 'goals', 'players', 'teams', 'misc'];
const webRedirectURL = "mariansam.eu/webred";
const mobileRedirectURL = "mariansam.eu/mobred" // for example

export const App: React.FC = () => {
    return (
        <PocketbaseProvider
            serverURL={serverURL}
            webRedirectUrl={webRedirectURL}
            mobileRedirectUrl={mobileRedirectURL}
            initialCollections={collections}
            openURL={async (url) => {
                // for example expo WebBrowser
            }}
        >
            <div className="d-flex flex-column align-items-center justify-content-start">
                <AppHeader />
                <PocketbaseDataLoader>
                    <div style={{maxWidth: 600, width: '100%'}}>
                        <Router />
                    </div>
                </PocketbaseDataLoader>
            </div>
        </PocketbaseProvider>
    );
};

const PocketbaseDataLoader: React.FC<React.PropsWithChildren> = ({ children }) => {
    const gameMisc = useAppContent<GameState>('misc', true);
    const players = useAppContent<Player>('players', true);
    const games = useAppContent<Game>('games', true);
    const teams = useAppContent<Team>('teams', true);
    const goals = useAppContent<Goal>('goals', true);

    if (!gameMisc.records || !players.records || !games.records || !teams.records || !goals.records)
        return null;

    return children;
}
