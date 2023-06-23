import React from 'react';
import { Pocketbase as PocketbaseProvider } from 'pocketbase-react/src';
import { Router } from './pages/_router';
import { AppHeader } from './components/app-header';
import './style.css';

import { useAppContent } from 'pocketbase-react/src';
import type { Game, GameState, Goal, News, Player, Team } from './types';
import { AppFooter } from './components/app-footer';

const serverURL = import.meta.env.VITE_POCKETBASE_ENDPOINT;
// these get automatically prefetched & subscribed to updates
const collections = ['games', 'goals', 'players', 'teams', 'news', 'misc'];
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
                    <Router />
                </PocketbaseDataLoader>
                <AppFooter />
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
    const news = useAppContent<News>('news', true);

    if (!gameMisc.records || !players.records || !games.records || !teams.records || !goals.records || !news.records)
        return null;

    return children;
}
