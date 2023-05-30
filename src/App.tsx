import { useState } from 'react';

import { Pocketbase as PocketbaseProvider } from 'pocketbase-react';
import { Router } from './pages/_router';

const serverURL = "http://127.0.0.1:8090";
// const collections = ['games', 'goals', 'players', 'teams', 'misc'];
const collections: string[] = [];
const webRedirectURL = "mariansam.eu/webred";
const mobileRedirectURL = "mariansam.eu/mobred" // for example

const App: React.FC = () => {
    return (
        <PocketbaseProvider
            serverURL={serverURL}
            webRedirectUrl={webRedirectURL}
            mobileRedirectUrl={mobileRedirectURL}
            openURL={async (url) => {
                // for example expo WebBrowser
            }}
        >
            <div className="d-flex justify-content-center">
                <div style={{maxWidth: 600, width: '100%'}}>
                    <Router />
                </div>
            </div>
        </PocketbaseProvider>
    );
};

export default App;
